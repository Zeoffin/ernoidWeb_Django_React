from rest_framework import generics
from .models import Clothing, ClothingType, Colour, Collection
from .serializers import ClothingSerializer, ClothingtypeSerializer, ColourSerializer, CollectionSerializer

class ClothingView(generics.ListAPIView):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer

class ClothingtypeView(generics.ListAPIView):
    queryset = ClothingType.objects.all()
    serializer_class = ClothingtypeSerializer

class ColourView(generics.ListAPIView):
    queryset = Colour.objects.all()
    serializer_class = ColourSerializer

class CollectionView(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer