import { makeAutoObservable, action } from 'mobx';
import http from '../../../services';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';
import { LessonCreateDto, LessonListDto } from '../dto/lessonDto';

const defaultLesson = {
    id : 0,
    instructor : 0,
    student : 0,
    lecture : 0,
    link : ''
}

const defaultLessonList = {
    count : 0,
    next : '',
    previous : '',
    results : [],
    isLoading: false
}

class LessonStore{
    static readonly id: string = 'LessonStore';
    lessonList! : IPagedResult<LessonListDto>
    lesson! : LessonCreateDto;

    constructor(){
        makeAutoObservable(this);
        this.lesson = defaultLesson;
        this.lessonList = defaultLessonList;
    }

    @action async createLessonRequest(){   
        await http.post('api/lesson/create', this.lesson);
    }

    @action async createLesson(){
        this.lesson = defaultLesson;
    }

    @action async createLessonList(){
        this.lessonList = defaultLessonList;
    }

    @action async getInstructorLesson(){
        this.lessonList.isLoading = true;
        const result = await http.get('api/lesson/instructor/list');
        this.lessonList = { ...result.data, isLoading : false};
    }

    @action async getStudentLesson(){
        this.lessonList.isLoading = true;
        const result = await http.get('api/lesson/student/list');
        this.lessonList = { ...result.data, isLoading : false};
    }

    @action async updateLessonStatus(id : number){
        await http.put(`api/lesson/update-status/${id}`)
    }
}
export default new LessonStore();