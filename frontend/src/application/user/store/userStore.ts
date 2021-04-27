import { makeAutoObservable, action } from 'mobx';
import axios from '../../../helpers/axios';
import { LoginDto } from '../dto/loginDto';
import { SignupDto } from '../dto/signupDto';
import { UserDto } from '../dto/userDto';

const defaultBaseUser : UserDto = {
    id : 0 ,
    first_name : '',
    last_name : '',
    email : '',
    image : '' ,
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
    static readonly id: string = 'LoginStore'
    baseUser! : UserDto;
    loginUser! : LoginDto;
    signupUser! : SignupDto;
    error! : any
    isLoading! : boolean

    constructor() {
        makeAutoObservable(this);
        this.baseUser = defaultBaseUser;
        this.loginUser = defaultLoginUser;
        this.signupUser = defaultSignupUser;
        this.error = null;
        this.isLoading = false;
    }

    @action async getUser(){
        const result = await axios.get('/api/user/me');
        this.baseUser = result.data;
    }

    @action async login(){
        this.error = null;
        this.isLoading = true;
        try{
            const result = await axios.post('/api/token',this.loginUser);
            localStorage.setItem('token', result.data.access);
            localStorage.setItem('userType', result.data.user_type);
            this.getUser();
        }
        catch(error){
            this.error = error.response.data;
        }
        this.isLoading = false;
    }

    @action logout(){
        localStorage.clear();
        this.baseUser = defaultBaseUser;
    }

    @action async signup(){
        this.error = null;
        this.isLoading = true;
        try{
            await axios.post('/api/user/register',this.signupUser);
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
    
}

export default new UserStore();