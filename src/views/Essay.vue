<template>
    <div class="essay">
        <div class="title">
            <h1>{{$route.query.title}}</h1>
            <div>
                <span class="label">&ensp; &ensp; {{$route.query.label}}</span>
                <span class="view">&ensp; &ensp; {{$route.query.viewers}}</span>
                <span class="date">&ensp; &ensp; {{$route.query.date}}</span>
            </div>
        </div>
        <div id="markdown"></div>
        <div class="comments">
            <div class="title1">发表评论</div>
            <!--<textarea style="height: 100px;width: 980px;">测试</textarea>-->
            <vue-ueditor-wrap v-model="msg" :config="config"></vue-ueditor-wrap>
            <button class="btn">提交评论</button>
            <div class="new">最新评论</div>
            <div class="content-parent">
                <div v-for="item in commonts" :key="item.id" style="border-bottom: 1px dashed #e0e0e0;">
                    <img :src="item.icon">
                    <div class="username">{{item.name}}</div>
                    <div class="content">{{item.content}}</div>
                    <div class="time">
                        <span>{{item.date}}</span>
                        <a>回复</a>
                    </div>
                    <div class="reply" v-for="reply in item.children" :key="reply.id">
                        <img :src="reply.icon">
                        <div class="username">{{reply.name}}</div>
                        <div class="content">{{reply.content}}</div>
                        <div class="time">
                            <span>{{reply.date}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import hljs from 'highlight.js'
    import VueUeditorWrap from 'vue-ueditor-wrap'
    export default {
        name: "Essay",
        components:{
            VueUeditorWrap
        },
        data(){
          return{
              msg:'<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
              config: {
                  UEDITOR_HOME_URL: '/UEditor/'  // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
              },
              commonts:[{
                  id:1,
                  name:'Paulwyg',
                  icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
                  date:'2019-09-25 10:22:57',
                  content:'测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论',
                  children:[{
                      id:1,
                      name:'Paulwyg',
                      icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
                      content:'回复评论',
                      date:'2019-09-26 10:22:57',
                  }]
              }]
          }
        },
        mounted() {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight:function (code) {
                    return hljs.highlightAuto(code).value
                }
            });
            this.$axios.get('/test/articles').then((res)=>{
                console.log(res)
                document.getElementById('markdown').innerHTML = marked(res.data)
                //渲染文档中代码部分
                hljs.initHighlighting()
                this.$("code").addClass('hljs')
            })

            console.log(process.env.BASE_URL)
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .essay {
        position: relative;
        width: 1000px;
        margin: 0 auto;
        margin-top: 80px;
        margin-bottom: 30px;
        padding: 5px 20px 5px 20px;
        left: 0;
        right: 0;
        text-align: left;
        min-height: 909px;
        box-shadow: 0 0 10px 2px #666;
        background-color: white;
        #markdown{
            min-height: 909px;
        }
        .title{
            text-align: center;
            .label {
                background: url("../assets/label.png") no-repeat left center;
                width: 100px;
                margin-right: 20px;
            };
            .view {
                background: url("../assets/viewer.png") no-repeat left center;
                width: 100px;
                margin-right: 20px;
            };
            .date {
                background: url("../assets/date.png") no-repeat left center;
                width: 100px;
            }
        };
        .comments{
            position: relative;
            margin-top: 20px;
            margin-bottom: 20px;
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
            };
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
            };
            .title1:hover:after {
                width: 80px;
            };
            .btn{
                width: 75px;
                height: 30px;
                border: none;
                border-radius: 5px;
                background-color: #009688;
                color:white;
                cursor: pointer;
                margin-top: 10px;
            };
            .new{
                border-bottom: 1px solid #009688;
                font-size: 15px;
                font-weight: 500;
                padding: 0 0 5px;
                margin-top: 20px;
                margin-bottom: 5px;
                margin-right: 20px;
                color: #01aaed;
            };
            .content-parent{
                margin-right: 20px;
                img{
                    width: 45px;
                    height: 45px;
                    margin: 5px 5px 5px 0;
                    position: absolute;
                    border-radius: 50px;
                };
                .username{
                    color: #01aaed;
                    font-size: 14px;
                    margin-left: 53px;
                    padding-top: 5px;
                };
                .content{
                    margin-left: 53px;
                    padding-top: 5px;
                    padding-bottom: 10px;
                    line-height: 25px;
                };
                .time{
                    margin-left: 53px;
                    padding-bottom: 5px;
                    a{
                        color: #009688;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
                .reply{
                    margin-left: 53px;
                    padding-left: 8px;
                    border-left: 4px solid #c5c5c5
                }
            }
        }
    }
</style>