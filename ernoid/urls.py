from django.urls import path
from .views import main, CreateCheckoutSessionView

urlpatterns = [
    path('', main),
    path('all-collections', main),
    path('clothes', main),
    path('collection/<str:collectionName>', main),
    path('clothes/<str:clothingType>', main),
    path('shopping-cart', main),
    path('item-selection/<int:ItemId>', main),
    path('checkout', main),
    path('create-checkout-session', CreateCheckoutSessionView.as_view())
]