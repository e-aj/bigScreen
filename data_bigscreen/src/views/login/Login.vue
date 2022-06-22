<template>
  <div class="login">
    <div class="title">
      <h2>登录</h2>
    </div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
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

      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button type="primary" html-type="submit">登录</a-button>
        <a-button @click="toResgister">去注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { login } from "../../api/user";
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
      loginData(data);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    const loginData = (values: any) => {
      login(values).then((res) => {
        switch (res.status) {
          case "000000":
            message.info(res.message);
            localStorage.setItem("token", res.token);
            setTimeout(() => {
              router.push("/");
            }, 500);
            break;
          case "000001":
            message.warning(res.message);
            break;
          case "000002":
            message.error(res.message);
            break;
        }
      });
    };

    const toResgister = () => {
      router.push("/register");
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      toResgister,
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  .title {
    h2 {
      text-align: center;
      margin-top: 100px;
    }
  }
  .ant-form {
    margin-top: 100px;
    margin: auto;
  }
}
</style>
