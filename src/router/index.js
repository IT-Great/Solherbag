// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../components/User/HomePage.vue'
// import CollectionsPage from '../components/User/CollectionsPage.vue'
// import ContactPage from '../components/User/ContactPage.vue'
// import LoginPage from '../components/User/LoginPage.vue'
// import RegisterPage from '../components/User/RegisterPage.vue'
// import ProfilePage from '../components/User/ProfilePage.vue'
// import OrderPage from '../components/User/OrderPage.vue'
// import AdminLoginPage from '../components/Admin/AdminLoginPage.vue'
// import DashboardPage from '../components/Admin/DashboardPage.vue'
// import AdminProfilePage from '../components/Admin/AdminProfilePage.vue'
// import CategoryPage from '../components/Admin/CategoryPage.vue'
// import ProductPage from '../components/Admin/ProductPage.vue'
// import ProductAddPage from '../components/Admin/ProductAddPage.vue'
// import ProductEditPage from '../components/Admin/ProductEditPage.vue'
// import SalesReportPage from '../components/Admin/SalesReportPage.vue'
// import TransactionPage from '../components/Admin/TransactionPage.vue'
// import ProductDetailPage from '../components/User/ProductDetailPage.vue'
// import UserListPage from '../components/Admin/UserListPage.vue'
// import UserDetailPage from '../components/Admin/UserDetailPage.vue'
// import MessageViewPage from '../components/Admin/MessageViewPage.vue'
// import CustomerCarePage from '../components/User/CustomerCarePage.vue'
// import FaqPage from '../components/User/FaqPage.vue'
// import AboutUsPage from '../components/User/AboutUsPage.vue'
// import InactiveProductPage from '../components/Admin/InactiveProductPage.vue'
// import TransactionDetailPage from '../components/Admin/TransactionDetailPage.vue'
// import PaymentPage from '../components/User/PaymentPage.vue'
// import PaymentSuccessPage from '../components/User/PaymentSuccessPage.vue'
// import TrackingPage from '../components/User/TrackingPage.vue'

// // Import komponen lainnya (Anda bisa buat file kosong dulu untuk Collections & Contact)
// // const CollectionsPage = { template: '<div class="py-20 text-center text-3xl">Collections Page Coming Soon</div>' }
// // const ContactPage = { template: '<div class="py-20 text-center text-3xl">Contact Page Coming Soon</div>' }

// const routes = [
//     { path: '/', name: 'Home', component: HomePage },
//     { path: '/collections', name: 'Collections', component: CollectionsPage },
//     { path: '/contact', name: 'Contact', component: ContactPage },
//     { path: '/login', name: 'Login', component: LoginPage, meta: { hideHeaderFooter: true } },
//     { path: '/loginadmin', name: 'AdminLogin', component: AdminLoginPage, meta: { hideHeaderFooter: true } },
//     {
//         path: '/register',
//         name: 'Register',
//         component: RegisterPage,
//         meta: { hideHeaderFooter: true }
//     },
//     { path: '/profilepage', name: 'Profile', component: ProfilePage },
//     {
//         path: '/profilepage',
//         name: 'Profile',
//         component: ProfilePage,
//         meta: { requiresAuth: true }
//     },
//     { path: '/orderpage', name: 'Orders', component: OrderPage, meta: { requiresAuth: true } },
//     { path: '/customer-care', name: 'CustomerCare', component: CustomerCarePage },
//     { path: '/faq', name: 'Faq', component: FaqPage },
//     { path: '/about-us', name: 'AboutUs', component: AboutUsPage },
//     {
//         path: '/admin/dashboard', name: 'Dashboard', component: DashboardPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/profile', name: 'Adminprofile', component: AdminProfilePage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/categories', name: 'Category', component: CategoryPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/products', name: 'Product', component: ProductPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/products/add', name: 'ProductAdd', component: ProductAddPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/products/edit/:id', name: 'ProductEdit', component: ProductEditPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/products/inactive', name: 'InactiveProduct', component: InactiveProductPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/salesreports', name: 'SalesReport', component: SalesReportPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/transactions', name: 'Transaction', component: TransactionPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/transactions/:id', name: 'TransactionDetail', component: TransactionDetailPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     { path: '/product/:id', name: 'ProductDetail', component: ProductDetailPage },
//     {
//         path: '/admin/user_list', name: 'UserList', component: UserListPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true, // Sembunyikan Header/Footer standar
//             isAdmin: true           // Trigger untuk Sidebar layout
//         }
//     },
//     {
//         path: '/admin/users/:id',
//         name: 'UserDetail',
//         component: UserDetailPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } //
//     },
//     {
//         path: '/admin/messages',
//         name: 'MessageView',
//         component: MessageViewPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/payment/:id',
//         name: 'PaymentPage',
//         component: PaymentPage,
//         meta: { requiresAuth: true }
//     },
//     {
//         path: "/payment-success",
//         name: "PaymentSuccess",
//         component: PaymentSuccessPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true }
//     },
//     {
//         path: "/tracking/:id",
//         name: "TrackingPage",
//         component: TrackingPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true }
//     },
// ]

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
//     scrollBehavior(to, from, savedPosition) {
//         // Selalu scroll ke atas (0, 0)
//         return { top: 0, behavior: 'smooth' }
//     },
// })

// // Navigation Guard
// // router.beforeEach((to, from, next) => {
// //     const isAuthenticated = localStorage.getItem('token');
// //     const userString = localStorage.getItem('user');
// //     const user = userString ? JSON.parse(userString) : null;

// //     // Cek apakah rute yang dituju adalah area admin
// //     const isAccessingAdmin = to.path.startsWith('/admin') || to.meta.isAdmin;

// //     // 1. Jika Belum Login
// //     if (to.meta.requiresAuth && !isAuthenticated) {
// //         if (isAccessingAdmin) {
// //             next('/loginadmin'); // Lempar ke Login Admin
// //         } else {
// //             next('/login'); // Lempar ke Login User
// //         }
// //     }
// //     // 2. Jika Sudah Login tapi User Biasa mencoba akses Admin
// //     else if (isAccessingAdmin && user?.usertype !== 'admin') {
// //         // Jika user nekat masuk ke /admin/... padahal tipenya bukan admin
// //         next('/login'); // Atau lempar ke halaman 403 / Home
// //     }
// //     // 3. Jika Kondisi Terpenuhi
// //     else {
// //         next();
// //     }
// // });

