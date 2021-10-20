from django.urls import path
from .views import main

urlpatterns = [
    path('', main),
    path('all-collections', main),
    path('clothes', main),
    path('collection/<str:collectionName>', main),
    path('clothes/<str:clothingType>', main),
]