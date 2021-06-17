<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <div class="header_box">
      <v-row align="center" d-flex>
        <v-col cols="8" sm="6" class="app_bar new_titles">
          <button class="homepage" disabled>Tin tức</button>
          <v-btn depressed color="primary" id="social_network"> 16 </v-btn>
        </v-col>
        <v-col cols="4" sm="6" class="app_bar">
          <div class="option_button">
            <v-btn class="mx-2 add_btn" fab dark small color="warning">
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="news_table">
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house1.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house2.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house3.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house4.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house1.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="content_items">
          <div class="content">
            <div class="d-flex img_fix">
              <img src="@image/layouts/house1.png" alt="" />
              <v-btn class="mx-2" icon color="cyan">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div class="create">Tạo bởi My Admin lúc 11-06-2021</div>
            <div class="blog">Loại blog: Tin tức</div>
            <h5>Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land</h5>
            <div class="introduce">GIỚI THIỆU</div>
            <div class="detail">
              Công ty Cổ phần dịch vụ Bất động sản Thịnh Gia Land, tiền thân là công ty
              tnhh dịch vụ Thịnh Gia, với chức năng chính là môi giới các sản phẩm Bất
              động sản như nhà phố, đất ở và chung cư trên địa bàn thành phố Vũng Tàu. Tuy
              mới thành lập không lâu nhưng Thịnh Gia Land đã xác định được hướng đi, thế
              mạnh để kinh doanh
              <span> <a href="">...Xem thêm</a> </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-lazy>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin-top: 20px !important;
  #social_network {
    width: 25px !important;
    height: 15px;
    background: #2db7f5;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 0.5px;
    margin-left: 8px;
  }
  .homepage {
    width: 90px;
    height: 25px !important;
    margin-left: 25px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }

  .option_button {
    text-align: right;
    margin-right: 30px;
    .add_btn {
      width: 24px;
      height: 24px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    }
    .account {
      margin-left: 2px;
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

    .setting {
      padding: 0;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      margin-left: 10px;
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
  }
}
.news_table {
  padding: 20px 20px;
}
.content_items {
  h5 {
    font-size: 16px;
  }
  .content {
    border-radius: 20px;
    background-color: #fff;
    padding: 20px 34px;
    box-shadow: 0 0 20px 1px hsl(0deg 0% 65% / 20%);
    margin: 0 10px 15px;

    .create {
      color: rgb(253, 86, 86);
      font-size: 13px;
      font-weight: 500;
      margin-top: 5px;
    }
    .blog {
      color: rgb(78, 78, 245);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .img_fix {
      justify-content: space-between;
    }
    a {
      font-size: 14px;
    }
    .detail {
      font-size: 15px;
      color: gray;
      line-height: 25px;
    }
    .introduce {
      font-weight: 500;
      color: gray;
      font-size: 15px;
      margin-bottom: 3px;
    }
  }
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -60px !important;
  }
}
@media screen and (max-width: 600px) {
  .content_items {
    .content {
      padding: 20px 15px;
      .v-btn {
        background-color: #dafff4 !important;
      }
      .create {
        font-size: 11px;
      }
      .blog {
        font-size: 11px;
      }
      .introduce {
        font-size: 12px !important;
      }
    }
    h5 {
      font-size: 14px !important;
    }
    .detail {
      font-size: 12px !important;
      line-height: 20px !important;
    }
    img {
      width: 80%;
    }
  }
  .news_table {
    padding: 0px 0px 40px;
  }
  .new_titles {
    padding-top: 0 !important;
  }
  .homepage {
    margin: 0 0 0 15px !important;
  }
  .option_button {
    margin-right: 15px !important;
  }
  .app_bar {
    padding: 0 !important;
    margin-bottom: 30px;
  }
}
</style>
