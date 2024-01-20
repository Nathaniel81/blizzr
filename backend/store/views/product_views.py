from rest_framework import generics
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from store.models import Product
from store.serializers import ProductSerializer


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        search_param = self.request.query_params.get('keyword', '')
        queryset = self.queryset.filter(name__icontains=search_param)

        page = self.request.query_params.get('page', 1)
        paginator = Paginator(queryset, 5)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        serializer = self.serializer_class(products, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})