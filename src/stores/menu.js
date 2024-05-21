//引入pinia
import { searchSelfRouter } from "@/api/user";
import { defineStore } from "pinia";
//定义 store 并导出
export const useMenuStore = defineStore('menu',{
    //定义状态【数据】
    state:()=>({
        menuList:[],
        routerList:[], //动态路由数据
    }),
    //获取数据的方法
    getters:{
        Array:(state)=>state.menuList,
        Array:(state) => state.routerList,
    },
    //修改数据的方法
    actions:{
        setMenuList(data) {
            console.log("setMenuList----->",data);
            this.menuList = data;
        },
        //渲染动态路由数据结构,存储到pinia中
        //data就是查询出来的用户菜单
        setRouterList(data){
            data.forEach(item =>{
                //定义数据结构
                let routerInfo = {
                    name:item.menuName,
                    path:item.path,
                    meta:{title:item.menuName},
                    //设置组件
                    component:() =>import(/*@vite-ignore */`../views/${item.path}.vue`)
                }
                //将路由信息添加到数组中
                this.routerList.push(routerInfo)
                //设置子菜单
                let childrenList = item.children;
                childrenList.forEach(children =>{
                    let routerInfo = {
                        name:children.menuName,
                        path:children.path,
                        meta:{title:children.menuName},
                        //设置组件
                        component:() =>import(/*@vite-ignore */`../views/${children.path}.vue`)
                    }
                    this.routerList.push(routerInfo)
                })
            })
        },
        //查询用户菜单，并且生成动态路由数据结构
        generateRouter(){
            return new Promise((resolve,reject)=>{
                //查询用户菜单
                searchSelfRouter().then(res=>{
                    if(res.data.code == 200){
                        this.setRouterList(res.data.data);
                        resolve()
                    }
                    reject()
                })
            })
        }
    },
})