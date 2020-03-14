//------------------------------------------------------------------------------------------------------------------
/* GLOBAL */
const DEBUG = false;
const DEV = getMedium() === "mturk_sandbox"; // if sandbox is in the URL, we are in developer (DEV) mode

var config = {}; // general experiment configurations
var runInfo = {}; // specific settings for this run
var state = {
    phase: "STM",
    trialIndex: -1, // nextTasks increments it at the top
    responseSTM: [],
    responseLTM: [],
    assignmentId: gup("assignmentId"),
    workerId: "", // initializing
    medium: getMedium(),
};

var numSTMTrials = 3; // initializing
var numLTMTrials = 3; // initializing

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
if (!sessionStorage.assignmentId || sessionStorage.assignmentId != state.assignmentId) {
    // if there is no assignmentId yet or it has changed, it means worker is running a new HIT, means reset
    console.log("resetting sessionStorage properties");
    sessionStorage.runInSession = JSON.stringify(0);;
    sessionStorage.assignmentId = JSON.stringify(state.assignmentId);
    sessionStorage.bonusEarned = JSON.stringify(0);
    sessionStorage.sessionData = JSON.stringify([]);
}

//------------------------------------------------------------------------------------------------------------------
/* HELPER FUNCTIONS */

function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    console.log(tmpURL);
    var results = regex.exec(tmpURL);
    if (results == null) return name + " not found";
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

function getWorkerId(){
    var medium = getMedium()
    if (medium == "mturk" || medium == "mturk_sandbox"){
        return(gup("workerId"))
    }else{
        return $("#idcode-text").val()
    }
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
    // not 100% fail proof, but good enough for most scenarios
    // non-mobile devices usually do not associate an orientation to the window (e.g., you don't use a laptop or
    // desktop upside-down
    return ((typeof window.orientation !== "undefined") ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
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
    $("#submitPage").css("display", "none");
    $("#".concat(page)).css("display", "flex");
}

function computeScoreSTM(){
    var numCorrectSTM = 0;
    for (var i = 0; i < state.responseSTM.length; i++){
        if (state.responseSTM[i] == "f" && runInfo.condition_STM[i]=="different"){
            numCorrectSTM++;
        }
        else if (state.responseSTM[i] == "j" && runInfo.condition_STM[i]=="same"){
            numCorrectSTM++;
        }
    }
    var scoreSTM = Math.ceil(100*numCorrectSTM/state.responseSTM.length).toString();

    return (scoreSTM);
}

function computeScoreLTM(){
    var numCorrectLTM = 0;
    for (var i = 0; i < state.responseLTM.length; i++){
        if (state.responseLTM[i] == "f" && runInfo.condition_LTM[i]=="target"){
            numCorrectLTM++;
        }
        else if (state.responseLTM[i] == "j" && runInfo.condition_LTM[i]=="filler"){
            numCorrectLTM++;
        }
    }
    var scoreLTM = Math.ceil(100*numCorrectLTM/state.responseLTM.length).toString();
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
    $("#requester-details").html("Requester: "+config.meta.requester);
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
            document.getElementById("instructions-oneliner-STM").style.display="block";
            document.getElementById("instructions-oneliner-LTM").style.display="none";
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

    // Rescue button (to allow workers to still submit if sth goes wrong with the server communication
    $("#rescue-button").addClass("disabled");
    $("#rescue-button").click(function(){hideAllExcept("submitPage");});

    // When worker does not want to complete more runs
    $("#no-more-button").click(function(){hideAllExcept("submitPage");});
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
                    state.responseSTM[state.trialIndex] = "f"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_STM[state.trialIndex] == "different") {
                            blinkBorder("#33cc33", "frame",150);
                        } else {
                            blinkBorder("red","frame", 150)
                        }
                    }
                }
                fkeyIsDown = true;
                break;

            case 74:
                console.log('j key down')
                console.log(state)
                if (!jkeyIsDown) {
                    state.responseSTM[state.trialIndex] = "j"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_STM[state.trialIndex] == "same") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red","frame", 150);
                        }
                    }
                }
                jkeyIsDown = true;
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
                    state.responseLTM[state.trialIndex] = "f"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_LTM[state.trialIndex] == "target") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red", "frame", 150);
                        }
                    }
                }
                fkeyIsDown = true;
                break;

            case 74:
                console.log('j key down')
                console.log(state)
                if (!jkeyIsDown) {
                    state.responseLTM[state.trialIndex] = "j"
                    if (config.advanced.trialFeedback){
                        if (runInfo.condition_LTM[state.trialIndex] == "filler") {
                            blinkBorder("#33cc33", "frame", 150);
                        } else {
                            blinkBorder("red", "frame", 150);
                        }
                    }
                }
                jkeyIsDown = true;
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

                    // Reset all key related vars
                    fkeyIsDown = false;
                    jkeyIsDown = false;
                    listeningSTM = false;

                    // Show fixation cross and launch new trial
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

                    // Reset all key related vars
                    fkeyIsDown = false;
                    jkeyIsDown = false;
                    listeningSTM = false;

                    // Show fixation cross and launch new trial
                    document.getElementById("display").style.display = "none";
                    document.getElementById("mem_image").style.display = "";
                     setTimeout(function(){
                        nextSTMTrial();
                    },config.meta.blankDuration);
                }
                break;

            default:
                return; // Do nothing for the rest
        }
    }
    if (listeningLTM){
        switch (e.keyCode) {
            case 70:
                if (fkeyIsDown) {
                    console.log('f up')

                    // Reset all key related vars
                    fkeyIsDown = false;
                    jkeyIsDown = false;
                    listeningLTM = false;

                    // Show fixation cross and launch new trial
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

                    // Reset all key related vars
                    fkeyIsDown = false;
                    jkeyIsDown = false;
                    listeningLTM = false;

                    // Show fixation cross and launch new trial
                    document.getElementById("prompt").style.display = "none";
                    document.getElementById("mem_image").src = fixation.src;
                    document.getElementById("mem_image").style.display = "inline";
                     setTimeout(function(){
                         nextLTMTrial();
                    },config.meta.blankDuration);
                }
                break;

            default:
                return; // Do nothing for the rest
        }
    }
}

