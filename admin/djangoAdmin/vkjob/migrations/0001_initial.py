# Generated by Django 4.0.4 on 2022-10-05 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Executors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('executor_vk_id', models.IntegerField(verbose_name='ID пользователя')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('phone', models.CharField(max_length=10, verbose_name='Телефон')),
                ('age', models.IntegerField(verbose_name='Возраст')),
                ('jobtype', models.CharField(max_length=20, verbose_name='Тип работы')),
                ('category', models.CharField(max_length=300, verbose_name='Описание')),
                ('time', models.CharField(max_length=100, verbose_name='Время/график')),
                ('place', models.CharField(max_length=100, verbose_name='Место')),
                ('other', models.CharField(max_length=20, verbose_name='Доп. информация')),
                ('closed', models.BooleanField(default=False, verbose_name='Закрыто')),
            ],
            options={
                'verbose_name': 'работник',
                'verbose_name_plural': 'работники',
                'ordering': ['executor_vk_id', 'closed'],
            },
        ),
        migrations.CreateModel(
            name='Moderators',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, verbose_name='ID пользователя')),
                ('type', models.CharField(max_length=20, verbose_name='Тип')),
            ],
            options={
                'verbose_name': 'модератор',
                'verbose_name_plural': 'модераторы',
                'ordering': ['type'],
            },
        ),
        migrations.CreateModel(
            name='Vacancies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employer_vk_id', models.IntegerField(verbose_name='ID пользователя')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('phone', models.CharField(max_length=10, verbose_name='Телефон')),
                ('jobtype', models.CharField(max_length=20, verbose_name='Тип работы')),
                ('category', models.CharField(max_length=300, verbose_name='Описание')),
                ('time', models.CharField(max_length=100, verbose_name='Время/график')),
                ('place', models.CharField(max_length=100, verbose_name='Место')),
                ('cost', models.IntegerField(verbose_name='Оплата')),
                ('closed', models.BooleanField(default=False, verbose_name='Закрыто')),
                ('passed', models.BooleanField(default=False, verbose_name='Проверено')),
            ],
            options={
                'verbose_name': 'вакансия',
                'verbose_name_plural': 'вакансии',
                'ordering': ['employer_vk_id', 'closed'],
            },
        ),
    ]
