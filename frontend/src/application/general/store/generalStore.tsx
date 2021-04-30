import { makeAutoObservable, action } from 'mobx';
import axios from '../../../services';
import { InstructorListDto } from '../../instructor/dto/instructorDto';
import { TotalDataDto } from '../dto/totalDataDto';

interface InstructorList {
    isLoading: boolean;
    results : Array<InstructorListDto>
}

class GeneralStore{
    static readonly id: string = 'InstructorStore';
    instructorList! : InstructorList;
    totalData! : TotalDataDto;
    error! : any;
    
    constructor(){
        makeAutoObservable(this);
        this.instructorList = { results : [], isLoading : false };
        this.totalData= { total_instructor : 0, total_student : 0, total_lesson : 0, isLoading : false }
        this.error = {};
    }

    @action async getLastInstructor(){
        this.instructorList.isLoading = true;
        try{
            const result = await axios.get('/api/instructor/last');
            this.instructorList = { results: [...result.data], isLoading : false};
        }
        catch(error){
            this.error = error;
        }
        this.instructorList.isLoading = false;
    }
    
    @action async getTotalData(){
        this.totalData.isLoading = true;
        try{
            const result = await axios.get('/api/user/total-data');
            this.totalData = { ...result.data, isLoading : false};
        }
        catch(error){
            this.error = error;
        }
        this.totalData.isLoading = false;
    }

}

export default new GeneralStore();