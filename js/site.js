// index.js - purpose and description here
// Author: Your Name
// Date:
//global var imageEl
var imageEl;
var gameStarted = false;
var startTime = Date.now();
var timeElapsed = Date.now();
var rect1, rect2, rect3, rect4, rect5;
var quaddie1, quaddie2, quaddie3, quaddie4;
var imgCanvas = $("#img-canvas");
var currentQuadrant;
var photo1Width = 1920;
var photo1Height = 1080;
var gameOver = false;
var timeElapsed = 0.0;
var slugWidth = 50;
var slugHeight = 47;
var numberOfAreas = 5;
var xOffset = 0;
var yOffset = 0;
//initialize timer
var timerNew = new easytimer.Timer();
var timeParagraph = $("#time-p");


// Imported from Location X JS 
//create a clock to track time
class Area {
  constructor(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
}

const area1 = new Area(70 + xOffset, 265 + yOffset, 415 + xOffset, 450 + yOffset);
const area2 = new Area(40 + xOffset, 770 + yOffset, 390 + xOffset, 940 + yOffset);
const area3 = new Area(550 + xOffset, 690 + yOffset, 670 + xOffset, 900 + yOffset);
const area4 = new Area(1280 + xOffset, 340 + yOffset, 1465 + xOffset, 630 + yOffset);
const area5 = new Area(1125 + xOffset, 750 + yOffset, 1480 + xOffset, 930 + yOffset);

//declare quadrants
//upper left
const quad1 = new Area(xOffset, yOffset, xOffset + (photo1Width / 2), yOffset + (photo1Height / 2));
//upper right
const quad2 = new Area(xOffset + (photo1Width / 2), yOffset, xOffset + (photo1Width), yOffset + (photo1Height / 2));
//lower left
const quad3 = new Area(xOffset, yOffset + (photo1Height / 2), xOffset + (photo1Width / 2), yOffset + (photo1Height));
//lower right
const quad4 = new Area(xOffset + (photo1Width / 2), yOffset + (photo1Height / 2), xOffset + (photo1Width), yOffset + (photo1Height));
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//determine teh random coordinates
var coords = chooseCoordinates();

$("#hideSimpleBtn").click(function () {
  $("#simpleDiv").hide();
});

$("#showSimpleBtn").click(function () {
  $("#simpleDiv").show();
});

// When a tab is clicked
$('.tab').click(function () {
  // Get the value of the data-tab attribute of the clicked tab
  var tabId = $(this).data('tab');

  // Remove the 'active' class from all tabs
  $('.tab').removeClass('active');
  // Add the 'active' class to the clicked tab
  $(this).toggleClass('active');
  // Hide all tab panes
  $('.tab-pane').removeClass('active');
  // Show the tab pane corresponding to the clicked tab
  $('[data-tab-content="' + tabId + '"]').toggleClass('active');

  // specific location tabs
  if (tabId === 'tab3') {
    $(".nav-bar").hide();
    $('body').css({ 'background-image': "url('img/photo1.png')", 'background-repeat': 'no-repeat' });
    /*   $('body').css({'background-image' : "url('img/photo1.png')", 'background-position' : 'center', 'background-size' : 'cover', 'position' : 'relative', 'width' : '100%', 'height' : '100%'});*/
    //////////////// turn this into a function ////////////////////////
    // Define image URL and coords
    var imageUrl = "img/slug1.jpg";
    //var imageX = 300;
    //var imageY = 300;
    // Create image element
    imageEl = $('<img>');
    imageEl.attr('src', imageUrl);
    imageEl.attr('id', "slug1");
    timerNew.start();
    timerNew.addEventListener('secondsUpdated', function(e) {
      timeParagraph.html("TIME ELAPSED: " + timerNew.getTimeValues().toString());
    })
    
    ///////////////////////////////////////
    //call drawSluggy now for testing but this will be called with an html listener of sorts later
    //get random coordinates from the function
    drawSluggy();
    //drawBoxes();
    //after 120 seconds, highlight the quadrant the slug is in
    const showQuadTimeout = setTimeout(drawQuadrant, 120000, currentQuadrant);
  }
})

function main() {
  
}
//define function that randomly selects an area and selects coordinates based off that
function chooseCoordinates() {
  var randAreaNum = Math.floor(Math.random() * numberOfAreas) + 1;
  var randArea;
  //assign the area based on that
  switch (randAreaNum) {
    case 1:
      randArea = area1;
      break;
    case 2:
      randArea = area2;
      break;
    case 3:
      randArea = area3;
      break;
    case 4:
      randArea = area4;
      break;
    case 5:
      randArea = area5;
      break;
    default:
      randArea = area1;
      console.log("OOPSIES");
      break;
  }

  //now choose random coordinates for the slug based on the minimum and maximum coordinates of the area selected
  var randCoordX, randCoordY;

  randCoordX = getRandomInteger(randArea.minX, randArea.maxX);
  randCoordY = getRandomInteger(randArea.minY, randArea.maxY);

  return [randArea, randAreaNum, randCoordX, randCoordY];
}

function drawSluggy() {
  console.log(coords); //functional
  console.log(coords[2] + coords[3]);

  // Set position using CSS
  imageEl.css({
    'position': 'absolute',
    'left': (Number(coords[2]) - Number(slugWidth / 2)).toString() + 'px',
    'top': (Number(coords[3]) - Number(slugHeight / 2)).toString() + 'px'
  });
  // Append to the container
  var imageBody = $('#img-body');
  imageBody.append(imageEl);
  console.log("placed");
  // Add an event listener for click
  imageEl.on('click', function () {
    //print slug fact
    $("#location1").append("<p style= font-size:12px;>“In 1981, UCSC joined Division III of the NCAA. Since the application required an official team name, UCSC’s then-chancellor polled the student players, and out of this small group emerged a consensus for a new moniker—the sea lions. But the new name did not find favor with the majority of students, who continued to root for the Slugs. After five years of dealing with the two-mascot problem, an overwhelming pro-Slug straw vote by students in 1986 convinced the chancellor to make the lowly but beloved Banana Slug UCSC’s official mascot.”</p>");
    //hide the slug
    imageEl.hide();
    //hide the hint
    $("#hint-p").hide();
    //pause the timer
    timerNew.pause();
    // maybe have a button to move to the next location 
    // (it can be like the start button where that is what makes it go to the next tab)
  });
}

/*function drawBoxes() {
  //draw the rectangles to ensure areas are consistent WILL REMOVE LATER
  var ctx = imgCanvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = "4";
  rect1 = ctx.rect(area1.minX, area1.minY, (area1.maxX - area1.minX), (area1.maxY - area1.minY));
  ctx.stroke();

  rect2 = ctx.rect(area2.minX, area2.minY, (area2.maxX - area2.minX), (area2.maxY - area2.minY));
  ctx.stroke();

  rect3 = ctx.rect(area3.minX, area3.minY, (area3.maxX - area3.minX), (area3.maxY - area3.minY));
  ctx.stroke();


  rect4 = ctx.rect(area4.minX, area4.minY, (area4.maxX - area4.minX), (area4.maxY - area4.minY));
  ctx.stroke();


  rect5 = ctx.rect(area5.minX, area5.minY, (area5.maxX - area5.minX), (area5.maxY - area5.minY));
  ctx.stroke();
}*/

//find out what quadrant the slug is in
//UL
if (coords[2] >= xOffset && coords[3] >= yOffset && coords[2] <= xOffset + (photo1Width / 2) && coords[3] <= yOffset + (photo1Height / 2)) {
  currentQuadrant = 0;
}
//UR
else if (coords[2] >= xOffset + (photo1Width / 2) && coords[3] >= yOffset && coords[2] <= xOffset + (photo1Width) && coords[3] <= yOffset + (photo1Height / 2)) {
  currentQuadrant = 1;
}
//LL
else if (coords[2] >= xOffset && coords[3] >= yOffset + (photo1Height / 2) && coords[2] <= xOffset + (photo1Width / 2) && coords[3] <= yOffset + (photo1Height)) {
  currentQuadrant = 2;
}
//LR
else if (coords[2] >= xOffset + (photo1Width / 2) && coords[3] >= yOffset + (photo1Height / 2) && coords[2] <= xOffset + (photo1Width) && coords[3] <= yOffset + (photo1Height)) {
  currentQuadrant = 3;
}
else {
  console.log("You screwed up your quads!");
}

function drawQuadrant(quad) {
  //draw the rectangles to ensure areas are consistent WILL REMOVE LATER
  switch (quad) {
    case 0:
      $("#location-1-title").append("<p id=hint-p style=color:red;>HINT: It's in the upper left!");
      break;
    case 1:
      $("#location-1-title").append("<p id=hint-p style=color:red;>HINT: It's in the upper right!");
      break;
    case 2:
      $("#location-1-title").append("<p id=hint-p style=color:red;>HINT: It's in the lower left!");
      break;
    case 3:
      $("#location-1-title").append("<p id=hint-p style=color:red;>HINT: It's in the lower right!");
      break;
  }
}


