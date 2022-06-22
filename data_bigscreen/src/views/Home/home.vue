<template>
  <div class="home">
    <img src="../../assets/images/bg.png" alt="" class="bgImg" />
    <div class="container">
      <div class="head">
        <div class="time">{{ time }}</div>
        <div class="title">智慧决策系统</div>
        <div class="info">
          <div class="admin">欢迎，{{ username }}</div>
          <div class="logout" @click="updata">修改密码</div>
          <div class="logout" @click="logout">退出</div>
        </div>
      </div>
      <hr />
      <div class="content"></div>
    </div>
    <a-config-provider :locale="locale">
      <a-modal v-model:visible="visible" title="退出" @ok="handleOk">
        <p>是否退出系统？</p>
      </a-modal>
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { onUnmounted, ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import { getInfo } from "../../api/user";

interface navListType {
  title: string;
  path: string;
}
export default {
  setup() {
    const router = useRouter();
    let time = ref<string>(" ");
    const username = ref<string>(" ");
    const navList: Array<navListType> = [
      {
        title: "经营",
        path: "jinyin",
      },
      {
        title: "财务",
        path: "caiwu",
      },
    ];

    const logout = () => {
      visible.value = true;
    };

    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
      message.info("退出成功");
      localStorage.clear();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    };

    // 获取当前时间
    const getData = () => {
      const data = new Date();
      time.value = `${data.getFullYear()}年${
        data.getMonth() + 1
      }月${data.getDate()}日 ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    };
    getData();
    setInterval(() => {
      getData();
    }, 1000);

    onMounted(() => {
      getInfo().then((res) => {
        username.value = res.username;
      });
    });
    onUnmounted(() => {
      setTimeout.caller();
      setInterval.caller();
    });

    return {
      logout,
      visible,
      showModal,
      handleOk,
      locale: zhCN,
      time,
      username,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  .container {
    .head {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin: 0 20px;
      .time {
        color: #4172c2;
        font-size: 18px;
        line-height: 60px;
      }
      .title {
        color: #fff;
        font-size: 28px;
        line-height: 60px;
        margin-left: 50px;
      }
      .info {
        display: flex;
        justify-content: space-around;
        color: #4172c2;
        font-size: 18px;
        line-height: 60px;
        .logout {
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
