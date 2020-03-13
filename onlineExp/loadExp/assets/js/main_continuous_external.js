// ==============

/* GLOBAL */
const MTURK_SUBMIT = "https://www.mturk.com/mturk/externalSubmit";
const SANDBOX_SUBMIT = "https://workersandbox.mturk.com/mturk/externalSubmit";
const DEBUG = true;
const DEV = isSandbox(); // if sandbox is in the URL, we are in developer (DEV) mode

var config = {};
var state = {
    taskIndex: 0, //
    pressedIndex: [], // won't keep adding key presses when button is not released
    allPressedIndex: [], // will keep adding key presses whenever button is down
    taskInputs: {},
    taskOutputs: [],
    assignmentId: gup("assignmentId"),
    //assignmentId: "ASSIGNMENT_ID_NOT_AVAILABLE",
    // workerId: "dummy"
    workerId: gup("workerId"),
};
var mturkPayload = {
    'assignmentId': state.assignmentId,
    'workerId': state.workerId,
    'block': [],
    'sequenceFile': [],
    'pressedIndex': [],
    'allPressedIndex': [],
    'timestamp': [],
    'earnedBonus': 0
};

var blockInfo = {};
var images = new Array();
var displays0 = new Array();
var displays1 = new Array();
var windowURL = window.location.href;

if (state.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
    var preview = true;
} else {
    var preview = false;
}

var fkeyIsDown = false;
var jkeyIsDown = false;
var firstBlockInSession = true;
var numSubtasks = 0; // initializing
var phase = "STM"; // short term memory (STM) is first phase

var listening = true;

console.log("preview", preview);
/* NOT SURE WHAT THIS IS*/
function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    console.log(tmpURL);
    var results = regex.exec(tmpURL);
    if (results == null) return "external";
    else return results[1];
}

function isSandbox() {
    var tmpURL = window.location.href;
    return tmpURL.includes("sandbox")
}

/* HELPERS */

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

function replaceElement(oldId, newId) {
    oldElement = document.getElementById(oldId);
    newElement = document.getElementById(newId);
    oldElement.parentNode.replaceChild(newElement, oldElement);
}

function clearMessage() {
    $("#message-field").html("");
}

function generateMessage(cls, header) {
    clearMessage();
    if (!header) return;
    var messageStr = "<div class='ui message " + cls + "'>";
    messageStr += "<i class='close icon'></i>";
    messageStr += "<div class='header'>" + header + "</div></div>";

    var newMessage = $(messageStr);
    $("#message-field").append(newMessage);
    newMessage.click(function () {
        $(this).closest(".message").transition("fade");
    });
}

