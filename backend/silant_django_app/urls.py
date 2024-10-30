from django.urls import path
from .views import (
    MachineListView,
    MachineDetailView,
    MaintenanceListView,
    MaintenanceCreateView,
    MaintenanceUpdateView,
    MaintenanceDeleteView,
    ClaimListView,
    ClaimCreateView,
    ClaimUpdateView,
)

urlpatterns = [
    path('machines/', MachineListView.as_view(), name='machine_list'),
    path('machines/<int:pk>/', MachineDetailView.as_view(), name='machine_detail'),

    path('maintenances/', MaintenanceListView.as_view(), name='maintenance_list'),
    path('maintenances/create/', MaintenanceCreateView.as_view(), name='maintenance_create'),
    path('maintenances/<int:pk>/update/', MaintenanceUpdateView.as_view(), name='maintenance_update'),
    path('maintenances/<int:pk>/delete/', MaintenanceDeleteView.as_view(), name='maintenance_delete'),

    path('claims/', ClaimListView.as_view(), name='claim_list'),
    path('claims/create/', ClaimCreateView.as_view(), name='claim_create'),
    path('claims/<int:pk>/update/', ClaimUpdateView.as_view(), name='claim_update'),
]