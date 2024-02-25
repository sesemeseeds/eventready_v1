from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from .models import *

# @api_view(['GET'])
# def hello_world(request):
#     return Response({'message': 'Hello, world!'})
# Create your views here.

class EventViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = EventGeneralInfo.objects.all()
    serializer_class = EventSerializer

    def list(self, request):
        queryset = EventGeneralInfo.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event)
        return Response(serializer.data)

    def update(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event,data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        event.delete()
        return Response(status=204)
    
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return Task.objects.filter(event_id=event_id)
        return Task.objects.all()
    
    def create(self, request):
        # # Include the eventId from request data
        # event_id = request.data.get('event')

        # # Add event ID to the task data before serializing
        # task_data = request.data
        # task_data['event'] = event_id

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def update(self, request, pk=None):
        task = Task.objects.get(pk=pk)
        serializer = self.serializer_class(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)   
