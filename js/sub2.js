$(function () {

  // ----------------------------------------------------->이미지 전환
  $(".product_color a").on("mouseover", function (e) {
    e.preventDefault(); // 기본 동작 막기

    const index = $(this).data("index"); // 클릭한 요소의 data-index 값 가져오기
    const productBox = $(this).closest("[class='product_box']"); // 현재 상품 박스

    // ------------------------------------------------> 이미지 표시
    productBox.find(".product_image li").removeClass("active");
    productBox.find(".product_image li").eq(index).addClass("active");
  });



  // 각 비교 가능 카테고리 선별
  const compareRules = {
    스타일러: ['스타일러', '드라이어', '스트레이트너'], // 스타일러와 비교 가능한 카테고리
    드라이어: ['스타일러', '드라이어', '스트레이트너'], // 드라이어와 비교 가능한 카테고리
    스트레이트너: ['스타일러', '드라이어', '스트레이트너'], // 스트레이트너와 비교 가능한 카테고리
    악세서리: ['악세서리'] // 악세서리와 비교 가능한 카테고리
  };


  $('#popup').hide();
  $(function () {
    // 선택한 상품 정보를 담을 배열
    const selectedProducts = [];

    // 체크박스 클릭 이벤트
    $(".compare_checkbox").on("change", function () {
      const productBox = $(this).closest(".product_box"); // 현재 상품 박스
      const productClass = $(this).data("id"); // 체크박스의 데이터 ID
      const productData = {
        id: productClass,
        title: productBox.find(".title").text().trim(),
        rating: productBox.find(".rating").text().trim(),
        price: productBox.find(".price").text().trim(),
        imageSrc: productBox.find(".product_image li.active img").attr("src") // 활성화된 이미지 경로 추가
      };

      if ($(this).is(":checked")) {
        // 최대 4개의 상품까지만 추가
        if (selectedProducts.length < 4) {
          selectedProducts.push(productData);
        } else {
          // 체크 해제하여 추가되지 않도록 함
          $(this).prop("checked", false);
          alert("최대 4개의 상품만 추가할 수 있습니다.");
        }
      } else {
        // 체크박스 해제 시 상품 제거
        const index = selectedProducts.findIndex((item) => item.id === productClass);
        if (index !== -1) selectedProducts.splice(index, 1);
      }

      // 팝업 모달 업데이트
      updatePopupModal();
    });

    // 팝업 모달 업데이트 함수
    function updatePopupModal() {
      const popup = $("#popup");
      const modalContainer = popup.find(".modal-container");
      modalContainer.empty(); // 기존 모달 내용을 지움

      // 선택된 상품을 모달에 추가
      selectedProducts.forEach((product) => {
        const modal = $(
          `<div class="modal" style="flex: ${100 / selectedProducts.length}%" data-id="${product.id}">` +
          `<img src="${product.imageSrc}" alt="${product.title}" />` +
          `<p>${product.title}</p>` +
          `<button class="remove-btn" data-id="${product.id}"></button>` +
          `</div>`
        );
        modalContainer.append(modal);
      });

      // 선택된 상품이 있으면 팝업을 표시
      if (selectedProducts.length > 0) {
        popup.css("display", "grid");
      } else {
        popup.hide(); // 선택된 상품이 없으면 팝업 숨기기
      }
    }

    //팝업 비교 안되는 카테고리 상품 입력 방

    // 제품 선택 시 이벤트
    $(".compare_checkbox").on("click", function () {
      // 체크된 제품 박스
      let checkedProduct = $(this).closest('.product_box');
      const selectedCategory = checkedProduct.data("category");

      if ($('#popup').css('display') === 'none') {
        $(".product_box").removeClass("disabled");
        console.log('안보임')
      }
      // 모든 제품 초기화
      $(".product_box").removeClass("disabled");


      // 선택된 제품과 비교 가능한 카테고리를 가져옴
      const comparableCategories = compareRules[selectedCategory] || [];

      // 비교 가능한 카테고리가 아닌 제품들에 클래스 추가
      $(".product_box").each(function () {
        const currentCategory = $(this).data("category");
        if (!comparableCategories.includes(currentCategory)) {
          $(this).addClass("disabled");
        }
      });
      // 팝업 닫기 버튼 클릭 시
      $(".close-btn").on("click", function () {
        $('#popup').hide(); // 팝업 숨기기
        selectedProducts.length = 0; // 선택된 상품 초기화
        $(".compare_checkbox").prop("checked", false); // 체크박스 해제
        updatePopupModal(); // 모달 업데이트
        $(".product_box").removeClass("disabled");

      });
    });


    let modalIndex;
    // 팝업 모달 안에서 제거 버튼 클릭 시 이벤트
    $(document).on("click", ".remove-btn", function () {
      const productId = $(this).data("id");
      const index = selectedProducts.findIndex((item) => item.id === productId);
      if (index !== -1) selectedProducts.splice(index, 1);

      // 체크박스 상태도 해제
      $(`.compare_checkbox[data-id="${productId}"]`).prop("checked", false);

      const productIdIndex = productId.replace(/\D/g, '');

      const selectedCategory = $('.product_box').eq(productIdIndex - 1).data("category");
      console.log(selectedCategory)

      // 선택된 제품과 비교 가능한 카테고리를 가져옴
      const comparableCategories = compareRules[selectedCategory] || [];

      // 비교 가능한 카테고리가 아닌 제품들에 클래스 추가
      $(".product_box").each(function () {
        const currentCategory = $(this).data("category");
        if (!comparableCategories.includes(currentCategory)) {
          $(this).addClass("disabled");
        }
      });

      modalIndex = $(this).closest('.modal').index()
      $(".modal").eq(modalIndex).remove();

      if ($('.modal_container').find('.modal').length === 0) {
        $(".product_box").removeClass("disabled");
      }


      // 팝업 모달 업데이트
      updatePopupModal();
    });
  });




  //---------------------------------------------------------------> 필터링 데이터
  const productFilter = {
    "멀티 스타일링": ["멀티스타일러"],
    "컬 또는 웨이브": ["오리진", "멀티스타일러"],
    "스트레이트": ["스트레이트", "슈퍼소닉뉴럴"],
    "볼륨 드라이": ["코랄스트레이트너", "슈퍼소닉"],
    "i.d. curl™": ["멀티스타일러"],
    "개인 맞춤 설정": ["멀티스타일러", "슈퍼소닉", "슈퍼소닉뉴럴"],
    "두피 보호": ["슈퍼소닉뉴럴", "슈퍼소닉"],
    "스마트 스타일링 툴": ["멀티스타일러", "슈퍼소닉뉴럴", "슈퍼소닉"],
    "앱 연결": ["멀티스타일러"],
    "열 손상 방지": ["멀티스타일러", "슈퍼소닉뉴럴", "슈퍼소닉", "스트레이트너", "오리진"],
    "음이온": ["멀티스타일러", "슈퍼소닉뉴럴", "슈퍼소닉", "스트레이트너", "오리진"],
    "일시 정지 감지": ["슈퍼소닉뉴럴", "슈퍼소닉"],
    "코안다 효과": ["멀티스타일러", "스트레이트너"],
    "무선 사용": ["스트레이트"],
  };

  //-----------------------------------------------> 필터링 로직
  function filterProducts() {
    // 선택된 헤어 스타일 필터 값들 가져오기
    const selectedHairStyles = $("input[name='hair-style']:checked").map(function () {
      return $(this).val().trim();
    }).get();

    // 선택된 기능 필터 값들 가져오기
    const selectedFunctions = $("input[name='function']:checked").map(function () {
      return $(this).val().trim();
    }).get();

    // 디버깅 로그 추가
    console.log("Selected Hair Styles:", selectedHairStyles);
    console.log("Selected Functions:", selectedFunctions);
    let filteredProducts = [];

    // -------------------------------------------------> 필터가 둘 다 선택된 경우 교집합
    if (selectedHairStyles.length > 0 && selectedFunctions.length > 0) {
      let hairStyleFilteredProducts = [];
      selectedHairStyles.forEach((style) => {
        if (productFilter[style]) {
          hairStyleFilteredProducts = hairStyleFilteredProducts.concat(productFilter[style]);
        }
      });

      let functionFilteredProducts = [];
      selectedFunctions.forEach((func) => {
        if (productFilter[func]) {
          functionFilteredProducts = functionFilteredProducts.concat(productFilter[func]);
        }
      });

      // --------------------------------------------------->두 필터의 교집합 계산
      hairStyleFilteredProducts = [...new Set(hairStyleFilteredProducts)];
      functionFilteredProducts = [...new Set(functionFilteredProducts)];
      filteredProducts = hairStyleFilteredProducts.filter((product) =>
        functionFilteredProducts.includes(product)
      );
    } else if (selectedHairStyles.length > 0) {
      // 헤어 스타일 필터만 선택된 경우
      selectedHairStyles.forEach((style) => {
        if (productFilter[style]) {
          filteredProducts = filteredProducts.concat(productFilter[style]);
        }
      });
    } else if (selectedFunctions.length > 0) {
      // 기능 필터만 선택된 경우
      selectedFunctions.forEach((func) => {
        if (productFilter[func]) {
          filteredProducts = filteredProducts.concat(productFilter[func]);
        }
      });
    }

    //---------------------------------------------------------- 중복 제거--------------->
    filteredProducts = [...new Set(filteredProducts)];

    console.log("Filtered Products:", filteredProducts);

    //--------------------------------------------- 상품 필터링 적용----------------------->
    $("[class='product_box']").each(function () {
      const productName = $(this).data("product"); // data-product에서 이름 가져오기
      if ((selectedHairStyles.length === 0 && selectedFunctions.length === 0) || filteredProducts.includes(productName)) {
        $(this).show(); // 조건에 맞는 상품 표시
      } else {
        $(this).hide(); // 조건에 맞지 않는 상품 숨기기
      }
    });
  }

  // ------------------------------------------필터 변경 이벤트 연결----------------->
  $("input[name='hair-style'], input[name='function']").on("change", function () {
    filterProducts();
  });

  // -------------------------------------------초기화 버튼-------------------------------->
  $("#clear-filters").on("click", function (e) {
    e.preventDefault();
    $("input[name='hair-style'], input[name='function']").prop("checked", false);
    $("[class='product_box']").show();
    console.log("Filters cleared");
  });




  //------------------------ c_b1, c_c1 안의 라디오 버튼 클릭 이벤트 ------------------->
  $("input[name='hair-style'], input[name='function']").on("change", function () {
    const labelText = $(this).closest("label").text().trim();
    // 선택된 텍스트를 c_a1_select_box에 추가
    const filterBox = $(".c_a1_select");
    const existingFilter = filterBox.find(`.c_a1_select_box:contains('${labelText}')`);

    if (existingFilter.length === 0) {

      // 동일한 필터가 없으면 추가
      if (filterBox.children().length < 8) {
        // 현재 필터 박스가 8개 이하일 때만 추가
        filterBox.append(`<div class="c_a1_select_box"><p>${labelText}</p><button></button></div>`);

        let filterEachCloseBtn = $('.c_a1_select_box>button');
        filterEachCloseBtn.on('click', function () {

          let SelectedBox = $(this).closest('.c_a1_select_box');
          let SelectedBoxValue = SelectedBox.find('p').text(); // 필터 값 가져오기
          SelectedBox.remove(); // 해당 필터 제거

          if (!SelectedBox.is(':visible')) {
            $('.product_box').show();
            $("input[name='hair-style']:checked").prop("checked", false);
            $("input[name='function']:checked").prop("checked", false);
          }

          $('.product_box').each(function () {
            let productData = $(this).data('product'); // 각 product_box의 data-product 값 가져오기
            let filterValues = productFilter[SelectedBoxValue] || []; // productFilter에서 SelectedBoxValue에 해당하는 배열 가져오기

            if (filterValues.includes(String(productData))) { // 배열에 productData가 포함되어 있는지 확인
              $(this).hide(); // 조건에 맞는 product_box 숨기기
            }
          });
        });
      }
    }
  });

  //-----------------------------------초기화 버튼 클릭 이벤트----------------->
  $("#clear-filters").on("click", function (e) {
    e.preventDefault();
    $(".c_a1_select").empty();
    $(".c_a1_select").css("display", "none");
  });


  // -----------------------------  색상 이미지 전환 기능------------------>


  $(document).on("click", ".product_color a", function (e) {
    e.preventDefault();

    const index = $(this).data("index");
    const productBox = $(this).closest("[class='product_box']");

    productBox.find(".product_image li").removeClass("active");
    productBox.find(".product_image li").eq(index).addClass("active");

    console.log("Color clicked: ", index, "Product Box: ", productBox);
  });

  //-------------------------------- 팝업 모달 업데이트 함수--------------->
  function updatePopupModal() {
    const popup = $("#popup");
    const modalContainer = popup.find(".modal-container");
    modalContainer.empty();

    selectedProducts.forEach((product) => {
      const modal = $(
        `<div class="modal" style="flex: ${100 / selectedProducts.length}%">` +
        `<img src="${product.imageSrc}" alt="${product.title}" />` +
        `<p>${product.title}</p>` +
        `<button class="remove-btn" data-id="${product.id}">제거</button>` +
        `</div>`
      );
      modalContainer.append(modal);
    });

    popup.show();
  }


    // 1024 ~ 1440 반응형 사이즈
    //  필터 li 숨기고 보이게하기
    $(window).resize(function() {
      if ($(window).width() <= 1440) {
        $('.c_b1 li').hide();
        $('.c_c1 li').hide();
        $('.s2_c_box1').css('border', 'none')
      }
    }).resize();
    
  // c_b1 > p 클릭 시 li 요소 보이기/숨기기
  $('.c_b1 > p').click(function() {
    var $liElements = $('.c_b1 li');
    if ($liElements.is(':visible')) {
      $liElements.stop().slideUp();
    } else {
      $liElements.stop().slideDown();
    }
  });
  
  // c_b1 > p 클릭 시 li 요소 보이기/숨기기
  $('.c_c1 > p').click(function() {
    var $liElements = $('.c_c1 li');
    if ($liElements.is(':visible')) {
      $liElements.stop().slideUp();
    } else {
      $liElements.stop().slideDown();
    }
  });

  // 모두 지우기 버튼 누르면 필터도 slideUP 
  $('#clear-filters').click(function(){
     $('.c_c1 li').stop().slideUp();
     $('.c_b1 li').stop().slideUp();
  })


  


  
  


});