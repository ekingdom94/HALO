 $(function(){
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


 }) 