const mask = document.querySelector('.mask');
const html = document.querySelector('html');

html.style.overflow = 'hidden'; //로딩 중 스크롤 방지
window.addEventListener('load', function () {
  //아래 setTimeout은 로딩되는 과정을 임의로 생성하기 위해 사용. 실제 적용 시에는 삭제 후 적용해야함.
  setTimeout(function () {
   if(mask){        
      mask.style.opacity = '0'; //서서히 사라지는 효과
      mask.style.display = 'none';
   }
   html.style.overflow = 'auto'; //스크롤 방지 해제
  }, 2000);
})

$(document).ready(function () {
   //사이드바 호출
   $("#sidebar").load("/templates/blogs/layout/sidebar.html");

   // 언어 설정 확인
   if (localStorage.getItem("lang") == null) {
      $.getJSON("http://ipinfo.io", function (data) {
         country = data.country;
         var lang;
         if (country != "KR") lang = "KR";
         else lang = "EN";
         localStorage.setItem("lang", lang);
      });
   } else {
      $("#lang").val(localStorage.getItem("lang"));
   }
});

function loadContents(html) {
   link = "/templates/blogs/java/" + localStorage.getItem("lang") + "/" + html
   $(".contents").load(link);
   $(".contents").fadeIn(200);
}

function move(html){
   $(".contents").fadeOut(200, function () {
      location.href=html
   });
}

function languageChange() {
   localStorage.setItem("lang", $("#lang").val());
   location.reload(true);   
}
