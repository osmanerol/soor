import { makeAutoObservable, action } from 'mobx';
import http from '../../../services';
import { StudentCreateDto } from '../dto/studentDto';
import { storage } from '../../../services/firebaseConfig';

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

    @action async uploadImageToFireStore(){
        let storageRef = storage.ref();
        let imageRef = storageRef.child(`images/${this.student.student.slug}.png`);
        await imageRef.put(this.student.student.image).then(async response => {
            await response.ref.getDownloadURL().then(responseURL => {
                this.student.student.image = responseURL;
            })
        })
    }

    @action async update(){
        this.isLoading = true;
        this.error = '';
        const formData = new FormData();
        formData.append('first_name', this.student.first_name);
        formData.append('last_name', this.student.last_name);
        formData.append('email', this.student.email);
        /*
        if(this.student.student.image){
            formData.append('student.image', this.student.student.image, this.student.student.slug);
        }
        */
        formData.append('student.credit', (this.student.student.credit).toString());
        if(typeof this.student.student.image === 'object' && this.student.student.image !== null){
            await this.uploadImageToFireStore();
            formData.append('student.image', this.student.student.image);
        }
        else{
            formData.append('student.image', this.student.student.image === null ? '' : this.student.student.image);
        }
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

    @action async increaseStudentCredit(lessonPrice : number){
        await http.put(`api/student/increase-credit`, { lessonPrice : lessonPrice })
    }

    @action async decreasetudentCredit(lessonPrice : number){
        await http.put(`api/student/decrease-credit`, { lessonPrice : lessonPrice })
    }

    @action async updateCredit(balanceInfo : any){
        this.isLoading = true;
        await http.put(`api/student/update-credit`, { amount : Number(balanceInfo.amount) });
        this.student.student.credit += Number(balanceInfo.amount);
        this.isLoading = false;
    }
}

export default new StudentStore();