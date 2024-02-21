from django.db import models

class EventGeneralInfo(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    
    name = models.CharField("Name", unique=True, max_length=256)
    doe = models.DateField("Day of Event", null=True, blank=True)
    start_time = models.TimeField("Start Time", null=True, blank=True) 
    end_time = models.TimeField("End Time", null=True, blank=True)
    location = models.CharField("Location", max_length=100, null=True, blank=True)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name    
    
class Task(models.Model):
    id = models.AutoField(primary_key=True)  
    event = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField("Title", max_length=256)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    status = models.CharField("Status", max_length=20, choices=[("to_do", "To Do"), ("in_progress", "In Progress"), ("done", "Done")])
    priority = models.CharField("Priority", max_length=20, choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")])
  
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title