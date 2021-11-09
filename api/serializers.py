from rest_framework import serializers
from .models import Clothing, ClothingType, Colour, Collection

class ClothingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothing
        fields = ('id', 'type', 'collection', 'preview_image', 'preview_image_back', 'preview_image_live',
                  'description', 'colour', 'material')

class ClothingtypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingType
        fields = ('id', 'name')

class ColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colour
        fields = ('id', 'name')

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'name', 'collection_logo', 'description', 'released', 'default_colour')