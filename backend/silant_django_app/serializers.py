from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Machine, Maintenance, Claim, Vehicle, Engine, Transmission, DrivingAxle, SteeringAxle, \
    MaintenanceType, Breakage, Repair, ServiceCompany


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", 'username', "groups"]


class VehicleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'


class EngineSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = Engine
        fields = '__all__'


class TransmissionSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = Transmission
        fields = '__all__'


class DrivingAxleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = DrivingAxle
        fields = '__all__'


class SteeringAxleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = SteeringAxle
        fields = '__all__'


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = MaintenanceType
        fields = '__all__'


class BreakageSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = Breakage
        fields = '__all__'


class RepairSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = Repair
        fields = '__all__'


class ServiceCompanySerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField(read_only=True)

    class Meta:
        model = ServiceCompany
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    vehicle_model_info = VehicleSerializer(read_only=True, source="vehicle_model")
    engine_model_info = EngineSerializer(read_only=True, source="engine_model")
    transmission_model_info = TransmissionSerializer(read_only=True, source="transmission_model")
    driving_axle_model_info = DrivingAxleSerializer(read_only=True, source="driving_axle_model")
    steering_axle_model_info = SteeringAxleSerializer(read_only=True, source="steering_axle_model")
    client_info = UserSerializer(read_only=True, source="client")
    service_company_info = ServiceCompanySerializer(read_only=True, source="service_company")

    class Meta:
        model = Machine
        fields = '__all__'


class MaintenanceSerializer(serializers.ModelSerializer):
    machine_id_details = serializers.CharField(read_only=True)
    service_company_info = ServiceCompanySerializer(read_only=True, source="service_company")
    maintenance_type_info = MaintenanceTypeSerializer(read_only=True, source="maintenance_type")

    class Meta:
        model = Maintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    machine_id_details = serializers.CharField(read_only=True)
    service_company_info = ServiceCompanySerializer(read_only=True, source="service_company")
    breakage_type_info = BreakageSerializer(read_only=True, source="breakage_type")
    repairing_way_info = RepairSerializer(read_only=True, source="repairing_way")

    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ['down_time']

