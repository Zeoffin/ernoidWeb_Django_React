from django.urls import path
from .views import main

urlpatterns = [
    path('', main),
    path('collections', main),
    path('clothes', main)
]