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
             <div style="margin-top: 10px">
               <span style="font-size: 30px;">亦尘</span>
             </div>
             <p style="font-size: 20px">90后码农，前端攻城狮，目标全栈工程师</p>
            <fieldset>
                <legend>简介</legend>
                <h2 style="text-align: left;margin-left: 20px">我是谁</h2>
                <p style="margin:10px 20px 0 20px;line-height: 25px;text-align: left;">&emsp;&emsp;马上进入而立之年的不服输的年轻人，在前端的道路上狂奔。喜欢唱歌，篮球，乒乓球...
                要做的事情很多，但时间却很少。加油，加油，加油！！！</p>
                <h2 style="text-align: left;margin-left: 20px">我在做什么</h2>
                <p style="margin:10px 20px 0 20px;line-height: 25px;text-align: left;">&emsp;&emsp;现就职于一家从事智慧照明行业的国企，负责监控软件的前端开发，
                技术栈为VUE(3.0出来了，学习永无止境...)，熟练使用git，webpack，也会自己玩儿node，小程序，移动端接触的比较少，未来要努力。</p>
                <h2 style="text-align: left;margin-left: 20px">我要做什么</h2>
                <p style="margin:10px 20px 0 20px;line-height: 25px;text-align: left;">&emsp;&emsp;现在才知一入前端深似海，要学的很多，框架一直在变，不变的是底层原理，未来要深耕源码，
                同时了解技术的最新动态，注重深度的同时也要兼顾广度，我要成为牛叉的全栈攻城狮。</p>
            </fieldset>
        </div>
        <div v-if="focusKey == 3" class="message">
             <div style="margin-top: 20px;text-align: center">
                <img src="../assets/message.jpg" class="myPicture">
             </div>
             <div style="margin-top: 10px;text-align: center">
               <span style="font-size: 30px;">留言板</span>
             </div>
             <p style="font-size: 20px;text-align: center">欢迎各位留言，提出宝贵意见</p>
             <hr>
             <div class="comments">
            <div class="title1">发表评论</div>
            <!--<textarea style="height: 100px;width: 980px;">测试</textarea>-->
            <vue-ueditor-wrap v-model="msg" :config="config"></vue-ueditor-wrap>
            <button class="btn" @click="submit">提交评论</button>
            <button class="btn1" @click="cancel" v-show="isVisi">取消回复</button>
            <div class="new">最新评论</div>
            <div class="content-parent">
                <div v-for="item in commonts" :key="item.id" style="border-bottom: 1px dashed #e0e0e0;">
                    <img :src="item.icon">
                    <div class="username">{{item.name}}</div>
                    <div class="content" v-html="item.content"></div>
                    <div class="time">
                        <span>{{utils.timestampToTime(item.date)}}</span>
                        <a @click="reply(item)">回复</a>
                    </div>
                    <div class="reply" v-for="reply in item.children" :key="reply.id">
                        <img :src="reply.icon">
                        <div class="username">{{reply.name}}</div>
                        <div class="content" v-html="reply.content"></div>
                        <div class="time">
                            <span>{{utils.timestampToTime(reply.date)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!--<h1>This is an about page</h1>-->
        <!--<h2>num:{{$store.state.count}}</h2>-->
    </div>
</template>
<script>
    import VueUeditorWrap from 'vue-ueditor-wrap'
    export default {
        name: 'about',
        components: {
            VueUeditorWrap
        },
        data() {
            return {
                activeIndex: '1',
                focusKey:'1',
                msg:'',
                isVisi:false,
                config: {
                    UEDITOR_HOME_URL: '/UEditor/'  // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
                },
                commonts:[]
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.focusKey=key
            },
            submit(){

            },
            cancel(){

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
    @import "../common/font/stylesheet.css";
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
        min-height: 789px;
        box-shadow: 0 0 10px 2px #666;
        background-color: white;
        .el-menu-demo{
            padding-left:350px;
        }
        .el-menu-item{
            font-size: 16px;
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
            font-size: 30px;
            left: 50%;
            margin-left: -73px;
            top: 148px;
            color: white;
            font-family: "Curvic";

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
        .comments {
            position: relative;
            margin-top: 20px;
            margin-bottom: 20px;
            #edui1 {
                z-index: 1 !important;
            }
            .title1 {
                font-size: 18px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                color: #484848;
                font-weight: normal;
                position: relative;
                margin-bottom: 10px;
                text-align: left;
                /*margin-left: 20px;*/
                margin-right: 20px;
            }
        ;
            .title1:after {
                content: "";
                position: absolute;
                width: 60px;
                height: 2px;
                background: #000;
                left: 0;
                bottom: 0;
                -moz-transition: all .5s ease;
                -webkit-transition: all .5s ease;
                transition: all .5s ease;
            }
        ;
            .title1:hover:after {
                width: 80px;
            }
        ;
            .btn {
                width: 75px;
                height: 30px;
                border: none;
                border-radius: 5px;
                background-color: #009688;
                color: white;
                cursor: pointer;
                margin-top: 10px;
            }
            .btn1 {
                width: 75px;
                height: 30px;
                border-radius: 5px;
                background-color: white;
                color: black;
                cursor: pointer;
                margin-top: 10px;
                border: #ccc 1px solid;
            }
        ;
            .new {
                border-bottom: 1px solid #009688;
                font-size: 15px;
                font-weight: 500;
                padding: 0 0 5px;
                margin-top: 20px;
                margin-bottom: 5px;
                margin-right: 20px;
                color: #01aaed;
            }
        ;
            .content-parent {
                margin-right: 20px;
                img {
                    width: 45px;
                    height: 45px;
                    margin: 5px 5px 5px 0;
                    position: absolute;
                    border-radius: 50px;
                }
            ;
                .username {
                    color: #01aaed;
                    font-size: 14px;
                    margin-left: 53px;
                    padding-top: 5px;
                }
            ;
                .content {
                    margin-left: 53px;
                    padding-top: 5px;
                    padding-bottom: 10px;
                    line-height: 25px;
                }
            ;
                .time {
                    margin-left: 53px;
                    padding-bottom: 5px;
                    a {
                        color: #009688;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
                .reply {
                    margin-left: 53px;
                    padding-left: 8px;
                    border-left: 4px solid #c5c5c5
                }
            }
        }
    }
</style>