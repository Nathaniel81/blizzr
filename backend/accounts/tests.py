from rest_framework.test import APITestCase
from .models import User
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse


class UserTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
			username='Kebede',
			first_name='Kebede',
			last_name='Zeleke',
			email='kebe@email.com',
			address='00 Kebedech street',
		)
    def test_user_str_method(self):
        self.assertEqual(str(self.user), 'Kebede')
    
    def test_registration_view(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpass',
            'password_confirm': 'testpass',
        }

        response = self.client.post(url, data)

        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_201_CREATED])

        self.assertEqual(response.data['response'], 'Successfully registered')
        self.assertIn('id', response.data)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'testuser@example.com')
        self.assertIn('token', response.data)
