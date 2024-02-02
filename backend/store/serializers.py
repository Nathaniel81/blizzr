from rest_framework import serializers
from store.models import Product, Review, Order, OrderItem, ShippingAddress, Category
from accounts.models import User

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    additional_images = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField(read_only=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        exclude = ['image_1', 'image_2', 'image_3']

    def get_additional_images(self, obj):
        additional_images = [
            obj.main_image.url if obj.main_image and obj.main_image.url != '/media/no-image.png' else None,
            obj.image_1.url if obj.image_1 and obj.image_1.url != '/media/no-image.png' else None,
            obj.image_2.url if obj.image_2 and obj.image_2.url != '/media/no-image.png' else None,
            obj.image_3.url if obj.image_3 and obj.image_3.url != '/media/no-image.png' else None,
        ]

        return list(filter(None, additional_images))

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    def get_isAdmin(self, obj):
        return obj.is_staff

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
    
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data