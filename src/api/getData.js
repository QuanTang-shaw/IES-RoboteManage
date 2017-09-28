
// import {exec_getData as get} from '@/fetch/fetch'
	/*const get=function (str,op,obj) {
		var promise=new Promise(function (resolve,reject) {
			// var url =`http://iec.top-link.me/${str}`,
			var url =`http://iec.topstarltd.com/${str}`,
			// var url =`http://localhost:8810/${str}`,

				req = new TRequest();
			req.exec(url,op,obj,
			    // success:
			    function (json) {
			        // console.log(json);
			    	resolve(json);
			    },
			    // error:
			    function (json) {
			        console.log('err');
			        reject(json);
			    });
		});
		return promise;
	}*/

	/*export const getConfig = async  function (obj){
		var promise=new Promise(function (resolve,reject) {
			var url =`http://iec.top-link.me/device/Handler_MachineData_V1.ashx`,
				req = new TRequest(),
				op =  'user_machine_getconfig';
			req.exec(url,op,obj,
			    // success:
			    function (json) {
			        // console.log(json);
			    	resolve(json);
			    },
			    // error:
			    function (json) {
			        console.log('err');
			        reject(json);
			    });
		});
		return promise;
	}*/
	export const logOut = async  function (obj){
		var result = await get(
	      "Handler_LogOut_Do.ashx",
	      " ",
	      obj);
		 return result;
	}


	export const getConfig = async  function (obj){
		var result = await get(
	      "device/Handler_UserMachineEx_V1.ashx",
	      "user_machine_getconfig",
	      obj);
		 return result;
	}

	export const MachineList = async  function (obj){
		var result = await get(
	      "device/Handler_UserMachineEx_V1.ashx",
	      "user_machine_list",
	      obj);
		 return result;
	}


	export const MachineLocking = async  function (obj){
		var result = await get(
	      "device/Handler_UserMachineEx_V1.ashx",
	      "user_machine_setauth",
	      obj);
		 return result;
	}


	export const MachineErrorList = async  function (obj){
		var result = await get(
	      "device/Handler_DataError_V1.ashx",
	      "data_error_list",
	      obj);
		 return result;
	}


	export const orderMachineList = async  function (obj){
		var result = await get(
	      "device/Handler_OrderMachineEx_V1.ashx",
	      "order_machine_list",
	      obj);
		 return result;
	}


	export const  CustomerList = async function(obj){
		var result = await get(
          "customer/Handler_Customer_V1.ashx",
          "user_customer_list",
          obj);
		 return result;
	}


	export const  CustomerDel = async function(obj){
		var result = await get(
          "customer/Handler_Customer_V1.ashx",
          "user_customer_del",
          obj);
		 return result;
	}


	export const  CustomerEdit = async function(obj){
		var result = await get(
          "customer/Handler_Customer_V1.ashx",
          "user_customer_update",
          obj);
		 return result;
	}


	export const  CustomerAdd = async function(obj){
		var result = await get(
          "customer/Handler_Customer_V1.ashx",
          "user_customer_add",
          obj);
		 return result;
	}



	export const  orderList = async function(obj){
		var result = await get(
          "order/Handler_Order_V1.ashx",
          "order_list_page",
          obj);
		 return result;
	}


	export const  orderDel = async function(obj){
		var result = await get(
          "order/Handler_Order_V1.ashx",
          "order_del",
          obj);
		 return result;
	}

	export const  AddOrder = async function(obj){
		var result = await get(
          "order/Handler_Order_V1.ashx",
          "order_new",
          obj);
		 return result;
	}





	export const  productCategory = async function(obj){
		var result = await get(
          "product/Handler_ProductCategoryEx_V1.ashx",
          "product_category_list",
          obj);
		 return result;
	}













	/*
	  svg_txtValueRx
	  svg_txtValueRy
	  svg_txtValueRz
	  svg_txtMachineModel
	  svg_txtValueX
	  svg_txtValueY
	  svg_txtValueZ
	  svg_txtCyclePeriod
	  svg_txtCycleCount
	  svg_txtPowerOnTime
	  svg_txtRunTime
	  svg_txtRunSpeed
	  svg_txtErrorCount
	*/
	/*$('#'+"svg_txtValueX").html(obj.axis_angle[0].toFixed(1));
	$('#'+"svg_txtValueY").html(obj.axis_angle[1].toFixed(1));
	$('#'+"svg_txtValueZ").html(obj.axis_angle[2].toFixed(1));
	$('#'+"svg_txtValueRx").html(obj.axis_angle[3].toFixed(1));
	$('#'+"svg_txtValueRy").html(obj.axis_angle[4].toFixed(1));
	$('#'+"svg_txtValueRz").html(obj.axis_angle[5].toFixed(1));
	$('#'+"svg_txtCycleCount").html(obj.cycle_count);
	$('#'+"svg_txtCyclePeriod").html(obj.cycle_period.toFixed(1));
	$('#'+"svg_txtPowerOnTime").html(Math.trunc(obj.total_time_power_on));
	$('#'+"svg_txtRunTime").html(Math.trunc(obj.total_time_run));
	$('#'+"svg_txtErrorCount").html(obj.fault_count);*/


	/*const config=[
	  //第一台机器配置
	  {
	   	info: {
	    	      model: 'STR900',
	    	      mid: 'm_v9573514624',
	    	      did: 't_v9573514624',
	    	      brand: 'TOPSTAR',
	    	      tags: [ 'tag1', 'tag2'],
	    	      station_id: '80',
	    	      image: "/image/TSR-050-A.jpg",
	    	    },
	    datasource: {
	      mqtt: {
	        server: "mqtt://iec.top-link.me",
	        port : 9011,
	        topic: "topstarltd/iec/app/10001",
	      }
	    },
	    svg:"/svg/TSR-050-A.svg",
	      fields: [
	          {
	            id: "svg_txtValueRx",
	            attr: "html",
	            key: "axis_angle",
	          },{
	              id: "svg_txtValueRy",
	              attr: "fill",
	              key: "axis_angle",
	          },{
	              id: "svg_txtValueRz",
	              attr: "fill",
	              key: "axis_angle",
	          },{
	              id: "svg_txtValueX",
	              attr: "fill",
	              key: "axis_angle",
	          },{
	              id: "svg_txtValueY",
	              attr: "fill",
	              key: "axis_angle",
	          },{
	              id: "svg_txtValueZ",
	              attr: "fill",
	              key: "axis_angle",
	          },{
	              id: "svg_txtCyclePeriod",
	              attr: "fill",
	              key: "cycle_period",
	          },{
	              id: "svg_txtCycleCount",
	              attr: "fill",
	              key: "cycle_count",
	          },{
	              id: "svg_txtPowerOnTime",
	              attr: "fill",
	              key: "total_time_power_on",
	          },{
	              id: "svg_txtRunTime",
	              attr: "fill",
	              key: "total_time_run",
	          },{
	              id: "svg_txtRunSpeed",
	              attr: "fill",
	              key: "svg_txtRunSpeed",
	          },{
	              id: "svg_txtErrorCount",
	              attr: "fill",
	              key: "fault_count",
	          },{
	              id: "svg_txtMachineModel",
	              attr: "fill",
	              key: "svg_txtMachineModel",
	          },{
	              id: "svg_txtMachineID",
	              attr: "fill",
	              key: "svg_txtMachineID",
	          },{
	              id: "svg_gpi",
	              attr: "fill",
	              key: "svg_gpi",
	          },{
	              id: "svg_gpo",
	              attr: "fill",
	              key: "svg_gpo",
	          }
	      ]
	  }
	];*/

