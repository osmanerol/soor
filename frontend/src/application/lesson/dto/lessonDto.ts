export interface LessonDto {
    id? : number;
    instructor : any;
    student : any;
    link : string;
    lecture : any;
    created? : Date | null;
}

export interface LessonCreateDto extends LessonDto { }
export interface LessonListDto extends LessonDto { }