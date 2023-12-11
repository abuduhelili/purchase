(function () {
  // 取token，转换成对象
  var user = JSON.parse(getCookie('user'));

  // 取url数据
  var url = decodeURI(window.location.href);
  console.log(url);
  // http://127.0.0.1:5500/pages/detail.html?id=212754714307252932&reqcode=G0005&reqDepart=天津农学院&reqDate=2023-10-13&reqBy=nongxueyuan
  // id=212754714307252932&reqcode=G0005&reqDepart=天津农学院&reqDate=2023-10-13&reqBy=nongxueyuan
  let myData = url.split('?');
  var id = myData[1].split('&')[0].split('=')[1];
  var reqCode = myData[1].split('&')[1].split('=')[1];
  var reqDepart = myData[1].split('&')[2].split('=')[1];
  var reqDate = myData[1].split('&')[3].split('=')[1];
  var reqBy = myData[1].split('&')[4].split('=')[1];
  console.log(id, reqCode, reqDepart, reqDate, reqBy);

  console.log(`id:..............${id}`);

  // 顶部需求
  showDataForTop();
  function showDataForTop() {
    // 添加数据
    let topContentDom = document.querySelector('.topContent');
    topContentDom.querySelector('#reqDate').querySelector('.ri').innerHTML = reqDate;
    topContentDom.querySelector('#reqDepart').querySelector('.ri').innerHTML = reqDepart;
    topContentDom.querySelector('#reqCode').querySelector('.ri').innerHTML = reqCode;
    // 测试
    // console.log(reqDate, reqDepart, reqCode);
  }

  // 物料详情
  getData(id);
  // http://8.142.1.120/rex/r/291753489628250112/data?q=(pr_id==212754714307252932)&limit=10
  // 数据请求--物料
  function getData(id) {
    $.ajax({
      url: 'http://8.142.1.120/rex/r/291753489628250112/data',
      dataType: 'json',
      data: {
        limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('-----------------物料数据');
        console.log(data); // test
        showData(data, id); // 渲染数据
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  // 数据渲染--详情
  function showData(data, id) {
    // 根据id，数据过滤
    let dataList = data.filter(item => {
      return item.pr_id === id;
    });
    console.log(dataList);

    let htmlStr = '';
    // 数组循环
    if (dataList.length > 0) {
      for (let i = 0; i < dataList.length; i++) {
        // 需要的数据
        let n = (i + 1).toString().padStart(2, '0');
        let mi_name = dataList[i].mi_name;
        let mi_spec = dataList[i].mi_spec;
        let mi_num = dataList[i].mi_num;
        let mrd_requirement = dataList[i].mrd_requirement;
        console.log(mrd_requirement);

        htmlStr += `<div class="item">
      <!-- 角标 -->
      <div class="header">
        <span>${n}</span>
      </div>
      <!-- 中间内容 -->
      <div class="content">
        <div class="contentLine">
          <span class="le" id="materialName">物料名称</span>
          <span class="ri">${mi_name}</span>
        </div>
        <div class="contentLine">
          <span class="le">规格型号</span>
          <span class="ri" id="materialType">${mi_spec}</span>
        </div>
        <div class="contentLine">
          <span class="le">数量</span>
          <span class="ri" id="materialNum">${mi_num}</span>
        </div>
      </div>
      <!-- 底部要求 -->
      <div class="footer">
        <div class="le">要求</div>
        <div class="ri">${mrd_requirement}</div>
      </div>
    </div>`;
        // listBox添加数据
        document.querySelector('.listBox').innerHTML = htmlStr;
      }
    } else {
      // 没有数据
      document.querySelector(
        '.listBox'
      ).innerHTML = `<div class="noData" style="text-align: center; padding-top: 20%">暂无数据</div>`;
    }
  }
})();
