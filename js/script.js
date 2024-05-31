// 상단 메뉴바 - 버튼 클릭으로 해당 세션 이동
$(".nav-link").click(function (e) {
   var href = $(this).attr("href");
   var targetTop = $(href).offset().top;
   $("html").stop().animate({ scrollTop: targetTop }, 100);
   e.preventDefault();
});

// 상단 메뉴바 - 버튼 상태 업데이트 / 오프셋 값에 따라
function Page__updateIndicatorActive() {
   var scrollTop = $(window).scrollTop();
   $($(".page").get().reverse()).each(function (index, node) {
      var offsetTop = parseInt($(this).attr("data-offset-top"));
      if (scrollTop >= offsetTop) {
         var target = $(".nav-link.text-secondary");
         target.removeClass("text-secondary");
         target.addClass("text-white");
         var currentPageIndex = $(this).index();
         target = $(".nav-link").eq(currentPageIndex);
         target.removeClass("text-white");
         target.addClass("text-secondary");
         $("html").attr("data-current-page-index", currentPageIndex);
         return false;
      }
   });
}
// 상단 메뉴바 - 버튼 상태 업데이트 / 오프셋 값 변경
function Page__updateOffsetTop() {
   $(".page").each(function (index, node) {
      var $page = $(node);
      var offsetTop = $page.offset().top;
      $page.attr("data-offset-top", offsetTop);
   });
   // 계산이 바뀌었으니까, 다시 상태 업데이트
   Page__updateIndicatorActive();
}
function Page__init() {
   Page__updateOffsetTop();
}
// 상단 메뉴바 - 페이지 초기화로 상단 메뉴바 버튼 업데이트
Page__init();
// 상단 메뉴바 - 화면이 리사이즈 할 때 마다, offsetTop을 다시계산
$(window).resize(Page__updateOffsetTop);
// 상단 메뉴바 - 스크롤이 될 때 마다, 인디케이터의 상태를 갱신
$(window).scroll(Page__updateIndicatorActive);
// 참고 출처 : https://codepen.io/kimyangsun/pen/vYEqWee

$("#wheel").flipster({
   style: 'flat',
   spacing: -0.25,
   start: 'center',
   onItemSwitch: function (current) {
      //current는 현재 아이템에 해당한다.
      value = current.getElementsByTagName("img")[0].getAttribute("value");
      // 현재 아이템의 img가 가지고 있는 value값을 가져온다.

      // 가져온 값을 통해 변경을 지정하는 함수로 전달한다.
   },
});
