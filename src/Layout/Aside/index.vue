<template>
    <div>
        <el-menu
            background-color="#304157"
            text-color="#b1becd"
            active-text-color="#336cab"
        >
            <!-- 遍历子元素 -->
            <template v-for="menu in menuList" :key="menu.path">
                <!-- 判断是否有子菜单 -->
                <el-sub-menu v-if="hasChildren(menu)" :index="menu.path">
                    <template #title>
                        <!-- <el-icon><el-icon-User/></el-icon> -->
                        <span>{{ menu.menuName }}</span>
                    </template>
                    <!-- 渲染子菜单 -->
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="children in menu.children"
                            :index="children.path"
                            @click="handleRouter(children)"
                        >
                        <span>{{ children.menuName }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <!-- 没有子菜单 -->
                <el-menu-item v-else :index="menu.path" @click="handleRouter(menu)">
                    <span>{{ menu.menuName }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

    const router = useRouter();
    const menuStore = useMenuStore();
    const { menuList } = storeToRefs(menuStore);
    console.log("AsideMenuList---->",menuList);

    //判断是否有子菜单
    function hasChildren(menu){
        if(menu.children && menu.children.length > 0){
            return true;
        }
        return false;
    }
    //切换路由
    function handleRouter(menu){
        router.push(menu.path); 
    }
</script>

<style lang="scss" scoped>

</style>