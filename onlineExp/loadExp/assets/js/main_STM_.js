//------------------------------------------------------------------------------------------------------------------
/* GLOBAL */
const DEBUG = true;
const DEV = getMedium() === "mturk_sandbox"; // if sandbox is in the URL, we are in developer (DEV) mode

var config = {}; // general experiment configurations
var runInfo = {}; // specific settings for this run
var state = {
    phase: "STM",
    taskIndex: -1, // nextTasks increments it at the top
    pressedIndexSTM: [], // won't keep adding key presses when button is not released
    pressedIndexLTM: [],
    allPressedIndexSTM: [], // will keep adding key presses whenever button is down
    allPressedIndexLTM: [],
    assignmentId: gup("assignmentId"),
    workerId: gup("workerId"),
    medium: getMedium()
};

var mturkPayload = {
        'assignmentId': state.assignmentId,
        'workerId': state.workerId,
        'run': [],
        'sequenceFile': [],
        'pressedIndex': [],
        'allPressedIndex':[],
        'timestamp': [],
        'earnedBonus': 0
};


var numSTMTrials = 0; // initializing
var numLTMTrials = 0; // initializing

var imagesSTM = new Array();
var imagesLTM = new Array();
var fixation = new Image();

// Boolean switches
var preview = isPreview(state.assignmentId);
var fkeyIsDown = false;
var jkeyIsDown = false;
var listeningSTM = false; // consequences given to response key presses
var listeningLTM = false; // consequences given to response key presses

// SessionStorage
/** Built-in javascript object. SessionStorage properties allow to save key/value pairs in a web browser.
The sessionStorage object stores data for only one session (the data is deleted when the browser tab is closed).
 Using it here for parameters we need to preserve across runs within a sessions**/
if (sessionStorage.assignmentId) {
    if (sessionStorage.assignmentId != state.assignmentId) { // assignmentId changed, means new HIT, means reset
        console.log("resetting");
        sessionStorage.bonusEarned = 0;
        sessionStorage.runInSession = 0;
        sessionStorage.assignmentId = state.assignmentId;
    }
}else{
    console.log("initializing sessionStorage properties");
  sessionStorage.bonusEarned = 0;
  sessionStorage.runInSession = 0;
  sessionStorage.assignmentId = state.assignmentId;
}

//------------------------------------------------------------------------------------------------------------------
/* HELPER FUNCTIONS */
function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    console.log(tmpURL);
    var results = regex.exec(tmpURL);
    if (results == null) return "external";
    else return results[1];
}

function getMedium(){
    /** To make the distinction between test runs in the Sandbox, participants participating through mTurk and
     *  participants participating through other media (e.g., received link via email)
     */
    var tmpURL = window.location.href;
    if (tmpURL.includes("turk")){
        if (tmpURL.includes("sandbox")){
            medium = "mturk_sandbox";
        }
        else {
            medium = "mturk";
        }
    }else{
        medium = "external";
    }
    return (medium)
}

