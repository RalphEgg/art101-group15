// level5.js - 
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
var photo5Width = 1920;
var photo5Height = 1080;
var gameOver = false;
var timeElapsed = 0.0;
var slugWidth = 100;
var slugHeight = 100;
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
    console.log(ajaxGetSlugFacts);
    console.log(ajaxGetSlugFacts[0].characteristics);
    console.log(ajaxGetSlugFacts[1].characteristics);
  },
  // What we do if the api call fails
  error: function (jqXHR, textStatus, errorThrown) {
    // do stuff
    console.log("Error:", textStatus, errorThrown);
  }
})
// Imported from Location X JS 
//create a clock to track time
class AreaLevel5 {
  constructor(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
}

const area1Level5 = new AreaLevel5(1000 + xOffset, 120 + yOffset, 1445 + xOffset, 240 + yOffset);
const area2Level5 = new AreaLevel5(705 + xOffset, 300 + yOffset, 1035 + xOffset, 390 + yOffset);
const area3Level5 = new AreaLevel5(1015 + xOffset, 540 + yOffset, 670 + xOffset, 900 + yOffset);
const area4Level5 = new AreaLevel5(815 + xOffset, 710 + yOffset, 1145 + xOffset, 805 + yOffset);
const area5Level5 = new AreaLevel5(970 + xOffset, 845 + yOffset, 1445 + xOffset, 950 + yOffset);

//declare quadrants
/*//upper left
const quad1Level2 = new AreaLevel2(xOffset, yOffset, xOffset + (photo5Width / 2), yOffset + (photo5Height / 2));
//upper right
const quad2Level2 = new AreaLevel2(xOffset + (photo5Width / 2), yOffset, xOffset + (photo5Width), yOffset + (photo5Height / 2));
//lower left
const quad3Level2 = new AreaLevel2(xOffset, yOffset + (photo5Height / 2), xOffset + (photo5Width / 2), yOffset + (photo5Height));
//lower right
const quad4Level2 = new AreaLevel2(xOffset + (photo5Width / 2), yOffset + (photo5Height / 2), xOffset + (photo5Width), yOffset + (photo5Height));*/

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
  if (tabId === 'tab7') {
    $(".nav-bar").hide();
    $('body').css({ 'background-image': "url('img/photo5.png')", 'background-repeat': 'no-repeat', 'backdrop-filter' : 'blur(0px)' });
  
    // Define image URL and coords
    var imageUrl = "img/slug5.png";
    // Create image element
    imageEl = $('<img>');
    imageEl.attr('src', imageUrl);
    imageEl.attr('id', "slug5");
    imageEl.click(function () {
      //pause the timer
      timerGlobal.pause();
      timeParagraph5.html("FINAL TIME: " + timerGlobal.getTimeValues().toString());
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
      randArea = area1Level5;
      break;
    case 2:
      randArea = area2Level5;
      break;
    case 3:
      randArea = area3Level5;
      break;
    case 4:
      randArea = area4Level5;
      break;
    case 5:
      randArea = area5Level5;
      break;
    default:
      randArea = area1Level5;
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
    $("#location5").append("<p class='fact'>“A slug’s slime absorbs water, which is why it’s nearly impossible to wash it off your hands.”</p>");
    //print big slug image
    $("#location5").append("<img class='slugbig' src='img/slug5.png' />");
    //print random slug stat (for this level: land slug characteristics)
    var randFactInt = getRandomInteger(0, 15);
    $("#location5").append("<p class=fact-title>SLIMY SLUG STATS</p>");
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
    $("#location5").append("<p class=random-slug-fact>" + randFactStr + "</p>");

    //hide the slug
    imageEl.hide();
    //hide the hint
    $("#hint-p").hide();
    // maybe have a button to move to the next location 
    $("#location5").append("<button class=tab data-tab=tab8 id=buttons><b>Next Level</b> (Double Click)</button>");
    // (it can be like the start button where that is what makes it go to the next tab)
    $("#location5").on("click", "#buttons", function() {
      timerGlobal.start();
      loadLevel6();
    });
  });

  
}

  function loadLevel6() {
    var script = document.createElement("script");
    script.src = "./js/level6.js";
    document.head.appendChild(script);
  }

//find out what quadrant the slug is in
//UL
if (coords[2] >= xOffset && coords[3] >= yOffset && coords[2] <= xOffset + (photo5Width / 2) && coords[3] <= yOffset + (photo5Height / 2)) {
  currentQuadrant = 0;
}
//UR
else if (coords[2] >= xOffset + (photo5Width / 2) && coords[3] >= yOffset && coords[2] <= xOffset + (photo5Width) && coords[3] <= yOffset + (photo5Height / 2)) {
  currentQuadrant = 1;
}
//LL
else if (coords[2] >= xOffset && coords[3] >= yOffset + (photo5Height / 2) && coords[2] <= xOffset + (photo5Width / 2) && coords[3] <= yOffset + (photo5Height)) {
  currentQuadrant = 2;
}
//LR
else if (coords[2] >= xOffset + (photo5Width / 2) && coords[3] >= yOffset + (photo5Height / 2) && coords[2] <= xOffset + (photo5Width) && coords[3] <= yOffset + (photo5Height)) {
  currentQuadrant = 3;
}
else {
  console.log("You screwed up your quads!");
}

function drawQuadrant(quad) {
  //draw the rectangles to ensure areas are consistent WILL REMOVE LATER
  switch (quad) {
    case 0:
      $("#location-5-title").append("<p id=hint-p style=color:red;>HINT: It's in the upper left!");
      break;
    case 1:
      $("#location-5-title").append("<p id=hint-p style=color:red;>HINT: It's in the upper right!");
      break;
    case 2:
      $("#location-5-title").append("<p id=hint-p style=color:red;>HINT: It's in the lower left!");
      break;
    case 3:
      $("#location-5-title").append("<p id=hint-p style=color:red;>HINT: It's in the lower right!");
      break;
  }
}