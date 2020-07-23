
export class Column{
    constructor(){
        this.columnArray = [null, null, null, null, null, null]

    };
    add(playerNumber){
        this.columnArray[this.columnArray.indexOf(null)] = playerNumber;
    };

    getTokenAt(index){
        return this.columnArray[index]
    }

    isFull(){
        return !this.columnArray.includes(null);
    }
};
