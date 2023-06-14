// level1.js
// Author: group 15
// Date: 6/23

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
var slugWidth = 200;
var slugHeight = 200;
var numberOfAreas = 5;
var xOffset = 0;
var yOffset = 0;


var ajaxGetSlugFacts;

//access the slug fact data via AJAX
//route it through AJAX again
$.ajax({
  // The URL for the request (from the api docs)
  url: "https://api.api-ninjas.com/v1/animals?name=slug",

  headers: { 'X-Api-Key': 'oVAusz8WBRoEjqP6hwqjoA==UBfGCXc89PsCxi0U' },
  // The data to send (will be converted to a query string)
  data: {},
  // Whether this is a POST or GET request
  type: "GET",
  // The type of data we expect back
  dataType: "json",
  // What do we do when the api call is successful
  //   all the action goes in here
  success: function (data) {
    // do stuff
    ajaxGetSlugFacts = data;

  },
  // What we do if the api call fails
  error: function (jqXHR, textStatus, errorThrown) {
    // do stuff
    console.log("Error:", textStatus, errorThrown);
  }
})
// Imported from Location X JS 
//create a clock to track time
class AreaLevel1 {
  constructor(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
}

const area1Level1 = new AreaLevel1(70 + xOffset, 265 + yOffset, 415 + xOffset, 450 + yOffset);
const area2Level1 = new AreaLevel1(40 + xOffset, 770 + yOffset, 390 + xOffset, 940 + yOffset);
const area3Level1 = new AreaLevel1(550 + xOffset, 690 + yOffset, 670 + xOffset, 900 + yOffset);
const area4Level1 = new AreaLevel1(1280 + xOffset, 340 + yOffset, 1465 + xOffset, 630 + yOffset);
const area5Level1 = new AreaLevel1(1125 + xOffset, 750 + yOffset, 1480 + xOffset, 930 + yOffset);

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
    $('body').css({ 'background-image': "url('img/photo1.png')", 'background-repeat': 'no-repeat', 'backdrop-filter' : 'blur(0px)' });
  
    // Define image URL and coords
    var imageUrl = "img/slug1.png";
    //var imageX = 300;
    //var imageY = 300;
    // Create image element
    imageEl = $('<img>');
    imageEl.attr('src', imageUrl);
    imageEl.attr('id', "slug1");
    imageEl.click(function () {
      //pause the timer
      timeParagraph1.html("FINAL TIME: " + timerGlobal.getTimeValues().toString());
      timerGlobal.pause();
    });
    setTimeout(function () {
      drawSluggy();
    }, 200);
    //drawBoxes();
    //after 120 seconds, highlight the quadrant the slug is in
    const showQuadTimeout = setTimeout(drawQuadrant, 60000, currentQuadrant);
  }
})

//define function that randomly selects an area and selects coordinates based off that
function chooseCoordinates() {
  var randAreaNum = Math.floor(Math.random() * numberOfAreas) + 1;
  var randArea;
  //assign the area based on that
  switch (randAreaNum) {
    case 1:
      randArea = area1Level1;
      break;
    case 2:
      randArea = area2Level1;
      break;
    case 3:
      randArea = area3Level1;
      break;
    case 4:
      randArea = area4Level1;
      break;
    case 5:
      randArea = area5Level1;
      break;
    default:
      randArea = area1Level1;
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
    $("#location1").append("<p class='fact'>“In 1981, UCSC joined Division III of the NCAA. The application required an official team name, so UCSC polled the students, and a consensus appeared for the sea lions. The chancellor considered it more dignified and suitable than the Banana Slugs. But the students continued to root for the Slugs even after a sea lion was painted in the middle of the basketball floor. After five years of dealing with two-mascots, an overwhelming pro-Slug vote by students in 1986 convinced the chancellor to make the Banana Slug UCSC's official mascot.”</p>");
    //print big slug image
    $("#location1").append("<img class='slugbig' src='img/slug1.png' />");
    //print random slug stat (for this level: land slug characteristics)
    var randFactInt = getRandomInteger(0, 15);
    $("#location1").append("<p class=fact-title>SLIMY SLUG STATS</p>");
    var randFactStr;
    switch (randFactInt) {
      case 0:
        randFactStr = "Age of sexual maturity: " + ajaxGetSlugFacts[1].characteristics.age_of_sexual_maturity;
        break;
      case 1:
        randFactStr = "Colors: Brown, Grey, Black, Green";
        break;
      case 2:
        randFactStr = "Common Name: " + ajaxGetSlugFacts[1].characteristics.common_name;
        break;
      case 3:
        randFactStr = "Diet: " + ajaxGetSlugFacts[1].characteristics.diet;
        break;
      case 4:
        randFactStr = "Gestation Period: " + ajaxGetSlugFacts[1].characteristics.gestation_period;
        break;
      case 5:
        randFactStr = "Habitat: " + ajaxGetSlugFacts[1].characteristics.habitat;
        break;
      case 6:
        randFactStr = "Length: " + ajaxGetSlugFacts[1].characteristics.length;
        break;
      case 7:
        randFactStr = "Lifespan: " + ajaxGetSlugFacts[1].characteristics.lifespan;
        break;
      case 8:
        randFactStr = "Litter Size: " + ajaxGetSlugFacts[1].characteristics.litter_size;
        break;
      case 9:
        randFactStr = "Location: " + ajaxGetSlugFacts[1].characteristics.location;
        break;
      case 10:
        randFactStr = "Other Name(s): " + ajaxGetSlugFacts[1].characteristics["other_name(s)"];
        break;
      case 11:
        randFactStr = "Predators: " + ajaxGetSlugFacts[1].characteristics.predators;
        break;
      case 12:
        randFactStr = "Prey: " + ajaxGetSlugFacts[1].characteristics.prey;
        break;
      case 13:
        randFactStr = "Skin Type: " + ajaxGetSlugFacts[1].characteristics.skin_type;
        break;
      case 14:
        randFactStr = "Top Speed: " + ajaxGetSlugFacts[1].characteristics.top_speed;
        break;
      case 15:
        randFactStr = "Type: " + ajaxGetSlugFacts[1].characteristics.type;
        break;
      default:
        randFactStr = "ERROR";
        break;
    }
    $("#location1").append("<p class=random-slug-fact>" + randFactStr + "</p>");

    //hide the slug
    imageEl.hide();
    //hide the hint
    $("#hint-p").hide();
    // maybe have a button to move to the next location 
    $("#location1").append("<button class=tab data-tab=tab4 id=buttons><b>Next Level</b> (Double Click)</button>");
    // (it can be like the start button where that is what makes it go to the next tab)
    $("#location1").on("click", "#buttons", function() {
      //resume the timer
      timerGlobal.start();
      loadLevel2();
    });
  });
}

  function loadLevel2() {
    var script = document.createElement("script");
    script.src = "./js/level2.js";
    document.head.appendChild(script);
  }

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