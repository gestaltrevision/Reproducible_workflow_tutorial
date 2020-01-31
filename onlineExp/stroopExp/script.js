// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// Add this for mTurk - Start
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const MTURK_SUBMIT = "https://www.mturk.com/mturk/externalSubmit";
const SANDBOX_SUBMIT = "https://workersandbox.mturk.com/mturk/externalSubmit";
const DEBUG = false;
const DEV = isSandbox(); // if sandbox is in the URL, we are in developer (DEV) mode

var config = {};
var state = {
    assignmentId: gup("assignmentId"),  // get the asssignmentId out of the URL (value will be "external" if not redirected from mTurk)
    workerId: gup("workerId"), // get the workerId out of the URL (value will be "external" if not redirected from mTurk)
};
var mturkPayload = { // add more keys if you want to send additional data to mTurk servers (e.g, experiment name, blockId, responses, etc.)
  'assignmentId': state.assignmentId,
  'workerId': state.workerId,
  'responses': {}
};

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
console.log(state);



// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// Add this for mTurk - END
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// Define study
const study = lab.util.fromObject({
  "messageHandlers": {},
  "title": "root",
  "type": "lab.flow.Sequence",
  "plugins": [
    {
      "type": "lab.plugins.Metadata"
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "stroop-task"
    }
  ],
  "metadata": {
    "title": "Stroop task",
    "description": "An implementation of the classic paradigm introduced by Stroop (1935).",
    "repository": "https:\u002F\u002Fgithub.com\u002FFelixHenninger\u002Flab.js\u002Ftree\u002Fmaster\u002Ftasks",
    "contributors": "Felix Henninger \u003Cmailbox@felixhenninger.com\u003E (http:\u002F\u002Ffelixhenninger.com)"
  },
  "parameters": {},
  "files": {},
  "responses": {},
  "content": [
    {
      "messageHandlers": {},
      "type": "lab.html.Screen",
      "responses": {
        "keypress(Space)": "continue"
      },
      "title": "Instruction",
      "content": "\u003Cheader class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ch1\u003EStroop Task\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n  \u003Cp\u003E\n    Welcome to the \u003Cstrong\u003EStroop experiment\u003C\u002Fstrong\u003E!\n  \u003C\u002Fp\u003E\n  \u003Cp\u003E\n    In this experiment, your task will be to \n    \u003Cstrong\u003Eidentify the color of the word shown \n    on the screen\u003C\u002Fstrong\u003E.\u003Cbr\u003E\n    The word itself is immaterial &mdash; \n    you can safely ignore it.\n  \u003C\u002Fp\u003E\n  \u003Cp\u003E\n    To indicate the color of the word, \n    please use the keys \u003Cstrong\u003Er\u003C\u002Fstrong\u003E, \n    \u003Cstrong\u003Eg\u003C\u002Fstrong\u003E, \u003Cstrong\u003Eb\u003C\u002Fstrong\u003E and \n    \u003Cstrong\u003Eo\u003C\u002Fstrong\u003E for \n    \u003Cspan style=\"color: red;\"\u003Ered\u003C\u002Fspan\u003E, \n    \u003Cspan style=\"color: green;\"\u003Egreen\u003C\u002Fspan\u003E, \n    \u003Cspan style=\"color: blue;\"\u003Eblue\u003C\u002Fspan\u003E and \n    \u003Cspan style=\"color: orange;\"\u003Eorange\u003C\u002Fspan\u003E, \n    respectively.\u003Cbr\u003E\n    Please answer quickly, and as \n    accurately as you can.\n  \u003C\u002Fp\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  Please press the space bar when you're ready.\n\u003C\u002Ffooter\u003E\n",
      "parameters": {},
      "files": {}
    },
    {
      "type": "lab.canvas.Frame",
      "context": "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ccanvas \u002F\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    What's the \u003Cem\u003Ecolor\u003C\u002Fem\u003E of \n    the word shown above? \u003Cbr\u003E\n    Please press \u003Ckbd\u003Er\u003C\u002Fkbd\u003E for red,\n    \u003Ckbd\u003Eg\u003C\u002Fkbd\u003E for green,\n    \u003Ckbd\u003Eb\u003C\u002Fkbd\u003E for blue and \u003Ckbd\u003Eo\u003C\u002Fkbd\u003E for orange.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
      "contextSelector": "canvas",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Practice frame",
      "content": {
        "messageHandlers": {},
        "type": "lab.flow.Loop",
        "responses": {},
        "templateParameters": [
          {
            "color": "red",
            "word": "red",
            "phase": "practice"
          },
          {
            "color": "green",
            "word": "green",
            "phase": "practice"
          },
          {
            "color": "blue",
            "word": "blue",
            "phase": "practice"
          },
          {
            "color": "orange",
            "word": "orange",
            "phase": "practice"
          }
        ],
        "title": "Practice task",
        "parameters": {},
        "files": {},
        "sample": {
          "mode": "draw-shuffle"
        },
        "shuffleGroups": [],
        "template": {
          "messageHandlers": {},
          "type": "lab.flow.Sequence",
          "responses": {},
          "title": "Trial",
          "parameters": {},
          "files": {},
          "content": [
            {
              "type": "lab.canvas.Screen",
              "content": [
                {
                  "type": "i-text",
                  "version": "2.4.4",
                  "originX": "center",
                  "originY": "center",
                  "left": 0,
                  "top": 0,
                  "width": 18.69,
                  "height": 36.16,
                  "fill": "black",
                  "stroke": null,
                  "strokeWidth": 1,
                  "strokeDashArray": null,
                  "strokeLineCap": "butt",
                  "strokeDashOffset": 0,
                  "strokeLineJoin": "round",
                  "strokeMiterLimit": 4,
                  "scaleX": 1,
                  "scaleY": 1,
                  "angle": 0,
                  "flipX": false,
                  "flipY": false,
                  "opacity": 1,
                  "shadow": null,
                  "visible": true,
                  "clipTo": null,
                  "backgroundColor": "",
                  "fillRule": "nonzero",
                  "paintFirst": "fill",
                  "globalCompositeOperation": "source-over",
                  "transformMatrix": null,
                  "skewX": 0,
                  "skewY": 0,
                  "text": "+",
                  "fontSize": "72",
                  "fontWeight": "normal",
                  "fontFamily": "sans-serif",
                  "fontStyle": "normal",
                  "lineHeight": 1.16,
                  "underline": false,
                  "overline": false,
                  "linethrough": false,
                  "textAlign": "center",
                  "textBackgroundColor": "",
                  "charSpacing": 0,
                  "id": "5",
                  "styles": {}
                }
              ],
              "files": {},
              "parameters": {},
              "responses": {},
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Fixation cross",
              "timeout": "500"
            },
            {
              "type": "lab.canvas.Screen",
              "content": [
                {
                  "type": "i-text",
                  "version": "2.4.4",
                  "originX": "center",
                  "originY": "center",
                  "left": 0,
                  "top": 0,
                  "width": 331.08,
                  "height": 36.16,
                  "fill": "${ this.parameters.color }",
                  "stroke": null,
                  "strokeWidth": 1,
                  "strokeDashArray": null,
                  "strokeLineCap": "butt",
                  "strokeDashOffset": 0,
                  "strokeLineJoin": "round",
                  "strokeMiterLimit": 4,
                  "scaleX": 1,
                  "scaleY": 1,
                  "angle": 0,
                  "flipX": false,
                  "flipY": false,
                  "opacity": 1,
                  "shadow": null,
                  "visible": true,
                  "clipTo": null,
                  "backgroundColor": "",
                  "fillRule": "nonzero",
                  "paintFirst": "fill",
                  "globalCompositeOperation": "source-over",
                  "transformMatrix": null,
                  "skewX": 0,
                  "skewY": 0,
                  "text": "${ this.parameters.word }",
                  "fontSize": "72",
                  "fontWeight": "bold",
                  "fontFamily": "sans-serif",
                  "fontStyle": "normal",
                  "lineHeight": 1.16,
                  "underline": false,
                  "overline": false,
                  "linethrough": false,
                  "textAlign": "center",
                  "textBackgroundColor": "",
                  "charSpacing": 0,
                  "id": "6",
                  "styles": {}
                }
              ],
              "files": {},
              "parameters": {},
              "responses": {
                "keydown(r)": "red",
                "keydown(g)": "green",
                "keydown(b)": "blue",
                "keydown(o)": "orange"
              },
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Stroop screen",
              "correctResponse": "${ this.parameters.color }"
            },
            {
              "type": "lab.canvas.Screen",
              "content": [],
              "files": {},
              "parameters": {},
              "responses": {},
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Inter-trial interval",
              "timeout": "500"
            }
          ]
        }
      }
    },
    {
      "type": "lab.canvas.Frame",
      "context": "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ccanvas \u002F\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    What's the \u003Cem\u003Ecolor\u003C\u002Fem\u003E of \n    the word shown above? \u003Cbr\u003E\n    Please press \u003Ckbd\u003Er\u003C\u002Fkbd\u003E for red,\n    \u003Ckbd\u003Eg\u003C\u002Fkbd\u003E for green,\n    \u003Ckbd\u003Eb\u003C\u002Fkbd\u003E for blue and \u003Ckbd\u003Eo\u003C\u002Fkbd\u003E for orange.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
      "contextSelector": "canvas",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Task frame",
      "content": {
        "messageHandlers": {},
        "type": "lab.flow.Loop",
        "responses": {},
        "templateParameters": [
          {
            "color": "red",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "red",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "red",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "red",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "red",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "red",
            "word": "orange",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "green",
            "word": "orange",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "blue",
            "word": "orange",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "red",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "green",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "blue",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "orange",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "orange",
            "phase": "task"
          },
          {
            "color": "orange",
            "word": "orange",
            "phase": "task"
          }
        ],
        "title": "Stroop task",
        "parameters": {},
        "files": {},
        "sample": {
          "mode": "draw-shuffle",
          "n": "5"
        },
        "shuffleGroups": [],
        "template": {
          "messageHandlers": {},
          "type": "lab.flow.Sequence",
          "responses": {},
          "title": "Trial",
          "parameters": {},
          "files": {},
          "content": [
            {
              "type": "lab.canvas.Screen",
              "content": [
                {
                  "type": "i-text",
                  "version": "2.4.4",
                  "originX": "center",
                  "originY": "center",
                  "left": 0,
                  "top": 0,
                  "width": 18.69,
                  "height": 36.16,
                  "fill": "black",
                  "stroke": null,
                  "strokeWidth": 1,
                  "strokeDashArray": null,
                  "strokeLineCap": "butt",
                  "strokeDashOffset": 0,
                  "strokeLineJoin": "round",
                  "strokeMiterLimit": 4,
                  "scaleX": 1,
                  "scaleY": 1,
                  "angle": 0,
                  "flipX": false,
                  "flipY": false,
                  "opacity": 1,
                  "shadow": null,
                  "visible": true,
                  "clipTo": null,
                  "backgroundColor": "",
                  "fillRule": "nonzero",
                  "paintFirst": "fill",
                  "globalCompositeOperation": "source-over",
                  "transformMatrix": null,
                  "skewX": 0,
                  "skewY": 0,
                  "text": "+",
                  "fontSize": "72",
                  "fontWeight": "normal",
                  "fontFamily": "sans-serif",
                  "fontStyle": "normal",
                  "lineHeight": 1.16,
                  "underline": false,
                  "overline": false,
                  "linethrough": false,
                  "textAlign": "center",
                  "textBackgroundColor": "",
                  "charSpacing": 0,
                  "id": "5",
                  "styles": {}
                }
              ],
              "files": {},
              "parameters": {},
              "responses": {},
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Fixation cross",
              "timeout": "500"
            },
            {
              "type": "lab.canvas.Screen",
              "content": [
                {
                  "type": "i-text",
                  "version": "2.4.4",
                  "originX": "center",
                  "originY": "center",
                  "left": 0,
                  "top": 0,
                  "width": 331.08,
                  "height": 36.16,
                  "fill": "${ this.parameters.color }",
                  "stroke": null,
                  "strokeWidth": 1,
                  "strokeDashArray": null,
                  "strokeLineCap": "butt",
                  "strokeDashOffset": 0,
                  "strokeLineJoin": "round",
                  "strokeMiterLimit": 4,
                  "scaleX": 1,
                  "scaleY": 1,
                  "angle": 0,
                  "flipX": false,
                  "flipY": false,
                  "opacity": 1,
                  "shadow": null,
                  "visible": true,
                  "clipTo": null,
                  "backgroundColor": "",
                  "fillRule": "nonzero",
                  "paintFirst": "fill",
                  "globalCompositeOperation": "source-over",
                  "transformMatrix": null,
                  "skewX": 0,
                  "skewY": 0,
                  "text": "${ this.parameters.word }",
                  "fontSize": "72",
                  "fontWeight": "bold",
                  "fontFamily": "sans-serif",
                  "fontStyle": "normal",
                  "lineHeight": 1.16,
                  "underline": false,
                  "overline": false,
                  "linethrough": false,
                  "textAlign": "center",
                  "textBackgroundColor": "",
                  "charSpacing": 0,
                  "id": "6",
                  "styles": {}
                }
              ],
              "files": {},
              "parameters": {},
              "responses": {
                "keydown(r)": "red",
                "keydown(g)": "green",
                "keydown(b)": "blue",
                "keydown(o)": "orange"
              },
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Stroop screen",
              "correctResponse": "${ this.parameters.color }"
            },
            {
              "type": "lab.canvas.Screen",
              "content": [],
              "files": {},
              "parameters": {},
              "responses": {},
              "messageHandlers": {},
              "viewport": [
                800,
                600
              ],
              "title": "Inter-trial interval",
              "timeout": "500"
            }
          ]
        }
      }
    },
    {
      "messageHandlers": {},
      "type": "lab.html.Screen",
      "responses": {},
      "title": "Thanks",
      "content": "\u003Cheader class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ch1\u003EThank you!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n  \u003Cp\u003E\n    You did a great job, thanks for taking the time!\n  \u003C\u002Fp\u003E\n  \u003Cbutton id=\"submit-button\" type=\"submit\" onclick=\"submitHIT()\" onshow=\"removeSubmitButtonIfExternal()\" \u003ESubmit\u003C\u002Fbutton\u003E\n \u003Cp\u003E\nPlease click submit\n  \u003C\u002Fp id=\"submit-form\"\u003E\n   \u003C\u002Fmain\u003E\n \u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    If you have any questions or comments about this \n    experiment,\u003Cbr\u003E please be invited to contact\n    \u003Ca href=\"http:\u002F\u002Ffelixhenninger.com\"\u003E\n    Felix Henninger\u003C\u002Fa\u003E.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n \u003Cform id=\"submit-form\" name=\"submit-form\"\u003E \u003C\u002Fp\u003E\n ",
      "timeout": "10",
      "parameters": {},
      "files": {}
    }
  ]
})



