from django.contrib import admin
from .models import Collection, ClothingType, Colour, Clothing

# Register your models here.
admin.site.register(Collection)
admin.site.register(ClothingType)
admin.site.register(Colour)
admin.site.register(Clothing)