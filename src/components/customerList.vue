<template>
	<div class="workshopManagement">
		<Modal
		    v-model="modal1"
		    title="删除客户"
		    @on-ok="ok"
		    @on-cancel="cancel">
		    <Alert type="warning" show-icon>
		      <template slot="desc">
		        删除客户后,该客户所属的所有设备等信息都将删除哦
		      </template>
		      您确定要删除客户<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
		    </Alert>
		</Modal>
		<Modal
		    v-model="modal2"
		    title="客户编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		            <Form-item label="名称" prop="name">
		                <Input v-model="formValidate.name" placeholder="请输入客户名称"></Input>
		            </Form-item>
		            <Form-item label="英文名称" prop="enName">
		                <Input v-model="formValidate.enName" placeholder="请输入客户英文名称"></Input>
		            </Form-item>
		            <Form-item label="联系方式" prop="contact">
		                <Input v-model="formValidate.contact" placeholder="请输入客户联系方式"></Input>
		            </Form-item>
		            <Form-item label="邮箱" prop="mail">
		                <Input v-model="formValidate.mail" placeholder="请输入客户邮箱"></Input>
		            </Form-item>
		            <Form-item label="地址" prop="address">
		                <Input v-model="formValidate.address" placeholder="请输入客户地址"></Input>
		            </Form-item>
		            <Form-item label="LOGO" >
		              <div class="fileUpload">
		                <img src="../assets/plant1.jpg" style="height:120px;" alt="图片" @click="upPic">
		                <input type="file" style="display:none;">
		              </div>
		            </Form-item>
		            <Form-item>
		                <Button type="ghost" @click="close" >取消</Button>
		                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
		                <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		            </Form-item>
		    </Form>
		</Modal>
		<div style="margin-bottom:20px;">
			<Row type="flex" justify="space-around">
		        <Col span="15">
					<Button class="addWorkshop" type="primary" icon="plus-round" @click="addCustomer">添加客户</Button>
		        </Col>
		        <Col span="4">
		        	<Input v-model="searchTxt"  placeholder="请输入..."></Input>
		        </Col>
		        <Col span="2">
					<Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
		        </Col>
			</Row>
		</div>
		<div class="customerList">
		    <Table border :columns="columns7" :data="data6"></Table>
		</div>
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
	import {CustomerList,CustomerDel,CustomerEdit} from '@/api/getData'
	export default{
		name:'workshoplist',
		data () {
			return {
			    searchTxt:'',
			    deletePopContent:'',
			    operatingCustomer:{},
			    currentIndex:-1,
			    totalCount:0,
			    pageSize:5,
			    pageSizeOpts:[5,10,15,20],
			    currentPage:0,
			    modal1:false,
			    modal2:false,
			    columns7: [
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
			                  title:'英文名称',
			                  key:'EnglishName'
			                },
			                {
			                  title:'联系方式',
			                  key:'contact',
			                  align:'center'
			                },
			                {
			                  title:'邮箱',
			                  key:'mail'
			                },
			                {
			                    title: '地址',
			                    key: 'address'
			                },
			                {
			                	title:'操作',
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
		                                        icon:'edit'
		                                    },
		                                    style: {
		                                        marginRight: '5px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.customeModify(params);
		                                        }
		                                    }
		                                }, '修改'),
		                                h('Button', {
		                                    props: {
		                                        type: 'warning',
		                                        // size: 'small',
		                                        shape:"circle",
		                                        icon:"trash-a"
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.customeDelete(params);
		                                        }
		                                    }
		                                }, '删除')
		                            ]);
		                        }
			                }
			    ],
			    data6: [],
			    formValidate: {
			      name: '',
			      enName:'',
			      contact:'',
			      mail:'',
			      address:'',
			    },
			    ruleValidate: {
			        address: [
			            { required: true, message: '地址不能为空', trigger: 'blur' },
			        ],
			        name: [
			            { required: true, message: '名称不能为空', trigger: 'blur' }
			        ],
			        enName: [
			            { required: true, message: '英文名称不能为空', trigger: 'blur' }
			        ],
			        contact: [
			            { required: true, message: '联系方式不能为空', trigger: 'blur' }
			        ],
			        mail:[
			        	{ required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
			        ],
			        desc: [
			            // { required: true, message: '请输入工厂详细信息', trigger: 'blur' },
			            { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur' }
			        ]
			    }
			}
		},
		methods:{
			async ok (){
			  	let self=this;
			  	await CustomerDel({
			  		uCustomerUUID:this.operatingCustomer.row.ID
			  	});
			  	this.initData();
				self.$Message.info('删除成功');
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			close(){
				this.modal2=false;
				this.$Message.info('点击了取消');
			},
			handleSubmit (name) {
                this.$refs[name].validate(async(valid) => {
                    if (valid) {
                    	await CustomerEdit({
                    		uCustomerUUID : this.operatingCustomer.row.ID, // 指定UUID
        		            // uUserUUID
        		          	uLocationUUID : 0,
	        		        strCustomerLogo : '',
	        		        strCustomerName : this.formValidate.name,
	        		        strCustomerCode : this.formValidate.enName,
	        		        strCustomerMobile : this.formValidate.contact,
	        		        strCustomerEmail : this.formValidate.mail,
	        		        strCustomerAddress : this.formValidate.address,
	        		        nCustomerStatus : 1
                    	});
                    	this.initData();
                    	this.modal2=false;
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            upPic(){
              event.target.nextSibling.nextSibling.click();
            },
            addCustomer(){
            	this.modal2=true;
            	// console.log(typeof this.formValidate)
            	if(typeof this.formValidate=='object'){
	            	for (let item in this.formValidate) {
	            		// statement
	            		this.formValidate[item]='';
	            	}
            	}
            },
            customeDelete(prop){
            	this.operatingCustomer=prop;
            	console.log(prop);
            	this.modal1=true;
            	this.deletePopContent=prop.row.name;
            },
            customeModify(prop){
            	this.operatingCustomer=prop;
            	this.modal2=true;
            	this.formValidate.name=prop.row.name;
            	this.formValidate.enName=prop.row.EnglishName;
            	this.formValidate.contact=prop.row.contact;
            	this.formValidate.mail=prop.row.mail;
            	this.formValidate.address=prop.row.address;
            },
			async togglePage(index) {
				this.data6=[];
			    this.currentPage=index-1;
				const list=await CustomerList({
						nPageIndex: this.currentPage,
						nPageSize: this.pageSize,
						strKeyWord: ""
					});
				list.obj.objectlist.forEach((ele,index)=>{
				  let obj={};
				  obj.pic=ele.strCustomerLogo;
			      obj.name=ele.strCustomerName;
			      obj.EnglishName=ele.strCustomerCode;
			      obj.contact=ele.strCustomerMobile;
			      obj.mail=ele.strCustomerEmail;
			      obj.address=ele.strCustomerAddress;
			      this.data6.push(obj);
				});
				this.totalCount=list.obj.totalcount;
			},
			async togglePageNum(sizeNum){
				this.pageSize=sizeNum;
				this.data6=[];
			    // this.currentPage=index-1;
				const list=await CustomerList({
						nPageIndex: this.currentPage,
						nPageSize: this.pageSize,
						strKeyWord: ""
					});
				list.obj.objectlist.forEach((ele,index)=>{
				  let obj={};
				  obj.pic=ele.strCustomerLogo;
			      obj.name=ele.strCustomerName;
			      obj.EnglishName=ele.strCustomerCode;
			      obj.contact=ele.strCustomerMobile;
			      obj.mail=ele.strCustomerEmail;
			      obj.address=ele.strCustomerAddress;
			      this.data6.push(obj);
				});
				this.totalCount=list.obj.totalcount;
			},
			async initData(){
				this.data6=[];
				const list=await CustomerList({
						nPageIndex: this.currentPage,
						nPageSize: this.pageSize,
						strKeyWord: ""
					});
				list.obj.objectlist.forEach((ele,index)=>{
				  let obj={};
				  obj.pic=ele.strCustomerLogo;
			      obj.name=ele.strCustomerName;
			      obj.EnglishName=ele.strCustomerCode;
			      obj.contact=ele.strCustomerMobile;
			      obj.mail=ele.strCustomerEmail;
			      obj.address=ele.strCustomerAddress;
			      obj.ID=ele.uCustomerUUID;
			      this.data6.push(obj);
				});
				this.totalCount=list.obj.totalcount;
			}
		},
		created() {
			this.initData();
			// console.log(list);
			// console.log(this.data6);
		},
		async beforeCreate(){
		}
	}
</script>
<style>
	.page{
        margin:30px 10px;
    }
    .customerList{
    	min-height:450px;
    }
</style>