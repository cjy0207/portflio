//scroll magic 사용법
// init controller

console.log('app.js loaded');
const controller = new ScrollMagic.Controller();

const spyEls = document.querySelectorAll("section.scroll-spy");

//콜백함수
spyEls.forEach(function (spyEl) {
  // create a scene
  new ScrollMagic.Scene({
    triggerElement : spyEl, //감시할 장면 추가 및 옵션지정
    triggerHook : 0.5 //화면의 50% 지점에서 보여짐 여부 감시(0-1사이 지정)
  })
    .setClassToggle(spyEl, 'show') //요소가 화면에 감지되면 show클래스 추가
    .addTo(controller); //컨트롤러에 장면을 할당(필수)
});


//현재 연도 표시
//날짜 정보를 가진 js의 date객체를 활용

const currentDate = new Date().getFullYear()
document.querySelector('.this-year').innerHTML = currentDate

