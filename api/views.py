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


class GetOneType(APIView):
    """
    Returns items of all clothing items of selected type. Used for CLOTHES page. However, only those items who
    are the same colour as the default colour of the collection they belong will be returned.
    """

    serializer_class = ClothingSerializer

    def get(self, request):

        response = []

        item_type = request.GET.get('item_type').title()
        all_items_by_type = Clothing.objects.filter(type__name=item_type)

        all_collection_colors = Collection.objects.all().values('default_colour')

        # Only those items who are the same colour as the default collection that they are part of
        for item in all_items_by_type:
            if item.colour.hex_value == item.collection.default_colour:
                response.append({
                    'item_id': item.id,
                    'collection': item.collection.name,
                    'price': item.price,
                    'preview_image': item.preview_image.url
                })

        return Response(response)


class GetAllCollectionItems(APIView):
    """
    Returns all items of selected collection in the collections default color.
    """

    serializer_class = ClothingSerializer

    def get(self, request):

        response = {
            'collection': None,
            'default_colour': None,
            'items': []
        }

        # Parse the string so its in the format as 'name' field for collection object
        collection = request.GET.get('collection')
        collection = ' '.join(collection.split('-')).title()

        collection_response = Collection.objects.get(name=collection)

        data = Clothing.objects.filter(collection__name=collection, colour__hex_value=collection_response.default_colour)

        response['collection'] = collection
        response['default_colour'] = data[0].colour.hex_value

        for item in data:
            response['items'].append({
                'item_id': item.id,
                'type': item.type.name,
                'preview_image': item.preview_image.url,
                'price': item.price
            })

        return Response(response)


# TODO: The featured collection is hardcoded- best way would be to randomize it OR let the owner choose it!
class GetFeaturedCollection(APIView):
    """
    Return featured collection to the home page.
    """

    serializer_class = ClothingSerializer

    def get(self, request):

        response = []
        colour = request.GET.get('colour')
        data = Clothing.objects.filter(collection__name='Censored', colour__name=colour)     # TODO: CENSORED hardcoded

        for item in data:
            response.append(
                {
                    'item_id': item.id,
                    'colour': item.colour.name,
                    'collection': item.collection.name.capitalize(),
                    'material': item.material,
                    'image': item.preview_image.url,
                    'clothing_type': item.type.name,
                    'type_version': item.type.version,
                    'description': item.description,
                    'header': item.header,
                    'price': item.price
                }
            )

        return Response(response)


class GetSelectedItem(APIView):
    """
    Returns selected clothing item and the colours it is available in.
    """

    serializer_class = ClothingSerializer

    def get(self, request):

        response = {'colors': []}
        item_id = request.GET.get('item_id')

        # Get selected item
        data = Clothing.objects.get(id=item_id)

        # Get all colours for this type of item
        all_items = Clothing.objects.filter(collection=data.collection, type=data.type, type__version=data.type.version)
        for item in all_items:
            response['colors'].append({
                'item_id': item.id,
                'color': item.colour.hex_value
            })

        response['selected_item'] = {
            'id': data.id,
            'colour': data.colour.name,
            'colour_hex': data.colour.hex_value,
            'preview_image': data.preview_image.url,
            'collection': data.collection.name,
            'clothing_type': data.type.name,
            'price': data.price
        }

        return Response(response)
