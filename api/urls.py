from django.urls import path
from .views import ClothingView, ClothingtypeView, CollectionView, ColourView,\
    GetFeaturedCollection, GetAllCollectionItems, GetOneType, GetSelectedItem, CreateCheckoutSessionView

urlpatterns = [
    path('clothing', ClothingView.as_view()),
    path('collections', CollectionView.as_view()),
    path('types', ClothingtypeView.as_view()),
    path('colours', ColourView.as_view()),
    path('featured-collection', GetFeaturedCollection.as_view()),
    path('collection-items', GetAllCollectionItems.as_view()),
    path('type-items', GetOneType.as_view()),
    path('selected-item', GetSelectedItem().as_view()),
    path('create-checkout-session', CreateCheckoutSessionView.as_view())
]