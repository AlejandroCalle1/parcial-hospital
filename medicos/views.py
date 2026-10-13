from rest_framework import viewsets #Importamos el módulo viewsets de Django REST Framework para definir vistas basadas en conjuntos de datos
from .models import Medico #Importamos el modelo Medico desde el archivo models.py del mismo directorio
from .serializers import MedicoSerializer #Importamos el serializador MedicoSerializer desde el archivo serializers.py del mismo directorio

class MedicoViewSet(viewsets.ModelViewSet): #Definimos la clase MedicoViewSet que hereda de viewsets.ModelViewSet, lo que indica que es una vista basada en un conjunto de datos
    queryset = Medico.objects.all() #Definimos el conjunto de datos que se utilizará en la vista, en este caso todos los objetos del modelo Medico
    serializer_class = MedicoSerializer #Especificamos que el serializador asociado a la vista es MedicoSerializer, lo que permite convertir los objetos del modelo Medico a y desde formatos como JSON