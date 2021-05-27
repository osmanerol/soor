import { makeAutoObservable, action } from 'mobx';
import http from '../../../services';
import { LoginDto } from '../dto/loginDto';
import { SignupDto } from '../dto/signupDto';
import { UserDto } from '../dto/userDto';

const defaultBaseUser : UserDto = {
    id : 0 ,
    first_name : '',
    last_name : '',
    email : '',
    userType: 0,
    image : '' ,
    slug : ''
}

const defaultLoginUser : LoginDto = {
    email : '',
    password : ''
}

const defaultSignupUser : SignupDto = {
    first_name : '',
    last_name : '',
    email : '',
    password : '',
    is_instructor : false,
    is_student : false
}

class UserStore{
    static readonly id: string = 'UserStore'
    baseUser! : UserDto;
    loginUser! : LoginDto;
    signupUser! : SignupDto;
    error! : any;
    passwordResetEmail : string;
    isLoading! : boolean;

    constructor() {
        makeAutoObservable(this);
        this.baseUser = defaultBaseUser;
        this.loginUser = defaultLoginUser;
        this.signupUser = defaultSignupUser;
        this.error = null;
        this.passwordResetEmail = '';
        this.isLoading = false;
    }

    @action.bound  async getUser(){
        if(localStorage.getItem('token')){
            const result = await http.get('/api/user/me');
            this.baseUser = result.data;
        }
        else{
            this.baseUser = defaultBaseUser;
        }
    }

    @action async login(){
        this.error = null;
        this.isLoading = true;
        try{
            const result = await http.post('/api/token',this.loginUser);
            localStorage.setItem('token', result.data.access);
            localStorage.setItem('refresh', result.data.refresh);
            localStorage.setItem('userType', result.data.user_type);
            setTimeout(()=>{
                this.getUser();
            },2000)
        }
        catch(error){
            this.error = error.response.data;
        }
        this.isLoading = false;
    }

    @action async logout(){
        this.baseUser = defaultBaseUser;
        this.error = null;
        this.isLoading = true;
        try{
            await http.post('/api/user/logout');
            localStorage.clear();
        }
        catch(error){
            this.error = error.response.data;
        }
        this.isLoading = false;
    }

    @action async signup(){
        this.error = null;
        this.isLoading = true;
        try{
            await http.post('/api/user/register',this.signupUser);
        }
        catch(error){
            this.error = error.response.data;
        }
        this.isLoading = false;
    }

    @action createLoginUser(){
        localStorage.clear();
        this.loginUser = defaultLoginUser;
        this.error = null;
    }

    @action createSignupUser(){
        localStorage.clear();
        this.signupUser = defaultSignupUser;
        this.error = null;
    }

    @action async passwordReset(){
        this.error = '';
        try{
            const formData = new FormData();
            formData.append('email',  this.passwordResetEmail);
            formData.append('csrfmiddlewaretoken', 'HOPGP478oVjSmC5auyshZXyIx4Nlq53Kn0PwDNV9lzzl0bKWBw72dVuyZpIft8G5');
            await http.post('/reset_password', formData, {
                xsrfCookieName : 'srftoken=ovv0Y80sw9KqUdqAHHjHQrwkc9VwvqYljVIL1MT7NT5cbpcLPDiJbiraNKDgKM8P'
            });
        }
        catch(error : any){
            this.error = error;
        }
    }
    
}

export default new UserStore();