// router.beforeEach((to, from, next) => {
//     const userToken = localStorage.getItem('token');
//     const adminToken = localStorage.getItem('admin_token');

//     const userString = localStorage.getItem('user');
//     const adminString = localStorage.getItem('admin');

//     const user = userString ? JSON.parse(userString) : null;
//     const admin = adminString ? JSON.parse(adminString) : null;

//     const isAccessingAdmin = to.path.startsWith('/admin') || to.meta.isAdmin;

//     // Jika route butuh auth
//     if (to.meta.requiresAuth) {

//         // Jika akses admin area
//         if (isAccessingAdmin) {
//             if (!adminToken || !admin) {
//                 return next('/loginadmin');
//             }
//             return next();
//         }

//         // Jika akses user area
//         if (!userToken || !user) {
//             return next('/login');
//         }

//         return next();
//     }

//     next();
// });

// export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../components/User/HomePage.vue'
// import CollectionsPage from '../components/User/CollectionsPage.vue'
// import ContactPage from '../components/User/ContactPage.vue'
// import LoginPage from '../components/User/LoginPage.vue'
// import RegisterPage from '../components/User/RegisterPage.vue'
// import ProfilePage from '../components/User/ProfilePage.vue'
// import OrderPage from '../components/User/OrderPage.vue'
// import AdminLoginPage from '../components/Admin/AdminLoginPage.vue'
// import DashboardPage from '../components/Admin/DashboardPage.vue'
// import AdminProfilePage from '../components/Admin/AdminProfilePage.vue'
// import CategoryPage from '../components/Admin/CategoryPage.vue'
// import ProductPage from '../components/Admin/ProductPage.vue'
// import ProductAddPage from '../components/Admin/ProductAddPage.vue'
// import ProductEditPage from '../components/Admin/ProductEditPage.vue'
// import SalesReportPage from '../components/Admin/SalesReportPage.vue'
// import TransactionPage from '../components/Admin/TransactionPage.vue'
// import ProductDetailPage from '../components/User/ProductDetailPage.vue'
// import UserListPage from '../components/Admin/UserListPage.vue'
// import UserDetailPage from '../components/Admin/UserDetailPage.vue'
// import MessageViewPage from '../components/Admin/MessageViewPage.vue'
// import CustomerCarePage from '../components/User/CustomerCarePage.vue'
// import FaqPage from '../components/User/FaqPage.vue'
// import AboutUsPage from '../components/User/AboutUsPage.vue'
// import InactiveProductPage from '../components/Admin/InactiveProductPage.vue'
// import TransactionDetailPage from '../components/Admin/TransactionDetailPage.vue'
// import PaymentPage from '../components/User/PaymentPage.vue'
// import PaymentSuccessPage from '../components/User/PaymentSuccessPage.vue'
// import TrackingPage from '../components/User/TrackingPage.vue'
// import CategoryCoaPage from '../components/Admin/CategoryCoaPage.vue'
// import CoaPage from '../components/Admin/CoaPage.vue'
// import TransferReceivePage from '../components/Admin/TransferReceivePage.vue'
// import SupplierPage from '../components/Admin/SupplierPage.vue'
// import InvoicePage from '../components/Admin/InvoicePage.vue'
// import CartPage from '../components/User/CartPage.vue'
// import DetailMessageViewPage from '../components/Admin/DetailMessageViewPage.vue'
// import SubscriberPage from '../components/Admin/SubscriberPage.vue'

// const routes = [
//     { path: '/', name: 'Home', component: HomePage },
//     { path: '/collections', name: 'Collections', component: CollectionsPage },
//     { path: '/contact', name: 'Contact', component: ContactPage },
//     { path: '/login', name: 'Login', component: LoginPage, meta: { hideHeaderFooter: true } },
//     { path: '/loginadmin', name: 'AdminLogin', component: AdminLoginPage, meta: { hideHeaderFooter: true } },
//     {
//         path: '/register',
//         name: 'Register',
//         component: RegisterPage,
//         meta: { hideHeaderFooter: true }
//     },
//     {
//         path: '/profilepage',
//         name: 'Profile',
//         component: ProfilePage,
//         meta: { requiresAuth: true }
//     },
//     { path: '/orderpage', name: 'Orders', component: OrderPage, meta: { requiresAuth: true } },
//     { path: '/customer-care', name: 'CustomerCare', component: CustomerCarePage },
//     { path: '/faq', name: 'Faq', component: FaqPage },
//     { path: '/about-us', name: 'AboutUs', component: AboutUsPage },
//     { path: '/favorites', name: 'Favorites', component: () => import('../components/User/FavoritePage.vue') },
//     {
//         path: '/cart',
//         name: 'Cart',
//         component: CartPage,
//         meta: { requiresAuth: true }
//     },

