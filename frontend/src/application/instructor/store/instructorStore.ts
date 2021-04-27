import { makeAutoObservable, action } from 'mobx';
import axios from '../../../helpers/axios';
import { InstructorListDto, InstructorCreateDto } from '../dto/instructorDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';

interface IDefaultTotal{
    total_instructor : number;
    total_student : number;
    total_lesson : number;
    is_loading : boolean;
}

class InstructorStore{
    static readonly id: string = 'InstructorStore';
    instructorList! : IPagedResult<InstructorListDto>;
    instructor! : InstructorCreateDto;
    totalData! : IDefaultTotal;

    constructor(){
        makeAutoObservable(this);
        this.instructorList = { count : 0, next : '', previous : '', results : [], is_loading : false };
        this.totalData= { total_instructor : 0, total_student : 0, total_lesson : 0, is_loading : false }
    }

    @action async getSoonInstructor(){
        this.instructorList.is_loading = true;
        const result = await axios.get('/api/instructor/soon');
        this.instructorList = { ...result.data, is_loading : false};
    }
    
    @action async getTotalData(){
        this.totalData.is_loading = true;
        const result = await axios.get('/api/instructor/total-data');
        this.totalData = { ...result.data, is_loading : false};
    }

}

export default new InstructorStore();