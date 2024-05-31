from django.contrib import admin

from django_core import settings
from . models import *

admin.AdminSite.site_header = settings.SITE_NAME
admin.AdminSite.site_title = 'La Flor Blanca site admin'


# or admin.StackedInline for a different layout
class MembershipInline(admin.StackedInline):
    model = Membership
    extra = 0


class ProfileInline(admin.StackedInline):
    model = UserProfile
    extra = 0


class UserInline(admin.TabularInline):
    model = User
    extra = 0


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0


class VideoLinkAdmin(admin.ModelAdmin):
    search_fields = ['section', ]
    list_filter = ['section', ]


class UserAdmin(admin.ModelAdmin):
    inlines = [MembershipInline, ProfileInline]
    list_display = ('username', 'email', )
    search_fields = ['username', 'email']
    exclude = ('user_permissions', 'groups', 'first_name', 'last_name')
    # list_filter = ['user__membership_plan__name']


class QuestionAdmin(admin.ModelAdmin):
    # list_display = ('username', 'email', )
    search_fields = ['user__username', 'user__email']


class PostRatingInline(admin.TabularInline):
    model = PostRating
    extra = 0


class LikeInline(admin.TabularInline):
    model = Like
    extra = 0


class PostAdmin(admin.ModelAdmin):
    inlines = [PostRatingInline, CommentInline, LikeInline]


class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'liked_post', 'liked_video', 'liked_comment')
    list_filter = ('user',)  # Add other fields if needed
    search_fields = ['user__username']


admin.site.register(UserProfile)
admin.site.register(Plan)
admin.site.register(PostRating)  # not needed
admin.site.register(Like)
admin.site.register(Membership)
admin.site.register(PremiumQuestion)
admin.site.register(Comment)
admin.site.register(ContentCategory)

admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(VideoLink, VideoLinkAdmin)
admin.site.register(BasicQuestion, QuestionAdmin)
