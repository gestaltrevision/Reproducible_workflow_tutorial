/* GLOBAL */

var categoryConversion = {"n01484850 great white shark": 2.0, "n01491361 tiger shark": 3.0, "n01514859 hen": 8.0, "n01537544 indigo bunting": 14.0, "n01560419 bulbul": 16.0, "n01580077 jay": 17.0, "n01677366 common iguana": 39.0, "n01693334 green lizard": 46.0, "n01694178 African chameleon": 47.0, "n01704323 triceratops": 51.0, "n01734418 king snake": 56.0, "n01737021 water snake": 58.0, "n01740131 night snake": 60.0, "n01755581 diamondback": 67.0, "n01756291 sidewinder": 68.0, "n01773549 barn spider": 73.0, "n01775062 wolf spider": 77.0, "n01807496 partridge": 86.0, "n01817953 African grey": 87.0, "n01818515 macaw": 88.0, "n01843383 toucan": 96.0, "n01855032 red-breasted merganser": 98.0, "n01855672 goose": 99.0, "n01883070 wombat": 106.0, "n01917289 brain coral": 109.0, "n01930112 nematode": 111.0, "n01944390 snail": 113.0, "n01984695 spiny lobster": 123.0, "n02006656 spoonbill": 129.0, "n02013706 limpkin": 135.0, "n02025239 ruddy turnstone": 139.0, "n02027492 red-backed sandpiper": 140.0, "n02028035 redshank": 141.0, "n02058221 albatross": 146.0, "n02086079 Pekinese": 154.0, "n02087046 toy terrier": 158.0, "n02091831 Saluki": 176.0, "n02093428 American Staffordshire terrier": 180.0, "n02094258 Norwich terrier": 186.0, "n02096294 Australian terrier": 193.0, "n02097209 standard schnauzer": 198.0, "n02099712 Labrador retriever": 208.0, "n02100877 Irish setter": 213.0, "n02101006 Gordon setter": 214.0, "n02104029 kuvasz": 222.0, "n02105056 groenendael": 224.0, "n02108551 Tibetan mastiff": 244.0, "n02110806 basenji": 253.0, "n02111129 Leonberg": 255.0, "n02112018 Pomeranian": 259.0, "n02112706 Brabancon griffon": 262.0, "n02113624 toy poodle": 265.0, "n02114712 red wolf": 271.0, "n02128925 jaguar": 290.0, "n02134084 ice bear": 296.0, "n02165456 ladybug": 301.0, "n02169497 leaf beetle": 304.0, "n02172182 dung beetle": 305.0, "n02236044 mantis": 315.0, "n02268443 dragonfly": 319.0, "n02276258 admiral": 321.0, "n02277742 ringlet": 322.0, "n02279972 monarch": 323.0, "n02389026 sorrel": 339.0, "n02391049 zebra": 340.0, "n02396427 wild boar": 342.0, "n02437312 Arabian camel": 354.0, "n02442845 mink": 357.0, "n02443114 polecat": 358.0, "n02443484 black-footed ferret": 359.0, "n02444819 otter": 360.0, "n02457408 three-toed sloth": 364.0, "n02480495 orangutan": 365.0, "n02486261 patas": 371.0, "n02490219 marmoset": 377.0, "n02493509 titi": 380.0, "n02494079 squirrel monkey": 382.0, "n02504013 Indian elephant": 385.0, "n02526121 eel": 390.0, "n02640242 sturgeon": 394.0, "n02672831 accordion": 401.0, "n02708093 analog clock": 409.0, "n02730930 apron": 411.0, "n02747177 ashcan": 412.0, "n02783161 ballpoint": 418.0, "n02786058 Band Aid": 419.0, "n02787622 banjo": 420.0, "n02791270 barbershop": 424.0, "n02807133 bathing cap": 433.0, "n02808304 bath towel": 434.0, "n02815834 beaker": 438.0, "n02865351 bolo tie": 451.0, "n02916936 bulletproof vest": 465.0, "n02927161 butcher shop": 467.0, "n02951358 canoe": 472.0, "n02951585 can opener": 473.0, "n02977058 cash machine": 480.0, "n02981792 catamaran": 484.0, "n02992211 cello": 486.0, "n03000134 chainlink fence": 489.0, "n03016953 chiffonier": 493.0, "n03026506 Christmas stocking": 496.0, "n03063599 coffee mug": 504.0, "n03095699 container ship": 510.0, "n03110669 cornet": 513.0, "n03124170 cowboy hat": 515.0, "n03196217 digital clock": 530.0, "n03218198 dogsled": 537.0, "n03223299 doormat": 539.0, "n03259280 Dutch oven": 544.0, "n03345487 fire engine": 555.0, "n03376595 folding chair": 559.0, "n03417042 garbage truck": 569.0, "n03447447 gondola": 576.0, "n03461385 grocery store": 582.0, "n03482405 hamper": 588.0, "n03496892 harvester": 595.0, "n03498962 hatchet": 596.0, "n03594734 jean": 608.0, "n03623198 knee pad": 615.0, "n03673027 liner": 628.0, "n03680355 Loafer": 630.0, "n03690938 lotion": 631.0, "n03710637 maillot": 638.0, "n03733131 maypole": 645.0, "n03733805 measuring cup": 647.0, "n03777568 Model T": 661.0, "n03825788 nipple": 680.0, "n03874599 padlock": 695.0, "n03930630 pickup": 717.0, "n03937543 pill bottle": 720.0, "n03983396 pop bottle": 737.0, "n04004767 printer": 742.0, "n04009552 projector": 745.0, "n04044716 radio telescope": 755.0, "n04081281 restaurant": 762.0, "n04099969 rocking chair": 765.0, "n04111531 rotisserie": 766.0, "n04118538 rugby ball": 768.0, "n04147183 schooner": 780.0, "n04152593 screen": 782.0, "n04204238 shopping basket": 790.0, "n04254777 sock": 806.0, "n04266014 space shuttle": 812.0, "n04275548 spider web": 815.0, "n04285008 sports car": 817.0, "n04296562 stage": 819.0, "n04317175 stethoscope": 823.0, "n04325704 stole": 824.0, "n04328186 stopwatch": 826.0, "n04355933 sunglass": 836.0, "n04356056 sunglasses": 837.0, "n04371430 swimming trunks": 842.0, "n04371774 swing": 843.0, "n04380533 table lamp": 846.0, "n04443257 tobacco shop": 860.0, "n04447861 toilet seat": 861.0, "n04456115 torch": 862.0, "n04462240 toyshop": 865.0, "n04467665 trailer truck": 867.0, "n04486054 triumphal arch": 873.0, "n04505470 typewriter keyboard": 878.0, "n04523525 vault": 884.0, "n04525038 velvet": 885.0, "n04536866 violin": 889.0, "n04560804 water jug": 899.0, "n04584207 wig": 903.0, "n04591713 wine bottle": 907.0, "n07584110 consomme": 925.0, "n07590611 hot pot": 926.0, "n07695742 pretzel": 932.0, "n07716906 spaghetti squash": 940.0, "n07717556 butternut squash": 942.0, "n07720875 bell pepper": 945.0, "n07747607 orange": 950.0, "n07768694 pomegranate": 957.0, "n07831146 carbonara": 959.0, "n07892512 red wine": 966.0, "n07920052 espresso": 967.0, "n09229709 bubble": 971.0, "n09246464 cliff": 972.0, "n09468604 valley": 979.0, "n09472597 volcano": 980.0, "n12144580 corn": 987.0, "n12267677 acorn": 988.0, "n13037406 gyromitra": 993.0, "n13133613 ear": 998.0};
var categoryChoices = Object.keys(categoryConversion);