function isPreview(assignmentId){
    // mTurk will use "ASSIGNMENT_ID_NOT_AVAILABLE" as the assignmentId when it's a preview
    if (assignmentId== "ASSIGNMENT_ID_NOT_AVAILABLE") {
        return true;
    }
    else {
        return false;
    }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function blinkBorder(color, elementId, ms) {
    var border = document.getElementById(elementId);
    normalColor = border.style.outlineColor;
    border.style.outlineColor = color;
    border.style.outlineWidth = "2px";
    console.log("chaning border");
    setTimeout(function () {
        border.style.outlineColor = 'grey';
        border.style.outlineWidth = "1px";
    }, 150);
}

function hideAllExcept(page){
    $("#experiment").css("display", "none");
    $("#loadingImages").css("display", "none");
    $("#instructionsSTM").css("display", "none");
    $("#instructionsLTM").css("display", "none");
    $("#sorry").css("display", "none");
    $("#endGame").css("display", "none");
    $("#".concat(page)).css("display", "flex");
}

function computeScoreSTM(){
    var numCorrectSTM = 0;
    for (var i = 0; i < state.pressedIndexSTM.length; i++){
        if (state.pressedIndexSTM[i] == "f" && runInfo.condition_STM[i]=="different"){
            numCorrectSTM++;
        }
        else if (state.pressedIndexSTM[i] == "j" && runInfo.condition_STM[i]=="same"){
            numCorrectSTM++;
        }
    }
    var scoreSTM = Math.ceil(100*numCorrectSTM/state.pressedIndexSTM.length).toString();

    return (scoreSTM);
}

function computeScoreLTM(){
    var numCorrectLTM = 0;
    for (var i = 0; i < state.pressedIndexLTM.length; i++){
        if (state.pressedIndexLTM[i] == "f" && runInfo.condition_LTM[i]=="target"){
            numCorrectLTM++;
        }
        else if (state.pressedIndexLTM[i] == "j" && runInfo.condition_LTM[i]=="filler"){
            numCorrectLTM++;
        }
    }
    var scoreLTM = Math.ceil(100*numCorrectLTM/state.pressedIndexLTM.length).toString();
    console.log(numCorrectLTM);

    return (scoreLTM);
}

//------------------------------------------------------------------------------------------------------------------
/* DRAWING FUNCTIONS */
function setCanvasBackground(elementId, color){
    var canvas = document.getElementById(elementId);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSquares(elementId, coordinates, colors) {
    console.log(coordinates);
    var canvas = document.getElementById("display");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < colors.length; i++){
        console.log(i);
        console.log(coordinates[i]);
        ctx.fillStyle = colors[i];
        ctx.fillRect(coordinates[i][0][0],
            coordinates[i][0][1],
            coordinates[i][1][0] -  coordinates[i][0][0],
            coordinates[i][1][1] -  coordinates[i][0][1]);
    }
}

//------------------------------------------------------------------------------------------------------------------
/* SETTING UP PAGE ELEMENTS*/
function populateMetadata(config) {
    $("#normal-title").html(config.meta.title);
    console.log(config.meta.title);
    if (preview) {
        $("#preview-appendix").html(" - PREVIEW");
    } else {
        $("#preview-appendix").html("");
    }
    $("#desc-STM").html(config.instructions.STM.description);
    $("#desc-LTM").html(config.instructions.LTM.description);
    $("#instructions-simple-STM").html(config.instructions.STM.simple);
    $("#instructions-simple-LTM").html(config.instructions.LTM.simple);
    $("#prerequisites-simple-STM").html(config.prerequisites.simple);
    $("#instructions-oneliner-STM").html(config.instructions.STM.oneliner);
    $("#instructions-oneliner-LTM").html(config.instructions.LTM.oneliner);
    document.getElementById("prompt").innerHTML= config.instructions.LTM.prompt;
    $("#sorry_image").attr('src', config.meta.sorry);

    // Add list of instruction steps to instruction page
    for (var i = 0; i < config.instructions.STM.steps.length; i++) {

        var node = document.createElement("LI");
        node.innerHTML = config.instructions.STM.steps[i];
        node.style.marginBottom = "5px";
        document.getElementById("instruction-steps-STM").appendChild(node);
    }

    for (var i = 0; i < config.instructions.LTM.steps.length; i++) {

        var node = document.createElement("LI");
        node.innerHTML = config.instructions.LTM.steps[i];
        node.style.marginBottom = "5px";
        document.getElementById("instruction-steps-LTM").appendChild(node);
    }

    // Add list of prerequisites to instruction page
    for (var i = 0; i < config.prerequisites.steps.length; i++) {

        var node = document.createElement("LI");
        node.innerHTML = config.prerequisites.steps[i];
        node.style.marginBottom = "5px";
        document.getElementById("prerequisites-STM").appendChild(node);
    }

    // Add final instruction note (reminder, summary)
    $(".instructions-final-notes-STM").html(config.instructions.STM.final_notes);
    $(".instructions-final-notes-LTM").html(config.instructions.LTM.final_notes);


    // Add identifier instructions (participation code they need to enter)
    $(".identifier-STM").html(config.instructions.STM.identifier);

    // Populate text on endScreen
    for (var i = 0; i < config.endText.instructions.length; i++) {
        var node = document.createElement("LI");
        node.innerHTML = config.endText.instructions[i];
        node.style.marginBottom = "10px";
        document.getElementById("end-instructions").appendChild(node);
    }

    // Populate disclaimer
    $(".disclaimer").html(config.meta.disclaimer);
    if (config.instructions.STM.images.length > 0) {
        $("#sample-task").css("display", "block");
        var instructionsIndex = Math.floor(Math.random() * config.instructions.STM.images.length);
        var imgEle = "<img class='instructions-img' src='";
        imgEle += config.instructions.STM.images[instructionsIndex] + "'></img>";
        $("#instructions-demo").append($(imgEle));

    }

}

function setupButtons() {
    // button shown on the instruction page to proceed to next page
    $(".instruction-button").click(function() {
        if (state.phase == "STM") {
            setupExperiment();
        }
        else {
            document.getElementById("instructions-oneliner-STM").style.display="none";
            document.getElementById("instructions-oneliner-LTM").style.display="block";
            hideAllExcept("loadingImages")
        }

        });

    // Start button that is shown after images have been load, will start first trial
    $("#start-button").addClass("disabled");
    $("#start-button").click(function () {
        // $("#experiment").css("display", "flex");
        // $("#loadingImages").css("display", "none");
        // $("#instructions-STM").css("display", "none");
        // $("#instructions-LTM").css("display", "none");

        if (state.phase == "STM"){
            hideAllExcept("experiment");
            document.getElementById("display").style.display = "none";
            document.getElementById("mem_image").style.display = "none";
            document.getElementById("countdown").style.display = "inline";

            countDown(config.meta.countDownStart, config.meta.countDownDuration);

            setTimeout(function(){
                document.getElementById("countdown").style.display = "none";
                document.getElementById("mem_image").style.display = "";
                document.getElementById("mem_image").src = config.meta.fixation;
                setTimeout(function () {
                    nextSTMTrial();
                }, config.meta.blankDuration)
            }, config.meta.countDownDuration*config.meta.countDownStart)
        }
        else{
            hideAllExcept("experiment");
            document.getElementById("mem_image").src = fixation.src;
            setTimeout(function(){
                nextLTMTrial();
            }, config.meta.blankDuration)
        }
    });

    // Allow workers to work more for bonus
    $("#more-button").click(restart);
    //$("#no-more-button").click(showSubmitPage);

    // Submit button to submit to Amazon and finish HIT
    //$("#submit-button").click(submitHIT);
    //if (state.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
       // $("#submit-button").remove();
    //}
    // rescue buttons are meant to allow workers to still submit if something goes wrong with the experiment
    // NOTE: you will have to think about where and how things could go wrong and enable the button there
    // $("#rescue-button").addClass("disabled");
    // $("#rescue-button").click(showSubmitPage);
    // $("#rescue-button2").addClass("disabled");
    // $("#rescue-button2").click(showSubmitPage);
}

//------------------------------------------------------------------------------------------------------------------
/* KEY PRESSES */
function processKeyDown(e) {

    // STM phase
    if (listeningSTM){
        switch (e.keyCode) {
            case 70:
                console.log('f key down')
                console.log(state)
                if (!fkeyIsDown) {
                    state.pressedIndexSTM[state.taskIndex] = "f"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_STM[runInfo.runIndex][state.taskIndex] == "different") {
                            blinkBorder("#33cc33", "frame",150);
                        } else {
                            blinkBorder("red","frame", 150)
                        }
                    }
                }
                fkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndexSTM)) {
                    state.allPressedIndexSTM[state.taskIndex] = ["f"]
                }
                else {
                    state.allPressedIndexSTM[state.taskIndex].push("f")
                }

                break;

            case 74:
                console.log('j key down')
                console.log(state)
                if (!jkeyIsDown) {
                    state.pressedIndexSTM[state.taskIndex] = "j"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_STM[runInfo.runIndex][state.taskIndex] == "same") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red","frame", 150);
                        }
                    }
                }
                jkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndexSTM)) {
                    state.allPressedIndexSTM[state.taskIndex] = ["j"]
                }
                else {
                    state.allPressedIndexSTM[state.taskIndex].push("j")
                }

                break;

            default:
                return; // Do nothing for the rest
        }
    }

    // LTM phase
    if (listeningLTM) {
        switch (e.keyCode) {
            case 70:
                console.log('f key down')
                console.log(state)
                if (!fkeyIsDown) {
                    state.pressedIndexLTM[state.taskIndex] = "f"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_LTM[runInfo.runIndex][state.taskIndex] == "target") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red", "frame", 150);
                        }
                    }
                }

                fkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndexLTM)) {
                    state.allPressedIndexLTM[state.taskIndex] = ["f"]
                } else {
                    state.allPressedIndexLTM[state.taskIndex].push("f")
                }

                break;

            case 74:
                console.log('j key down')
                console.log(state)
                if (!jkeyIsDown) {
                    state.pressedIndexLTM[state.taskIndex] = "j"

                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_LTM[runInfo.runIndex][state.taskIndex] == "filler") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red", "frame", 150);
                        }
                    }
                }
                jkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndexLTM)) {
                    state.allPressedIndexLTM[state.taskIndex] = ["j"]
                } else {
                    state.allPressedIndexLTM[state.taskIndex].push("j")
                }
                break;

            default:
                return; // Do nothing for the rest
        }
    }
}

