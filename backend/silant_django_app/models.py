from django.db import models
from django.contrib.auth.models import User


class Machine(models.Model):
    serial_number = models.CharField(max_length=50, unique=True)
    model = models.CharField(max_length=100)
    engine_model = models.CharField(max_length=100)
    engine_serial_number = models.CharField(max_length=50)
    transmission_model = models.CharField(max_length=100)
    transmission_serial_number = models.CharField(max_length=50)
    leading_bridge_model = models.CharField(max_length=100)
    leading_bridge_serial_number = models.CharField(max_length=50)
    controlled_bridge_model = models.CharField(max_length=100)
    controlled_bridge_serial_number = models.CharField(max_length=50)
    supply_contract_number = models.CharField(max_length=50)
    shipping_date = models.DateField()
    recipient = models.CharField(max_length=200)
    delivery_address = models.CharField(max_length=300)
    configuration = models.TextField()
    client = models.ForeignKey(User, related_name='client_machines', on_delete=models.CASCADE)
    service_company = models.ForeignKey(User, related_name='service_company_machines',
                                        limit_choices_to={'is_service': True}, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

    def __str__(self):
        return f'{self.serial_number} - {self.model}'


class Maintenance(models.Model):
    machine = models.ForeignKey(Machine, related_name='maintenances', on_delete=models.CASCADE)
    maintenance_type = models.CharField(max_length=100)
    maintenance_date = models.DateField()
    hours_operational = models.FloatField()
    order_number = models.CharField(max_length=50)
    order_date = models.DateField()
    organization = models.CharField(max_length=100)
    service_company = models.ForeignKey('auth.User', related_name='maintenance_services', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Технические обслуживания'

    def __str__(self):
        return f'{self.maintenance_type} - {self.machine}'


class Claim(models.Model):
    machine = models.ForeignKey(Machine, related_name='claims', on_delete=models.CASCADE)
    rejection_date = models.DateField()
    hours_operational = models.FloatField()
    failure_unit = models.CharField(max_length=100)
    failure_description = models.TextField()
    recovery_method = models.CharField(max_length=100)
    spare_parts_used = models.TextField()
    recovery_date = models.DateField()
    downtime = models.FloatField()
    service_company = models.ForeignKey('auth.User', related_name='claim_services', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'

    def save(self, *args, kwargs):
        self.downtime = (self.recovery_date - self.refusal_date).days if self.recovery_date > self.refusal_date else 0
        super().save(*args, kwargs)
