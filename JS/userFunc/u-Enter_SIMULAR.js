/**
 *  
 */
class UserEnter extends AddProduct{
    constructor(){
        super()
        this.modalWindow = document.querySelector('.modal-login-wrap')
        this.myAccount = document.querySelector('.account-access-wrap')
        this.btnEnter = document.querySelector('.modal-login-btn-enter')
        this.btnClose = document.querySelector('.close-modal-window')
        this.modalInfo = document.querySelector('.modal-window-inform')
        this.inputsOfAccess = document.querySelector('.modal-login-inputs-wrap')
        this.url = 'http://localhost:3200'
    }
    init(){
        /**
         * Add events on buttons
         */
        this.btnEnter.addEventListener('click', () => this.sendKey())
        // this.myAccount.addEventListener('click', () => this.getKey())
        this.myAccount.onclick = () => this.getKey()
        this.btnClose.addEventListener('click', ()=>{this.close()})
    }
    sendKey(){
        /**
         * Get value from inputs of Modal Window
         * Request Access
         */
        let login = this.inputsOfAccess.children[0].children[0].value,
        password = this.inputsOfAccess.children[1].children[0].value
        // this.inputsOfAccess.children[0].children[0]
        if( login === '' || password === ''){
            this.modalInfo.style.color = '#fff4be'
            this.modalInfo.innerHTML = '<div>Введите данные</div>'
        }else{
            this.modalInfo.innerHTML = ''
            this.into =  ServeerAccess.inAccount(login,password)
            console.log(this.into);
            if ( this.into != undefined ){
                data.userKey = this.into.key
                this.myAccount.children[1].innerHTML = `<div>${this.into.name}</div>`
                this.modalWindow.style.display = 'none'
                this.myAccount.style.color = '#00855d'
                console.log(this.into.key);
                localStorage.setItem('Key', JSON.stringify(this.into.key) )
                localStorage.setItem('addedProduct', JSON.stringify(this.into.active.myCart) )
                localStorage.setItem('userName', JSON.stringify(this.into.name) )
                this.myAccount.innerHTML += (`
                    <div class="account-drop-list">log out</div>
                `)
                document.querySelector('.account-drop-list').addEventListener('click', ()=>{this.logOut()})
                this.inputsOfAccess.children[0].children[0].value = ''
                this.inputsOfAccess.children[1].children[0].value = ''
                this.myAccount.onclick = null
                this.out()
                if( this.into.active.myCart.length > 0) {
                    this.cart('#f58923', `${this.into.active.myCart.length} items`)
                }
                // window.location.reload()
            }
        }

    }// -------------
    getKey(){
        this.modalWindow.style.display = 'flex'
        
    }
    close(){
        this.modalWindow.style.display = 'none'
    }
    logOut(){
        let id = this.into.id,
        key = this.into.key,
        active = this.into.active,
        res = ServeerAccess.OutAccount(id, key, active)
        if ( res === true ) {
            localStorage.setItem('Key', '' )
            localStorage.setItem('userName', '' )
            localStorage.setItem('addedProduct', '' )
            document.location.reload()
            // this.out()
        }

    }
}