from django.urls import path
from .views import main
from api.webhooks import stripe_webhook

urlpatterns = [
    path('', main),
    path('all-collections', main),
    path('clothes', main),
    path('collection/<str:collectionName>', main),
    path('clothes/<str:clothingType>', main),
    path('shopping-cart', main),
    path('item-selection/<int:ItemId>', main),
    path('order-success', main),
    path('order-cancel', main),
    path('terms', main),
    path('webhooks/stripe', stripe_webhook, name='stripe-webhook')
]
