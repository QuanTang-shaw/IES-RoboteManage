<template>
	<div >
		<Row class="grid" type="flex" justify="space-between">
	        <Col class="devNav" span="6" style="">
		        <div>
		        	<div class="devItem" v-for="(dev,index) in devList" @click="devPostion(dev,index)">
			        	<Row type="flex" justify="center" align="middle" style="height:100%;">
		        	        <Col span="6" style="border:solid 0px;">
			        	        <span class="numIcon">{{index+1}}</span>
		        	        </Col>
		        	        <Col span="18">
	        	        		<div style="font-size: 16px;">
		        	        		<p>型号:<strong>{{dev.strProductModel}}</strong></p>
		        	        		<p>编号:<strong>{{dev.strMachineSN}}</strong></p>
	        	        		</div>
		        	        </Col>
		        	    </Row>
		        	</div>
		        	<Page class="devMapPage" @on-change="togglePage" :page-size="7" :total="totalCount" size="small"></Page>
		        </div>
	        </Col>
	        <Col span="18" >
	        	<div class="amap-wrapper" style="border:solid 0px;">
	              <el-amap
		             ref="map"
	                 vid="amapDemo"
	                 :center="center"
	                 :zoom="zoom"
	                 class="amap-demo"
	                 >
	                 <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>
	                 <el-amap-info-window v-for="(window,index) in windows" :key="index" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
	               </el-amap>
	            </div>
	        </Col>
	    </Row>
	</div>
</template>
<script>
	import {MachineList} from '@/api/getData'
	export default{
		data: function() {
			let self = this;
			return {
				devList:[],
				zoom: 4,
				currentPage:0,
				totalCount:0,
				center: [107.004124,36],
				markers: [],
				windows:[],
				// markerRefs: [],
				/*events: {
					init(o) {
						setTimeout(() => {
							// console.log(self.markerRefs);
							let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
							  gridSize: 80,
							  renderCluserMarker: self._renderCluserMarker
							});
							// console.log(cluster);
						}, 1000);
					}
				}*/
			};
		},
		created() {
			let self = this;
			this.initDevData();
			/*AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
			    //启动页面
			    initPage(SimpleMarker);
			    // console.log(SimpleMarker)
			});
			function initPage(SimpleMarker) {

			    //创建SimpleMarker实例
			    new SimpleMarker({
			        //前景文字
			        iconLabel: '1',
			        //背景图标样式
			        iconStyle: 'red',

			        //...其他Marker选项...，不包括content
			        map: self.$refs.map.$$getInstance(),
			        position: [116.405285, 39.904989],
			        events: {
				              click() {
				              	console.log(this)
				                self.windows.forEach(window => {
				                  window.visible = false;
				                });

				                self.$nextTick(() => {
				                  self.windows[index].visible = true;
				                });
				              }
				            }
			    });

			    //创建SimpleMarker实例
			    new SimpleMarker({
			        //前景文字
			        iconLabel: {
			            innerHTML: '<i>2</i>', //设置文字内容
			            style: {
			                color: '#fff' //设置文字颜色
			            }
			        },
			        //背景图标样式
			        iconStyle: 'black',

			        //...其他Marker选项...，不包括content
			        map: self.$refs.map.$$getInstance(),
			        position: [116.305285, 39.904989]
			    });
			}*/
		},
		methods: {
			togglePage(index){
				this.currentPage=--index;
				this.initDevData();
			},
			devPostion(dev,index){
				console.log(dev);
				this.center=[];
				this.center=[dev.fDeviceMapLongitude,dev.fDeviceMapLatitude];
				this.zoom=12;
				/*this.windows.forEach(window => {
                  window.visible = false;
                });

                this.$nextTick(() => {
                  this.windows[index].visible = true;
                });*/
				/*this.center[0]=dev.fDeviceMapLongitude;
				this.center[1]=dev.fDeviceMapLatitude;*/
			},
			async initDevData(){
				let self=this;
				const list=await MachineList({
				        nPageIndex: this.currentPage,
				        nPageSize: 7,
				        strKeyWord: "",
				        uCustomerUUID: -1,
				        uLocationUUID: -1,
				        uProductUUID: -1,
				        nDeviceStatus: -1,
				        uDeviceUUID: -1
				    });
				console.log(list)
				this.totalCount=list.obj.totalcount
				if(list.obj.hasOwnProperty('objectlist')){
					this.devList=list.obj.objectlist;
					this.markers=[];
					this.windows=[];
					list.obj.objectlist.forEach((ele, index)=> {

						this.markers.push({
							position:[ele.fDeviceMapLongitude,ele.fDeviceMapLatitude],
							content:`<div class="amap-marker marker-${index}"></div>`,
							events: {
				              click() {
				              	// console.log(this)
				                self.windows.forEach(window => {
				                  window.visible = false;
				                });

				                self.$nextTick(() => {
				                  self.windows[index].visible = true;
				                });
				              }
				            }
						});
						this.windows.push({
							position:[ele.fDeviceMapLongitude,ele.fDeviceMapLatitude],
							content:`<div class="prompt">订单创建时间:
										<span>${ele.dtDeviceActiveDateTimeB}</span></div>`,
							visible:false
						});

					});
				}
				// console.log(this.markers);
			}
		}
	}
