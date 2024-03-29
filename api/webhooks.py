from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

import requests
import stripe
import json

BASE_URL = 'https://api.printify.com/v1/'
ACCESS_TOKEN = settings.PRINTIFY_ACCESS_TOKEN
SHOP_ID = settings.PRINTIFY_SHOP_ID


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        address = session['shipping']
        metadata = session['metadata']
        customer = session['customer']
        customer_details = session['customer_details']

        json_body = setup_body(customer_details, address, metadata['meta'], customer)
        order_id = submit_new_order(json_body)      # order_id used for sending the order into production

        # No need for sending the order into the production - but its left here just in case
        # requests.post(BASE_URL + f'shops/{SHOP_ID}/orders/{order_id}/send_to_production.json')

        customer_name = address['name'].split(' ')

        send_mail(
            'Your ERNOID order',
            f'Dear {customer_name[0]},\n'
            'Thank you for shopping with us! Your order is currently being processed. \n'
            'You will be notified when your order is out for delivery. '
            'The estimated shipping time is 15 - 28 business days.\n\n'
            'Thank you for shopping with us!',
            'ernoidshop@gmail.com',
            [json_body['address_to']['email']],
            fail_silently=False,
        )

    elif event['type'] == 'checkout.session.async_payment_failed':
        session = event['data']['object']
        address = session['shipping']
        metadata = session['metadata']
        customer = session['customer']
        customer_details = session['customer_details']

        json_body = setup_body(customer_details, address, metadata['meta'], customer)

        customer_name = address['name'].split(' ')

        send_mail(
            f'Your payment failed for ERNOID order',
            f'Dear {customer_name[0]},\n'
            'Unfortunately, your payment method has failed while placing an order. \n'
            'Please try to resolve the issue and then try again. \n'
            'For any additional help, please contact us using this email. \n',
            'ernoidshop@gmail.com',
            [json_body['address_to']['email']],
            fail_silently=False,
        )

    # Passed signature verification
    return HttpResponse(status=200)


def setup_body(customer_details, address, metadata, customer):

    line_items = []
    for item in json.loads(metadata):
        line_items.append(get_item_variant(item))

    customer_name = address['name'].split(' ')
    customer_address = address['address']

    if settings.ON_HEROKU:
        label = customer
    else:
        label = 'TEST ORDER'

    json_body = {
        "label": label,
        "line_items": line_items,
        "shipping_method": 1,
        "send_shipping_notification": True,
        "address_to": {
            "first_name": customer_name[0],
            "last_name": customer_name[-1],
            "email": customer_details['email'],
            "phone": customer_details['phone'],
            "country": customer_address['country'],
            "region": customer_address['state'],
            "address1": customer_address['line1'],
            "address2": customer_address['line2'],
            "city": customer_address['city'],
            "zip": customer_address['postal_code']
        }
    }

    return json_body


def get_item_variant(item):

    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}

    line_item = {
        'product_id': item['product_id'],
        'variant_id': None,
        'quantity': item['quantity']
    }

    product_id = item['product_id']
    item_response = requests.get(BASE_URL + f'shops/{SHOP_ID}/products/{product_id}.json', headers=headers)
    response_item = item_response.json()
    size = item['size']
    color = item['color']
    variant_title_1 = f'{color} / {size}'
    variant_title_2 = f'{size} / {color}'
    for variants in response_item['variants']:
        if variants['title'] == variant_title_1 or variants['title'] == variant_title_2:
            line_item['variant_id'] = variants['id']

    return line_item


def submit_new_order(json_body):
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    submit_response = requests.post(BASE_URL+f'shops/{SHOP_ID}/orders.json', headers=headers, json=json_body)
    order_id = submit_response.json()['id']
    return order_id
