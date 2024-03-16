from django.urls import path, include
from .views import * 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('event', EventViewset, basename='event')
router.register(r'tasks', TaskViewSet, basename='task')
router.register('marketingPoster', MarketingPosterViewset, basename='marketingPoster')
router.register('marketingReminders', MarketingRemindersViewset, basename='marketingReminders')
router.register('marketingPhotos', MarketingRecapPhotoViewset, basename='marketingPhotos')
router.register('goals', GoalsViewset, basename='goals')
router.register('budget', BudgetViewSet, basename='budget')
router.register('budgetcategory', BudgetCategoryViewSet, basename='budgetcategory')
router.register('budgetitems', BudgetItemViewSet, basename='budgetitems')

urlpatterns = router.urls
