export  interface filmType {
    filmId: string,
    poster: string,
    name: string,
    filmType:string,
    actor:string,
    nation:string,
    runtime: number,
    grade:number,
}

export interface stateType{
    collect_films:Array<filmType>
}