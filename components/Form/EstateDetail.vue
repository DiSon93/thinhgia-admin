<template>
  <div class="detail" v-loading="loading">
    <div class="detail_title d-flex">
      <div>Chi tiết</div>
      <div>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItem"
        ></el-button>
        <!-- <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button> -->
      </div>
    </div>
    <el-divider></el-divider>
    <div class="contents">
      <div class="d-flex small">
        <div class="price">VNĐ {{ estateItem.price }} {{ estateItem.unit_price }}</div>
        <div>
          <v-btn id="congdong">Cộng Đồng</v-btn>
          <v-btn id="web">Web</v-btn>
          <NuxtLink :to="`detail/house/${estateId}`">
            <img src="@image/icons/views.svg" alt="" />
          </NuxtLink>
        </div>
      </div>
      <div class="information d-flex">
        <v-icon>mdi-map-marker</v-icon>
        <div class="address">
          {{ estateItem.address }}, {{ estateItem.district }}, {{ estateItem.area }}
        </div>
      </div>
      <div class="information d-flex staff">
        <v-icon>mdi-account</v-icon>
        <div>{{ estateItem.customer }}</div>
      </div>
      <v-btn class="chiase"> <v-icon>mdi-share</v-icon> Chia sẻ</v-btn>
      <div class="more_info">
        <div>
          <img src="@image/icons/bed.svg" alt="" /> <span>{{ estateItem.bedroom }}</span>
        </div>
        <div>
          <img src="@image/icons/lau.svg" alt="" /> <span>{{ estateItem.floor }}</span>
        </div>
        <div>
          <img src="@image/icons/width.svg" alt="" /> <span>{{ estateItem.road }}m</span>
        </div>
        <div>
          <img src="@image/icons/square.svg" alt="" />
          <span>{{ estateItem.square }}<span id="mv">&#13217;</span></span>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="edit">
      <v-btn @click="updateRealEstate"> <v-icon> mdi-pencil </v-icon>Sửa</v-btn>
      <v-btn> <v-icon> mdi-cloud-upload </v-icon>Tải lên</v-btn>
      <v-btn> <v-icon>mdi-dots-vertical</v-icon> Thêm</v-btn>
    </div>
    <div class="user_logo">
      <img src="@image/icons/user.svg" alt="" />
      <span>{{ estateItem.staff }}</span>
    </div>
    <div class="img_title">
      <div>{{ estateItem.image_private.length }} ảnh</div>
      <v-btn> <img src="@image/icons/taixuong.svg" alt="" /> Tải xuống</v-btn>
    </div>
    <div class="img_main">
      <img
        v-for="item in estateItem.image_private"
        :key="item.id"
        :src="item.thumbnail"
        alt=""
      />
    </div>
    <el-divider></el-divider>
    <div class="description">
      <div class="description_title">Mô tả</div>
      <div v-html="estateItem.descriptions"></div>
      <div>
        <span class="hightlight">-Pháp lý:</span>
        <span>Sổ hồng chính chủ vay ngân hàng lên đến 70%</span>
      </div>
      <div>
        <span class="hightlight">-Giá:</span>
        <span>1.6 Tỷ bớt lộc cho khách thiện chí mua nhanh</span>
      </div>
    </div>
    <div class="dimention">
      <div class="detail_small">
        <div>Loại BĐS</div>
        <div class="hightlight">{{ estateItem.estate_type }}</div>
      </div>
      <div class="detail_small">
        <div>Pháp Lý</div>
        <div class="hightlight">{{ estateItem.law }}</div>
      </div>
      <div class="detail_small">
        <div>Loại Nhà</div>
        <div class="hightlight">{{ estateItem.home_type }}</div>
      </div>
      <div class="detail_small">
        <div>Ngang</div>
        <div class="hightlight">{{ estateItem.width }}</div>
      </div>
      <div class="detail_small">
        <div>Dài</div>
        <div class="hightlight">{{ estateItem.length }}</div>
      </div>
      <div class="detail_small">
        <div>Nở hậu</div>
        <div class="hightlight">{{ estateItem.iron }}</div>
      </div>
      <div class="detail_small">
        <div>Hướng</div>
        <div class="hightlight">{{ estateItem.direction }}</div>
      </div>
      <div class="detail_small">
        <div>Hướng ban công</div>
        <div class="hightlight">{{ estateItem.loby }}</div>
      </div>
      <div class="detail_small">
        <div>Mục đích</div>
        <div class="hightlight">{{ estateItem.side }}</div>
      </div>
      <div class="detail_small">
        <div>SĐT</div>
        <div class="hightlight">{{ estateItem.phone }}</div>
      </div>
      <div class="detail_small">
        <div>Dự án</div>
        <div class="hightlight">{{ estateItem.projectName }}</div>
      </div>
      <div class="detail_small">
        <div>Phí môi giới</div>
        <div class="hightlight">{{ estateItem.fee }}</div>
      </div>
      <div class="detail_small">
        <div>Tỷ lệ môi giới</div>
        <div class="hightlight">{{ estateItem.brokerage_amount }}</div>
      </div>
      <div class="detail_small">
        <div>Loại đường</div>
        <div class="hightlight">{{ estateItem.road_type }}</div>
      </div>
      <div class="detail_small">
        <div>Diện tích sàn</div>
        <div class="hightlight">{{ estateItem.large }}m2</div>
      </div>
      <div class="detail_small">
        <div>Đăng ký ngày</div>
        <div class="hightlight">{{ estateItem.register }}</div>
      </div>
      <div class="detail_small">
        <div>NGÀY CẬP NHẬT</div>
        <div class="hightlight">{{ estateItem.update }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["estateId", "estateItem"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    updateRealEstate() {
      this.$router.push(`/form/house/update/${this.estateId}`);
    },
    deleteItem() {
      this.$confirm(`Are you sure to delete this real-estate. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.deleteThisRealEstate();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async deleteThisRealEstate() {
      try {
        await this.$store.dispatch("realEstate/deleteEstateInSystem", this.estateId);
        this.loading = false;
        setTimeout(this.openNotificationSuccess(), 500);
        this.$router.push("/real-estate");
        this.$emit("cancel-modals");
      } catch {
        this.loading = false;
        this.showErrorNotification();
      }
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Delete real-esate successfull!!!",
        type: "success",
      });
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 400px;
  font-size: 14px;
  background-color: #fff;
  padding: 10px;
  overflow: hidden;
  .detail_title {
    justify-content: space-between;
    align-items: center;
  }
  .contents {
    .information {
      .v-icon {
        margin-right: 5px;
        align-items: flex-start;
      }
    }
    .staff {
      align-items: center;
    }
    .more_info {
      display: flex;
      justify-content: space-between;
      img {
        margin-right: 5px;
        width: 16px;
        height: 16px;
      }
    }
    .chiase.v-btn {
      box-shadow: none;
      background-color: transparent;
      color: #fbad18;
      text-transform: capitalize;
      padding: 0;
      margin: 2px 0;
    }
    .small {
      justify-content: space-between;
      margin-bottom: 12px;
      img {
        margin-left: 20px;
      }
    }
    .price {
      font-weight: 900;
      font-size: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: justify;
      color: #224957;
    }
    #congdong {
      font-weight: 300;
      font-size: 8px;
      line-height: 24px;
      letter-spacing: 0.5px;
      color: #ffffff;
      background: #2db7f5;
      border-radius: 15px;
      height: 19px;
      padding: 0 12px;
    }
    #web {
      background: #87d068;
      border-radius: 15px;
      font-weight: 300;
      font-size: 8px;
      line-height: 24px;
      letter-spacing: 0.5px;
      color: #ffffff;
      height: 19px;
      padding: 0 12px;
    }
  }
  .el-divider.el-divider--horizontal {
    margin: 12px 0;
  }
  .user_logo {
    background: #ffffff;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
    padding: 8px 0 8px 8px;
    margin: 12px -12px 0;
    img {
      margin-right: 5px;
    }
    font-weight: 500;
  }
  .edit {
    display: flex;
    justify-content: space-around;
    .v-btn {
      background-color: transparent;
      border: none;
      box-shadow: none;
      color: #fbad18;
      text-transform: capitalize;
      .v-icon {
        margin-right: 5px;
      }
    }
  }
  .img_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    .v-btn {
      text-transform: capitalize;
      border: 1px solid #cecece;
      box-sizing: border-box;
      border-radius: 15px;
      box-shadow: none;
      background-color: #fff;
    }
  }
  .img_main {
    img {
      width: 100px;
      height: 100px;
      margin: 0 5px;
      border-radius: 10px;
    }
    display: flex;
    overflow-x: auto;
  }
  .description {
    line-height: 24px;
    .description_title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .hightlight {
      font-weight: 700;
    }
  }
  .dimention {
    line-height: 24px;
    .detail_small {
      display: flex;
      justify-content: space-between;
      .hightlight {
        font-weight: 700;
      }
    }
  }
}
</style>
