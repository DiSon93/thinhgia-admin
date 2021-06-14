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
  width: 208px !important;
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

.v-main {
  padding: 64px 0px 36px 209px !important;
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
</style>
