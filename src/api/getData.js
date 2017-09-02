
// import {exec_getData as get} from '@/fetch/fetch'
	const get=function (str,op,obj) {
		var promise=new Promise(function (resolve,reject) {
			var url =`http://iec.top-link.me/${str}`,
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
	}

	export const getConfig = async  function (obj){
		var promise=new Promise(function (resolve,reject) {
			var url =`http://iec.top-link.me/iec/Handler_MachineData_V1.ashx`,
				req = new TRequest(),
				op =  'iec_machine_config';
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
	}

	export const MachineList = async  function (obj){
		var result = await get(
	      "device/Handler_UserMachineEx_V1.ashx",
	      "user_machine_list",
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



	export const  orderList = async function(obj){
		var result = await get(
          "order/Handler_Order_V1.ashx",
          "order_list_page",
          obj);
		 return result;
	}







