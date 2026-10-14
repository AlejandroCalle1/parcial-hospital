from rest_framework import serializers
from .models import Consulta
from medicos.serializers import MedicoSerializer
from pacientes.serializers import PacienteSerializer

class ConsultaSerializer(serializers.ModelSerializer):
    # Campos de solo lectura para mostrar el objeto completo en consultas GET
    medico_detalle = MedicoSerializer(source='medico', read_only=True)
    paciente_detalle = PacienteSerializer(source='paciente', read_only=True)

    class Meta:
        model = Consulta
        fields = '__all__'