from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True, default='no-image.png')

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='no-image.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey(Category, max_length=200, null=True, blank=True, on_delete=models.SET_NULL)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
