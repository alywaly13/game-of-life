var Board = function(n){

    var that = Object.create(Board.prototype)
    //Our rep is a 2D array. Each element of cells represents a row, so cells[i][j] is the element at 
    //row i, column j. Each element of the row is a boolean value, true if the cell is alive, and
    //false otherwise. 
    var cells=[];
    //A copy of cells, to show changes during a step() operation.
    var newcells;
    var size=n; 
    var subscribers = [];

   //Initialize a square board of size n, with all cells dead.
    functionalsUtil.times(function(){
        row = [];
        functionalsUtil.times(function(){
            row.push(false)}, size);
        cells.push(row);
    }, size);
       
    //clear all the cells; everything is dead
    that.clear = function(){
        functionalsUtil.forAllCells(function(i,j){
            cells[i][j]=false;
        }, size);
    }
    
    that.getCells = function(){
        return cells;
    }

    //set the cell at i j to true or false
    that.setCell = function(i,j, boolVal){
        cells[i][j]=boolVal;
        callSubscribers();
    }
    
    //set the cells at i j to true
    //arry is an array of (arrays of length 2), which represent indices of cells
    //to set to true. For example, [[i,j], [i,j]...]
    that.setCellsTrue = function(arry){
        arry.forEach(function(indices){
            cells[indices[0]][indices[1]]= true;
        });
        callSubscribers();
    };
    
    that.getSize = function(){
        return size;
    };
    
    that.getValue = function(i,j){
        return cells[i][j];
    };
    
    that.printCells = function(){
        var str = "";
        for (var i=0; i<size; i++){
            str = str + "\n";
            for (var j=0; j<size; j++){
                str =str + " " + cells[i][j];
            }
        }
        console.log(str);
    }
    
    //functional
    //is like reduce, except it goes through all the neighbors of a cell, 
    //instead of elements of an array
    var reduceNeighbors = function(f, i, j, initial){
        var ans = initial;
        if (i>=1){
            ans = f(ans, cells[i-1][j]);
            if (j>=1){
                ans = f(ans, cells[i-1][j-1]);
            }
            if (j<=size-2){
                ans = f(ans, cells[i-1][j+1]);
            }
        }
        if (j>=1){
            ans = f(ans, cells[i][j-1]);
        }
        if (j<=size-2){
            ans = f(ans, cells[i][j+1]);
        }
        if (i<=size-2){
            ans = f(ans, cells[i+1][j]);
            if (j>=1){
                ans = f(ans, cells[i+1][j-1]);
            }
            if (j<=size-2){
                ans = f(ans, cells[i+1][j+1]);
            }
        }
        return ans;
    };
    
    /*
    Sets the new state of cell at i,j according to these rules:
    Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by over-population.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    */
    var stepCell = function(i,j){
        var countNeighbors = function(prev, curr){
            var inc = curr? 1:0
            return prev + inc;
        };
        var numNeighbors = reduceNeighbors(countNeighbors, i, j, 0);
        if (cells[i][j]){
            if (numNeighbors <2 || numNeighbors > 3){
                newcells[i][j]=false;
            }
        }
        else{
            if (numNeighbors==3){
                newcells[i][j]=true;
            }
        }
    };
    
    //steps all the cells
    that.step = function(){
        newcells = cells.map(function(row){return row.map(function(x){return x})});
        functionalsUtil.forAllCells(stepCell, size);
        cells = newcells.map(function(row){return row.map(function(x){return x})});
        callSubscribers();
    };
    
    var callSubscribers = function(){
        subscribers.forEach(function(f){
            f();
        });
    };
    
    that.subscribe = function(f){
        subscribers.push(f);
    };
    
    Object.freeze(that);
    return that;
        
};