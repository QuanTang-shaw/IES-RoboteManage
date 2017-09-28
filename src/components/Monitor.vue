<template>
	<div>
		<Modal
		    v-model="modal1"
		    title="远程解锁"
		    @on-ok="LockingOk"
		    @on-cancel="LockingCancel"
		    style="z-index:100;">
		    <Alert show-icon>
		            <p>设备型号:<span>{{devOper.model}}</span></p>
		            <p>设备编号:<span>{{devOper.numbering}}</span></p>
		            <template slot="desc"><span style="color:red;">解锁后.....,确定执行操作?</span></template>
		    </Alert>
		    <Form  :label-width="80">
		      <Form-item label="授权状态">
		        <i-switch size="large" v-model="Locking">
		         <span slot="open">开启</span>
		         <span slot="close">关闭</span>
		        </i-switch>
		      </Form-item>
		     <!--  <Form-item label="选择器">
		     </Form-item> -->
		      <Form-item label="截止时间">
		        <Date-picker type="date" placeholder="选择日期" v-model="endTime"></Date-picker>
		      </Form-item>
		    </Form>
		</Modal>
		<Breadcrumb style="border-bottom:solid 0px #E7E4E4;">
		  <Breadcrumb-item href="/DevList">机器列表</Breadcrumb-item>
		  <Breadcrumb-item>实时监控</Breadcrumb-item>
		  <!-- <Breadcrumb-item>{{SubBreadcrumbText}}</Breadcrumb-item> -->
		</Breadcrumb>
		<div style="border:solid 1px #DCD9D9;margin:20px 0;">
			<div style="border-bottom:solid 1px #ECEBEB;margin-bottom:20px;">
	            <Row type="flex" justify="start" align="middle" :gutter="40" class="code-row-bg" style="border:solid 0px;">
	             <Col span="4" style="border:solid 0px;">
	               <img src="../pic/Manipulator1.jpg" alt="" style="height:80px;">
	             </Col>
	             <Col span="6" style="border:solid 0px;font-size:15px;">
	                <p><strong>设备名称:</strong>{{devOper.name}}</p>
	                <p><strong>设备型号:</strong>{{devOper.model}}</p>
	                <p><strong>设备编号:</strong>{{devOper.numbering}}</p>
	             </Col>
	             <Col span="6" style="border:solid 0px;">
	              <Button type="info" v-if="devOper.status==3">运行中</Button>
	              <Button v-else="devOper.status==2">停止中</Button>
	             </Col>
	             <Col span="6" style="border:solid 0px;">
	              <Button type="primary" shape="circle" icon="locked " @click="SubRemoteUnlock">远程锁机</Button>
	             </Col>
	            </Row>
	        </div>
	        <div style="padding:0 15px;">
		        <Tabs type="card">
		            <Tab-pane label="实时数据">
		              <div id="svgContainer"  style="border:solid 0px #0D29F6;height:70%;">
		              </div>
		            </Tab-pane>
		            <Tab-pane label="报警历史">
		              <div style="border:solid 0px;">
		                <Table stripe :columns="alarmColumns" :data="alarmData"></Table>
		                <div class="page">
		                	<Page
		                		@on-change="togglePage"
		                		@on-page-size-change="togglePageNum"
		                		:total="totalCount"
		                		:page-size="pageSize"
		                		:page-size-opts="pageSizeOpts"
		                		size="small">
		                	</Page>
		                </div>
		              </div>
		            </Tab-pane>
		        </Tabs>
	        </div>
		</div>
	</div>
