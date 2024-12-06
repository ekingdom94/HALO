
// -------------------------------------------- 고정 영역
$(function () {



  //-------------- chat_bot

  $('#chat_bot_btn').on('click', function () {
    $(this).toggleClass('active')
    $('#chat_bot_list_container').toggleClass('active')
    $('#chat_bot_list').toggleClass('active')
  })

  $('#chat_bot > #ad_banner > button ').on('click', function () {
    $(this).closest('#ad_banner').css({ 'display': 'none' });
  })



  // 스크롤 스크립트


  //   $(window).on('scroll', function () {
  //     const scrollPosition = $(window).scrollTop();
  //     const windowHeight = $(window).height();

  //     const sliderTop = $('#slider').offset().top;
  //     const sliderBottom = sliderTop + ($("#slider").outerHeight() / 2);

  //     const footerTop = $('footer').offset().top;

  //     if (sliderBottom < scrollPosition) {
  //       $('#chat_bot').show();
  //     } else {
  //       $('#chat_bot').hide();
  //     }


  //     const blkFridayTop = $('#blkfriday').offset().top;

  //     if (
  //       blkFridayTop + 200 < scrollPosition &&
  //       blkFridayTop <= scrollPosition &&
  //       scrollPosition + windowHeight < footerTop
  //     ) {
  //       $('#blk_fixed_banner').addClass('show');
  //     } else {
  //       $('#blk_fixed_banner').removeClass('show');
  //     }
  //   });


})