//     // ADMIN ROUTES
//     {
//         path: '/admin/dashboard', name: 'Dashboard', component: DashboardPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/profile', name: 'Adminprofile', component: AdminProfilePage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/categories', name: 'Category', component: CategoryPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/categories/:id',
//         name: 'CategoryDetail',
//         component: () => import('../components/Admin/CategoryDetailPage.vue'), // Sesuaikan path jika perlu
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/products', name: 'Product', component: ProductPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/products/add', name: 'ProductAdd', component: ProductAddPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/products/edit/:id', name: 'ProductEdit', component: ProductEditPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/products/view/:id',
//         name: 'ProductView',
//         component: () => import('../components/Admin/ProductViewPage.vue'),
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/products/inactive', name: 'InactiveProduct', component: InactiveProductPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/salesreports', name: 'SalesReport', component: SalesReportPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/transactions', name: 'Transaction', component: TransactionPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/transactions/:id', name: 'TransactionDetail', component: TransactionDetailPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     { path: '/product/:id', name: 'ProductDetail', component: ProductDetailPage },
//     {
//         path: '/admin/user_list', name: 'UserList', component: UserListPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/users/:id',
//         name: 'UserDetail',
//         component: UserDetailPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/subscribers', name: 'Subscribers', component: SubscriberPage,
//         meta: {
//             requiresAuth: true,
//             hideHeaderFooter: true,
//             isAdmin: true
//         }
//     },
//     {
//         path: '/admin/messages',
//         name: 'MessageView',
//         component: MessageViewPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/messages/:id',
//         name: 'DetailMessage',
//         component: DetailMessageViewPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     // --- [BARU] ROUTE UNTUK MODUL ACCOUNTING (ADMIN) ---
//     {
//         path: '/admin/category-coas',
//         name: 'CategoryCoa',
//         component: CategoryCoaPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/coas',
//         name: 'CoaPage',
//         component: CoaPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/payments',
//         name: 'TransferReceivePayment',
//         component: TransferReceivePage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/suppliers',
//         name: 'SupplierPage',
//         component: SupplierPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/admin/invoices',
//         name: 'InvoicePage',
//         component: InvoicePage,
//         meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true }
//     },
//     {
//         path: '/payment',
//         name: 'PaymentPage',
//         component: PaymentPage,
//         meta: { requiresAuth: true }
//     },
//     {
//         path: "/payment-success",
//         name: "PaymentSuccess",
//         component: PaymentSuccessPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true }
//     },
//     {
//         path: "/tracking/:id",
//         name: "TrackingPage",
//         component: TrackingPage,
//         meta: { requiresAuth: true, hideHeaderFooter: true }
//     },
// ]

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
//     scrollBehavior(to, from, savedPosition) {
//         // Selalu scroll ke atas (0, 0)
//         return { top: 0, behavior: 'smooth' }
//     },
// })

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//     const userToken = localStorage.getItem('token');
//     const adminToken = localStorage.getItem('admin_token');

//     const userString = localStorage.getItem('user');
//     const adminString = localStorage.getItem('admin');

//     const user = userString ? JSON.parse(userString) : null;
//     const admin = adminString ? JSON.parse(adminString) : null;

//     const isAccessingAdmin = to.path.startsWith('/admin') || to.meta.isAdmin;

//     // --- [PERBAIKAN] PENCEGAHAN AKSES HALAMAN LOGIN JIKA SUDAH LOGIN ---

//     // 1. Jika User biasa sudah login, cegah akses ke /loginadmin, /login, dan /register
//     if (userToken && user && user.usertype === 'user') {
//         if (['/loginadmin', '/login', '/register'].includes(to.path)) {
//             return next('/'); // Lempar kembali ke halaman Home (User)
//         }
//     }

//     // 2. Jika Admin sudah login, cegah akses ke /loginadmin, /login, dan /register
//     if (adminToken && admin && admin.usertype === 'admin') {
//         if (['/loginadmin', '/login', '/register'].includes(to.path)) {
//             return next('/admin/dashboard'); // Lempar kembali ke Dashboard Admin
//         }
//     }

//     // --- LOGIKA PROTEKSI ROUTE (REQUIRES AUTH) ---

//     // Jika route butuh auth
//     if (to.meta.requiresAuth) {

//         // Jika akses admin area
//         if (isAccessingAdmin) {
//             if (!adminToken || !admin) {
//                 return next('/loginadmin');
//             }
//             return next();
//         }

//         // Jika akses user area
//         if (!userToken || !user) {
//             return next('/login');
//         }

//         return next();
//     }

//     next();
// });

// export default router

// import { createRouter, createWebHistory } from "vue-router";
// import HomePage from "../components/User/HomePage.vue";
// import LoginPage from "../components/User/LoginPage.vue";
// import RegisterPage from "../components/User/RegisterPage.vue";
// import ProfilePage from "../components/User/ProfilePage.vue";
// import OrderPage from "../components/User/OrderPage.vue";
// import AdminLoginPage from "../components/Admin/AdminLoginPage.vue";
// import DashboardPage from "../components/Admin/DashboardPage.vue";
// import AdminProfilePage from "../components/Admin/AdminProfilePage.vue";
// import CategoryPage from "../components/Admin/CategoryPage.vue";
// import ProductPage from "../components/Admin/ProductPage.vue";
// import ProductAddPage from "../components/Admin/ProductAddPage.vue";
// import ProductEditPage from "../components/Admin/ProductEditPage.vue";
// import SalesReportPage from "../components/Admin/SalesReportPage.vue";
// import TransactionPage from "../components/Admin/TransactionPage.vue";
// import ProductDetailPage from "../components/User/ProductDetailPage.vue";
// import UserListPage from "../components/Admin/UserListPage.vue";
// import UserDetailPage from "../components/Admin/UserDetailPage.vue";
// import MessageViewPage from "../components/Admin/MessageViewPage.vue";
// import CustomerCarePage from "../components/User/CustomerCarePage.vue";
// import FaqPage from "../components/User/FaqPage.vue";
// import AboutUsPage from "../components/User/AboutUsPage.vue";
// import InactiveProductPage from "../components/Admin/InactiveProductPage.vue";
// import TransactionDetailPage from "../components/Admin/TransactionDetailPage.vue";
// import PaymentPage from "../components/User/PaymentPage.vue";
// import PaymentSuccessPage from "../components/User/PaymentSuccessPage.vue";
// import TrackingPage from "../components/User/TrackingPage.vue";
// import CategoryCoaPage from "../components/Admin/CategoryCoaPage.vue";
// import CoaPage from "../components/Admin/CoaPage.vue";
// import TransferReceivePage from "../components/Admin/TransferReceivePage.vue";
// import SupplierPage from "../components/Admin/SupplierPage.vue";
// import InvoicePage from "../components/Admin/InvoicePage.vue";
// import CartPage from "../components/User/CartPage.vue";
// import DetailMessageViewPage from "../components/Admin/DetailMessageViewPage.vue";
// import SubscriberPage from "../components/Admin/SubscriberPage.vue";
// import ForgotPasswordPage from "../components/User/ForgotPasswordPage.vue";
// import CodeVerificationPage from "../components/User/CodeVerificationPage.vue";
// import ResetPasswordPage from "../components/User/ResetPasswordPage.vue";
// import AdminForgotPasswordPage from "../components/Admin/AdminForgotPasswordPage.vue";
// import AdminCodeVerificationPage from "../components/Admin/AdminCodeVerificationPage.vue";
// import AdminResetPasswordPage from "../components/Admin/AdminResetPasswordPage.vue";
// import ProductStockPage from "../components/Admin/ProductStockPage.vue";
// import CollectionsPage from "../components/User/CollectionPage.vue";
// import BestSellerPage from "../components/User/BestSellerPage.vue"; 
// import ContactPage from "../components/User/ContactPage.vue";
// import ShippingPolicy from "../components/User/ShippingPolicy.vue";
// import RefundPolicy from "../components/User/RefundPolicy.vue";
// import TermsAndCondition from "../components/User/TermsAndCondition.vue";
// import PrivacyPolicy from "../components/User/PrivacyPolicy.vue";

