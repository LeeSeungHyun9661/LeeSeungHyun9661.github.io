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
   $($(".section").get().reverse()).each(function (index, node) {
      var offsetTop = parseInt($(this).attr("data-offset-top"));
      if (scrollTop >= offsetTop) {
         $(".nav-link.active").removeClass("active");
         var currentPageIndex = $(this).index();

         // console.log(currentPageIndex);
         $(".nav-link").eq(currentPageIndex).addClass("active");

         if (currentPageIndex == 0) {
            $(".bg-body-tertiary").attr(
               "style",
               "background-color : rgba(var(--bs-tertiary-bg-rgb),1) !important"
            );
         } else {
            $(".bg-body-tertiary").attr(
               "style",
               "background-color : rgba(var(--bs-tertiary-bg-rgb),1) !important"
            );
         }

         $("html").attr("data-current-page-index", currentPageIndex);
         return false;
      }
   });
}
// 상단 메뉴바 - 버튼 상태 업데이트 / 오프셋 값 변경
function Page__updateOffsetTop() {
   $(".section").each(function (index, node) {
      var $page = $(node);
      var offsetTop = $page.offset().top - 40;
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

// flipster
var coverflow = $("#coverflow").flipster({
   style: "coverflow",
   start: "center",
});

const content = "Hello World";
const title = document.querySelector(".text-title");
// 글자 입력 속도
const speed = 100;
let i = 0;
// 글자 모음
const letters = ["DATA ANALYST", "WEB DEVELOPER"];

const typing = async () => {
   const letter = letters[i].split("");
   while (letter.length) {
      await wait(speed);
      title.innerHTML += letter.shift();
   }
   // 잠시 대기
   await wait(3000);
   // 지우는 효과
   remove();
};

// 글자 지우는 효과
const remove = async () => {
   const letter = letters[i].split("");

   while (letter.length) {
      await wait(speed);
      letter.pop();
      title.innerHTML = letter.join("");
   }

   // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
   i = !letters[i + 1] ? 0 : i + 1;
   typing();
};

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
   return new Promise((res) => setTimeout(res, ms));
}
// 초기 실행
setTimeout(typing, 1500);
