const mask = document.querySelector('.mask');
const html = document.querySelector('html');

html.style.overflow = 'hidden'; //로딩 중 스크롤 방지
window.addEventListener('load', function () {
  //아래 setTimeout은 로딩되는 과정을 임의로 생성하기 위해 사용. 실제 적용 시에는 삭제 후 적용해야함.
  setTimeout(function () {
   mask.style.opacity = '0'; //서서히 사라지는 효과
   html.style.overflow = 'auto'; //스크롤 방지 해제
   mask.style.display = 'none';
  }, 500);


})

$(function () {
   $('.card-body').tooltip()
})


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

//Flipster 이벤트
$("#wheel").flipster({
   style: "flat",
   spacing: -0.1,
   start: 0,
   onItemSwitch: function (current) {
      value = current.getElementsByTagName("img")[0].getAttribute("value");
      loadFlipsterItem(value);
   },
   scrollwheel: false,
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
      case "2":
         img = "assets/img/on-work.png";
         projectTitle = "title2";
         contents = ["h1", "How all this Think Work?", "p", "Lets Find out!"];
         break;
   }
   $("#projectInfo").fadeOut(200, function () {
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
}

window.onload = () => {
   const Slider = function (pages, pagination) {
      let slides = [],
         btns = [],
         count = 0,
         current = 0,
         touchstart = 0,
         animation_state = false;

      const init = () => {
         slides = pages.children;
         count = slides.length;
         for (let i = 0; i < count; i++) {
            slides[i].style.bottom = -(i * 100) + "%";
            let btn = document.createElement("li");
            btn.dataset.slide = i;
            btn.addEventListener("click", btnClick);
            btns.push(btn);
            pagination.appendChild(btn);
         }
         btns[0].classList.add("active");
      };

      const gotoNum = (index) => {
         if (index != current && !animation_state) {
            animation_state = true;
            setTimeout(() => (animation_state = false), 500);
            btns[current].classList.remove("active");
            current = index;
            btns[current].classList.add("active");
            for (let i = 0; i < count; i++) {
               slides[i].style.bottom = (current - i) * 100 + "%";
            }
         }
      };

      const gotoNext = () =>
         current < count - 1 ? gotoNum(current + 1) : false;
      const gotoPrev = () => (current > 0 ? gotoNum(current - 1) : false);
      const btnClick = (e) => gotoNum(parseInt(e.target.dataset.slide));
      pages.ontouchstart = (e) => (touchstart = e.touches[0].screenY);
      pages.ontouchend = (e) =>
         touchstart < e.changedTouches[0].screenY ? gotoPrev() : gotoNext();
      pages.onmousewheel = pages.onwheel = (e) =>
         e.deltaY < 0 ? gotoPrev() : gotoNext();

      init();
   };

   let pages = document.querySelector(".pages");
   let pagination = document.querySelector(".pagination");
   let slider = new Slider(pages, pagination);
};
