from django.db import models

# Create your models here.
from django.db import models  #Importamos el módulo models de Django para definir modelos de base de datos

class Medico(models.Model): #Definimos la clase Medico que hereda de models.Model, lo que indica que es un modelo de base de datos
    nombre = models.CharField(max_length=100)  #Definimos un campo de texto de hasta 100 caracteres
    especialidad = models.CharField(max_length=100)  #Definimos un campo de texto de hasta 100 caracteres