<template>
    <div class="head">
        <span style="margin-right: 5px">亦尘的博客</span>
        <span>| 分享前端知识</span>
        <el-menu :default-active="this.$route.name == 'essay'? 'articles':this.$route.name" class="el-menu-demo" mode="horizontal" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item class="el-menu-item" index="main"><router-link to="/main">网站首页</router-link></el-menu-item>
            <el-menu-item index="articles"><router-link to="/articles">文章专栏</router-link></el-menu-item>
            <el-menu-item index="about"><router-link to="/about">关于本站</router-link></el-menu-item>
        </el-menu>
        <span class="login" @click="login">登 录</span>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return{
                activeIndex:'main'
            }
        },
        methods:{
            handleSelect(index){
                console.log(index)
            },
            login(){
                this.$axios({
                    method: 'get',
                    url: '/test/github/login',
                    params: {
                        path: 'http://localhost:8080'+this.$route.fullPath
                    }
                }).then((res)=>{
                    console.log(res)
                    window.location.href=res.data;
                })
            }
        },
        created() {

        }
    }
</script>

<style lang="scss">
    .head{
        position: fixed;
        top: 0;
        z-index: 1001;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 60px;
        background-color: #393d49;
        color:white;
        .el-menu-demo {
            padding-left: 55px;
            background-color: #393d49;
            .el-menu-item{
                color:white;
                font-size: 16px;
            }
        }
        .login{
            position: absolute;
            right: 100px;
            color: #9d9d9d;
            cursor: pointer;
        }
        .login:hover{
            color: white;
        }
        a{
            display: inline-block;
        }
    }
</style>