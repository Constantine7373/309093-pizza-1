const routes = [
  {
    path: "/",
    name: "IndexComponent",
    component: () => import("../views/Index"),
    children: [
      {
        path: "#login",
        component: () => import("../views/Login"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
  },
];

export default routes;
