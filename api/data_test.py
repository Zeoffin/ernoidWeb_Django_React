import requests

BASE_URL = 'https://api.printify.com/v1/'
ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI0MzAyZTE3ZWY4NGJkZGZjN2E2NWMxOTA3ZGExMTU4ZmRkZGZiZWZkZjE2MDgyOTI0NzgzNjUzZTRhYWY4MTI5NWQ5MTRmNTZhMDJiMGMyIiwiaWF0IjoxNjM2NDU2ODEyLCJuYmYiOjE2MzY0NTY4MTIsImV4cCI6MTY2Nzk5MjgxMiwic3ViIjoiNzk3NTg5MCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AEKDih0jjfsghOUTPREvLeMKZmcyGyrSG1bCLwriDpbLHvyKRBbX4GhAGVfp1RC5WWHFdW13L9j4FUdK8QA'
SHOP_ID = 2695906

body = {
    'limit': 50
}
headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
submit_response = requests.get(BASE_URL + f'shops/{SHOP_ID}/products.json', headers=headers, json=body)
data = submit_response.json()['data']

product_id = '6062baaaba14fe6a867af1ac'
item_response = requests.get(BASE_URL + f'shops/{SHOP_ID}/products/{product_id}.json', headers=headers)
variants = item_response.json()['variants']
for i in variants:
    print(i)