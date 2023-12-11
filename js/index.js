(function () {
  $.ajax({
    url: 'http://8.142.1.120/khaan/oauth/token',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      username: 'nongxueyuan',
      password: md5('000000'),
      grant_type: 'password',
      scope: 'server',
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      //在这里向请求头中加入token携带发送
      Authorization: 'Basic dGVzdDp0ZXN0',
    },
    // 成功
    success: function (data) {
      console.log(data);
      console.log(data.access_token); //token
      // console.log(data.tenants[0].id);//租户id
      // console.log(data.tenants[0].rootTeamId);//组织id
      //存用户信息， token, 租户id， 组织id
      var user = {
        token: data.access_token,
        tenant_id: data.tenants[0].id,
        team_id: data.tenants[0].rootTeamId,
      };
      user = JSON.stringify(user);
      setCookie('user', user);

      // 默认是加载home.html页面
      $('#main').load('/pages/caigou.html');
      $('#footer .item').eq(0).css('color', '#087ffc').siblings().css('color', '#6c6c6e');
    },
    // 失败
    error: function (err) {
      console.log('error...');
    },
  });
})();

// 底部导航条的点击事件
$('#footer .item').click(function () {
  var index = $(this).index();
  // 文字变色
  $(this).css('color', '#087ffc').siblings().css('color', '#6c6c6e');

  // 根据点击部分加载页面，更改对应的icon图标
  switch (index) {
    case 0:
      $('#main').load('/pages/home.html');
      document.title = '采购管理系统';
      $(this).find('img').attr('src', '/images/bottom/page_lan.png');
      $('#footer .item img:eq(1)').attr('src', '/images/bottom/caigou_hui.png');
      $('#footer .item img:eq(2)').attr('src', '/images/bottom/fenxi_hui.png');
      break;

    case 1:
      $('#main').load('/pages/caigou.html');
      document.title = '采购需求';
      $(this).find('img').attr('src', '/images/bottom/caigou_lan.png');
      $('#footer .item img:eq(0)').attr('src', '/images/bottom/page_hui.png');
      $('#footer .item img:eq(2)').attr('src', '/images/bottom/fenxi_hui.png');
      break;

    case 2:
      $('#main').load('/pages/chart.html');
      document.title = '数据分析';
      $(this).find('img').attr('src', '/images/bottom/fenxi_lan.png');
      $('#footer .item img:eq(0)').attr('src', '/images/bottom/page_hui.png');
      $('#footer .item img:eq(1)').attr('src', '/images/bottom/caigou_hui.png');
      break;
  }
});
