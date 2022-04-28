<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in navs" :key="item.path">
          <router-link :to="{ name: item.key }" exact>
            {{ item.name }}
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{$route}}</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div class="user-info">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar :src="userStore.user.avatarUrl" />
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="handleLogon">退出</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '480px' }"
        >
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        tang yuanqing doing
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <a-back-top> </a-back-top>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import routes from "@/router/routes.ts";
import { DownOutlined } from "@ant-design/icons-vue";
import { useUser } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { message } from 'ant-design-vue';

const userStore = useUser(); // 仓库

const $route = useRoute();

let collapsed = ref<boolean>(false);
let selectedKeys = ref<string[]>([routes[0].path]);

onBeforeMount(() => {
  // 解决刷新浏览器导致当前导航未选中的问题
  selectedKeys.value = [$route.path];
});

interface INavs {
  name: string;
  key: string;
  path: string;
}

const navs: INavs[] = [
  { name: "首页", key: "index", path: "/" },
  { name: "列表", key: "list", path: "/list" },
  { name: "留言板", key: "message", path: "/message" },
  { name: "关于我", key: "about", path: "/about" },
];

const $router = useRouter();

const handleLogon = () => {
  message.success("退出登录成功");
  userStore.delUser();
  $router.push("/login");
};
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.user-info {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
}
</style>
