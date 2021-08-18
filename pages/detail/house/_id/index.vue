<template>
  <div class="detail" v-if="showDetail" v-loading="loading">
    <div class="detail_first">
      <div class="detail_title d-flex">
        <div class="header_detail">
          <div class="d-flex">
            <span class="staff_number">Nhân viên {{ showDetail.staff.id }}:</span>
            <span class="time" v-if="showDetail">{{ showDetail.updated_at }}</span>
          </div>
          <div class="d-flex">
            <v-btn
              class="sua"
              @click="$router.push(`/form/house/update/${$route.params.id}`)"
            >
              <v-icon> mdi-pencil </v-icon>Sửa</v-btn
            >
            <el-dropdown
              class="account"
              @command="handleCommand"
              trigger="click"
              placement="bottom-start"
            >
              <v-btn class="chiase"> <v-icon>mdi-share</v-icon> Chia sẻ</v-btn>
              <el-dropdown-menu slot="dropdown" id="dropdown_social">
                <el-dropdown-item>
                  <div
                    class="zalo-share-button"
                    data-href="https://khobatdongsanviet.demo.fit/"
                    data-oaid="579745863508352884"
                    data-layout="1"
                    data-color="blue"
                    data-customize="false"
                  ></div>
                  <script src="https://sp.zalo.me/plugins/sdk.js"></script>
                </el-dropdown-item>
                <el-dropdown-item>
                  <ShareNetwork
                    network="facebook"
                    url="https://khobatdongsanviet.demo.fit/"
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
        </div>
        <el-button
          type="danger"
          icon="el-icon-close"
          circle
          size="mini"
          @click="$router.back()"
        ></el-button>
      </div>
      <div class="contents d-flex">
        <div>
          <div class="address">{{ showDetail.street_name }}</div>
          <div>
            <button id="congdong" disabled v-if="showDetail.share_public == 1">
              Cộng Đồng
            </button>
            <button id="web" disabled v-if="showDetail.share_web == 1">Web</button>
          </div>
          <div class="sell_estate">
            {{ showDetail.title ? showDetail.title.toUpperCase() : null }}
          </div>
        </div>
        <div class="sell_price">
          <div class="sell">{{ showDetail.purpose == 0 ? "BÁN" : "CHO THUÊ" }}</div>
          <div class="price">
            {{ showDetail.price }} {{ showDetail.unit_price == "ty" ? "TỶ" : "TRIỆU" }}
          </div>
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
      <v-col cols="4" sm="3">
        <div class="hightlight">#</div>
        <div>{{ showDetail.id }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Tiêu đề</div>
        <div>{{ showDetail.title }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Số nhà</div>
        <div>{{ showDetail.street_name.split(",")[0] }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Đường</div>
        <div>{{ showDetail.street_name.split(",")[1] }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Loại nhà</div>
        <div>{{ showDetail.house_type_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Só lầu</div>
        <div>{{ showDetail.floor_number }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Loại BĐS</div>
        <div>{{ showDetail.real_estate_type_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Pháp lý</div>
        <div>{{ showDetail.ownership_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Nở hậu</div>
        <div>{{ showDetail.end_open == 0 ? "Không" : "Có" }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Diện tích</div>
        <div>{{ showDetail.length * showDetail.width }}m2</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Dài</div>
        <div>{{ showDetail.length }}m</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Ngang</div>
        <div>{{ showDetail.width }}m</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Mục đích</div>
        <div>{{ showDetail.purpose == 0 ? "Bán" : "Cho thuê" }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Nhân viên</div>
        <div>{{ showDetail.staff.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Giá</div>
        <div>
          {{ showDetail.price }} {{ showDetail.unit_price == "ty" ? "tỷ" : "triệu" }}
        </div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Hướng</div>
        <div>{{ showDetail.house_orientation_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Phường</div>
        <div>{{ showDetail.ward.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Dự án</div>
        <div>{{ showDetail.project ? "Có" : "Không có" }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Khách hàng</div>
        <div>{{ showDetail.customer.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Hướng ban công</div>
        <div>{{ showDetail.directions_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Số phòng ngủ</div>
        <div>{{ showDetail.bedroom_number }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Huyện</div>
        <div>{{ showDetail.district.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Block/Khu</div>
        <div>Không có</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">SĐT</div>
        <div>{{ showDetail.customer.phone }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Đã chia sẻ</div>
        <div>{{ showDetail.share_public == 1 ? "Có" : "Không" }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Loại đường</div>
        <div>{{ showDetail.street_type_dict.name }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Phí môi giới</div>
        <div>{{ showDetail.brokerage_amount }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Đã đưa lên Web</div>
        <div>{{ showDetail.share_web == 1 ? "Có" : "Không" }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Đường rộng (m)</div>
        <div>{{ showDetail.width_street }}m</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Tỷ lệ môi giới</div>
        <div>{{ showDetail.brokerage_rate }}</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Đăng ký ngày</div>
        <div>
          {{ showDetail.created_at }}
        </div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">Diện tích sàn</div>
        <div>{{ showDetail.land_area }}m2</div>
      </v-col>
      <v-col cols="4" sm="3">
        <div class="hightlight">NGÀY CẬP NHẬT</div>
        <div>
          {{ showDetail.updated_at }}
        </div>
      </v-col>
    </v-row>
    <el-divider></el-divider>

    <div class="description">
      <div class="description_title">Mô tả</div>
      <div v-html="showDetail.descriptions"></div>
    </div>
    <div class="img_info">
      <div class="img_title">
        <div>Hình ảnh({{ showDetail.image_private.length }})</div>
        <v-btn @click="downLoadPhotoList">
          <img src="@image/icons/taixuong.svg" alt="" /> Tải xuống</v-btn
        >
      </div>
      <CoolLightBox
        :items="showDetail.image_private"
        :index="index"
        :fullScreen="true"
        :useZoomBar="true"
        @close="index = null"
        v-if="showDetail.image_private.length > 0"
      >
      </CoolLightBox>
      <div class="img_main">
        <a href="javascript:;">
          <img
            v-for="(image, imageIndex) in showDetail.image_private"
            :src="image.src"
            alt=""
            :key="imageIndex"
            @click="index = imageIndex"
          />
        </a>
      </div>
    </div>

    <div class="customer">
      Khách hàng: <span class="highName">{{ showDetail.customer.name }}</span>
    </div>
    <div class="commentUser">
      <div class="name_title">Bình luận ({{ commentList.length }})</div>
      <div class="connect" v-loading="loadingComment">
        <div class="d-flex comment_status" v-for="slot in commentList" :key="slot.id">
          <div class="d-flex">
            <div class="avatar_user" v-if="slot.user_avatar">
              <img :src="slot.user_avatar" alt="" />
            </div>
            <div class="avatar_user" v-else>
              <img src="@image/icons/username.png" alt="" />
            </div>
            <div class="users">
              <div class="name">
                {{ slot.user_name }}
                <span class="time_comment">{{ slot.fromNowComment }}</span>
              </div>
              <div class="comment">{{ slot.content }}</div>
              <div class="comment" v-if="slot.thumbnail">
                <img :src="slot.thumbnail" alt="" />
              </div>
            </div>
          </div>

          <div class="d-flex">
            <el-tag type="info" v-if="slot.is_display == 0">Đã ẩn</el-tag>
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button
                class="btn_hide"
                icon="el-icon-more"
                circle
                @click="selectCommen(slot.id, slot.is_display)"
              ></el-button>
              <el-dropdown-menu slot="dropdown" placement="left">
                <el-dropdown-item icon="el-icon-circle-plus" command="hide">
                  {{ slot.is_display == 0 ? "Bỏ Ẩn" : "Ẩn" }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <a href="javascript:;" @click="readMoreComment" v-if="btn_readMore"
          >Xem thêm bình luận</a
        >
        <div class="d-flex">
          <el-input
            placeholder="Nhập nội dung bình luận"
            v-model="comment"
            @keyup.enter.native="createNewComment()"
            id="myInput"
          >
          </el-input>
          <el-upload
            v-if="headers"
            class="avatar-uploader"
            action="https://thinhgiacore.demo.fit/api/admin/real-estates/image"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :headers="headers"
            name="file"
            list-type="picture"
            ref="upload"
          >
            <el-button
              size="small"
              icon="el-icon-date"
              v-if="!file"
              class="btn_upload"
            ></el-button>
          </el-upload>
          <el-button class="btn_send" type="primary" @click="createNewComment()" round
            >Gửi</el-button
          >
        </div>
      </div>
      <!-- <div class="input">
        <el-input placeholder="Nhập nội dung bình luận" v-model="input"></el-input>
        <el-button class="receive">Gửi</el-button>
      </div> -->
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
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
import { mapState, mapActions } from "vuex";
import { downLoadPhoto } from "@utils/exportFile";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import moment from "moment";
export default {
  components: {
    CoolLightBox,
  },
  data() {
    return {
      input: "",
      index: null,
      loading: false,
      loadingComment: false,
      showDetail: null,
      limit: 10,
      page: 1,
      select_commentID: "",
      is_display: 0,
      comment: "",
      commentList: [],
      btn_readMore: true,
      token: "",
      headers: null,
      fileList: [],
      file: null,
      dialogVisible: false,
      dialogImageUrl: "",
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
  created() {
    this.getRealEstateDetail();
    this.getCommentList();
    this.getUserDetail();
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
  },
  computed: {
    ...mapState("realEstate", ["detailEstate"]),
    ...mapState("homepage", ["comments", "newComment", "lastPage"]),
    ...mapState("staffs", ["userDetail"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRemove(file, fileList) {
      this.file = null;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.file = file.raw;
    },
    async getUserDetail() {
      try {
        await this.$store.dispatch(
          "staffs/showUserDetail",
          this.currentUser.results.user.id
        );
      } catch {
        console.log("Error");
      }
    },
    async getRealEstateDetail() {
      this.loading = true;
      try {
        await this.$store.dispatch(
          "realEstate/showDetailRealEstate",
          this.$route.params.id
        );
        this.loading = false;
        this.showDetail = {
          ...this.detailEstate,
          image_private: this.detailEstate.image_private.map((item) => {
            return { ...item, src: item.main, title: "", description: "" };
          }),
          updated_at: moment(this.detailEstate.updated_at).format(
            "YYYY-MM-DD, h:mm:ss a"
          ),
          created_at: moment(this.detailEstate.created_at).format(
            "YYYY-MM-DD, h:mm:ss a"
          ),
        };
      } catch {}
    },
    selectCommen(_id, is_display) {
      this.select_commentID = _id;
      this.is_display = is_display;
    },
    handleCommand(command) {
      if (command == "URL") {
        this.copyURLNotification();
      }
      if (command == "hide") {
        this.hideThisComment();
      }
    },
    async hideThisComment() {
      this.loadingComment = true;
      try {
        this.$store.dispatch("homepage/hideCommentDisplay", {
          id: this.select_commentID,
          is_display: this.is_display == 0 ? 1 : 0,
        });

        this.commentList = this.commentList.map((u) => {
          return u.id == this.select_commentID ? { ...u, is_display: !u.is_display } : u;
        });
        this.loadingComment = false;
      } catch {
        this.showHideCommentError();
        this.loadingComment = false;
      }
    },
    async createNewComment() {
      this.loadingComment = true;
      var formData = null;
      if (this.file) {
        formData = new FormData();
        formData.append("file", this.file);
        formData.append("title", this.comment);
        formData.append("content", this.comment);
        formData.append("real_estate_id", this.$route.params.id);
      }
      try {
        await this.$store.dispatch(
          "homepage/createNewComment",
          formData
            ? formData
            : {
                title: this.comment,
                content: this.comment,
                real_estate_id: this.$route.params.id,
                file: this.file,
              }
        );
        let newCommentAdded = {
          ...this.newComment,
          user_name: this.userDetail.name,
          user_avatar: this.userDetail.avatar_image?.thumbnail,
          fromNowComment: moment(this.newComment.updated_at).startOf("minute").fromNow(),
        };
        this.loadingComment = false;
        this.fileList = [];
        this.file = null;
        this.comment = "";
        this.commentList.push(newCommentAdded);
      } catch {}
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
    async getCommentList() {
      await this.$store.dispatch("homepage/getCommentItem", {
        id: this.$route.params.id,
        limit: this.limit,
        page: this.page,
      });
      this.commentList = this.commentList.concat(this.comments);
      this.commentList = this.commentList.map((u) => {
        return {
          ...u,
          fromNowComment: moment(u.updated_at).startOf("minute").fromNow(),
        };
      });
      if (this.lastPage == this.page) {
        this.btn_readMore = false;
      }
    },
    readMoreComment() {
      this.page += 1;
      this.getCommentList();
    },
    async downLoadPhotoList() {
      this.loading = true;
      let image_ids = this.showDetail.image_private.map((u) => u.id).join(",");
      try {
        await downLoadPhoto(image_ids);
        this.loading = false;
      } catch {
        this.loading = false;
        this.showErrorNotification();
      }
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },
    showHideCommentError() {
      this.$message.error(
        "403, Forbidden. Can not do this function due to lacking of permission."
      );
    },
    uploadPhoto() {
      console.log("TEXT");
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
    display: flex;
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
    .time {
      margin-top: 2px;
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
  .avatar-uploader {
    .btn_upload.el-button {
      margin-top: 11px;
    }
    .el-upload-list.el-upload-list--picture {
      margin-top: -24px !important;
    }
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
      margin-bottom: 10px;
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
        border-radius: 10px;
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
  .commentUser {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 400;
    .name_title {
      font-weight: 700;
      margin-left: -10px;
    }
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
  .comment_status {
    margin-top: 10px;
    justify-content: space-between;
    .avatar_user {
      img {
        border-radius: 50%;
        width: 25px;
        height: 25px;
      }
    }
    .users {
      margin-left: 10px;
      .name {
        font-size: 12px;
        font-weight: 500;
      }
      .comment {
        font-size: 12px;
      }
      .time_comment {
        font-size: 10px;
        font-weight: 500;
        color: grey;
      }
    }
    &:hover {
      background-color: rgba(199, 196, 196, 0.377);
      transition: 0.5s;
      .btn_hide {
        background: rgba(199, 196, 196, 0.377);
      }
    }
    &:focus {
      background-color: rgba(199, 196, 196, 0.377);
    }
    margin: 0 -30px;
    padding: 5px 30px;
    .btn_hide {
      margin-left: 10px;
    }
  }
}
.zalo-share-button {
  margin-bottom: -10px;
  margin-top: 5px;
}
.highName {
  font-size: 16px;
  font-weight: 500;
  color: orange;
  margin-left: 10px;
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
.chiase.v-btn {
  box-shadow: none;
  background-color: transparent;
  color: #fbad18;
  text-transform: capitalize;
  padding: 0;
  margin: 2px 0;
}
.share_facebook {
  text-decoration: none;
  img {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
}
@media screen and (max-width: 1250px) {
  .detail {
    margin-top: 0px;
  }
}
@media screen and (max-width: 600px) {
  .detail {
    margin-top: 0px;
    .header_detail {
      display: block;
    }
  }
}
</style>