function processKeyUp(e){
    if (listeningSTM){
        switch (e.keyCode) {
            case 70:
                if (fkeyIsDown) {
                    console.log('f up')
                    fkeyIsDown = false;
                    document.getElementById("display").style.display = "none";
                    document.getElementById("mem_image").style.display = "";
                    setTimeout(function(){
                        nextSTMTrial();
                    },config.meta.blankDuration);
                }
                break;
            case 74:
                if (jkeyIsDown) {
                    console.log('j up');
                    jkeyIsDown = false;
                    document.getElementById("display").style.display = "none";
                    document.getElementById("mem_image").style.display = "";
                     setTimeout(function(){
                        nextSTMTrial();
                    },config.meta.blankDuration);
                }
                break;
            case 37:
            //console.log('Go to the previous page!');
            //break;
            case 39:
            //console.log('Got to the next page');
            //break;

            default:
                return; // Do nothing for the rest
        }
    }
    if (listeningLTM){
        switch (e.keyCode) {
            case 70:
                if (fkeyIsDown) {
                    console.log('f up')
                    fkeyIsDown = false;
                    //document.getElementById("mem_image").style.visibility = "visible";
                    document.getElementById("prompt").style.display = "none";
                    document.getElementById("mem_image").src = fixation.src;
                    document.getElementById("mem_image").style.display = "inline";
                    setTimeout(function(){
                        nextLTMTrial();
                    },config.meta.blankDuration);
                }
                break;
            case 74:
                if (jkeyIsDown) {
                    console.log('j up');
                    jkeyIsDown = false;
                    document.getElementById("prompt").style.display = "none";
                    document.getElementById("mem_image").src = fixation.src;
                    document.getElementById("mem_image").style.display = "inline";
                     setTimeout(function(){
                         nextLTMTrial();
                    },config.meta.blankDuration);
                }
                break;
            case 37:
            //console.log('Go to the previous page!');
            //break;
            case 39:
            //console.log('Got to the next page');
            //break;

            default:
                return; // Do nothing for the rest
        }
    }
}

