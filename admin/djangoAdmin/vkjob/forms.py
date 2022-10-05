from django import forms
from .models import Executors,Vacancies,Moderators
import re
from django.core.exceptions import ValidationError

class ExecutorsForm(forms.ModelForm):
    # title = forms.CharField(max_length=150, label='Заголовок ', widget=forms.TextInput(attrs={
    #     'class': 'form-control',
    # }))
    # content = forms.CharField(label='Текст новости ', required=False, widget=forms.Textarea(attrs={
    #     'class': 'form-control',
    #     'rows': 5
    # }))
    # is_published = forms.BooleanField(label='Опубликовать ', required=False, initial=True)
    # category = forms.ModelChoiceField(empty_label='Выберите категорию',queryset=Category.objects.all(),label='Категория ',required=False, widget=forms.Select(attrs={
    #     'class': 'form-control',
    # }))
    class Meta:
        model = Executors
        fields = ['executor_vk_id','name','phone','age','jobtype','category','time','place','other','closed']
        widgets = {
            'executor_vk_id': forms.NumberInput(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'age': forms.NumberInput(attrs={'class': 'form-control'}),
            'jobtype': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.TextInput(attrs={'class': 'form-control'}),
            'time': forms.TextInput(attrs={'class': 'form-control'}),
            'other': forms.TextInput(attrs={'class': 'form-control'}),
        }

    # def clean_title(self):
    #     title = self.cleaned_data['title']
    #     if re.match(r'\d', title):
    #         raise ValidationError('Название не должно начинаться с цифры')
    #     return title

class VacanciesForm(forms.ModelForm):
    class Meta:
        model = Vacancies
        fields = ['id','employer_vk_id','name','phone','jobtype','category','time','place','cost','closed','passed']
        widgets = {
            'employer_vk_id': forms.NumberInput(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'jobtype': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.TextInput(attrs={'class': 'form-control'}),
            'time': forms.TextInput(attrs={'class': 'form-control'}),
            'place': forms.TextInput(attrs={'class': 'form-control'}),
            'cost': forms.NumberInput(attrs={'class': 'form-control'}),
            
        }
    
class ModeratorsForm(forms.ModelForm):
    class Meta:
        model = Moderators
        fields = ['id','type']
        widgets = {
            'id': forms.NumberInput(attrs={'class': 'form-control'}),
            'type': forms.TextInput(attrs={'class': 'form-control'}),
        }
