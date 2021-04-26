interface IPagedResult<T>{
    count : number;
    next? : string;
    previous? : string;
    results? : T[];
    isLoaded: boolean
}

export default IPagedResult;