function addHiddenField(form, name, value) {
    // form is a jQuery object, name and value are strings
    var input = $("<input type='hidden' name='" + name + "' value=''>");
    input.val(value);
    form.append(input);
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

function processKeyDown(e) {
    if (listening){
        switch (e.keyCode) {
            case 70:
                console.log('f key down')
                console.log(state)
                if (!fkeyIsDown) {
                    if (state.taskIndex != -2) { // -2 and -1 or not "real" trials
                        state.pressedIndex[state.taskIndex] = "f"
                        if (blockInfo.condition[state.taskIndex] == "different") {
                                blinkBorder("#33cc33", "frame",150);
                            } else {
                                blinkBorder("red","frame", 150)
                            }
                    }
                }
                fkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndex)) {
                    state.allPressedIndex[state.taskIndex] = ["f"]
                }
                else {
                    state.allPressedIndex[state.taskIndex].push("f")
                }

                break;

            case 74:
                console.log('j key down')
                console.log(state)
                if (!jkeyIsDown) {
                    if (state.taskIndex != -2) { // -2 and -1 or not "real" trials
                        state.pressedIndex[state.taskIndex] = "j"

                        if (blockInfo.condition[state.taskIndex] == "same") {
                                blinkBorder("#33cc33", "frame","left_image", 150);
                            } else {
                                blinkBorder("red","frame", "left_image", 150)
                            }
                    }
                }
                jkeyIsDown = true;
                if (!(state.taskIndex in state.allPressedIndex)) {
                    state.allPressedIndex[state.taskIndex] = ["j"]
                }
                else {
                    state.allPressedIndex[state.taskIndex].push("j")
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

function processKeyUp(e){
    if (listening){
        switch (e.keyCode) {
            case 70:
                if (fkeyIsDown) {
                    console.log('f up')
                    fkeyIsDown = false;
                    document.getElementById("mem_image").style.visibility = "hidden";
                    setTimeout(function(){
                        nextTask();
                    },config.meta.blankDuration);
                }
                break;
            case 74:
                if (jkeyIsDown) {
                    console.log('j up');
                    jkeyIsDown = false;
                    document.getElementById("mem_image").style.visibility = "hidden";
                     setTimeout(function(){
                        nextTask();
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



/* SETTING UP PAGE ELEMENTS*/
function preload() {
    for (i = 0; i < blockInfo.condition.length; i++) {
        images[i] = new Image();
        images[i].src = blockInfo.image_file[i];
        displays0[i] = new Image();
        displays0[i].src = blockInfo.display_file0[i];
        displays1[i] = new Image();
        displays1[i].src = blockInfo.display_file1[i];

        $("#progress-bar").css('width', String(100 * (i + 1) / blockInfo.condition.length) + "%");
        $("#progress_text").html(String(100 * (i + 1) / blockInfo.condition.length) + "%");
        //$("#progress-bar").progress("set progress", i + 1);

    }
    return $.get("").then(function () {
        return;
    });

}

function populateMetadata(config) {
    $("#normal-title").html(config.meta.title);
    console.log(config.meta.title);
    if (preview) {
        $("#preview-appendix").html(" - PREVIEW");
    } else {
        $("#preview-appendix").html("");
    }
    $(".meta-desc").html(config.meta.description);
    $(".instructions-simple").html(config.instructions.simple);
    $(".prerequisites-simple").html(config.prerequisites.simple);
    $(".instructions-oneliner").html(config.instructions.oneliner);
    $("#sorry_image").attr('src', config.meta.sorry);
    for (var i = 0; i < config.instructions.steps.length; i++) {

        var node = document.createElement("LI");
        node.innerHTML = config.instructions.steps[i];
        node.style.marginBottom = "5px";
        document.getElementById("instruction-steps").appendChild(node);
    }
    for (var i = 0; i < config.prerequisites.steps.length; i++) {

        var node = document.createElement("LI");
        node.innerHTML = config.prerequisites.steps[i];
        node.style.marginBottom = "5px";
        document.getElementById("prerequisites").appendChild(node);
    }
    // for (var i = 0; i < config.instructions.steps.length; i++) {
    //     $(".instructions-steps").append($("<li>" + config.instructions.steps[i] + "</li>"));
    // }
    // for (var i = 0; i < config.prerequisites.steps.length; i++) {
    //     $(".prerequisites").append($("<li>" + config.prerequisites.steps[i] + "</li>"));
    // }
    console.log(config);
    for (var i = 0; i < config.endText.instructions.length; i++) {
        var node = document.createElement("LI");
        node.innerHTML = config.endText.instructions[i];
        node.style.marginBottom = "10px";
        document.getElementById("end-instructions").appendChild(node);
    }
    //var t = document.getElementById('end-instructions').children;
    // console.log(t);
    // for(i=0; i<t.length; i++){
    //     t[i].style.marginBottom="10px";
    // }

    $(".instructions-final-notes").html(config.instructions.final_notes);
    $(".final-notes").html(config.final_notes);
    $(".disclaimer").html(config.meta.disclaimer);
    if (config.instructions.images.length > 0) {
        $("#sample-task").css("display", "block");
        var instructionsIndex = Math.floor(Math.random() * config.instructions.images.length);
        var imgEle = "<img class='instructions-img' src='";
        imgEle += config.instructions.images[instructionsIndex] + "'></img>";
        $("#instructions-demo").append($(imgEle));

    }

}

function setupButtons() {
    $("#rescue-button").addClass("disabled");
    $("#rescue-button").click(showSubmitPage);
    $("#rescue-button2").addClass("disabled");
    $("#rescue-button2").click(showSubmitPage);
    $("#start-button").addClass("disabled");
    $("#start-button").click(function () {
        $("#experiment").css("display", "flex");
        $("#loadingImages").css("display", "none");
        $("#instructions").css("display", "none");
        document.addEventListener("keydown", processKeyDown);
        document.addEventListener("keyup", processKeyUp);

        nextTask();
    });
    $(".instruction-button").click(function(){
        if (state.phase == "STM"){
            setupExperiment();
        }
        else{
            hideAllExcept("loadingImages");
        }
    });
    $("#submit-button").click(submitHIT);
    $("#more-button").click(restart);
    $("#no-more-button").click(showSubmitPage);

    if (state.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
        $("#submit-button").remove();
    }

}


/* TASK FLOW */
function setupExperiment() {
    $("#experiment").css("display", "none");
    $("#instructions").css("display", "none");
    $("#loadingImages").css("display", "none");
    if (state.workerId == "external") {
        state.workerId = $("#idcode-text").val();
    }


    if (isMobileDevice()) {
        $("#sorry_text").html(config.sorry.phone);
        $("#sorry").css("display", "flex");

    } else {

        $("#sorry").css("display", "none");
        state.taskIndex = -1; //nextTask increments it at the top
        if (state.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            $("#submit-button").remove();
            initializePreview();
        } else {

            initializeBlock(state.workerId);
        }
    }
}

function fetchBlockInfo(workerId) {
    var initializetUrl = config.advanced.serverUrl + "/workerid";
    var workerData = {
        "workerId": workerId,
        "trialFeedback": config.advanced.trialFeedback
    };
    $.getJSON( "".concat("./sequences/",state.workerId,".json")).done(function (response) {
        if (!firstBlockInSession) {
            $("#rescue-button2").addClass("disabled");
            $("#rescue-button2").css("display", "none");
        }
        console.log("workerData loaded:", response);
        blockInfo = response;

        $("#loadingImages").css("display", "flex");
        numSubtasks = blockInfo.condition.length;
        if (DEBUG) {
            console.log('In DEBUG MODE')
            numSubtasks = 3;
        }

        preload().done(function () {
            console.log(images);
            $("#start-button").removeClass("disabled");
        })

    }).fail(function (error) {
        // This means there was an error connecting to the DEVELOPER'S
        // server and the game did not initialize correctly

        $("#sorry").css("display", "flex");

        console.log(firstBlockInSession);
        if (!firstBlockInSession) {
            console.log("rescue operation")
            $("#rescue-button").removeClass("disabled");
            $("#rescue-button").css("display", "flex");
            $("#sorry_text").html(config.sorry.error_later);
        } else {
            $("#sorry_text").html(config.sorry.error_first);
        }
        console.log("ERROR", error);


    })

}

function initializeBlock(workerId) {
    var initializetUrl = config.advanced.serverUrl + "/workerid";
    var workerData = {
        "workerId": workerId,
        "trialFeedback": config.advanced.trialFeedback
    };

    if (!firstBlockInSession) {
        $("#rescue-button2").removeClass("disabled").done(
            $("#rescue-button2").css("display", "flex").done(
                fetchBlockInfo(workerId)
            )

        );

    } else {
        fetchBlockInfo(workerId);
    }

}

function initializePreview() {
    console.log('Initializing Preview');
    var workerData = {
        "trialFeedback": config.advanced.trialFeedback
    };

    var initializetUrl = config.advanced.serverUrl + "/preview";
    $.ajax({
        url: initializetUrl,
        type: 'GET',
        data: workerData
    }).then(function (response) {
        console.log("workerData received from Server:", response);
        blockInfo = response;
        if (blockInfo.blocked || blockInfo.finished) {
            $("#sorry_text").html(config.sorry.noMoreHits);
            $("#sorry").css("display", "flex");
        } else {
            $("#loadingImages").css("display", "flex");
            numSubtasks = blockInfo.sequence.length;
            if (DEBUG) {
                console.log('In DEBUG MODE')
                numSubtasks = 3;
            }
            $("#progress-bar").progress({
                total: numSubtasks,
            });
            preload().done(function () {
                console.log(images);
                $("#start-button").removeClass("disabled");
            })
            //nextTask();
        }
    }).catch(function (error) {
        // This means there was an error connecting to the DEVELOPER'S
        // server and the game did not initialize correctly
        $("#sorry_text").html(config.sorry.error);
        $("#sorry").css("display", "flex");
        console.log("ERROR", error);

    })
}

function nextSTMTask() {
    if (state.taskIndex == blockInfo.sequence.length):
        setupLTM

    state.taskIndex++;
    console.log(state.taskIndex)
    console.log("Current pressedIndex", state.pressedIndex);
    console.log("Current allPressedIndex", state.allPressedIndex);
    document.getElementById("mem_image").style.visibility = "hidden";
    $('#mem_image').attr("src", displays0[state.taskIndex].src);
    document.getElementById("mem_image").style.visibility = "visible";
    setTimeout(function () {
            document.getElementById("mem_image").style.visibility = "hidden";
            setTimeout(function(){
                document.getElementById("mem_image").style.visibility = "visible";
                document.getElementById("mem_image").src = images[state.taskIndex].src;
                setTimeout(function(){
                    document.getElementById("mem_image").style.visibility = "hidden";
                    setTimeout(function(){
                        document.getElementById("mem_image").style.visibility = "visible";
                        document.getElementById("mem_image").src = displays1[state.taskIndex].src;
       ;
                    }, config.meta.blankDuration)
                }, config.meta.imageDuration);
            }, config.meta.blankDuration);
    }, config.meta.display0Duration);
}

function updateTask() {
    // show the user's task
    $('#custom-experiment').show();
    showTask(state.taskIndex);

    if (state.taskIndex == numSubtasks - 1) {
        // last page
        if (preview == false) {
            $("#submit-button").removeClass("disabled");

        }
        setTimeout(function () {
            finishBlock(config.advanced.serverUrl);
        }, config.meta.imageDuration + config.meta.fixationDuration);

    } else if (state.taskIndex == 0) {
        // first page
        $("#submit-button").addClass("disabled");
        $("#final-task-fields").css("display", "none");
    } else {
        // intermediate page
        $("#submit-button").addClass("disabled");
        $("#final-task-fields").css("display", "none");
    }
}

function showTask(taskIndex) {
    $(".exp-data").text("Input for task " + taskIndex.toString());
    $("#exp-input").focus();
    if (taskIndex == -1) {
        $('#mem_image').attr("src", config.meta.start);
    } else {
        $('#mem_image').attr("src", displays0[taskIndex].src);
    }
    console.log('showTask')
    setTimeout(function () {
        document.getElementById("mem_image").src = images[taskIndex].src;
        setTimeout(function(){
            document.getElementById("mem_image").src = displays1[taskIndex].src;
            setTimeout(function(){
                document.getElementById("mem_image").src = displays0[taskIndex+1].src;
            }, config.meta.display1Duration);
        }, config.meta.imageDuration);

    }, config.meta.display0Duration)
}

function finishBlock(serverUrl) {
    // stop listening for key presses
    document.removeEventListener("keydown", processKeyDown);
    document.removeEventListener("keyup", processKeyUp);
    // collect everything to be sent to server
    var responseUrl = serverUrl + "/responses"
    var payload = {
        'assignmentId': state.assignmentId,
        // 'assignmentId': "dummyassignmentid",
        'workerId': state.workerId,
        // 'workerId': "dummyworkerid1",
        'block': blockInfo.block,
        'sequenceFile': blockInfo.sequenceFile,
        'pressedIndex': state.pressedIndex,
        'allPressedIndex': state.allPressedIndex,
        'preview': preview,
        'timestamp': blockInfo.timestamp
    }

    if (!preview) {
        mturkPayload.block.push(blockInfo.block)
        mturkPayload.sequenceFile.push(blockInfo.sequenceFile)
        mturkPayload.pressedIndex.push(state.pressedIndex)
        mturkPayload.allPressedIndex.push(state.allPressedIndex)
        mturkPayload.timestamp.push(blockInfo.timestamp)
        mturkPayload.earnedBonus = mturkPayload.earnedBonus + parseFloat(config.hitCreation.rewardAmount)
    }

    console.log("payload", payload);
    console.log("responseUrl", responseUrl);
    console.log("mturPayload", mturkPayload);

    // setting up the page
    if (preview) {
        $("#end-text").html("This is a preview. If you wish to play the game for real, please accept the HIT first.")
        $("#end-text").css("color", "red");
        $("#stop-playing").css("display", "flex");
        $("#keep-playing").css("display", "none")
    }

    $("#final-task-fields").css("display", "block");
    $("#experiment").css("display", "none");
    $("#endGame").css("display", "flex");

    // send request
    $.ajax({
        url: responseUrl,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'json',
        contentType: "application/json"
    }).then(function (response) {
        console.log(response);
        if (response["blocked"] || response["finished"]) {
            $("#more-button").addClass("disabled");
            $("#maintenance-message").innerHTML = ""
        } else if (response["maintenance"]) {
            $("#more-button").addClass("disabled");
            document.getElementById("maintenance-message").innerHTML = "'Keep playing' unavailable at the moment due to maintance work, our apologies. Please submit!";
        }
        document.getElementById("repeats-detected").innerHTML = String(response["percentageCorrect"]) + "%";
        document.getElementById("wrong-presses").innerHTML = String(response["numFalseAlarms"]) + " times";
        document.getElementById("earnings").innerHTML = String(mturkPayload.earnedBonus) + " USD";
        //document.getElementById("percentage-correct").innerHTML = String(response["percentageCorrect"]) + "%";

        // Inform worker data was processed, unless it is a preview
        if (preview == false) {
            document.getElementById("earnings").innerHTML = String(mturkPayload.earnedBonus) + " USD";
        } else {
            document.getElementById("earnings").innerHTML = "This is a preview!";
        }


    }).catch(function (error) {
        // This means there was an error connecting to the DEVELOPER'S
        // data collection server.
        // even if there is a bug/connection problem at this point,
        // we want people to be paid.

        console.log("ERROR", error);

        if (preview == false) {
            document.getElementById("earnings").innerHTML = String(mturkPayload.earnedBonus) + " USD";
        } else {
            document.getElementById("earnings").innerHTML = "This is a preview!";
        }

        document.getElementById("repeats-detected").innerHTML = "ERROR";
        document.getElementById("wrong-presses").innerHTML = "ERROR";
        //document.getElementById("percentage-correct").innerHTML = "ERROR";

        $("#keep-playing").css("display", "none");
        $("#stop-playing").css("display", "flex");
        $("#end-text").html("Oops, something went wrong while uploading your responses. Don't worry, the problem is likely to be on our end. If you are connected to the internet, you should still be able to submit the HIT and you will still get paid.")
        $("#end-text").css("color", "red");



    })

}

function restart() {

    // restart means we are starting a new block within a session
    firstBlockInSession = false;
    console.log(firstBlockInSession);

    // reset state values
    state.taskIndex = 0;
    state.pressedIndex = [],
        state.allPressedIndex = [],
        state.taskInputs = {},
        state.taskOutputs = []

    // back to instructions page
    $("#experiment").css("display", "none");
    $("#loadingImages").css("display", "none");
    $("#instructions").css("display", "flex");
    $("#sorry").css("display", "none");
    $("#endGame").css("display", "none");
}

function showSubmitPage() {
    $("#endGame").css("display", "none");
    $("#loadingImages").css("display", "none");
    $("#submitPage").css("display", "flex");
    $("#sorry").css("display", "none");
}

/* SUBMITTING */
function submitHIT() {
    var submitUrl = DEV ? SANDBOX_SUBMIT : MTURK_SUBMIT;

    clearMessage();
    $("#submit-button").addClass("loading");

    // TO DO: maybe add some sort of validation

    mturkSubmit(submitUrl);
}

function cancelSubmit(err) {
    $("#submit-button").removeClass("loading");
    generateMessage("negative", err);
}

// submit to MTurk as a back-end. MTurk only accepts form submissions and frowns
// upon async POSTs.
function mturkSubmit(submitUrl) {
    // var payload = {
    //     'assignmentId': state.assignmentId,
    //     // 'assignmentId': "dummyassignmentid",
    //     'workerId': state.workerId,
    //     // 'workerId': "dummyworkerid1",
    //     'block': blockInfo.block,
    //     'sequenceFile': blockInfo.sequenceFile,
    //     'pressedIndex': state.pressedIndex,
    //     'allPressedIndex':state.allPressedIndex,
    //     'preview': preview,
    //     'timestamp': blockInfo.timestamp
    // }
    var form = $("#submit-form");
    addHiddenField(form, 'assignmentId', state.assignmentId);
    addHiddenField(form, 'workerId', state.workerId);
    addHiddenField(form, 'feedback', $("#feedback-input").val());
    //addHiddenField(form, 'data', JSON.stringify(payload));
    mturkPayload.earnedBonus = mturkPayload.earnedBonus - parseFloat(config.hitCreation.rewardAmount); // one rewardAmount is always already included for a submit, does not go in bonus
    addHiddenField(form, 'data', JSON.stringify(mturkPayload));

    $("#submit-form").attr("action", submitUrl);
    $("#submit-form").attr("method", "POST");
    $("#submit-form").submit();

    $("#submit-button").removeClass("loading");
    generateMessage("positive", "Thanks! Your task was submitted successfully.");
    $("#submit-button").addClass("disabled");
}

/* MAIN */
$(document).ready(function () {
    // document.onkeydown = function (e) {
    //     switch (e.keyCode) {
    //         case 82:
    //             console.log('r key pressed')
    //             console.log(state)
    //             if (state.taskIndex != -1 && state.taskIndex != -2) { // -2 and -1 or not "real" trials
    //                 state.pressedIndex.push(state.taskIndex)
    //             }
    //             blinkBorder("blue", "mem_image", 150);
    //             break;
    //         case 37:
    //             //console.log('Go to the previous page!');
    //             //break;
    //         case 39:
    //             //console.log('Got to the next page');
    //             //break;
    //
    //         default:
    //             return; // Do nothing for the rest
    //     }
    // };
    $.getJSON("config_external.json").done(function (data) {
        console.log("DEV", DEV);
        config = data;
        populateMetadata(config);
        setupButtons(config);
        $("#accept_first").html("")
    });
});