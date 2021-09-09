<template>
  <div class="detail">
    <div class="detail_first">
      <div class="detail_title d-flex">
        <div class="header_detail d-flex">
          <span class="staff_number">Nhân viên 32:</span>
          <span class="time">11/10/2021 10:09:39</span>
          <v-btn class="sua"> <v-icon> mdi-pencil </v-icon>Sửa</v-btn>
          <v-btn class="chiase"> <v-icon>mdi-share</v-icon> Chia sẻ</v-btn>
        </div>
        <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button>
      </div>
      <div class="contents d-flex">
        <div>
          <div class="address">604 Nguyễn Hữu Cảnh</div>
          <div>
            <v-btn id="congdong">Cộng Đồng</v-btn>
            <v-btn id="web">Web</v-btn>
          </div>
          <div class="sell_estate">
            BÁN CHUNG CƯ SEAVIEW 2 100.5 M2 TẦNG TRUNG NHÀ ĐỂ LẠI NỘI THẤT
          </div>
        </div>
        <div class="sell_price">
          <div class="sell">BÁN</div>
          <div class="price">1.73TỶ</div>
        </div>
      </div>
    </div>

    <el-divider></el-divider>
    <!-- <div class="contents02">
      <div class="d-flex small">
        <div class="price">VNĐ 2.5 tỷ</div>
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
    </div> -->
    <v-row class="more_info">
      <v-col cols="3">
        <div class="hightlight">#</div>
        <div>5764</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Tiêu đề</div>
        <div>BÁN CHUNG CƯ SEAVIEW 2 100M5 TẦNG TRUNG NHÀ ĐỂ LẠI NỘI THẤT</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Số nhà</div>
        <div>604</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Đường</div>
        <div>Nguyễn Hữu Cảnh</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Loại nhà</div>
        <div>Nhà cao tầng</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Só lầu</div>
        <div>Nguyễn Hữu Cảnh</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Loại BĐS</div>
        <div>Căn hộ - Chung cư</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Pháp lý</div>
        <div>Số Đỏ</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Nở hậu</div>
        <div>Không</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Diện tích</div>
        <div>100.5m2</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Ngang</div>
        <div>0m</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Dài</div>
        <div>0m</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Mục đích</div>
        <div>Bán</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Nhân viên</div>
        <div>Nguyễn Thị Thanh</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Giá</div>
        <div>1.73 tỷ</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Hướng</div>
        <div>Đông</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Phường</div>
        <div>Phường Nguyễn An Ninh</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Dự án</div>
        <div>Không có</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Khách hàng</div>
        <div>Đông</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Hướng ban công</div>
        <div>Đông Nam</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Số phòng ngủ</div>
        <div>2</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Huyện</div>
        <div>Vũng Tàu</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Block/Khu</div>
        <div>Không có</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">SĐT</div>
        <div>01223443543</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Đã chia sẻ</div>
        <div>Có</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Loại đường</div>
        <div>Mặt tiền đường</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Phí môi giới</div>
        <div>1</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Đã đưa lên Web</div>
        <div>Có</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Đường rộng (m)</div>
        <div>0m</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Tỷ lệ môi giới</div>
        <div>17</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Đăng ký ngày</div>
        <div>11/06/2021 10:09:39</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">Diện tích sàn</div>
        <div>100.5m2</div>
      </v-col>
      <v-col cols="3">
        <div class="hightlight">NGÀY CẬP NHẬT</div>
        <div>08/07/2021 11:07:43</div>
      </v-col>
    </v-row>
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
        <span class="hightlight">-Hiện trạng:</span>
        <span>Để lại nội thất</span>
      </div>
      <div>
        <span class="hightlight">-Giá:</span>
        <span>1.6 Tỷ bớt lộc cho khách thiện chí mua nhanh</span>
      </div>
      <div>
        <span class="hightlight">-Mã tin:</span>
        <span>5764</span>
      </div>
    </div>
    <div class="img_info">
      <div class="img_title">
        <div>Hình ảnh(16)</div>
        <v-btn> <img src="@image/icons/taixuong.svg" alt="" /> Tải xuống</v-btn>
      </div>
      <div class="img_main">
        <img src="@image/layouts/detail_img_1.svg" alt="" />
        <img src="@image/layouts/detail_img_2.svg" alt="" />
        <img src="@image/layouts/detail_img_3.svg" alt="" />
        <img src="@image/layouts/detail_img_4.svg" alt="" />
        <img src="@image/layouts/detail_img_3.svg" alt="" />
      </div>
    </div>

    <div class="customer">Khách hàng</div>
    <div class="comment">
      <div class="name">Bình luận (0)</div>
      <div class="input">
        <el-input placeholder="Nhập nội dung bình luận" v-model="input"></el-input>
        <el-button class="receive">Gửi</el-button>
      </div>
    </div>
    <div class="time_change">
      <div class="time_title">Số lần thay đổi (5)</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Người sửa" width="180">
          <template slot-scope="scope">
            <span style="font-weight: 700" class="staff_table">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Cột" sortable prop="column">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.column }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Giá trị cũ" width="340">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.old }}</span> <br />
            <a href="#">Xem tất cả</a>
          </template>
        </el-table-column>
        <el-table-column label="Giá trị mới" width="340">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.new }}</span>
            <br />
            <a href="#">Xem tất cả</a>
          </template>
        </el-table-column>
        <el-table-column label="Thời điểm" width="220" sortable prop="times">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.times }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  el: "#house-detail",
  data() {
    return {
      input: "",
      tableData: [
        {
          name: "Tom",
          column: "Đã đưa lên Web",
          old: "Chưa",
          new: "Có",
          times: "5/26/2021, 7:54:00 AM",
        },
        {
          name: "SALE ADMIN",
          column: "Mô tả",
          old: "Gia chủ cần vốn làm ăn bán căn hộ 2 phòng ngủ chung cư DIC Phoenix",
          new: "Gia chủ cần vốn làm ăn bán căn hộ 2 phòng ngủ chung cư DIC Phoenix",
          times: "5/26/2021, 7:54:00 AM",
        },
        {
          name: "Vũ Nguyễn Lệ Chi",
          column: "Tình trạng",
          old: "Chưa",
          new: "Có",
          times: "5/26/2021, 7:54:00 AM",
        },
        {
          name: "Tom",
          column: "Đã đưa lên Web",
          old: "Gia chủ cần vốn làm ăn bán căn hộ 2 phòng ngủ chung cư DIC Phoenix",
          new: "Có",
          times: "12/26/2021, 7:54:00 AM",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  font-size: 14px;
  overflow: hidden;
  margin-top: -60px;
  .detail_first {
    background-color: #fff;
    padding: 10px;
    // margin: 0 -10px;
  }
  .more_info {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 20px !important;
  }
  .header_detail {
    align-items: center;
    .staff_number {
      font-weight: 900;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: justify;
      color: #84c7ae;
      margin-right: 5px;
    }
    .staff {
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: justify;
      color: #224957;
    }
    .chiase.v-btn,
    .sua.v-btn {
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
  .detail_title {
    justify-content: space-between;
    align-items: center;
  }
  .col.col-3 {
    padding: 6px 12px !important;
    max-width: 100% !important;
  }
  .contents {
    justify-content: space-between;
    .address {
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: justify;
      color: #224957;
    }
    .sell_estate {
      margin-top: 10px;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: justify;
      color: #224957;
    }
    .sell_price {
      margin-top: 30px;
      .price {
        font-weight: 900;
        font-size: 24px;
        line-height: 24px;
        display: flex;
        align-items: center;

        color: #fbad18;
      }
    }
    .staff {
      align-items: center;
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
  .customer {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    font-weight: 700;
  }
  .img_info {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    .img_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      font-weight: 700;
      .v-btn {
        text-transform: capitalize;
        border: 1px solid #cecece;
        box-sizing: border-box;
        border-radius: 15px;
        box-shadow: none;
        background-color: #fff;
        font-size: 12px;
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
  }
  .description {
    line-height: 24px;
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    .description_title {
      font-size: 18px;
      margin-bottom: 5px;
      font-weight: 700;
    }
  }
  .hightlight {
    font-weight: 700;
  }
  .comment {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    font-weight: 700;

    .input {
      display: flex;
      margin-top: 10px;
    }
    .receive.el-button {
      background: #2db7f5;
      border: 1px solid #2db7f5;
      box-sizing: border-box;
      border-radius: 16px;
      color: #fff;
    }
  }
}
.time_change {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  .time_title {
    font-weight: 700;
  }
  .staff_table {
    font-weight: 700;
  }
}
</style>
