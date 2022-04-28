<template>
  <div class="message-container">
    <MessageForm @comment="comment"></MessageForm>
    <a-divider orientation="left">留言列表({{ list.length }})</a-divider>
    <MessageList
      :list="list"
      :data="data"
      :initLoading="initLoading"
      :loading="loading"
      @onLoadMore="onLoadMore"
    ></MessageList>
  </div>
</template>

<script lang='ts' setup>
import { getMessage } from "@/request/api";
import { onBeforeMount, ref, nextTick } from "vue";
import MessageForm from "./MessageForm.vue";
import MessageList from "./MessageList.vue";

const count = 10;

const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onBeforeMount(() => {
  getMessage(10).then((res) => {
    initLoading.value = false;
    data.value = res.data;
    list.value = res.data;
  });
});

const onLoadMore = (val) => {
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))
  );
  getMessage().then((res) => {
    const newData = data.value.concat(res.data);
    loading.value = false;
    data.value = newData;
    list.value = newData;
    nextTick(() => {
      window.dispatchEvent(new Event("resize"));
    });
  });
};

const comment = (data) => {
  list.value.unshift(data);
};
</script>
<style scoped>
</style>