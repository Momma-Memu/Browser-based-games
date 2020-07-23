export class ColumnWinInspector{
    constructor(col){
        this.col = col
    }
    inspect(){
        let colString = this.col.columnArray.join('')
        if(colString.includes('1111')) return 1
        if(colString.includes('2222')) return 2
        return 0
    }
}