//------------------------------------------------------------------------------------------------------------------
/* EXPERIMENT FlOW */
function setupExperiment() {
    // $("#experiment").css("display", "none");
    // $("#instructions-STM").css("display", "none");
    // $("#instructions-LTM").css("display", "none");
    // $("#loadingImages").css("display", "none");



    if (state.workerId == "external") {
        state.workerId = $("#idcode-text").val();
    }
    // Don't let experiment start when worker is on phone or tablet
    if (isMobileDevice()) {
        $("#sorry_text").html(config.sorry.phone);
        $//("#sorry").css("display", "flex");
        hideAllExcept("sorry");

    } else {

        $("#sorry").css("display", "none");
        // Check if it's a preview
        if (state.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            $("#submit-button").remove();
            initializePreview();
        } else {
         // Initialize Run
            initializeRun();
        }
    }
}

function initializePreview() {
    //  TO DO: define what to do when in preview mode
}

function initializeRun() {

    //Fetching runInfo
    var initializeUrl = config.advanced.serverUrl + "initializerun";
    var workerData = {
        "workerId": state.workerId,
        "medium": state.medium,
        "trialFeedback": config.advanced.trialFeedback
    };
    $.ajax({
        url:  initializeUrl,
        type: 'GET',
        data: workerData
    }).then(function (response) {
        console.log("workerData received from Server:", response);
    })

    // Fetching runInfo
    $.getJSON( "".concat("./sequences/",state.workerId,".json")).done(function (response) {
        console.log("workerData loaded:", response);
        runInfo = response;

        hideAllExcept("loadingImages");

        numSTMTrials = runInfo.condition_STM[runInfo.runIndex].length;
        numLTMTrials = runInfo.condition_LTM[runInfo.runIndex].length;
        if (DEBUG) {
            console.log('In DEBUG MODE')
            numSTMTrials = 3;
            numLTMTrials = 3;
        }

        // Preload images and make start button appear
        preload().done(function () {
            $("#start-button").removeClass("disabled");
        })

    }).fail(function (error) {
        // This means there was an error
        //$("#sorry").css("display", "flex");
        $("#sorry_text").html(config.sorry.error_first);
        hideAllExcept("sorry");
        console.log("ERROR", error);
    })
}

