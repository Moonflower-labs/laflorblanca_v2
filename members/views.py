import json
import os
from django.db import IntegrityError
from django.db.models import F
from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions, viewsets, status, filters, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError, PermissionDenied
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from .pagination import CustomPagination
from .serializers import *
from .permissions import IsActiveMember, HasSoulMembership
from payments.views import CustomerView


# This view serves the react app template
class ReactAppView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)

        with open('./react/dist/.vite/manifest.json') as manifest_file:
            manifest_data = json.load(manifest_file)
            manifest_js = manifest_data['index.html']['file']
            manifest_css = manifest_data['index.html']['css']

        context['manifest_js'] = manifest_js
        context['manifest_css'] = manifest_css[0]
        return context


class UserPermissions(View):
    def get(self, request, *args, **kwargs):
        print('Has Soul Membership ? ',
              HasSoulMembership().has_permission(request, self))
        plan = request.GET.get('plan')
        user = request.user
        user_permissions = False
        membership = getattr(request.user, 'membership', None)
        if user.is_authenticated and membership is not None:
            # TODO: add admin list logic
            user_plan = membership.plan.name
            if user_plan == os.getenv('SPIRIT'):
                user_permissions = True
            elif plan == 'Alma' and (user_plan == os.getenv('SOUL') or user_plan == os.getenv('SPIRIT')):
                user_permissions = True
            elif plan == 'Personalidad' and user_plan is not None:
                user_permissions = True

        return JsonResponse({'user_permissions': user_permissions})