// const routes = [
//   { path: "/", name: "Home", component: HomePage },
//   { path: "/best-sellers", name: "BestSellers", component: BestSellerPage },
//   { path: "/collections", name: "Collections", component: CollectionsPage },
//   { path: "/contact", name: "Contact", component: ContactPage },
//   {
//     path: "/login",
//     name: "Login",
//     component: LoginPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/forgot-password",
//     name: "ForgotPassword",
//     component: ForgotPasswordPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/verify-code",
//     name: "VerifyCode",
//     component: CodeVerificationPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/reset-password",
//     name: "ResetPassword",
//     component: ResetPasswordPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/loginadmin",
//     name: "AdminLogin",
//     component: AdminLoginPage,
//     meta: { hideHeaderFooter: true },
//   },
//   // --- ADMIN FORGOT PASSWORD ROUTES ---
//   {
//     path: "/admin/forgot-password",
//     name: "AdminForgotPassword",
//     component: AdminForgotPasswordPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/admin/verify-code",
//     name: "AdminVerifyCode",
//     component: AdminCodeVerificationPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/admin/reset-password",
//     name: "AdminResetPassword",
//     component: AdminResetPasswordPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/register",
//     name: "Register",
//     component: RegisterPage,
//     meta: { hideHeaderFooter: true },
//   },
//   {
//     path: "/profilepage",
//     name: "Profile",
//     component: ProfilePage,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/orderpage",
//     name: "Orders",
//     component: OrderPage,
//     meta: { requiresAuth: true },
//   },
//   { path: "/customer-care", name: "CustomerCare", component: CustomerCarePage },
//   { path: "/faq", name: "Faq", component: FaqPage },
//   { path: "/about-us", name: "AboutUs", component: AboutUsPage },
//   {
//     path: '/shipping-policy',
//     name: 'ShippingPolicy',
//     component: ShippingPolicy
//   },
//   {
//     path: '/refund-policy',
//     name: 'RefundPolicy',
//     component: RefundPolicy
//   },
//   {
//     path: '/terms',
//     name: 'TermsAndCondition',
//     component: TermsAndCondition
//   },
//   {
//     path: '/privacy',
//     name: 'PrivacyPolicy',
//     component: PrivacyPolicy
//   },
//   {
//     path: "/favorites",
//     name: "Favorites",
//     component: () => import("../components/User/FavoritePage.vue"),
//   },
//   {
//     path: "/cart",
//     name: "Cart",
//     component: CartPage,
//     meta: { requiresAuth: true },
//   },

//   // ADMIN ROUTES
//   {
//     path: "/admin/dashboard",
//     name: "Dashboard",
//     component: DashboardPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/profile",
//     name: "Adminprofile",
//     component: AdminProfilePage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/categories",
//     name: "Category",
//     component: CategoryPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/categories/:id",
//     name: "CategoryDetail",
//     component: () => import("../components/Admin/CategoryDetailPage.vue"),
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/products",
//     name: "Product",
//     component: ProductPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/products/add",
//     name: "ProductAdd",
//     component: ProductAddPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/products/edit/:id",
//     name: "ProductEdit",
//     component: ProductEditPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/products/view/:id",
//     name: "ProductView",
//     component: () => import("../components/Admin/ProductViewPage.vue"),
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/products/inactive",
//     name: "InactiveProduct",
//     component: InactiveProductPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/stocks",
//     name: "ProductStock",
//     component: ProductStockPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/salesreports",
//     name: "SalesReport",
//     component: SalesReportPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/transactions",
//     name: "Transaction",
//     component: TransactionPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/transactions/:id",
//     name: "TransactionDetail",
//     component: TransactionDetailPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   { path: "/product/:id", name: "ProductDetail", component: ProductDetailPage },
//   {
//     path: "/admin/user_list",
//     name: "UserList",
//     component: UserListPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/users/:id",
//     name: "UserDetail",
//     component: UserDetailPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/subscribers",
//     name: "Subscribers",
//     component: SubscriberPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/messages",
//     name: "MessageView",
//     component: MessageViewPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/messages/:id",
//     name: "DetailMessage",
//     component: DetailMessageViewPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/category-coas",
//     name: "CategoryCoa",
//     component: CategoryCoaPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/coas",
//     name: "CoaPage",
//     component: CoaPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/payments",
//     name: "TransferReceivePayment",
//     component: TransferReceivePage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/suppliers",
//     name: "SupplierPage",
//     component: SupplierPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/admin/invoices",
//     name: "InvoicePage",
//     component: InvoicePage,
//     meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true },
//   },
//   {
//     path: "/payment",
//     name: "PaymentPage",
//     component: PaymentPage,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/payment-success",
//     name: "PaymentSuccess",
//     component: PaymentSuccessPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true },
//   },
//   {
//     path: "/tracking/:id",
//     name: "TrackingPage",
//     component: TrackingPage,
//     meta: { requiresAuth: true, hideHeaderFooter: true },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return { top: 0, behavior: "smooth" };
//   },
// });

// // Navigation Guard
// // router.beforeEach((to, from, next) => {
// //   const userToken = localStorage.getItem("token");
// //   const adminToken = localStorage.getItem("admin_token");

// //   const userString = localStorage.getItem("user");
// //   const adminString = localStorage.getItem("admin");

// //   // [BARU] Ambil timestamp waktu login admin
// //   const adminLoginTime = localStorage.getItem("admin_login_time");

// //   const user = userString ? JSON.parse(userString) : null;
// //   let admin = adminString ? JSON.parse(adminString) : null;

