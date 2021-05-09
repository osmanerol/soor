import { makeAutoObservable, action } from 'mobx';
import http from '../../../services';
import { StudentCreateDto } from '../dto/studentDto';

const DefaultStudent : StudentCreateDto = {
    id : 0,
    first_name: '',
    last_name: '',
    email: '',
    student: {
        image : '',
        slug : '',
        credit : 0
    }
}

class StudentStore{
    static readonly id: string = 'StudentStore';
    student! : StudentCreateDto;
    isLoading! : boolean;
    error! : any;

    constructor(){
        makeAutoObservable(this);
        this.student = DefaultStudent;
        this.error = '';
    }
    
    @action async getProfile(){
        this.isLoading = true;
        this.error = '';
        try{
            const result = await http.get(`/api/student/me`);
            this.student = result.data;
        }catch(error){
            this.error = error;
        }
        this.isLoading = false;
    }

    @action async update(){
        this.isLoading = true;
        this.error = '';
        const formData = new FormData();
        formData.append('first_name', this.student.first_name);
        formData.append('last_name', this.student.last_name);
        formData.append('email', this.student.email);
        if(this.student.student.image){
            formData.append('student.image', this.student.student.image, this.student.student.slug);
        }
        formData.append('student.credit', (this.student.student.credit).toString());
        try{
            const result = await http.put(`/api/student/update`, formData, {
                headers : {
                    'content-type' : 'multipart/form-data'
                }
            });
            this.student = result.data;
        }catch(error){
            this.error = error;
        }
        this.isLoading = false;
    }

    @action async updatePassword(params : { old_password : string, new_password1 : string, new_password2 : string}){
        this.isLoading = true;
        this.error = '';
        try{
            await http.post(`/rest-auth/password/change/`, params );
        }catch(error){
            this.error = error;
        }
        this.isLoading = false;
    }

    @action async deleteUser(){
        this.isLoading = true;
        this.error = '';
        try{
            await http.delete(`/api/user/delete` );
        }catch(error){
            this.error = error;
        }
        this.isLoading = false;
    }
}

export default new StudentStore();