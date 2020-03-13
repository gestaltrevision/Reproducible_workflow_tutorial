config = {};

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
/* MAIN */
$(document).ready(function () {
    console.log("document ready");
    $.getJSON("sequences/0.json").done(function (data) {
    config = data;
    var canvas = document.getElementById("display");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSquares("display", config.display0[0], config.colors[0])
    });
});