// //   // Variabel pembantu untuk status validitas admin
// //   let isAdminSessionValid = !!(
// //     adminToken &&
// //     admin &&
// //     admin.usertype === "admin"
// //   );

// //   // =========================================================================
// //   // [BARU] LOGIKA KEDALUWARSA TOKEN ADMIN (MAKSIMAL 15 MENIT)
// //   // =========================================================================
// //   if (isAdminSessionValid) {
// //     if (adminLoginTime) {
// //       const currentTime = new Date().getTime();
// //       const loginTime = parseInt(adminLoginTime, 10);
// //       const timeLimit = 15 * 60 * 1000; // 15 menit dalam milidetik (900.000 ms)

// //       if (currentTime - loginTime > timeLimit) {
// //         // Sesi telah melebihi 15 menit! Hapus semua data admin dari memori
// //         localStorage.removeItem("admin_token");
// //         localStorage.removeItem("admin");
// //         localStorage.removeItem("admin_login_time");

// //         isAdminSessionValid = false;
// //         admin = null;

// //         // Cegah infinite loop jika rute tujuan sudah ke /loginadmin
// //         if (to.path !== "/loginadmin") {
// //           return next("/loginadmin");
// //         }
// //       }
// //     } else {
// //       // Self-healing: Jika admin sedang login tetapi variabel admin_login_time
// //       // belum ada (karena kode baru), buat timestamp-nya sekarang.
// //       localStorage.setItem("admin_login_time", new Date().getTime().toString());
// //     }
// //   }
// //   // =========================================================================

// //   const isAccessingAdmin = to.path.startsWith("/admin") || to.meta.isAdmin;

// //   // --- PENCEGAHAN AKSES HALAMAN LOGIN JIKA SUDAH LOGIN ---
// //   // 1. User biasa
// //   if (userToken && user && user.usertype === "user") {
// //     if (["/loginadmin", "/login", "/register"].includes(to.path)) {
// //       return next("/");
// //     }
// //   }

// //   // 2. Admin (Pastikan menggunakan variabel isAdminSessionValid yang sudah divalidasi)
// //   if (isAdminSessionValid) {
// //     if (["/loginadmin", "/login", "/register"].includes(to.path)) {
// //       return next("/admin/dashboard");
// //     }
// //   }

// //   // --- LOGIKA PROTEKSI ROUTE (REQUIRES AUTH) ---
// //   if (to.meta.requiresAuth) {
// //     // Jika akses admin area
// //     if (isAccessingAdmin) {
// //       if (!isAdminSessionValid) {
// //         return next("/loginadmin");
// //       }
// //       return next();
// //     }

// //     // Jika akses user area
// //     if (!userToken || !user) {
// //       return next("/login");
// //     }

// //     return next();
// //   }

// //   next();
// // });

// // export default router;

// // Navigation Guard
// // router.beforeEach((to, from, next) => {
// //     const userToken = localStorage.getItem("token");
// //     const adminToken = localStorage.getItem("admin_token");

// //     const userString = localStorage.getItem("user");
// //     const adminString = localStorage.getItem("admin");

// //     const adminLoginTime = localStorage.getItem("admin_login_time");

// //     const user = userString ? JSON.parse(userString) : null;
// //     let admin = adminString ? JSON.parse(adminString) : null;

// //     // [PERBAIKAN UTAMA 1] Definisikan array role admin yang valid
// //     const validAdminRoles = ["admin", "superadmin", "gudang", "accounting"];

// //     // Variabel pembantu untuk status validitas admin
// //     let isAdminSessionValid = !!(
// //         adminToken &&
// //         admin &&
// //         validAdminRoles.includes(admin.usertype) // <--- PERUBAHAN DI SINI
// //     );

// //     // =========================================================================
// //     // LOGIKA KEDALUWARSA TOKEN ADMIN (MAKSIMAL 15 MENIT)
// //     // =========================================================================
// //     if (isAdminSessionValid) {
// //         if (adminLoginTime) {
// //             const currentTime = new Date().getTime();
// //             const loginTime = parseInt(adminLoginTime, 10);
// //             const timeLimit = 15 * 60 * 1000; // 15 menit

// //             if (currentTime - loginTime > timeLimit) {
// //                 localStorage.removeItem("admin_token");
// //                 localStorage.removeItem("admin");
// //                 localStorage.removeItem("admin_login_time");

// //                 isAdminSessionValid = false;
// //                 admin = null;

// //                 if (to.path !== "/loginadmin") {
// //                     return next("/loginadmin");
// //                 }
// //             }
// //         } else {
// //             localStorage.setItem("admin_login_time", new Date().getTime().toString());
// //         }
// //     }
// //     // =========================================================================

// //     const isAccessingAdmin = to.path.startsWith("/admin") || to.meta.isAdmin;

// //     // --- PENCEGAHAN AKSES HALAMAN LOGIN JIKA SUDAH LOGIN ---
// //     // 1. User biasa
// //     if (userToken && user && user.usertype === "user") {
// //         if (["/loginadmin", "/login", "/register"].includes(to.path)) {
// //             return next("/");
// //         }
// //     }

// //     // 2. Admin
// //     if (isAdminSessionValid) {
// //         if (["/loginadmin", "/login", "/register"].includes(to.path)) {
// //             // Jika mereka mencoba masuk ke halaman login, tendang ke menu yang sesuai dengan role-nya
// //             if (admin.usertype === 'accounting') {
// //                 return next("/admin/coas");
// //             }
// //             return next("/admin/dashboard");
// //         }
// //     }

// //     // --- LOGIKA PROTEKSI ROUTE (REQUIRES AUTH) ---
// //     if (to.meta.requiresAuth) {
// //         // Jika akses admin area
// //         if (isAccessingAdmin) {
// //             if (!isAdminSessionValid) {
// //                 return next("/loginadmin");
// //             }

// //             // =====================================================================
// //             // [BARU] RBAC ROUTE GUARD (Mencegah Ketik URL Manual)
// //             // =====================================================================
// //             const role = admin.usertype;
// //             const targetPath = to.path;

// //             if (role !== 'superadmin') {

