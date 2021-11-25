from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from rest_framework import status
from django.shortcuts import redirect
from .models import Clothing, ClothingType, Colour, Collection
from .serializers import ClothingSerializer, ClothingtypeSerializer, ColourSerializer, CollectionSerializer

import stripe
import json

stripe.api_key = settings.STRIPE_SECRET_KEY


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
                    'back_image': item.preview_image_back.url if item.preview_image_back else None,
                    'live_image': item.preview_image_live.url if item.preview_image_live else None,
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
            'preview_image_back': data.preview_image_back.url if data.preview_image_back else None,
            'collection': data.collection.name,
            'clothing_type': data.type.name,
            'price': data.price
        }

        return Response(response)


class CreateCheckoutSessionView(APIView):

    def post(self, request, *args, **kwargs):

        if settings.ON_HEROKU:
            current_domain = "https://ernoid.herokuapp.com"     # TODO: Change when new domain
        else:
            current_domain = "http://localhost:8000"

        item_array = []
        item_ids = []
        sizes = []
        stripe_metadata = []

        # Get ids of the items and split them
        ordered_items = request.POST.get('item_id').split(',')

        # Extract IDs
        for i in ordered_items:
            item_id = [int(s) for s in i.split('/') if s.isdigit()]
            item_ids.append(item_id[0])

        # Extract size
        for i in ordered_items:
            sizes.append(i[-1])

        # Format clothing items for request using stripe API and metadata
        for index, item_id in enumerate(item_ids):
            clothing = Clothing.objects.get(id=item_id)  # Get item
            in_array = False
            in_metadata_array = False

            for item in item_array:
                in_array = False
                if clothing.stripe_id == item['price']:  # If the item is already in the list, update quantity
                    item['quantity'] += 1
                    in_array = True
                    break
            if not in_array:  # If not in the list, add it for the first time with quantity '1'
                item_array.append(
                    {
                        'price': str(clothing.stripe_id),
                        'quantity': 1
                    }
                )

            for size_index, item in enumerate(stripe_metadata):
                in_metadata_array = False
                if str(clothing.printify_product_id) == item['product_id']:
                    if item['size'] == sizes[index]:
                        item['quantity'] += 1
                        in_metadata_array = True
                        break
            if not in_metadata_array:
                stripe_metadata.append(
                    {
                        'product_id': str(clothing.printify_product_id),
                        'color': str(clothing.colour.name),
                        'size': str(sizes[index]),
                        'quantity': 1
                    }

                )

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=item_array,
                metadata={
                    'meta': json.dumps(stripe_metadata)
                },
                shipping_address_collection={
                    'allowed_countries': ['US', 'GB'],
                },
                payment_method_types=[
                    'card',
                ],
                mode='payment',
                success_url=current_domain + '/order-success?session_id={CHECKOUT_SESSION_ID}',     # TODO: Placing your order...
                cancel_url=current_domain + '/order-cancel',
            )
            return redirect(checkout_session.url)

        except Exception as e:
            return Response(
                {'Error': f'{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
