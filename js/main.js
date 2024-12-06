$(function () {

  // .submenu & .sub_box slideDown
  $('.menu>ul>li').mouseover(function () {
    $('.submenu').stop().slideDown();
    $('.sub_box').stop().slideDown();
    $(this).find('a').addClass('active')
  }).mouseout(function () {
    $('.submenu').stop().slideUp();
    $('.sub_box').stop().slideUp();
    $(this).find('a').removeClass('active')
  })



  //---------------------------------------------------------------------------------------------------- slider

  const sliderVideoVideos = document.querySelectorAll('#slider_wrap video');
  const sliderVideoProgressBar = document.querySelector('.slider_bar');
  let sliderVideoCurrentSlide = 0;
  let sliderVideoTimer;

  // 슬라이드 전환 함수
  function sliderVideoShowSlide(index) {
    // 이전 타이머 초기화
    clearTimeout(sliderVideoTimer);

    // 이전 슬라이드 비활성화
    sliderVideoVideos[sliderVideoCurrentSlide].pause();
    sliderVideoVideos[sliderVideoCurrentSlide].classList.remove('active');
    sliderVideoVideos[sliderVideoCurrentSlide].currentTime = 0;

    // 새 슬라이드 활성화
    sliderVideoCurrentSlide = index;
    sliderVideoVideos[sliderVideoCurrentSlide].classList.add('active');
    sliderVideoVideos[sliderVideoCurrentSlide].play();

    // 네비게이션 버튼 상태 업데이트
    $('.slider_btn').removeClass('active');
    $('.slider_btn').eq(sliderVideoCurrentSlide).addClass('active');

    // 재생 바 초기화 및 애니메이션 재시작
    sliderVideoProgressBar.style.animation = 'none';
    void sliderVideoProgressBar.offsetWidth;
    sliderVideoProgressBar.style.animation = 'sliderBarProgress 10s linear';

    // 10초 후 다음 슬라이드로 이동
    sliderVideoTimer = setTimeout(() => {
      sliderVideoShowSlide((sliderVideoCurrentSlide + 1) % sliderVideoVideos.length); // 다음 슬라이드
    }, 10000);
  }

  // 네비게이션 버튼 이벤트 설정
  $('.slider_btn').each(function (index) {
    $(this).on('click', function () {
      sliderVideoShowSlide(index);
    });
  });

  // 초기 슬라이드 실행
  sliderVideoShowSlide(0);


  //-----------------------------------------------------------------------------------------main>#category slick 플러그인 사용


  const categorySlider = $('#category_inner');

  categorySlider.slick({
    variableWidth: true,
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    swipe: true
  });


  //-------------------------------------------------------------------------------------------main>#style


  const styleSliderWrap = $('#style_slider');
  const styleSlider = $('#style_slider>ul');
  const styleSliderCount = styleSlider.find('li').length;
  let styleSliderIndex = 0;
  const styleSliderSub = $('#style_slider2>ul>li');

  console.log(styleSliderSub);

  // 현재 슬라이더 항목에 active 클래스 추가
  function updateActiveClass() {
    // 제품 슬라이더
    styleSlider.find('li').removeClass('active'); // 모든 항목에서 active 제거
    styleSlider.find('li').last().addClass('active'); // 현재 항목에 active 추가

    if (styleSliderIndex >= styleSliderCount) {
      styleSliderIndex = 0;
    }

    // 모델 슬라이더
    styleSliderSub.removeClass('active');
    styleSliderSub.eq(styleSliderIndex - 1).addClass('active'); // 0-based 인덱스 사용
  }

  // '다음' 버튼 클릭
  $('#style_slider_btn>.next_btn').on('click', function () {
    // 첫 번째 항목을 마지막으로 이동
    const firstItem = styleSlider.find('li').first();
    styleSlider.append(firstItem);

    // 인덱스 업데이트
    styleSliderIndex = (styleSliderIndex - 1 + styleSliderCount) % styleSliderCount; // 순환

    // 배경 변경
    const styleBgImage = `url("../img/main/style2-${styleSliderIndex + 1}.png")`;
    $('#style').css('background-image', styleBgImage);

    // active 클래스 갱신
    updateActiveClass();
  });

  // '이전' 버튼 클릭
  $('#style_slider_btn>.prev_btn').on('click', function () {
    // 마지막 항목을 첫 번째로 이동
    const styleSliderlastItem = styleSlider.find('li').last();
    styleSlider.prepend(styleSliderlastItem);

    // 인덱스 업데이트
    styleSliderIndex = (styleSliderIndex + 1) % styleSliderCount; // 순환

    // 배경 변경
    const styleBgImage = `url("../img/main/style2-${styleSliderIndex + 1}.png")`;
    $('#style').css('background-image', styleBgImage);

    // active 클래스 갱신
    updateActiveClass();
  });

  // 초기화
  updateActiveClass();


  // 모바일 스타일 슬라이드

  $('.style_center').slick({
    centerMode: true,
    variableWidth: true,
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    swipe: true,

  });

  let styleSliderMIndex;

  function styleSliderM() {
    styleSliderMIndex = $('#style_slider_mobile li.slick-center').index();

    $('#style_slider2 ul li').removeClass('active active2'); // 모든 li에서 클래스 제거
    $('#style_slider2 ul li').eq(10 - styleSliderMIndex - 1).addClass('active2'); // 필요한 li에 active2 추가

    // 배경 이미지 인덱스 계산
    let styleMBgImageIndex = 10 - styleSliderMIndex + 1;

    // 인덱스가 11이면 1로 변경
    // if (styleMBgImageIndex === 10) {
    //     styleMBgImageIndex = 1;
    // }

    // 새로운 배경 이미지 URL
    let styleMBgImage = `url("../img/main/style2-${styleMBgImageIndex}.png")`;

    // 배경 이미지 업데이트
    $('#style_slider2 ul li').eq(10 - styleSliderMIndex - 1).css('background-image', styleMBgImage);

    console.log('styleMBgImageIndex:', styleMBgImageIndex, 'Background Image:', styleMBgImage);
  }

  $('#style_slider_mobile .slick-slider').on('afterChange', function (event, slick, currentSlide) {
    styleSliderM();
  });



  // -----------------------------------------------------------------------------------------main>#giftshop

  //------------- 일반 컴플리트 옵션 설정
  // 옵션 클릭 시 동작
  $('.product_option > li > a').on('click', function (event) {
    event.preventDefault();  // 기본 링크 클릭 동작을 막음

    let index = $(this).closest('li').index();
    let $productListOption = $(this).closest('.product_list_option');

    $productListOption.find('.product_list').hide();
    $productListOption.find('.product_list').eq(index).css({
      'display': 'flex'
    });
  });

  //---------- 호버 이미지 변경

  let productImgOrigin;

  $('.product_color li img').on('mouseenter', function () {
    let productImgindex = $(this).closest('li').index();
    productImgOrigin = $(this).closest('.product_img').find('img').attr('src');
    let newSrc = productImgOrigin.replace(/(\d+)(?=\.\w+$)/, productImgindex + 1);
    $(this).closest('.product_img').children('img').attr('src', newSrc);
  });
  $('.product_color li img').on('mouseleave', function () {
    $(this).closest('.product_img').children('img').attr('src', productImgOrigin);
  })

  //-------------- 슬라이더

  //-------------- 슬라이더

  const giftSliderWrap = $('#giftshop_slider_wrap');
  const giftSlider = $('#giftshop_slider');
  let giftVisibleCount = 4; // 한 번에 보이는 슬라이드 개수 (let으로 변경)
  let giftItemWidth = 0; // 슬라이드 항목 너비
  let giftCurrentOffset = 0;

  // 필터링 클릭 이벤트
  $(".giftshop_option>li>a").click(function () {
    $(".giftshop_option>li>a").removeClass("active");
    $(this).addClass("active");

    const giftCategory = $(this).data("category");

    if (giftCategory === "all") {
      $("#giftshop_slider>li").show(); // 전체 보여줌
    } else {
      $("#giftshop_slider>li").each(function () {
        if ($(this).data("category") === giftCategory) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }

    updateGiftSliderState(); // 필터링 후 슬라이더 상태 업데이트
  });

  if ($(window).width() <= 1430) {
    giftVisibleCount = 3; // 1440px 이하에서는 3개 표시
  } else {
    giftVisibleCount = 4; // 그 외는 4개 표시
  }
  // 슬라이더 상태 업데이트 함수
  function updateGiftSliderState() {
    const giftSliderItems = giftSlider.children('li:visible'); // 보이는 슬라이드만 가져옴
    giftItemWidth = giftSliderItems.outerWidth(true); // 보이는 슬라이드의 너비 계산 (마진 포함)
     giftCurrentOffset = 0; // 현재 오프셋 초기화
    giftSlider.css('transform', `translateX(0px)`); // 슬라이더 위치 초기화

    giftSlider.css('transition', 'none'); // 애니메이션 제거
    setTimeout(() => {
      giftSlider.css('transition', 'transform 0.8s ease-in-out'); // 애니메이션 복구
    }, 0);
  }

  // '다음' 버튼 클릭
  $('#giftshop_slider_next').on('click', function () {
    const giftTotalItems = giftSlider.children('li:visible').length; // 보이는 아이템 수
    const giftVisibleWidth = giftItemWidth * giftVisibleCount; // 한 번에 이동할 너비
    const giftTotalWidth = giftItemWidth * giftTotalItems; // 전체 슬라이드의 너비
    console.log(giftVisibleWidth);
    const giftMaxOffset = giftTotalWidth - giftVisibleWidth; // 최대 이동 가능 거리

    if (giftCurrentOffset < giftMaxOffset) {
      if (giftCurrentOffset + giftVisibleWidth >= giftMaxOffset) {
        giftCurrentOffset = giftMaxOffset; // 남은 만큼만 이동
      } else {
        giftCurrentOffset += giftVisibleWidth; // 4개씩 이동
      }
      giftSlider.css('transform', `translateX(-${giftCurrentOffset}px)`);
    }
  });

  // '이전' 버튼 클릭
  $('#giftshop_slider_prev').on('click', function () {
    const giftVisibleWidth = giftItemWidth * giftVisibleCount;

    if (giftCurrentOffset > 0) {
      giftCurrentOffset -= giftVisibleWidth; // 4개씩 뒤로 이동
      if (giftCurrentOffset < 0) {
        giftCurrentOffset = 0; // 시작 위치로 제한
      }
      giftSlider.css('transform', `translateX(-${giftCurrentOffset}px)`);
    }
  });

  // 화면 크기에 따른 슬라이더 보이는 개수 변경 (추가된 부분 시작)
  function updateGiftVisibleCount() {
    if ($(window).width() <= 1430) {
      giftVisibleCount = 3; // 1440px 이하에서는 3개 표시
    } else {
      giftVisibleCount = 4; // 그 외는 4개 표시
    }
    updateGiftSliderState(); // 상태 업데이트 호출
  }
  // (추가된 부분 끝)

  // 초기화 및 화면 크기 변경 이벤트 (추가된 부분 시작)
  $(window).on('resize', updateGiftVisibleCount); // 화면 크기 변경 시 호출
  updateGiftVisibleCount(); // 페이지 로드 시 초기 상태 설정
  // (추가된 부분 끝)



})