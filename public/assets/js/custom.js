

$(document).ready(function(){

"use strict";

  //variable for start count

  var startCount = true;

  $(window).scroll(function(){
    var wScroll = $(this).scrollTop();

    if(wScroll > $('.stats-box').offset().top - ($(window).height()/1.9)){
      countMe('.count1', '+');
      countMe('.count2', '/160');
      countMe('.count3');
      countMe('.count4', '+');
      startCount = false;
    }

    arrowMoveUp(wScroll)
    showHeroAtributs(wScroll);
    navbarColor(wScroll);
  });

  //start functions

  movePng('.first', 50);
  movePng('.twinkling', 40)
  movePng('.second', 10);
  sendMessage();
  openNav();
  anchorScroll();
  showContactForm();
  hideContactForm();
  //count function

  function countMe(element, add){
    if(startCount == true){
      var plus = '';

       if(add){
        plus = add;
       }

       var finish = $(element).attr('finish');
       var start = $(element).attr('start');
       var speed = $(element).attr('speed');
       var count = setInterval(function(){
        start++;
        if(start == finish){
          clearInterval(count);
        }
        $(element).html(start + plus);
      }, speed);
    }
  }
});

//sending message function

function sendMessage(){

  "use strict";

  $("#send_message").click(function(){

    $(".response").removeClass('success').text('');

    var user = {
      name: $("#name").val(),
      email: $("#email").val(),
      text: $("#text").val()
    };

    $(".response").text('ładowanie...')
    setTimeout(function(){
      $.post( "message/post", user, function(data) {

        if(data.status === 'alert'){
          var errors = [];
          for(var i = 0; i < data.response.length; i++){
            errors.push('<li>' + data.response[i] + '</li>');
          }
          $(".response").html(errors.join(''));
        }

        if(data.status === 'success'){
          $("#name").val('');
          $("#email").val('');
          $("#text").val('');
          $(".response").addClass('success').text(data.response)
        }
      });
    }, 700)


  });
}

//mobile navigation hamburger

function openNav(){
  $(".mobile-box").click(function(){
    $(".navbar ul").toggle('slow');
  })
}

//Hero atributes slowly appear

function showHeroAtributs(wScroll){
  if(wScroll > $('.hero-box').offset().top - ($(window).height()/1.9)){
    $('.hover-me').addClass('pulse')
    $('.hero-atr').each(function(i){
      setTimeout(function(){
        $('.hero-atr').eq(i).addClass('is-showing')
      }, 300 * i)
    })
  }
}

function arrowMoveUp(wScroll){
  if(wScroll > $('.contact-box').offset().top - ($(window).height()/1.9)){
    $('.arrow').addClass('move-up')
  }
}



//moved clouds

function movePng(img, speed){
  var i = 0
  setInterval(function(){
      i++
      $(img).css('background-position', i + 'px 0')
  }, speed)
}

//change color after using scroll

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

//show contact form

function showContactForm(){
  $(".open-modal-btn").click(function(){
    $(".overlay").addClass('is-showing');
    $(".contact-form").addClass('appear');
  })
}
function hideContactForm(){
  $(".close-modal-btn").click(function(){
    $(".overlay").removeClass('is-showing');
    $(".contact-form").removeClass('appear');
  })
}


