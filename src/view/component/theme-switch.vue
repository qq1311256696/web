<template>
  <div style="display:inline-block;padding:0 6px;">
    <div @click="showBtn" style="color:dodgerblue">换肤</div>
    <van-actionsheet v-model="show" :actions="themeList" @select="setTheme"/>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { Actionsheet } from "vant";
export default {
  name: "themeSwitch",
  components: {
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      show: false,
      themeList: [
        {
          name: "黑色主题",
          data: "1",
        },
        {
          name: "白色主题",
          data: "2"
        }
      ]
    };
  },
  methods: {
    showBtn() {
      this.show = true;
    },
    // 动态切换html中的引用路径
    setTheme(themeFile) {
      localStorage.theme = themeFile.data;
      //this.$store.commit('templatesMu', themeFile.data);
      this.show = false;
      location.reload();
    }
  }
};
</script>
