/**
 * Модуль пока не рабочий 
 */
class UserEnter{
    constructor(){
        this.btnEnter = document.querySelector('.modal-login-btn-enter')
        this.obj = ['TEST IS GOOD!']
        this.url = 'http://localhost:3200'
    }
    init(){
        this.btnEnter.addEventListener('click', ()=>{this.getKey()})
    }
    sendKey(){
        console.log(this.btnEnter);
        fetch(this.url + '/checkUser', {
            method: 'POST',
            body: JSON.stringify(this.obj)
        })
        .then(res => { return res.json()} )
        .then(response => {
            data.prodList = response
            console.log(data.prodList);
        })
    }
    getKey(){
        fetch(this.url + '/checkUser')
        .then(res => { return res.json()} )
        .then(response => {
            data.prodList = response
            console.log(data.prodList);
        })
    }
}