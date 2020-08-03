const SecureKeyAccount = {
    AccessKey_1: "j90cKfL78Hd8hR77t5",
    AccessKey_2: "h75LodERi55pO90xfZ"
}
let userSessions = {
    users : []
}


class UserAccess{
    inAccount(login,password){
        this.login = login
        this.pass = password
        let res
        UserBase.list.forEach((item,i) => {
            if( UserBase.list[i].User.nickname === this.login ){
                if ( UserBase.list[i].User.password === this.pass ){
                    res = this.sessionCreater(item)
                }
            }
           
        })
        return res
    };
    sessionCreater(user){
        let sessionCreate = {}
        sessionCreate.key = SecureKeyAccount.AccessKey_1
        sessionCreate.id = user.User.id
        sessionCreate.name = user.User.name
        sessionCreate.active =  user.User.active
        userSessions.users.push(sessionCreate)
        return sessionCreate
    }
    userFavoriteProducts(event, idProduct, userKey){
        userSessions.users.forEach((item,i) => {
            if(item.key === userKey){
                if ( event === 'push' ){item.active.myCart.push(idProduct)}
                if ( event === 'splice' ){item.active.myCart.splice(item.active.myCart.indexOf(idProduct), 1)}
            }
        })
    }
    OutAccount(id, key){
        this.id = id
        this.keyAccount = key
        let res
        userSessions.users.forEach((item,i) => {
            if( item.id === this.id ){
                if ( item.key === this.keyAccount ){
                    userSessions.users.splice(i , 1)
                    res = true
                }
            }
           
        })
        return res
    }
    sessionControl(){

    }
}
let ServeerAccess = new UserAccess()