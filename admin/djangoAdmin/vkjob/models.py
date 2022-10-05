from django.db import models

class Executors(models.Model):
    executor_vk_id = models.IntegerField(verbose_name='ID пользователя')
    name = models.CharField(max_length=100,verbose_name='Имя')
    phone = models.CharField(max_length=10,verbose_name='Телефон')
    age = models.IntegerField(verbose_name='Возраст')
    jobtype = models.CharField(max_length=20,verbose_name='Тип работы')
    category = models.CharField(max_length=300,verbose_name='Описание')
    time = models.CharField(max_length=100,verbose_name='Время/график')
    place = models.CharField(max_length=100,verbose_name='Место')
    other = models.CharField(max_length=20,verbose_name='Доп. информация')
    closed = models.BooleanField(default=False,verbose_name='Закрыто')

    def __str__(self):
        return str(self.executor_vk_id)

    class Meta:
        verbose_name = 'работник'
        verbose_name_plural = 'работники'
        ordering = ['executor_vk_id','closed']

class Vacancies(models.Model):
    employer_vk_id = models.IntegerField(verbose_name='ID пользователя')
    name = models.CharField(max_length=100,verbose_name='Имя')
    phone = models.CharField(max_length=10,verbose_name='Телефон')
    jobtype = models.CharField(max_length=20,verbose_name='Тип работы')
    category = models.CharField(max_length=300,verbose_name='Описание')
    time = models.CharField(max_length=100,verbose_name='Время/график')
    place = models.CharField(max_length=100,verbose_name='Место')
    cost = models.IntegerField(verbose_name='Оплата')
    closed = models.BooleanField(default=False,verbose_name='Закрыто')
    passed = models.BooleanField(default=False,verbose_name='Проверено')

    def __str__(self):
        return str(self.employer_vk_id)

    class Meta:
        verbose_name = 'вакансия'
        verbose_name_plural = 'вакансии'
        ordering = ['employer_vk_id','closed']
    
class Moderators(models.Model):
    id = models.IntegerField(verbose_name='ID пользователя',primary_key=True)
    type = models.CharField(max_length=20,verbose_name='Тип')

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'модератор'
        verbose_name_plural = 'модераторы'
        ordering = ['type',]
