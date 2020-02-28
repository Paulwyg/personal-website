<template>
    <div id="app">
        <div style="height: 80px"></div>
        <Head/>
        <!--<Main/>-->
        <router-view class="router"></router-view>
        <Bottom/>
        <div class="top" @click="backTop" v-if="hide"></div>
        <!--<div id="nav">-->
        <!--<router-link to="/home">Home</router-link> |-->
        <!--<router-link to="/about">About</router-link>-->
        <!--</div>-->
        <!--<router-view/>-->
    </div>
</template>
<script>
    import Head from './components/Head'
    import Bottom from './components/Bottom'

    export default {
        name: 'app',
        components: {
            Head,
            Bottom,
        },
        data() {
            return {
                hide: false
            }
        },
        created() {
            let scrolltop = null;
            let self = this
            window.onscroll = function () {
                //let e=e;
                scrolltop = document.documentElement.scrollTop;
                self.hide = scrolltop !== 0;
            }
        },
        methods: {
            backTop() {
                // document.documentElement.scrollTop=0
                this.$('html,body').animate({scrollTop: '0px'}, 800)
            }
        }
    }
</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-image: url("assets/blue-snow.png");
    }

    a {
        text-decoration: none;
    }

    body {
        margin: 0;
    }

    .top {
        width: 40px;
        height: 40px;
        display: block;
        background: url(../src/assets/top.png) no-repeat center #000;
        right: 20px;
        bottom: 10%;
        position: fixed;
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .router {
            width: 729px;
        }
    }

    @media (min-width: 992px) {
        .router {
            width: 949px;
        }
    }

    @media (min-width: 1200px) {
        .router {
            width: 1130px;
        }
    }


</style>