var config = {
    exemplarsPerCategory:2,
    clones : 5,
    surpriseChoice: "Surprise me!",
    numSurprise: 10
};

var images = new Array();
var colors = ["blue","purple","green","red","orange"]
var types = ["target","target repeat", "filler", "vigilance", "vigilance repeat"];
var category = 2;
var previousCategory = 0;
var categoriesToShow = [];
var exemplarToShow = [];
var alphas = [];
var paths = new Array();
var assessors = new Array();


const zeroPads = Array.from({ length: 10 }, (_, v) => '0'.repeat(v))

function zeroPad(num, len) {
  const numStr = String(num)
  return (zeroPads[len - numStr.length] + numStr)
}

// from https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
// from https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//from https://stackoverflow.com/questions/3820381/need-a-basename-function-in-javascript
function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if(base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}


function makeDropDown(){
    dropdown = document.getElementById("myDropdown");
    var item = document.createElement("a");
    item.href = "#"+"surprise";
    item.innerHTML = config.surpriseChoice;
    item.style.fontSize = "14px";
    item.style.fontWeight = "bold";
    item.onclick = makeGetSelectionFunction(-1);
    dropdown.appendChild(item);
    for (i = 0; i < categoryChoices.length;i++){
        var item = document.createElement("a");
        item.href = "#"+categoryChoices[i];
        item.innerHTML = categoryChoices[i];
        item.style.fontSize = "12px";
        item.onclick = makeGetSelectionFunction(i);
        dropdown.appendChild(item);
    }
}


