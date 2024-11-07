from django.urls import path, include
from rest_framework import routers
from .views import schema_view

from .views import MachineViewSet, MaintenanceViewSet, ClaimViewSet, UserInfoViewSet, VehicleViewSet, EngineViewSet, \
    TransmissionViewSet, DrivingAxleViewSet, SteeringAxleViewSet, MaintenanceTypeViewSet, BreakageViewSet, \
    RepairViewSet, ServiceCompanyViewSet, my_login

router = routers.DefaultRouter()
router.register('machine', MachineViewSet)
router.register('maintenance', MaintenanceViewSet)
router.register('claim', ClaimViewSet)
router.register('users', UserInfoViewSet)
router.register('vehicles', VehicleViewSet)
router.register('engines', EngineViewSet)
router.register('transmissions', TransmissionViewSet)
router.register('driving-axles', DrivingAxleViewSet)
router.register('steering-axles', SteeringAxleViewSet)
router.register('maintenance-types', MaintenanceTypeViewSet)
router.register('breakages', BreakageViewSet)
router.register('repair-ways', RepairViewSet)
router.register('service-companies', ServiceCompanyViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/user-login/', my_login),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('', include(router.urls)),
]