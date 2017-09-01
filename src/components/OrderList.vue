<template>
	<Table border :columns="orderColumns" :data="orderData"></Table>
</template>
<script>
	export default {
        data () {
            return {
                orderColumns: [
                    {
                        title: '订单号',
                        key: 'orderNumber',
                    },
                    {
                        title: '订单客户',
                        key: 'customer'
                    },
                    {
                		title:'图片'
                	},
                    {
                        title: '订单状态',
                        key: 'status'
                    },
                    {
                        title: '订单创建时间',
                        key: 'createDate'
                    },
                    {
                        title: '订单详情',
                        key: 'orderDesc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                            this.show(params.index)
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
                    },
                    {
                        orderNumber: 'RB05-20170511',
                        customer: '比亚迪',
                        status: '已出货',
                        createDate:'2017-04-01',
                        orderDesc:'比亚迪订单'
                    }
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
	        }
	    }
    }
</script>
