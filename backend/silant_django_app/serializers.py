from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Machine, Maintenance, Claim


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class MachineSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    service_company = UserSerializer()

    class Meta:
        model = Machine
        fields = [
            'serial_number', 'model', 'engine_model',
            'engine_serial_number', 'transmission_model',
            'transmission_serial_number', 'leading_bridge_model',
            'leading_bridge_serial_number', 'controlled_bridge_model',
            'controlled_bridge_serial_number', 'supply_contract_number',
            'shipping_date', 'recipient', 'delivery_address',
            'configuration', 'client', 'service_company',
        ]


class MaintenanceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer()
    service_company = UserSerializer()

    class Meta:
        model = Maintenance
        fields = [
            'machine', 'maintenance_type', 'maintenance_date',
            'hours_operational', 'order_number', 'order_date',
            'organization', 'service_company',
        ]


class ClaimSerializer(serializers.ModelSerializer):
    machine = MachineSerializer()
    service_company = UserSerializer()

    class Meta:
        model = Claim
        fields = [
            'machine', 'rejection_date', 'hours_operational',
            'failure_unit', 'failure_description',
            'recovery_method', 'spare_parts_used',
            'recovery_date', 'downtime', 'service_company',
        ]
