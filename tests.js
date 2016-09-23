//Here I test all public methods I can test. 

//Test the model

//Create an empty model, verify cells are as expected
//Create an empty model,call setCell for a couple things
//Create an empty model, call setCells for an array from presets
//Create a model, add stuff, call clear
//create a model, add stuff, call step a few times, checking each one

//Result is cells return from calling getCells() on a board
//Expected is cells created
//Precondition: result and expected are 2d arrays of same dimensions
function assertCellsEqual(result, expected, assert){
    functionalsUtil.fromTo(function(i){
        assert.deepEqual(result[i], expected[i])
    }, 0, result.length);
}

function emptyArray(size){
    var cells=[];
    //Initialize a square board of size n, with all cells dead.
    functionalsUtil.times(function(){
        row = [];
        functionalsUtil.times(function(){
            row.push(false)}, size);
        cells.push(row);
    }, size);
    return cells;
}
    

QUnit.test( "Create empty board", function( assert ) {
    var b =Board(5);
    var expected = emptyArray(5);
    assertCellsEqual(b.getCells(), expected, assert);
});

QUnit.test( "test setCell", function( assert ) {
    var b =Board(5);
    b.setCell(3, 2, true);
    b.setCell(1, 2, true);
    var expected = [[false, false, false, false, false], 
                    [false, false, true, false, false], 
                    [false, false, false, false, false], 
                    [false, false, true, false, false], 
                    [false, false, false, false, false]]
    assertCellsEqual(b.getCells(), expected, assert);
});

QUnit.test( "test setCellsTrue", function( assert ) {
    var b =Board(5);
    b.setCellsTrue([[3, 2],[1,2]], true);
    var expected = [[false, false, false, false, false], 
                    [false, false, true, false, false], 
                    [false, false, false, false, false], 
                    [false, false, true, false, false], 
                    [false, false, false, false, false]]
    assertCellsEqual(b.getCells(), expected, assert);
});

QUnit.test( "test clear", function( assert ) {
    var b =Board(5);
    b.setCellsTrue([[3, 2],[1,2]]);
    b.clear();
    var expected = emptyArray(5);
    assertCellsEqual(b.getCells(), expected, assert);
});

QUnit.test( "test step", function( assert ) {
    var b =Board(10);
    b.setCellsTrue(presets.preset1);
    b.step();
    var expected = emptyArray(10);
    expected[6][4]=true;
    expected[6][6]=true;
    expected[7][5]=true;
    expected[7][6]=true;
    expected[8][5]=true;
    assertCellsEqual(b.getCells(), expected, assert);
});

QUnit.test( "Instatiate UI", function( assert ) {
    var board = Board(15);
    board.setCellsTrue(presets["preset1"]);
    controller = initController(board);
    viewInstall($('#cellsPictures'), board, assert);
    assert.ok(controller);
});