function preload() {
    var progressBarLength = runInfo.condition_STM[runInfo.runIndex].length
    progressBarLength += runInfo.condition_LTM[runInfo.runIndex].length+1;

    for (var i = 0; i < runInfo.condition_STM[runInfo.runIndex].length; i++) {
        imagesSTM[i] = new Image();
        imagesSTM[i].src = runInfo.image_file_STM[runInfo.runIndex][i];

        $("#progress-bar").css('width', String(100 * (i + 1) / progressBarLength) + "%");
        $("#progress_text").html(String(100 * (i + 1) /progressBarLength) + "%");

    }
    for (var i = 0; i < runInfo.condition_LTM[runInfo.runIndex].length; i++) {
        imagesLTM[i] = new Image();
        imagesLTM[i].src = runInfo.image_file_LTM[runInfo.runIndex][i];
        $("#progress-bar").css('width', String(100 * (i + runInfo.condition_STM[runInfo.runIndex].length + 1) / progressBarLength) + "%");
        $("#progress_text").html(String(Math.ceil(100 * (i + runInfo.condition_STM[runInfo.runIndex].length + 1) /progressBarLength) + "%"));
    }

    fixation.src = config.meta.fixation;
    $("#progress-bar").css('width', String(100 * (progressBarLength) / progressBarLength) + "%");
    $("#progress_text").html(String(Math.ceil(100 * (progressBarLength) /progressBarLength) + "%"));

    return $.get("").then(function () {
        return;
    });

}

function countDown(start, duration) {
    document.getElementById("countdown").innerHTML = start.toString();
    function doSetTimeout(k) {
        setTimeout(function () {
            console.log(start-k);
            document.getElementById("countdown").innerHTML = (start - k).toString();
        }, duration*k);
    }
    for (var i = 1; i < start; i++) {
        doSetTimeout(i);
    }
}

