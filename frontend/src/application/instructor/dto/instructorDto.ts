export interface InstructorProfileDto{
    id : number,
    first_name: string,
    last_name: string,
    email: string,
    instructor: {
        id: number,
        image: any,
        slug: string,
        status: number,
        university: string,
        department: string,
        job: string,
        rate: number,
        totalLesson: number,
        totalComment: number,
        lessonPrice: any,
        about: string,
        balance: number,
        lectures: any
    }
}

export interface InstructorListDto extends InstructorProfileDto { }
export interface InstructorCreateDto extends InstructorProfileDto { }