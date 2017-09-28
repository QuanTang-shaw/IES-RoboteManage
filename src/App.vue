+<template>
    <div class="layout">
        <Row class="layout-header" type="flex" justify="center" align="middle">
            <Col span="4" style="border:solid 0px;">
                <img src="../static/img/TOP-STAR-LOGO.png" alt="" height="40px;">
            </Col>
            <Col span="9" style="border:solid 0px;">
                <h1 style="color:#4A4343; font-size:35px;">拓斯达工业云平台</h1>
            </Col>
            <Col span="7" style="border:solid 0px;">
                <Input disabled icon="search" placeholder="请输入点什么..."></Input>
            </Col>
            <Col span="1" style="border:solid 0px;">
                <Dropdown @on-click="accountOper" style="margin-left: 20px">
                    <img src="../static/img/guy-3.jpg" alt="" style="border-radius:50px;width:35px;">
                    <Dropdown-menu slot="list">
                        <Dropdown-item name="userInfo">用户信息</Dropdown-item>
                        <!-- <Dropdown-item>账号管理</Dropdown-item>
                        <Dropdown-item>密码管理</Dropdown-item> -->
                        <Dropdown-item divided name="logOut">退出</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </Col>
            <Col span="2">
                <!-- <img src="../static/img/flage.jpg" alt="" style="height:30px;"> -->
            </Col>
        </Row>
        <Row type="flex" class="layout-wrap">
            <i-col span="4" class="layout-menu-left">
                <Menu ref="nav" active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="setRouter">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-gear"></Icon>
                            设备管理
                        </template>
                        <Menu-item :name="`1-${index+1}`" :key="index" v-for="(menu,index) in routerMenu.DevManage" >
                            {{menu.text}}
                            <!-- <router-link class="router-link" to="/">工厂管理</router-link> -->
                        </Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="20">
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">{{BreadcrumbText}}</Breadcrumb-item>
                        <Breadcrumb-item>{{SubBreadcrumbText}}</Breadcrumb-item>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <div style="border-bottom:solid 1px #DCD9D9;padding:10px 0;margin-bottom:15px;">{{SubBreadcrumbText}}</div>
                        <router-view class="viewTwo"></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    <span >CopyRight &copy; TOPSTAR</span>
                    <span style="margin-left:25px;">拓斯达科技</span>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import {logOut,getConfig} from '@/api/getData'
    export default {
        data(){
            return{
                routerMenu:{
                    DevManage:[
                      {
                        path:'/devList',
                        text:'机器列表',
                        isActive:false
                      },
                      {
                        path:'/customerList',
                        text:'客户列表',
                        isActive:false
                      },
                      {
                        path:'/orderManage/orderList',
                        text:'订单列表',
                        isActive:false
                      },
                      {
                        path:'/mapNav',
                        text:'设备地图',
                        isActive:false
                      },
                      {
                        path:'/userInfo',
                        text:'用户信息',
                        isActive:false
                      }
                    ]
                },
                BreadcrumbText:'生产设备管理',
                SubBreadcrumbText:'机器列表',
            }
        },
        methods:{
            setRouter(name){
                let str=name.split(''),
                    item0=parseInt(str.shift()),
                    item1=parseInt(str.pop());
                if(item0==1){
                    this.$router.push(this.routerMenu.DevManage[item1-1].path);
                    this.BreadcrumbText='生产设备管理';
                    this.SubBreadcrumbText=this.routerMenu.DevManage[item1-1].text;
                }
                else{
                    this.$router.push(this.routerMenu.reportManage[item1-1].path);
                    this.BreadcrumbText='报表管理';
                    this.SubBreadcrumbText=this.routerMenu.reportManage[item1-1].text;
                }
                // console.log(this.$router);
            },
            accountOper(value){
                if(value=="logOut"){
                    sessionStorage.clear();
                    /*window.location.href="http://user.topstarltd.com/login/login.html?redirect=http://iec.topstarltd.com";*/
                    window.location.href="http://iec.topstarltd.com/Handler_LogOut_Do.ashx";
                    // logOut({}).then(data=>console.log(data),err=>console.log(err));
                    // window.location.reload();
                }
                if(value=="userInfo"){
                    // this.$router.push('userInfo');
                    this.$refs.nav.currentActiveName='1-5';
                    this.$refs.nav.$emit('on-select','1-5');
                    // console.log(this.$refs.nav.$emit('on-select','1-5'));
                }
            },
        },
        created(){
            this.$router.push(this.routerMenu.DevManage[0].path);
        },
        beforeCreate(){
            let userID=GetQueryString("useruuid");
            let userName=GetQueryString("username");
            // console.log(sessionStorage.userID==undefined);
            if((userID==null||userName==null)&&
                (sessionStorage.userID==undefined||sessionStorage.userName==undefined)
                ){
               /*window.location.href="http://user.topstarltd.com/login/login.html?redirect=http://localhost:8080";*/
               /*window.location.href="http://user.topstarltd.com/login/login.html?redirect=http://iec.topstarltd.com";*/
            }
            else if(sessionStorage.userID==undefined||sessionStorage.userName==undefined){
                sessionStorage.setItem("userID",userID);
                sessionStorage.setItem("userName",userName);
            }
            function GetQueryString(name){
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            }
        }
    }
</script>
<style>
    html,body{height: 100%;}
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        /*font-size:1.5em;*/
        /*width:90%;*/
        /*margin:0 auto;*/
        height: 100%;
    }
    .layout-header{
        /*height:70px;*/
        height: 8%;
        border-bottom:solid 1px #F0F0F0;
        background-color:#FFFFFF;
    }
    .layout-wrap{
        /*min-height:878px;*/
        min-height: 92%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        overflow: visible;
    }
    .layout-content-main{
        padding: 0px 10px 25px;
        font-size:20px;
        min-height: 785px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        bottom: 0;
        /*position: absolute;*/
        right: 0;
        left: 0;
        background-color: #f5f7f9;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-logo-left{
        width: 90%;
        height: 40px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-logo-left img{
        height:100%;
    }
    .viewTwo{
        min-height:490px;
        /*border: solid 1px #E3DFDF;*/
        position: relative;
    }
    .viewTwo .page{
        margin:30px 10px;
    }
    .warmTitle{
        color: #FC0808;
    }
    .fileUpload img{
        width:120px;
    }
    .fileUpload{
        border: dotted 1px #FAAFAF;
        border-radius:3px;
        display: inline-block;
        cursor:pointer;
    }
    /*.fileUpload:hover{border:dotted 1px #FB4242;}
    .ivu-menu-submenu-title{
        font-size: 25px;
    }
    .ivu-table-header,.ivu-table-body,.ivu-menu-item{
        font-size: 20px;
    }
   .ivu-menu-item{font-size:18px;}
   .ivu-table{font-size: 16px;}
   .ivu-menu{font-size: 20px;}
   .ivu-table th{
       height: 50px;
   }*/
</style>