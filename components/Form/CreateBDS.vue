<template>
  <div class="createBDS">
    <!-- <div class="header_form">
      <div class="header_left d-flex">
        <div class="create_title">Tạo bất động sản</div>
        <v-btn-toggle v-model="text" tile group>
          <v-btn value="left"> Bán </v-btn>
          <v-btn value="center"> Cho thuê </v-btn>
        </v-btn-toggle>
      </div>
      <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button>
    </div> -->
    <div class="form_content">
      <v-row class="content_01">
        <v-col cols="3">
          <div class="position">
            <div class="form_label">Nhân viên</div>
            <el-select v-model="value" placeholder="Chọn nhân viên" id="staff">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                style="height: 44px; padding-top: 4px"
              >
                <span style="line-height: 18px">
                  <div style="font-weight: 500">{{ item.name }}</div>
                  <div class="sdt" style="font-size: 13px">
                    <i>{{ item.sdt }}</i>
                  </div>
                </span>
              </el-option>
            </el-select>
            <div class="form_label">Khách hàng <span style="color: red">*</span></div>
            <div class="d-flex">
              <el-select v-model="value02" placeholder="Chọn khách hàng">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
              <el-select v-model="value03" placeholder="Chọn tỉnh">
                <el-option
                  v-for="item in provinces"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
                  v-for="item in projects"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </v-col>
            <v-col cols="4">
              <div class="form_label">Huyện/TP <span style="color: red">*</span></div>
              <el-select v-model="value04" placeholder="Chọn huyện/TP">
                <el-option
                  v-for="item in districts"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <div class="form_label">Tên đường/Số nhà</div>
              <el-input v-model="value07" id="input_stress"></el-input>
            </v-col>
            <v-col cols="4">
              <div class="form_label">Phường/Xã <span style="color: red">*</span></div>
              <el-select v-model="value05" placeholder="Chọn phường/xã">
                <el-option
                  v-for="item in towns"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
                v-for="item in estate"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Loại nhà đất</div>
            <el-select v-model="value11" placeholder="Chọn loại nhà">
              <el-option
                v-for="item in house"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Pháp Lý</div>
            <el-select v-model="value12" placeholder="Chọn pháp lý">
              <el-option
                v-for="item in laws"
                :key="item.value"
                :label="item.name"
                :value="item.value"
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
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Đường rộng</div>
            <el-select v-model="value16" placeholder="0m">
              <el-option
                v-for="item in widths"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="estate_item">
            <div class="form_label">Hướng</div>
            <el-select v-model="value17" placeholder="Chọn hướng">
              <el-option
                v-for="item in directions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
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
                  v-for="item in directions"
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
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
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
              api-key="wuz940zk6opb46xuo1sh5a3mpfvh401sgp3zgt8iiw80hp20"
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
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              drag
              multiple
            >
              <i slot="default" class="el-icon-picture"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
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
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              drag
              multiple
            >
              <i slot="default" class="el-icon-picture"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
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
        <el-checkbox v-model="checked01">Có</el-checkbox>
        <el-checkbox v-model="checked02">Không</el-checkbox>
      </div>
      <div class="luunhap">
        <el-button id="soft_save">Lưu nháp</el-button>
        <el-button id="save">Lưu</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      text: "center",
      shownmore: false,
      checked01: false,
      checked02: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        //  toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo' ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      options: [
        {
          value: "1",
          name: "Phạm Văn Sơn",
          sdt: "01278564",
        },
        {
          value: "2",
          name: "Phạm Văn Minh",
          sdt: "09765264",
        },
        {
          value: "3",
          name: "Lê Minh Chí",
          sdt: "012875564",
        },
        {
          value: "4",
          name: "Phạm Văn Đồng",
          sdt: "01278564",
        },
        {
          value: "5",
          name: "Phạm Văn Sơn",
          sdt: "01278564",
        },
        {
          value: "6",
          name: "Phạm Văn Linh",
          sdt: "012226864",
        },
        {
          value: "7",
          name: "Phạm Văn Lộc",
          sdt: "012226864",
        },
      ],
      provinces: [
        {
          value: "1",
          name: "Bà Rịa-Vũng Tàu",
        },
        {
          value: "2",
          name: "TP Hồ Chí Minh",
        },
        {
          value: "3",
          name: "Hà Nội",
        },
        {
          value: "4",
          name: "Đà Nẵng",
        },
        {
          value: "5",
          name: "Quảng Nam",
        },
      ],
      districts: [
        {
          value: "1",
          name: "An Ninh",
        },
        {
          value: "2",
          name: "An Lạc",
        },
        {
          value: "3",
          name: "An Hòa",
        },
        {
          value: "4",
          name: "An Sinh",
        },
        {
          value: "5",
          name: "An Tuân",
        },
      ],
      towns: [
        {
          value: "1",
          name: "Bình Tân",
        },
        {
          value: "2",
          name: "Bình Hòa",
        },
        {
          value: "3",
          name: "Bình An",
        },
        {
          value: "4",
          name: "Bình Thành",
        },
        {
          value: "5",
          name: "Bình Tuân",
        },
        {
          value: "6",
          name: "Bình Minh",
        },
        {
          value: "7",
          name: "Bình Thạnh",
        },
        {
          value: "8",
          name: "Bình Đại",
        },
      ],
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
      value: "",
      value02: "",
      value03: "",
      value04: "",
      value05: "",
      value06: "",
      value07: "",
      value08: "",
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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
