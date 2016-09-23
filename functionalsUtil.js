var functionalsUtil = function(){
    
    //Calls function f on indices from value i to maxNum
    var fromTo = function(f, i, maxNum) {
        if (i === maxNum) return;
        f(i); 
        fromTo(f, i+1, maxNum);
	};
    
    //calls a function f an integer number i times
    var times = function(f, i){
        if (i==0){
            return;
        }
        f();
        times(f, i-1);
    }
    
    //iterates through all cells of an nXn array
    var forAllCells = function(f, n){
        fromTo(function(i){
            fromTo(function(j){
                f(i, j);
                }, 
                0, n);
        }, 
        0, n);
    }
    
    return{times:times,fromTo:fromTo, forAllCells:forAllCells}
}();
    