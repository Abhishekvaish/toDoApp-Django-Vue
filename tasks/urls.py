from django.urls import path
from . import views

urlpatterns = [
	# mysite.com/
    path('',views.TaskView.as_view(),name='tasks_list'),

    path('<str:id>/completed/',views.TaskComplete.as_view(),name='complete'),

    path('<str:id>/deleted/',views.TaskDelete.as_view(),name='delete')
]