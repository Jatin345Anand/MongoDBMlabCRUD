// function CreateUserObject(id,name,password,age){
//     return {'uid':id,'uage':age,'uname':name,'upassword':password}
// }
class Admin{
    constructor(id,name,password,age){
        this.id= id;
        this.age = age;
        this.name = name;
        this.password = password;
        
    }
}
module.exports = Admin;