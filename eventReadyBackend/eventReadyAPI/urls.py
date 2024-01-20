from django.urls import path 
from .views import * 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
urlpatterns = router.urls

# urlpatterns = [
#     path('hello-world/', views.hello_world, name='hello_world'),
# ]