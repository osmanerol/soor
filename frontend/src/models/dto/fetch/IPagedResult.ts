interface IPagedResult<T>{
    count : number;
    next? : string;
    previous? : string;
    results? : T[];
    is_loading: boolean
}

export default IPagedResult;