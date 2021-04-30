export interface StudentDto {
    id : number,
    first_name: string,
    last_name: string,
    email: string,
    student: {
        image : any,
        slug : string,
        credit : number
    }
}

export interface StudentCreateDto extends StudentDto { }