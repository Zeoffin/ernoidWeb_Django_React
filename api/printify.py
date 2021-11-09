from django.conf import settings

import requests


def submit_new_order():
    base_url = 'https://api.printify.com/v1/'
    # access_token = settings.PRINTIFY_ACCESS_TOKEN
    access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI0MzAyZTE3ZWY4NGJkZGZjN2E2NWMxOTA3ZGExMTU4ZmRkZGZiZWZkZjE2MDgyOTI0NzgzNjUzZTRhYWY4MTI5NWQ5MTRmNTZhMDJiMGMyIiwiaWF0IjoxNjM2NDU2ODEyLCJuYmYiOjE2MzY0NTY4MTIsImV4cCI6MTY2Nzk5MjgxMiwic3ViIjoiNzk3NTg5MCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AEKDih0jjfsghOUTPREvLeMKZmcyGyrSG1bCLwriDpbLHvyKRBbX4GhAGVfp1RC5WWHFdW13L9j4FUdK8QA'
    shop_id = 2695906

    body = {
        "external_id": "2750e210-39bb-11e9-a503-452618153e4a",
        "label": "00012",
        "line_items": [
            {
                "product_id": "5bfd0b66a342bcc9b5563216",
                "variant_id": 17887,
                "quantity": 1
            }
        ],
        "shipping_method": 1,
        "send_shipping_notification": false,
        "address_to": {
            "first_name": "John",
            "last_name": "Smith",
            "email": "example@msn.com",
            "phone": "0574 69 21 90",
            "country": "BE",
            "region": "",
            "address1": "ExampleBaan 121",
            "address2": "45",
            "city": "Retie",
            "zip": "2470"
        }
    }

    headers = {'Authorization': f'Bearer {access_token}'}

    response = requests.get(base_url+'shops.json', headers=headers)
    # shop_id = response.json()[0]['id']

    print(response.json())


submit_new_order()
