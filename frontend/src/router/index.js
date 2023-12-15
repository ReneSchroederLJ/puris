/*
 * Copyright (c) 2022,2023 Volkswagen AG
 * Copyright (c) 2022,2023 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer ISST)
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthenticationService from "@/services/AuthenticationService";

export const ALL_ROUTES = [
    {
        path: "/",
        name: "Dashboard",
        component: HomeView,
        meta: {
            requiredRoles: ["PURIS_USER"],
        },
    },
    {
        path: "/createOrder",
        name: "Create Order",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/CreateOrderView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/manageOrders",
        name: "Manage Orders",
        component: () => import("../views/ManageOrderView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/catalog",
        name: "Catalog",
        component: () => import("../views/CatalogView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/negotiations",
        name: "Negotiations",
        component: () => import("../views/NegotiationView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/transfers",
        name: "Transfers",
        component: () => import("../views/TransferView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/responses",
        name: "Responses",
        component: () => import("../views/OrderResponseView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/connectors",
        name: "Connectors",
        component: () => import("../views/ConnectorView.vue"),
        meta: {
            requiredRoles: ["PURIS_ADMIN"],
        },
    },
    {
        path: "/stocks",
        name: "Stocks",
        component: () => import("../views/StockView.vue"),
        meta: {
            requiredRoles: ["PURIS_USER"],
        },
    },
    {
        path: "/supplierDashboard",
        name: "Supplier Dashboard",
        component: () => import("../views/SupplierDashboard.vue"),
        meta: {
            requiredRoles: ["PURIS_USER"],
        },
    },
    {
        path: "/unauthorized",
        name: "Unauthorized",
        component: () => import("../views/Unauthorized.vue"),
    },
    {
        path: "/aboutLicense",
        name: "aboutLicense",
        component: () => import("../views/AboutLicense.vue"),
    },
];

const requireRole = (to, from, next) => {
    const requiredRoles = to.meta.requiredRoles;

    if (!requiredRoles) {
        next();
    }

    if (AuthenticationService.userHasRole(requiredRoles)) {
        next();
    } else {
        next("/unauthorized");
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: ALL_ROUTES,
});

router.beforeEach((to, from, next) => {
    requireRole(to, from, next);
});

export default router;
