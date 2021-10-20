from django.db import models

# Create your models here.
from django.db import models

class Collection(models.Model):
    name = models.CharField(max_length=30, default="", unique=True)
    collection_logo = models.ImageField(default='')
    description = models.CharField(max_length=200, default="")
    released = models.BooleanField(null=False, default=False)
    default_colour = models.CharField(max_length=10, default="#FFFFFF", unique=False, help_text="Colour in hex e.g. #FFFFFF")

    def __str__(self):
        return self.name.capitalize()

class ClothingType(models.Model):
    name = models.CharField(max_length=30, default="")
    version = models.IntegerField(default=1)

    def __str__(self):
        return self.name.capitalize() + ' (v' + str(self.version) + ')'

class Colour(models.Model):
    name = models.CharField(max_length=30, default="", unique=True)
    hex_value = models.CharField(max_length=10, default="#FFFFFF", unique=False, help_text="Colour in hex e.g. #FFFFFF")

    def __str__(self):
        return self.name

class Clothing(models.Model):
    type = models.ForeignKey(ClothingType, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    preview_image = models.ImageField()
    header = models.CharField(max_length=50, default="")
    description = models.CharField(max_length=500, default="")
    colour = models.ForeignKey(Colour, on_delete=models.CASCADE)
    material = models.CharField(max_length=40, default="")
    price = models.DecimalField(max_digits=4, decimal_places=2, default=19.99)

    def __str__(self):
        return str(self.collection.name.capitalize() + ' ' + self.type.name.capitalize() + ' ' + self.colour.name.capitalize())
