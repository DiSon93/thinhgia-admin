<template>
  <div v-loading="loading" class="approveEstate">
    <div class="define_estate" v-if="approveRealList">
      <div class="estate_items" v-for="item in approveList" :key="item.id">
        <div class="estate_id">ID: {{ item.id }}</div>
        <div class="title_sell">{{ item.title ? item.title.toUpperCase() : null }}</div>
        <div>
          Ngày cập nhật:
          {{ item.created_at.slice(0, 10) }}
          {{ item.created_at.slice(11, 19) }}
        </div>
        <div class="adjust" v-bind:class="{ estate_content: item.read }">
          <div v-html="item.descriptions"></div>
        </div>
        <a href="javascript:;" @click="item.read = !item.read">
          {{ item.read ? "Xem thêm" : "Rút gọn" }}
        </a>
        <div class="btn_edit">
          <v-btn
            class="mx-2 edit"
            fab
            dark
            color="blue-grey"
            x-small
            @click="$router.push(`/detail/house/${item.id}`)"
          >
            <v-icon dark> mdi-square-edit-outline </v-icon>
          </v-btn>
          <v-btn
            class="mx-2 check"
            fab
            dark
            color="green"
            x-small
            @click="approveRealEstate(item.id)"
          >
            <i class="el-icon-check"></i>
          </v-btn>
          <v-btn
            class="mx-2 delete"
            fab
            dark
            color="red"
            x-small
            @click="deleteApproveRealEstate(item.id)"
          >
            <i class="el-icon-close"></i>
          </v-btn>
        </div>
      </div>
    </div>
    <div v-if="approveList.length == 0">No data available</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["is_share"],
  data() {
    return {
      read: true,
      rowPerPage: 10,
      page: 1,
      approveList: [],
      loading: false,
      role_user: "",
    };
  },
  created() {
    this.getApproveRealEstateList();
    // this.getRealEstateListPerPage();
  },
  computed: {
    ...mapState("realEstate", ["approveRealList"]),
    ...mapState("auth", ["currentUser"]),
  },
  mounted() {
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
  },
  methods: {
    async getApproveRealEstateList() {
      let share_status = "";
      this.loading = true;
      if (this.is_share == "Cộng Đồng") {
        share_status = "public";
      } else if (this.is_share == "Web") {
        share_status = "web";
      }
      try {
        await this.$store.dispatch("realEstate/getApproveRealEstateList", {
          limit: this.rowPerPage,
          page: this.page,
          share: share_status,
        });
        this.approveList = this.approveRealList.map((item) => {
          return { ...item, read: true };
        });
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    approveRealEstate(item) {
      if (this.role_user != 1) {
        this.forbidden();
        return;
      }
      this.$confirm(
        `Are you sure to approve to share this real estate. Continue?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          this.approveRealEstateInSystem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `Aprrove canceled`,
          });
        });
    },
    deleteApproveRealEstate(item) {
      if (this.role_user != 1) {
        this.forbidden();
        return;
      }
      this.$confirm(
        `Are you sure to delete to share this real estate. Continue?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          this.deleteApproveRealEstateInSystem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `Delete canceled`,
          });
        });
    },
    async approveRealEstateInSystem(_id) {
      try {
        await this.$store.dispatch("realEstate/approveRealEstate", {
          id: _id,
          share: this.is_share == "Cộng Đồng" ? "public" : "web",
        });
        setTimeout(this.openNotificationSuccess, 500);
        await this.getApproveRealEstateList();
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    async deleteApproveRealEstateInSystem(_id) {
      try {
        await this.$store.dispatch("realEstate/deleteEstateInApproveList", {
          id: _id,
          share: this.is_share == "Cộng Đồng" ? "public" : "web",
        });
        setTimeout(this.openNotificationSuccessDelete, 500);
        await this.getApproveRealEstateList();
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Approve this real-estate successfull!!!",
        type: "success",
      });
    },
    openNotificationSuccessDelete() {
      this.$notify({
        title: "Success",
        message: "Delete this real-estate successfull!!!",
        type: "success",
      });
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },
    forbidden() {
      this.$message.error(
        "403, Forbidden. Can not do this function due to lacking of permission."
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.define_estate {
  padding: 0px 0px;
  width: 100%;
  .estate_items {
    border-radius: 20px;
    background-color: #fff;
    padding: 20px 35px;
    box-shadow: 0 0 20px 1px hsl(0deg 0% 65% / 20%);
    font-size: 13px;
    line-height: 35px;
    margin-bottom: 20px;
    .estate_id {
      font-weight: 700;
      font-size: 15px;
    }
    .title_sell {
      font-size: 14px;
      font-weight: 700;
    }
    .estate_content {
      // font-size: 14px;
      // height: 70px;
      // overflow: hidden;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .adjust {
      height: auto !important;
    }
    a {
      color: #fbad18;
    }
    .btn_edit {
      .edit {
        background-color: #606060;
        box-shadow: none;
      }
      .check {
        box-shadow: none;
        i {
          font-size: 15px;
        }
      }
      .delete {
        box-shadow: none;
        i {
          font-size: 15px;
        }
      }
    }
  }
}
.approveEstate {
  width: 100%;
}
</style>
