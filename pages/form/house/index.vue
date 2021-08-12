<template>
  <div class="createBDS" v-loading="loading">
    <div class="header_form">
      <div class="header_left d-flex">
        <div class="create_title">Tạo bất động sản</div>
        <v-btn-toggle v-model="purpose" tile group>
          <v-btn value="0"> Bán </v-btn>
          <v-btn value="1"> Cho thuê </v-btn>
        </v-btn-toggle>
      </div>
      <el-button
        type="danger"
        icon="el-icon-close"
        circle
        size="mini"
        @click="$router.back()"
      ></el-button>
    </div>
    <div class="form_content">
      <v-row class="content_01">
        <v-col cols="12" sm="3">
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
              <el-button round @click="centerDialogVisible = true">+ Tạo</el-button>
            </div>
            <p class="error_message customer_id" v-if="errorMessage">
              {{ errorMessage.customer_id ? errorMessage.customer_id[0] : null }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-row class="address">
            <v-col cols="12" sm="4">
              <div class="form_label province_od">
                Tỉnh <span style="color: red">*</span>
              </div>
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
              <p class="error_message" v-if="errorMessage">
                {{ errorMessage.province_id ? errorMessage.province_id[0] : null }}
              </p>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="form_label dictrict_id">
                Huyện/TP <span style="color: red">*</span>
              </div>
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
              <p class="error_message" v-if="errorMessage">
                {{ errorMessage.district_id ? errorMessage.district_id[0] : null }}
              </p>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="form_label ward_id">
                Phường/Xã <span style="color: red">*</span>
              </div>
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
              <p class="error_message" v-if="errorMessage">
                {{ errorMessage.ward_id ? errorMessage.ward_id[0] : null }}
              </p>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="form_label project_id">Dự án</div>
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
            <v-col cols="12" sm="4">
              <div class="form_label street_name">
                Tên đường/Số nhà <span style="color: red">*</span>
              </div>
              <el-input v-model="value07" id="input_stress"></el-input>
              <p class="error_message street_name" v-if="errorMessage">
                {{ errorMessage.street_name ? errorMessage.street_name[0] : null }}
              </p>
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
            <div class="form_label">
              Loại Bất Động Sản <span style="color: red">*</span>
            </div>
            <el-select v-model="value10" placeholder="Chọn loại BĐS">
              <el-option
                v-for="item in estates"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{
                errorMessage.real_estate_type ? errorMessage.real_estate_type[0] : null
              }}
            </p>
          </div>
          <div class="estate_item">
            <div class="form_label">Loại nhà đất <span style="color: red">*</span></div>
            <el-select v-model="value11" placeholder="Chọn loại nhà">
              <el-option
                v-for="item in houses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.house_type ? errorMessage.house_type[0] : null }}
            </p>
          </div>
          <div class="estate_item">
            <div class="form_label">Pháp Lý <span style="color: red">*</span></div>
            <el-select v-model="value12" placeholder="Chọn pháp lý">
              <el-option
                v-for="item in laws"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.ownership ? errorMessage.ownership[0] : null }}
            </p>
          </div>
          <div class="estate_item">
            <div class="form_label">Giá</div>
            <el-input v-model="value13" id="input_estate"></el-input>
            <p class="error_message" v-if="errorMessage && value13">
              {{ errorMessage.price ? errorMessage.price[0] : null }}
            </p>
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
            <div class="form_label">Loại đường <span style="color: red">*</span></div>
            <el-select v-model="value15" placeholder="Chọn loại đường">
              <el-option
                v-for="item in roads"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.street_type ? errorMessage.street_type[0] : null }}
            </p>
          </div>
          <div class="estate_item">
            <div class="form_label">Đường rộng</div>
            <el-input v-model="value16" id="input_estate" placeholder="0m"></el-input>
            <p class="error_message" v-if="errorMessage && value16">
              {{ errorMessage.width_street ? errorMessage.width_street[0] : null }}
            </p>
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
            <p class="error_message" v-if="errorMessage && value18">
              {{ errorMessage.brokerage_rate ? errorMessage.brokerage_rate[0] : null }}
            </p>
          </div>
          <div class="estate_item">
            <div class="form_label">Số tiền</div>
            <el-input v-model="value19" id="input_estate"></el-input>
            <p class="error_message" v-if="errorMessage && value19">
              {{
                errorMessage.brokerage_amount ? errorMessage.brokerage_amount[0] : null
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="content_estate_options">
        <div class="options">
          <div class="content_03">
            <div class="items">
              <div class="form_label">Diện tích đất/Tìm đường</div>
              <el-input v-model="value20" id="input_estate"></el-input>
              <p class="error_message" v-if="errorMessage && value20">
                {{ errorMessage.land_area ? errorMessage.land_area[0] : null }}
              </p>
            </div>
            <div class="items">
              <div class="form_label">Ngang</div>
              <el-input v-model="value21" id="input_estate"></el-input>
              <p class="error_message" v-if="errorMessage && value21">
                {{ errorMessage.width ? errorMessage.width[0] : null }}
              </p>
            </div>
            <div class="items">
              <div class="form_label">Dài</div>
              <el-input v-model="value22" id="input_estate"></el-input>
              <p class="error_message" v-if="errorMessage && value22">
                {{ errorMessage.length ? errorMessage.length[0] : null }}
              </p>
            </div>
          </div>
          <div class="content_03">
            <div class="items">
              <div class="form_label">Diện tích sàn/Thông thủy</div>
              <el-input v-model="value23" id="input_estate"></el-input>
              <p class="error_message" v-if="errorMessage && value23">
                {{ errorMessage.floor_area ? errorMessage.floor_area[0] : null }}
              </p>
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
              <p class="error_message" v-if="errorMessage && value25">
                {{ errorMessage.floor_number ? errorMessage.floor_number[0] : null }}
              </p>
            </div>
          </div>
          <div class="content_03">
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
              <p class="error_message" v-if="errorMessage && value27">
                {{ errorMessage.bedroom_number ? errorMessage.bedroom_number[0] : null }}
              </p>
            </div>
            <div class="items">
              <div class="form_label">Số phòng tắm</div>
              <el-input v-model="value28" id="input_estate"></el-input>
              <p class="error_message" v-if="errorMessage && value28">
                {{
                  errorMessage.bathroom_number ? errorMessage.bathroom_number[0] : null
                }}
              </p>
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
                content_style: 'p { margin: 0; }',
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
              action="https://thinhgiacore.demo.fit/api/admin/real-estates/image"
              list-type="picture-card"
              drag
              multiple
              name="file[]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemovePrivate"
              :on-change="handleChangePrivate"
              :on-success="handleAvatarSuccessPrivate"
              :headers="headers"
              :file-list="fileList_private"
              ref="uploadPrivate"
            >
              <i slot="default" class="el-icon-picture"></i>
            </el-upload>

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
              action="https://thinhgiacore.demo.fit/api/admin/real-estates/image"
              list-type="picture-card"
              drag
              multiple
              name="file[]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemovePublic"
              :on-change="handleChangePublic"
              :on-success="handleAvatarSuccessPublic"
              :headers="headers"
              :file-list="fileList_public"
              ref="uploadPublic"
            >
              <i slot="default" class="el-icon-picture"></i>
            </el-upload>

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
        <el-button id="soft_save" @click="createNewEstate(0)">Lưu nháp</el-button>
        <el-button id="save" @click="createNewEstate(1)">Lưu</el-button>
      </div>
    </div>
    <el-dialog
      title="Tạo khách hàng mới"
      :visible.sync="centerDialogVisible"
      :width="dialog"
      center
      destroy-on-close
      id="createCustomersSimple"
    >
      <SimpleCreateCustomer
        v-on:close-modals="centerDialogVisible = false"
        v-on:reload-page="reload"
      />
    </el-dialog>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions, mapMutations } from "vuex";
import axiosClient from "~/utils/axiosClient";
import SimpleCreateCustomer from "@component/Form/SimpleCreateCustomer";
export default {
  components: {
    editor: Editor,
    SimpleCreateCustomer,
  },
  data() {
    return {
      purpose: "0",
      shownmore: false,
      checked01: false,
      loading: false,
      checked02: false,
      headers: null,
      token: "",
      keyChild: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false,
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
      img_val_private: "",
      img_val_public: "",
      fileList_private: [],
      fileList_public: [],
      image_id_private: [],
      image_id_public: [],
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
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
    ...mapState("realEstate", ["errorMessage"]),
  },
  methods: {
    ...mapActions("customers", ["getCustomerList"]),
    ...mapActions("staffs", ["getStaffList"]),
    ...mapActions("global", ["getProvinceList"]),
    reload() {
      this.getCustomerList();
    },
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
      // if (file.id) {
      //   this.$store.dispatch("realEstate/deleteImageInProject", file.id);
      //   this.image_id_private = this.image_id_private.filter((u) => {
      //     return u != file.id;
      //   });
      //   this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
      //   this.fileList_private = this.fileList_private.filter((u) => {
      //     return u.id != file.id;
      //   });
      // }
      if (file.response) {
        this.$store.dispatch(
          "projects/deleteImageInProject",
          file.response.results[0].id
        );
        this.image_id_private = this.image_id_private.filter((u) => {
          return u != file.response.results[0].id;
        });
        this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
      }
    },
    handleRemovePublic(file, fileList) {
      // console.log("before", this.image_id);
      if (file.response) {
        this.$store.dispatch(
          "projects/deleteImageInProject",
          file.response.results[0].id
        );
        this.image_id_public = this.image_id_public.filter((u) => {
          return u != file.response.results[0].id;
        });
        this.img_val_public = this.image_id_public.map((item) => `${item}`).join(",");
      }
    },
    handleAvatarSuccessPrivate(res, file) {
      this.image_id_private.push(res.results[0].id);
      this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
    },
    handleAvatarSuccessPublic(res, file) {
      this.image_id_public.push(res.results[0].id);
      this.img_val_public = this.image_id_public.map((item) => `${item}`).join(",");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleChangePrivate(list, fileList) {
      this.fileList_private = fileList;
    },
    handleChangePublic(list, fileList) {
      this.fileList_public = fileList;
    },

    async createNewEstate(e) {
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
          floor_number: parseInt(this.value25),
          directions: this.value26,
          bedroom_number: this.value27,
          bathroom_number: this.value28,
          title: this.value29,
          descriptions: this.value30,
          image_private_id: this.img_val_private,
          image_public_id: this.img_val_public,
          share_public: this.checked01 ? 1 : 0,
          purpose: this.purpose,
          is_save: e,
        });
        this.loading = false;
        setTimeout(this.openNotificationSuccess(), 1000);
        this.$router.push("/real-estate");
      } catch {
        this.loading = false;
        console.log("error", this.errorMessage);

        this.showErrorNotification();
      }
    },

    // submitUploadPrivate() {
    //   this.loading_btn = true;
    //   this.showErr = false;
    //   this.fileList_private = this.fileList_private.filter((u) => {
    //     return u.id != undefined;
    //   });
    //   let { uploadFiles } = this.$refs.uploadPrivate;
    //   console.log("uploadFile", uploadFiles);
    //   const img_arr = [];
    //   let form = new FormData();
    //   uploadFiles.forEach((item) => {
    //     form.append("file[]", item.raw);
    //   });
    //   axiosClient
    //     .post("/admin/real-estates/image", form)
    //     .then((response) => {
    //       this.img_arr = response.data.results.map((item) => {
    //         return { ...item, url: item.thumbnail };
    //       });
    //       setTimeout(() => {
    //         this.fileList_private = this.fileList_private.concat(this.img_arr);
    //       }, 1000);
    //       // this.fileList = this.fileList.concat(this.img_arr);
    //       this.image_id_private = this.image_id_private.concat(
    //         this.img_arr.map((u) => u.id)
    //       );
    //       this.img_val_private = this.image_id_private.map((item) => `${item}`).join(",");
    //       console.log("img_val_prviate", this.img_val_prviate);
    //       this.loading_btn = false;
    //       this.btn_upload = false;
    //       this.showAlert = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.loading_btn = false;
    //       this.showErrorNotification();
    //     });
    // },
    // submitUploadPublic() {
    //   this.loading_btn02 = true;
    //   this.showErr02 = false;
    //   this.fileList_public = this.fileList_public.filter((u) => {
    //     return u.id != undefined;
    //   });
    //   let { uploadFiles } = this.$refs.uploadPublic;
    //   const img_arr = [];
    //   let form = new FormData();
    //   uploadFiles.forEach((item) => {
    //     form.append("file[]", item.raw);
    //   });
    //   axiosClient
    //     .post("/admin/real-estates/image", form)
    //     .then((response) => {
    //       this.img_arr = response.data.results.map((item) => {
    //         return { ...item, url: item.thumbnail };
    //       });
    //       console.log(this.img_arr);
    //       setTimeout(() => {
    //         this.fileList_public = this.fileList_public.concat(this.img_arr);
    //       }, 1000);
    //       // this.fileList = this.fileList.concat(this.img_arr);
    //       this.image_id_public = this.image_id_public.concat(
    //         this.img_arr.map((u) => u.id)
    //       );
    //       this.img_val_public = this.image_id_public.map((item) => `${item}`).join(",");
    //       // console.log("img_id", this.image_id);
    //       this.loading_btn02 = false;
    //       this.btn_upload02 = false;
    //       this.showAlert02 = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.loading_btn02 = false;
    //       this.showErrorNotification();
    //     });
    // },
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
  .project_id,
  .street_name {
    margin-top: -25px;
  }
}
.address {
  margin-bottom: 20px;
}
.form_content {
  padding: 0 10px;
  margin-top: 10px;
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
      display: flex;
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
.error_message {
  color: red;
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: -8px;
}
.street_name {
  margin-top: 0px;
}

#huy_createUser.el-button {
  border: 1px solid #fbad18;
  box-sizing: border-box;
  border-radius: 15px;
  color: #fbad18;
  margin-top: 20px;
}
#new_createUser.el-button {
  background: #fbad18;
  border: 1px solid #fbad18;
  box-sizing: border-box;
  color: #fff;
  border-radius: 15px;
  margin-top: 20px;
}
@media screen and (max-width: 1250px) {
  .createBDS {
    margin-top: 0px;
  }
  .v-btn.v-btn.v-size--default {
    width: 80px !important;
  }
  .content_estate_options {
    display: flex;
    width: 100.8%;
    .options {
      height: 400px;
    }
  }
}
@media screen and (max-width: 600px) {
  .more_info {
    display: none;
  }
  .dictrict_id,
  .ward_id {
    margin-top: -25px;
  }
  .content_02 {
    .typeOfEstate {
      display: block;
      .estate_item {
        width: 94%;
      }
    }
  }
  .content_estate_options {
    display: block;
    width: 100.8%;
    .options {
      width: 104%;
      padding: 10px 0;
      margin: -10px;
      margin-top: 20px !important;
      height: 600px;
      .col-4 {
        padding: 0px;
      }
      .content_03 {
        display: block;

        .items {
          width: 94%;
          margin: 0 10px;
        }
      }
    }
    .cms {
      width: 104%;
      margin-left: -10px;
      margin-top: 20px;
      .tieude {
        .el-input__inner {
          width: 100%;
        }
        padding: 10px;
      }
    }
  }
  .luunhap {
    margin-bottom: 60px;
  }
}
</style>
