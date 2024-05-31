from rest_framework.permissions import BasePermission


class IsActiveMember(BasePermission):

    def has_permission(self, request, view):
        return request.user.membership.status == 'active' if request.user and hasattr(request.user, 'membership') else False


class HasSoulMembership(IsActiveMember):
    def has_permission(self, request, view):
        if super().has_permission(request, view):
            return request.user.membership.plan.name == 'soul' or request.user.membership.plan.name == 'spirit'
        else:
            return False


class HasSpiritMembership(IsActiveMember):
    def has_permission(self, request, view):
        if super().has_permission(request, view):
            return request.user.membership.plan.name == 'spirit'
        else:
            return False


class HasBasicMembership(IsActiveMember):
    def has_permission(self, request, view):
        if super().has_permission(request, view):
            return request.user.membership.plan.name == 'personality'
        else:
            return False