</template>
<script>
	import {MachineList,MachineErrorList,MachineLocking,getConfig} from '@/api/getData'
	import {beforeUrl}from '@/api/path'
	import mqtt from 'mqtt'
	export default{
		data(){
			return{
				modal1:false,
				Locking:false,
				devOper:{},
				endTime:'',
				currentPage:0,
				totalCount:0,
				pageSize:10,
				pageSizeOpts:[5,10,15,20],
				alarmColumns:[
				  {
				    title:'#',
				    key:'index',
				    width:60
				  },
				  {
				    title:'报警时间',
				    key:'time',
				    width:150
				  },
				  {
				    title:'报警编号',
				    key:'number',
				    width:150,
				    /*filters: [
				      {
				        label: '电机过流',
				        value: 1
				      },
				      {
				        label: '跟随错误',
				        value: 2
				      }
				    ],
				    // filterMultiple: false,
				    filterMethod (value, row) {
				        if (value === 1) {
				            return row.number == 'err 011';
				        } else if (value === 2) {
				            return row.number == 'err 009';
				        }
				    }*/
				  },
				  {
				    title:'报警内容',
				    key:'content',
				    width:150
				  },
				  {
				    title:'可能原因',
				    key:'Causes'
				  },
				],
				alarmData:[],
			}
		},
		methods:{
			togglePage(index){
				this.currentPage=--index;
				this.initErrData();
			},
			togglePageNum(pageNum){
				this.pageSize=pageNum;
				this.initErrData();
			},
			SubRemoteUnlock(){
				this.modal1=true;
			},
			async LockingOk(){
			  const date=new Date(),
			        startTime=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
			  let DevStatus=0;
			  // console.log(this.devOper);
			  if(this.endTime==""){
			    this.$Message.error("提交失败,请选择时间!");
			    return;
			  }
			  if(this.Locking){
			    DevStatus=3;
			  }
			  else{
			    DevStatus=2;
			  }
			  await MachineLocking({
			    uDeviceUUID: this.devOper.devID,
			    nDeviceStatus: DevStatus,
			    dtDeviceActiveDateTimeB: startTime,
			    dtDeviceActiveDateTimeE: this.endTime
			  });
			  this.initDevData();
			  this.$Message.info('修改成功!');
			},
			LockingCancel () {
			  this.$Message.info('点击了取消');
			},
			async initErrData(){
				const list=await MachineErrorList({
					nPageIndex: this.currentPage,
			      	nPageSize: this.pageSize,
			      	uMachineUUID: this.$route.params.devID
				});
				if(list.obj.hasOwnProperty('objectlist')){
					this.totalCount=list.obj.totalcount;
					this.alarmData=[];
					list.obj.objectlist.forEach((ele, index)=> {
						this.alarmData.push({
							index:index,
							time:ele.dtErrorDateTime,
							number:ele.nErrorCode,
							content:ele.strErrorMsg,
							Causes:ele.strErrorNote
						})
					});
				}
				// console.log(list)
			},
			async initDevData(){
				const list=await MachineList({
				        nPageIndex: 0,
				        nPageSize: 0,
				        uDeviceUUID:this.$route.params.devID,
				        strKeyWord: "",
				        uCustomerUUID: -1,
				        uLocationUUID: -1,
				        uProductUUID: -1,
				        nDeviceStatus: -1
				      });
				console.log(list);
				this.DevData=[];
				this.devOper={};
				if(list.obj.hasOwnProperty('objectlist')&&
					(list.obj.objectlist.length==1)){
					// console.log(list.obj.objectlist[0])
					const temp=list.obj.objectlist[0];
				    this.devOper={
				      name:temp.strProductName_cn,
				      numbering:temp.strMachineSN,
				      model:temp.strProductModel,
				      status:temp.nDeviceStatus,
				      customer:temp.strCustomerName,
				      endTime:temp.dtDeviceActiveDateTimeE,
				      devID:temp.uDeviceUUID,
				      machineID:temp.uMachineUUID,
				      appID:temp.uAppUUID,
				      devStatus:temp.nDeviceStatus
				    };
				    if(this.devOper.status==2)this.Locking=false;
				    else if(this.devOper.status==3) this.Locking=true;
				    this.endTime=this.devOper.endTime;
				}
				// console.log(this.devOper);
			},
			async initConfig(){
				const list=await getConfig({
			        nPageIndex: 0,
			        nPageSize: 0,
			        uAppUUID: 10001
				});
				// console.log(list);
				const dataConfig=JSON.parse(list.obj.objectlist[0].strAppCode_UI),
					  server=dataConfig.datasource.mqtt.server,
					  topic=dataConfig.datasource.mqtt.topic,
					  port=dataConfig.datasource.mqtt.port;
				console.log(dataConfig);
				//载入svg
				$("#svgContainer").load(`${beforeUrl()}/svg/TSR-050-A.svg`);
				//连接服务器
				// const client = mqtt.connect('mqtt://iec.topstarltd.com:9011');
				const client = mqtt.connect(server+":"+port);
				console.log(server);
				//订阅主题
				client.on('connect', function() {
				  client.subscribe(topic);
				});
				client.on("message", function(topic, payload) {
					console.log('==================',payload);
				  const MqttData=JSON.parse(payload);
				  console.log(MqttData);
				  if(MqttData.hasOwnProperty('data')){
				  	for (let key in MqttData.data) {
				  		// statement
				  		if(key=="axis_pos"){
				  			// console.log(key);
				  			$('#'+"svg_txtValueX").html(MqttData.data.axis_pos[0].toFixed(1));
				  			$('#'+"svg_txtValueY").html(MqttData.data.axis_pos[1].toFixed(1));
				  			$('#'+"svg_txtValueZ").html(MqttData.data.axis_pos[2].toFixed(1));
				  			$('#'+"svg_txtValueRx").html(MqttData.data.axis_pos[3].toFixed(1));
				  			$('#'+"svg_txtValueRy").html(MqttData.data.axis_pos[4].toFixed(1));
				  			$('#'+"svg_txtValueRz").html(MqttData.data.axis_pos[5].toFixed(1));
				  		}
				  		if((key=="sys_gpi"||key=="sys_gpo")){
				  			let GPIO=key=="sys_gpi"?MqttData.data.sys_gpi:MqttData.data.sys_gpo;
  						  	// let GPIO=MqttData.data.sys_gpi;
  						  	let countIO=15;
  						  for (let n = 0; n < 16; n++) {
  			                  let light = (0 == (GPIO & (1 << n)) ? 0 : 1);
  			                  let keyId = key == 'sys_gpi' ? 'svg_gpi' : 'svg_gpo';
  			                  light == 0 ? $('#' + keyId + '_' + countIO).attr({"xlink:href": require('../assets/signalLamp_stop.png')}) :
  			                  $('#' + keyId + '_' + countIO).attr({"xlink:href": require('../assets/signalLamp.png')});
  			                  countIO--;
  			                }
				  		}
				  		$('#'+"svg_txtMachineModel").html(MqttData.data.model);
				  		$('#'+"svg_txtMachineID").html(MqttData.data.machine_id);
				  		$('#'+"svg_txtCyclePeriod").html(MqttData.data.cycle_period.toFixed(1));
				  		$('#'+"svg_txtCycleCount").html(MqttData.data.cycle_count);
				  		$('#'+"svg_txtPowerOnTime").html(Math.trunc(MqttData.data.total_time_power_on));
				  		$('#'+"svg_txtRunTime").html(Math.trunc(MqttData.data.total_time_run));
				  		$('#'+"svg_txtErrorCount").html(MqttData.data.fault_count);
				  		$('#'+"svg_txtRunSpeed").html(MqttData.data.run_speed.toFixed(1));
				  	}
				  }
				  // client.end();
				  // {client.end()}
				});
			}
		},
		created(){
			this.initErrData();
			this.initDevData();
			this.initConfig();
			// console.log(this.$route.params);
		},
		beforeCreate(){
			// console.log(beforeUrl());
		}
	}
</script>