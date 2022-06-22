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
      <div class="content">
        <data1 />
      </div>
    </div>
    <a-config-provider :locale="locale">
      <a-modal v-model:visible="visible" title="退出" @ok="handleOk">
        <p>是否退出系统？</p>
      </a-modal>
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { onUnmounted, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import { getInfo } from "../../api/user";
import data1 from "../data/data.vue";

interface navListType {
  title: string;
  path: string;
}
export default {
  components: {
    data1,
  },
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

    // 补零操作
    const fillZero = (num: any) => {
      if ((num + "").length >= 2) {
        return num;
      } else {
        return "0" + num;
      }
    };
    // 获取当前时间
    const getData = () => {
      const data = new Date();
      let year = fillZero(data.getFullYear());
      let month = fillZero(data.getMonth() + 1);
      let date = fillZero(data.getDate());
      let hours = fillZero(data.getHours());
      let minutes = fillZero(data.getMinutes());
      let seconds = fillZero(data.getSeconds());
      time.value = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds}`;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 0 20px;
      border-bottom: 1px solid #fff;

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

    .content {
      flex: 1;
    }
  }
}
</style>
