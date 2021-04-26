import { makeAutoObservable, action } from 'mobx';
import axios from '../../../helpers/axios';
import { LoginDto } from '../dto/loginDto';
import { SignupDto } from '../dto/signupDto';

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

class LoginStore{
    static readonly id: string = 'LoginStore'
    loginUser! : LoginDto;
    signupUser! : SignupDto;
    error! : boolean

    constructor() {
        makeAutoObservable(this);
        this.loginUser = defaultLoginUser;
        this.signupUser = defaultSignupUser;
        this.error = false;
    }

    @action async login(){
        this.error = false;
        await axios.post('/api/token',this.loginUser).then(response=>{
            localStorage.setItem('type', response.data.is_student ? '1' : '2');
            localStorage.setItem('token', response.data.access);
        }).catch(error=>{
            this.error = true;
        });
    }

    @action async signup(){
        this.error = false;
        await axios.post('/api/user/register',this.signupUser).then(response=>{}).catch(error=>{
            this.error = true;
        });
    }

    @action createLoginUser(){
        this.loginUser = defaultLoginUser;
        this.error = false;
    }

    @action createSignupUser(){
        this.signupUser = defaultSignupUser;
        this.error = false;
    }
    
}

export default new LoginStore();