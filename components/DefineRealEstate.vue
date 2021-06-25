<template>
  <div class="define_estate">
    <div class="estate_items">
      <div class="estate_id">ID: 5773</div>
      <div class="title_sell">BÁN NHÀ 1 TRỆT 1 LẤU ĐƯỜNG RỘNG 4M</div>
      <div>Ngày cập nhật: 11/06/2021 14:22:27</div>
      <div class="estate_content" v-bind:class="{ adjust: read }">
        Chủ nhà chuyển công tác cần bán căn nhà xây tâm huyết chắc chắn cách mặt tiền
        đường Kha Vạn Cân chỉ 30m Nhà trong hẻm an ninh tốt, khu cán bộ nên dân trí cao,
        gần trường mầm non, gần Đại học Bà Rịa - Vũng Tàu, chợ 5 tầng, gần cửa hàng bách
        hóa, quán ăn tấp nập bán kính 500m có đầy đủ mọi tiện ích. nơi giá trị bất động
        sản không ngừng tăng cao, bạn mua ở hay đầu tư đều thích hợp. - Giá: 4.5 tỷ TL -
        Diện tích: 47m2 thổ cư thực tế hơn 52m2 được sử dụng mảnh đất nhỏ phía sau nhà
        không tranh chấp. - Kích thước: 4.9m x 9.5m nở hậu 5m - Kết cấu: Nhà được xây kiên
        cố và tâm huyết với kết cấu 1 trệt 2 lầu, 3 phòng ngủ 4 wc giếng trời - Hướng:
        Đông nam - Đường trước nhà: 3m - Pháp lý: Sổ đỏ - Địa chỉ: Kha Vạn Cân, Phường 7,
        Tp. Vũng Tàu
      </div>
      <a href="javascript:;" @click="readMore"> {{ read ? "Rút gọn" : "Xem thêm" }} </a>
      <div class="btn_edit">
        <v-btn class="mx-2 edit" fab dark color="blue-grey" x-small>
          <v-icon dark> mdi-square-edit-outline </v-icon>
        </v-btn>
        <v-btn class="mx-2 check" fab dark color="green" x-small>
          <i class="el-icon-check"></i>
        </v-btn>
        <v-btn class="mx-2 delete" fab dark color="red" x-small>
          <i class="el-icon-close"></i>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      read: false,
    };
  },
  methods: {
    readMore: function () {
      this.read = !this.read;
    },
  },
};
</script>

<style lang="scss" scoped>
.define_estate {
  padding: 0px 0px;
  .estate_items {
    border-radius: 20px;
    background-color: #fff;
    padding: 20px 35px;
    box-shadow: 0 0 20px 1px hsl(0deg 0% 65% / 20%);
    font-size: 13px;
    line-height: 35px;
    .estate_id {
      font-weight: 700;
      font-size: 15px;
    }
    .title_sell {
      font-size: 14px;
      font-weight: 700;
    }
    .estate_content {
      font-size: 14px;
      height: 70px;
      overflow: hidden;
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
</style>
