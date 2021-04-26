from rest_framework.pagination import PageNumberPagination

class InstructorPagination(PageNumberPagination):
    page_size = 12