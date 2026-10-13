from rest_framework import serializers #Importamos el módulo serializers de Django REST Framework para definir serializadores
from .models import Medico #Importamos el modelo Medico desde el archivo models.py del mismo directorio

class MedicoSerializer(serializers.ModelSerializer): #Definimos la clase MedicoSerializer que hereda de serializers.ModelSerializer, lo que indica que es un serializador basado en un modelo de base de datos
    class Meta: #Definimos la clase Meta que contiene la configuración del serializador
        model = Medico #Especificamos que el modelo asociado al serializador es Medico
        fields = '__all__' #Especificamos que se deben incluir todos los campos del modelo Medico en el serializador