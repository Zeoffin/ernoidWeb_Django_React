from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

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

# View for getting data for featured collection
# TODO: The featured collection is hardcoded- best way would be to randomize it OR let the owner choose it!
class GetFeaturedCollection(APIView):
    serializer_class = ClothingSerializer

    def get(self, request):

        response = []
        colour = request.GET.get('colour')
        data = Clothing.objects.filter(collection__name='censored', colour__name=colour) # TODO: Change CENSORED to a better way for display

        for item in data:
            response.append(
                {
                    'clothing_id': item.id,
                    'colour': item.colour.name,
                    'collection': item.collection.name.capitalize(),
                    'material': item.material,
                    'image': '/media/' + item.preview_image.name,
                    'clothing_type': item.type.name,
                    'description': item.description,
                    'header': item.header,
                    'price': item.price
                }
            )

        return Response(response)