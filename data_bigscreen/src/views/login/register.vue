<template>
  <div class="register">
    <div class="tit">
      <h2>注册</h2>
    </div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { register } from "../../api/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import md5 from "js-md5";

interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const router = useRouter();
    const formState = reactive<FormState>({
      username: "admin",
      password: "123456",
    });
    const onFinish = (values: any) => {
      let data = {
        username: values.username,
        password: md5(values.password),
      };
      registerData(data);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const registerData = (values: any) => {
      register(values).then((res) => {
        switch (res.status) {
          case "000000":
            message.info(res.message);
            setTimeout(() => {
              router.push("/login");
            }, 500);
            break;
          case "000001":
            message.warning(res.message);
            break;
        }
      });
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
