<template>
  <div class="createBDS" v-loading="loading">
    <div class="header_form">
      <div class="header_left d-flex">
        <div class="create_title">Tạo bất động sản</div>
        <v-btn-toggle v-model="text" tile group>
          <v-btn value="left"> Bán </v-btn>
          <v-btn value="center"> Cho thuê </v-btn>
        </v-btn-toggle>
      </div>
      <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button>
    </div>
    <div class="form_content">
      <v-row class="content_01">
        <v-col cols="3">
          <div class="position">
            <div class="form_label">Nhân viên</div>
            <el-select v-model="value" placeholder="Chọn nhân viên" id="staff">
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                style="height: 44px; padding-top: 4px"
              >
                <span style="line-height: 18px">
                  <div style="font-weight: 500">{{ item.name }}</div>
                  <div class="sdt" style="font-size: 13px">
                    <i>{{ item.phone }}</i>
                  </div>
                </span>
              </el-option>
            </el-select>
            <div class="form_label">Khách hàng <span style="color: red">*</span></div>
            <div class="d-flex">
              <el-select v-model="value02" placeholder="Chọn khách hàng">
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-button round>+ Tạo</el-button>
            </div>
          </div>
        </v-col>
        <v-col cols="9">
          <v-row class="address">
            <v-col cols="4">
              <div class="form_label">Tỉnh <span style="color: red">*</span></div>
              <el-select
                v-model="value03"
                placeholder="Chọn tỉnh"
                @change="chooseProvince"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

              <div class="form_label">Dự án</div>
              <el-select
                v-model="value06"
                placeholder="Chọn dự án"
                @change="shownmore = true"
              >
                <el-option
                  v-for="item in allProject"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </v-col>
            <v-col cols="4">
              <div class="form_label">Huyện/TP <span style="color: red">*</span></div>
              <el-select
                v-model="value04"
                placeholder="Chọn huyện/TP"
                @change="chooseDistrict"
                no-data-text="Vui lòng chọn tỉnh"
              >
                <el-option
                  v-for="item in dictrictList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

              <div class="form_label">Tên đường/Số nhà</div>
              <el-input v-model="value07" id="input_stress"></el-input>
            </v-col>
            <v-col cols="4">
              <div class="form_label">Phường/Xã <span style="color: red">*</span></div>
              <el-select
                v-model="value05"
                placeholder="Chọn phường/xã"
                no-data-text="Vui lòng chọn huyện"
              >
                <el-option
                  v-for="item in wardList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </v-col>
          </v-row>
          <!-- <div v-if="shownmore" class="address"> -->
          <v-row class="more_info address" v-if="shownmore">
            <v-col cols="6">
              <div class="form_label">Block/Khu</div>
              <el-input v-model="value08" id="input_block"></el-input>
            </v-col>
            <v-col cols="6">
              <div class="form_label">Tầng/Lô</div>
              <el-input v-model="value09" id="input_floor"></el-input>
            </v-col>
          </v-row>
          <!-- </div> -->
        </v-col>
      </v-row>
      <div class="content_02">
        <div class="typeOfEstate">
          <div class="estate_item">
            <div class="form_label">Loại Bất Động Sản</div>
            <el-select v-model="value10" placeholder="Chọn loại BĐS">
              <el-option
                v-for="item in estates"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Loại nhà đất</div>
            <el-select v-model="value11" placeholder="Chọn loại nhà">
              <el-option
                v-for="item in houses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Pháp Lý</div>
            <el-select v-model="value12" placeholder="Chọn pháp lý">
              <el-option
                v-for="item in laws"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Giá</div>
            <el-input v-model="value13" id="input_estate"></el-input>
          </div>
          <div class="estate_item">
            <div class="form_label">Đơn vị</div>
            <el-select v-model="value14" placeholder="Chọn đơn vị">
              <el-option
                v-for="item in units"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="typeOfEstate">
          <div class="estate_item">
            <div class="form_label">Loại đường</div>
            <el-select v-model="value15" placeholder="Chọn loại đường">
              <el-option
                v-for="item in roads"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Đường rộng</div>
            <el-input v-model="value16" id="input_estate" placeholder="0m"></el-input>
            <!-- <el-select v-model="value16" placeholder="0m">
              <el-option
                v-for="item in widths"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </div>
          <div class="estate_item">
            <div class="form_label">Hướng</div>
            <el-select v-model="value17" placeholder="Chọn hướng">
              <el-option
                v-for="item in directions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Tỷ lệ môi giới</div>
            <el-input v-model="value18" id="input_estate" placeholder="1%"></el-input>
          </div>
          <div class="estate_item">
            <div class="form_label">Số tiền</div>
            <el-input v-model="value19" id="input_estate"></el-input>
          </div>
        </div>
      </div>
      <div class="content_estate_options">
        <div class="options">
          <div class="content_03 d-flex">
            <div class="items">
              <div class="form_label">Diện tích đất/Tìm đường</div>
              <el-input v-model="value20" id="input_estate"></el-input>
            </div>
            <div class="items">
              <div class="form_label">Ngang</div>
              <el-input v-model="value21" id="input_estate"></el-input>
            </div>
            <div class="items">
              <div class="form_label">Dài</div>
              <el-input v-model="value22" id="input_estate"></el-input>
            </div>
          </div>
          <div class="content_03 d-flex">
            <div class="items">
              <div class="form_label">Diện tích sàn/Thông thủy</div>
              <el-input v-model="value23" id="input_estate"></el-input>
            </div>
            <div class="items">
              <div class="form_label">Nở hậu</div>
              <el-select v-model="value24" placeholder="Chọn hướng">
                <el-option
                  v-for="item in nohau"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="items">
              <div class="form_label">Số lầu</div>
              <el-input v-model="value25" id="input_estate"></el-input>
            </div>
          </div>
          <div class="content_03 d-flex">
            <div class="items">
              <div class="form_label">Hướng <span style="color: red">*</span></div>
              <el-select v-model="value26" placeholder="Chọn hướng">
                <el-option
                  v-for="item in directions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="items">
              <div class="form_label">Số phòng ngủ</div>
              <el-input v-model="value27" id="input_estate"></el-input>
            </div>
            <div class="items">
              <div class="form_label">Số phòng tắm</div>
              <el-input v-model="value28" id="input_estate"></el-input>
            </div>
          </div>
        </div>
        <div class="cms">
          <div class="tieude">
            <div class="form_label">Tiêu đề</div>
            <el-input v-model="value29" id="input_estate"></el-input>

            <div class="form_label">Mô tả</div>
            <!-- <ckeditor
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor> -->
            <editor
              api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
              v-model="value30"
              :init="{
                menubar: true,
                resize: true,
                fontsize_formats:
                  '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  ' autoresize',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
                images_upload_url: 'postAcceptor.php',
                automatic_uploads: false,
                images_reuse_filename: true,
                images_file_types: 'jpg,svg,webp',
              }"
            />
          </div>
          <!-- 'searchreplace visualblocks code fullscreen autoresize', -->
        </div>
      </div>
      <div class="upload">
        <div class="overlay_left">
          <div class="upload_img">
            <div class="title_upload">Hình ảnh nội bộ</div>
            <i>Kéo và thả nhiều tệp để tải lên</i>
            <el-upload
              v-if="headers"
              action="https://thinhgiacore.demo.fit/api/admin/projects/image"
              list-type="picture-card"
              drag
              multiple
              name="file[]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemovePrivate"
              :on-change="handleChangePrivate"
              :headers="headers"
              :file-list="fileList_private"
              ref="uploadPrivate"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-picture"></i>
            </el-upload>
            <el-collapse-transition>
              <el-button
                size="small"
                type="warning"
                @click="submitUploadPrivate"
                :loading="loading_btn"
                v-if="btn_upload"
                >Upload to server</el-button
              >
            </el-collapse-transition>
            <el-collapse-transition>
              <el-alert title="Upload success" type="success" show-icon v-if="showAlert">
              </el-alert>
            </el-collapse-transition>
            <el-collapse-transition>
              <el-alert title="Please upload!!!" type="error" show-icon v-if="showErr">
              </el-alert>
            </el-collapse-transition>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
        <div class="overlay_right">
          <div class="upload_img">
            <div class="title_upload">Hình ảnh công khai</div>
            <i>Kéo và thả nhiều tệp để tải lên</i>
            <el-upload
              v-if="headers"
              action="https://thinhgiacore.demo.fit/api/admin/projects/image"
              list-type="picture-card"
              drag
              multiple
              name="file[]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemovePublic"
              :on-change="handleChangePublic"
              :headers="headers"
              :file-list="fileList_public"
              ref="uploadPublic"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-picture"></i>
            </el-upload>
            <el-collapse-transition>
              <el-button
                size="small"
                type="warning"
                @click="submitUploadPublic"
                :loading="loading_btn02"
                v-if="btn_upload02"
                >Upload to server</el-button
              >
            </el-collapse-transition>
            <el-collapse-transition>
              <el-alert
                title="Upload success"
                type="success"
                show-icon
                v-if="showAlert02"
              >
              </el-alert>
            </el-collapse-transition>
            <el-collapse-transition>
              <el-alert title="Please upload!!!" type="error" show-icon v-if="showErr02">
              </el-alert>
            </el-collapse-transition>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="share">
        <div class="share_title">
          Bạn có muốn chia sẻ sản phẩm ra cộng đồng sau khi tạo không?
        </div>
        <el-checkbox v-model="checked01" @change="checked02 = false">Có</el-checkbox>
        <el-checkbox v-model="checked02" @change="checked01 = false">Không</el-checkbox>
      </div>
      <div class="luunhap">
        <el-button id="soft_save">Lưu nháp</el-button>
        <el-button id="save" @click="createNewEstate">Lưu</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions, mapMutations } from "vuex";
