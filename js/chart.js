(function () {
  console.log('图标页面');

  // 取token
  var user = JSON.parse(getCookie('user'));   //转换成对象

  // 月采购金额
  // 
  getMonthData();  // 获取数据
  function getMonthData() {
    // http://8.142.1.120/rex/r/296553884850438144/stats
    $.ajax({
      url: 'http://8.142.1.120/rex/r/296553884850438144/data',
      dataType: 'json',
      data: {
        // limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8', // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('-----------月采购金额-------------');
        // console.log(data);
        showMonthData(data); // 渲染数据
        console.log('-----------------------------');
        return data;
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }
  function showMonthData(data) {
    console.log(data);
    // 数据转换
    let monthDataX = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ];
    let monthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      monthData[data[i].mounth - 1] = data[i].jine;
    }
    console.log(monthData);


    // 数据渲染
    monthChart(monthDataX, monthData);
    function monthChart(xData, data) {
      // 初始化echarts实例,并运行
      let chartDom = document.querySelector('#month');
      let myChart = echarts.init(chartDom);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
      console.log('t1');

      // 配置项和数据
      var option = {
        // 全局背景颜色
        backgroundColor: '#fff',
        // 标题
        title: {
          text: '月采购金额',
          padding: [10, 30],
          textStyle: {
            fontSize: 20,
            fontWeight: 500,
          },
        },
        // 提示框
        tooltip: {
          show: true,
          triggerOn: 'mousemove',
          trigger: 'axis',
          showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 10,
          borderColor: '#2EB3FF',
          padding: 10,
          confine: true,
          axisPointer: { type: 'none' },
          textStyle: {
            color: 'black', // 文字的颜色
            fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
            fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
            fontSize: '20', // 文字字体大小
            lineHeight: '1.5rem', // 行高
          },

          formatter: function (arr) {
            let dotHtml =
              '<span style="display:inline-block;margin-right:0.5rem;border-radius:100%;width:10px;height:10px;background-color:#2eb3ff"></span>';

            return arr[0].name + '成本求和' + '<br/>' + dotHtml + arr[0].value + '万元';
          },
        },
        // 图例
        legend: {
          data: ['采购金额'],
          x: 'right',

          padding: [20, 70],
          itemWidth: 18,
          itemHeight: 18,
          textStyle: {
            color: '#000',
            fontSize: 16,
          },
        },
        // X轴
        xAxis: {
          data: xData,
          axisTick: {
            show: false, // 刻度不显示
            // alignWithLabel: true,
          },
        },
        // Y轴
        yAxis: {
          // type: 'category',
          // type: 'value',
          // max: 900,
          min: 0,
          // data: yData,

          axisTick: {
            show: true, //是否显示刻度线
            alignWithLabel: true, //刻度线与刻度标签是否对齐
            inside: true,
            lenth: 30,
            lineStyle: {
              color: '#333', //刻度线颜色
              width: 0, //刻度线粗细
            },
          },

          axisLabel: {
            formatter: '{value}万',
          },
        },

        series: [
          {
            name: '采购金额',
            type: 'bar',
            data: data,
            barWidth: 30,
            itemStyle: {
              color: '#2eb3ff',
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  }

  // 年采购金额
  // 
  getYearData();  // 获取数据
  function getYearData() {
    // http://8.142.1.120/rex/r/296571031068721152/stats
    $.ajax({
      url: 'http://8.142.1.120/rex/r/296571031068721152/data',
      dataType: 'json',
      data: {
        // limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8', // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('-----------年采购金额-------------');
        // console.log(data);
        showYearData(data); // 渲染数据
        console.log('-----------------------------');
        return data;
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }
  function showYearData(data) {
    console.log(data);
    // 数据转换
    let yearDataY = new Array;
    let yearData = new Array;
    for (let i = 0; i < data.length; i++) {
      yearDataY.push(data[i].years);
      yearData.push(data[i].money);
    }

    // 渲染
    yearChart(yearDataY, yearData);
    function yearChart(yData, data) {
      // 初始化echarts实例,并运行
      let chartDom = document.querySelector('#year');
      let myChart = echarts.init(chartDom);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
      console.log('t2');

      //
      option = {
        // 全局背景颜色
        backgroundColor: '#fff',
        // 标题
        title: {
          text: '年采购金额',
          padding: [10, 30],
          textStyle: {
            fontSize: 20,
            fontWeight: 500,
          },
        },
        // 提示框
        tooltip: {
          show: true,
          triggerOn: 'mousemove',
          trigger: 'axis',
          showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 10,
          borderColor: '#2EB3FF',
          padding: 10,
          confine: true,
          axisPointer: { type: 'none' },
          textStyle: {
            color: 'black', // 文字的颜色
            fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
            fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
            fontSize: '20', // 文字字体大小
            lineHeight: '1.5rem', // 行高
          },

          formatter: function (arr) {
            let dotHtml =
              '<span style="display:inline-block;margin-right:0.5rem;border-radius:100%;width:10px;height:10px;background-color:#1ed3e8"></span>';

            return arr[0].name + '年' + '采购金额' + '<br/>' + dotHtml + arr[0].value + '万元';
          },
        },
        // 图例
        legend: {
          data: ['采购金额'],
          x: 'right',

          padding: [20, 70],
          itemWidth: 18,
          itemHeight: 18,
          textStyle: {
            color: '#000',
            fontSize: 16,
          },
        },
        xAxis: {
          type: 'value',
          min: 0,
          // max: 900,
          // data: xData,
          boundaryGap: [0, 0.01],

          axisLabel: {
            formatter: '{value} 万',
          },
          axisTick: {
            show: true, //是否显示刻度线
            alignWithLabel: true, //刻度线与刻度标签是否对齐
            inside: true,
            lenth: 30,
            lineStyle: {
              color: '#333', //刻度线颜色
              width: 0, //刻度线粗细
            },
          },
        },
        yAxis: {
          type: 'category',
          data: yData,
          axisTick: {
            show: true, //是否显示刻度线
            alignWithLabel: true, //刻度线与刻度标签是否对齐
            inside: true,
            lenth: 30,
            lineStyle: {
              color: '#333', //刻度线颜色
              width: 0, //刻度线粗细
            },
          },
          axisLabel: {
            formatter: '{value} 年',
          },
        },
        series: [
          {
            name: '采购金额',
            type: 'bar',
            data: data,
            barWidth: 30,
            itemStyle: {
              color: '#1ed3e8',
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  }

  // 物料采购金额占比率
  // 
  getMaterialData();  // 获取数据
  function getMaterialData() {
    // http://8.142.1.120/rex/r/296581246031872000/stats?q=&dimensions=type&measures=money.sum&q2=
    $.ajax({
      url: 'http://8.142.1.120/rex/r/296581246031872000/data',
      dataType: 'json',
      data: {
        // limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8', // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('-----------物料采购金额占比率-------------');
        // console.log(data);
        showMaterialData(data); // 渲染数据
        console.log('-----------------------------');
        return data;
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }
  function showMaterialData(data) {
    console.log(data);
    // 数据转换
    let materialData = new Array;
    for (let i = 0; i < data.length; i++) {
      materialData[i] = new Object;
      materialData[i].value = data[i].money;
      materialData[i].name = data[i].type;
    };
    console.log(materialData);
    // 渲染
    materialChart(materialData); // 物料
    function materialChart(data) {
      // 初始化echarts实例,并运行
      let chartDom = document.querySelector('#material');
      let myChart = echarts.init(chartDom);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
      console.log('t3');

      // 配置
      option = {
        // 全局背景颜色
        backgroundColor: '#fff',
        // 标题
        title: {
          text: '物料采购金额占比率',
          padding: [10, 30],
          textStyle: {
            fontSize: 20,
            fontWeight: 500,
          },
        },
        tooltip: {
          trigger: 'item',
        },

        legend: {
          orient: 'horization',
          top: 'center',
          left: 40,
          itemGap: 30,
        },

        series: [
          {
            name: '物料采购金额占比率',
            type: 'pie',
            radius: '50%',
            data: data,
            center: ['55%', '50%'],

            label: {
              show: true,
              position: 'outer',
              margin: 5,

              textStyle: {
                fontSize: '16',
                fontWeight: '400',
              },
              formatter: function (arg) {
                // console.log(arg);
                return arg.name + '\n' + arg.percent + '%';
              },
            },

            labelLine: {
              normal: {
                length: 30, // 指示线宽度
                length2: 40, // 延长线长度
                lineStyle: {
                  color: '#595959', // 指示线颜色
                },
              },
            },

            emphasis: {
              show: true,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  }


  // 供应商采购金额站比率
  // 
  getSupplierData();  // 获取数据
  function getSupplierData() {
    // http://8.142.1.120/rex/r/296622594738995200/stats?q=&dimensions=type&measures=money.sum&q2=
    $.ajax({
      url: 'http://8.142.1.120/rex/r/296622594738995200/data',
      dataType: 'json',
      data: {
        // limit: 10,
      },
      headers: {
        'Content-type': 'application/json;charset=UTF-8', // token
        Authorization: 'Bearer ' + user.token,
        'X-Tenant-Id': user.tenant_id,
        'X-Team-Id': user.team_id,
      },
      success: function (data) {
        console.log('-----------供应商采购金额站比率-------------');
        // console.log(data);
        showSupplierData(data); // 渲染数据
        console.log('-----------------------------');
        return data;
      },
      error: function (err) {
        console.log('数据未获取');
        console.log(err);
      },
    });
  }
  function showSupplierData(data) {
    console.log(data);
    // 数据转换
    let supplierData = [1];
    for (let i = 0; i < data.length; i++) {
      supplierData[i] = new Object;
      supplierData[i].value = data[i].money;
      supplierData[i].name = data[i].type;
    };
    console.log(supplierData);

    // 渲染
    supplierChart(supplierData);
    function supplierChart(data) {
      // 初始化echarts实例,并运行
      let chartDom = document.querySelector('#supplier');
      let myChart = echarts.init(chartDom);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
      console.log('t4');

      // 配置
      option = {
        // 全局背景颜色
        backgroundColor: '#fff',
        // 标题
        title: {
          text: '供应商采购金额站比率',
          padding: [10, 30],
          textStyle: {
            fontSize: 20,
            fontWeight: 500,
          },
        },
        tooltip: {
          trigger: 'item',
        },

        // legend: {
        //   orient: 'vertical',
        //   left: 'center',
        //   top: '30%',
        //   left: 40,
        // },

        series: [
          {
            name: '',
            type: 'pie',
            radius: ['35%', '60%'],
            data: data,

            label: {
              show: true,
              formatter: function (arg) {
                // console.log(arg);
                return arg.name + arg.percent + '%';
              },
            },

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  }















})();
