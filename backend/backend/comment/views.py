from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from .paginations import CommentPagination
from .serializers import CommentListSerializer, CommentCreateSerializer
from rest_framework.response import Response
from rest_framework import status
from instructor.models import Instructor
from student.models import Student
from .models import Comment

class CommentListAPIView(ListAPIView):
    serializer_class = CommentListSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        return Comment.objects.filter(instructor__id = self.kwargs['instructor__id'])

class CommentCreateAPIView(APIView):

    def post(self, request):
        serializer = CommentCreateSerializer(data = request.data)
        print(request.data)
        instructor = Instructor.objects.get(user__id = request.data['instructor'])
        instructor.rate = ((instructor.totalComment * instructor.rate) + request.data['point']) / (instructor.totalComment + 1)
        instructor.save()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)