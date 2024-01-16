from rest_framework.test import APITestCase
from .models import User

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
