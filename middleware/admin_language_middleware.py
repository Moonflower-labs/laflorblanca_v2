from django.utils.translation import activate


class AdminLanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Adjust the check based on your admin URL structure
        if request.path.startswith('/admin'):
            activate('es')  # Set the language to Spanish for admin requests
        response = self.get_response(request)
        return response
