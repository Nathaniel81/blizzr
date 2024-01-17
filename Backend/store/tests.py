from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product, Review, Order, OrderItem, ShippingAddress
from accounts.models import User

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
            image='smartphone-img.png',
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
            # email='jhon11@email.com',
            # first_name='Jhon',
            # last_name='Doe',
            # address='2436 Naples Avenue, Panama City FL 32405'
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
            image='smartphone-img.png',
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