//------------------------------------------------------------------------------------------------------------------
/* EXPERIMENT FlOW */
function setupExperiment() {

    // Get workerId
    state.workerId = getWorkerId()
    sessionStorage.workerId = getWorkerId()

    // Don't let experiment start when worker is on phone or tablet
    if (isMobileDevice()) {
        showSorry(config.sorry.phone.first, config.sorry.later)

    } else {
        // Check if it's a preview
        if (isPreview()) {
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
    // Here we'll ask the server to send back all the information we need to initialize a new series baseed
    // on the worker's unique ID
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
        runInfo = response;
        if (!DEBUG) {
            numSTMTrials = runInfo.image_file_STM.length;
            numLTMTrials = runInfo.image_file_LTM.length;
        }
        if (goodToGo()){
            // Preload images and make start button appear
            hideAllExcept("loadingImages");
            preload().done(function () {
                $("#start-button").removeClass("disabled");
            })
        }
   }).catch(function (error) {
        // This means there was an error connecting to the DEVELOPER'S
        // server and the game did not initialize correctly
        showSorry(config.sorryText.error.first, config.sorryText.error.later);
        console.log("ERROR", error)
    })
}

function showSorry(text_first, text_later){

    if (JSON.parse(sessionStorage.runInSession)!==0){
        // Make sure they can still submit previous runs within current session
        console.log("rescue operation")
        $("#rescue-button").removeClass("disabled");
        $("#rescue-button").css("display","flex");
        $("#sorry_text").html(text_later);
    }
    else{
        // Nothing to submit when it's the first run of a session
        $("#sorry_text").html(text_first);
    }
    hideAllExcept("sorry")
}

function goodToGo(){
    if (runInfo.blocked || runInfo.finished) {
        showSorry(config.sorryText.no_more_hits.first, config.sorryText.no_more_hits.later);
        return false
    } else if (runInfo.running) {
        showSorry(config.sorryText.running.first, config.sorryText.running.later);
        return false
    } else {
        return true
    }
}

