/**
 * jsPsych plugin for animating transparency of image
 * Sander Van de Cruys
 *
 * 
 */

jsPsych.plugins["animate-transparency"] = (function () {

    var plugin = {};

    //jsPsych.pluginAPI.registerPreload('animate-transparency', 'stimuli', 'image');

    plugin.info = {
        name: 'animate-transparency',
        description: '',
        parameters: {
            stimuli: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimuli',
                default: undefined,
                array: true,
                description: 'The images to be displayed.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show trial before it ends.'
            },
            orientation: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Mooney image orientation',
                default: 0,
                description: 'Mooney image orientation'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                pretty_name: 'Choices',
                default: jsPsych.ALL_KEYS,
                array: true,
                description: 'Keys subject uses to respond to stimuli.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed below stimulus.'
            },
            delay: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Time before animation starts (ms)',
                default: 200,
                description: 'Time before animation starts'
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, trial will end when subject makes a response.'
            },
        }
    }

    plugin.trial = function (display_element, trial) {

        var currentOpacity = -1 // starting value



        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#reveal { background:url(" + trial.stimuli[1] + ") no-repeat center; height:700px; left:-10px; position:absolute; top:-10px; width:700px;" +
            "opacity:0; animation: fadeIn " + (trial.trial_duration - trial.delay) / 1000 + "s cubic-bezier(.99,.49,.91,.66) " + trial.delay / 1000 + "s forwards; border: 10px solid black;}" +
            "#mooney { background:url(" + trial.stimuli[0] + ") no-repeat center; height:700px; position:relative; /* and this has to be relative */" +
            "width:700px;border: 10px solid black;" +
            "-webkit-transform: rotate(" + String(trial.orientation) + "deg);" +
            "-moz-transform: rotate(" + String(trial.orientation) + "deg);" +
            "-ms-transform: rotate(" + String(trial.orientation) + "deg);" +
            "-o-transform: rotate(" + String(trial.orientation) + "deg);" +
            "transform: rotate(" + String(trial.orientation) + "deg);}" +
            "@keyframes fadeIn { from {opacity: 0;} to {opacity: 1;}}";



        document.body.appendChild(css);

        display_element.innerHTML = '<div id="mooney"><div id="reveal"></div></div>'

        // add prompt
        if (trial.prompt !== null){
            display_element.innerHTML += trial.prompt;
        }
  

        // store response
        var response = {
            rt: null,
            key: null
        };

        // function to end trial when it is time
        var end_trial = function () {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // kill keyboard listeners
            if (typeof keyboardListener !== 'undefined') {
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }

            // gather the data to store for the trial
            var trial_data = {
                "rt": response.rt,
                "stimulus": trial.stimuli[0],
                "key_press": response.key,
                "opacity": parseFloat(currentOpacity)
            };

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };

        // function to handle responses by the subject
        var after_response = function (info) {

            // after a valid response, the stimulus will have the CSS class 'responded'
            // which can be used to provide visual feedback that a response was recorded
            //display_element.querySelector('#jspsych-image-keyboard-response-stimulus').className += ' responded';

            // only record the first response
            if (response.key == null) {
                response = info;
            }

            // get last opacity value
            var reveal = document.getElementById("reveal");
            var mooney = document.getElementById("mooney");
            currentOpacity = window.getComputedStyle(reveal).getPropertyValue("opacity");
            //console.log(currentOpacity);
            reveal.style.border = "10px solid green";
            mooney.style.border = "10px solid green";

            if (trial.response_ends_trial) {
                end_trial();
            }
        };

        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: 'date',
                persist: false,
                allow_held_key: false
            });
        }


        // end trial if trial_duration is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }

    };

    return plugin;
})();