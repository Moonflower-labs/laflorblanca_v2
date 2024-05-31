from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            # 'links': {
            #     'next': self.get_next_link(),
            #     'previous': self.get_previous_link()
            # },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            # 'current_page': self.page.number,
            # 'next_page': self.page.next_page_number() if self.page.has_next() else None,
            # 'previous_page': self.page.previous_page_number() if self.page.has_previous() else None,
            'results': data
        })
