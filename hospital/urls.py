"""
URL configuration for hospital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin #Importamos el módulo admin de Django para habilitar la interfaz de administración
from django.urls import path, include #Importamos las funciones path e include de Django para definir rutas de URL y permitir la inclusión de otras configuraciones de URL
from rest_framework.routers import DefaultRouter #Importamos el módulo DefaultRouter de Django REST Framework para crear un enrutador que maneje automáticamente las rutas de las vistas basadas en conjuntos de datos
from medicos.views import MedicoViewSet #Importamos la vista MedicoViewSet desde el archivo views.py del directorio medicos, que contiene la lógica para manejar las solicitudes relacionadas con los médicos

router = DefaultRouter() #Creamos una instancia de DefaultRouter, que nos permitirá registrar nuestras vistas y generar automáticamente las rutas correspondientes
router.register('medicos', MedicoViewSet) #Registramos la vista MedicoViewSet en el enrutador con el prefijo 'medicos', lo que generará automáticamente las rutas para las operaciones CRUD (crear, leer, actualizar, eliminar) relacionadas con los médicos

urlpatterns = [  #Definimos la lista urlpatterns, que contiene las rutas de URL para el proyecto Django
    path('admin/', admin.site.urls), #Agregamos la ruta para la interfaz de administración de Django, que estará disponible en la URL '/admin/'
    path('api/', include(router.urls)), #Agregamos la ruta para las API generadas por el enrutador, que estarán disponibles en la URL '/api/'. Esto incluye todas las rutas registradas en el enrutador, como las relacionadas con los médicos
]