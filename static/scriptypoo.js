updateCUMTD = function(){
  $.post(
    '/updateCUMTD', function(data) {
      $("#buslist").empty();
      if(data.results.length > 0)
        processCUMTDUpdate(data.results);
      else {
        $("<a class='nobus'>No buses coming :(</a>").appendTo("#buslist");
      }
    }
  );
  setTimeout('updateCUMTD();', 120000);
  setTimeout('updateBusTimes();', 60000);
}

updateWeather = function(){
  $.post('/updateWeather', function(data) {
    processWeather(data);
  });
  setTimeout('updateWeather();', 900000);
}

updateHeadlines = function() {
  $.post('/updateHeadlines', function(data) {
    processHeadlines(data.results);
  }) 
  setTimeout('updateHeadlines();', 3600000);
}

function processHeadlines(data) {
  $('<ul id="news" class="hidden"></ul>').appendTo("body");
  for(i=0; i < data.length; i++) {
    $("<li class='news-item'>" + data[i] + "</li>").appendTo("#news");
  }
  $('[id^=ticker]').remove();
  $('#news').ticker();
}

function processWeather(data) {
  $("#weatherdesc").text(data.desc);
  $("#weathertemp > #number").text(data.temp);
  $("<img id='weathericon' src='" + data.icon + "' />").replaceAll("#weathericon");
}

function processCUMTDUpdate(data) {
  for(var i=0; i < data.length; i++) {
    bus = data[i];
    if(bus.hasOwnProperty("route")) {
      route_id = bus.route.route_id.replace(' EXPRESS', '').replace('HOPPER', '').replace(' WEEKEND', '').replace(' E-14', '').replace(' Gerty', '');
      $("<div id='route" + i + "' class='" + route_id + "'></div>").appendTo("#buslist");
      $("<div class='box-" + i + "'></div>").appendTo("#route" + i);
      $("<div id='info" + i + "' class='businfo'></div>").appendTo("#route" + i);
      $("<div class='headsign'>" + bus.headsign + " </div>").appendTo("#info" + i);
      $("<div class='stop'>" + bus.bus_stop + " </div>").appendTo("#info" + i);
      $("<div class='time'><span class='expected' min='" + bus.expected_mins + "'>" + bus.expected_mins + "</span><span class='min'>min</span></div>").appendTo("#info" + i);
      $('.box-' + i).css('background-color', '#' + bus.route.route_color);
    }
  }
}

updateBusTimes = function() {
  $.each($('.expected'), function(){
    currentMin = $(this).attr('min');
    newMin = currentMin - 1;
    $(this).attr('min', newMin);
    if(newMin < 0) {
      // $(this).parent().children('.min').remove();
      $(this).html("0");
      time = 30000;
      if(newMin == -1)
        udpateCUMTD();
    }
    else {
      $(this).html(newMin);
      time = 60000;
    }
  })
  setTimeout('updateBusTimes();', time);
}
updateDateTime = function() {
  date = new Date;

  h = date.getHours();
  if(h<10) {
    h = "0"+h;
  }
  m = date.getMinutes();
  if(m<10) {
    m = "0"+m;
  }
  s = date.getSeconds();
  if(s<10) {
    s = "0"+s;
  }

  $("#time").text(h + ":" + m);
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

  $("#date").text(days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate())
  setTimeout('updateDateTime();', 1000);
}