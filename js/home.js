(function () {
  var icons = [
    {
      id: 1,
      text: '物料管理',
      src: '/images/home/icon/wuliao_btn.png',
      href: '/pages/wuliaoguanli.html',
    },
    {
      id: 2,
      text: '供应商管理',
      src: '/images/home/icon/gongyingshang_btn.png',
      href: '/pages/gongyinshang.html',
    },
    {
      id: 3,
      text: '仓库管理',
      src: '/images/home/icon/cangku_btn.png',
      href: '/pages/cangku.html',
    },
    {
      id: 4,
      text: '采购需求',
      src: '/images/home/icon/xuqiu_btn.png',
      href: '/pages/xuqiu.html',
    },
    {
      id: 5,
      text: '采购计划',
      src: '/images/home/icon/jihua_btn.png',
      href: '/pages/jihua.html',
    },
    {
      id: 6,
      text: '采购订单',
      src: '/images/home/icon/dingdan_btn.png',
      href: '/pages/dingdan.html',
    },
    {
      id: 7,
      text: '采购收货',
      src: '/images/home/icon/shouhuo_btn.png',
      href: '/pages/shouhuo.html',
    },
    {
      id: 8,
      text: '采购入库',
      src: '/images/home/icon/ruku_btn.png',
      href: '/pages/ruku.html',
    },
    {
      id: 9,
      text: '图表分析',
      src: '/images/home/icon/shuju_btn.png',
      href: '/pages/chart.html',
    },
  ];

  // 渲染数据

  // banner img
  $('.banner img:eq(0)').attr('src', '/images/home/banner/banner1.png');
  $('.banner img').css({
    width: '100%',
    height: '100%',
    // 图片居中
    objectFit: 'cover',
  });
  $('.banner img:eq(1)').attr('src', '/images/home/banner/banner2.png');
  $('.banner img').css({
    width: '100%',
    height: '100%',

    // 图片居中
    objectFit: 'cover',
  });
  $('.banner img:eq(2)').attr('src', '/images/home/banner/banner3.png');
  $('.banner img').css({
    width: '100%',
    height: '100%',
    // 图片居中
    objectFit: 'cover',
  });

  $.each(icons, function (index, item) {
    var $item = $("<div class = 'item' ></div>").appendTo($('.box'));
    var $a = $('<a></a>').appendTo($item).attr('href', item.href);
    var $img = $('<img>').appendTo($a).attr('src', item.src);
    var $text = $('<p></p>').appendTo($item).text(item.text);
  });

  // swiper
  var mySwiper = new Swiper('.swiper', {
    autoplay: true, //可选选项，自动滑动
    direction: 'horizontal',
    loop: true, // 循环模式选项
    // 分页器
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      loop: true,
      autoplay: true,
    },
    // 滚动条
  });
})();
