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
		            <template slot="desc"><span style="color:red;">解锁后.....,确定执行操作?</span></template>
		    </Alert>
		    <Form  :label-width="80">
		      <Form-item label="授权状态">
		        <i-switch size="large">
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
		  <Breadcrumb-item href="/orderManage/orderList">订单列表</Breadcrumb-item>
		  <Breadcrumb-item>订单详情</Breadcrumb-item>
		</Breadcrumb>
		<div>
			<Table border :columns="orderDevcolumns" :data="orderDevData"></Table>
		</div>
	</div>
</template>
<script>
	import {orderMachineList} from '@/api/getData'
	export default{
		data(){
			return{
				devOper:{},
				modal1:false,
				endTime:'',
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
					                    // src:pic
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
					    if(params.row.status==1){
					      return h('div', [
					          h('Button', {
					              props: {
					                  // type: 'info',
					                  size: 'small',
					              }
					          },`停止中`)
					      ]);
					    }
					    else if(params.row.status==2){
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
			RemoteUnlockOk(){
              this.$Message.info('点击了成功!');
			},
			cancel(){
              this.$Message.info('点击了取消!');
          },
			async initData(){
				const list=await orderMachineList({
					nPageIndex: 0,
				    nPageSize: 6,
				    strKeyWord: "",
				    uOrderUUID : 0  // 订单UUID
				});
				if(list.obj.hasOwnProperty('objectlist')){
					// console.log(list);
					list.obj.objectlist.forEach((ele,index)=>{
					  let obj={};
				      obj.name=ele.strProductName_cn;
				      obj.numbering=ele.strDeviceSN;
				      obj.model=ele.strProductModel;
				      obj.status=ele.nDeviceStatus;
				      obj.customer=ele.strCustomerName;
				      obj.activeTime=ele.dtDeviceActiveDateTimeB;
				      this.orderDevData.push(obj);
					});
				}
			}
		},
		created(){
			this.initData();
		}
	}
</script>