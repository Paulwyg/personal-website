<template>
    <div class="articles">
        <div class="middle">
            <div style=" width: 750px;margin-right: 2%;margin-left: 2%;">
                <div class="article shadow" v-for="article in selectedArticles" :key="article.id">
                    <div class="flag flag-left" v-if="article.stick">置顶</div>
                    <a class="picture"><img :src="article.icon"></a>
                    <div>
                        <h2 @click="nav(article)" style="cursor: pointer">{{article.title}}</h2>
                        <p>{{article.content}}</p>
                        <div>
                            <span class="label">&ensp; &ensp; {{article.label}}</span>
                            <span class="view">&ensp; &ensp; {{article.viewers}}</span>
                            <span class="date">&ensp; &ensp; {{utils.timestampToTime(article.date)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div style="text-align: left;margin-bottom: 20px;width: 95%">
                    <el-input v-model="input" placeholder="请输入内容" style="width: 235px;"></el-input>
                    <input type="button" value="搜索" class="btn" @click="search"/>
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
                        <el-tag v-for="item in tagItem" :key="item.name" :type="item.type" @click="tagChoose(item.name)">{{item.name}}</el-tag>
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
                input: '',
                articles: [],
                selectedArticles:[],
                sliderShow: [{
                    id: 1,
                    src: require('../assets/timg.jpg'),
                    txt: '图片1'
                }, {
                    id: 2,
                    src: require('../assets/timg.jpg'),
                    txt: '图片2'
                }, {
                    id: 3,
                    src: require('../assets/timg.jpg'),
                    txt: '图片3'
                }, {
                    id: 4,
                    src: require('../assets/timg.jpg'),
                    txt: '图片4'
                }],
                recentArticles: [],
                tagItem: [{
                    type: '',
                    name: 'javascript'
                }, {
                    type: 'success',
                    name: 'vue'
                }, {
                    type: 'info',
                    name: 'node'
                }, {
                    type: 'warning',
                    name: 'css'
                }, {
                    type: 'danger',
                    name: 'echarts'
                }, {
                    type: '',
                    name: 'nginx'
                }, {
                    type: 'success',
                    name: 'webpack'
                }, {
                    type: 'info',
                    name: 'git'
                }],
            }
        },
        methods: {
            nav(article) {
                this.$router.push({
                    path: '/essay',
                    query: {
                        id: article.id,
                        label: article.label,
                        viewers: article.viewers,
                        comments: article.comments,
                        date: article.date,
                        title: article.title,
                    }
                })
            },
            //选择标签
            tagChoose(tag){
                this.selectedArticles=this.articles.filter(item=>{
                    return item.label === tag
                })
            },
            search(){
                if(this.input.trim() === ''){
                    this.selectedArticles=this.articles
                }
                this.selectedArticles=this.articles.filter(item=>{
                    return item.label.indexOf(this.input)!== -1 || item.title.indexOf(this.input) !== -1 || item.content.indexOf(this.input) !== -1
                })
            }
        },
        created() {
            this.$axios.get('/test/allArticles').then((res) => {
                console.log(res)
                res.data.map((item) => {
                    item.icon = "test/" + item.icon
                })
                this.articles = res.data.sort((x, y) => {
                    return y.date - x.date
                })
                this.selectedArticles=res.data.sort((x, y) => {
                    return y.date - x.date
                })
                this.recentArticles = res.data.sort((x, y) => {
                    return y.date - x.date
                }).slice(0, 4)
            })
        }
    }
</script>

<style lang="scss">
    .articles {
        position: relative;
        width: 1000px;
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
                    }
                ;
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
                    }
                ;
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
                    }
                ;
                    .title:hover:after {
                        width: 80px;
                    }
                ;
                    .update {
                        text-align: left;
                        margin-left: 20px;
                        cursor: pointer;
                    }
                ;
                    .tag {
                        text-align: left;
                        margin: 20px;
                        cursor: pointer;
                        .el-tag {
                            margin-bottom: 10px;
                            margin-left: 10px;
                            font-size: 14px;
                        }
                    }
                ;
                }
            ;
                .btn {
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