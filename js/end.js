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
  
    // end page
    if (tabId === 'tab13') {
      $(".nav-bar").hide();
      $('body').css({ 'background-image': "url('img/trees.jpg')", 'background-repeat': 'no-repeat', 'backdrop-filter' : 'blur(5px)' });
      $("#end #time-p").html("FINAL TIME: " + timerGlobal.getTimeValues().toString());
    }
  })
  