class UserMembershipViewSet(viewsets.ReadOnlyModelViewSet):
    """ This view returns the request user's membership """
    # An empty queryset because the actual user is fetched dynamically
    queryset = User.objects.none()
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):

        return Membership.objects.filter(user=self.request.user.pk)

    @action(detail=False, methods=['get'])
    def get_user(self, request):
        """Return the details of the request user"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserProfileViewSet(viewsets.ModelViewSet):
    """ This view returns the request user membership """
    # An empty queryset because the actual user is fetched dynamically
    queryset = User.objects.none()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):

        return User.objects.filter(pk=self.request.user.pk)

    def retrieve(self, request, pk=None):

        serialized_data = self.serializer_class.extended_representation(
            instance=self.queryset)
        return Response(serialized_data)


class MailView(View):
    def get(self, request):
        # send_mail(
        #     "La Flor Blanca here",
        #     "Here is the message.",
        #     # "from@example.com",
        #     os.environ.get('DEFAULT_FROM_EMAIL'),
        #     ["alex.landin@hotmail.com",],
        #     fail_silently=False,
        # )

        recipient_email = "alex.landin@hotmail.com"
        # Context data to be used in the email template
        context = {'recipient_name': 'John'}
        html_content = render_to_string('emails/testEmail.html', context)

        email = EmailMessage(
            subject='Sending HTML',
            body=html_content,
            from_email=os.environ.get(
                'DEFAULT_FROM_EMAIL'),  # Your email address
            to=[recipient_email],
        )
        email.content_subtype = 'html'  # Set the content type to HTML
        email.send()

        return JsonResponse({'message': 'email sent'})


# @method_decorator(csrf_protect, name='dispatch')
class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self, request):

        return User.objects.filter(user=request.user.pk)


class ReviewViewset(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created')
    serializer_class = ReviewSerializer


@method_decorator(csrf_protect, name='dispatch')
class BasicQuestionCreateView(viewsets.ViewSet):
    queryset = BasicQuestion.objects.all()
    serializer_class = BasicQuestionSerializer

    def create(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(user=request.user)
        if user_profile.basic_used_questions >= 13:
            raise PermissionDenied(
                "You have reached the maximum limit of basic questions per month.")
        media = request.data.getlist('media')
        another = request.data.get('another')

        mutable_data = request.data.copy()  # Create a mutable copy of the request data

        if another and another not in media:
            media.append(another)

        media_str = ', '.join(media)
        mutable_data['media'] = media_str

        serializer = BasicQuestionSerializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        # Update the corresponding question count fields in the UserProfile model
        user_profile.basic_used_questions = F('basic_used_questions') + 1

        user_profile.save()
        # Associate the user directly with the serializer
        serializer.save(user=request.user)
        # TODO: send email to admin
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def retrieve_basic_used_questions(self, request):
        # Return the basic used questions for the user
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            return Response(user_profile.basic_used_questions, status=status.HTTP_200_OK)
        except user_profile.DoesNotExist:
            return Response(3, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class PremiumQuestionCreateView(viewsets.ViewSet):
    queryset = PremiumQuestion.objects.all()
    serializer_class = PremiumQuestionSerializer

    def create(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(user=request.user)
        type = request.data.get('type')
        mutable_data = request.data.copy()
        mutable_data['user'] = request.user.id
        max_questions_per_month = 100

        if type == 'live' and user_profile.live_used_questions >= max_questions_per_month:
            raise PermissionDenied(
                "You have reached the maximum limit of live questions per month.")
        elif type == 'tarot' and user_profile.tarot_used_questions >= max_questions_per_month:
            raise PermissionDenied(
                "You have reached the maximum limit of tarot questions per month.")

        serializer = self.serializer_class(data=mutable_data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        # Increment question count based on question type
        if type == 'live':
            user_profile.live_used_questions = F('live_used_questions') + 1
        elif type == 'tarot':
            user_profile.tarot_used_questions = F(
                'tarot_used_questions') + 1

        user_profile.save()

        # TODO: send email to admin

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def retrieve_premium_used_questions(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        # Get the 'type' parameter from query parameters
        q_type = request.query_params.get('type')

        if q_type == 'live':
            used_questions = user_profile.live_used_questions
        elif q_type == 'tarot':
            used_questions = user_profile.tarot_used_questions
        else:
            return Response("Invalid or missing 'type' parameter", status=status.HTTP_400_BAD_REQUEST)

        return Response(used_questions, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    # filter_set_fields = []
    pagination_class = CustomPagination
    # permission_classes = [permissions.IsAuthenticated, IsActiveMember]
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'])
    def manage_favorites(self, request, pk=None):

        post = self.get_queryset().get(pk=pk)
        user = request.user
        action = request.data.get('action')

        if action == 'add':
            user.profile.favorite_posts.add(post)
            message = "Post added to favorites"
        elif action == 'remove':
            user.profile.favorite_posts.remove(post)
            message = "Post removed from favorites"
        else:
            return Response("Invalid action", status=status.HTTP_400_BAD_REQUEST)

        return Response(message, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def manage_rating(self, request, pk=None):

        post = self.get_queryset().get(pk=pk)
        user = request.user
        rating_value = request.POST.get('rating-value')

        if rating_value:
            try:
                PostRating.objects.create(
                    post=post, user=user, value=rating_value)

            except Exception as e:

                return Response(f"Error {e}", status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if 'post' in self.request.data:
            # If the comment is related to a post, set the post field
            post_id = self.request.data.get('post')
            post = Post.objects.get(id=post_id)
            serializer.save(user=self.request.user, post=post)
        elif 'video' in self.request.data:
            # If the comment is related to a video, set the video field
            video_id = self.request.data.get('video')
            video = VideoLink.objects.get(id=video_id)
            serializer.save(user=self.request.user, video=video)
        else:
            # If the comment is not related to a post or a video, default behavior (without post or video)
            serializer.save(user=self.request.user)


@method_decorator(csrf_protect, name='dispatch')
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Retrieve the action (like/unlike)
        like_action = self.request.data.get('action')
        if like_action == 'like':
            # Determine the type of item being liked and associate the like accordingly
            if 'post' in self.request.data:
                post_id = self.request.data.get('post')
                post = Post.objects.get(id=post_id)
                serializer.save(user=self.request.user, liked_post=post)
            elif 'video' in self.request.data:
                video_id = self.request.data.get('video')
                video = VideoLink.objects.get(id=(video_id))
                serializer.save(user=self.request.user, liked_video=video)
            elif 'comment' in self.request.data:
                comment_id = self.request.data.get('comment')
                comment = Comment.objects.get(id=comment_id)
                serializer.save(user=self.request.user, liked_comment=comment)
            else:
                # Handle the default behavior if no specific item is being liked
                serializer.save(user=self.request.user)

        elif like_action == 'dislike':
            # Find and delete the like record based on the item being disliked
            if 'post' in self.request.data:
                post_id = self.request.data.get('post')
                Like.objects.filter(user=self.request.user,
                                    liked_post=post_id).delete()
            elif 'video' in self.request.data:
                video_id = self.request.data.get('video')
                Like.objects.filter(user=self.request.user,
                                    liked_video=video_id).delete()
            elif 'comment' in self.request.data:
                comment_id = self.request.data.get('comment')
                Like.objects.filter(user=self.request.user,
                                    liked_comment=comment_id).delete()
            return


# TODO: View for serving videos check permissions
@method_decorator(csrf_protect, name='dispatch')
class LinkViewSet(viewsets.ModelViewSet):
    queryset = VideoLink.objects.all().order_by('-uploaded_on')
    serializer_class = VideoLinkSerializer
    # permission_classes = [permissions.IsAuthenticated, IsActiveMember]
    permission_classes = [AllowAny]
    pagination_class = CustomPagination
    search_fields = ['title']

    def list(self, request, *args, **kwargs):
        section = request.query_params.get('section')
        if not section:
            raise ParseError('Section parameter is required!')
        # * Membership check
        # if section != request.user.membership.plan.name:
        #       return Response({'error': f'You must have a {section} membership to access.'}, status=status.HTTP_403_FORBIDDEN)

        queryset = self.queryset.filter(section=section)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        section = request.query_params.get('section')
        if not section:
            raise ParseError('Section parameter is required!')
        # * Membership check
        # if section != request.user.membership.plan.name:
        #       return Response({'error': f'You must have a {section} membership to access.'}, status=status.HTTP_403_FORBIDDEN)

        self.queryset = self.queryset.filter(section=section)
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def per_section(self, request):
        section_param = request.query_params.get('section')
        user = request.user
        #  *Check user permissions
        if section_param is not None:
            # if section_param != user.membership.plan.name:
            #     return Response({'error': f'You must have a {section_param} membership to access.'}, status=status.HTTP_403_FORBIDDEN)
            queryset = self.queryset.filter(section=section_param)
            # Manually paginate and serialize the queryset
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            # return Response(serializer.data)

        return Response({'error': 'section param is required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def manage_favorites(self, request, pk=None):
        video = self.get_queryset().get(pk=pk)
        user = request.user
        action = request.data.get('action')

        if action == 'add':
            user.profile.favorite_videos.add(video)
            message = "Video added to favorites"
            print(message)
        elif action == 'remove':
            user.profile.favorite_videos.remove(video)
            message = "Video removed from favorites"
            print(message)
        else:
            return Response("Invalid action", status=status.HTTP_400_BAD_REQUEST)
        print('last choice')

        return Response(message, status=status.HTTP_200_OK)


# Authentication Views
@method_decorator(csrf_protect, name='dispatch')
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serialized_user = UserSerializer().short_representation(user)

            return Response({'message': 'Login succesful.', 'user': serialized_user}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logout(request)

        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        # Ensure password matches confirmation
        password = request.data.get("password")
        confirmation = request.data.get("confirmation")
        if password != confirmation or not password:
            return Response({"error":  "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)
        # Attempt to create new user
        try:

            user = User.objects.create_user(username, email, password)
            user.save()
            """create a profile"""
            profile = UserProfile.objects.create(user=user)
            profile.save()
            """create a stripe customer"""
            CustomerView().post(request, user=user)
        except IntegrityError:
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Sign up successful'}, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.get(email=email)
        print(user)
        print(email)
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"http:localhost:5173/reset/{uid}/{token}"
           # Generate HTML content from the template
            html_content = render_to_string(
                'emails/password_reset.html', {'username': user.username, 'reset_url': reset_url})

            # Send the email with HTML content
            send_mail(
                'Restablecer contraseña',
                f"""Pincha en el enlace a continuación para restablecer tu contraseña {
                    reset_url}""",
                os.environ.get('DEFAULT_FROM_EMAIL'),
                [email],
                html_message=html_content,
                fail_silently=False
            )
            return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
        return Response({'error': 'Email not found'}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.data.get('password')
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'password not provided'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)
