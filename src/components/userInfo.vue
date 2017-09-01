<template>
	<div class="machineList-mg">
		<!-- <Modal
		    v-model="modal1"
		    title="删除机台"
		    @on-ok="ok"
		    @on-cancel="cancel">
		    <Alert type="warning" show-icon>
		      <template slot="desc">
		        删除机台后,机台所属的工位设备等信息都将删除哦
		      </template>
		      您确定要删除<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
		    </Alert>
		</Modal>
		<Modal
		    v-model="modal2"
		    title="车间编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		            <Form-item label="编号" prop="numbering">
		                <Input v-model="formValidate.numbering" placeholder="请输入机台编号"></Input>
		            </Form-item>
		            <Form-item label="名称" prop="name">
		                <Input v-model="formValidate.name" placeholder="请输入机台名称"></Input>
		            </Form-item>
		            <Form-item label="主管" prop="mail">
		                <Select v-model="formValidate.charge" placeholder="请选择机台主管">
	                        <Option value="1" >主管1</Option>
	                        <Option value="2" >主管2</Option>
	                        <Option value="3" >主管3</Option>
	                        <Option value="4" >主管4</Option>
	                        <Option value="5" >主管5</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="类型" prop="workstationType">
		                <Select v-model="formValidate.workstationType" placeholder="请选择机台类型">
	                        <Option :key="machineType.uWorkstationTypeUUID" :value="machineType.uWorkstationTypeUUID" v-for="machineType in machineTypeList">{{machineType.strWorkstationTypeName}}</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="所属车间" prop="OwnedWorkstation">
			            <Cascader :data="cascadeData" v-model="formValidate.OwnedWorkstation"></Cascader>
		            </Form-item>
		            <Form-item label="机台描述" prop="desc">
		                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		            </Form-item>
		            <Form-item label="图片" >
		              <div class="fileUpload">
		                <img src="../assets/plant1.jpg" alt="图片" @click="upPic">
		                <input type="file" style="display:none;">
		              </div>
		            </Form-item>
		            <Form-item>
		                <Button type="ghost" @click="close" >取消</Button>
		                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
		                <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		            </Form-item>
		    </Form>
		</Modal> -->
		<!-- <div class="page">
			<Page
				@on-change="togglePage"
				@on-page-size-change="togglePageNum"
				:total="totalCount"
				:page-size="pageSize"
				:page-size-opts="pageSizeOpts"
				show-sizer>
			</Page>
		</div> -->
	</div>
</template>
<script>
	export default{
		name:'machineList',
		data(){
			return {
				searchTxt:'',
				totalCount:0,
				pageSize:10,
				pageSizeOpts:[10,15,20],
				currentPage:0,
				modal1:false,
				modal2:false,
			}
		},
		methods:{
			ok (){
			  	let self=this;
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			close(){
				this.modal2=false;
				this.$Message.info('点击了取消');
			},
			handleSubmit(name){

			},
			handleReset (name) {
                // this.$refs[name].resetFields();
            },
            upPic(){
              // event.target.nextSibling.nextSibling.click();
            },
			async togglePage(index) {
	  		    this.currentPage=index-1;
			},
			togglePageNum(){

			}
		},
		async beforeCreate() {

		}
	}
</script>
<style>
</style>