from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product, Review, Order, OrderItem, ShippingAddress
from accounts.models import User
from store.serializers import ProductSerializer, ReviewSerializer
from rest_framework.test import APIClient
from django.urls import reverse

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
            main_image='smartphone-img.png',
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
class ReviewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='Jhon',
            email='jhon11@email.com',
            first_name='Jhon',
            last_name='Doe',
            address='2436 Naples Avenue, Panama City FL 32405'
        )
        self.category = Category.objects.create(name='Electronics', image='electronics-img.png')
        self.product = Product.objects.create(
            name='SmartPhone',
            main_image='smartphone-img.png',
            brand='Samsung',
            category=self.category,
            description='A high-quality smartphone',
            rating=4.5,
            numReviews=100,
            price=799.99,
            countInStock=50
        )
        self.review = Review.objects.create(
            product=self.product,
            user=self.user,
            rating=4,
            comment='loved it',
        )
    
    def test_review_str_method(self):
        self.assertEqual(str(self.review), str(4))

class OrderTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='Jhon',
            password='jhon'
        )
        self.order = Order.objects.create(
            user=self.user,
            paymentMethod='Credit Card',
            taxPrice=10.50,
            shippingPrice=5.00,
            totalPrice=50.25,
            isPaid=True,
            paidAt='2022-01-01T12:00:00Z',
            isDelivered=False,
            deliveredAt=None,
        )
    
    def test_order_str_method(self):
        self.assertEqual(str(self.order), str(self.order.createdAt))

class OrderItemTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics', image='electronics-img.png')
        self.user = User.objects.create(
            username='Jhon',
            password='jhon'
        )
        self.product = Product.objects.create(
            name='SmartPhone',
            main_image='smartphone-img.png',
            brand='Samsung',
            category=self.category,
            description='A high-quality smartphone',
            rating=4.5,
            numReviews=100,
            price=799.99,
            countInStock=50
        )        
        self.order = Order.objects.create(
            user=self.user,
            paymentMethod='Credit Card',
            taxPrice=10.50,
            shippingPrice=5.00,
            totalPrice=50.25,
            isPaid=True,
            paidAt='2022-01-01T12:00:00Z',
            isDelivered=False,
            deliveredAt=None,
        )
        self.orderItem = OrderItem.objects.create(
            product=self.product,
            order=self.order,
            price=600,
            name='Order Item'
        )
    def test_orderItem_str_method(self):
        self.assertEqual(str(self.orderItem), 'Order Item')
class ShippingAddressModelTestCase(APITestCase):
    def setUp(self):
        self.order = Order.objects.create(paymentMethod='Credit Card', totalPrice=50.25)
        self.shipping_address = ShippingAddress.objects.create(
            order=self.order,
            address='123 Main St',
            city='Cityville',
            postalCode='12345',
            country='Testland',
            shippingPrice=5.00,
        )

    def test_shipping_address_str_method(self):
        expected_str = str(self.shipping_address.address)
        self.assertEqual(str(self.shipping_address), expected_str)

class ProductSerializerTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics', image='electronics-img.png')
        self.user = User.objects.create(
            username='Jhon',
            password='jhonD#3'
        )
        self.product = Product.objects.create(
            name='SmartPhone',
            main_image='smartphone-img.png',
            image_1 = 'smartphone-img_1.png',
            image_2 = 'smartphone-img_2.png',
            image_3 = 'smartphone-img_3.png',
            image_4 = 'smartphone-img_4.png',
            brand='Samsung',
            category=self.category,
            description='A high-quality smartphone',
            rating=4.5,
            numReviews=100,
            price=799.99,
            countInStock=50
        )
        self.review = Review.objects.create(user=self.user, product=self.product, rating=5, comment='Great product!')
        self.serializer = ProductSerializer(instance=self.product)
        
    def test_get_additional_images(self):
        expected_images = [
            self.product.image_1.url,
            self.product.image_2.url,
            self.product.image_3.url,
            self.product.image_4.url,
        ]
        self.assertEqual(self.serializer.get_additional_images(self.product), expected_images)
    def test_get_reviews(self):
        expected_reviews_data = ReviewSerializer(self.product.reviews.all(), many=True).data
        self.assertEqual(self.serializer.get_reviews(self.product), expected_reviews_data)

class ProductListViewTest(APITestCase):
    def setUp(self):
        self.product1 = Product.objects.create(name='Product 1', price=20)
        self.product2 = Product.objects.create(name='Product 2', price=30)
        self.client = APIClient()

    def test_product_list_view(self):
        response = self.client.get(reverse('products'))
        self.assertEqual(response.status_code, 200)

        # Check that the correct serializer is used
        self.assertEqual(response.data['products'], ProductSerializer([self.product1, self.product2], many=True).data)

    def test_product_list_view_with_search(self):
        response = self.client.get(reverse('products'), {'keyword': 'Product 1'})

        self.assertEqual(response.status_code, 200)

        # Check that the correct serializer is used and only one products returned
        self.assertEqual(response.data['products'], ProductSerializer([self.product1], many=True).data)

    def test_product_list_view_pagination(self):
        for i in range(10):
            Product.objects.create(name=f'Product {i+3}', price=10)

        response = self.client.get(reverse('products'), {'page': 2})

        self.assertEqual(response.status_code, 200)

        # Check that the correct serializer is used and the correct page is returned
        expected_products = Product.objects.all()[6:12]
        self.assertEqual(response.data['products'], ProductSerializer(expected_products, many=True).data)

        self.assertEqual(response.data['page'], 2)
        self.assertEqual(response.data['pages'], 2)
    