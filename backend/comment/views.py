from rest_framework.generics import ListAPIView, CreateAPIView
from .paginations import CommentPagination
from .serializers import CommentListSerializer
from instructor.models import Instructor
from student.models import Student
from .models import Comment

class CommentListAPIView(ListAPIView):
    serializer_class = CommentListSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        return Comment.objects.filter(instructor__slug = self.kwargs['instructor__slug'])