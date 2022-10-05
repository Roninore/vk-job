from django.contrib import admin
from .models import Executors,Vacancies,Moderators


admin.site.site_title ='Админка'
admin.site.site_header = 'Админка'
admin.site.index_title = 'Администрирование VK-Job'

class ExecutorsAdmin(admin.ModelAdmin):
    list_display = ('id','executor_vk_id','name','phone','age','jobtype','category','time','place','other','closed')
    list_display_links = ('id','executor_vk_id')
    search_fields = ('executor_vk_id', 'phone','jobtype')
    # list_editable = ('id','executor_vk_id','name','phone','age','jobtype','category','time','place','other','closed')
    list_filter = ('executor_vk_id', 'closed')

admin.site.register(Executors,ExecutorsAdmin)

class VacanciesAdmin(admin.ModelAdmin):
    list_display = ('id','employer_vk_id','name','phone','jobtype','category','time','place','cost','closed','passed')
    list_display_links = ('id','employer_vk_id')
    search_fields = ('employer_vk_id', 'phone','jobtype')
    # list_editable = ('id','employer_vk_id','name','phone','jobtype','category','time','place','cost','closed','passed')
    list_filter = ('employer_vk_id', 'closed')

admin.site.register(Vacancies,VacanciesAdmin)

class ModeratorsAdmin(admin.ModelAdmin):
    list_display = ('id','type')
    list_display_links = ('id','type')
    search_fields = ('id','type')
    # list_editable = ('id','type')
    list_filter = ('id','type')

admin.site.register(Moderators,ModeratorsAdmin)


