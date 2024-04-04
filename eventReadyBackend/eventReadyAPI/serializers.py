from rest_framework import serializers
from django.contrib.auth.models import User
from .models import * 

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EventGeneralInfo
        fields = ('id','user_id', 'name', 'doe', 'start_time', 'end_time', 'location', 'description', 'created', 'active')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'event_id', 'title', 'description', 'status', 'priority', 'completion_date', 'deadline_date', 'assigned_to', 'goal']
        
class MarketingPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingPoster
        fields = ('event_id', 'id', 'name', 'caption', 'image', 'updated')
        
class MarketingRemindersSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingReminders
        fields = ('event_id', 'id', 'name', 'date', 'time')
        
class MarketingRecapPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingRecapPhotos
        fields = ('event_id', 'id', 'name', 'image')

class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = ('event_id', 'id', 'name', 'due_date', 'description', 'created', 'progress', 'tasks')

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('event_id', 'id', 'name', 'total', 'leftover', 'progress', 'categories')

class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = ('event_id', 'budget', 'id', 'name', 'total', 'items')

class BudgetItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetItem
        fields = ('event_id', 'budget', 'category', 'id', 'name', 'description', 'quantity', 'cost', 'total', 'paid')
