from django.contrib import admin
from import_export.admin import ImportExportMixin
from .models import Machine, Maintenance, Claim, Vehicle, Engine, Transmission, DrivingAxle, SteeringAxle, \
    MaintenanceType, Breakage, Repair, ServiceCompany


class MachineAdmin(admin.ModelAdmin):
    list_display = (
        'machine_id',
        'vehicle_model',
        'engine_model',
        'engine_id',
        'transmission_model',
        'transmission_id',
        'driving_axle_model',
        'driving_axle_id',
        'steering_axle_model',
        'steering_axle_id',
        'delivery_contract',
        'discharge_date',
        'receiver',
        'delivery_address',
        'vehicle_configuration',
        'client',
        'service_company',
    )


admin.site.register(Machine, MachineAdmin)
admin.site.register(Maintenance)
admin.site.register(Claim)
admin.site.register(Vehicle)
admin.site.register(Engine)
admin.site.register(Transmission)
admin.site.register(DrivingAxle)
admin.site.register(SteeringAxle)
admin.site.register(MaintenanceType)
admin.site.register(Breakage)
admin.site.register(Repair)
admin.site.register(ServiceCompany)
