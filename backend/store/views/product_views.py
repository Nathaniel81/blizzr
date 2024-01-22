from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from store.models import Product, Review
from accounts.models import User
from store.serializers import ProductSerializer


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        search_param = self.request.query_params.get('keyword', '')
        queryset = self.queryset.filter(name__icontains=search_param)

        page = int(self.request.query_params.get('page', 1))
        paginator = Paginator(queryset, 6)

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

class CreateProductReviewView(generics.CreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    def create(self, request, *args, **kwargs):
        # user = request.user
        user = User.objects.get(id=1)
        product = self.get_object()
        data = request.data
        print(data, data.get('rating'))
        
        already_exists = product.reviews.filter(user=user).exists()
        if already_exists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        elif data.get('rating') == 0:
            content = {'detail': 'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
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
