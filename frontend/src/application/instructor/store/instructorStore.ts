import { makeAutoObservable, action, toJS } from 'mobx';
import http from '../../../services';
import { InstructorListDto, InstructorCreateDto } from '../dto/instructorDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';

const DefaultInstructor = {
    isLoading : false,
    result : {
        id : 0,
        first_name: '',
        last_name: '',
        email: '',
        instructor: {
            id: 0,
            image: '',
            slug: '',
            status: 0,
            university: '',
            department: '',
            job: '',
            rate: 0,
            totalLesson: 0,
            totalComment: 0,
            lessonPrice: 0,
            about: '',
            balance: 0,
            lectures: []
        }
    }
}

interface baseInstructor {
    result : InstructorCreateDto,
    isLoading: boolean
}

class InstructorStore{
    static readonly id: string = 'InstructorStore';
    instructorList! : IPagedResult<InstructorListDto>;
    instructorProfile! : baseInstructor;
    instructor! : baseInstructor;
    error! : any;

    constructor(){
        makeAutoObservable(this);
        this.instructorList = { count : 0, next : '', previous : '', results : [], isLoading : false };
        this.instructorProfile = DefaultInstructor;
        this.instructor = DefaultInstructor;
        this.error = '';
    }

    @action async getInstructor(slug : string){
        this.instructorProfile.isLoading = true;
        this.error = '';
        try{
            const result = await http.get(`/api/instructor/profile/${slug}`);
            this.instructorProfile = { result : result.data, isLoading : false};
        }catch(error){
            this.error = error;
        }
        this.instructorProfile.isLoading = false;
    }
    
    @action async getProfile(){
        this.instructor.isLoading = true;
        this.error = '';
        try{
            const result = await http.get(`/api/instructor/me`);
            this.instructor = { result : result.data, isLoading : false};
        }catch(error){
            this.error = error;
        }
        this.instructor.isLoading = false;
    }

    @action async update(){
        this.instructor.isLoading = true;
        this.error = '';
        let lectureArray = toJS(this.instructor.result.instructor.lectures);
        if(typeof lectureArray[0] !== 'number'){
            lectureArray = lectureArray.map((item : any)=> item.id);
        }
        const formData = new FormData();
        formData.append('first_name', this.instructor.result.first_name);
        formData.append('last_name', this.instructor.result.last_name);
        formData.append('email', this.instructor.result.email);
        if(typeof this.instructor.result.instructor.image === 'object'){
            if(this.instructor.result.instructor.image.name !== '' && this.instructor.result.instructor.image.name !== null){
                formData.append('instructor.image', this.instructor.result.instructor.image, this.instructor.result.instructor.image.name);
            }
        }
        formData.append('instructor.university', this.instructor.result.instructor.university);
        formData.append('instructor.department', this.instructor.result.instructor.department);
        formData.append('instructor.job', this.instructor.result.instructor.job);
        formData.append('instructor.lessonPrice', this.instructor.result.instructor.lessonPrice);
        formData.append('instructor.about', this.instructor.result.instructor.about);
        if(lectureArray.length > 0){
            lectureArray.map((item : any)=>{
                formData.append(`instructor.lectures`, item);
                return item;
            })
        }
       try{
            const result = await http.put(`/api/instructor/update`, formData, {
                headers : {
                    'content-type' : 'multipart/form-data'
                }
            });
            this.instructor = { result : result.data, isLoading : false};
        }catch(error){
            this.error = error;
            this.instructor.isLoading = false;
        }
    }

    @action async updatePassword(params : { old_password : string, new_password1 : string, new_password2 : string}){
        this.error = '';
        try{
            await http.post(`/rest-auth/password/change/`, params );
        }catch(error){
            this.error = error;
        }
    }

    @action async deleteUser(){
        this.error = '';
        try{
            await http.delete(`/api/user/delete` );
        }catch(error){
            this.error = error;
        }
    }
}

export default new InstructorStore();