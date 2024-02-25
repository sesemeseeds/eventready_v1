from rest_framework import serializers
from .models import * 

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EventGeneralInfo
        fields = ('id', 'name', 'doe', 'start_time', 'end_time', 'location', 'description', 'created', 'active')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'event_id', 'title', 'description', 'status', 'priority', 'created']
        
class MarketingPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingPoster
        fields = ('event_id', 'id', 'name', 'caption', 'image')
        
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
        fields = ('event_id', 'id', 'name', 'due_date', 'description', 'created', 'progress') #,'tasks')
        
