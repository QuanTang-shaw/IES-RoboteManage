const get=function (str,op,obj) {
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
	}