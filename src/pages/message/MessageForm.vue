<template>
  <a-form :model="formState" @finish="onFinish">
    <a-form-item label="昵称" name="nickname">
      <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
    </a-form-item>
    <a-form-item label="内容" name="content">
      <a-textarea v-model:value="formState.content" placeholder="请输入留言内容" :rows="4" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">提交评论</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import type { UnwrapRef } from "vue";
import { postMessage } from "@/request/api";
import { message } from "ant-design-vue";

interface FormState {
  nickname: string;
  content: string;
}

const formState: UnwrapRef<FormState> = reactive({
  nickname: "",
  content: "",
});

const emits = defineEmits(["comment"]);

const onFinish = (val: FormState) => {
  if (!val.nickname || !val.content) {
    message.warn({
      content: "昵称或内容不可以为空哦☺",
    });
    return;
  }
  postMessage(val.nickname, val.content).then((res) => {
    message.success({
      content: "留言成功",
    });
    emits("comment", res.data);
  });
};
</script>
<style scoped>
</style>
