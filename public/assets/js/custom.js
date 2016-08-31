$(document).ready(function(){

  var startCount = true

  if (GetIEVersion() > 0){
    alert("Nie robię stron pod internet exploler");
    window.location.replace("http://stackoverflow.com");
  }
     
  moveImage('.header-image')

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    showHeroAtributs(wScroll)


    if(wScroll > $('.stats-box').offset().top - ($(window).height()/1.9)){

      countMe('.count1')
      countMe('.count2')
      countMe('.count3')
      countMe('.count4')

      startCount = false

    } 

    navbarColor(wScroll);
  })

  sendMessage()
  
  openNav()

  anchorScroll()


  function countMe(element){

    if(startCount == true){
       var finish = $(element).attr('finish');
       var start = $(element).attr('start');
       var speed = $(element).attr('speed');
      
       var count = setInterval(function(){
        start++
        if(start == finish){
          clearInterval(count);
        }
        $(element).html(start) 
      }, speed)
    }
    
  } 


})




function sendMessage(){

  $("#send_message").click(function(){

    var user = {
      name: $("#name").val(),
      email: $("#email").val(),
      text: $("#text").val()
    }

    $.post( "message/post", user, function( data ) {

      if(data.status === 'alert'){
        $(".success").text('')
        $('.contact-form').addClass('shake');
        $('.contact-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.contact-form').removeClass('shake')
        });
        var errors = [];
        for(var i = 0; i < data.response.length; i++){
          errors.push('<li>' + data.response[i] + '</li>');
        }
        $(".errors").html(errors.join(''));  
      }
      if(data.status === 'success'){
        $(".loading").text('ładujemy...').fadeIn("slow").delay(500).fadeOut("slow", function(){
          $(".errors").text('');
          $("#name").val('');
          $("#email").val('');
          $("#text").val('');
          $(".success").text(data.response)      
        });
        
      }
    
    });
  });
}



function openNav(){
  $(".mobile-box").click(function(){
    $(".navbar ul").toggle('slow');
  })
}

function showHeroAtributs(wScroll){
  if(wScroll > $('.hero-box').offset().top - ($(window).height()/1.9)){
    $('.hover-me').addClass('pulse')
    $('.hero-atr').addClass('is-showing')
  }
}


function moveImage(img){

  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();

  $(img).mousemove(function( event ) {
    var pageX = event.pageX - $(window).width();
    var pageY = event.pageY - $(window).height();
    var newvalueX = width * pageX * -1 - 25;
    var newvalueY = height * pageY * -1 - 50;
    $(this).css("background-position", newvalueX+"px     "+newvalueY+"px");
  })
}

function navbarColor(wScroll){
  if(wScroll > $('.navbar').offset().top - ($(window).height()/1.9)){
    $('.navbar').addClass('is-moved');
  }

  if(wScroll < 1){
    $('.navbar').removeClass('is-moved')
  }
}

    //anchor scroll 

function anchorScroll(){
  $('a[href*="#"]:not([href="#"])').click(function(){

  if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname){

    var target=$(this.hash);

    target = target.length ? target:$('[name='+this.hash.slice(1)+']');

    if(target.length){$('html, body').animate({
      scrollTop:target.offset().top
    },1000);

      return false;
    }}
  });
}


function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0;
}



