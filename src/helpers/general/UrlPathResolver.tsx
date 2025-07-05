
export const ResolvePathUrl=(path:string):string[]=>{
    console.log("Path " ,path)
    const paths:string[]=path.split('/');
    return paths;
}