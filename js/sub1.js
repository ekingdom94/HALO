$(function () {


  // sub1 카테고리 셀렉트
  $('#category_sel>.select>ul>li>a').mouseover(function () {
    $(this)
      .css('background-color', '#F23A94')
      .children('h1').css('color', '#fff');
    $(this)
      .children('img').css('opacity', '1').css('filter', 'saturate(1)')
  }).mouseout(function () {
    $(this)
      .css('background-color', '#f1f1f1')
      .children('h1').css('color', '#444');
    $(this)
      .children('img').css('opacity', '0.2').css('filter', 'saturate(0)')
  })

  console.log(typeof jQuery);


  // 툴 도구 무한 순환 인터벌 슬라이더

  const $toolSliderContainer = $(".tool_img"); // 슬라이드 컨테이너
  const $toolSliderUl = $toolSliderContainer.find("ul"); // 슬라이드 리스트
  const $toolSliderSlides = $toolSliderUl.children("li"); // 슬라이드 항목
  const toolSliderSlideWidth = $toolSliderSlides.outerWidth(true); // 슬라이드 너비 (마진 포함)
  const toolSliderContainerWidth = $toolSliderContainer.width(); // 컨테이너 너비
  const toolSliderSpeed = 1; // 슬라이드 이동 속도
  const toolSliderIntervalTime = 8; // 이동 주기 (밀리초)

  // 복제 개수 계산 (한 화면 + 여유 공간을 채우기 위한 복제)
  const slidesInView = Math.ceil(toolSliderContainerWidth / toolSliderSlideWidth);
  const cloneCount = slidesInView * 2; // 두 화면 분량 복제
  for (let i = 0; i < cloneCount; i++) {
    $toolSliderUl.append($toolSliderSlides.eq(i % $toolSliderSlides.length).clone());
  }

  // 총 슬라이드 개수 및 ul 너비 설정
  const totalSlides = $toolSliderUl.children().length;
  $toolSliderUl.css("width", toolSliderSlideWidth * totalSlides + "px");

  // 슬라이드 애니메이션
  function toolSliderMove() {
    const currentLeft = parseFloat($toolSliderUl.css("left")) || 0;
    const newLeft = currentLeft - toolSliderSpeed;

    // 처음 위치로 되돌리기
    if (Math.abs(newLeft) >= toolSliderSlideWidth * slidesInView) {
      $toolSliderUl.css("left", 0); // 처음으로 이동
    } else {
      $toolSliderUl.css("left", newLeft + "px");
    }
  }

  // 무한 슬라이드 실행
  setInterval(toolSliderMove, toolSliderIntervalTime);
})


$(window).resize(function() {
  if ($(window).width() <= 1440) {
    $('#sub_header').hide();
  }
}).resize();

// .submenu & .sub_box slideDown
    function handleMenuInteraction() {
      if (window.matchMedia("(min-width: 1440px)").matches) {
          // 화면 크기가 1440px 이상일 때 실행
          $('.menu>ul>li').mouseover(function() {
              $('.submenu').stop().slideDown();
              $('.sub_box').stop().slideDown();
          }).mouseout(function() {
              $('.submenu').stop().slideUp();
              $('.sub_box').stop().slideUp();
          });
      } else {
          // 1440px 미만일 경우 기존 이벤트 제거 (옵션)
          $('.menu>ul>li').off('mouseover mouseout');
      }
      
    }