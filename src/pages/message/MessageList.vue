<template>
  <a-list item-layout="horizontal" :data-source="list" :loading="initLoading">
    <template #loadMore>
      <div
        v-if="!initLoading && !loading"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <a-button @click="onLoadMore">加载更多</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.nickname }} - {{item.commentTime}}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" />
            </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang='ts' setup>
import { ref } from "vue";
defineProps(["list", "data", "loading", "initLoading"]);

const emits = defineEmits("onLoadMore");
const onLoadMore = () => {
  emits("onLoadMore");
};
</script>
<style scoped>
</style>
