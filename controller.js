//Sets all the handlers

var initController = function(){
    
    //If the simulation is currently running or not
    var running=false;
    //The id of the running interval
    var runningId;
    
    function stepBoard(){
        board.step();
    };
    
    //called when the start/stop button is clicked
    function onStartStopClick(){
        if (running){
            //I just pushed the stop button
            clearInterval(runningId);
            $("#startStopButton").html("Start");
            $("#nextButton").prop('disabled', false);
            $("#presetDropdown").prop('disabled', false);
            running=false;
        }
        else{
            //I just pushed the start button
            running=true;
            $("#startStopButton").html("Stop");
            $("#nextButton").prop('disabled', true);
            $("#presetDropdown").prop('disabled', true);
            runningId = setInterval(stepBoard, 500);
        }    
    };
    
    //get a preset inital board state
    function onPresetClick(){
        var val = $("#presetDropdown").val();
        board.clear();
        board.setCellsTrue(presets[val]);
    };
    
    //create a new board of size selected in dropdown
    function onBoardSizeChange(){
        var val = parseInt($("#boardSizeDropdown").val());
        board = Board(val);
        onPresetClick();
        viewInstall($('#cellsPictures'), board);
    }
    
    //When cell is clicked, set its status to the opposite of what it was
    function setCellClickListener(cell, i,j){
        cell.click(function(){
            if (!running){
                board.setCell(i, j, !(board.getValue(i,j)));
            }
        });
    };
    
    //set Listeners
    $("#nextButton").click(stepBoard);
    $("#startStopButton").click(onStartStopClick);
    $("#presetDropdown").change(onPresetClick);
    $("#boardSizeDropdown").change(onBoardSizeChange);
    
    //setClickListener is the only method we need public access to
    return {setClickListener:setCellClickListener};
};