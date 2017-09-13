<template>
	<div>
        <Modal v-model="modal2"
                @on-ok="DelOk"
                @on-cancel="DelCancel">
            <Alert type="warning" show-icon>
                <template slot="desc">
                订单删除后,与订单有关的设备客户等信息都将删除且不可恢复
                </template>
                您确定要删除订单<span class="orderNumber">{{orderTxt}}</span>吗?
            </Alert>
        </Modal>
		<div style="margin-bottom:20px;">
			<Row type="flex" justify="space-around">
		        <Col span="15">
					<Button class="addWorkshop" type="primary" icon="plus-round" @click="addOrder">添加订单</Button>
		        </Col>
		        <Col span="4">
		        	<Input v-model="searchTxt"  placeholder="请输入..."></Input>
		        </Col>
		        <Col span="2">
					<Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
		        </Col>
			</Row>
		</div>
		<Table border :columns="orderColumns" :data="orderData"></Table>
        <div class="page">
            <Page
                @on-change="togglePage"
                @on-page-size-change="togglePageNum"
                :total="totalCount"
                :page-size="pageSize"
                :page-size-opts="pageSizeOpts"
                show-sizer>
            </Page>
        </div>
	</div>
</template>
<script>
	import {orderList,orderDel} from '@/api/getData'
	export default {
        data () {
            return {
            	modal1:false,
                modal2:false,
                currentPage:0,
                totalCount:0,
                pageSize:5,
                pageSizeOpts:[5,10,15],
            	searchTxt:'',
                orderTxt:'',
                orderOper:{},
                orderColumns: [
                    {
                        title: '订单号',
                        key: 'orderNumber',
                    },
                    {
                        title: '订单客户',
                        key: 'customer'
                    },
                    /*{
                		title:'图片'
                	},*/
                    {
                        title: '订单状态',
                        key: 'status',
                        width:120
                    },
                    {
                        title: '订单创建时间',
                        key: 'createDate'
                    },
                    {
                        title: '订单备注',
                        key: 'orderDesc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        // size: 'small',
                                        shape:'circle',
                                        icon:'document-text'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index);
                                            // this.orderDetail(params);
                                            this.$router.push(`orderDetail/${params.row.orderID}`);
                                        }
                                    }
                                }, '订单详情'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        // size: 'small'
                                        shape:'circle',
                                        icon:'trash-a'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index);
                                            // this.orderDel(params);
                                            // console.log(params);
                                            this.modal2=true;
                                            this.orderTxt=params.row.orderNumber;
                                            this.orderOper=params.row;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                orderData: [
                   /* {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    }*/
                ]
            }
        },
	    methods: {
            togglePage(index){
                // this.currentPage=--index;
                sessionStorage.orderCurPage=--index;
                this.initData();
            },
            togglePageNum(pageNum){
                this.pageSize=pageNum;
                this.initData();
            },
            async DelOk(){
                // console.log(this.orderOper);
                await orderDel({
                    uOrderUUID:this.orderOper.orderID
                });
                this.initData();
            },
            DelCancel(){
              this.$Message.info('点击了取消');
            },
	        show (index) {
	            this.$Modal.info({
	                title: '用户信息',
	                content: `姓名：${this.orderData[index].name}<br>年龄：${this.orderData[index].age}<br>地址：${this.orderData[index].address}`
	            })
	        },
	        remove (index) {
	            this.orderData.splice(index, 1);
	        },
	        addOrder(){
	        	// this.modal1=true;
                this.$router.push("addOrder")
	        },
	        orderDetail(params){
	        	// console.log(params);
	        	this.$router.push(`orderDetail/:${params.row.orderID}`);
	        },
	        async initData(){
		    	let list=await orderList({
		    		nPageIndex : parseInt(sessionStorage.getItem('orderCurPage')),
    		        nPageSize : this.pageSize,
    		        strKeyWord : ""
		    	});
                this.totalCount=list.obj.totalcount;
		    	if(list.obj.hasOwnProperty('objectlist')){
                    this.orderData=[];
		    		list.obj.objectlist.forEach((ele, index)=>{
                        this.orderData.push({
                            orderNumber:ele.strOrderGUID,
                            customer:ele.strCustomerName,
                            status:ele.nOrderStatus,
                            createDate:ele.dtOrderCreateDateTime,
                            orderDesc:ele.strOrderNote,
                            orderID:ele.uOrderUUID,
                        });
		    		});
		    	}
	        }
	    },
	    created(){
            this.currentPage=parseInt(sessionStorage.getItem('orderCurPage'))+1;
	    	this.initData();
	    }
    }
</script>
<style>
    .orderNumber{
        font-weight: bolder;
        color: #FA0B0B;
    }
</style>
