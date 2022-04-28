<template>
  <a-table :dataSource="list">
    <a-table-column key="name" title="姓名" data-index="name" :width="120">
      <template #default="{ record }">
        <a @click="watchUser(record)"
          ><a-avatar :src="record.avatarUrl" />{{ record.name }}</a
        >
      </template>
    </a-table-column>
    <a-table-column key="city" title="城市" data-index="city" :width="120" />
    <a-table-column
      key="birthday"
      title="生日"
      data-index="birthday"
      :width="120"
    />
    <a-table-column key="email" title="邮箱" data-index="email" />
    <a-table-column key="hobby" title="爱好" data-index="hobby" :width="150">
      <template #default="{ text: hobby }">
        <a-tag color="#55acee">{{ hobby }}</a-tag>
      </template>
    </a-table-column>
    <a-table-column
      key="description"
      title="描述"
      data-index="description"
      :width="320"
      :ellipsis="true"
    />
    <a-table-column key="action" title="操作" align="right" :width="150">
      <template #default="{ record }">
        <span>
          <a @click="watchUser(record)">查看</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除这位用户吗？删除将失去此人的信息，请慎重！"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table-column>
  </a-table>
  <a-drawer
    v-model:visible="visible"
    :width="720"
    title="用户信息"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="currentUser" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="ID" name="id">
            <a-input disabled v-model:value="currentUser.id" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="姓名" name="name">
            <a-input v-model:value="currentUser.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="城市" name="city">
            <a-input v-model:value="currentUser.city" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="currentUser.email" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="爱好" name="hobby">
            <a-select
              v-model:value="currentUser.hobby"
              :size="size"
              style="width: 100%"
              :options="options"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="生日" name="birthday">
            <a-date-picker
              value-format="YYYY-MM-DD"
              v-model:value="currentUser.birthday"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="描述" name="description">
            <a-textarea v-model:value="currentUser.description" :rows="4" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onSure">确定修改</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script lang='ts' setup>
import UserInfo from "./UserInfo.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { getList } from "@/request/api";
import { IUser } from "../../mock/list";
import { message } from "ant-design-vue";
import { hobbys } from "@/mock/data";
let list = ref<Array>([]);
const visible = ref<boolean>(false);
const currentUser = ref<IUser>({
  id: "",
  name: "",
  avatarUrl: "",
  description: "",
  hobby: "",
  birthday: "",
  city: "",
});

const options = hobbys.map((h) => ({
  value: h,
}));

onBeforeMount(() => {
  getList().then((res) => {
    list.value = res.data;
  });
});

// 查看某个用户信息
const watchUser = (record: Object) => {
  // 简单深拷贝，解决修改时导致列表内容的改变的问题
  const copyRecord = JSON.stringify(record);
  visible.value = true;
  currentUser.value = JSON.parse(copyRecord);
};

// 关闭抽屉
const onClose = () => {
  visible.value = false;
};

// 确认修改用户信息
const onSure = () => {
  list.value.forEach((l, index) => {
    if (l.id === currentUser.value.id) {
      list.value[index] = {...list[index], ...currentUser.value};
      onClose();
      message.success("修改成功");
    }
  });
};

// 删除单个用户
const confirm = (id: string) => {
  list.value = list.value.filter((ele) => ele.id !== id);
  message.success("删除成功");
};
</script>
<style scoped>
</style>