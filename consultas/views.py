from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Consulta
from .serializers import ConsultaSerializer

class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer