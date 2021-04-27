export interface LectureDto{
    id : number;
    name : string;
    category : number;
}

export interface LectureCreateDto extends LectureDto { }