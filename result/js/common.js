jQuery(document).ready(function( $ ) {



  $('body').click(function () {
    if( $(".toggle-mnu").hasClass("on") ){
      $(".toggle-mnu").removeClass("on");
      $(".top-mnu").fadeOut();
    }
  });


  $(".top-mnu").click(function (e) {
    e.stopPropagation();
  });


  $('.burger').click(function () {
    $(this).toggleClass('burger-open');
    $('body').toggleClass("body-open");
    $('.header__col').toggleClass("open");    
  });



//levels menu
  let isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows())}}

  let body = document.querySelector('body');


  if ( isMobile.any() ) {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.menu-arrow');
    arrow.forEach(function (item) {
      let thisLink = item.previousElementSibling;
      let subMenu = item.nextElementSibling;
      let thisArrow = item;

      thisLink.classList.add('parent');
      item.addEventListener('click', function () {      
        subMenu.classList.toggle('open');
        thisArrow.classList.toggle('active');
      });
    });
  }
  else {
    body.classList.add('mouse')
  }


  $('.tslider').slick({
    infinite: true,    
    speed: 600,
    slidesToScroll: 1,
    autoplay: false,    
    slidesToShow: 1,
    cssEase: 'linear',  
    autoplaySpeed: 0,  
    arrows: true,
    dots: true,
    pauseOnHover: true,
  });

  
  if( $('.buy__quan').length ) {    
    $('.buy__quan').each(function () {
      const self = $(this);
      self.find('._plus').click(function () {
        if (self.find('input[type="text"]').val() < 100) {
          self.find('input[type="text"]').val(+self.find('input[type="text"]').val()+1);          
        }        
      });
      self.find('._minus').click(function () {
        if (self.find('input[type="text"]').val() >= 2) {
          self.find('input[type="text"]').val(+self.find('input[type="text"]').val()-1);
        }        
      });
    })
  }

  


/************************************/

/*$('.wrapper').prepend('<span class="eye-3"></span>');
let pg = parseInt(document.location.pathname.match(/\d+/))
$('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
$('body:not(.active)').css('background-image', "unset");

$('.eye-3').click(function (e) {
  e.preventDefault();  
  $('body').toggleClass('active');
  let pg = parseInt(document.location.pathname.match(/\d+/));
  $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");
});*/

/************************************/

  function popup(openLink, windowEl, closeEl) {  
    $(openLink).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeIn();
      $('body').addClass('ohi');
    });
    $(closeEl).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-overlay').click(function () {
      $(this).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-form__block').click(function (e) {
      e.stopPropagation();  
    });
    
  }

  popup('.link2', '.modal-overlay_2', '.modal-close_2');
  popup('.link', '.modal-overlay_1', '.modal-close_1');


  $('a[href*=\\#]:not([href=\\#])').click(function () {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 85}, 1100);
    return false;
  });


  $(window).scroll(function(){
    var wt = $(window).scrollTop();  
    var wh = $(window).height();    
    if (wt > 600) {
      $('.serv-arr-up').show(400);
    }
    else {
     $('.serv-arr-up').hide();
   }
 });

  if($('select').length) {
    $('select').select2({
      minimumResultsForSearch: -1
    });
  }


  $(".curr").on("keyup", function(){  
    const self = $(this);
    $(this).val(String(self.val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽')
  });


//RANGE
  const priceSlider = document.querySelector('.price__range');
  if (priceSlider) {

//let textFrom = priceSlider.getAttribute('data-from');
    let textTo = priceSlider.getAttribute('data-to');

    noUiSlider.create(priceSlider, {
      start: [2500, 10500],
      connect: true,
      step: 50,
      tooltips: [wNumb({ thousand: ' ', decimals: 0, prefix: '' + '' }), wNumb({ thousand: ' ', decimals: 0, prefix: '' + '' })],
      range: {
        'min': [0],
        'max': [40000]
      }    
    });

    priceSlider.noUiSlider.removeTooltips();


    const priceStart = document.getElementById('price-start');
    const priceEnd = document.getElementById('price-end');

    const priceTotalStart = document.getElementById('price__total-start');
    const priceTotalEnd = document.getElementById('price__total-end');
    

    //Значения из ползунков в инпуты
    priceSlider.noUiSlider.on('update', function(values, handle) {



      priceStart.value = (+Math.round(priceSlider.noUiSlider.get()[0])).toLocaleString('ru');
      priceEnd.value = (+Math.round(priceSlider.noUiSlider.get()[1])).toLocaleString('ru');

      priceTotalStart.innerHTML = (+Math.round(priceSlider.noUiSlider.get()[0])).toLocaleString('ru');
      priceTotalEnd.innerHTML = (+Math.round(priceSlider.noUiSlider.get()[1])).toLocaleString('ru');    
    });




    //Изменив значения в инпуте и нажав enter толзунки применяют нужное положение в зависимости от значения
    priceStart.addEventListener('change', setPriceValues);
    priceEnd.addEventListener('change', setPriceValues);


    function setPriceValues() {
      let priceStartValue;
      let priceEndValue;
      if (priceStart.value != '') {
        priceStartValue = priceStart.value;
      }
      if (priceEnd.value != '') {
        priceEndValue = priceEnd.value;
      }
      priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
} //spV
}// if priceSlider








/*$('.accordion-header').click(function () {
  if($(this).is('.inactive-header')) {
    $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
    $(this).toggleClass('active-header').toggleClass('inactive-header');
    $(this).next().slideToggle().toggleClass('open-content');
  }
  else {
    $(this).toggleClass('active-header').toggleClass('inactive-header');
    $(this).next().slideToggle().toggleClass('open-content');
  }
});*/


//$('.accordion-content').first().slideDown().toggleClass('open-content');

$('.accordion-header').click(function () {
  $(this).toggleClass('active-header');
  $(this).next().slideToggle().toggleClass('open-content');
});

return false;
}); //ready

