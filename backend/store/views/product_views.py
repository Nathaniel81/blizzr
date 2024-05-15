from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from store.models import Product, Review, Category
from accounts.models import User
from store.serializers import ProductSerializer, CategorySerializer

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        search_param = self.request.query_params.get('keyword', '')
        queryset = self.queryset.filter(name__icontains=search_param).order_by('-createdAt')
        category_id = self.request.query_params.get('category')
        
        if category_id and type(category_id) == int:
            queryset = queryset.filter(category__id=category_id).order_by('-createdAt')

        page = int(self.request.query_params.get('page', 1))
        paginator = Paginator(queryset, 8)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        serializer = self.serializer_class(products, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class CreateProductReviewView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    def create(self, request, *args, **kwargs):
        user = request.user
        product = self.get_object()
        data = request.data

        already_exists = product.reviews.filter(user=user).exists()
        if already_exists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        # elif data.get('rating') == 0:
        #     content = {'detail': 'Please select a rating'}
        #     return Response(content, status=status.HTTP_400_BAD_REQUEST)
        elif data.get('comment') == '':
            content = {'detail': 'Please write a review'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.username,
                rating=data['rating'],
                comment=data['comment'],
            )

            reviews = product.reviews.all()
            product.numReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)
            product.save()

            return Response('Review Added')

class DeleteProductView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser, IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response('Product deleted')

class CreateProductView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        category_name = 'Electronics'
        category_instance, created = Category.objects.get_or_create(name=category_name)
        serializer.save(
            user=self.request.user,
            name='Sample Name',
            price=0,
            brand='Sample Brand',
            countInStock=0,
            category=category_instance,
            description=''
        )

class UpdateProductView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class UploadImageView(generics.CreateAPIView):
    def create(self, request, *args, **kwargs):
        data = request.data
        product_id = data['product_id']
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=404)

        image_fields = ['main_image', 'image_1', 'image_2', 'image_3']

        for field in image_fields:
            file = request.FILES.get(field)
            if file:
                setattr(product, field, file)


        product.save()

        return Response('Image was uploaded')

class TopProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(rating__gte=4).order_by('-rating')[:5]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
