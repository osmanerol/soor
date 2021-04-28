import { makeAutoObservable, action, configure, toJS } from 'mobx';
import axios from '../../../helpers/axios';
import { LectureDto } from '../dto/lectureDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';
import { InstructorListDto } from '../../instructor/dto/instructorDto';

configure({
    enforceActions: "never",
})

interface IDefaultLecture{
    count : number,
    results : Array<LectureDto>,
    isLoading : boolean
}

class LectureStore{
    static readonly id: string = 'LectureStore';
    lectureList! : IDefaultLecture;
    instructorList! : IPagedResult<InstructorListDto>;
    currentPage! : number;

    constructor(){
        makeAutoObservable(this);
        this.lectureList = { count : 0, results : [], isLoading : false};
        this.instructorList = { count : 0, next : '', previous : '', results : [], isLoading : false };
    }

    @action async getAllLectures(){
        this.lectureList.isLoading = true;
        const result = await axios.get('/api/lecture/list');
        this.lectureList = toJS({ ...result.data, isLoading : false})
    }

    @action async getInstructor(params:{ name : any, lecture_id : any, page : any }){
        this.instructorList.isLoading = true;
        let name = Object.keys(params);
        let values = Object.values(params);
        let query = values.map((item, index)=>{
            if(item !== '' && item !== null){
                return `${name[index]}=${item}`
            }
            else{
                return '';
            }
        }).join('&');
        query = `?${query}`;
        query = query.replace('&&', '&');
        query = query.replace('?&', '?');
        const result = await axios.get('/api/instructor/list' + (query.length > 1 ? `${query}` : ''));
        this.instructorList = { ...result.data , isLoading : false};
    }

}

export default new LectureStore();