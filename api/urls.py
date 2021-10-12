from django.urls import path
from .views import ClothingView, ClothingtypeView, CollectionView, ColourView, GetFeaturedCollection

urlpatterns = [
    path('clothing', ClothingView.as_view()),
    path('collections', CollectionView.as_view()),
    path('types', ClothingtypeView.as_view()),
    path('colours', ColourView.as_view()),
    path('featured-collection', GetFeaturedCollection.as_view())
]