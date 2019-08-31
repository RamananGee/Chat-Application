// class Person {
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} years old.`;

//     }
// }

// var me = new Person('Ramanan',25);
// var description = me.getUserDescription();
// console.log(description);
class Users {
    constructor(){
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);//this going to push the user object to the this.users array
        return user;//returning the successfully created user
    }

    removeUser(id){
        //return user that was removed
         var user = this.users.filter((user)=> user.id === id)[0]
        
         if(user){
             this.users = this.users.filter((user)=> user.id !== id);
         }
        
         
        return user;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0]
       

    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};