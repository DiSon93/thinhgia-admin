<template>
  <v-app>
    <v-navigation-drawer
      class="toolbar"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <img src="@image/layouts/THINH GIA_Logo_Color_Ngang.png" />
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="header_box"
      v-if="this.$route.path == '/'"
    >
      <v-row align="center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="app-bar-icon" />
        <button class="homepage" disabled>Trang chủ</button>
        <b-input-group class="search">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            placeholder="Tìm kiếm tất cả thông tin"
            type="search"
          ></b-form-input>
        </b-input-group>
        <v-btn color="warning" dark id="createBDS"
          ><img src="@image/icons/Vector.svg" />Tạo BĐS
        </v-btn>
        <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
        <v-btn class="notifiaction" fab
          ><img src="@image/icons/bell-badge-noti.jpg" alt=""
        /></v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container class="main_content" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span class="footer_state">© 2021 Thinh Gia Land. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    // console.log(this.$route.path);
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home-edit",
          title: "Trang chủ",
          to: "/",
        },
        {
          icon: "mdi-bank-check",
          title: "Bất động sản",
          to: "/real-estate",
        },
        {
          icon: "mdi-account-switch",
          title: "Khách hàng",
          to: "/customers",
        },
        {
          icon: "mdi-email-multiple",
          title: "Nhu cầu",
          to: "/demands",
        },
        {
          icon: "mdi-share-variant-outline",
          title: "Dự án",
          to: "/projects",
        },
        {
          icon: "mdi-newspaper-variant-multiple-outline",
          title: "Tin tức",
          to: "/news",
        },
        {
          icon: "mdi-account-cog",
          title: "Quản trị",
          to: "/administrator",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  background: #f8f8f8;
  // width: 208px !important;
  line-height: 24px;
  img {
    width: 221px;
    height: 57px;
    left: 0px;
    top: 0px;
    margin-top: 6px;
  }
  .v-list-item--active {
    color: #fff;
    background: #fbad18;
  }
  .v-list-item {
    text-decoration: none;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list-item__title {
    font-size: 14px !important;
    text-decoration: none;
  }
  .v-list-item__action {
    margin-left: 20px;
    margin-right: 10px;
  }
}
.header_box {
  // left: 208px !important;
  background: #eff5f9 !important;
  .homepage {
    width: 77px;
    height: 25px !important;
    margin-left: 36px;
    // margin-top: 35px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  .search {
    margin-left: 378px;
    position: relative;
    bottom: 10px;
    .bi-search {
      position: absolute;
      top: 5px;
      left: 16px;
      font-weight: 700;
      z-index: 9999;
      font-size: 16px;
    }
    .form-control {
      position: absolute;
      font-size: 12px;
      top: -26px;
      padding-left: 45px;
      height: 26px;
      letter-spacing: 0.5px;
      width: 295px;
      border-radius: 15px;
      border: 1px solid rgba(96, 96, 96, 0.2);
      border-left: none;
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
    .input-group-text {
      position: absolute;
      top: -26px;
      border: none;
      background-color: transparent;
    }
  }
  #createBDS {
    position: absolute;
    right: 10%;
    // background: #fbad18;
    border-radius: 15px;
    width: 109px;
    height: 26px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 12px;
    // line-height: 26px;
    // color: #ffffff;
    // text-align: center;
    // border: 1px solid transparent;
    text-transform: capitalize;
    img {
      margin-top: -4px;
      margin-right: 4px;
      width: 17px;
      height: 15px;
    }
    // &:hover {
    //   border: 1px solid blue;
    //   transition: 0.5s;
    // }
  }
  .account {
    position: absolute;
    left: 92.35%;
    padding: 0;
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    background-color: #fff !important;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    &:hover {
      border: 1px solid blue;
      transition: 0.5s;
    }
  }
  .notifiaction {
    position: absolute;
    left: 94.78%;
    border: none;
    box-shadow: none;
    background-color: #eff5f9 !important;
    width: 24px !important;
    height: 24px !important;
    img {
      width: 18px;
      height: 20.57px;
      border-radius: 50%;
    }
    &:hover {
      border: 1px solid blue;
      transition: 0.5s;
    }
  }
}
.v-main {
  // padding: 64px 0px 36px 209px !important;
  background: #eff5f9;
}
.main_content {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  width: 100% !important;
}
.v-footer--absolute {
  .footer_state {
    font-weight: 300;
    font-size: 13px;
    text-align: center;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1265px) {
  .toolbar {
    width: 208px !important;
  }
  .header_box {
    left: 208px !important;
  }
  .v-main {
    padding: 64px 0px 36px 209px !important;
  }
  .app-bar-icon {
    display: none;
  }
  .search {
    bottom: 0 !important;
  }
}
</style>
