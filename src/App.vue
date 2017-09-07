<template>
    <div class="layout">
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="height:60px;border-bottom:solid 1px #F0F0F0;background-color:#FFFFFF;">
            <Col span="4" style="border:solid 0px;">
                <img src="../static/img/TOP-STAR-LOGO.png" alt="" height="40px;">
            </Col>
            <Col span="9" style="border:solid 0px;">
                <h1 style="color:#4A4343; font-size:35px;">拓斯达工业云平台</h1>
            </Col>
            <Col span="7" style="border:solid 0px;">
                <Input icon="search" placeholder="请输入点什么..."></Input>
            </Col>
            <Col span="1" style="border:solid 0px;">
                <Dropdown style="margin-left: 20px">
                    <img src="../static/img/guy-3.jpg" alt="" style="border-radius:50px;width:35px;">
                    <Dropdown-menu slot="list">
                        <Dropdown-item>个人信息</Dropdown-item>
                        <Dropdown-item>账号管理</Dropdown-item>
                        <Dropdown-item>密码管理</Dropdown-item>
                        <Dropdown-item divided>退出</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </Col>
            <Col span="2">
                <img src="../static/img/flage.jpg" alt="" style="height:30px;">
            </Col>
        </Row>
        <Row type="flex" class="layout-wrap">
            <i-col span="4" class="layout-menu-left">
                <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="router">
                   <!--  <div class="layout-logo-left">
                       <img src="../static/img/53007d5b00000.png" alt="LOGO">
                       <img src="../static/img/TOP-STAR-LOGO.png" alt="LOGO">
                   </div> -->
                    <!-- <Menu-item name="0">
                        <Icon type="home"></Icon>
                        首页
                    </Menu-item> -->
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            生产设备管理
                        </template>
                        <Menu-item :name="`1-${index+1}`" :key="index" v-for="(menu,index) in routerMenu.factoryDevManage" >
                            {{menu.text}}
                            <!-- <router-link class="router-link" to="/">工厂管理</router-link> -->
                        </Menu-item>
                    </Submenu>
                    <!-- <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            报表管理
                        </template>
                        <Menu-item :name="`2-${index+1}`" :key="index" v-for="(menu,index) in routerMenu.reportManage">{{menu.text}}</Menu-item>
                    </Submenu> -->
                </Menu>
            </i-col>
            <i-col span="20">
                <!-- <div class="layout-header" style="background-color:#f8f8f9;">
                    <Row :gutter="16" type="flex" justify="center" align="middle" class="code-row-bg" style="height:100%;">
                        <Col span="10" style="border:solid 0px;">
                            <h1 style="color:#0B0303; font-size:35px;">智能工厂管理系统</h1>
                        </Col>
                        <Col span="7" style="border:solid 0px;">
                            <Input icon="search" placeholder="请输入点什么..."></Input>
                        </Col>
                        <Col span="3" style="border:solid 0px;">
                            <Dropdown style="margin-left: 20px">
                                <img src="../static/img/guy-3.jpg" alt="" style="border-radius:50px;width:35px;">
                                <Dropdown-menu slot="list">
                                    <Dropdown-item>个人信息</Dropdown-item>
                                    <Dropdown-item>账号管理</Dropdown-item>
                                    <Dropdown-item>密码管理</Dropdown-item>
                                    <Dropdown-item divided>退出</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                        </Col>
                        <Col span="2">
                            <img src="../static/img/flage.jpg" alt="" style="height:30px;">
                        </Col>
                    </Row>
                </div> -->
                <div class="layout-breadcrumb">
                    <!-- <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">{{BreadcrumbText}}</Breadcrumb-item>
                        <Breadcrumb-item>{{SubBreadcrumbText}}</Breadcrumb-item>
                    </Breadcrumb> -->
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <div style="border-bottom:solid 1px #DCD9D9;padding:10px 0;margin-bottom:15px;">{{SubBreadcrumbText}}</div>
                        <router-view class="viewTwo"></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    <span>CopyRight(C)TOP-LINK 智能制造2025</span>
                    <span style="margin-left:25px;">深圳市拓联智能信息技术有限公司</span>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                routerMenu:{
                    factoryDevManage:[
                      {
                        path:'/DevList',
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
                    ],
                    reportManage:[{
                         path:'/report',
                         text:'报表管理',
                         isActive:false
                    }]
                },
                BreadcrumbText:'生产设备管理',
                SubBreadcrumbText:'工厂管理',
            }
        },
        methods:{
            router:function(name){
                let str=name.split(''),
                    item0=parseInt(str.shift()),
                    item1=parseInt(str.pop());
                if(item0==1){
                    this.$router.push(this.routerMenu.factoryDevManage[item1-1].path);
                    this.BreadcrumbText='生产设备管理';
                    this.SubBreadcrumbText=this.routerMenu.factoryDevManage[item1-1].text;
                }
                else{
                    this.$router.push(this.routerMenu.reportManage[item1-1].path);
                    this.BreadcrumbText='报表管理';
                    this.SubBreadcrumbText=this.routerMenu.reportManage[item1-1].text;
                }
                // console.log(this.$router);
            }
        },
        created(){
            this.$router.push(this.routerMenu.factoryDevManage[0].path);
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        /*width:90%;*/
        /*margin:0 auto;*/
    }
    .layout-wrap{min-height:694px;}
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
        min-height: 590px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        bottom: 0;
        /*position: absolute;*/
        right: 0;
        left: 0;
        background-color: #d4e1ec;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
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
    .fileUpload:hover{border:dotted 1px #FB4242;}
</style>