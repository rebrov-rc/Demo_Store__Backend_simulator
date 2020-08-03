"use strict"
class AddProduct extends ProductBuild{
    constructor(added){
        super()
        this.prodItems = document.querySelectorAll('.add-product-to-cart')
        this.cartConteiner = document.querySelector('.my-cart')
        this.counter = 0
        this.added = added
    }
    init(){
        this.events()
        this.adding()
    };
    events(){
        this.prodItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                let getId = item.getAttribute('id')
                this.adding(getId)
                localStorage.setItem('addedProduct', JSON.stringify(this.added))
            }) 
            this.added.forEach(itemAd => { 
                if ( item.getAttribute('id') === itemAd ){
                    document.getElementById(itemAd).innerHTML = (`
                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                    `)
                }

            }) 
        })
    };
    adding(getId){
        if ( this.added.indexOf(getId) === -1 && getId != undefined){
            this.added.push(getId)
            if (data.userKey != '') ServeerAccess.userFavoriteProducts('push', getId,data.userKey)
            document.getElementById(getId).innerHTML = (`
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
            `)
        }else if(getId != undefined){
            this.added.splice(this.added.indexOf(getId), 1)
            if (data.userKey != '')ServeerAccess.userFavoriteProducts('splice', getId,data.userKey)
            document.getElementById(getId).innerHTML = (`
                <i class="fa fa-plus" aria-hidden="true"></i>
            `)
        }
        if (this.added.length === 0){
            this.cart('#bac1c3','cart is empty' )
        }else{
            this.cart('#f58923', `${this.added.length} items`)

        }
    };
    cart(bgc, text){
        this.cartConteiner.children[0].style.background = bgc
        this.cartConteiner.children[1].children[1].innerHTML = text
    }
}