function nextSTMTrial() {
    listeningSTM = false;
    state.taskIndex++;

    if (state.taskIndex == numSTMTrials){
        state.phase = "LTM";
        state.taskIndex = -1; //nextLTM increments it at the top
        hideAllExcept("instructionsLTM");

    }
    else{
        console.log(state.taskIndex)
        console.log("Current pressedIndex", state.pressedIndexSTM);
        console.log("Current allPressedIndex", state.allPressedIndexSTM);
        document.getElementById("mem_image").style.display = "none";
        setCanvasBackground("display", "#a6a6a6");
        drawSquares("display", runInfo.display0[runInfo.runIndex][state.taskIndex], runInfo.colors[runInfo.runIndex][state.taskIndex]);

        document.getElementById("display").style.display = "";
        setTimeout(function () {
                //document.getElementById("mem_image").style.visibility = "hidden";
                document.getElementById("mem_image").src = fixation.src;
                document.getElementById("display").style.display = "none";
                document.getElementById("mem_image").style.display = "";

                setTimeout(function(){
                    document.getElementById("mem_image").src = imagesSTM[state.taskIndex].src;
                    setTimeout(function(){
                        document.getElementById("mem_image").src = fixation.src;
                        setTimeout(function(){
                            listeningSTM = true;
                            document.getElementById("display").style.display = "";
                            document.getElementById("mem_image").style.display = "none";
                            setCanvasBackground("display", "#a6a6a6");
                            drawSquares("display", runInfo.display1[runInfo.runIndex][state.taskIndex], [runInfo.cue_color[runInfo.runIndex][state.taskIndex]]);

                        }, config.meta.blankDuration)
                    }, config.meta.imageDurationSTM);
                }, config.meta.blankDuration);
        }, config.meta.display0Duration);
    }
}

function nextLTMTrial() {
    listeningLTM = false;
    state.taskIndex++;

    if (state.taskIndex == numLTMTrials){
        finishRun();
        hideAllExcept("endGame");
    }
    else{
        console.log(state.taskIndex)
        console.log("Current pressedIndex", state.pressedIndexLTM);
        console.log("Current allPressedIndex", state.allPressedIndexLTM);
        document.getElementById("prompt").style.display = "none";
        $('#mem_image').attr("src", imagesLTM[state.taskIndex].src);
        document.getElementById("mem_image").style.display = "inline";
        document.getElementById("mem_image").style.visibility= "visible";

        setTimeout(function () {
                listeningLTM = true;
                document.getElementById("mem_image").style.display = "none";
                document.getElementById("prompt").style.display = "inline";
        }, config.meta.imageDurationLTM);
    }
}

function finishRun() {
    // Compute score
    var scoreSTM = computeScoreSTM();
    var scoreLTM = computeScoreLTM();

    // Update feedback
    document.getElementById("score-STM").innerHTML = scoreSTM + "%";
    document.getElementById("score-LTM").innerHTML = scoreLTM + "%";

    // Update earnings
    sessionStorage.bonusEarned =  parseFloat(sessionStorage.bonusEarned) + parseFloat(config.hitCreation.rewardAmount);
    document.getElementById("earnings").innerHTML = String(sessionStorage.bonusEarned)+" USD";
}

function restart(){

    // restart means we are starting a new run within a session
    sessionStorage.runInSession++;

    // reset state values
    state.taskIndex =  0;
    state.pressedIndex = [];
    state.allPressedIndex =[];
    state.taskInputs = {};
    state.taskOutputs = [];
    state.phase = "STM";

    // back to instructions page
    hideAllExcept("instructionsSTM")
}

/* MAIN */
$(document).ready(function () {
    console.log("document ready");
    $.getJSON("config_external.json").done(function (data) {
        console.log("DEV", DEV);
        config = data;
        hideAllExcept("instructionsSTM");
        document.addEventListener("keydown", processKeyDown);
        document.addEventListener("keyup", processKeyUp);
        populateMetadata(config);
        setupButtons(config);
        setCanvasBackground("display", "#a6a6a6");
    });
});