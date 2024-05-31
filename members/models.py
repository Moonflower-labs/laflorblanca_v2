from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    customer_id = models.CharField(max_length=100, blank=True, null=True)


class UserProfile(models.Model):

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    favorite_posts = models.ManyToManyField(
        'Post', related_name='favorited_by')
    favorite_videos = models.ManyToManyField(
        'VideoLink', related_name='favorited_by')
    basic_used_questions = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(3)])
    tarot_used_questions = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(1)])
    live_used_questions = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(1)])


class ContentCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='task_reviews')

    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=400)
    body = models.TextField()
    category = models.ForeignKey(
        ContentCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts'
    )

    def calculate_average_rating(self):
        total_ratings = self.ratings.aggregate(
            total=models.Sum('value')).get('total') or 0
        count_ratings = self.ratings.count()

        if count_ratings > 0:
            return total_ratings / count_ratings
        else:
            return 0

    def __str__(self):
        return f"{self.title}"


class PostRating(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ratings')
    value = models.IntegerField()

    def __str__(self):
        return f"{self.post.title}'s rating"


class VideoLink(models.Model):
    SECTION_CHOICES = [
        ('soul', 'Soul'),
        ('spirit', 'Spirit'),
        ('tarot', 'Tarot'),
    ]
    section = models.CharField(max_length=10, choices=SECTION_CHOICES)
    url = models.URLField(max_length=350)
    uploaded_on = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=400)
    description = models.TextField()
    category = models.ForeignKey(
        ContentCategory, on_delete=models.SET_NULL, null=True, blank=True,  related_name='videos'
    )

    def __str__(self):
        return f"{self.title}'s question"


class BasicQuestion(models.Model):
    #  name subject text  media + another radio-age gender country city
    name = models.CharField(max_length=80)
    subject = models.CharField(max_length=100)
    text = models.TextField()
    media = models.TextField(blank=True, null=True)
    age_group = models.CharField(max_length=80)
    gender = models.CharField(max_length=80)
    country = models.CharField(max_length=80)
    city = models.CharField(max_length=80)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='basic_questions')

    def __str__(self):
        return f"Pregunta {self.id} de {self.user.username}"


class PremiumQuestion(models.Model):
    TYPE_CHOICES = [
        ('tarot', 'Tarot'),
        ('live', 'Live'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    name = models.CharField(max_length=80, blank=True, null=True)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    info = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='premium_questions')

    def __str__(self):
        return f"Pregunta {self.id} de {self.user.username}"


class Plan(models.Model):
    name = models.CharField(max_length=20)
    price_id = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    video = models.ForeignKey(
        VideoLink, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text}"


class Like(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='likes')
    liked_post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='likes', null=True, blank=True)
    liked_video = models.ForeignKey(
        'VideoLink', on_delete=models.CASCADE, related_name='likes', null=True, blank=True)
    liked_comment = models.ForeignKey(
        'Comment', on_delete=models.CASCADE, related_name='likes', null=True, blank=True)

    class Meta:
        unique_together = (('user', 'liked_post'),
                           ('user', 'liked_video'), ('user', 'liked_comment'))

    def __str__(self):
        if self.liked_post:
            return f"{self.user.username} likes post {self.liked_post.title}"
        elif self.liked_video:
            return f"{self.user.username} likes post {self.liked_video}"
        elif self.liked_comment:
            return f"{self.user.username} likes post {self.liked_comment.text}"

 # Store the product.id, subscription.id and subscription.status


class Membership(models.Model):
    class StatusChoices(models.TextChoices):
        INCOMPLETE = 'incomplete', 'Incomplete'
        INCOMPLETE_EXPIRED = 'incomplete_expired', 'Incomplete Expired'
        TRIALING = 'trialing', 'Trialing'
        ACTIVE = 'active', 'Active'
        PAST_DUE = 'past_due', 'Past Due'
        CANCELED = 'canceled', 'Canceled'
        UNPAID = 'unpaid', 'Unpaid'
        PAUSED = 'paused', 'Paused'
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='membership')
    status = models.CharField(
        max_length=20, choices=StatusChoices.choices, default=StatusChoices.INCOMPLETE)
    plan = models.ForeignKey(
        Plan, on_delete=models.CASCADE, related_name='memberships')
    subscription_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.user.username}'s Membership with ID: {self.subscription_id}"


class Review(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='review')
    text = models.TextField()
    score = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    created = models.DateTimeField(auto_now_add=True)
