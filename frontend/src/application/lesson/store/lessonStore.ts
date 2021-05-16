import { makeAutoObservable, action } from 'mobx';
import http from '../../../services';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';
import { LessonCreateDto, LessonListDto } from '../dto/lessonDto';
import { storage } from '../../../services/firebaseConfig';

const defaultLesson = {
    id : 0,
    instructor : 0,
    student : 0,
    lecture : 0,
    link : '',
    image : '',
    studentStatus : false,
    instructorStatus : false
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

    @action async uploadImageToFireStore(){
        let storageRef = storage.ref();
        let imageRef = storageRef.child(`questions/${this.lesson.image.name}`);
        await imageRef.put(this.lesson.image).then(async response => {
            await response.ref.getDownloadURL().then(responseURL => {
                this.lesson.image = responseURL;
            })
        })
    }

    @action async createLessonRequest(){   
        if(typeof this.lesson.image === 'object'){
            await this.uploadImageToFireStore();
        }
        await http.post('api/lesson/create', this.lesson);
    }

    @action async createLesson(){
        this.lesson = defaultLesson;
    }

    @action async createLessonList(){
        this.lessonList = defaultLessonList;
    }

    @action async getInstructorLesson(pageNumber : number){
        this.lessonList.isLoading = true;
        const result = await http.get(`api/lesson/instructor/list?page=${pageNumber}`);
        this.lessonList = { ...result.data, isLoading : false};
    }

    @action async getStudentLesson(pageNumber : number){
        this.lessonList.isLoading = true;
        const result = await http.get(`api/lesson/student/list?page=${pageNumber}`);
        this.lessonList = { ...result.data, isLoading : false};
    }

    @action async updateLessonStatus(id: number, userType : number){
        await http.put(`api/lesson/update-status/${id}`, { userType : userType });
    }

    @action async deleteLesson(id : number){
        await http.delete(`api/lesson/delete/${id}`);
    }
}
export default new LessonStore();