</script>
<style>
	.grid{
		border:solid 1px #E2E2E2;
		height:600px;
	}
	.devNav{
		height:100%;
		/*background-color:#efefef;*/
	}
	.numIcon{
		background-color:#F53131;
		padding:4px 10px;
		color:white;
		border-radius:100px;
		margin-left:10px;
	}
	.amap-wrapper {
		width: 100%;
		/*height: 100%;*/
	  /*width: 900px;*/
	  height: 600px;
	}
	.devItem{
		/*border:solid 1px #E1D9D9;*/
		border-bottom: solid 1px #F6F6F6;
		height: 80px;
		cursor: pointer;
	}
	.devItem:hover{
		background-color: #F2F2F2;
	}
	.prompt {
      /*text-align: center;*/
      background: white;
      width: 250px;
      height: 50px;
      font-size:15px;
    }
    .devMapPage{
    	position: absolute;
    	bottom: 10px;
    	left: 8px;
    }
    .amap-marker{
    	position: absolute;
	    width: 25px;
	    height: 34px;
	    background: url(../assets/poi-marker.png) no-repeat;
	    cursor: pointer;
	    background-size: 437px 267px;
	    background-position: -359px -3px;
    }
    .marker-0 {
        background-position: -8px -138px;
    }
    .marker-1 {
        background-position: -52px -138px;
    }
    .marker-2 {
        background-position: -96px -138px;
    }
    .marker-3 {
        background-position: -140px -138px;
    }
    .marker-4 {
        background-position: -184px -138px;
    }
    .marker-5 {
        background-position: -228px -138px;
    }
    .marker-6 {
        background-position: -272px -138px;
    }
    .marker-7 {
        background-position: -316px -138px;
    }
    .marker-8 {
        background-position: -360px -138px;
    }
    .marker-9 {
        background-position: -404px -138px;
    }
    .marker-10 {
        background-position: -8px -92px;
    }
    .marker-11 {
        background-position: -52px -92px;
    }
    .marker-12 {
        background-position: -96px -92px;
    }
    .marker-13 {
        background-position: -140px -92px;
    }
    .marker-14 {
        background-position: -184px -92px;
    }
    .marker-15 {
        background-position: -228px -92px;
    }
    .marker-16 {
        background-position: -272px -92px;
    }
    .marker-17 {
        background-position: -316px -92px;
    }
    .marker-18 {
        background-position: -360px -92px;
    }
    .marker-19 {
        background-position: -404px -92px;
    }
</style>