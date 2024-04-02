from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from django.db.models import Max
from rest_framework.decorators import action
from django.contrib.auth.models import User

class EventViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventSerializer

    def list(self, request):
        queryset = EventGeneralInfo.objects.filter(user=request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            event = EventGeneralInfo.objects.get(pk=pk, user=request.user)
        except EventGeneralInfo.DoesNotExist:
            return Response({"detail": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(event)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            event = EventGeneralInfo.objects.get(pk=pk, user=request.user)
        except EventGeneralInfo.DoesNotExist:
            return Response({"detail": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            event = EventGeneralInfo.objects.get(pk=pk, user=request.user)
        except EventGeneralInfo.DoesNotExist:
            return Response({"detail": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return Task.objects.filter(event_id=event_id)
        return Task.objects.all()
    
    
class MarketingPosterViewset(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = MarketingPosterSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return MarketingPoster.objects.filter(event_id=event_id)
        return MarketingPoster.objects.all()
                
    def destroy(self, request, pk=None):
        poster = self.queryset.get(pk=pk)
        poster.delete()
        return Response(status=204)
    
class MarketingRemindersViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = MarketingRemindersSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return MarketingReminders.objects.filter(event_id=event_id)
        return MarketingReminders.objects.all()


    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error', serializer.errors)
            return Response(self.serializer_class.errors, status=400)
        
                
    def destroy(self, request, pk=None):
        reminder = self.queryset.get(pk=pk)
        reminder.delete()
        return Response(status=204)
    
class MarketingRecapPhotoViewset(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = MarketingRecapPhotoSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event')
        if event_id:
            return MarketingRecapPhotos.objects.filter(event_id=event_id)
        return MarketingRecapPhotos.objects.all()


    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error', serializer.errors)
            return Response(self.serializer_class.errors, status=400)
        
                
    def destroy(self, request, pk=None):
        photo = self.queryset.get(pk=pk)
        photo.delete()
        return Response(status=204)
    
class GoalsViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = GoalsSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return Goals.objects.filter(event_id=event_id)
        return Goals.objects.all()

    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Ensure 'partial' parameter is handled correctly
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  # Pass 'partial' parameter to serializer
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        goal = queryset.get(pk=pk)
        goal.delete()
        return Response(status=204)

    def update_related_tasks(self, request, pk=None):
        goal = self.get_object()
        task_ids = request.data.get('task_ids', [])  # Assuming you send task_ids as a list in the request data
        goal.tasks.set(task_ids)  # Update related tasks
        return Response({"message": "Related tasks updated successfully"}, status=200)
    
class BudgetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return Budget.objects.filter(event_id=event_id)
        return Budget.objects.all()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        budget = queryset.get(pk=pk)
        budget.delete()
        return Response(status=204)

class BudgetCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetCategorySerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return BudgetCategory.objects.filter(event_id=event_id)
        return BudgetCategory.objects.all()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        budget_category = queryset.get(pk=pk)
        budget_category.delete()
        return Response(status=204)

class BudgetItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetItemSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return BudgetItem.objects.filter(event_id=event_id)
        return BudgetItem.objects.all()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Calculate item_total before saving
            quantity = serializer.validated_data['quantity']
            cost = serializer.validated_data['cost']
            serializer.validated_data['item_total'] = quantity * cost

            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Calculate item_total before saving
        quantity = serializer.validated_data.get('quantity', instance.quantity)
        cost = serializer.validated_data.get('cost', instance.cost)
        serializer.validated_data['item_total'] = quantity * cost

        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        budget_item = queryset.get(pk=pk)
        budget_item.delete()
        return Response(status=204)