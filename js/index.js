/*===========加载页=============*/
let loadingRender = (function ($) {

  let $loading = $(".loading"),
    $inner = $loading.find(".inner");

  let bellAudio=$("#bellAudio")[0];

  let imgList = ["img/pointer.png","img/turntable.png","img/turntable-bg.jpg","img/turnTB.png","img/sky.gif","img/timg2.jpg","img/temg4.png","img/walk.gif","img/pingpang.jpg","img/bg1.jpg","img/bg5.jpg"];

  let total = imgList.length,
    cur = 0;

  let computed=function () {
    imgList.forEach(function (item) {
      let tempImg=new Image;
      tempImg.src=item;
      tempImg.onload=function () {
        tempImg=null;
        cur++;
        loadFn();
      }
    })
  };

  let loadFn=function () {
    $inner.css("width",cur/total*100+"%");
    if(cur>=total){
      let timer=setTimeout(()=>{
        $loading.remove();
        panelRender.init();
        clearTimeout(timer);
      },4800);
    }
  };

  return {
    init: function () {
      bellAudio.play();
      $loading.css("display", "block");
      computed();

    }
  }

})(Zepto);

/*===========轮盘页===============*/
let panelRender = (function ($) {

  let $panelPage = $(".panelPage");
  let mySwiper = null;

  let music=$("#music")[0];

  let oPointer = document.getElementsByTagName("img")[0];
  let oTurntable = document.getElementsByTagName("img")[1];
  let cat = 72;
  let num = 0;
  let offOn = true;
  document.title = "";

  oPointer.onclick = function () {
    if (offOn) {
      oTurntable.style.transform = "rotate(0deg)";
      offOn = !offOn;
      ratating();
    }
  };

  function ratating() {
    let timer = null;
    let rdm = 0;
    clearInterval(timer);
    timer = setInterval(function () {
      if (Math.floor(rdm / 360) < 3) {
        rdm = Math.floor(Math.random() * 3600);
      } else {
        oTurntable.style.transform = "rotate(" + rdm + "deg)";
        clearInterval(timer);
        setTimeout(function () {
          offOn = !offOn;
          num = rdm % 360;
          if (num <= cat * 1) {
            $panelPage.css("display","none");
            music.pause();
            detailRender.init(1);
          } else if (num <= cat * 2) {
            $panelPage.css("display","none");
            music.pause();
            detailRender.init(5);
          } else if (num <= cat * 3) {
            $panelPage.css("display","none");
            music.pause();
            detailRender.init(4);
          } else if (num <= cat * 4) {
            $panelPage.css("display","none");
            music.pause();
            detailRender.init(3);
          } else if (num <= cat * 5) {
            $panelPage.css("display","none");
            music.pause();
            detailRender.init(2);
          }
        }, 4000);
      }
    }, 30);
  }

  return {
    init: function () {
      $panelPage.css("display", "block");


      mySwiper = new Swiper('.panelPage .swiper-container', {
        loop: true,
        effect: 'flip',
        autoplay: 2000,
        pagination: '.swiper-container .swiper-pagination',
      });
      music.play();
    }
  }
})(Zepto);

/*===========详情页=============*/
let detailRender = (function ($) {

  let $detailPage = $(".detailPage");
  let $makisuBox = $('#makisuBox');
  let swiperExample = null;
  let musicAudio=$("#musicAudio")[0];

  let change = function (example) {
    let {slides: slideAry, activeIndex} = example;

    if (activeIndex === 1) {
      $makisuBox.makisu({
        selector: 'dd',
        overlap: 0.6,
        speed: 0.8
      });
      $makisuBox.makisu('open');
    } else {
      $makisuBox.makisu({
        selector: 'dd',
        overlap: 0,
        speed: 0
      });
      $makisuBox.makisu('close');
    }

    [].forEach.call(slideAry, (item, index) => {
      if (index === activeIndex) {
        item.id = 'page' + (activeIndex);
        return;
      }
      item.id = null;
    });
  };

  return {
    init: function (index=0) {
      $detailPage.css("display", "block");
      musicAudio.play();

      swiperExample = new Swiper(".detailPage .swiper-container", {
        effect: "coverflow",
        loop: true,
        autoplay: true,
        flipEffect: {
          slideShadows: true,
          limitRotation: true,
        },
        onInit: change,
        onTransitionEnd: change
      });

      index = index > 5 ? 5 : index;
      swiperExample.slideTo(index, 0);
    }
  }

})(Zepto);
loadingRender.init();
