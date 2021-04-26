import { makeAutoObservable } from 'mobx';
import { InstructorListDto, InstructorCreateDto } from '../dto/instructorDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';

class InstructorStore{
    instructorList! : IPagedResult<InstructorListDto>;
    instructor! : InstructorCreateDto;

    constructor(){
        makeAutoObservable(this);
        this.instructorList = { count : 0, next : '', previous : '', results : [], isLoaded : false };
    }

}

export default InstructorStore;