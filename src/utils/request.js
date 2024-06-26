// 封装axios,做请求处理
// 导入axios
import router from '@/router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from './token';

//创建axios
const request =axios.create({
    baseURL:'http://localhost:8080/', // 跟请求地址
    withCredentials:false,  //用于配置请求接口跨域时是否需要凭证
    timeout: 30000          //超时时间，单位毫秒
})

// 配置请求头的参数类型，和编码格式
axios.defaults.headers['Content-Type'] = 'application/json?chatset=utf-8'

// 配置请求的拦截器
request.interceptors.request.use((config)=>{

    // 在请求头添加token,判断是否需要发送token
    // TODO 后续token应在pinia中获取
    if(getToken("daoCaoToken")){
        config.headers['Daocao-Authorization'] = getToken("daoCaoToken");
    }
    return config;
    },
    (error) =>{
        // 发生异常
        console.log("请求异常===》",error);
        return Promise.reject(error);
    }
)

// 配置响应拦截器
request.interceptors.response.use((response)=>{
    // 判断响应码，后端返回的数据 code,data,msg
    let {msg,code} =response.data
    console.log("code====>",code,"msg====>",msg);
    if(code == null){
        return response;
    } else if (code == 200){
        return response;
    } else if (code == 500){
        ElMessage.error('服务器异常！');
    }else if (code == 401){
        ElMessage.error('没有操作权限！');
    }else if (code == 403){
        ElMessage.error('登录过期！');
        // 需要重新登录，跳转到登录页面，清除pinia、sessionStorage中的数据
        windows.sessionStorage.clear();
        router.push('/login');
    }
    return Promise.reject(msg);
},(error)=>{
    // 出现异常
    ElMessage.error('error===>',error);
    windows.sessionStorage.clear();
    router.push('/login');
    return Promise.reject(error);
}
)

// 导出
export default request;