// //                 // Aturan untuk Gudang
// //                 if (role === 'gudang') {
// //                     const allowedGudangPaths = ['/admin/products', '/admin/stocks', '/admin/transactions', '/admin/profile'];
// //                     // Izinkan jika path dimulai dengan allowed paths (termasuk view/edit product)
// //                     const isAllowed = allowedGudangPaths.some(p => targetPath.startsWith(p));
// //                     if (!isAllowed) return next("/admin/transactions"); // Kick ke menu aman
// //                 }

// //                 // Aturan untuk Accounting
// //                 if (role === 'accounting') {
// //                     const allowedAccountingPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices', '/admin/salesreports', '/admin/profile'];
// //                     const isAllowed = allowedAccountingPaths.some(p => targetPath.startsWith(p));
// //                     if (!isAllowed) return next("/admin/coas"); // Kick ke menu aman
// //                 }

// //                 // Aturan untuk Admin Standar
// //                 if (role === 'admin') {
// //                     // Admin standar dilarang masuk ke menu accounting
// //                     const forbiddenAdminPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices'];
// //                     const isForbidden = forbiddenAdminPaths.some(p => targetPath.startsWith(p));
// //                     if (isForbidden) return next("/admin/dashboard");
// //                 }
// //             }
// //             // =====================================================================

// //             return next();
// //         }

// //         // Jika akses user area
// //         if (!userToken || !user || user.usertype !== "user") { // Pastikan admin tidak nyasar ke profile page user biasa
// //             return next("/login");
// //         }

// //         return next();
// //     }

// //     next();
// // });

// // export default router;

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   const userToken = localStorage.getItem("token");
//   const adminToken = localStorage.getItem("admin_token");

//   const userString = localStorage.getItem("user");
//   const adminString = localStorage.getItem("admin");

//   const adminLoginTime = localStorage.getItem("admin_login_time");

//   const user = userString ? JSON.parse(userString) : null;
//   let admin = adminString ? JSON.parse(adminString) : null;

//   const validAdminRoles = ["admin", "superadmin", "gudang", "accounting"];

//   let isAdminSessionValid = !!(
//     adminToken &&
//     admin &&
//     validAdminRoles.includes(admin.usertype)
//   );

//   // =========================================================================
//   // LOGIKA KEDALUWARSA TOKEN ADMIN (MAKSIMAL 15 MENIT)
//   // =========================================================================
//   if (isAdminSessionValid) {
//     if (adminLoginTime) {
//       const currentTime = new Date().getTime();
//       const loginTime = parseInt(adminLoginTime, 10);
//       const timeLimit = 15 * 60 * 1000; // 15 menit

//       if (currentTime - loginTime > timeLimit) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin");
//         localStorage.removeItem("admin_login_time");

//         isAdminSessionValid = false;
//         admin = null;

//         if (to.path !== "/loginadmin") {
//           return next("/loginadmin");
//         }
//       }
//     } else {
//       localStorage.setItem("admin_login_time", new Date().getTime().toString());
//     }
//   }
//   // =========================================================================

//   const isAccessingAdmin = to.path.startsWith("/admin") || to.meta.isAdmin;

//   // --- PENCEGAHAN AKSES HALAMAN LOGIN JIKA SUDAH LOGIN ---
//   // 1. User biasa
//   if (userToken && user && user.usertype === "user") {
//     if (["/loginadmin", "/login", "/register"].includes(to.path)) {
//       return next("/");
//     }
//   }

//   // 2. Admin & Staff
//   if (isAdminSessionValid) {
//     if (["/loginadmin", "/login", "/register"].includes(to.path)) {
//       // [PERBAIKAN] Pastikan semua role ditendang ke halaman beranda masing-masing divisi!
//       if (admin.usertype === 'accounting') {
//         return next("/admin/coas");
//       } else if (admin.usertype === 'gudang') {
//         return next("/admin/transactions");
//       } else {
//         return next("/admin/dashboard");
//       }
//     }
//   }

//   // --- LOGIKA PROTEKSI ROUTE (REQUIRES AUTH) ---
//   if (to.meta.requiresAuth) {
    
//     // Jika akses admin area
//     if (isAccessingAdmin) {
//       if (!isAdminSessionValid) {
//         return next("/loginadmin");
//       }

//       // =====================================================================
//       // RBAC ROUTE GUARD (Mencegah Ketik URL Manual)
//       // =====================================================================
//       const role = admin.usertype;
//       const targetPath = to.path;

//       if (role !== 'superadmin') {
//         // Aturan untuk Gudang
//         if (role === 'gudang') {
//           const allowedGudangPaths = ['/admin/products', '/admin/stocks', '/admin/transactions', '/admin/profile'];
//           const isAllowed = allowedGudangPaths.some(p => targetPath.startsWith(p));
//           if (!isAllowed) return next("/admin/transactions"); 
//         }

//         // Aturan untuk Accounting
//         if (role === 'accounting') {
//           const allowedAccountingPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices', '/admin/salesreports', '/admin/profile'];
//           const isAllowed = allowedAccountingPaths.some(p => targetPath.startsWith(p));
//           if (!isAllowed) return next("/admin/coas"); 
//         }

//         // Aturan untuk Admin Standar
//         if (role === 'admin') {
//           const forbiddenAdminPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices'];
//           const isForbidden = forbiddenAdminPaths.some(p => targetPath.startsWith(p));
//           if (isForbidden) return next("/admin/dashboard");
//         }
//       }
//       // =====================================================================

//       return next();
//     }

//     // Jika akses user area
//     if (!userToken || !user || user.usertype !== "user") { 
//       return next("/login");
//     }

//     return next();
//   }

