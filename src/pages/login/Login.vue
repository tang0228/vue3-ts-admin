<template>
  <div class="login-container">
    <a-form
      :model="formState"
      name="basic"
      labelAlign="left"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { login } from "@/request/api";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user";

const userStore = useUser();

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
});

const router = useRouter();
const onFinish = (values: any) => {
  login(values.username, values.password).then((res) => {
    if (res.code === 200 && res.data) {
      userStore.setUser(res.data);
      message.success({
        content: "登录成功，欢迎" + res.data.username,
      });
      router.push({
        name: "index",
      });
    } else {
        message.error({
            content: "账号或密码错误"
        })
    }
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>