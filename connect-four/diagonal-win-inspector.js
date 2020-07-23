export class DiagonalWinInspector{
    constructor(columns){
        this.columns = columns
    }

    inspect(){
        let cols = this.columns.map(column => column.columnArray);
        for (let i=0; i<6; i++){
            let startsUpwardDiagonal = (cols[0][i] &&
                cols[0][i] === cols[1][i+1] &&
                cols[1][i+1] === cols[2][i+2] &&
                cols[2][i+2] === cols[3][i+3]);
            let startsDownwardDiagonal = (cols[0][i] &&
                cols[0][i] === cols[1][i-1] &&
                cols[1][i-1] === cols[2][i-2] &&
                cols[2][i-2] === cols[3][i-3]);
            if(startsUpwardDiagonal || startsDownwardDiagonal) return cols[0][i];
        }
        return 0;
    }
}