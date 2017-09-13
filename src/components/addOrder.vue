<template>
	<div>
		<Breadcrumb style="border-bottom:solid 0px #E7E4E4;">
		  <Breadcrumb-item href="/orderManage/orderList">订单列表</Breadcrumb-item>
		  <Breadcrumb-item>添加订单</Breadcrumb-item>
		</Breadcrumb>
		<div style="width:550px;margin-top:30px;">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
			     <FormItem label="客户" prop="customer">
			         <Select v-model="formValidate.customer" placeholder="请选择订单客户">
			             <Option :value="customer.value" :key="customer.value" v-for="customer in customerList">{{customer.label}}</Option>
			         </Select>
			     </FormItem>
			     <FormItem label="订单金额" prop="sum">
			         <Input v-model="formValidate.sum" placeholder="请输入订单金额"></Input>
			     </FormItem>
			     <FormItem label="设备" prop="targetOrder">
			        <Transfer
                        :titles="transferTitle"
                        :data="sourceData"
                        :target-keys="formValidate.targetOrder"
                        :render-format="render"
                        @on-change="handleChange">
                    </Transfer>
			     </FormItem>
			     <FormItem label="备注">
			         <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
			     </FormItem>
			     <FormItem>
			         <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
			         <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			     </FormItem>
			 </Form>
		</div>
	</div>
</template>
<script>
	import{MachineList,AddOrder,CustomerList,productCategory} from '@/api/getData'
	export default{
		data () {
            return {
                sourceData:[],
                // sourceData: this.getMockData(),
                // targetOrder:[],
                current:0,
                customerList:[],
                transferTitle:['待售设备','目的订单'],
                formValidate: {
                    customer: '',
                    sum: '',
                    city: '',
                    targetOrder: [],
                    desc: ''
                    /*gender: '',
                    date: '',
                    time: '',*/
                },
                ruleValidate: {
                    customer: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    sum: [
                        { required: true, message: '请输入金额', trigger: 'blur' }
                    ],
                    targetOrder: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个设备', trigger: 'change' },
                        // { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                    /*mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],*/
                    /*date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],*/
                }
            }
        },
        methods:{
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: '设备' + i,
                        description: '设备' + i + '的描述信息',
                        // disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
            },
            render (item) {
                return item.label;
            },
            handleChange (newTargetOrder, direction, moveKeys) {
                console.log(newTargetOrder);
                console.log(direction);
                console.log(moveKeys);
                this.formValidate.targetOrder = newTargetOrder;
            },
        	handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        console.log(this.formValidate.targetOrder)
                        AddOrder({
                        	uCustomerUUID : this.formValidate.customer  , // 客户的UUID
                	        uOrderSellerUserUUID : 0 , // 销售员UUID, 默认为0
                	        fOrderTotalAmmount : this.formValidate.sum , // 订单金额, 默认为0
                	        strOrderNote : this.formValidate.desc, // 备注信息
                	        lstMachineUUID : this.formValidate.targetOrder // 当前订单下的uMachineUUID
                        });
                    }
                    else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
	        async initCustomerData(){
		        const list=await CustomerList({
		            nPageIndex: 0,
		            nPageSize: -1,
		            strKeyWord: ""
		          });
		        if(list.obj.hasOwnProperty('objectlist')){
		          list.obj.objectlist.forEach((ele, index)=> {
		            this.customerList.push({
		            	label:ele.strCustomerName,
		            	value:ele.uCustomerUUID,
		            });
		          });
		        }
	      	},
	      	async initCategoryData(){
	      		const list=await productCategory({
	      			nPageIndex: 0,
	  			    nPageSize: -1,
	  			    strKeyWord: ""
	      		});
	      	},
            async getForSale(){
                const list=await MachineList({
                    nPageIndex: 0,
                    nPageSize: 0,
                    strKeyWord: "",
                    uCustomerUUID: 0,
                    uLocationUUID: 0,
                    uProductUUID: 0,
                    nDeviceStatus:1
              });
              console.log(list);
              // console.log(list.obj.objectlist);
              if(list.obj.hasOwnProperty('objectlist')){
                  this.sourceData=[];
                  list.obj.objectlist.forEach((ele, index)=>{
                  console.log(index)
                      // statements
                      this.sourceData.push({
                          key:ele.uMachineUUID,
                          label:ele.strDeviceSN,
                          // description: '设备' + i + '的描述信息',
                      });
                  });
              }
            }
        },
        created(){
        	this.initCustomerData();
            this.getForSale();
        	// this.initCategoryData();
        }
	}
</script>
<style></style>