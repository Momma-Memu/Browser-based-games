export class RowWinInspector{
    constructor(columns){
        this.columns = columns;
    }

    inspect(){
        for (let i=0; i<6; i++){
            let [col0, col1, col2, col3] = this.columns.map(col => col.columnArray);
            if (col0[i] && col0[i] === col1[i] && col1[i] === col2[i] && col2[i] === col3[i]){
                return col0[i];
            }
        }
        return 0;
    }
}