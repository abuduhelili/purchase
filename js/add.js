(function () {
  console.log('新增页面加载成功');

  // 取token，转换成对象
  var user = JSON.parse(getCookie('user'));
  console.log(user);


  // 取ID
  var addCaigouID = sessionStorage.getItem('addCaigouID');
  console.log(addCaigouID);



  // 请求数据--部门
  getDataDepartment();
  function getDataDepartment() {
    // http://8.142.1.120/khaan/teams/290058605825474560/children?recursive=true&s=
    $.ajax({
      url: 'http://8.142.1.120/khaan/teams/290058605825474560/children',
      dataType: 'json',
      data: {
        recursive: true,
        s: '',
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
        showOption(data); // 渲染数据
        console.log('---------渲染结束----------------');
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }

  // 请求数据--制单人
  getDataMember();
  function getDataMember() {

    // http://8.142.1.120/khaan/teams/290425654946938880/members?s=

    $.ajax({
      url: 'http://8.142.1.120/khaan/teams/290425654946938880/members',
      dataType: 'json',
      data: {
        s: '',
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
        showMember(data); // 渲染数据
        console.log('---------渲染结束----------------');
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }


  // 渲染部门列表
  function showOption(data) {
    // 渲染数据
    let str = `<option value="">请选择部门</option>`;
    let select = document.querySelector('#departSelects')
    data.forEach((item, index) => {
      str += `
      <option value="${item.id}">${item.name}</option>
      `
    })
    // console.log(str);
    select.innerHTML = str;
  }

  // 渲染制单人
  function showMember(data) {
    // 渲染数据
    let str = `<option value="">请选择制单人</option>`;
    let select = document.querySelector('#bySelects')
    data.forEach((item, index) => {
      str += `
      <option value="${item.userId}">${item.user.profile.fullname}</option>
      `
    })
    // console.log(str);
    select.innerHTML = str;


  }


  // 新增
  var listBoxStr = '';
  let count = '0';
  document.querySelector('.titleText button').addEventListener('click', () => {
    console.log('新增');
    count++;
    let str = `
    <div class="item">
      <div class="header">
        <span>${count.toString().padStart(2, '0')}</span>
        <button id="cancel-btn">
          <svg
            t="1697523517394"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4173"
            width="16"
            height="16">
            <path
              d="M512 45.373397c-257.710456 0-466.626603 208.916147-466.626603 466.626603s208.915124 466.626603 466.626603 466.626603 466.626603-208.915124 466.626603-466.626603S769.710456 45.373397 512 45.373397zM754.945171 664.329361c22.561855 22.561855 22.561855 59.482743 0 82.044598l-20.511149 20.511149c-22.561855 22.561855-59.482743 22.561855-82.044598 0L506.030032 620.524692 359.670639 766.884085c-22.561855 22.561855-59.482743 22.561855-82.044598 0l-20.511149-20.511149c-22.561855-22.561855-22.561855-59.482743 0-82.044598l146.359392-146.359392L245.175979 359.670639c-22.561855-22.561855-22.561855-59.482743 0-82.044598l20.511149-20.511149c22.561855-22.561855 59.482743-22.561855 82.044598 0L506.030032 415.414221l158.298306-158.298306c22.561855-22.561855 59.482743-22.561855 82.044598 0l20.511149 20.511149c22.561855 22.561855 22.561855 59.482743 0 82.044598L608.585779 517.968945 754.945171 664.329361z"
              fill="#bfbfbf"
              p-id="4174"></path>
          </svg>
        </button>
      </div>
    
      <div class="content">
        <div class="line" id="materialName">
          <label class="le">物料名称</label>
          <input class="ri" placeholder="请输入" />
        </div>
        <div class="line" id="materialSpec">
          <label class="le">规格型号</label>
          <input class="ri" type="text" placeholder="请输入" />
        </div>
        <div class="line" id="materialNum">
          <label class="le">数量</label>
          <span class="ri">
            <button class="sub" 
            onclick="subNumber" 
            style="border: transparent">
              <svg
                t="1697529305194"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11357"
                width="18"
                height="18">
                <path
                  d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z"
                  p-id="11358"
                  fill="#1296db"></path>
              </svg>
            </button>
            <input
              type="number"
              name="number"
              id=""
              oninput="if(value<0)value=0"
              placeholder="请输入" />
            <button
              class="add"
              onclick="addNumber"
              style="
                border: transparent;
                position: absolute;
                top: 50%;
                right: -0.2rem;
                transform: translateY(-50%);
              ">
              <svg
                t="1697529246807"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9834"
                width="18"
                height="18">
                <path
                  d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                  p-id="9835"
                  fill="#1296db"></path>
              </svg>
            </button>
          </span>
        </div>
    
        <div class="line" id="require">
          <div class="le">要求</div>
          <input class="ri" type="text" placeholder="请输入" />
        </div>
    
        <div class="line" id="text">
          <div class="le">备注</div>
          <input class="ri" type="text" placeholder="请输入" />
        </div>
      </div>
    </div>`;
    listBoxStr += str;
    document.querySelector('.listBox').innerHTML = listBoxStr;

  });


  // 数量加减
  function addNumber() {
    console.log('add');
    document.querySelector('#materialNum input').value =
      Math.floor(document.querySelector('#materialNum input').value) + 1;
    console.log(document.querySelector('#materialNum input').value);
  }
  function subNumber() {
    console.log('sub');
    if (Math.floor(document.querySelector('#materialNum input').value) > 0) {
      document.querySelector('#materialNum input').value =
        Math.floor(document.querySelector('#materialNum input').value) - 1;
    }
    console.log(document.querySelector('#materialNum input').value);
  };


  // 页面取消
  let cancelBtn = document.querySelector('#cancel-btn');
  cancelBtn.addEventListener('click', () => {
    console.log('取消');
  });

  // 页面保存--提交主单
  let saveBtn = document.querySelector('#save-btn');
  saveBtn.addEventListener('click', () => {
    // 判断#reqDate input;#reqCode input;#departSelects;这三个表单值不为空
    if (document.querySelector('#reqDate input').value &&
      document.querySelector('#reqCode input').value &&
      document.querySelector('#departSelects').value &&
      document.querySelector('#bySelects').value
    ) {

      // 获取数据
      console.log('保存');
      let id = addCaigouID;
      let organization_id = document.querySelector('#departSelects').value;
      let pr_code = document.querySelector('#reqCode input').value;
      let pr_date = document.querySelector('#reqDate input').value;
      let userId = document.querySelector('#bySelects').value
      console.log(id, organization_id, pr_code, pr_date, userId);

      // 提交数据
      $.ajax({
        /*
      请求网址:
      http://8.142.1.120/rex/r/291751012283564032/data
      请求方法:
      POST
      */
        url: 'http://8.142.1.120/rex/r/291751012283564032/data',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          id: id,
          organization_id: organization_id,
          pr_code: pr_code,
          pr_date: pr_date,
          user: userId,
        }),
        headers: {
          'Content-type': 'application/json;charset=UTF-8', // token
          Authorization: 'Bearer ' + user.token,
          'X-Tenant-Id': user.tenant_id,
          'X-Team-Id': user.team_id,
        },
        success: function (res) {
          console.log(res);
          alert('保存成功');
          // 刷新上一个页面，重新获取数据
          window.opener.location.reload();
          // 关闭当前页面
          window.close();
        },
        error: function (err) {
          alert('保存失败' + err);
        },
      })



    } else {
      alert('请填写完整,不能为空');
    };
  });


})();
