from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from django.db.models import Max
from django.shortcuts import get_object_or_404


# @api_view(['GET'])
# def hello_world(request):
#     return Response({'message': 'Hello, world!'})
# Create your views here.

class EventViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    
    queryset = EventGeneralInfo.objects.all()
    serializer_class = EventSerializer

    def list(self, request):
        queryset = EventGeneralInfo.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    # def validate_user_id(self, value):
    #     if not value:
    #         raise serializers.ValidationError("user_id must not be empty")
    #     elif isinstance(value, str) and value.strip() == "":
    #         raise serializers.ValidationError("user_id must not be an empty string")
    #     return value
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=201)
        else: 
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event)
        return Response(serializer.data)



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
    
    
class MarketingPosterViewset(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = MarketingPosterSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return MarketingPoster.objects.filter(event_id=event_id)
        return MarketingPoster.objects.all()
                
    def destroy(self, request, pk=None):
        try:
            poster = get_object_or_404(self.get_queryset(), pk=pk)
            poster.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
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
        queryset = self.get_queryset()
        reminder = queryset.get(pk=pk)
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event_id = request.data.get('event_id')
            event_instance = EventGeneralInfo.objects.get(pk=event_id)  # Retrieve the EventGeneralInfo instance
            serializer.save(event_id=event_instance)  # Save with correct event_id instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return Response(serializer.data)

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        budget = queryset.get(pk=pk)
        budget.delete()
        return Response(status=204)

class BudgetCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BudgetCategorySerializer

    def get_queryset(self):
        budget = self.request.query_params.get('budget')
        if budget:
            return BudgetCategory.objects.filter(budget=budget)
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
        category = self.request.query_params.get('category')
        if category:
            return BudgetItem.objects.filter(category=category)
        return BudgetItem.objects.all()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Calculate total before saving
            quantity = serializer.validated_data['quantity']
            cost = serializer.validated_data['cost']
            serializer.validated_data['total'] = quantity * cost
            
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Calculate total before saving
        quantity = serializer.validated_data.get('quantity', instance.quantity)
        cost = serializer.validated_data.get('cost', instance.cost)
        serializer.validated_data['total'] = quantity * cost

        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        queryset = self.get_queryset()
        budget_item = queryset.get(pk=pk)
        budget_item.delete()
        return Response(status=204)
    
class AttendeeViewSet(viewsets.ModelViewSet):
    serializer_class = AttendeeSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get('event_id')
        if event_id:
            return Attendee.objects.filter(event_id=event_id)
        return Attendee.objects.all()


    