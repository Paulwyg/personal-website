<template>
    <div class="about">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">关于本站</el-menu-item>
            <el-menu-item index="2">关于我</el-menu-item>
            <el-menu-item index="3">留言</el-menu-item>
        </el-menu>
        <div v-if="focusKey == 1" class="web">

        </div>
        <div v-if="focusKey == 2" class="me">

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
        min-height: 909px;
        box-shadow: 0 0 10px 2px #666;
        background-color: white;
        .el-menu-demo{
            margin: 0 auto;
        }
    }
</style>