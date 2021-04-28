import { makeAutoObservable, action } from 'mobx';
import axios from '../../../helpers/axios';
import { InstructorListDto } from '../../instructor/dto/instructorDto';
import { TotalDataDto } from '../dto/totalDataDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';

class GeneralStore{
    static readonly id: string = 'InstructorStore';
    instructorList! : IPagedResult<InstructorListDto>;
    totalData! : TotalDataDto;

    constructor(){
        makeAutoObservable(this);
        this.instructorList = { count : 0, next : '', previous : '', results : [], isLoading : false };
        this.totalData= { total_instructor : 0, total_student : 0, total_lesson : 0, isLoading : false }
    }

    @action async getSoonInstructor(){
        this.instructorList.isLoading = true;
        const result = await axios.get('/api/instructor/soon');
        this.instructorList = { ...result.data, isLoading : false};
    }
    
    @action async getTotalData(){
        this.totalData.isLoading = true;
        const result = await axios.get('/api/user/total-data');
        this.totalData = { ...result.data, isLoading : false};
    }

}

export default new GeneralStore();