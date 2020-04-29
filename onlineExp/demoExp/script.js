// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata"
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "study"
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "version": "2.7.0",
          "originX": "center",
          "originY": "center",
          "left": 0,
          "top": 0,
          "width": 475.48,
          "height": 36.16,
          "fill": "#000000",
          "stroke": "#000000",
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
          "text": "Welcome to this example experiment",
          "fontSize": 32,
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
          "id": "3",
          "styles": {}
        }
      ],
      "files": {},
      "parameters": {},
      "responses": {
        "keypress(Space)": "continue"
      },
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
// returns param value from url if name/key given
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

this.parameters.subject_id = getParameterByName('PROLIFIC_PID');
}
      },
      "viewport": [
        800,
        600
      ],
      "title": "Welcome"
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\u003Cdiv class=\"w-l text-left\" style=\"display: block\"\u003E\n\u003Ch3\u003EPlease consider this information carefully before deciding whether to participate in this research\u003C\u002Fh3\u003E\n        \u003Cul\u003E\u003Cli\u003E\u003Cb\u003EPurpose of the research\u003C\u002Fb\u003E: To examine how people process images.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003EWhat you will do in this research\u003C\u002Fb\u003E:  Stimuli (images) will be presented on the computer and you will be asked different questions about them.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003ETime required\u003C\u002Fb\u003E: Participation will take max 60 minutes to complete.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003ERisks\u003C\u002Fb\u003E:  There are no anticipated risks associated with participating in this study. The effects of participating should be comparable to those you would experience from viewing a computer monitor for 60 minutes and using a mouse or keyboard.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003EBenefits\u003C\u002Fb\u003E:  This study provides no benefits to you individually. The study provides important information about the nature of perception and learning.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003EConfidentiality\u003C\u002Fb\u003E:  Your participation in this study will remain confidential. No personally identifiable information will be associated with your data. Your de-identified data may be shared with other researchers and used in future projects.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003EParticipation and withdrawal\u003C\u002Fb\u003E:  Your participation in this study is completely voluntary and you may refuse to participate or you may choose to withdraw at any time without penalty.\u003C\u002Fli\u003E\n        \u003Cli\u003E\u003Cb\u003EHow to contact the researchers\u003C\u002Fb\u003E: If you have questions or concerns about your participation or payment, or want to request a summary of research findings, please contact Sander Van de Cruys (KU Leuven), at sander.vandecruys@kuleuven.be.\u003C\u002Fli\u003E\u003C\u002Ful\u003E\n        \u003Cp\u003EThe nature and purpose of this research have been sufficiently explained and I agree to participate in this study.  I understand that I am free to withdraw at any time without incurring any penalty.\u003C\u002Fp\u003E\n        \u003Cp\u003EPlease consent by checking the box. Otherwise, please exit the study at this time.\u003C\u002Fp\u003E\u003Cform id=\"consent\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"consent\" value=\"true\" required\u003E I agree\u003Cbr\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\n        \u003C\u002Fmain\u003E\n\n        \u003Cfooter class=\"content-vertical-center content-horizontal-right\"\u003E\n  \n  \u003Cbutton type=\"submit\" form=\"consent\"\u003Econtinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Informed consent"
    },
    {
      "type": "lab.html.Form",
      "content": "\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-l text-left\" style=\"display: block\"\u003E\n    \n    \u003Ch2 class=\"text-center\"\u003EPlease tell us about yourself\u003C\u002Fh2\u003E\n    \u003Cp class=\"text-center\"\u003EBefore the study can start, we would like to learn a bit more about you. \u003C\u002Fp\u003E\n    \n    \u003Cform id=\"demography\"\u003E\n      \u003Ctable\u003E\n        \u003C!-- Age --\u003E\n        \u003Ctr style=\"height: 50px\"\u003E\n          \u003Ctd class=\"font-weight-bold\"\u003E\n            How old are you, in years?\n          \u003C\u002Ftd\u003E\n          \u003Ctd\u003E\n            \u003Cinput name=\"age\" type=\"number\" required class=\"w-100\"\u003E\n          \u003C\u002Ftd\u003E\n        \u003C\u002Ftr\u003E\n        \n        \u003C!-- Gender identity, following Tate et al. (2013) --\u003E\n        \u003Ctr style=\"height: 100px\"\u003E\n          \u003Ctd class=\"font-weight-bold\"\u003E\n            What is your current gender identity?\n          \u003C\u002Ftd\u003E\n          \u003Ctd\u003E\n            \u003Cselect name=\"gender\" required class=\"w-100\"\u003E\n              \u003Coption value=\"\" selected\u003E\n                -- Please click to select --\n              \u003C\u002Foption\u003E\n              \u003Coption value=\"female\"\u003EFemale\u003C\u002Foption\u003E\n              \u003Coption value=\"male\"\u003EMale\u003C\u002Foption\u003E\n              \u003Coption value=\"transgender\"\u003ETransgender\u003C\u002Foption\u003E\n              \u003Coption value=\"intersex\"\u003EIntersex\u003C\u002Foption\u003E\n            \u003C\u002Fselect\u003E\n          \u003C\u002Ftd\u003E\n        \u003C\u002Ftr\u003E\n        \u003Ctr style=\"height: 100px\"\u003E\n          \u003Ctd class=\"font-weight-bold\"\u003E\n            How much do you like rating scales?\n          \u003C\u002Ftd\u003E\n          \u003Ctd\u003E\n    \u003Cul class='likert'\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"likert\" value=\"1\" required\u003E\n        \u003Clabel\u003EI'm not answering this one!\u003C\u002Flabel\u003E\n      \u003C\u002Fli\u003E\n       \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"likert\" value=\"2\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"likert\" value=\"3\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"likert\" value=\"4\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"likert\" value=\"4\"\u003E\n        \u003Clabel\u003EGive me another one!\u003C\u002Flabel\u003E\n      \u003C\u002Fli\u003E\n    \u003C\u002Ful\u003E\n     \u003C\u002Ftr\u003E\n      \n      \u003C\u002Ftable\u003E\n    \u003C\u002Fform\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-right\"\u003E\n  \u003Cbutton type=\"submit\" form=\"demography\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
 var style = document.createElement('style');
  style.innerHTML = `
  form .likert {
  list-style:none;
  width:100%;
  margin:0;
  padding:0 0 35px;
  display:block;
  border-bottom:2px solid #efefef;
}
form .likert:last-of-type {border-bottom:0;}
form .likert:before {
  content: '';
  position:relative;
  top:16px;
  left:8%;
  display:block;
  background-color:#efefef;
  height:4px;
  width:80%;
}
form .likert li {
  display:inline-block;
  width:18%;
  text-align:center;
  vertical-align: top;
}
form .likert li input[type=radio] {
  display:block;
  position:relative;
  top:0;
  left:50%;
  margin-left:-6px;
  
}
form .likert li label {width:100px;}
`;
  document.head.appendChild(style);


}
      },
      "title": "participant info"
    },
    {
      "type": "lab.html.Screen",
      "files": {
        "018tt.jpg": "embedded\u002Fffdd8b240993a936c0fe24553fa1c84c6d2e3aaaf1f8f4d42e555672d90576a7.jpg"
      },
      "parameters": {},
      "responses": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
let done = false // is it the last screen?

const setVisibility = (selector, isVisible) => {
  // Extract the content from the current element
  const target = this.options.el.querySelector(selector)

  target.style.visibility = isVisible ? 'visible' : 'hidden'
}

const moveForth = (selector) => {
  const target = this.options.el.querySelector(selector)
  if(target.nextElementSibling){
    target.classList.add("hidden"); // hide current screen
    target.nextElementSibling.classList.remove("hidden"); //show next screen
    
    setVisibility('#bck', true) // make sure that 'back' button is visible

    if(!target.nextElementSibling.nextElementSibling){ // if the end is reached
      setVisibility('#fwd', false) // hide the forward button
      setVisibility('#done', true) // show the end button
      done = true
    }
  }
}

const moveBack = (selector) => {
  target = this.options.el.querySelector(selector);
  if(target.previousElementSibling){ //.innerHTML !== undefined
    target.classList.add("hidden");  // hide current screen
    target.previousElementSibling.classList.remove("hidden"); // show previous screen

    setVisibility('#fwd', true) // make sure that 'forward' button is visible
    setVisibility('#done', false) // hide the 'done' button
    done = false

    if(!target.previousElementSibling.previousElementSibling){ // if the beginning is reached
      setVisibility('#bck', false) // hide the back button
    }
  } 
}

this.options.events['keydown(ArrowRight)'] = function(){
  moveForth("section[id^='page']:not(.hidden)")
  moveForth("h2[id^='head']:not(.hidden)")
}

this.options.events['keydown(ArrowLeft)'] = function(){
  moveBack("section[id^='page']:not(.hidden)")
  moveBack("h2[id^='head']:not(.hidden)")
}

this.options.events['keypress(Space)'] = function() {
    if(done)
      // End instructions
      this.end('done')
}

}
      },
      "title": "Instructions",
      "content": "\u003Cheader\u003E\r\n  \u003Ch2 id=\"head1\"\u003EInstructions\u003C\u002Fh2\u003E\r\n  \u003Ch2 id=\"head2\" class=\"hidden\"\u003EInstructions\u003C\u002Fh2\u003E\r\n\u003C\u002Fheader\u003E\r\n\r\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\r\n  \u003Csection id=\"page1\" class=\"w-l text-justify\"\u003E\r\n    \u003Cp\u003E\r\nIn this experiment you will see a series of distorted images like the one below on the left. As you can see in the righthand image, the distorted images are derived from actual photographs. In what follows, you will \u003Cstrong\u003Ebriefly\u003C\u002Fstrong\u003E be presented with \u003Cstrong\u003Eonly\u003C\u002Fstrong\u003E the distorted image.\u003C\u002Fp\u003E\r\n    \r\n    \u003Cdiv style='float: left; margin-right: 20px;'\u003E\u003Cimg id=\"mooney\" src='static\u002F018tt.jpg' height='250' width='250'\u003E\u003C\u002Fimg\u003E\u003C\u002Fdiv\u003E\r\n    \u003Cdiv style='float: right; margin-left: 20px;'\u003E\u003Cimg id= \"solution\" src='static\u002F018gs.jpg' height='250' width='250'\u003E\u003C\u002Fimg\u003E\r\n        \u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\r\n     \r\n  \u003C\u002Fsection\u003E\r\n  \u003Csection id=\"page2\" class=\"w-l text-justify hidden\"\u003E\r\n    \u003Cp\u003ETo be useful for future research, we need to select those images that people can generally not solve on their own. Therefore we'll show you the distorted image and ask you to indicate (yes or no) whether you already recognized what was in the image. This is not a competition, so please respond truthfully. We don't ask or check your answer, we just want to know whether you think you recognized it. All images depict objects from one of these broad level categories: animals, inanimate objects, plants, sports, vehicles, and food. Recognizing means knowing more than these broad labels for a given image. It means knowing at least the basic level category of the main object in the image, for example when you see a parrot in the image, 'parrot' will obviously be a correct answer but also correct is 'bird', but not 'animal' (the broad level category). For the example above, 'rose' would be correct or 'flower', but not 'plant'. When soccer players are depicted, you don't recognize the image when you just see 'humans', 'outdoors', or 'sports'. Note that complete certainty about your answer is not necessary, it's enough to have a good, definite guess on the object, to say 'yes, I recognized it'.\u003C\u002Fp\u003E\r\n        \u003Cp\u003EOne additional question will be asked after we've revealed the solution: You'll be asked to indicate how strong your \u003Cstrong\u003Eaha-experience\u003C\u002Fstrong\u003E was. This describes the positive 'click' you sometimes experience, when the pieces of the 'puzzle' fall together and you suddenly have 'insight' in the image. It describes how good you felt the 'fit' was between the distorted image and the solution.\u003C\u002Fp\u003E\r\n  \u003C\u002Fsection\u003E\r\n\u003C\u002Fmain\u003E\r\n\r\n\u003Cfooter\u003E\r\n  \u003Ctable class=\"table-plain\"\u003E\r\n    \u003Ctr\u003E\r\n      \u003Ctd id=\"bck\" style=\"visibility: hidden\"\u003E\r\n        press the left arrow \u003Ckbd\u003E&larr;\u003C\u002Fkbd\u003E for the previous screen \r\n      \u003C\u002Ftd\u003E\r\n      \u003Ctd id=\"done\" style=\"visibility: hidden\"\u003E\r\n        press the \u003Ckbd\u003Espace bar\u003C\u002Fkbd\u003E to continue \r\n      \u003C\u002Ftd\u003E\r\n      \u003Ctd id=\"fwd\"\u003E\r\n        press the right arrow \u003Ckbd\u003E&rarr;\u003C\u002Fkbd\u003E for the next screen \r\n      \u003C\u002Ftd\u003E\r\n    \u003C\u002Ftr\u003E\r\n  \u003C\u002Ftable\u003E\r\n\u003C\u002Ffooter\u003E"
    },
    {
      "type": "lab.flow.Loop",
      "files": {
        "001tt.jpg": "embedded\u002Fb7355bf2cb38572c8a5c609ade9422087337e7117c75658a9ae81182b215c4b4.jpg",
        "039tt.jpg": "embedded\u002Feed081d368f5a61e90e8abd157ef4648cfde8535e25b36aad912fd3b5fe89c55.jpg",
        "112tt.jpg": "embedded\u002Fecabe401b8e3c24ef87fc18d78e23f80fe4c44434ed07771998e9003fa1ed26d.jpg",
        "001gs.jpg": "embedded\u002F65cde0e9e062fac33a9d267049664d64da1b433c63c192b20d7042c1fd34429c.jpg",
        "039gs.jpg": "embedded\u002Fde1ebc78f6638bc58ff676cd68e9ef7a338cae6799cd4070c4588b0e13ede183.jpg",
        "112gs.jpg": "embedded\u002Fa7089baa4f90c8deca5e10b5f0ff68e2ed334a96ce3f85d8116b037cd6ca8cb2.jpg"
      },
      "parameters": {},
      "templateParameters": [
        {
          "mooney": "${ this.files[\"001tt.jpg\"] }",
          "solution": "${ this.files[\"001gs.jpg\"] }",
          "width": "450",
          "height": "306"
        },
        {
          "mooney": "${ this.files[\"039tt.jpg\"] }",
          "solution": "${ this.files[\"039gs.jpg\"] }",
          "width": "400",
          "height": "301"
        },
        {
          "mooney": "${ this.files[\"112tt.jpg\"] }",
          "solution": "${ this.files[\"112gs.jpg\"] }",
          "width": "400",
          "height": "400"
        }
      ],
      "sample": {
        "mode": "draw-shuffle"
      },
      "responses": {},
      "messageHandlers": {},
      "title": "Trial loop",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "parameters": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Trial sequence",
        "content": [
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "image",
                "version": "2.4.4",
                "originX": "center",
                "originY": "center",
                "left": 0,
                "top": 0,
                "width": "40",
                "height": "40",
                "fill": "black",
                "stroke": null,
                "strokeWidth": 0,
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
                "crossOrigin": "",
                "cropX": 0,
                "cropY": 0,
                "id": "7",
                "src": "${ this.files[\"fixation.svg\"] }",
                "filters": [],
                "naturalWidth": 60,
                "naturalHeight": 60
              }
            ],
            "files": {
              "fixation.svg": "embedded\u002F43a10d563ae03eb43aa1d16599f75682f97bdbb1ece148c5a39cd269957a9098.svg"
            },
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
                "type": "image",
                "version": "2.7.0",
                "originX": "center",
                "originY": "center",
                "left": 0,
                "top": "0",
                "width": "${ parameters.width }",
                "height": "${ parameters.height }",
                "fill": "black",
                "stroke": null,
                "strokeWidth": 0,
                "strokeDashArray": null,
                "strokeLineCap": "butt",
                "strokeDashOffset": 0,
                "strokeLineJoin": "round",
                "strokeMiterLimit": 4,
                "scaleX": 0.6,
                "scaleY": 0.6,
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
                "crossOrigin": "",
                "cropX": 0,
                "cropY": 0,
                "id": "54",
                "src": "${ parameters.mooney }",
                "filters": [],
                "naturalWidth": 1300,
                "naturalHeight": 489,
                "autoScale": false
              }
            ],
            "files": {
              "keyboard.png": "embedded\u002F24730f2515e4df5b39badab089ad38e6318391663e3e76ebd633945c3bbcf56d.png"
            },
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "viewport": [
              800,
              600
            ],
            "title": "Mooney",
            "timeout": "3000"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "i-text",
                "version": "2.7.0",
                "originX": "center",
                "originY": "center",
                "left": 0,
                "top": 0,
                "width": 350.41,
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
                "text": "Did you recognize it? y\u002Fn",
                "fontSize": 32,
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
                "id": "351",
                "styles": {}
              }
            ],
            "files": {},
            "parameters": {},
            "responses": {
              "keypress(y,n)": "recognized"
            },
            "messageHandlers": {},
            "viewport": [
              800,
              600
            ],
            "title": "Recognized?"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "image",
                "version": "2.7.0",
                "originX": "center",
                "originY": "center",
                "left": 0,
                "top": "0",
                "width": "${ parameters.width }",
                "height": "${ parameters.height }",
                "fill": "black",
                "stroke": null,
                "strokeWidth": 0,
                "strokeDashArray": null,
                "strokeLineCap": "butt",
                "strokeDashOffset": 0,
                "strokeLineJoin": "round",
                "strokeMiterLimit": 4,
                "scaleX": 0.6,
                "scaleY": 0.6,
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
                "crossOrigin": "",
                "cropX": 0,
                "cropY": 0,
                "id": "54",
                "src": "${ parameters.solution }",
                "filters": [],
                "naturalWidth": 1300,
                "naturalHeight": 489,
                "autoScale": false
              }
            ],
            "files": {
              "keyboard.png": "embedded\u002F24730f2515e4df5b39badab089ad38e6318391663e3e76ebd633945c3bbcf56d.png"
            },
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "viewport": [
              800,
              600
            ],
            "title": "Solution",
            "timeout": "2000"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "image",
                "version": "2.7.0",
                "originX": "center",
                "originY": "center",
                "left": 0,
                "top": "0",
                "width": "${ parameters.width }",
                "height": "${ parameters.height }",
                "fill": "black",
                "stroke": null,
                "strokeWidth": 0,
                "strokeDashArray": null,
                "strokeLineCap": "butt",
                "strokeDashOffset": 0,
                "strokeLineJoin": "round",
                "strokeMiterLimit": 4,
                "scaleX": 0.6,
                "scaleY": 0.6,
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
                "crossOrigin": "",
                "cropX": 0,
                "cropY": 0,
                "id": "54",
                "src": "${ parameters.mooney }",
                "filters": [],
                "naturalWidth": 1300,
                "naturalHeight": 489,
                "autoScale": false
              }
            ],
            "files": {
              "keyboard.png": "embedded\u002F24730f2515e4df5b39badab089ad38e6318391663e3e76ebd633945c3bbcf56d.png"
            },
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "viewport": [
              800,
              600
            ],
            "title": "Mooney",
            "timeout": "1000"
          },
          {
            "type": "lab.html.Form",
            "content": "\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-l text-left\" style=\"display: block\"\u003E\n    \n   \n     \u003Cform id=\"ratings\"\u003E\n      \u003Ctable\u003E\n         \u003Ctr style=\"height: 100px\"\u003E\n          \u003Ctd class=\"font-weight-bold\"\u003E\n            How strong was your aha-experience?\n          \u003C\u002Ftd\u003E\n          \u003Ctd\u003E\n         \u003Cul class='likert'\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"aha\" value=\"1\" required\u003E\n        \u003Clabel\u003EPractically absent\u003C\u002Flabel\u003E\n      \u003C\u002Fli\u003E\n       \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"aha\" value=\"2\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"aha\" value=\"3\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"aha\" value=\"4\"\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003Cinput type=\"radio\" name=\"aha\" value=\"4\"\u003E\n        \u003Clabel\u003EVery strong\u003C\u002Flabel\u003E\n      \u003C\u002Fli\u003E\n    \u003C\u002Ful\u003E\n     \u003C\u002Ftr\u003E\n      \n      \u003C\u002Ftable\u003E\n    \u003C\u002Fform\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-right\"\u003E\n  \u003Cbutton type=\"submit\" form=\"ratings\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E",
            "files": {},
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "title": "Ratings"
          }
        ]
      }
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "version": "2.7.0",
          "originX": "center",
          "originY": "center",
          "left": 0,
          "top": 0,
          "width": 281.7,
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
          "text": "Thanks for your time!",
          "fontSize": 32,
          "fontWeight": "normal",
          "fontFamily": "Times New Roman",
          "fontStyle": "normal",
          "lineHeight": 1.16,
          "underline": false,
          "overline": false,
          "linethrough": false,
          "textAlign": "center",
          "textBackgroundColor": "",
          "charSpacing": 0,
          "id": "234",
          "styles": {}
        }
      ],
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {
        "after:end": function anonymous(
) {
 var completionurl = "https://www.psytests.be";
  
  function saveData(name, thisid, thisdata) {

    var xhr = new XMLHttpRequest();
    // Met deze code kan je de respons van de server bekijken in het console venster
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.response);
        if (finished){
          window.location = completionurl;
        }
        
      }
    };
    
    xhr.open('POST', 'https://www.psytests.be/tests/curimoon/curimoon.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("filename=" + name + "&prolific_id=" + thisid + "&filedata=" + thisdata);
    
  }



saveData('curimoon.csv', this.options.datastore.get('subject_id'), this.options.datastore.exportCsv(',') );
}
      },
      "viewport": [
        800,
        600
      ],
      "title": "Thanks",
      "timeout": "500"
    }
  ]
})

// Let's go!
study.run()