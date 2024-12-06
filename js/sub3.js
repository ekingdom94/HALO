$(function(){

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
  
  // 초기 로드 시 실행
  handleMenuInteraction();
  
  // 창 크기 변경 시 재실행
  $(window).resize(function() {
      handleMenuInteraction();
  });

    // 메인탑 이미지 변경
    $('#img_box>ul>li:nth-child(1)').click(function(){
      $('#main_top').css('background-image', $(this).css('background-image'));
    })
    $('#img_box>ul>li:nth-child(2)').click(function(){
      $('#main_top').css('background-image', $(this).css('background-image'));
    })
    $('#img_box>ul>li:nth-child(3)').click(function(){
      $('#main_top').css('background-image', $(this).css('background-image'));
    })
  })
  

  
    // 상세페이지 더보기 접기
    // $(function(){
    //   $('#product_img button').text('더 보기')
    //   $('#product_img button').click(function(){
    //     $(this).siblings('#product_img .img')
    //     .css('height', 'fit-content')
    //     .css('overflow', 'visible')
    //     $(this).text('접기')
    //     .click(function(){
    //       $(this).siblings('#product_img .img')
    //       .css('height', '1120px')
    //       .css('overflow', 'hidden')
    //     })
    //   })
    // })
      $(function(){
        $("#product_img .button button").click(function () {
          const imgContainer = $("#product_img .img");
          const imgWrap = $("#product_img .img .img_wrap");
      
          if ($(this).text() === "상품 정보 접기") {
            // 원래 상태로 돌아가기
            imgContainer.css({
              height: "0",
              "padding-top": "112%",
              position: "relative",
            });
            imgWrap.css({
              height: "",
              position: "absolute",
            });
            $(this).text("상품 정보 더보기");
            $(this).css('box-shadow', '0 0 80px 100px #fff')
          } else {
            // 접힌 상태로 변경
            imgContainer.css({
              height: "fit-content",
              "padding-top": "0",
              position: "static",
            });
            imgWrap.css({
              height: "fit-content",
              position: "static",
            });
            $(this).text("상품 정보 접기");
            $(this).css('box-shadow', 'none')
          }
        });
      });
     // // 포커스 강제 이동
        // setTimeout(function() {
        //     $this.trigger('focus'); // 포커스를 강제 트리거
        // }, 0); // 즉시 DOM 업데이트 후 실행
      
      

      
      // 질문 접기 펴기
      $(function(){
        $('#question .box .button').click(function(){
            // 현재 클릭된 버튼과 연결된 요소
            const content = $(this).next('p'); // 바로 다음 p 태그
            const icon = $(this).find('img'); // 현재 버튼의 img 태그

            if (content.is(':visible')) {
                // 내용이 보이는 경우: 숨기기
                content.slideUp();
                icon.css('transform', 'rotate(180deg)'); // 화살표 반대방향
            } else {
                // 내용이 보이지 않는 경우: 열기
                content.slideDown();
                icon.css('transform', 'rotate(0deg)'); // 화살표 원래 방향
            }
        });
      });



      $(function(){
        // 탑메뉴 클릭하면 페이지 이동
        $('#top_menu a').click(function(event) {
          event.preventDefault(); // 기본 클릭 동작 방지
          let target = $(this).attr('href'); // 클릭된 링크의 href 값을 가져옴
          let offset = $(target).offset().top - 100; // 대상 위치에서 90px 위로 계산
          
          // 스크롤 이동
          $('html, body').animate({
            scrollTop: offset
          }, 500); // 500ms 동안 부드럽게 스크롤
        });
      })
      


      //반응형으로 잠시 만듬
    

      $(document).ready(function() {
        // 화면 크기가 479px 이하일 때
        function checkScreenSize() {
          if ($(window).width() <= 479) {
            $('.submenu2 > li').hide();
            $('#footer_top').css('height','100px')
          } 
          else {
            $('.submenu2 > li').show();
            $('#footer_top').css('height','360px')
          }
        }

        $('#footer_top li').click(function(){
          if ($('.submenu2 > li').hide()) {
            $('#footer_top').css('height', '360px')
            $('.submenu2 li').stop().slideDown();
          }
          else if($('.submenu2 > li').show()) {
            $('#footer_top').css('height', '0')
            $('.submenu2 li').stop().sliedUp();
          }

          
        })
    
        // if ($(this).text() === "상품 정보 접기") {
        //   // 원래 상태로 돌아가기
        //   imgContainer.css({
        //     height: "0",
        //     "padding-top": "112%",
        //     position: "relative",
        //   });
        //   imgWrap.css({
        //     height: "",
        //     position: "absolute",
        //   });
        //   $(this).text("상품 정보 더보기");
        //   $(this).css('box-shadow', '0 0 80px 100px #fff')
        // } else {
        //   // 접힌 상태로 변경
        //   imgContainer.css({
        //     height: "fit-content",
        //     "padding-top": "0",
        //     position: "static",
        //   });
        //   imgWrap.css({
        //     height: "fit-content",
        //     position: "static",
        //   });
        //   $(this).text("상품 정보 접기");
        //   $(this).css('box-shadow', 'none')
        // }


        // 페이지 로드 시 크기 체크
        checkScreenSize();
    
        // 윈도우 크기 변경 시 체크
        $(window).resize(function() {
            checkScreenSize();
        });
      });
    
