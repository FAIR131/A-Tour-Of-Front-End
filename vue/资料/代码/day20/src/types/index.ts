export interface filmType{
    filmId:string,
    poster:string,
    name:string,
    runtime:number
}

export interface stateType{
    collect_films:Array<filmType>
}