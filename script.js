// variables
var bbcOne = "http://atlas.metabroadcast.com/3.0/schedule.json?channel_id=cbbh&annotations=channel,channel_summary,description,brand_summary,broadcasts,series_summary,available_locations&from=2013-06-21T11:00:00.000Z&to=2013-06-21T23:00:00.000Z&apiKey=84097c4de516445eb7bb58f4b73d2842";
var bbcTwo = "http://atlas.metabroadcast.com/3.0/schedule.json?channel_id=cbbG&annotations=channel,channel_summary,description,brand_summary,broadcasts,series_summary,available_locations&from=2013-06-21T11:00:00.000Z&to=2013-06-21T23:00:00.000Z&apiKey=84097c4de516445eb7bb58f4b73d2842";
var url = "http://atlas.metabroadcast.com/3.0/schedule.json?channel_id=cbbh&annotations=channel,channel_summary,description,brand_summary,broadcasts,series_summary,available_locations&from=2013-06-21T11:00:00.000Z&to=2013-06-21T23:00:00.000Z&apiKey=84097c4de516445eb7bb58f4b73d2842";

// reusable functions
var formatTime = function(time){
  return time.toLocaleTimeString("en-uk", {
      hour: "2-digit",
      minute: "2-digit",
      seconds: false
  })
  .replace("AM", "am").replace("PM","pm").replace(" ", "");
}

var template = function(image, start, title){
  return '<li class="slide"><a href="#"><img class="slide-image" src="'+image+'" alt="Slide image"><div class="slide-caption"><div class="slide-start-time">Starting at '+start+'</div><div class="slide-title">'+title+'</div></div></a></li>'
}

// Doc ready
$(document).ready(function(){

  var load = function(){
    $('#carousel').html('<ul class="slides clearfix"></ul>');
    $.ajax({
      type: "GET",
      url: url
    })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
        // console.log( "Ajax request complete" );
      })
      .done(function(data){
        var programmes = data["schedule"][0]["items"];
        console.log("prog: ", data);

        var channelTitle = data["schedule"][0]['channel_title'];
        $('.page-title').html(channelTitle);

        var title;
        var start;
        var end;
        var image;
        var description;
        $.each(programmes, function(key, val){

          title = val["title"];

          start = formatTime(new Date(val["broadcasts"][0]["transmission_time"]));

          end = formatTime(new Date(val["broadcasts"][0]["transmission_end_time"]));

          if(val["image"]){
            image = val["image"];
          } else {
            image="http://ichef.bbci.co.uk/corporate2/images/width/live/p0/0l/k4/p00lk43v.jpg/624";
          };

          description = val["description"];

          $('.container ul').append(template(image, start, title));

        }); // each

        $('.slides').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 460,
          slideMargin: 5,
          infiniteLoop: true,
          hideControlOnEnd: true,
          auto: true,
          autoControls: true,
          // pager: false,
          speed: 4000
        });

    }); // done && ajax
  } // load
  load();

  // Handle user's channel selection
  $('button').on('click', function(){
    $('button').removeClass("selected");
    $(this).addClass("selected");

    if($(this).hasClass("two")){
      url = bbcTwo;
      $('.logo').attr('src', "http://upload.wikimedia.org/wikipedia/en/thumb/e/e5/BBC_Two.svg/1280px-BBC_Two.svg.png");
    } else {
      url = bbcOne;
      $('.logo').attr('src', "http://upload.wikimedia.org/wikipedia/commons/1/1a/BBC_One_2002.png");
    }

    load();
  }); // button click

}); // Document ready
