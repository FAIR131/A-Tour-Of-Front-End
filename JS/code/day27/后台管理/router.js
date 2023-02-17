const route = [
    {
        name:'/info',
        component:()=>import('./components/资讯管理'),
    },

    {
        //redirect 重定向
        name:'/',
        //导入
        redirect:'/info',
    }
];

export default route