from django.db import models

class Machine(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'



class MaintenanceType(models.Model):
    name = models.CharField(max_length=255, verbose_name='Вид ТО')

    def __str__(self):
        return self.name


class ServiceOrganization(models.Model):
    name = models.CharField(max_length=255, verbose_name='Организация, проводившая ТО')

    def __str__(self):
        return self.name


class Maintenance(models.Model):
    maintenance_type = models.ForeignKey(MaintenanceType, on_delete=models.CASCADE, verbose_name='Вид ТО')

    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Технические обслуживания'





