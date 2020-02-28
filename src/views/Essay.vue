<template>
    <div class="essay">
        <div class="navigation shadow">
            <span style="width: 10px;background-color: #409EFF;display: inline-block">&emsp;</span>
            <router-link to="/main" style="margin-left: 10px">首页</router-link>
            <span>&nbsp;>&nbsp;</span>
            <router-link to="/articles">文章专栏</router-link>
            <span>&nbsp;>&nbsp;{{$route.query.title}}</span>
        </div>
        <div class="title">
            <h1>{{$route.query.title}}</h1>
            <div>
                <span class="label">&ensp; &ensp; {{$route.query.label}}</span>
                <span class="view">&ensp; &ensp; {{$route.query.viewers}}</span>
                <span class="date">&ensp; &ensp; {{utils.timestampToTime($route.query.date)}}</span>
            </div>
        </div>
        <div id="markdown"></div>
        <div class="comments">
            <div class="title1">发表评论</div>
            <!--<textarea style="height: 100px;width: 980px;">测试</textarea>-->
            <vue-ueditor-wrap id="edit" v-model="msg" :config="config"></vue-ueditor-wrap>
            <button class="btn" @click="submit">提交评论</button>
            <button class="btn1" @click="cancel" v-show="isVisi">取消回复</button>
            <div class="new">最新评论</div>
            <div class="content-parent">
                <div v-for="item in commonts" :key="item.id" style="border-bottom: 1px dashed #e0e0e0;">
                    <img class="icon" :src="item.icon">
                    <div class="username">{{item.name}}</div>
                    <div class="content" v-html="item.content"></div>
                    <div class="time">
                        <span>{{utils.timestampToTime(item.date)}}</span>
                        <a @click="reply(item)">回复</a>
                    </div>
                    <div class="reply" v-for="reply in item.children" :key="reply.id">
                        <img class="icon" :src="reply.icon">
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
</template>

<script>
    import marked from 'marked'
    import hljs from 'highlight.js'
    import VueUeditorWrap from 'vue-ueditor-wrap'

    export default {
        name: "Essay",
        components: {
            VueUeditorWrap
        },
        data() {
            return {
                id:0,
                name: '',
                isVisi: false,
                msg: `<p><span style="color:#ccc;">想对作者说点儿什么</span></p>`,
                // msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
                config: {
                    UEDITOR_HOME_URL: '/UEditor/'  // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
                },
                commonts: [],
                // commonts: [{
                //     id: 1,
                //     name: 'Paulwyg',
                //     icon: 'https://avatars2.githubusercontent.com/u/14348558?v=4',
                //     date: '2019-09-25 10:22:57',
                //     content: '测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论',
                //     children: [{
                //         id: 1,
                //         name: 'Paulwyg',
                //         icon: 'https://avatars2.githubusercontent.com/u/14348558?v=4',
                //         content: '回复评论',
                //         date: '2019-09-26 10:22:57',
                //     }]
                // }]
            }
        },
        mounted() {
            console.log(this.$route)
            let self = this
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code) {
                    return hljs.highlightAuto(code).value
                }
            });
            //获取md文件
            this.$axios({
                method: 'post',
                url: '/test/articles',
                data: {
                    id: self.$route.query.id
                }
            }).then((res) => {
                console.log(res)
                document.getElementById('markdown').innerHTML = marked(res.data)
                //渲染文档中代码部分
                hljs.initHighlighting()
                this.$("code").addClass('hljs')
            })

            //console.log(process.env.BASE_URL)
            //获取评论信息
            this.$axios({
                method: 'get',
                url: '/test/commonts',
                params: {
                    id: self.$route.query.id
                }
            }).then((res) => {
                console.log(res)
                this.commonts = res.data.filter(item => {
                    return item.parent === null
                }).sort((x,y)=>{
                    return y.date-x.date
                })
                this.commonts.forEach(item => {
                    item.children = new Array()
                    res.data.forEach(f => {
                        if (item.id == f.parent) {
                            item.children.push(f)
                        }
                    })
                })
            })

        },
        watch: {
            msg(newVal, oldVal) {
                if (oldVal.indexOf('#ccc') !== -1) {
                    if (newVal === `<p><span style="color:#ccc;">@${this.name}</span></p>`
                        || newVal === `<p><span style="color:#ccc;">想对作者说点儿什么</span></p>`) return
                    this.msg = newVal.replace('想对作者说点儿什么', '').replace('@'+this.name, '').replace('#ccc', 'black')
                }
                if (newVal === '') {
                    let content = this.isVisi ? `@${this.name}` : '想对作者说点儿什么'
                    this.msg = `<p><span style="color:#ccc">${content}</span></p>`
                }
            }
        },
        methods: {
            //提交评论
            submit() {
                if (this.msg == '') {
                    this.$message.error('请输入评论内容')
                    return
                }
                let data = {
                    article_id: parseInt(this.$route.query.id),
                    date: Math.floor((new Date()).getTime() / 1000),
                    content: this.msg.substr(3,this.msg.length-7),
                    parent: this.id === 0 ? null : this.id
                }
                //保存评论信息
                this.$axios({
                    method: 'post',
                    url: '/test/commonts',
                    data
                }).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.$message.success('评论成功')
                    }

                }).catch(e=>{
                    this.$message.error(e)
                })
            },
            //回复
            reply(item) {
                //文本框置顶
                var scroll_offset = this.$('#edit').offset();
                this.$('html,body').animate({scrollTop: scroll_offset.top-60}, 800)
                this.name = item.name
                this.id=item.id
                this.isVisi = true
                this.msg = `<p><span style="color:#ccc;">@${item.name}</span></p>`
            },
            //取消回复
            cancel() {
                this.isVisi = false
                this.name=''
                this.id=0
                this.msg = `<p><span style="color:#ccc;">想对作者说点儿什么</span></p>`
            }
        }
    }
</script>

<style lang="scss">
    .essay {
        position: relative;
        /*width: 1000px;*/
        margin: 0 auto;
        margin-bottom: 30px;
        padding: 5px 20px 5px 20px;
        left: 0;
        right: 0;
        text-align: left;
        min-height: 909px;
        box-shadow: 0 0 10px 2px #666;
        background-color: #eee;
        .navigation {
            background-color: white;
            margin-top: 10px;
            text-align: left;
            height: 35px;
            line-height: 35px;

        }
        #markdown {
            min-height: 909px;
            background-color: white;
            padding:10px;
        }
        .title {
            text-align: center;
            background-color: white;
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
        ;
            .date {
                background: url("../assets/date.png") no-repeat left center;
                width: 100px;
            }
        }
    ;
        .comments {
            position: relative;
            margin-top: 20px;
            margin-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: white;
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
                .icon {
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
        .shadow {
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
            border-radius: 1px;
        }
        .edui-default .edui-editor {
            width: 100%!important;
        }
    }
</style>