//function arrangePage(numImages, imageSize, whiteSpace) {
function arrangePage(whiteSpace) {
    //console.log(numImages);
// after: https://stackoverflow.com/questions/11083345/creating-a-dynamic-grid-of-divs-with-javascript
    //var w = window.innerWidth - (document.getElementById("sidenav").style.width+400);
    //var w = window.innerWidth - (document.getElementById("sidenav").style.width)-50; //50 px for the rowlabel
    var w = document.getElementById("header").offsetWidth-50-20;
    console.log(document.getElementById("header").offsetWidth);
    //var h = window.innerHeight;
    var h = window.innerHeight-110; //110 px for the header
    //var numCols = Math.floor(w / (imageSize + 2 * whiteSpace));
    var numCols = alphas.length;
    var divWidth =w/numCols;
    var  imageSize = divWidth-2*whiteSpace
    console.log(divWidth);
    console.log(imageSize);
    //var imageSize = Math.floor((w-(numCols-1)*whiteSpace)/numCols);
    //var numRows = Math.ceil(numImages / numCols);
    var numRows = Math.ceil(paths.length / numCols);
    e = document.getElementById("imageField");
    var count = 0;
    var assessorIdx = 0;
    for (var r = 0; r < numRows; r++){
        if (assessorIdx >= assessors.length){
            assessorIdx = 0;
        }
        if (assessors[assessorIdx]=="memnet"){
            assessorLabel="MemNet";
            console.log(assessorLabel);
        }else if (assessors[assessorIdx]=="kongnet"){
            assessorLabel="Aesthetics-CNN";
        }else {
            assessorLabel="Object size";
        }
        var row = document.createElement("div");
        row.className = "line";
        row.id = "line_"+String(r);
        row.style.marginBottom = String(whiteSpace)+"px";
        row.style.marginTop = String(whiteSpace)+"px";
        row.style.clear = "both";
        row.style.display = "table";
        //label = document.createElement("div")
        label = document.createElement("div");
        //label.text = document.createElement("p");
        //label.text.className = "rotate";
        label.className = "gridsquare";
        label.style.width = "50px";
        label.style.height = String(imageSize)+"px";
        label.style.writingMode = "vertical-rl";
        label.style.textAlign = "center";
        label.style.float = "left";
        label.innerHTML = assessorLabel;
        label.style.marginTop = String(whiteSpace)+"px";
        label.style.marginBottom = String(whiteSpace)+"px";
        label.style.fontSize="12pt";
        //label.appendChild(label.text);
        //var ctx = label.getContext('2d');
        //ctx.font = '30pt Arial';
        //ctx.fillText('Regular Text', 100, 50);

        //ctx.save();
        //ctx.translate(200,imageSize/2);
        //ctx.rotate(-0.5*Math.PI);

        //var rText = 'Hello';
        //ctx.fillText(rText , 0, 0);
        row.appendChild(label);

        for (var c = 0; c < numCols; c++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            //cell.style.width = String(100/numCols)+"%";
            cell.style.width = String(divWidth)+"px";
            cell.style.float = "left";
            var img = document.createElement("img");
            img.id = "image_" + String(count);
            img.className = "thumbnail";
            img.width = String(imageSize);
            img.height = String(imageSize);
            img.style.marginLeft = String(whiteSpace)+"px";
            img.style.marginRight = String(whiteSpace)+"px";
            img.style.marginTop = String(whiteSpace)+"px";
            img.style.marginBottom = String(whiteSpace)+"px";
            if (alphas[c] == (config.clones-1)/2){
                img.style.outlineStyle = "solid";
                img.style.outlineColor = "black";
                img.style.outlineWidth = "3px";
            }

            //img.padding = String(whiteSpace);
            cell.appendChild(img);
            row.appendChild(cell);
            count = count + 1;
        }
        e.appendChild(row);
        assessorIdx = assessorIdx+1;
    }
    fillImages();
}

function fillImages(){
    images = document.getElementsByClassName("thumbnail");
    for (var i = 0; i < images.length; i++){
        path = paths[i];
        images[i].src = path;
        //images[i].style.outline = "solid";
        //images[i].style.outlineColor = colors[blockInfo.types[blockIndex][i]-1];
        //images[i].style.outlineWidth = "thick";
        images[i].ondblclick = makeOpenImageFunction(i);
        images[i].onclick = makeShowInfoFunction(i)};
}

