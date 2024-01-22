from rest_framework import serializers
from store.models import Product, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    additional_images = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        exclude = ['image_1', 'image_2', 'image_3', 'image_4']

    def get_additional_images(self, obj):
        additional_images = [
            obj.image_1.url if obj.image_1 and obj.image_1.url != '/media/no-image.png' else None,
            obj.image_2.url if obj.image_2 and obj.image_2.url != '/media/no-image.png' else None,
            obj.image_3.url if obj.image_3 and obj.image_3.url != '/media/no-image.png' else None,
            obj.image_4.url if obj.image_4 and obj.image_4.url != '/media/no-image.png' else None,
        ]

        return list(filter(None, additional_images))

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
