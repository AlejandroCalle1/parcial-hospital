# Sistema Hospitalario - API REST y Frontend

Proyecto académico colaborativo construido con Django REST Framework (DRF) y un frontend interactivo en HTML, CSS y JavaScript puro.

## Integrantes del Grupo
- Módulo de Médicos
- Módulo de Pacientes
- Módulo de Consultas Médicas

---

## Requisitos Previos
- Python 3.10 o superior
- Git

---

## Instrucciones para ejecutar el proyecto en local

1. Clonar el repositorio compartido:
   git clone https://github.com/erickestebang/parcial-hospital.git
   cd parcial-hospital

2. Crear y activar el entorno virtual (venv):
   python -m venv venv
   source venv/Scripts/activate  # En Windows (Git Bash)

3. Instalar las dependencias necesarias:
   pip install django djangorestframework django-cors-headers drf-yasg

4. Aplicar las migraciones de la base de datos:
   python manage.py migrate

5. Iniciar el servidor backend:
   python manage.py runserver

6. Abrir la aplicación:
   - Backend API REST: http://127.0.0.1:8000/api/
   - Frontend Web: Abrir index.html o consultas.html en el navegador.

---

## Funcionalidades del Módulo de Consultas
- GET: Listado en tiempo real de las consultas médicas registradas.
- POST: Formulario para agendar o registrar nuevas consultas.
- PUT: Botón de edición para actualizar registros desde el frontend.
- DELETE: Botón de eliminación para borrar registros de la base de datos.