//   next();
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/User/HomePage.vue";
import LoginPage from "../components/User/LoginPage.vue";
import RegisterPage from "../components/User/RegisterPage.vue";
import ProfilePage from "../components/User/ProfilePage.vue";
import OrderPage from "../components/User/OrderPage.vue";
import AdminLoginPage from "../components/Admin/AdminLoginPage.vue";
import DashboardPage from "../components/Admin/DashboardPage.vue";
import AdminProfilePage from "../components/Admin/AdminProfilePage.vue";
import CategoryPage from "../components/Admin/CategoryPage.vue";
import ProductPage from "../components/Admin/ProductPage.vue";
import ProductAddPage from "../components/Admin/ProductAddPage.vue";
import ProductEditPage from "../components/Admin/ProductEditPage.vue";
import SalesReportPage from "../components/Admin/SalesReportPage.vue";
import TransactionPage from "../components/Admin/TransactionPage.vue";
import ProductDetailPage from "../components/User/ProductDetailPage.vue";
import UserListPage from "../components/Admin/UserListPage.vue";
import UserDetailPage from "../components/Admin/UserDetailPage.vue";
import MessageViewPage from "../components/Admin/MessageViewPage.vue";
import CustomerCarePage from "../components/User/CustomerCarePage.vue";
import FaqPage from "../components/User/FaqPage.vue";
import AboutUsPage from "../components/User/AboutUsPage.vue";
import InactiveProductPage from "../components/Admin/InactiveProductPage.vue";
import TransactionDetailPage from "../components/Admin/TransactionDetailPage.vue";
import PaymentPage from "../components/User/PaymentPage.vue";
import PaymentSuccessPage from "../components/User/PaymentSuccessPage.vue";
import TrackingPage from "../components/User/TrackingPage.vue";
import CategoryCoaPage from "../components/Admin/CategoryCoaPage.vue";
import CoaPage from "../components/Admin/CoaPage.vue";
import TransferReceivePage from "../components/Admin/TransferReceivePage.vue";
import SupplierPage from "../components/Admin/SupplierPage.vue";
import InvoicePage from "../components/Admin/InvoicePage.vue";
import CartPage from "../components/User/CartPage.vue";
import DetailMessageViewPage from "../components/Admin/DetailMessageViewPage.vue";
import SubscriberPage from "../components/Admin/SubscriberPage.vue";
import ForgotPasswordPage from "../components/User/ForgotPasswordPage.vue";
import CodeVerificationPage from "../components/User/CodeVerificationPage.vue";
import ResetPasswordPage from "../components/User/ResetPasswordPage.vue";
import AdminForgotPasswordPage from "../components/Admin/AdminForgotPasswordPage.vue";
import AdminCodeVerificationPage from "../components/Admin/AdminCodeVerificationPage.vue";
import AdminResetPasswordPage from "../components/Admin/AdminResetPasswordPage.vue";
import ProductStockPage from "../components/Admin/ProductStockPage.vue";
import CollectionsPage from "../components/User/CollectionPage.vue";
import BestSellerPage from "../components/User/BestSellerPage.vue"; 
import ContactPage from "../components/User/ContactPage.vue";
import ShippingPolicy from "../components/User/ShippingPolicy.vue";
import RefundPolicy from "../components/User/RefundPolicy.vue";
import TermsAndCondition from "../components/User/TermsAndCondition.vue";
import PrivacyPolicy from "../components/User/PrivacyPolicy.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/best-sellers", name: "BestSellers", component: BestSellerPage },
  { path: "/collections", name: "Collections", component: CollectionsPage },
  { path: "/contact", name: "Contact", component: ContactPage },
  { path: "/login", name: "Login", component: LoginPage, meta: { hideHeaderFooter: true } },
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPasswordPage, meta: { hideHeaderFooter: true } },
  { path: "/verify-code", name: "VerifyCode", component: CodeVerificationPage, meta: { hideHeaderFooter: true } },
  { path: "/reset-password", name: "ResetPassword", component: ResetPasswordPage, meta: { hideHeaderFooter: true } },
  { path: "/loginadmin", name: "AdminLogin", component: AdminLoginPage, meta: { hideHeaderFooter: true } },
  { path: "/admin/forgot-password", name: "AdminForgotPassword", component: AdminForgotPasswordPage, meta: { hideHeaderFooter: true } },
  { path: "/admin/verify-code", name: "AdminVerifyCode", component: AdminCodeVerificationPage, meta: { hideHeaderFooter: true } },
  { path: "/admin/reset-password", name: "AdminResetPassword", component: AdminResetPasswordPage, meta: { hideHeaderFooter: true } },
  { path: "/register", name: "Register", component: RegisterPage, meta: { hideHeaderFooter: true } },
  { path: "/profilepage", name: "Profile", component: ProfilePage, meta: { requiresAuth: true } },
  { path: "/orderpage", name: "Orders", component: OrderPage, meta: { requiresAuth: true } },
  { path: "/customer-care", name: "CustomerCare", component: CustomerCarePage },
  { path: "/faq", name: "Faq", component: FaqPage },
  { path: "/about-us", name: "AboutUs", component: AboutUsPage },
  { path: '/shipping-policy', name: 'ShippingPolicy', component: ShippingPolicy },
  { path: '/refund-policy', name: 'RefundPolicy', component: RefundPolicy },
  { path: '/terms', name: 'TermsAndCondition', component: TermsAndCondition },
  { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: "/favorites", name: "Favorites", component: () => import("../components/User/FavoritePage.vue") },
  { path: "/cart", name: "Cart", component: CartPage, meta: { requiresAuth: true } },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetailPage },
  { path: "/payment", name: "PaymentPage", component: PaymentPage, meta: { requiresAuth: true } },
  { path: "/payment-success", name: "PaymentSuccess", component: PaymentSuccessPage, meta: { requiresAuth: true, hideHeaderFooter: true } },
  { path: "/tracking/:id", name: "TrackingPage", component: TrackingPage, meta: { requiresAuth: true, hideHeaderFooter: true } },

  // ADMIN ROUTES
  { path: "/admin/dashboard", name: "Dashboard", component: DashboardPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/profile", name: "Adminprofile", component: AdminProfilePage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/categories", name: "Category", component: CategoryPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/categories/:id", name: "CategoryDetail", component: () => import("../components/Admin/CategoryDetailPage.vue"), meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/products", name: "Product", component: ProductPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/products/add", name: "ProductAdd", component: ProductAddPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/products/edit/:id", name: "ProductEdit", component: ProductEditPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/products/view/:id", name: "ProductView", component: () => import("../components/Admin/ProductViewPage.vue"), meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/products/inactive", name: "InactiveProduct", component: InactiveProductPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/stocks", name: "ProductStock", component: ProductStockPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/salesreports", name: "SalesReport", component: SalesReportPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/transactions", name: "Transaction", component: TransactionPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/transactions/:id", name: "TransactionDetail", component: TransactionDetailPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/user_list", name: "UserList", component: UserListPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/users/:id", name: "UserDetail", component: UserDetailPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/subscribers", name: "Subscribers", component: SubscriberPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/messages", name: "MessageView", component: MessageViewPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/messages/:id", name: "DetailMessage", component: DetailMessageViewPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/category-coas", name: "CategoryCoa", component: CategoryCoaPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/coas", name: "CoaPage", component: CoaPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/payments", name: "TransferReceivePayment", component: TransferReceivePage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/suppliers", name: "SupplierPage", component: SupplierPage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
  { path: "/admin/invoices", name: "InvoicePage", component: InvoicePage, meta: { requiresAuth: true, hideHeaderFooter: true, isAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

// =========================================================================
// [BARU] LOGIKA AUTO-RESET IDLE TIMER
// Setiap kali admin menggerakkan mouse, klik, atau ngetik, reset timernya.
// =========================================================================
let idleTimer = null;

const resetIdleTimer = () => {
  const adminToken = localStorage.getItem("admin_token");
  if (!adminToken) return; // Jangan jalankan timer kalau bukan admin

  // Simpan/Update waktu aktivitas terakhir ke LocalStorage
  localStorage.setItem("admin_last_activity", new Date().getTime().toString());

  // Hapus timer lama
  if (idleTimer) clearTimeout(idleTimer);

  // Buat timer baru: 15 Menit = 15 * 60 * 1000 milidetik
  idleTimer = setTimeout(() => {
    // Tepat setelah 15 menit tanpa aktivitas, hapus token dan lempar keluar
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    localStorage.removeItem("admin_last_activity");
    
    // Matikan pemantau aktivitas agar browser tidak bekerja terus menerus
    stopActivityListeners();

    // Lempar ke halaman login
    window.location.href = '/loginadmin'; 
  }, 15 * 60 * 1000);
};

// Pasang pendeteksi pergerakan user
const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
const startActivityListeners = () => {
  activityEvents.forEach(event => document.addEventListener(event, resetIdleTimer, true));
};
const stopActivityListeners = () => {
  activityEvents.forEach(event => document.removeEventListener(event, resetIdleTimer, true));
};
// =========================================================================

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin_token");

  const userString = localStorage.getItem("user");
  const adminString = localStorage.getItem("admin");

  const user = userString ? JSON.parse(userString) : null;
  let admin = adminString ? JSON.parse(adminString) : null;

  const validAdminRoles = ["admin", "superadmin", "gudang", "accounting"];
  let isAdminSessionValid = !!(adminToken && admin && validAdminRoles.includes(admin.usertype));

  // =========================================================================
  // [PERBAIKAN] CEK IDLE TIMEOUT SAAT PINDAH HALAMAN
  // =========================================================================
  if (isAdminSessionValid) {
    const lastActivity = localStorage.getItem("admin_last_activity");
    if (lastActivity) {
      const currentTime = new Date().getTime();
      const diff = currentTime - parseInt(lastActivity, 10);
      
      // Jika ternyata beda waktunya sudah lewat 15 menit (misal dia tutup laptop lalu buka lagi)
      if (diff > 15 * 60 * 1000) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin");
        localStorage.removeItem("admin_last_activity");
        isAdminSessionValid = false;
        admin = null;
        stopActivityListeners();

        if (to.path !== "/loginadmin") {
          return next("/loginadmin");
        }
      } else {
        // Jika masih aman (dibawah 15 menit), nyalakan listener dan reset timer
        startActivityListeners();
        resetIdleTimer();
      }
    } else {
      // Jika baru pertama kali masuk, catat waktunya dan mulai pantau
      startActivityListeners();
      resetIdleTimer();
    }
  } else {
    // Pastikan listener dimatikan jika yang login bukan admin (atau belum login)
    stopActivityListeners();
  }
  // =========================================================================

  const isAccessingAdmin = to.path.startsWith("/admin") || to.meta.isAdmin;

  // --- PENCEGAHAN AKSES HALAMAN LOGIN JIKA SUDAH LOGIN ---
  if (userToken && user && user.usertype === "user") {
    if (["/loginadmin", "/login", "/register"].includes(to.path)) {
      return next("/");
    }
  }

  if (isAdminSessionValid) {
    if (["/loginadmin", "/login", "/register"].includes(to.path)) {
      if (admin.usertype === 'accounting') return next("/admin/coas");
      else if (admin.usertype === 'gudang') return next("/admin/transactions");
      else return next("/admin/dashboard");
    }
  }

  // --- LOGIKA PROTEKSI ROUTE (REQUIRES AUTH) ---
  if (to.meta.requiresAuth) {
    
    if (isAccessingAdmin) {
      if (!isAdminSessionValid) {
        return next("/loginadmin");
      }

      // =====================================================================
      // RBAC ROUTE GUARD (Mencegah Ketik URL Manual)
      // =====================================================================
      const role = admin.usertype;
      const targetPath = to.path;

      if (role !== 'superadmin') {
        if (role === 'gudang') {
          const allowedGudangPaths = ['/admin/products', '/admin/stocks', '/admin/transactions', '/admin/profile'];
          const isAllowed = allowedGudangPaths.some(p => targetPath.startsWith(p));
          if (!isAllowed) return next("/admin/transactions"); 
        }

        if (role === 'accounting') {
          const allowedAccountingPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices', '/admin/salesreports', '/admin/profile'];
          const isAllowed = allowedAccountingPaths.some(p => targetPath.startsWith(p));
          if (!isAllowed) return next("/admin/coas"); 
        }

        if (role === 'admin') {
          const forbiddenAdminPaths = ['/admin/coas', '/admin/category-coas', '/admin/payments', '/admin/suppliers', '/admin/invoices'];
          const isForbidden = forbiddenAdminPaths.some(p => targetPath.startsWith(p));
          if (isForbidden) return next("/admin/dashboard");
        }
      }
      return next();
    }

    if (!userToken || !user || user.usertype !== "user") { 
      return next("/login");
    }
    return next();
  }

  next();
});

export default router;
