from django.urls import include, path, re_path
from rest_framework import routers


from .views import *
router = routers.DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'reviews', ReviewViewset, basename='reviews')
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'video-link', LinkViewSet, basename='video-link')
router.register(r'current-user', UserMembershipViewSet,
                basename='current-user')
router.register(r'comment', CommentViewSet, basename='comments')
router.register(r'like', LikeViewSet, basename='like')
router.register(r'basic-questions', BasicQuestionCreateView,
                basename='basic-question-create')
router.register(r'premium-questions', PremiumQuestionCreateView,
                basename='premium-question-create')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/user-permissions/', UserPermissions.as_view()),
    path('api/login/', LoginAPIView.as_view()),
    path('api/logout/', LogoutAPIView.as_view()),
    path('api/register/', RegisterAPIView.as_view()),
    path('api/password_reset/', PasswordResetView.as_view()),
    path('api/reset/<uidb64>/<token>', PasswordResetView.as_view()),
    path('mail/send/', MailView.as_view()),
]
