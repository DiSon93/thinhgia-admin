<template>
  <div>
    <el-dropdown
      class="account"
      @command="handleCommand"
      trigger="click"
      placement="bottom"
    >
      <button class="share">
        <img src="@image/icons/share.png" alt="" />
        <span>Chia sẻ</span>
      </button>
      <el-dropdown-menu slot="dropdown" id="dropdown_social">
        <el-dropdown-item>
          <div
            class="zalo-share-button"
            :data-href="url"
            data-oaid="53253160592962497"
            data-layout="1"
            data-color="blue"
            data-customize="false"
          ></div>
        </el-dropdown-item>
        <el-dropdown-item>
          <ShareNetwork
            network="facebook"
            :url="url"
            title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
            description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
            quote=""
            hashtags="BĐSViet,BĐS"
            class="share_facebook"
          >
            <img src="@image/icons/facebook.png" alt="" /> Chia sẻ
          </ShareNetwork>
        </el-dropdown-item>
        <el-dropdown-item command="URL"> Copy URL </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ["id", "title"],
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    this.handleCommand();
    this.url = `https://khobatdongsanviet.demo.fit`;
  },
  methods: {
    handleCommand(command) {
      if (command == "URL") {
        this.copyURLNotification();
      }
    },
    copyURLNotification() {
      // var copyText = document.getElementById("myInput");
      // copyText.select();
      // copyText.setSelectionRange(0, 99999); /* For mobile devices */
      // document.execCommand("copy");
      navigator.clipboard.writeText("https://khobatdongsanviet.demo.fit/");
      this.$notify({
        title: "Success",
        message: "Copy URL successfull!!!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.share_facebook {
  text-decoration: none;
  img {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-top: -5px;
  }
}
.share {
  font-size: 11px;
}
.zalo-share-button {
  margin-bottom: -10px;
  margin-top: 5px;
}
</style>
