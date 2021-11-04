import stripe
from django.shortcuts import render, redirect
from django.views import View
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY     # TODO: Change for production


def main(request, *args, **kwargs):
    return render(request, 'ernoid/index.html')


class CreateCheckoutSessionView(View):

    def post(self, request, *args, **kwargs):

        if settings.ON_HEROKU:
            current_domain = "https://ernoid.herokuapp.com"     # TODO: Change when new domain
        else:
            current_domain = "http://127.0.0.1:8000"

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
                        'price': 'price_1Jr2b0DtwfaviqRhEX13Cn6A',
                        'quantity': 1,
                    },
                ],
                payment_method_types=[
                    'card',
                ],
                mode='payment',
                success_url=current_domain + '/success/',
                cancel_url=current_domain + '/cancel/',
            )
        except Exception as e:
            return str(e)

        return redirect(checkout_session.url, code=303)
