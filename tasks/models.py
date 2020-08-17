from django.db import models
import datetime

class Task(models.Model):
	title = models.CharField(max_length=100)
	date = models.DateTimeField(auto_now=True)
	completed = models.BooleanField(default=False)

	class Meta :
		ordering = ['completed','date']

	def __str__(self):
		return self.title