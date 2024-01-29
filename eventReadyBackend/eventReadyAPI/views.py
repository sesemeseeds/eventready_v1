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