import axiosClient from "~/utils/axiosClient";
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      text: "center",
      shownmore: false,
      checked01: false,
      loading: false,
      checked02: false,
      headers: null,
      token: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      projects: [
        {
          value: "1",
          name: "Sông Cây Khế",
        },
        {
          value: "2",
          name: "Đồi Ngọc Tước",
        },
        {
          value: "3",
          name: "Khu Rạch Giá",
        },
        {
          value: "4",
          name: "Mai Chiến Thủy",
        },
      ],
      directions: [],
      estates: [],
      houses: [],
      units: [
        {
          value: "trieu",
          name: "Triệu",
        },
        {
          value: "ty",
          name: "Tỷ",
        },
      ],
      nohau: [
        {
          value: 0,
          name: "Không",
        },
        {
          value: 1,
          name: "Có",
        },
      ],
      widths: [],
      roads: [],
      laws: [],
      value: "",
      value02: "",
      value03: "",
      value04: "",
      value05: "",
      value06: "",
      value07: "",
      value08: "",
      value09: "",
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      value14: "",
      value15: "",
      value16: "",
      value17: "",
      value18: "",
      value19: "",
      value20: "",
      value21: "",
      value22: "",
      value23: "",
      value24: "",
      value25: "",
      value26: "",
      value27: "",
      value28: "",
      value29: "",
      value30: "",
      loading_btn: false,
      btn_upload: false,
      showAlert: false,
      showErr: false,
      loading_btn02: false,
      btn_upload02: false,
      showAlert02: false,
      showErr02: false,
      img_val_private: "",
      img_val_public: "",
      fileList_private: [],
      fileList_public: [],
      image_id_private: [],
      image_id_public: [],
    };
  },
  mounted() {
    this.getCustomerList();
    this.getStaffList();
    this.getDictionaryList();
    this.getProvinceList();
    this.getProjectList();
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
  },

  computed: {
    ...mapState("staffs", ["staffList"]),
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
    ...mapState("customers", ["customerList"]),
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("projects", ["allProject"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("customers", ["getCustomerList"]),
    ...mapActions("staffs", ["getStaffList"]),
    ...mapActions("global", ["getProvinceList"]),
    chooseProvince() {
      this.value04 = "";
      this.value05 = "";
      this.$store.commit("global/setNoWardList");
      this.$store.dispatch("global/getDictrictList", this.value03);
    },
    chooseDistrict() {
      this.value05 = "";
      this.$store.dispatch("global/getWardList", this.value04);
    },

    async getDictionaryList() {
      await this.$store.dispatch("dictionaries/getDictionaryList", {
        limit: 10,
        page: 1,
      });
      await this.getDicOptions();
    },
    getDicOptions() {
      const directionList = this.dictionaryList.filter((u, i) => u.id == 6);
      this.directions = directionList[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      const estateList = this.dictionaryList.filter((u, i) => u.id == 1);
      this.estates = estateList[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      const houseList = this.dictionaryList.filter((u, i) => u.id == 2);
      this.houses = houseList[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      const lawList = this.dictionaryList.filter((u, i) => u.id == 5);
      this.laws = lawList[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      const roadList = this.dictionaryList.filter((u, i) => u.id == 3);
      this.roads = roadList[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    },
    async getProjectList() {
      await this.$store.dispatch("projects/getAllProjectList", {
        page: 1,
      });
    },
    handleRemovePrivate(file, fileList) {
      // console.log("before", this.image_id);
      if (file.id) {
        this.$store.dispatch("realEstate/deleteImageInProject", file.id);
        this.image_id_private = this.image_id_private.filter((u) => {
          return u != file.id;
        });
        this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
        this.fileList_private = this.fileList_private.filter((u) => {
          return u.id != file.id;
        });
        // console.log("after", this.image_id);
      }
    },
    handleRemovePublic(file, fileList) {
      // console.log("before", this.image_id);
      if (file.id) {
        this.$store.dispatch("realEstate/deleteImageInProject", file.id);
        this.image_id_public = this.image_id_public.filter((u) => {
          return u != file.id;
        });
        this.img_val_public = this.image_id_public.map((item) => `${item}`).join(",");
        this.fileList_public = this.fileList_public.filter((u) => {
          return u.id != file.id;
        });
        // console.log("after", this.image_id);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleChangePrivate(list, fileList) {
      this.showAlert = false;
      this.btn_upload = true;
      this.fileList_private = fileList;
    },
    handleChangePublic(list, fileList) {
      this.showAlert02 = false;
      this.btn_upload02 = true;
      this.fileList_public = fileList;
    },

    async createNewEstate() {
      if (this.btn_upload) {
        this.showErr = true;
        return;
      }
      if (this.btn_upload02) {
        this.showErr02 = true;
        return;
      }
      this.loading = true;
      try {
        await this.$store.dispatch("realEstate/createNewRealEstate", {
          user_id: this.value,
          customer_id: this.value02,
          province_id: this.value03,
          district_id: this.value04,
          ward_id: this.value05,
          project_id: this.value06,
          street_name: this.value07,
          real_estate_type: this.value10,
          house_type: this.value11,
          ownership: this.value12,
          price: this.value13,
          unit_price: this.value14,
          street_type: this.value15,
          width_street: this.value16,
          house_orientation: this.value17,
          brokerage_rate: this.value18,
          brokerage_amount: this.value19,
          land_area: this.value20,
          width: this.value21,
          length: this.value22,
          floor_area: this.value23,
          end_open: this.value24,
          floor_number: this.value25,
          directions: this.value26,
          bedroom_number: this.value27,
          bathroom_number: this.value28,
          title: this.value29,
          descriptions: this.value20,
          image_private_id: this.img_val_private,
          image_public_id: this.img_val_public,
          share_public: this.checked01 ? 0 : 1,
          purpose: 0,
          is_save: 1,
        });
        this.loading = false;
        setTimeout(this.openNotificationSuccess(), 1000);
        this.$router.push("/real-estate");
      } catch {
        this.loading = false;
        this.showErrorNotification();
      }
    },

    submitUploadPrivate() {
      this.loading_btn = true;
      this.showErr = false;
      this.fileList_private = this.fileList_private.filter((u) => {
        return u.id != undefined;
      });
      let { uploadFiles } = this.$refs.uploadPrivate;
      console.log("uploadFile", uploadFiles);
      const img_arr = [];
      let form = new FormData();
      uploadFiles.forEach((item) => {
        form.append("file[]", item.raw);
      });
      axiosClient
        .post("/admin/real-estates/image", form)
        .then((response) => {
          this.img_arr = response.data.results.map((item) => {
            return { ...item, url: item.thumbnail };
          });
          setTimeout(() => {
            this.fileList_private = this.fileList_private.concat(this.img_arr);
          }, 1000);
          // this.fileList = this.fileList.concat(this.img_arr);
          this.image_id_private = this.image_id_private.concat(
            this.img_arr.map((u) => u.id)
          );
          this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
          console.log("img_val_prviate", this.img_val_prviate);
          this.loading_btn = false;
          this.btn_upload = false;
          this.showAlert = true;
        })
        .catch((e) => {
          console.log(e);
          this.loading_btn = false;
          this.showErrorNotification();
        });
    },
    submitUploadPublic() {
      this.loading_btn02 = true;
      this.showErr02 = false;
      this.fileList_public = this.fileList_public.filter((u) => {
        return u.id != undefined;
      });
      let { uploadFiles } = this.$refs.uploadPublic;
      const img_arr = [];
      let form = new FormData();
      uploadFiles.forEach((item) => {
        form.append("file[]", item.raw);
      });
      axiosClient
        .post("/admin/real-estates/image", form)
        .then((response) => {
          this.img_arr = response.data.results.map((item) => {
            return { ...item, url: item.thumbnail };
          });
          setTimeout(() => {
            this.fileList_public = this.fileList_public.concat(this.img_arr);
          }, 1000);
          // this.fileList = this.fileList.concat(this.img_arr);
          this.image_id_public = this.image_id_public.concat(
            this.img_arr.map((u) => u.id)
          );
          this.img_val_public = this.img_val_public.map((item) => `${item}`).join(",");
          // console.log("img_id", this.image_id);
          this.loading_btn02 = false;
          this.btn_upload02 = false;
          this.showAlert02 = true;
        })
        .catch((e) => {
          console.log(e);
          this.loading_btn02 = false;
          this.showErrorNotification();
        });
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Create real-esate successfull!!!",
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
.createBDS {
  margin-top: -60px;
  .header_form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .header_left {
      align-items: center;
    }
    .create_title {
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.5px;
    }
    .el-button--mini.is-circle {
      width: 28px;
      height: 28px;
    }
    .v-btn-toggle {
      margin-left: 5px;
    }
    .v-btn.v-btn.v-size--default {
      text-transform: capitalize;
      width: 90px;
      height: 25px;
      background: #fff !important;
      box-sizing: border-box;
      border-radius: 15px;
      box-shadow: none;
      border: 1px solid #dfdfdf;
      font-size: 12px;
      font-weight: 400;
      &:hover {
        background-color: #fdd27f !important;
        color: #fff;
      }
    }
    .v-item--active.v-btn--active.v-btn--is-elevated {
      background: #fbad18 !important;
      color: #fff;
    }
  }
  .position,
  .address,
  .content_02,
  .options,
  .cms {
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;

    .el-button {
      background-color: transparent;
      color: red;
      border: none;
      &:hover {
        background-color: #fff;
      }
      margin-left: 4px;
    }
  }
  .position {
    padding: 10px;
    margin: -10px 0 10px -10px;
  }
}
.address {
  margin-bottom: 20px;
}
.form_content {
  padding: 0 10px;
  margin-top: 75px;
  .form_label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
  .el-select {
    margin-bottom: 10px;
  }
  .sdt {
    font-size: 13px !important;
  }
}
.more_info {
  margin-top: -45px;
  border-top: none !important;
}
.content_02 {
  margin: 0 -10px;
  padding: 10px 0;
  .typeOfEstate {
    display: flex;
    padding: 0 -10px;
    .estate_item {
      width: 20%;
      margin: 0 10px;
    }
  }
}
.content_estate_options {
  display: flex;
  width: 100.8%;
  .options {
    width: 50%;
    padding: 10px 0;
    margin: -10px;
    margin-top: 20px !important;
    height: 215px;
    .col-4 {
      padding: 0px;
    }
    .content_03 {
      .items {
        width: 33.33%;
        margin: 0 10px;
      }
    }
  }
  .cms {
    width: 50%;
    margin-left: 20px;
    margin-top: 20px;
    .tieude {
      .el-input__inner {
        width: 100%;
      }
      padding: 10px;
    }
  }
}
.upload {
  display: flex;
  margin: 0 -15px;
  .overlay_left,
  .overlay_right {
    width: 50%;
    padding: 5px;
    .upload_img {
      background: #ffffff;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 10px;
      font-size: 14px;
      .title_upload {
        font-weight: 700;
      }
    }
  }
}
.share {
  padding: 10px;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  margin: 15px -10px;
  .share_title {
    margin-bottom: 10px;
  }
}
.luunhap {
  padding: 10px;
  margin: 15px -10px;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  #soft_save.el-button {
    background: #ffffff;
    border: 1px solid #cdcdcd;
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 14px;
    padding: 2px 20px;
  }
  #save.el-button {
    background: #fbad18;
    border-radius: 15px;
    color: #fff;
    font-size: 14px;
    padding: 8px 20px;
  }
}
</style>
