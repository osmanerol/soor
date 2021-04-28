import { makeAutoObservable, action, toJS } from 'mobx';
import axios from '../../../helpers/axios';
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
            status: false,
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
            const result = await axios.get(`/api/instructor/profile/${slug}`);
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
            const result = await axios.get(`/api/instructor/me`);
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
        const userProfile = {
            first_name: this.instructor.result.first_name,
            last_name: this.instructor.result.last_name,
            email: this.instructor.result.email,
            instructor: {
                university:  this.instructor.result.instructor.university,
                department: this.instructor.result.instructor.department,
                job: this.instructor.result.instructor.job,
                lessonPrice: this.instructor.result.instructor.lessonPrice,
                about: this.instructor.result.instructor.about,
                lectures: lectureArray
            }
        }
       try{
            const result = await axios.put(`/api/instructor/update`, userProfile);
            this.instructor = { result : result.data, isLoading : false};
        }catch(error){
            this.error = error;
            this.instructor.isLoading = false;
        }
    }

    @action async updatePassword(params : { old_password : string, new_password1 : string, new_password2 : string}){
        this.error = '';
        try{
            await axios.post(`/rest-auth/password/change/`, params );
        }catch(error){
            this.error = error;
        }
    }

    @action async deleteUser(){
        this.error = '';
        try{
            await axios.delete(`/api/user/delete` );
        }catch(error){
            this.error = error;
        }
    }
}

export default new InstructorStore();