function preload() {
    var progressBarLength = runInfo.condition_STM.length
    progressBarLength += runInfo.condition_LTM.length+1;

    for (var i = 0; i < runInfo.condition_STM.length; i++) {
        imagesSTM[i] = new Image();
        imagesSTM[i].src = runInfo.image_file_STM[i];

        $("#progress-bar").css('width', String(100 * (i + 1) / progressBarLength) + "%");
        $("#progress_text").html(String(100 * (i + 1) /progressBarLength) + "%");

    }
    for (var i = 0; i < runInfo.condition_LTM.length; i++) {
        imagesLTM[i] = new Image();
        imagesLTM[i].src = runInfo.image_file_LTM[i];
        $("#progress-bar").css('width', String(100 * (i + runInfo.condition_STM.length + 1) / progressBarLength) + "%");
        $("#progress_text").html(String(Math.ceil(100 * (i + runInfo.condition_STM.length + 1) /progressBarLength) + "%"));
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
    state.trialIndex++;

    if (state.trialIndex == numSTMTrials){
        state.phase = "LTM";
        state.trialIndex = -1; //nextLTM increments it at the top
        hideAllExcept("instructionsLTM");

    }
    else{
        console.log(state.trialIndex)
        console.log("Current response", state.responseSTM);
        document.getElementById("mem_image").style.display = "none";
        setCanvasBackground("display", "#a6a6a6");
        drawSquares("display", runInfo.display0[state.trialIndex], runInfo.colors[state.trialIndex]);

        document.getElementById("display").style.display = "";
        setTimeout(function () {
                //document.getElementById("mem_image").style.visibility = "hidden";
                document.getElementById("mem_image").src = fixation.src;
                document.getElementById("display").style.display = "none";
                document.getElementById("mem_image").style.display = "";

                setTimeout(function(){
                    document.getElementById("mem_image").src = imagesSTM[state.trialIndex].src;
                    setTimeout(function(){
                        document.getElementById("mem_image").src = fixation.src;
                        setTimeout(function(){
                            listeningSTM = true;
                            document.getElementById("display").style.display = "";
                            document.getElementById("mem_image").style.display = "none";
                            setCanvasBackground("display", "#a6a6a6");
                            drawSquares("display", runInfo.display1[state.trialIndex], [runInfo.cue_color[state.trialIndex]]);

                        }, config.meta.blankDuration)
                    }, config.meta.imageDurationSTM);
                }, config.meta.blankDuration);
        }, config.meta.display0Duration);
    }
}

function nextLTMTrial() {
    listeningLTM = false;
    state.trialIndex++;

    if (state.trialIndex == numLTMTrials){
        hideAllExcept("endGame");
        finishRun();
    }
    else{
        console.log(state.trialIndex)
        console.log("Current response", state.responseLTM);
        document.getElementById("prompt").style.display = "none";
        $('#mem_image').attr("src", imagesLTM[state.trialIndex].src);
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
    // Gather payload to be sent to server
    var payload = {
        assignmentId: state.assignmentId,
        workerId: state.workerId,
        indexToRun: runInfo.index_to_run,
        sequenceFile: runInfo.sequenceFile,
        responseSTM: state.responseSTM,
        responseLTM: state.responseLTM,
        preview: preview,
        timestamp: runInfo.timestamp,
        medium: state.medium
    }

    // Update sessionData
    if (!preview){
        var sessionData = JSON.parse(sessionStorage.sessionData);
        sessionData.push(payload);
        sessionStorage.sessionData = JSON.stringify(sessionData);
    }

    // Update earnings
    var bonusEarned = parseFloat(JSON.parse(sessionStorage.bonusEarned))
    bonusEarned += config.hitCreation.rewardAmount
    sessionStorage.bonusEarned = JSON.stringify(bonusEarned);
    if (preview){
            document.getElementById("earnings").innerHTML = "This is a preview!";
    }else{
            document.getElementById("earnings").innerHTML = String(bonusEarned)+" USD";
    }

    // Send data
    var finalizeUrl = config.advanced.serverUrl + "finalizerun";

    console.log(payload);
    $.ajax({
        url: finalizeUrl,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'json',
        contentType: "application/json"
    }).then(function (response) {
        console.log(response);

        // compute scores
        var scoreSTM = Math.ceil(response["prop_correct_stm"]*100).toString() + "%";
        var scoreLTM = Math.ceil(response["prop_correct_ltm"]*100).toString() + "%";
        document.getElementById("score-STM").innerHTML = scoreSTM;
        document.getElementById("score-LTM").innerHTML = scoreLTM;

        if (response["blocked"] || response["finished"] ){
            $("#more-button").addClass("disabled");
            $("#maintenance-message").innerHTML = ""
        }
        else if(response["maintenance"]) {
            $("#more-button").addClass("disabled");
            document.getElementById("maintenance-message").innerHTML = config.maintenanceText;
        }

    }).catch(function (error) {
        // This means there was an error connecting to the DEVELOPER'S
        // data collection server.
        // even if there is a bug/connection problem at this point,
        // we want people to be paid.
        console.log("ERROR", error);

        // compute scores
        var scoreSTM = "ERROR";
        var scoreLTM = "ERROR";
        document.getElementById("score-STM").innerHTML = scoreSTM;
        document.getElementById("score-LTM").innerHTML = scoreLTM;

        // display error message
        $("#keep-playing").css("display","none");
        $("#stop-playing").css("display","flex");
        $("#error-text").html("Oops, something went wrong while uploading your responses. Do not worry, the problem is likely to be on our end. If you are connected to the internet, you should still be able to submit the HIT. If not, please contact the requester and we will make it right.")
        $("#error-text").css("color", "red");
    })






}

function restart(){

    // restart means we are starting a new run within a session
    sessionStorage.runInSession++;

    // reset state values
    state.trialIndex =  0;
    state.response = [];
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