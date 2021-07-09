<template>
  <div class="detail">
    <div class="detail_title d-flex">
      <div>Chi tiết</div>
      <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button>
    </div>
    <el-divider></el-divider>
    <div class="contents">
      <div class="d-flex small">
        <div class="price">VNĐ 2.5 tỷ</div>
        <div>
          <v-btn id="congdong">Cộng Đồng</v-btn>
          <v-btn id="web">Web</v-btn>
        </div>
      </div>
      <div class="information d-flex">
        <v-icon>mdi-map-marker</v-icon>
        <div class="address">
          12A-06 30 tháng 4, CHUNG CƯ LAPEN CENTER, Phường 9, Vũng Tàu.
        </div>
      </div>
      <div class="information d-flex staff">
        <v-icon>mdi-account</v-icon>
        <div>Nguyễn Thi Diễm Thúy</div>
      </div>
      <v-btn class="chiase"> <v-icon>mdi-share</v-icon> Chia sẻ</v-btn>
      <div class="more_info">
        <div><img src="@image/icons/bed.svg" alt="" /> <span>2</span></div>
        <div><img src="@image/icons/lau.svg" alt="" /> <span>0</span></div>
        <div><img src="@image/icons/width.svg" alt="" /> <span>7m</span></div>
        <div>
          <img src="@image/icons/square.svg" alt="" />
          <span>71<span id="mv">&#13217;</span></span>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="edit">
      <v-btn> <v-icon> mdi-pencil </v-icon>Sửa</v-btn>
      <v-btn> <v-icon> mdi-cloud-upload </v-icon>Tải lên</v-btn>
      <v-btn> <v-icon>mdi-dots-vertical</v-icon> Thêm</v-btn>
    </div>
    <div class="user_logo">
      <img src="@image/icons/user.svg" alt="" />
      <span>Chị Hạnh</span>
    </div>
    <div class="img_title">
      <div>10 ảnh</div>
      <v-btn> <img src="@image/icons/taixuong.svg" alt="" /> Tải xuống</v-btn>
    </div>
    <div class="img_main">
      <img src="@image/layouts/detail_img_1.svg" alt="" />
      <img src="@image/layouts/detail_img_2.svg" alt="" />
      <img src="@image/layouts/detail_img_3.svg" alt="" />
      <img src="@image/layouts/detail_img_4.svg" alt="" />
      <img src="@image/layouts/detail_img_3.svg" alt="" />
    </div>
    <el-divider></el-divider>
    <div class="description">
      <div class="description_title">Mô tả</div>
      <div>
        Cần bán căn hộ 2 phòng ngủ OSC đã trang bị đầy đủ nội thất đầy đủ, tầng trung view
        biển rất mát mẻ, cạnh biển Bãi Sau chỉ 800m, thích hợp nghỉ dưỡng, đi bộ ra biển.
      </div>
      <div>
        <span class="hightlight">-Địa chỉ:</span>
        <span> Chung cư OSC Land, Võ Thị Sáu, Phường Thắng Tam, Vũng Tàu</span>
      </div>
      <div>
        <span class="hightlight">-Diện tích:</span> <span>58m2 rộng rãi, thoáng mát</span>
      </div>
      <div>
        <span class="hightlight">-Kết cấu:</span>
        <span>Gồm 2 phòng ngủ rộng rãi, 1 WC, bếp và phòng khách, đã sửa nội thất. </span>
      </div>
      <div>
        <span class="hightlight">-Hướng cửa:</span>
        <span>
          là hướng Đông Bắc thoáng mát, view hướng Tây Nam nhà rất mát không bị nắng nóng
          vào phòng.</span
        >
      </div>
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
        <div class="hightlight">Căn hộ-Chung cư</div>
      </div>
      <div class="detail_small">
        <div>Pháp Lý</div>
        <div class="hightlight">Sổ hồng</div>
      </div>
      <div class="detail_small">
        <div>Loại Nhà</div>
        <div class="hightlight">Nhà cao tầng</div>
      </div>
      <div class="detail_small">
        <div>Ngang</div>
        <div class="hightlight">0m</div>
      </div>
      <div class="detail_small">
        <div>Dài</div>
        <div class="hightlight">0m</div>
      </div>
      <div class="detail_small">
        <div>Nở hậu</div>
        <div class="hightlight">Không</div>
      </div>
      <div class="detail_small">
        <div>Hướng</div>
        <div class="hightlight">Đông Nam</div>
      </div>
      <div class="detail_small">
        <div>Hướng ban công</div>
        <div class="hightlight">Tây Bắc</div>
      </div>
      <div class="detail_small">
        <div>Mục đích</div>
        <div class="hightlight">Bán</div>
      </div>
      <div class="detail_small">
        <div>SĐT</div>
        <div class="hightlight">012324324</div>
      </div>
      <div class="detail_small">
        <div>Dự án</div>
        <div class="hightlight">CHUNG CƯ LAPEN CENTER</div>
      </div>
      <div class="detail_small">
        <div>Block/Khu</div>
        <div class="hightlight">Không có</div>
      </div>
      <div class="detail_small">
        <div>Block/Khu</div>
        <div class="hightlight">Không có</div>
      </div>
      <div class="detail_small">
        <div>Tầng/Lô</div>
        <div class="hightlight">13</div>
      </div>
      <div class="detail_small">
        <div>Phí môi giới</div>
        <div class="hightlight">1</div>
      </div>
      <div class="detail_small">
        <div>Tỷ lệ môi giới</div>
        <div class="hightlight">0</div>
      </div>
      <div class="detail_small">
        <div>Loại đường</div>
        <div class="hightlight">Mặt tiền đường</div>
      </div>
      <div class="detail_small">
        <div>Diện tích sàn</div>
        <div class="hightlight">71m2</div>
      </div>
      <div class="detail_small">
        <div>Đăng ký ngày</div>
        <div class="hightlight">08/07/2021 10:25:09</div>
      </div>
      <div class="detail_small">
        <div>NGÀY CẬP NHẬT</div>
        <div class="hightlight">08/07/2021 10:25:09</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
