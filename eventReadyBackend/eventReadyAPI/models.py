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
    
class MarketingPoster(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingPosters', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=256)
    caption = models.CharField("Caption", max_length=1024, null=True, blank=True)
    image = models.ImageField(upload_to='images')
    updated = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name

class MarketingReminders(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingReminders', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=256)
    date = models.DateField("Date", null=True, blank=True)
    time = models.TimeField("Time", null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class MarketingRecapPhotos(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, related_name='marketingRecapPhotos', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=256)
    image = models.ImageField(upload_to='images/recap')
    
    def __str__(self):
        return self.name
    
class Goals(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='goals')
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=64)
    due_date = models.DateField("Due Date", null=True, blank=True)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField("Progress", validators=[MinValueValidator(0), MaxValueValidator(100)], null=True)

    tasks = models.ManyToManyField('Task', related_name='goals', blank=True)

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

    goal = models.ForeignKey(Goals, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks_to_goal')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Budget(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='budget')
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=64)
    total = models.FloatField("Total")
    categories = models.ManyToManyField('BudgetCategory', related_name='budget_category', blank=True)
    items = models.ManyToManyField('BudgetItem', related_name='budget_item', blank=True)

    def __str__(self):
        return self.name
    
class BudgetCategory(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='budget_categories')
    budget_id = models.ForeignKey(Budget, on_delete=models.SET_NULL, null=True, blank=True, related_name='categories_related')
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=64)
    total = models.FloatField("Total")
    items = models.ManyToManyField('BudgetItem', related_name='category_item', blank=True)

    def __str__(self):
        return self.name
    
class BudgetItem(models.Model):
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='budget_items')
    budget_id = models.ForeignKey(Budget, on_delete=models.SET_NULL, null=True, blank=True, related_name='items_related')
    category_id = models.ForeignKey(BudgetCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='items_related')
    id = models.AutoField(primary_key=True)

    name = models.CharField("Name", max_length=64)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    quantity = models.IntegerField("Quantity", validators=[MinValueValidator(0)])
    cost = models.FloatField("Cost")
    total = models.FloatField("Total")
    paid = models.BooleanField(default=False)
    attachment = models.FileField("Attachment", upload_to='budget_attachments/', null=True, blank=True)

    def __str__(self):
        return self.name
    
class Attendee(models.Model):
    id = models.AutoField(primary_key=True)  
    event_id = models.ForeignKey(EventGeneralInfo, on_delete=models.CASCADE, related_name='attendee')
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    attended = models.BooleanField(default=False)

    def __str__(self):
        return self.name

