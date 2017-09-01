


export default function tl_Subscribe_Handle(t_topic, cb) {

  const morkData = {
    "DeviceUUID": "Twr-12452",
    "MachineUUID": "T42112452",
    "Status": {
      "running": '1',
      "nProductCount": 98,
      "exhaustPort": 180.20,
      "outPort": 220.20,
      "lowCoolantlevel": "low",
      "overheat": "high",
      "highPressure": "high"
    }
  }
  console.log('11===',11)
  const mqtt = require('mqtt')
  // {const client = mqtt.connect('mqtt://47.89.41.117:9011')}
  const client = mqtt.connect('mqtt://47.91.154.238:9011')

  client.on('connect', function() {
    client.subscribe(t_topic)
    console.log('JSON.stringify(morkData)====', JSON.stringify(morkData))
    client.publish(t_topic, JSON.stringify(morkData))
  })

  client.on("message", function(topic, payload) {
    console.log('payload=====', payload)
    cb(JSON.parse(payload))
    // {client.end()}
  })
}










seft.state.cru_fields.forEach(function(item){
        for(var _key in mqdat){
          if (mqdat.hasOwnProperty(_key)) { //filter
            if (item.key == _key) {

              if (
                (typeof item.render != 'undefined')
                 && (typeof item.render != null)
                 && (typeof item.render == 'function')
                )
              {
                $('#'+item.id).attr(item.attr, item.render(mqdat[_key]))
              }
              else
              {
                $('#'+item.id).html(mqdat[_key])
              }
            }
          }
        }
      })
    // })







    const config = [

  //第一台机器配置, 测试数据默认为模温机
  {
    info: {
      model: 'TTW1210 低温水式模温机', // 型号
      mid: 'm_v9573514624', // 机器编号
      did: 't_v9573514624', // 终端采集设备编号
      brand: 'TOPSTAR', // 品牌
      tags: [
        'tag1', 'tag2'
      ], // 标签
      station_id: '80', // 机台号
      image: './assets/3.jpg', // 照片
    },
    datasource: {
      mqtt: {
        server: 'mqtt://iec.topstarltd.com', // 服务器
        port: 9011, // 端口
        topic: 'topstarltd/iec/app/10003', // 订阅 appid:10001 位置的数据源
      }
    },
    svg: ["./assets/mtptcll.svg"], // SVG文件路径
    fields: [
      {
        id: "svg_txt_model",
        attr: "html",
        key: "model"
      }, {
        id: "svg_txt_deviceid",
        attr: "html",
        key: "machine_id"
      }, {
        id: "svg_txtTempIn",
        attr: "html",
        key: "temp_in"
      },{
        id: "svg_txtTempOut",
        attr: "html",
        key: "temp_out"
      },, {
        id: "svg_txtTempIn2",
        attr: "html",
        key: "temp_in"
      },{
        id: "svg_txtTempOut2",
        attr: "html",
        key: "temp_out"
      },{
        id: "svg_txtTempSet",
        attr: "html",
        key: "temp_set"
      },{
        id: "svg_rectWaterLevelLow",
        attr: "fill",
        key: "run_status",
        render : function(val){
          if(0 == val)
          {
            return "blue";
          } else {
            return "red";
          }
        }
      },{
        id: "svg_rectInWaterPressureLow",
        attr: "fill",
        key: "total_time_power_on"
      }, {
        id: "svg_rectSystemPressureHigh",
        attr: "fill",
        key: "cycle_count"
      }
    ]
  }, //第二台机器配置
  {
    info: {
      model: '六自由度工业机器人', // 型号
      mid: 'm_v9582414624', // 机器编号
      did: 't_v9582414624', // 终端采集设备编号
      brand: 'TOPSTAR', // 品牌
      tags: [
        'tag1', 'tag2'
      ], // 标签
      station_id: '80', // 机台号
      image: './assets/2.jpg', // 照片
    },
    datasource: {
      mqtt: {
        server: 'mqtt://iec.topstarltd.com', // 服务器
        port: 9011, // 端口
        topic: 'topstarltd/iec/app/10002', // 订阅 appid:10001 位置的数据源
      }
    },
    svg: ["./assets/TSR-050-A.svg"], // SVG文件路径
    fields: [
      {
        id: "svg_txtMachineModel",
        attr: "html",
        key: "model"
      },
      {
        id: "svg_txtMachineID",
        attr: "html",
        key: "machine_id"
      },{
        id: "svg_txtCyclePeriod",
        attr: "html",
        key: "cycle_period"
      },
      {
        id: "svg_txtRunSpeed",
        attr: "html",
        key: "run_speed"
      },
      {
        id: "svg_txtErrorCount",
        attr: "html",
        key: "fault_count"
      },
      {
        id: "svg_txtCycleCount",
        attr: "html",
        key: "cycle_count"
      },
      {
        id: "svg_txtPowerOnTime",
        attr: "html",
        key: "total_time_power_on"
      },
      {
        id: "svg_txtRunTime",
        attr: "html",
        key: "total_time_run"
      }
    ]
  }
]
