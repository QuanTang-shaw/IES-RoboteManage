
	export const exec_getData=function (str,op,obj) {

		var promise=new Promise(function (resolve,reject) {
			var url =`http://ifs.top-link.me/ifs/${str}`,
				req = new TRequest();
			// obj = { uFactoryUUID: 3},
			// exec : function (url, op, obj, cb, err)
			// console.log(req)
			req.exec(url,op,obj,
			    // success:
			    function (json) {
			    	resolve(json);
			    },
			    // error:
			    function (json) {
			        reject(json);
			    });
		});
		return promise;
	}

	async  function Factory_ListActive(){
		var result = await exec_getData(
	              "Handler_Factory_V1.ashx",
	              "Factory_ListActive",
	              {
		              "nPageIndex": 0,
		              "nPageSize": -1,
		              "uParkUUID": 1,
		              "uFactoryTypeUUID":-1,
	  				  "uFactoryAdminUUID":-1
  				  });
		 return result;
	}

	async  function Workshop_ListActive(obj){
		var result = await exec_getData(
	              "Handler_Workshop_V1.ashx",
	              "Workshop_ListActive",
	              obj);
		 return result;
	}


	async  function WorkshopType_ListActive(obj){
		var result = await exec_getData(
	              "Handler_WorkshopType_V1.ashx",
	              "WorkshopType_ListActive",
	              obj);
		 return result;
	}


	async  function Workstation_ListActive(obj){
		var result = await exec_getData(
	              "Handler_Workstation_V1.ashx",
	              "Workstation_ListActive",
	              obj);
		 return result;
	}

	async  function WorkstationType_ListActive(obj){
		var result = await exec_getData(
	              "Handler_WorkstationType_V1.ashx",
	              "WorkstationType_ListActive",
	              obj);
		 return result;
	}

	async  function DevType_ListActive(){
		var result = await exec_getData(
	              "Handler_DevType_V1.ashx",
	              "DevType_ListActive",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevTypeParentUUID": 1});
		 return result;
	}

	async  function DevModel_ListActive(obj){
		var result = await exec_getData(
	              "Handler_DevModel_V1.ashx",
	              "DevModel_ListActive",
	              obj);
		 return result;
	}


	async  function Device_ListActive(obj){
		var result = await exec_getData(
	              "Handler_Device_V1.ashx",
	              "Device_ListActive",
	              obj);
		 return result;
	}


	async  function Devcategory_ListActive(obj){
		var result = await exec_getData(
	              "Handler_DevCategory_V1.ashx",
	              "DevCategory_ListActive",
	              obj);
		 return result;
	}

	async  function Vendor_ListActive(obj){
		var result = await exec_getData(
	              "Handler_Vendor_V1.ashx",
	              "Vendor_ListActive",
	              obj);
		 return result;
	}






	//修改工厂
	async  function Factory_Update (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Update",obj);
	}
	// 增加工厂
	async  function Factory_Add (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Add",obj);
	}
	//删除工厂
	async  function Factory_Inactive (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Inactive",obj);
	}
	//工厂详情
	async  function Factory_Detail (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_GetDetail",obj);
	}



	// 增加车间
	async  function Workshop_Add (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}
	//修改车间
	async  function Workshop_Update (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Update",obj);
	}
	// 增加车间
	async  function Workshop_Add (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}
	//删除车间
	async  function Workshop_Inactive (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Inactive",obj);
	}
	//车间详情
	async  function Workshop_Detail (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_GetDetail",obj);
	}







	//修改机台
	async  function Workstation_Update (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Update",obj);
	}
	// 增加机台
	async  function Workstation_Add (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Add",obj);
	}
	//删除机台
	async  function Workstation_Inactive (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Inactive",obj);
	}
	//机台详情
	async  function Workstation_Detail (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_GetDetail",obj);
	}









	//修改厂商
	async  function Vendor_Update (obj) {
		await   exec_getData("Handler_Vendor_V1.ashx","Vendor_Update",obj);
	}
	// 增加厂商
	async  function Vendor_Add (obj) {
		await   exec_getData("Handler_Vendor_V1.ashx","Vendor_Add",obj);
	}
	//删除厂商
	async  function Vendor_Inactive (obj) {
		await   exec_getData("Handler_Vendor_V1.ashx","Vendor_Inactive",obj);
	}
	//厂商详情
	async  function Vendor_Detail (obj) {
		await   exec_getData("Handler_Vendor_V1.ashx","Vendor_GetDetail",obj);
	}


	//修改设备
	async  function Device_Update (obj) {
		await   exec_getData("Handler_Device_V1.ashx","Device_Update",obj);
	}
	// 增加设备
	async  function Device_Add (obj) {
		await   exec_getData("Handler_Device_V1.ashx","Device_Add",obj);
	}
	//删除设备
	async  function Device_Inactive (obj) {
		await   exec_getData("Handler_Device_V1.ashx","Device_Inactive",obj);
	}
	//设备详情
	async  function Device_Detail (obj) {
		await   exec_getData("Handler_Device_V1.ashx","Device_GetDetail",obj);
	}





	async  function Devcategory_Update(obj){
		await exec_getData("Handler_DevCategory_V1.ashx","DevCategory_Update",obj);
	}
	async  function Devcategory_Add(obj){
		await exec_getData("Handler_DevCategory_V1.ashx","DevCategory_Add",obj);
	}
	async  function Devcategory_Inactive(obj){
		await exec_getData("Handler_DevCategory_V1.ashx","DevCategory_Inactive",obj);
	}


	export default{
		exec_getData,

		Factory_ListActive,
		Workshop_ListActive,
		WorkshopType_ListActive,
		Workstation_ListActive,
		WorkstationType_ListActive,
		DevType_ListActive,
		Device_ListActive,
		Devcategory_ListActive,
		DevModel_ListActive,
		Vendor_ListActive,


		Factory_Update,
		Factory_Add,
		Factory_Inactive,
		Factory_Detail,

		Workshop_Update,
		Workshop_Add,
		Workshop_Inactive,
		Workshop_Detail,

		Workstation_Update,
		Workstation_Add,
		Workstation_Inactive,
		Workstation_Detail,

		Vendor_Update,
		Vendor_Add,
		Vendor_Inactive,
		Vendor_Detail,

		Device_Update,
		Device_Add,
		Device_Inactive,
		Device_Detail,

		Devcategory_Update,
		Devcategory_Add,
		Devcategory_Inactive
	}