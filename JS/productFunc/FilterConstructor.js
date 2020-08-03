"use strict"
class FilterConstructor extends ProductBuild{
    constructor(){
        super()
        this.inputs = document.querySelectorAll('.filter-tools label')
        this.filterBTN = document.querySelector('.filter-block-btn')
        this.filterBlocks = ['brand', 'color','price', 'size']
        this.items = [ data.prodList.list.brand, data.prodList.list.cost,
        data.prodList.list.color, data.prodList.list.size ]
    }
    filterInit(){
        this.minMax()
        this.filterIn()
    }
    minMax(){
        let costLength = []
        data.prodList.list.forEach(item => {
            costLength.push(+item.cost.new)
        })
        data.costMin = Math.min.apply(null, costLength)
        data.costMax = Math.max.apply(null, costLength)
        data.input.children[0].children[0].value = data.costMin
        data.input.children[1].children[0].value = data.costMax
    }
    filterIn(){
        this.inputs.forEach((item, i) => {
            if ( this.inputs[i].children[0].type === 'number' ){
                this.inputs[i].children[0].addEventListener('input', (e)=>{
                    let minMaxValue = false
                    this.events(minMaxValue,e.target.name);
                })
            }
            item.addEventListener('change', (e) => {
                let minMaxValue = false
                if ( e.target.type === 'number' ){ minMaxValue = false }
                this.events(minMaxValue, e.target.name)
            })
        })
    };
    events(minMaxValue, e){
        let inputMinValue = +data.input.children[0].children[0].value,
        inputMaxValue = +data.input.children[1].children[0].value
        this.getProdList()
        this.filterBlocks.forEach((item,i) => {
            let filterItem = document.querySelector('.filter-' + item + '-tools')
            this.filterOut(filterItem, i, item, inputMinValue,inputMaxValue)
        })
        if( minMaxValue === true )this.minMax()
        if ( inputMinValue > inputMaxValue){
            if(e === 'minCost'){
                data.input.children[0].children[0].value = inputMaxValue
            }else {
                data.input.children[1].children[0].value = inputMinValue
            }
        }
    } 
    filterOut(filterItem, index, itemII, inputMinValue,inputMaxValue){
        let p = []
        for ( let i = 0; i < filterItem.children.length; i++ ){
            if ( itemII === 'price' ){ 
                p = [1]
             }else{
                if( filterItem.children[i].children[0].checked === true ){
                    p.push(filterItem.children[i].children[0].getAttribute('id'))
                }
             }
        }
        if(p.length > 0){
            this.test(p, index, itemII, inputMinValue,inputMaxValue)
        }
        this.out()
    };
    test(k, index, itemII, inputMinValue,inputMaxValue){
            let vII = []
            for(let i = 0; i < k.length; i++) {
                data.prodList.list.forEach(item => {
                    if ( itemII === this.filterBlocks[0] ){
                        if(k[i] === item.brand) {vII.push(item)}
                    }else if ( itemII === this.filterBlocks[1] ){
                        if(k[i] === item.color) {vII.push(item)}
                    }else if ( itemII === this.filterBlocks[2] ){
                        if(inputMinValue <= item.cost.new && item.cost.new <= inputMaxValue){
                             vII.push(item)
                            }
                    }else if ( itemII === this.filterBlocks[3] ){
                        if(k[i] === item.size) vII.push(item)
                    }
                })
            }
            data.prodList.list = vII
    }
}