// Let's go!
study.run()



// button functionality

function addHiddenField(form, name, value) {
    var input = document.createElement("input");
    input.setAttribute("type","hidden");
    input.setAttribute("name",name);
    input.setAttribute("value",value);
    //var input = $("<input type='hidden' name='" + name + "' value=''>");
    form.appendChild(input);
}

function generateMessage(text) {
    console.log("generating message");
    document.getElementById("submission-feedback").innerHTML = text;
    return;

}

function submitHIT() {
    console.log("submitting HIT");
    var submitUrl = DEV ? SANDBOX_SUBMIT : MTURK_SUBMIT;

    document.getElementById('submit-button').classList.add("loading");

    // TO DO: maybe add some sort of validation

    mturkSubmit(submitUrl);
}

function mturkSubmit(submitUrl) {

    var form = document.getElementById("submit-form");
    addHiddenField(form, 'assignmentId', state.assignmentId);
    addHiddenField(form, 'workerId', state.workerId);
    addHiddenField(form, 'data', JSON.stringify(mturkPayload));

   document.getElementById("submit-form").setAttribute("action", submitUrl);
   document.getElementById("submit-form").setAttribute("method", "POST");
   document.getElementById("submit-form").submit();

    document.getElementById('submit-button').classList.remove("loading");
    // TO DO: add something to handle submission failures and display an appropriate negative message
    generateMessage("Thanks! Your task was submitted successfully.");
    document.getElementById('submit-button').classList.add("disabled");
}

function removeSubmitButtonIfExternal() {

  if (state.assignmentId == "external") {
    document.getElementById('submit-button').remove();
  }
}