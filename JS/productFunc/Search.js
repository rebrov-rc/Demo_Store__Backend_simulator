"use strict"
class Search extends ProductBuild{
    constructor(){
        super()
        this.input = document.querySelector('.search-input')
        this.dropList = document.querySelector('.search-drop-list')
        this.btn = document.querySelector('.search-btn')
    }
    start(){
        this.event()
    }
    event(){
        this.input.addEventListener('input', () => {
            this.getProdList() // ????????????????
            this.dropList.innerHTML = ''
            data.search = []
            data.prodList.list.forEach((item, i) => {
                let f = item.name.toLowerCase().indexOf(this.input.value.toLowerCase())
                if ( this.input.value === '' ){ 
                    this.dropList.innerHTML = ''
                    data.searchState = false
                    data.search = data.prodList.list
                 }else
                if ( f != -1 ) {
                    data.searchState = true // ????????????

                    data.search.push(item)
                    this.dropList.innerHTML += (`<div class='hover-color'>${item.name}</div>`)
                }

            });

            this.out()
        })
        this.btn.addEventListener('click', () => {
            console.log(789); 
        })
    }
}