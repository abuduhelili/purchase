(function () {
  // 取token，转换成对象
  var user = JSON.parse(getCookie('user'));
  // console.log(user);

  // 请求数据
  getData();
  function getData() {
    // http://8.142.1.120/rex/r/291751012283564032/data?q=&limit=10

    $.ajax({
      url: 'http://8.142.1.120/rex/r/291751012283564032/data',
      dataType: 'json',
      data: {
        limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8', // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('---------获取到的数据------------');
        console.log(data);
        console.log('---------渲染开始----------------');
        showData(data); // 渲染数据
        console.log('---------渲染结束----------------');
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }

  // 渲染数据
  function showData(data) {
    var itemStr = '';
    $.each(data, function (i, item) {
      // console.log('1');
      // 获取需要信息
      let ID = item.id;
      let reqCode = item.pr_code;
      let reqDepart = item.__organization_id[0].v;
      let reqDate = item.pr_date;
      let reqBy = item.update_by_name;
      console.log(ID, reqCode, reqDepart, reqDate, reqBy);

      itemStr += `<div class="item" data-id = ${ID}>
          <!-- 顶部id -->
          <div class="header">
            <span class="req-id">${reqCode}</span>
          </div>
          
          <!-- 中间需求信息 -->
          <div class="content">
            <div class="req-item">
              <span class="le">需求部门</span>
              <span class="ri">${reqDepart}</span>
            </div>
            <div class="req-item">
              <span class="le">需求日期</span>
              <span class="ri">${reqDate}</span>
            </div>
            <div class="req-item">
              <span class="le">制单人</span>
              <span class="ri">${reqBy}</span>
            </div>
          </div>
          
          <!-- 底部选项 -->
          <!-- 详情 -->
          <div class="footer" data-id = ${ID} data-code=${reqCode} data-depart=${reqDepart} data-date=${reqDate} data-by=${reqBy}>
            <div class="btn" id="detailBtn" data-id = ${ID} data-code=${reqCode} data-depart=${reqDepart} data-date=${reqDate} data-by=${reqBy} >
              <svg
                t="1696739707292"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9656">
                <path
                  d="M128 215.466667h768c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667H128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667zM128 667.733333h133.546667c23.466667 0 42.666667-19.2 42.666666-42.666666s-19.2-42.666667-42.666666-42.666667H128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666zM128 441.6h190.933333c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666666H128c-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667zM393.813333 808.533333H128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667h265.813333c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667zM797.013333 689.28c30.933333-40.533333 49.706667-90.88 49.706667-145.706667 0-132.693333-107.946667-240.64-240.64-240.64s-240.64 107.946667-240.64 240.64 107.946667 240.64 240.64 240.64c46.933333 0 90.88-13.866667 127.786667-37.12l120.533333 120.533334c8.32 8.32 19.2 12.586667 30.08 12.586666s21.76-4.266667 30.08-12.586666c16.64-16.64 16.64-43.733333 0-60.373334l-117.546667-117.973333z m-190.72 9.386667c-85.546667 0-155.306667-69.546667-155.306666-155.306667a155.306667 155.306667 0 0 1 310.613333 0c0 85.76-69.76 155.306667-155.306667 155.306667z"
                  p-id="9657"
                  fill="#515151"></path>
              </svg>
              <div class="name">详情</div>
            </div>
            
            <!-- 编辑 -->
            <div class="btn" id = "editBtn" data-id = ${ID} data-code=${reqCode} data-depart=${reqDepart} data-date=${reqDate} data-by=${reqBy}>
              <svg
                t="1696739983653"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3304">
                <path
                  d="M153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64zM743.936 151.04l72.192 72.192a51.2 51.2 0 0 1 0 72.192L358.4 751.616a51.2 51.2 0 0 1-36.352 14.848H226.816a25.6 25.6 0 0 1-25.6-25.6v-97.792a51.2 51.2 0 0 1 14.848-36.352l455.68-455.68a51.2 51.2 0 0 1 72.192 0z m-478.72 497.152v54.272h54.272l442.88-442.88L708.096 204.8z"
                  fill="#1296db"
                  p-id="3305"></path>
              </svg>
              <div class="name">编辑</div>
            </div>
            
            <!-- 删除 -->
            <div class="btn" id = "delBtn" data-id = ${ID} data-code=${reqCode} data-depart=${reqDepart} data-date=${reqDate} data-by=${reqBy}>
              <svg
                t="1696740162006"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4418">
                <path
                  d="M847.743 223.953H640.639c-3.132-68.921-60.177-124.029-129.858-124.029s-126.726 55.108-129.858 124.029H173.256c-17.673 0-32 14.327-32 32s14.327 32 32 32h674.487c17.673 0 32-14.327 32-32s-14.327-32-32-32z m-336.962-60.03c34.379 0 62.689 26.426 65.718 60.029H445.064c3.029-33.603 31.338-60.029 65.717-60.029zM767.743 351.79c-17.673 0-32 14.327-32 32v478.173H288.256V383.79c0-17.673-14.327-32-32-32s-32 14.327-32 32v510.173c0 17.673 14.327 32 32 32h511.487c17.673 0 32-14.327 32-32V383.79c0-17.673-14.327-32-32-32z"
                  fill="#e88578"
                  p-id="4419"></path>
                <path
                  d="M449.306 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999zM640.84 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999z"
                  fill="#e88578"
                  p-id="4420"></path>
              </svg>
              <div class="name">删除</div>
            </div>
          </div>
        </div>
        `;
    });
    document.querySelector('.list-box').innerHTML = itemStr; // .listBox中加入itemStr
  }

  // 新增页面
  document.querySelector('#add-btn').addEventListener('click', function (e) {
    // 生成18位整数随机数的ID
    let addCaigouID = Math.floor(Math.random() * (Math.pow(10, 18)))
    sessionStorage.setItem('addCaigouID', addCaigouID);
    window.open('/pages/add.html');
  });


  // 详情-编辑-删除---事件委托
  document.querySelector('.list-box').addEventListener('click', function (e) {
    // 详情-
    if (e.target.id.indexOf('detailBtn') !== -1) {
      // 获取当前元素的父元素data-属性中的值
      const id = e.target.dataset.id;
      const reqCode = e.target.dataset.code;
      const reqDepart = e.target.dataset.depart;
      const reqDate = e.target.dataset.date;
      const reqBy = e.target.dataset.by;
      // console.log(id, reqCode, reqDepart, reqDate, reqBy);

      // url-携带数据
      let url = `/pages/detail.html?id=${id}&reqcode=${reqCode}&reqDepart=${reqDepart}&reqDate=${reqDate}&reqBy=${reqBy}`;
      url = encodeURI(url);
      window.location.href = url;
    }

    // 编辑
    if (e.target.id.indexOf('editBtn') !== -1) {
      console.log('点击了编辑');
    }

    // 删除
    if (e.target.id.indexOf('delBtn') !== -1) {
      console.log('点击了删除');
      const id = e.target.dataset.id;
      console.log(id);
      /*
      请求网址:
      http://8.142.1.120/rex/r/291751012283564032/data/619?rels.pr_id1687331641614
      请求方法:DELETE
      */
      const url = `http://8.142.1.120/rex/r/291751012283564032/data/${id}?rels.pr_id1687331641614`
      console.log(url);

      // DELETE操作
      $.ajax({
        url: url,
        type: 'DELETE',
        headers: {
          'Content-type': 'application/json;charset=UTF-8', // token
          Authorization: 'Bearer ' + user.token,
          'X-Tenant-Id': user.tenant_id,
          'X-Team-Id': user.team_id,
        },
        success: function (res) {
          console.log(res);
          alert('删除成功');
          // 刷新页面
          window.location.reload();
        },
        error: function (err) {
          console.log(err);
          console.log('你点击的需求删除失败,稍后再试');
        }
      });


    }

  });



})();

// export { user };
