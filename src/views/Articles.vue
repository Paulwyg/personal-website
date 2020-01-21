<template>
    <div class="articles">
        <div class="middle">
            <div style=" width: 750px;margin-right: 5%;">
                <div class="article shadow" v-for="article in articles" :key="article.id">
                    <div class="flag flag-left" v-if="article.stick">置顶</div>
                    <a class="picture"><img :src="article.icon"></a>
                    <div>
                        <h2 @click="nav(article)" style="cursor: pointer">{{article.title}}</h2>
                        <p>{{article.content}}</p>
                        <div>
                            <span class="label">&ensp; &ensp; {{article.label}}</span>
                            <span class="view">&ensp; &ensp; {{article.viewers}}</span>
                            <span class="date">&ensp; &ensp; {{article.date}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div style="text-align: left;margin-bottom: 20px;width: 95%">
                    <el-input v-model="input" placeholder="请输入内容" style="width: 300px;"></el-input>
                    <input type="button" value="搜索" class="btn"/>
                </div>
                <div class="card shadow">
                    <h2 class="title">最近更新</h2>
                    <div v-for="news in recentArticles" :key="news.id">
                        <p class="update">{{news.title}}</p>
                    </div>
                </div>
                <div class="card shadow">
                    <h2 class="title">热门标签</h2>
                    <div class="tag">
                        <el-tag>javascript</el-tag>
                        <el-tag type="success">vue</el-tag>
                        <el-tag type="info">node</el-tag>
                        <el-tag type="warning">css</el-tag>
                        <el-tag type="danger">echarts</el-tag>
                        <el-tag>nginx</el-tag>
                        <el-tag type="success">webpack</el-tag>
                        <el-tag type="info">git</el-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "articles",
        data() {
            return {
                input:'',
                articles: [{
                    id: 1,
                    stick: true,
                    icon: require("../assets/picture1.jpg"),
                    label: 'javascript',
                    viewers: 200,
                    comments: 15,
                    date: '2019-12-31 14:15:34',
                    title: 'JavaScript中的this详解',
                    content: 'this关键字是JavaScript中最复杂的机制之一，掌握了它就掌握了进入JavaScript的魔法，它值得我们付出大量时间去学习'
                }, {
                    id: 2,
                    stick: true,
                    icon: require("../assets/picture1.jpg"),
                    label: 'node',
                    viewers: 340,
                    comments: 35,
                    date: '2019-06-27 14:02:18',
                    title: 'express中实现加密JWT（JSON Web Token）',
                    content: 'express中实现JWT（JSON Web Token）JWT（JSON Web Token）JWT数据结构JWT头有效荷载签名JWT工作过程express实现过程express部分前端部分JWT优缺点...'
                }, {
                    id: 3,
                    stick: false,
                    icon: require("../assets/picture1.jpg"),
                    label: 'echarts',
                    viewers: 340,
                    comments: 35,
                    date: '2020-01-01 13:30:08',
                    title: 'Echarts源码的使用',
                    content: 'Echarts是一个使用 JavaScript 实现的开源可视化库，它提供了许多直观，交互丰富，可高度个性化定制的数据可视化图表。但同时好多高度定制化的...'
                }, {
                    id: 4,
                    stick: false,
                    icon: require("../assets/picture1.jpg"),
                    label: 'javascript',
                    viewers: 340,
                    comments: 35,
                    date: '2019-07-11 08:50:28',
                    title: '面向对象的程序设计',
                    content: '对于面向对象的程序设计的理解 理解对象 对象的定义：无序属性的集合，其属性可以包含基本值、对象或者函数...'
                }],
                sliderShow: [{
                    id:1,
                    src: require('../assets/timg.jpg'),
                    txt: '图片1'
                }, {
                    id:2,
                    src: require('../assets/timg.jpg'),
                    txt: '图片2'
                }, {
                    id:3,
                    src: require('../assets/timg.jpg'),
                    txt: '图片3'
                }, {
                    id:4,
                    src: require('../assets/timg.jpg'),
                    txt: '图片4'
                }],
                recentArticles: [{
                    id: 1,
                    title: 'JavaScript中的this详解',
                    content: ''
                }, {
                    id: 2,
                    title: 'express中实现加密JWT（JSON Web Token）',
                    content: ''
                }, {
                    id: 3,
                    title: 'Echarts源码的使用',
                    content: ''
                }, {
                    id: 4,
                    title: ' 面向对象的程序设计',
                    content: ''
                }]
            }
        },
        methods:{
            nav(article){
                this.$router.push({
                    path: '/essay',
                    query: {
                        label: article.label,
                        viewers: article.viewers,
                        comments: article.comments,
                        date: article.date,
                        title: article.title,
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .articles {
        position: relative;
        width: 1300px;
        margin: 0 auto;
        margin-top: 80px;
        margin-bottom: 30px;
        left: 0;
        right: 0;
        box-shadow: 0 0 10px 2px #666;
        display: flex;
        flex-direction: column;
        background-color: #eee;
        min-height: 909px;

        .middle {
            flex: 1;
            display: flex;
            justify-content: center;
            margin-top: 10px;

            .article {
                position: relative;
                margin-bottom: 10px;
                display: flex;
                background-color: white;
                text-align: left;
                overflow: hidden;

                .picture img {
                    width: 200px;
                    height: 150px;
                    margin: 20px;
                }
            ;

                .flag {
                    position: absolute;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    width: 74px;
                    background-color: #ff5722;
                    color: #fff;
                }

                .flag-left {
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                    left: -18px;
                    top: 9px;
                    z-index: 999;
                }

                .label {
                    background: url("../assets/label.png") no-repeat left center;
                    width: 100px;
                    margin-right: 20px;
                }
            ;

                .view {
                    background: url("../assets/viewer.png") no-repeat left center;
                    width: 100px;
                    margin-right: 20px;
                }

                .date {
                    background: url("../assets/date.png") no-repeat left center;
                    width: 100px;
                }
            }

            .right {
                display: flex;
                flex-direction: column;
                /*justify-content: center;*/
                width: 400px;
                overflow: auto;

                .card {
                    width: 95%;
                    background: white;
                    margin-bottom: 20px;

                    img {
                        width: 200px;
                        height: 200px;
                        margin-bottom: 20px;
                    };
                    .title {
                        font-size: 16px;
                        line-height: 40px;
                        border-bottom: 1px solid #eee;
                        color: #484848;
                        font-weight: normal;
                        position: relative;
                        margin-bottom: 10px;
                        text-align: left;
                        margin-left: 20px;
                        margin-right: 20px;
                    };
                    .title:after {
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
                    };
                    .title:hover:after {
                        width: 80px;
                    };
                    .update {
                        text-align: left;
                        margin-left: 20px;
                        cursor: pointer;
                    };
                    .tag{
                        text-align: left;
                        margin: 20px;
                        cursor: pointer;
                        .el-tag{
                            margin-bottom: 10px;
                            margin-left: 10px;
                            font-size: 14px;
                        }
                    };
                };
                .btn{
                    width: 75px;
                    height: 38px;
                    border: none;
                    border-radius: 5px;
                    background-color: white;
                    cursor: pointer;
                }
            }
        }

        .shadow {
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
            border-radius: 1px;
        }
    }
</style>