
// -------------------------------------------- 고정 영역

//-------------- chat_bot
$(function () {

  $('#chat_bot_btn').on('click', function () {
    $(this).toggleClass('active')
    $('#chat_bot_list_container').toggleClass('active')
    $('#chat_bot_list').toggleClass('active')
  })

  $('#chat_bot > #ad_banner > button ').on('click', function () {
    $(this).closest('#ad_banner').css({ 'display': 'none' });
  })


  //---------------- blackfriday

  // 카운트 다운 설정
  const blkDayTarget = new Date('2025-01-01T00:00:00');


  const BlkDay = document.querySelector('#blf_count>.day>span');
  const BlkHour = document.querySelector('#blf_count>.hour>span');
  const BlkMinute = document.querySelector('#blf_count>.minute>span');
  const BlkSecond = document.querySelector('#blf_count>.second>span');

  function blkCount() {
    const now = new Date();
    const timeDifference = blkDayTarget - now;

    if (timeDifference <= 0) {
      BlkDay.textContent = '00';
      BlkHour.textContent = '00';
      BlkMinute.textContent = '00';
      BlkSecond.textContent = '00';
      clearInterval(countTimer);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    BlkDay.textContent = days.toString().padStart(2, '0');
    BlkHour.textContent = hours.toString().padStart(2, '0');
    BlkMinute.textContent = minutes.toString().padStart(2, '0');
    BlkSecond.textContent = seconds.toString().padStart(2, '0');
  }

  const countTimer = setInterval(blkCount, 1000);
  blkCount();




  // 스크롤 스크립트


  $(window).on('scroll', function () {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();

    const sliderTop = $('#slider').offset().top;
    const sliderBottom = sliderTop + ($("#slider").outerHeight() / 2);

    const footerTop = $('footer').offset().top;

    if (sliderBottom < scrollPosition) {
      $('#chat_bot').show();
    } else {
      $('#chat_bot').hide();
    }


    const blkFridayTop = $('#blkfriday').offset().top;

    if (
      blkFridayTop + 200 < scrollPosition &&
      blkFridayTop <= scrollPosition &&
      scrollPosition + windowHeight < footerTop
    ) {
      $('#blk_fixed_banner').addClass('show');
    } else {
      $('#blk_fixed_banner').removeClass('show');
    }
  });



})
