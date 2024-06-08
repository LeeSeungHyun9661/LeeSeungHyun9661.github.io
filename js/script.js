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
   style: "flat",
   spacing: -0.25,
   start: 0,
   onItemSwitch: function (current) {
      value = current.getElementsByTagName("img")[0].getAttribute("value");
      loadFlipsterItem(value);
   },
});
loadFlipsterItem("0");

function loadFlipsterItem(value) {
   var img = "";
   var projectTitle = "";
   var contents = [];
   switch (value) {
      case "0":
         img = "assets/img/on-work.png";
         projectTitle = "About Java";
         contents = [
            "h1 style='font-size: 30px;'",
            "Basic knowledge of the Java programming language",
            "p style='font-size: 20px;'",
            "On this website, you can learn what is java and how to use java language proper",
         ];
         break;
      case "1":
         img = "assets/img/on-work.png";
         projectTitle = "title2";
         contents = ["h1", "How all this Think Work?", "p", "Lets Find out!"];
         break;
   }
   $("#projectInfo").fadeOut(200, function () {
      console.log("비우기");
      $("#projectImage").attr("src", img);
      $("#projectTitle").text(projectTitle);
      $("#projectContetns").empty();
      for (var i = 0; i < contents.length; i += 2) {
         $("#projectContetns").append(
            "<" + contents[i] + ">" + contents[i + 1] + "</" + contents[i] + ">"
         );
      }
      $("#projectInfo").fadeIn(200);
   });
   console.log(value);
}
