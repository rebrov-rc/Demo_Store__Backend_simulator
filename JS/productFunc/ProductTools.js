"use strict"
class ProdoctTools extends ProductBuild {
    constructor(){
        super()
        this.views = document.querySelectorAll('.panel-view')
        this.btnSortAlpa = document.querySelector('.btn-sort-a-to-z')
        this.btnsMoney = document.querySelectorAll('.ch-money')
        this.itemPerPage = 4 
    };
    events(){ 
        this.views.forEach((item,i) => {
            item.addEventListener('click', () => {
                data.viewType = i
                this.out()
            })
        })
        this.btnsMoney.forEach((item, i) => {
            item.addEventListener('click', () => {
                data.course = i
                this.out() 
            })
        })
        this.btnSortAlpa.addEventListener('click', () => { this.sortAlphabet() })
    };
    sortPerPage(){ 

     };
    sortAlphabet(){ 
        data.prodList.list.sort((a,b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if( nameA < nameB ) return -1
            if( nameA > nameB ) return 1
            return 0
        })
        this.out()
     };
}