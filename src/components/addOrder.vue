<template>
	<div>
		<Breadcrumb style="border-bottom:solid 0px #E7E4E4;">
		  <Breadcrumb-item href="/orderManage/orderList">订单列表</Breadcrumb-item>
		  <Breadcrumb-item>添加订单</Breadcrumb-item>
		</Breadcrumb>
		<div>
			<!-- <p>当前正在进行第 {{ current + 1 }} 步</p>
					    <Steps :current="current">
					        <Step title="步骤1">11111111111111</Step>
					        <Step title="步骤2">2222222222222222</Step>
					        <Step title="步骤3">333333333333333333</Step>
					        <Step title="步骤4">444444444444444444</Step>
					    </Steps> -->
		</div>
		<div style="width:450px;margin-top:30px;">
			<Form :model="formItem" :label-width="80">
		        <FormItem label="客户">
		            <Select v-model="formItem.select" placeholder="请选择">
		                <Option :value="customer.value" :key="customer.value" v-for="customer in customerList">{{customer.label}}</Option>
		                <!-- <Option value="shanghai">上海市</Option>
		                <Option value="shenzhen">深圳市</Option> -->
		            </Select>
		        </FormItem>
		        <FormItem label="订单金额">
		            <Input v-model="formItem.input" placeholder="请输入"></Input>
		        </FormItem>
		        <FormItem label="设备选择">
		            <CheckboxGroup v-model="formItem.checkbox">
		                <Checkbox label="机械手1"></Checkbox>
		                <Checkbox label="机械手2"></Checkbox>
		                <Checkbox label="机械手3"></Checkbox>
		                <Checkbox label="机械手4"></Checkbox>
		            </CheckboxGroup>
		        </FormItem>
		        <FormItem label="备注">
		            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		        </FormItem>
		        <FormItem>
		            <Button type="primary">提交</Button>
		            <Button type="ghost" style="margin-left: 8px">取消</Button>
		        </FormItem>
		    </Form>
		</div>
		<!-- <Button type="primary" @click="next">下一步</Button> -->
	</div>
</template>
<script>
	import{CustomerList,productCategory} from '@/api/getData'
	export default{
		data () {
            return {
                current:0,
                customerList:[],
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        methods:{
        	next () {
                if (this.current == 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
	        async initCustomerData(){
		        const list=await CustomerList({
		            nPageIndex: 0,
		            nPageSize: -1,
		            strKeyWord: ""
		          });
		        if(list.obj.hasOwnProperty('objectlist')){
		          list.obj.objectlist.forEach((ele, index)=> {
		            let obj={};
		            obj.label=ele.strCustomerName;
		            obj.value=ele.uCustomerUUID;
		            this.customerList.push(obj);
		          });
		        }
	      	},
	      	async initCategoryData(){
	      		const list=await productCategory({
	      			nPageIndex: 0,
	  			    nPageSize: -1,
	  			    strKeyWord: ""
	      		})
	      		console.log(list)
	      	}
        },
        created(){
        	this.initCustomerData();
        	this.initCategoryData();
        }
	}
</script>
<style></style>