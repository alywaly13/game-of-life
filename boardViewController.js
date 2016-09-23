//This instantiates the view, and puts a subscriber to be called when 
//the board model is changed. 

var viewInstall = function(domContainer, board){
    
    /**
   * Create an <img> that represents an alive or dead cell
   * @param {boolean} value - Whether the cell is dead or alive.
   **/
    var addImg = function(i,j) {
        var img = $("<img>");
        if (board.getValue(i,j)){
            img.attr("src", "./blueCell.jpg");
        }
        else{
            img.attr("src", "./lightpinkCell.jpg");
        }
        img.attr("class", "smallCellPicture");
        controller.setClickListener(img, i,j);
        domContainer.append(img);
    };
    
    //Create the images that will make up the board display
    var displayBoard = function(){
        domContainer.empty();
        functionalsUtil.fromTo(function(i){
            functionalsUtil.fromTo(function(j){
                addImg(i, j);
                }, 
                0, board.getSize());
            domContainer.append($("<br>"));
        }, 
        0, board.getSize());
    };
    
    displayBoard();
    
    //subscriber pattern!
    board.subscribe(displayBoard);
};