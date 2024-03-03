from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

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
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField("Title", max_length=256)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    status = models.CharField("Status", max_length=20, choices=[("To Do", "To Do"), ("In Progress", "In Progress"), ("Done", "Done")])
    priority = models.IntegerField("Priority", default=5, validators=[MinValueValidator(1), MaxValueValidator(10)])
    completion_date = models.DateField("Completion Date", null=True, blank=True)
    deadline_date = models.DateField("Deadline Date", null=True, blank=True)
    assigned_to = models.CharField("Assigned To", max_length=256, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class MarketingPoster(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingPosters', on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    caption = models.CharField("Caption", max_length=1024, null=True, blank=True)
    image = models.ImageField(upload_to='images')
    updated = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name

class MarketingReminders(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingReminders', on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    date = models.DateField("Date", null=True, blank=True)
    time = models.TimeField("Time", null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class MarketingRecapPhotos(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingRecapPhotos', on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    image = models.ImageField(upload_to='images/recap')
    
    def __str__(self):
        return self.name
    
class Goals(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='goals')
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    due_date = models.DateField("Due Date", null=True, blank=True)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField("Progress", validators=[MinValueValidator(0), MaxValueValidator(100)])

    # tasks = models.ManyToManyField('Tasks', related_name='goals', blank=True)

    def __str__(self):
        return self.name
