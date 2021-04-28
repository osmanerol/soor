interface IPagedResult<T>{
    count : number;
    next? : string;
    previous? : string;
    results? : T[];
    isLoading: boolean
}

export default IPagedResult;