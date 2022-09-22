export interface LazyLoading {
    data:{
        dataList:Array<string | number | {[key: string]:any}>,
        showList:Array<string | number | {[key: string]:any}>,
        step:number
    }
}