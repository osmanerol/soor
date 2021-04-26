export interface InstructorDto{
    first_name: string,
    last_name: string,
    email: string,
    instructor: {
        id: number,
        image: string,
        slug: string,
        status: boolean,
        university: string,
        department: string,
        job: string,
        rate: number,
        totalLesson: number,
        totalComment: number,
        lessonPrice: number,
        about: string,
        balance: number,
        lectures: any[]
    }
}

export interface InstructorListDto extends InstructorDto { }
export interface InstructorCreateDto extends InstructorDto { }