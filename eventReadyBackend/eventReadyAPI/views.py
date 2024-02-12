from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from django.db.models import Max


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
    
class MarketingPosterViewset(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = MarketingPoster.objects.all()
    serializer_class = MarketingPosterSerializer

    def list(self, request):
        queryset = MarketingPoster.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error', serializer.errors)
            return Response(self.serializer_class.errors, status=400)
        
    def retrieve(self, request, pk=None):
        if pk is None:
            # If no primary key is provided, retrieve the poster with the highest ID
            max_id = MarketingPoster.objects.aggregate(max_id=Max('id'))['max_id']
            poster = MarketingPoster.objects.get(id=max_id)
        else:
            # Retrieve the poster by the provided primary key
            poster = MarketingPoster.objects.get(pk=pk)

        serializer = self.serializer_class(poster)
        return Response(serializer.data)
                
    def destroy(self, request, pk=None):
        poster = self.queryset.get(pk=pk)
        poster.delete()
        return Response(status=204)
    
class MarketingRemindersViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = MarketingReminders.objects.all()
    serializer_class = MarketingRemindersSerializer

    def list(self, request):
        queryset = MarketingReminders.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error', serializer.errors)
            return Response(self.serializer_class.errors, status=400)
        
    def retrieve(self, request, pk=None):
        reminders = self.queryset.get(pk=pk)
        serializer = self.serializer_class(reminders)
        return Response(serializer.data)
                
    def destroy(self, request, pk=None):
        reminder = self.queryset.get(pk=pk)
        reminder.delete()
        return Response(status=204)
    
class MarketingRecapPhotoViewset(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = MarketingRecapPhotos.objects.all()
    serializer_class = MarketingRecapPhotoSerializer

    def list(self, request):
        queryset = MarketingRecapPhotos.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error', serializer.errors)
            return Response(self.serializer_class.errors, status=400)
        
    def retrieve(self, request, pk=None):
        photo = self.queryset.get(pk=pk)
        serializer = self.serializer_class(photo)
        return Response(serializer.data)
                
    def destroy(self, request, pk=None):
        photo = self.queryset.get(pk=pk)
        photo.delete()
        return Response(status=204)