from rest_framework import serializers
from rest_framework.response import Response


from .models import *


class PlanSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True)
    price_id = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Plan
        fields = ['name', 'price_id', 'description']


class MembershipSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(required=False)

    class Meta:
        model = Membership
        fields = ['status', 'plan', 'subscription_id']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

    def extended_representation(self, instance):
        data = super().to_representation(instance)
        data['favorite_posts'] = list(
            instance.favorite_posts.all().values('id', 'title'))
        data['favorite_videos'] = list(
            instance.favorite_videos.all().values('id', 'title'))

        return data
 # data['favorite_posts'] = PostSerializer(
        #     instance.favorite_posts.all(), many=True).data
        # data['favorite_videos'] = VideoLinkSerializer(
        #     instance.favorite_videos.all(), many=True).data


class UserSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer(required=False, allow_null=True)
    profile = UserProfileSerializer(
        required=False, allow_null=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'membership',
                  'profile', 'likes', 'comments']

    def get_likes(self, obj):
        likes = obj.likes.all()  # Retrieve all likes associated with the user
        serialized_likes = LikeSerializer(
            likes, many=True).data  # Serialize all the likes

        # Filter and categorize the likes based on their associated content type
        # Gather liked posts
        # todo: remove liked_posts as no longer required
        liked_posts = [like.liked_post.id for like in likes if like.liked_post]
        # Gather liked comments
        liked_comments = [
            like.liked_comment.id for like in likes if like.liked_comment]
        # Gather liked videos
        liked_videos = [
            like.liked_video.id for like in likes if like.liked_video]

        return {
            # 'likes': serialized_likes,
            'liked_posts': liked_posts,
            'liked_comments': liked_comments,
            'liked_videos': liked_videos
        }

    def create(self, validated_data):
        # Extract nested fields from validated_data if needed
        nested_data = validated_data.pop('membership', None)

        # Create the user instance using the extracted data
        user = User.objects.create(**validated_data)

        return user

    def short_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'likes': self.get_likes(instance),
        }

    def extended_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'likes': self.get_likes(instance),
            'profile': UserProfileSerializer().extended_representation(instance=instance.profile)
        }


class LikeSerializer(serializers.ModelSerializer):
    liked_comment = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(), required=False, allow_null=True)
    liked_post = serializers.PrimaryKeyRelatedField(
        queryset=Post.objects.all(), required=False, allow_null=True)
    liked_video = serializers.PrimaryKeyRelatedField(
        queryset=VideoLink.objects.all(), required=False, allow_null=True)
    user = serializers.SerializerMethodField()
    # Define the method to return the username

    def get_user(self, obj):
        if isinstance(obj, dict):
            # Assuming the user information is directly under the 'user' key in the dictionary
            return obj.get('user')
        else:
            if hasattr(obj, 'user'):
                return obj.user.username  # Assuming the user object has the 'username' attribute
            else:
                return None

    class Meta:
        model = Like
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    likes = LikeSerializer(many=True, required=False, allow_null=True)
    user = serializers.SerializerMethodField()

    # Define the method to return the username
    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Comment
        fields = ['id', 'post', 'video', 'likes', 'text', 'user', 'created',]
        ordering = ['created']


class PostSerializer(serializers.ModelSerializer):
    # New field to hold the rating score
    rating_score = serializers.SerializerMethodField()
    # comments = CommentSerializer(many=True)
    comments = serializers.SerializerMethodField()
    # author = serializers.SerializerMethodField()

    def get_rating_score(self, post):
        return {
            'score': post.calculate_average_rating(),
            'votes': post.ratings.count(),
            'authors': post.ratings.values_list('user', flat=True)
        }

    # def get_author(self, post):
    #     return post.author.username

    class Meta:
        model = Post
        fields = ['id', 'author', 'created', 'title', 'body',
                  'rating_score', 'comments', 'category', 'likes']
        # fields = '__all__'

    def get_comments(self, instance):
        comments = instance.comments.all().order_by('-created')
        return CommentSerializer(comments, many=True).data


class VideoLinkSerializer(serializers.ModelSerializer):
    # comments = CommentSerializer(many=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = VideoLink
        fields = ['id', 'section', 'url', 'uploaded_on', 'title',
                  'description', 'category', 'likes', 'comments']
        ordering = ['-created']

    def get_comments(self, instance):
        comments = instance.comments.all().order_by('-created')
        return CommentSerializer(comments, many=True).data


class BasicQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = BasicQuestion
        fields = ['name', 'subject', 'text', 'media',
                  'age_group', 'gender', 'country', 'city']


class PremiumQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PremiumQuestion
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'
