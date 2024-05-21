<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" :style="{height:height+'px',minHeight:minHeight+'px'}">
                <Aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <Header/>
                </el-header>
                <el-main>
                    <Main/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
    import Aside from '@/Layout/Aside/index.vue'
    import Header from '@/Layout/Header/index.vue'
    import Main from '@/Layout/Main/index.vue'
import { onMounted, ref } from 'vue';

    const height =ref(0);
    const minHeight = ref(0);
    onMounted(()=>{
        getHeight();
        //监听页面缩放事件
        minHeight.value= document.documentElement.clientHeight;
        window.addEventListener('resize',getHeight)
    })
    // 获取文档高度
    function getHeight(){
        height.value = document.documentElement.clientHeight;
        console.log(height.value);
    }
</script>

<style lang="scss" scoped>
.aside {
    background-color: #2f4156;
}
</style>
