from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product, Review, Order, OrderItem, ShippingAddress
from accounts.models import User
from store.serializers import ProductSerializer, ReviewSerializer,OrderSerializer
from rest_framework.test import APIClient
from django.urls import reverse
from django.test import override_settings


class CategoryTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics')
        self.assertEqual(Category.objects.count(), 1)

    def test_category_str_method(self):
        self.assertEqual(str(self.category), 'Electronics')

@override_settings(MEDIA_URL='http://testserver')
class ProductTestCase(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Electronics')
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
        self.admin_user = User.objects.create_user(
            username='admin_test', 
            email='admin_user@email.com', 
            password='adminpass', 
            is_staff=True
        )
        self.product1 = Product.objects.create(name='Product 1', price=20)
        self.product2 = Product.objects.create(name='Product 2', price=30)
        self.client = APIClient()

    def test_product_str_method(self):
        self.assertEqual(str(self.product), 'SmartPhone')
    
    def test_product_list_view(self):
        response = self.client.get(reverse('products'), {'keyword': 'Product 1'})
        self.assertEqual(response.status_code, 200)

    def test_product_list_view_with_search(self):
        response = self.client.get(reverse('products'), {'keyword': 'Product 1'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['products'], ProductSerializer([self.product1], many=True).data)

    # def test_product_list_view_pagination(self):
    #     for i in range(10):
    #         Product.objects.create(name=f'Product {i+3}', price=10)

    #     response = self.client.get(reverse('products'), {'page': 2})
    #     self.assertEqual(response.status_code, 200)
    #     expected_products = Product.objects.all().order_by('-createdAt')[8:]
    #     self.assertEqual(response.data['products'], ProductSerializer(expected_products, many=True).data)
    #     self.assertEqual(response.data['page'], 2)
    #     self.assertEqual(response.data['pages'], 2)

    def test_product_detail_view(self):
        url = reverse('product-detail', kwargs={'pk': self.product1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serialized_data = ProductSerializer(self.product1).data
        self.assertEqual(response.data, serialized_data)
    
    def test_product_delete_view_unauthorized(self):
        url = reverse('product-delete', kwargs={'pk': self.product1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_product_delete_view_authorized(self):
        admin_user = User.objects.create_user(username='admin', password='adminpass', is_staff=True)
        self.client.force_authenticate(user=admin_user)
        url = reverse('product-delete', kwargs={'pk': self.product1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(id=self.product1.id)

        self.assertEqual(response.data, 'Product deleted')
        
    def test_create_product_authorized(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('product-create')
        data = {}
        response = self.client.post(url, data)
        # print(response.data) 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        created_product = Product.objects.get(name='Sample Name')
        self.assertEqual(created_product.category.name, 'Electronics')

        category_instance = Category.objects.get(name='Electronics')
        self.assertIsNotNone(category_instance)
        self.assertIsNotNone(created_product)

        expected_data = ProductSerializer(created_product).data
        self.assertEqual(response.data, expected_data)

    def test_create_product_unauthorized(self):
        url = reverse('product-create')
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(name='New Product')

    def test_create_product_review(self):
        url = reverse("create-review", kwargs={'pk': self.product1.id})
        data = {
            'rating': 5,
            'comment': 'Loved it!'
         }
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_invalid_rating_product_review(self):
        url = reverse("create-review", kwargs={'pk': self.product1.id})
        data = {
            'rating': 5,
            'comment': ''
        }
        
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_duplicate_product_review(self):
        self.client.force_authenticate(user=self.admin_user)
        Review.objects.create(user=self.admin_user, product=self.product1, rating=4, comment='Previous review')
        url = reverse("create-review", kwargs={'pk': self.product1.id})
        data = {
            'rating': 3,
            'comment': 'Another review',
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'detail': 'Product already reviewed'})
    

class ReviewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='Jhon',
            email='jhon11@email.com',
            first_name='Jhon',
            last_name='Doe',
            address='2436 Naples Avenue, Panama City FL 32405'
        )
        self.category = Category.objects.create(name='Electronics')
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
        self.category = Category.objects.create(name='Electronics')
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
    
    # def test_add_order_items(self):
    #     self.client.force_authenticate(user=self.user)
    #     url = reverse("orders-add")

    #     data = {
    #         'orderItems': [
    #             {
    #                 'product': self.product.id,
    #                 'qty': 2,
    #                 'price': 20.0,
    #             }
    #         ],
    #         'paymentMethod': 'PayPal',
    #         'taxPrice': 2.0,
    #         'shippingPrice': 5.0,
    #         'totalPrice': 50.0,
    #         'shippingAddress': {
    #             'address': '123 Shipping St',
    #             'city': 'Shipping City',
    #             'postalCode': '12345',
    #             'country': 'Shipping Country',
    #         },
    #     }

    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    #     created_order = Order.objects.filter(user=self.user).latest('id')
    #     self.assertIsNotNone(created_order)

    #     created_shipping_address = ShippingAddress.objects.get(order=created_order)
    #     self.assertIsNotNone(created_shipping_address)

    #     created_order_item = OrderItem.objects.get(order=created_order)
    #     self.assertIsNotNone(created_order_item)

    #     updated_product = Product.objects.get(id=self.product.id)
    #     self.assertEqual(updated_product.countInStock, 48)

    #     serializer = OrderSerializer(created_order, many=False)
    #     self.assertEqual(response.data, serializer.data)

    def test_add_order_items_no_order_items(self):
        self.client.force_authenticate(user=self.user)

        url = reverse("orders-add")
        data = {
            'paymentMethod': 'PayPal',
            'taxPrice': 2.0,
            'shippingPrice': 5.0,
            'totalPrice': 50.0,
            'shippingAddress': {
                'address': '123 Shipping St',
                'city': 'Shipping City',
                'postalCode': '12345',
                'country': 'Shipping Country',
            },
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'detail': 'No Order Items'})

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
        self.category = Category.objects.create(name='Electronics')
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


    def test_get_reviews(self):
        expected_reviews_data = ReviewSerializer(self.product.reviews.all(), many=True).data
        self.assertEqual(self.serializer.get_reviews(self.product), expected_reviews_data)