function findImages(category,refreshSurprise=false){
    paths = [];
    if (category == -1 & refreshSurprise){
        categoriesToShow = getRandomSubarray(Object.values(categoryConversion),config.numSurprise);
        exemplarToShow = function (){var a=[]; for(var i=0;i<categoriesToShow.length;i++){a[i]=[Math.floor(Math.random()*config.exemplarsPerCategory)];};return a;}();

    }
    else if(category != -1){
        categoriesToShow = [category]
        exemplarToShow = [[...Array(config.exemplarsPerCategory).keys()]]
    }
    for (categoryIdx = 0; categoryIdx < categoriesToShow.length; categoryIdx++) {
        //exemplarToShow = Math.floor(Math.random() * config.exemplarsPerCategory);
        console.log(exemplarToShow);
        console.log(categoryIdx);
        exemplarsCurrent = exemplarToShow[categoryIdx];
        console.log(exemplarsCurrent);

        for (var exemplar = 0; exemplar < exemplarsCurrent.length; exemplar++) {
            //if(category==-1 & exemplar != exemplarToShow){
              //  continue;
            //}
            for (var assessorIdx = 0; assessorIdx < assessors.length; assessorIdx++) {
                for (var alphaIdx = 0; alphaIdx < alphas.length; alphaIdx++) {
                    paths.push("./" + assessors[assessorIdx] + "/" + zeroPad(categoriesToShow[categoryIdx], 5) + "_" + zeroPad(exemplarsCurrent[exemplar], 3) + "_" + zeroPad(alphas[alphaIdx], 2) + ".jpg")
                }
            }
        }
    }
    resetPage();
}

function processAssessorCheck(){
    assessors = [];
    if (document.getElementById('MemNetBox').checked) {
      assessors.push("memnet");
  }
  if (document.getElementById('KongNetBox').checked) {
      assessors.push("kongnet");
  }
   if (document.getElementById('ZoomBox').checked) {
      assessors.push("area");
  }
  console.log("print assessor list");
  console.log(assessors);
  findImages(category);

}

function processAlphaCheck(){
    alphas = [];
    if (document.getElementById('alpha0').checked) {
      alphas.push(0);
  }
  if (document.getElementById('alpha1').checked) {
      alphas.push(1);
  }
  if (document.getElementById('alpha2').checked) {
      alphas.push(2);
  }
  if (document.getElementById('alpha3').checked) {
      alphas.push(3);
  }
  if (document.getElementById('alpha4').checked) {
      alphas.push(4);
  }
  console.log("print alpha list");
  console.log(alphas);
  findImages(category);

}

function processCategorySelection(){

}

function makeGetSelectionFunction(id){
    function GetSelection(){
        previousCategory = category;
        if (id == -1){
            selection = config.surpriseChoice;
            category = -1;
        }else{
            selection = categoryChoices[id];
            category = categoryConversion[selection];
        }
        document.getElementById("myDropdown").classList.toggle("show");
        var choice_feedback = document.getElementById("choice");
        choice_feedback.innerHTML = selection;
        findImages(category,refreshSurprise=true);

    }
    return GetSelection
}


function makeOpenImageFunction(id){
    function openImage(){
    console.log(id)
    //trialIndex = Number(id.split("_")[id.split("_").length-1]);
    trialIndex = id;
    path = images[id].src;
    url = path;
    window.open(url);
    }
    return openImage

}


function makeShowInfoFunction(trialIndex) {
    console.log("makeShowInfoFunction")
    function showInfo() {
        rowIdx = Math.floor((trialIndex)/alphas.length);
        colIdx = trialIndex % alphas.length;

        assessorIdx = rowIdx % assessors.length;
        alphaIdx = colIdx % alphas.length;

        categoryLabel = getKeyByValue(categoryConversion,parseInt(baseName(images[trialIndex].src).split("_")[0]));

        if (assessors[assessorIdx]=="memnet"){
            assessorLabel="MemNet";
            alphaLabel = String((alphas[alphaIdx]-(config.clones-1)/2)*0.1);
        }else if (assessors[assessorIdx]=="kongnet"){
            assessorLabel="Aesthetics-CNN";
            alphaLabel = String((alphas[alphaIdx]-(config.clones-1)/2)*0.1);

        }else {
            assessorLabel="Object size";
            alphaLabel = String((alphas[alphaIdx]-(config.clones-1)/2)*0.1*4);
        }

        var information = document.getElementById("info");
        information.innerHTML = "";

        information.innerHTML = information.innerHTML + "Assessor: "+assessorLabel+"<br>";
        information.innerHTML = information.innerHTML + "Alpha: "+alphaLabel+"<br>";
        information.innerHTML = information.innerHTML + "Category: "+categoryLabel+"<br>";
        information.innerHTML = information.innerHTML + "File: "+baseName(images[trialIndex].src)+"<br>";
        information.innerHTML = information.innerHTML + "<br>";



    }

    return showInfo;
}



function resetPage(){
    images = new Array();
    var information = document.getElementById("info");
    information.innerHTML = "";
    var myNode = document.getElementById("imageField");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    arrangePage(5);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

/* MAIN */
$(document).ready(function() {
    console.log("hello");
    $(window).resize(function() {
        resetPage();
    });

    makeDropDown();
    findImages(category);
    console.log(paths);
    arrangePage(5);
    setupButtons();
    getBlockInfo(state.workerIndex);


});

