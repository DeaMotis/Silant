from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from rest_framework import generics

from .models import Machine, Maintenance, Claim
from .forms import MachineForm, MaintenanceForm, ClaimForm
from .serializers import MaintenanceSerializer, ClaimSerializer


class AuthPermissionMixin(LoginRequiredMixin, PermissionRequiredMixin):
    login_url = '/login/'
    raise_exception = True


class MachineListView(View):
    def get(self, request):
        machines = Machine.objects.all()
        return render(request, 'machine_list.html', {'machines': machines})


class MachineDetailView(View):
    def get(self, request, pk):
        machine = get_object_or_404(Machine, pk=pk)
        return render(request, 'machine_detail.html', {'machine': machine})


class MaintenanceListView(View):
    def get(self, request):
        maintenances = Maintenance.objects.all()
        return render(request, 'maintenance_list.html', {'maintenances': maintenances})


class MaintenanceCreateView(View):
    def get(self, request):
        form = MaintenanceForm()
        return render(request, 'maintenance_form.html', {'form': form})

    def post(self, request):
        form = MaintenanceForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('maintenance_list')
        return render(request, 'maintenance_form.html', {'form': form})


class MaintenanceUpdateView(View):
    def get(self, request, pk):
        maintenance = get_object_or_404(Maintenance, pk=pk)
        form = MaintenanceForm(instance=maintenance)
        return render(request, 'maintenance_form.html', {'form': form})

    def post(self, request, pk):
        maintenance = get_object_or_404(Maintenance, pk=pk)
        form = MaintenanceForm(request.POST, instance=maintenance)
        if form.is_valid():
            form.save()
            return redirect('maintenance_detail', pk=maintenance.pk)
        return render(request, 'maintenance_form.html', {'form': form})


class MaintenanceDeleteView(View):
    def get(self, request, pk):
        maintenance = get_object_or_404(Maintenance, pk=pk)
        return render(request, 'maintenance_confirm_delete.html', {'maintenance': maintenance})

    def post(self, request, pk):
        maintenance = get_object_or_404(Maintenance, pk=pk)
        maintenance.delete()
        return redirect('maintenance_list')


class ClaimListView(View):
    def get(self, request):
        claims = Claim.objects.all()
        return render(request, 'claim_list.html', {'claims': claims})


class ClaimCreateView(View):
    def get(self, request):
        form = ClaimForm()
        return render(request, 'claim_form.html', {'form': form})

    def post(self, request):
        form = ClaimForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('claim_list')
        return render(request, 'claim_form.html', {'form': form})


class ClaimUpdateView(View):
    def get(self, request, pk):
        claim = get_object_or_404(Claim, pk=pk)
        form = ClaimForm(instance=claim)
        return render(request, 'claim_form.html', {'form': form})

    def post(self, request, pk):
        claim = get_object_or_404(Claim, pk=pk)
        form = ClaimForm(request.POST, instance=claim)
        if form.is_valid():
            form.save()
            return redirect('claim_detail', pk=claim.pk)
        return render(request, 'claim_form.html', {'form': form})


# API представления
class MaintenanceListAPI(generics.ListAPIView):
    serializer_class = MaintenanceSerializer
    queryset = Maintenance.objects.all()


class MaintenanceUserListAPI(generics.ListAPIView):
    serializer_class = MaintenanceSerializer

    def get_queryset(self):
        user = self.kwargs['user']
        if isinstance(user, int):
            return Maintenance.objects.filter(machine__client=user)
        return Maintenance.objects.filter(machine__client__username=user)


class MaintenanceDetailAPI(generics.RetrieveAPIView):
    serializer_class = MaintenanceSerializer

    def get_object(self):
        return Maintenance.objects.get(pk=self.kwargs['pk'])


class ClaimListAPI(generics.ListAPIView):
    serializer_class = ClaimSerializer
    queryset = Claim.objects.all()


class ClaimUserListAPI(generics.ListAPIView):
    serializer_class = ClaimSerializer

    def get_queryset(self):
        user = self.kwargs['user']
        if isinstance(user, int):
            return Claim.objects.filter(machine__client=user)
        return Claim.objects.filter(machine__client__username=user)


class ClaimDetailAPI(generics.RetrieveAPIView):
    serializer_class = ClaimSerializer

    def get_object(self):
        return Claim.objects.get(pk=self.kwargs['pk'])
