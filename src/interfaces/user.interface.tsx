export interface UserInterface{
    id: number,
    username: string,
    password: string|null,
    firstname:string,
    lastname:string,
    email:string,
    isSuperAdmin:boolean,
    created_by: string,
    updated_by: string,
  
    createdAt: Date,
    updatedAt: Date
}