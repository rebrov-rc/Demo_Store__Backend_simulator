"use strict"
class ProductBuild  { 
    constructor(){
        this.addCreated = []
        this.container = document.querySelector('.product-cards-wrap')
    };
    getProdList(){ 
        data.prodList.list = JSON.parse(JSON.stringify(products)).list
    }
    init(){
        this.out()
    };
    out(search){
        if( localStorage.getItem('addedProduct') ){
            this.addCreated = JSON.parse(localStorage.getItem('addedProduct'))
        }
        
        this.container.innerHTML = ''
        if ( data.searchState === true ){
                data.prodList.list = data.search
        }

        data.prodList.list.forEach((item, i) => {
            if ( data.viewType === 0 ){ 
                this.container.classList.remove('f-column')
                this.blockView(item, i)}else
            if ( data.viewType === 1 ){ this.tableView(item, i) }else
            if ( data.viewType === 2 ){ this.listView(item, i) }

        });
        this.rating(data.prodList)
        const addProductToCart = new AddProduct(this.addCreated)
        addProductToCart.init()
    };
    blockView(item, i){
        return (
            this.container.innerHTML += (`
                <div class='card top-list'>
                    ${this.discount(data.prodList.list[i])}
                    <div class='card__img-wrap'>
                        <img src=${data.prodList.list[i].img[0]} >
                    </div>
                    <div class='card-buy-btn-wrap'>
                        <div class='add-product-to-cart abs-plus abs flx f-center' id='${data.prodList.list[i].id}'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class='card-rating-wrap flx'>
                        <div class="rate-widget flx">
                            <div class="stars-wrap sw-${data.prodList.list[i].id} f-center flx"></div>
                            <div class="title f-center flx"></div>
                        </div>
                        <div class=' flx f-center' id='${data.prodList.list[i].id}'>
                            <i class="fa fa-heart" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class='card-brand'>${data.prodList.list[i].brand}</div>
                    <div class='card-product-name_and_cost-wrap flx f-between'>
                        <div class='card-prod-name'>${data.prodList.list[i].name}</div>
                        <div class='card-prod-cost flx'>${this.oldCost(data.prodList.list[i].cost)}</div>
                    </div>
                    <div class='card-prod-characteristics-wrap flx'>
                        <div class='card-color'><span>Color:</span> ${data.prodList.list[i].color} </div>
                        <div class='card-size'><span> Size:</span> ${data.prodList.list[i].size} </div>
                    </div>
                </div>
            `)
        )
    };
    tableView(item, i){
        this.container.classList.add('f-column')
        return (
            this.container.innerHTML += (`
                <div class='card flx f-between top-list'>
                    ${this.discount(data.prodList.list[i])}
                    <div class='card__img-wrap '>
                        <img class='img-small' src=${data.prodList.list[i].img[0]} >
                    </div>
                    <div class='card-brand f-center flx'>${data.prodList.list[i].brand}</div>
                    <div class='card-product-name_and_cost-wrap  f-center flx'>
                        <div class='card-prod-name'>${data.prodList.list[i].name}</div>
                        <div class='card-prod-cost flx'>${this.oldCost(data.prodList.list[i].cost)}</div>
                    </div>
                    <div class='card-prod-characteristics-wrap f-center flx'>
                        <div class='card-color'>Color: ${data.prodList.list[i].color} </div>
                        <div class='card-size'> Size: ${data.prodList.list[i].size} </div>
                    </div>
                    <div class='card-rating-wrap f-center flx'>
                        <div class="rate-widget flx">
                            <div class="stars-wrap sw-${data.prodList.list[i].id} f-center flx"></div>
                            <div class="title f-center flx"></div>
                        </div>
                    </div>
                    <div class='card-buy-btn-wrap flx f-center'>
                        <div class='add-product-to-cart relative flx f-center' id='${data.prodList.list[i].id}'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            `)
        )
    };
    listView(item, i){
        this.container.classList.add('f-column')
        return (
            this.container.innerHTML += (`
                <div class='card flx f-between top-list'>
                    <div class='card-brand f-center flx'>${data.prodList.list[i].brand}</div>
                    <div class='card-product-name_and_cost-wrap  f-center flx'>
                        <div class='card-prod-name'>${data.prodList.list[i].name}</div>
                        <div class='card-prod-cost flx'>${this.oldCost(data.prodList.list[i].cost)}</div>
                    </div>
                    <div class='card-prod-characteristics-wrap f-center flx'>
                        <div class='card-color'>Color: ${data.prodList.list[i].color} </div>
                        <div class='card-size'> Size: ${data.prodList.list[i].size} </div>
                    </div>
                    <div class='card-rating-wrap f-center flx'>
                        <div class="rate-widget flx">
                            <div class="stars-wrap sw-${data.prodList.list[i].id} f-center flx"></div>
                            <div class="title f-center flx"></div>
                        </div>
                    </div>
                    <div class='card-buy-btn-wrap'>
                        <div class='add-product-to-cart  flx f-center' id='${data.prodList.list[i].id}'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                `)
            )
    };
    oldCost(cost){
        let convert, simbol
        if ( data.course === 0 ){ convert = 1 ; simbol = ' &#36;'}
        if ( data.course === 1 ) {convert = data.euro ; simbol = ' &euro;'}
        if ( data.course === 2 ) {convert = data.pound ; simbol = '	&pound;'} 
        if (cost.old === '' || cost.old === undefined){
            return (`<div class='new-cost'>${Math.floor(cost.new * convert) + simbol}</div>`)
        }else if (cost.old != '') {
            return (`<div class='old-cost'>${Math.floor(cost.old * convert) + simbol} </div>  <div class='new-cost'>${Math.floor(cost.new * convert) + simbol}</div>`)
        }
    };
    discount(props){
        if ( props.discount != null ) {
            return (`<div class='card-discount f-center flx abs'>-${props.discount}%</div>`)
        }else{ return '' }
    };
    rating(props){
        for(let i = 0; i < props.list.length; i++ ){
            data.prodList.list[i].rating.object = new Rating('lock'+props.list[i].id, 'sw-'+props.list[i].id, 'wr-'+props.list[i].id, 'stars-'+props.list[i].id, 'rate-widget .title')
            data.prodList.list[i].rating.object.init(i)
        }
    };
}
