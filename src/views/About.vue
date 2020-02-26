<template>
    <div class="about">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">关于本站</el-menu-item>
            <el-menu-item index="2">关于我</el-menu-item>
            <el-menu-item index="3">留言</el-menu-item>
        </el-menu>
        <div v-if="focusKey == 1" class="web">
            <div class="circle"></div>
            <div class="word">yichen</div>
            <div class="name">yichen</div>
            <div class="introduce">前端程序员的个人博客，记录自己在工作学习中的感悟，分享学到的知识及遇到的问题</div>
            <hr>
            <div style="text-align: center;vertical-align: middle">
                <a title="Github" href="https://github.com/Paulwyg/"><img src="../assets/github.jpg" class="github"></a>
                <a title="Github" href="https://blog.csdn.net/u014713031"><img src="../assets/csdn.jpg" class="csdn"></a>
            </div>
            <fieldset>
                <legend>简介</legend>
                <p style="margin:10px 20px 0 20px;line-height: 25px">&emsp;&emsp;本博客是使用JavaScript开发的系统。前台使用vue框架，element组件库。后台使用koa框架，数据库使用的MySQL
                ，这里使用的ORM框架Sequelize操作数据库，nginx作为web服务器。后台服务器使用的是腾讯云，为了安全使用的是HTTPS。</p>
                <p style="margin:0 20px 10px 20px;line-height: 25px">&emsp;&emsp;现在已完成基本功能开发，后续继续完善功能和页面。本博客为实验之作，还有诸多不足之处，欢迎提出宝贵意见。</p>
            </fieldset>
        </div>
        <div v-if="focusKey == 2" class="me" style="text-align: center;">
             <div style="margin-top: 20px">
                <img src="../assets/me.jpg" class="myPicture">
             </div>
             <div>
               <span style="font-size: 30px">亦尘</span>
             </div>
        </div>
        <div v-if="focusKey == 3" class="message">


        </div>
        <!--<h1>This is an about page</h1>-->
        <!--<h2>num:{{$store.state.count}}</h2>-->
    </div>
</template>
<script>
    export default {
        name: 'about',
        data() {
            return {
                activeIndex: '1',
                focusKey:'1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.focusKey=key
            }
        },
        created() {
            // console.log("成功啦")
            // this.$store.dispatch('incrementAsync', {
            //   amount: 10
            // })
        }
    }
</script>
<style lang="scss">
    .about {
        position: relative;
        width: 1000px;
        margin: 0 auto;
        margin-top: 80px;
        margin-bottom: 30px;
        padding: 5px 20px 5px 20px;
        left: 0;
        right: 0;
        text-align: left;
        min-height: 809px;
        box-shadow: 0 0 10px 2px #666;
        background-color: white;
        .el-menu-demo{
            padding-left:350px;
        }
        .circle {
            width: 160px;
            height: 160px;
            background: #393d49;
            border-radius: 80px;
            margin: 20px auto;
        }
        .word{
            position: absolute;
            font-size: 60px;
            left: 50%;
            margin-left: -55px;
            top: 125px;
            color: white;
            font-family:"Curvic";

        }
        @font-face {
            font-family:"Curvic";
            src:url("../../public/font/CURVIC__.eot?") format("eot"),
            url("../../public/font/CURVIC__.woff") format("woff"),
            url("../../public/font/CURVIC__.ttf") format("truetype"),
            url("../../public/font/CURVIC__.svg#Curvic") format("svg");
            font-weight:normal;
            font-style:normal;
        }
        .name{
            text-align: center;
            font-size: 40px;
            font-family: herculanum,fantasy;
        }
        .introduce{
            text-align: center;
            font-size:20px;
            line-height: 50px;
        }
        hr{
            background-color: #e6e6e6;
            height: 1px;
            margin: 10px 0;
            border: 0;
            clear: both;
        }
        .github{
            position: relative;
            top: -25px;
            height: 50px;
            width: 50px;
            margin-right: 20px;
            cursor: pointer;
        }
        .csdn{
            height: 100px;
            width: 100px;
            cursor: pointer;
        }
        fieldset{
            margin: 10px 0 20px;
            border-width: 1px 0 0;
        }
        legend{
            margin:0 auto;
            border-color: #e6e6e6;
            padding: 0 10px;
            font-size: 20px;
            font-weight: 300;
        }
        .myPicture{
            width: 160px;
            height: 160px;
            border-radius: 80px;
            border:1px solid #ccc;
            box-shadow:3px 3px 4px #ccc;
        }
    }
</style>