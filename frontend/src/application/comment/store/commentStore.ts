import { makeAutoObservable, action, toJS } from 'mobx';
import http from '../../../services';
import { CommentListDto, CommentCreateDto } from '../dto/commentDto';
import IPagedResult from '../../../models/dto/fetch/IPagedResult';

const defaultComment : CommentCreateDto = {
    instructor : 0,
    student : 0,
    content : '',
    created : null,
    point : 3
}

class CommentStore{
    static readonly id: string = 'CommentStore';
    commentList! : IPagedResult<CommentListDto>;
    comment! : CommentCreateDto;
    error! : any;
    pageNumber! : number;

    constructor(){
        makeAutoObservable(this);
        this.commentList = { count : 0, next : '', previous : '', results : [], isLoading : false };
        this.comment = defaultComment;
        this.error = '';
        this.pageNumber = 1;
    }

    @action async getComments(instructor_id : number){
        this.commentList.isLoading = true;
        this.error = '';
        try{
            const result = await http.get(`/api/comment/list/${instructor_id}?page=${this.pageNumber}`);
            this.commentList = { ...result.data, results : [...this.commentList.results!, ...toJS(result.data.results)], isLoading : false};
            this.pageNumber += 1;
        }
        catch(error){
            this.error = error;
            this.commentList.isLoading = false;
        }
    }

    @action clearCommentList(){
        this.commentList = { count : 0, next : '', previous : '', results : [], isLoading : false };
    }

    @action createEmptyComment(){
        this.comment = defaultComment;
    }

    @action async makeComment(){
        await http.post('api/comment/create', this.comment  );
    }
}

export default new CommentStore();