<template>
	<div>
		<Modal
		    v-model="modal1"
		    title="远程解锁"
		    @on-ok="RemoteUnlockOk"
		    @on-cancel="cancel"
		    style="z-index:100;">
		    <Alert show-icon>
	            <p>设备型号:<span>{{devOper.model}}</span></p>
	            <p>设备编号:<span>{{devOper.numbering}}</span></p>
	            <template slot="desc">
		            <span style="color:red;">解锁后.....,确定执行操作?</span>
	            </template>
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
		<Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>" style="border-bottom:solid 0px #E7E4E4;">
		  <Breadcrumb-item href="/orderManage/orderList">订单列表</Breadcrumb-item>
		  <Breadcrumb-item>订单详情</Breadcrumb-item>
		</Breadcrumb>
		<div style="margin-top:20px;">
			<Table border :columns="orderDevcolumns" :data="orderDevData"></Table>
		</div>
	</div>
</template>
<script>
	import {MachineLocking,orderMachineList} from '@/api/getData'
	export default{
		data(){
			return{
				devOper:{},
				modal1:false,
				endTime:'',
				Locking:false,
				orderDevcolumns:[
					{
					     type: 'selection',
					     width: 60,
					     align: 'center'
					 },
					{
					    title: '图片',
					    key: 'name',
					    render: (h, params) => {
					        return h('div', [
					            h('img',{
					                  attrs:{
					                    src:`${params.row.picPath}`
					                  },
					                  style:{
					                    height:'80px',
					                    padding:'10px'
					                  }
					                })
					        ]);
					    }
					},
					{
					  title:'名称',
					  key:'name'
					},
					{
					  title:'型号',
					  key:'model'
					},
					{
					  title:'编号',
					  key:'numbering',
					  align:'center'
					},
					{
					  title:'运行状态',
					  key:'status',
					  render: (h, params) => {
					    if(params.row.status==2){
					      return h('div', [
					          h('Button', {
					              props: {
					                  // type: 'info',
					                  size: 'small',
					              }
					          },`停止中`)
					      ]);
					    }
					    else if(params.row.status==3){
					      return h('div', [
					          h('Button', {
					              props: {
					                  type: 'info',
					                  size: 'small',
					              }
					          },`运行中`)
					      ]);
					    }
					  }
					},
					{
					    title: '客户',
					    key: 'customer'
					},
					{
					    title: '操作',
					    key: 'action',
					    width: 250,
					    align: 'center',
					    render: (h, params) => {
					      // console.log(params);
					        return h('div', [
					            h('Button', {
					                props: {
					                    type: 'primary',
					                    // size: 'small',
					                    shape:"circle",
					                    icon:'locked'
					                },
					                style: {
					                    marginRight: '5px'
					                },
					                on: {
					                    click: () => {
					                        // this.RemoteUnlock(params);
					                        if(params.row.status==2)this.Locking=false;
                                            else if(params.row.status==3) this.Locking=true;
					                        this.modal1=true;
					                        this.devOper=params.row;
					                        this.endTime=params.row.activeTime;
					                    }
					                }
					            }, '远程锁机'),
					           /* h('Button', {
					                props: {
					                    type: 'success',
					                    // size: 'small',
					                    shape:"circle",
					                    icon:"monitor"
					                },
					                on: {
					                    click: () => {
					                        // this.DevMonitor(params);
					                        this.DevMonitor2(params);
					                    }
					                }
					            }, '实时监控')*/
					        ]);
					    }
					}
				],
				orderDevData:[]
			}
		},
		methods:{
			async RemoteUnlockOk(){
              const date=new Date(),
                    startTime=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
              let DevStatus=0;
              // console.log(this.devOper);
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
              this.initData();
              this.$Message.info('点击了确定');
			},
			cancel(){
              this.$Message.info('点击了取消!');
            },
			async initData(){
				// console.log(this.$route.params.orderID);
				const list=await orderMachineList({
					nPageIndex: 0,
				    nPageSize: 6,
				    strKeyWord: "",
				    uOrderUUID : this.$route.params.orderID  // 订单UUID
				});
				if(list.obj.hasOwnProperty('objectlist')){
					console.log(list);
					this.orderDevData=[];
					list.obj.objectlist.forEach((ele,index)=>{
					  let obj={};
				      this.orderDevData.push({
				      	devID:ele.uDeviceUUID,
			            picPath:ele.strProductImage,
					    name:ele.strProductName_cn,
					    numbering:ele.strMachineSN,
					    model:ele.strProductModel,
					    status:ele.nDeviceStatus,
					    customer:ele.strCustomerName,
					    activeTime:ele.dtDeviceActiveDateTimeE,
				      });
					});
				}
			}
		},
		created(){
			this.initData();
		}
	}
</script>
<style>
	.demo-breadcrumb-separator{
        color: #ff5500;
        padding: 0 5px;
    }
</style>