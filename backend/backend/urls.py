
from django.contrib import admin
from django.urls import path , include
from users import urls as user_urls
from django.conf.urls.static import static
from django.conf import settings
from.views import index

admin.site.site_header = 'Gamma Admin'
admin.site.site_title = 'Gamma Admin'
admin.site.index_title = 'Welcome to Gamma Admin'



urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(user_urls), name="api"),
    path('',index),
    path("login", index),
    path("login/", index)
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
