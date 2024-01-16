from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product

class CategoryTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics', image='electronics-img.png')
        self.assertEqual(Category.objects.count(), 1)

    def test_category_str_method(self):
        self.assertEqual(str(self.category), 'Electronics')

class ProductTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics', image='electronics-img.png')
        self.assertEqual(Category.objects.count(), 1)

        self.product = Product.objects.create(
            name='SmartPhone',
            image='smartphone-img.png',
            brand='Samsung',
            category=self.category,
            description='A high-quality smartphone',
            rating=4.5,
            numReviews=100,
            price=799.99,
            countInStock=50
        )

    def test_product_str_method(self):
        self.assertEqual(str(self.product), 'SmartPhone')
