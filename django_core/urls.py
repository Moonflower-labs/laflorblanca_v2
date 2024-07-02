"""
URL configuration for django_core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('payments.urls')),
    path('', include('members.urls')),
    # Serve service worker static file
    path('sw.js', serve, {'path': 'sw.js',
         'document_root': settings.STATIC_ROOT}),
    # Serve react app after other routes
    re_path(r'^(?!(api|static)/).*',
            TemplateView.as_view(template_name='index.html'), name='react_app'),
]
