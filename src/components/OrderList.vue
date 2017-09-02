<template>
	<div>
		<Modal
	        v-model="modal1"
	        title="普通的Modal对话框标题"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <p>对话框内容</p>
	        <p>对话框内容</p>
	        <p>对话框内容</p>
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
	</div>
</template>
<script>
	import {orderList} from '@/api/getData'
	export default {
        data () {
            return {
            	modal1:false,
            	searchTxt:'',
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
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index);
                                            this.orderDetail(params);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
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
	        	this.modal1=true;
	        },
	        orderDetail(params){
	        	console.log(params);
	        	this.$router.push('orderDetail')
	        },
	        async initData(){
		    	let list=await orderList({
		    		nPageIndex : 0,
    		        nPageSize : 10,
    		        strKeyWord : ""
		    	});
		    	console.log(list);
		    	if(list.obj.hasOwnProperty('objectlist')){
		    		list.obj.objectlist.forEach((ele, index)=>{
		    			let obj={};
		    			/*orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'*/
		    			obj.orderNumber=ele.strOrderGUID;
		    			obj.customer=ele.strCustomerName;
		    			obj.status=ele.nOrderStatus;
		    			obj.createDate=ele.dtOrderCreateDateTime;
		    			obj.orderDesc=ele.strOrderNote;
		    			this.orderData.push(obj);
		    		});
		    	}
	        }
	    },
	    created(){
	    	this.initData();
	    }
    }
</script>
