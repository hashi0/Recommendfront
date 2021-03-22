import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Home from "@/components/Home";
import Welcome from "@/components/Welcome";
import User from "@/components/user/User";
import Products from "@/components/Products/Products";
import Order from "@/components/order/Order";
import AllResult from "@/components/result/AllResult";
import MyResult from "@/components/result/MyResult";

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/login'
},
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: Welcome,
        }, {
            path: '/user/all',
            component: User,
        }, {
            path: '/good/all',
            component: Products,
        }, {
            path: '/order/all',
            component: Order,
        }, {
            path: '/result/all',
            component: AllResult,
        }, {
            path: '/result/my',
            component: MyResult,
        }]
    },];

const router = new VueRouter({
    mode: 'history',
    base: '/grms/',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const token = window.sessionStorage.getItem('token');
    if (!token) return next('/login');
    next();
});

export default router;
