from rest_framework import serializers
from .models import * 

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EventGeneralInfo
        fields = ('id', 'name', 'doe', 'start_time', 'end_time', 'location', 'description', 'created', 'active')

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
    progress = serializers.FloatField(read_only=True)

    class Meta:
        model = Goals
        fields = ('event_id', 'id', 'name', 'due_date', 'description', 'created', 'progress', 'tasks')
        read_only_fields = ('progress',)

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('event_id', 'id', 'total', 'leftover')

class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = ('id', 'name', 'total', 'budget')

class BudgetItemSerializer(serializers.ModelSerializer):
    total = serializers.FloatField(read_only=True)

    class Meta:
        model = BudgetItem
        fields = ('id', 'category','name', 'description', 'quantity', 'cost', 'total', 'paid')

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['id', 'event_id', 'name', 'email', 'phone_number', 'attended']