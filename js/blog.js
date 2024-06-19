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

// 내용 부르는  함수
function loadContents(html) {
   link = "/templates/blogs/java/" + localStorage.getItem("lang") + "/" + html;   
   $(".contents").load(link);
   $(".contents").fadeIn(200);
}

// 페이지 이동 함수
function move(html){
   $(".contents").fadeOut(200, function () {
      location.href=html
   });
}

function languageChange() {
   localStorage.setItem("lang", $("#lang").val());
   location.reload(true);   
}
