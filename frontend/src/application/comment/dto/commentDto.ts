export interface CommentDto {
    id? : number;
    instructor : any;
    student : any;
    content : string;
    created : Date | null;
}

export interface CommentCreateDto extends CommentDto { }
export interface CommentListDto extends CommentDto { }