from django.db import models
from medicos.models import Medico
from pacientes.models import Paciente

class Consulta(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='consultas')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    fecha = models.DateTimeField()
    motivo = models.TextField()
    diagnostico = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Consulta de {self.paciente} con {self.medico} el {self.fecha}"