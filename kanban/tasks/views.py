from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer


class TasksViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('priority')
    serializer_class = TaskSerializer
