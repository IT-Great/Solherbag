// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/User/HomePage.vue'
import CatalogPage from '../components/User/CatalogPage.vue'
import ContactPage from '../components/User/ContactPage.vue'
import LoginPage from '../components/User/LoginPage.vue'
import RegisterPage from '../components/User/RegisterPage.vue'
import ProfilePage from '../components/User/ProfilePage.vue'
import OrderPage from '../components/User/OrderPage.vue'
import AdminLoginPage from '../components/Admin/AdminLoginPage.vue'
import DashboardPage from '../components/Admin/DashboardPage.vue'
import AdminProfilePage from '../components/Admin/AdminProfilePage.vue'
import CategoryPage from '../components/Admin/CategoryPage.vue'
import ProductPage from '../components/Admin/ProductPage.vue'
import ProductAddPage from '../components/Admin/ProductAddPage.vue'
import ProductEditPage from '../components/Admin/ProductEditPage.vue'
import SalesReportPage from '../components/Admin/SalesReportPage.vue'
import TransactionPage from '../components/Admin/TransactionPage.vue'
import ProductDetailPage from '../components/User/ProductDetailPage.vue'
import UserListPage from '../components/Admin/UserListPage.vue'
import UserDetailPage from '../components/Admin/UserDetailPage.vue'
import MessageViewPage from '../components/Admin/MessageViewPage.vue'
import CustomerCarePage from '../components/User/CustomerCarePage.vue'
import FaqPage from '../components/User/FaqPage.vue'
import AboutUsPage from '../components/User/AboutUsPage.vue'
import InactiveProductPage from '../components/Admin/InactiveProductPage.vue'
import TransactionDetailPage from '../components/Admin/TransactionDetailPage.vue'
import PaymentPage from '../components/User/PaymentPage.vue'
import PaymentSuccessPage from '../components/User/PaymentSuccessPage.vue'
import TrackingPage from '../components/User/TrackingPage.vue'

// Import komponen lainnya (Anda bisa buat file kosong dulu untuk Catalog & Contact)
// const CatalogPage = { template: '<div class="py-20 text-center text-3xl">Catalog Page Coming Soon</div>' }
// const ContactPage = { template: '<div class="py-20 text-center text-3xl">Contact Page Coming Soon</div>' }

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/catalog', name: 'Catalog', component: CatalogPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/login', name: 'Login', component: LoginPage, meta: { hideHeaderFooter: true } },
    { path: '/loginadmin', name: 'AdminLogin', component: AdminLoginPage, meta: { hideHeaderFooter: true } },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { hideHeaderFooter: true }
    },
    { path: '/profilepage', name: 'Profile', component: ProfilePage },
    {
        path: '/profilepage',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true }
    },
    { path: '/orderpage', name: 'Orders', component: OrderPage, meta: { requiresAuth: true } },
    { path: '/customer-care', name: 'CustomerCare', component: CustomerCarePage },
    { path: '/faq', name: 'Faq', component: FaqPage },
    { path: '/about-us', name: 'AboutUs', component: AboutUsPage },
    {
        path: '/admin/dashboard', name: 'Dashboard', component: DashboardPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/profile', name: 'Adminprofile', component: AdminProfilePage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, 
            isAdmin: true           
        }
    },
    {
        path: '/admin/categories', name: 'Category', component: CategoryPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products', name: 'Product', component: ProductPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products/add', name: 'ProductAdd', component: ProductAddPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products/edit/:id', name: 'ProductEdit', component: ProductEditPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products/inactive', name: 'InactiveProduct', component: InactiveProductPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/salesreports', name: 'SalesReport', component: SalesReportPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/transactions', name: 'Transaction', component: TransactionPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/transactions/:id', name: 'TransactionDetail', component: TransactionDetailPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetailPage },
    {
        path: '/admin/user_list', name: 'UserList', component: UserListPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/users/:id',
        name: 'UserDetail',
        component: UserDetailPage,
        meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } //
    },
    {
        path: '/admin/messages',
        name: 'MessageView',
        component: MessageViewPage,
        meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
    },
    {
        path: '/payment/:id',
        name: 'PaymentPage',
        component: PaymentPage,
        meta: { requiresAuth: true }
    },
    {
        path: "/payment-success",
        name: "PaymentSuccess",
        component: PaymentSuccessPage,
        meta: { requiresAuth: true, hideHeaderFooter: true }
    },
    {
        path: "/tracking/:id",
        name: "TrackingPage",
        component: TrackingPage,
        meta: { requiresAuth: true, hideHeaderFooter: true }
    },
    {
        path: "/shippingmanagement",
        name: "ShippingManagementPage",
        component: ShippingManagementPage,
        meta: { requiresAuth: true, hideHeaderFooter: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Selalu scroll ke atas (0, 0)
        return { top: 0, behavior: 'smooth' }
    },
})

// Navigation Guard
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('token');
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     // Cek apakah rute yang dituju adalah area admin
//     const isAccessingAdmin = to.path.startsWith('/admin') || to.meta.isAdmin;

//     // 1. Jika Belum Login
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         if (isAccessingAdmin) {
//             next('/loginadmin'); // Lempar ke Login Admin
//         } else {
//             next('/login'); // Lempar ke Login User
//         }
//     }
//     // 2. Jika Sudah Login tapi User Biasa mencoba akses Admin
//     else if (isAccessingAdmin && user?.usertype !== 'admin') {
//         // Jika user nekat masuk ke /admin/... padahal tipenya bukan admin
//         next('/login'); // Atau lempar ke halaman 403 / Home
//     }
//     // 3. Jika Kondisi Terpenuhi
//     else {
//         next();
//     }
// });

router.beforeEach((to, from, next) => {
    const userToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('admin_token');

    const userString = localStorage.getItem('user');
    const adminString = localStorage.getItem('admin');

    const user = userString ? JSON.parse(userString) : null;
    const admin = adminString ? JSON.parse(adminString) : null;

    const isAccessingAdmin = to.path.startsWith('/admin') || to.meta.isAdmin;

    // Jika route butuh auth
    if (to.meta.requiresAuth) {

        // Jika akses admin area
        if (isAccessingAdmin) {
            if (!adminToken || !admin) {
                return next('/loginadmin');
            }
            return next();
        }

        // Jika akses user area
        if (!userToken || !user) {
            return next('/login');
        }

        return next();
    }

    next();
});

export default router