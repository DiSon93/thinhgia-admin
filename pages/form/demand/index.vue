<template>
  <div class="create_demand">
    <div class="demand_title">Tạo nhu cầu</div>
    <div class="note">
      <div>Nhu cầu của khách hàng?</div>
      <el-checkbox v-model="checked01">Mua</el-checkbox>
      <el-checkbox v-model="checked02">Thuê</el-checkbox>
    </div>
    <div class="address">
      <div class="addres_items">
        <div class="label">Tỉnh <span style="color: red">*</span></div>
        <el-select v-model="value01" placeholder="Chọn huyện">
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="addres_items">
        <div class="label">Huyện <span style="color: red">*</span></div>
        <el-select v-model="value02" placeholder="Chọn huyện">
          <el-option
            v-for="item in districts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="addres_items">
        <div class="label">Phường <span style="color: red">*</span></div>
        <el-select v-model="value03" placeholder="Chọn phường" multiple>
          <el-option
            v-for="item in wards"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="estate">
      <div class="estate_items">
        <div class="label">Loại Bất động sản <span style="color: red">*</span></div>
        <el-select v-model="value04" placeholder="Chọn huyện">
          <el-option
            v-for="item in districts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="estate_items">
        <div class="label">Loại nhà <span style="color: red">*</span></div>
        <el-select v-model="value05" placeholder="Chọn phường" multiple>
          <el-option
            v-for="item in wards"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="price_staff">
      <div class="price">
        <div class="label">Giá tối thiểu (VNĐ) <span style="color: red">*</span></div>
        <el-input v-model="value06" id="input_price"></el-input>

        <div class="label">Giá tối đa (VNĐ) <span style="color: red">*</span></div>
        <el-input v-model="value07" id="input_price"></el-input>
      </div>

      <div class="staff">
        <div class="label">Nhân viên</div>
        <el-select v-model="value08" placeholder="Chọn phường" multiple>
          <el-option
            v-for="item in wards"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="label">Khách hàng <span style="color: red">*</span></div>
        <div class="d-flex">
          <el-select v-model="value09" placeholder="Chọn phường" multiple>
            <el-option
              v-for="item in wards"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button round>+ Tạo</el-button>
        </div>
      </div>
    </div>
    <div class="direction">
      <div class="label">Hướng<span style="color: red">*</span></div>
      <el-select v-model="value08" placeholder="Chọn phường" multiple>
        <el-option
          v-for="item in wards"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="tool">
      <div class="tool_item">
        <div class="label">Số phòng ngủ tối thiểu</div>
        <el-input v-model="value06" id="input_price"></el-input>
      </div>
      <div class="tool_item">
        <div class="label">Số lầu tối thiểu</div>
        <el-input v-model="value06" id="input_price"></el-input>
      </div>
      <div class="tool_item">
        <div class="label">Diện tích tối thiểu</div>
        <el-input v-model="value06" id="input_price"></el-input>
      </div>
    </div>
    <div class="discription">
      <div class="label">Mô tả</div>
      <el-input v-model="value06" id="input_price"></el-input>
    </div>
    <div class="save">
      <el-button id="save">Lưu</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked01: true,
      checked02: false,
      value01: "",
      value02: "",
      value03: "",
      provinces: [
        {
          label: "Tiền Giang",
          value: 1,
        },
        {
          label: "Long An",
          value: 2,
        },
      ],
      districts: [
        {
          label: "Cái Bè",
          value: 1,
        },
        {
          label: "Gò Công",
          value: 2,
        },
      ],
      wards: [
        {
          label: "Phường Mỹ Đức",
          value: 1,
        },
        {
          label: "Phường Phú Mỹ",
          value: 2,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.create_demand {
  .demand_title {
    margin-top: -60px;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #606060;
    margin-bottom: 6px;
  }
  .note {
    font-size: 14px;
    margin-bottom: 5px;
  }
  .address,
  .estate,
  .direction,
  .tool {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px 15px;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  .addres_items {
    width: 32%;
    .el-select {
      width: 100%;
    }
  }
  .estate_items {
    width: 49%;
    .el-select {
      width: 100%;
    }
  }
  .label {
    font-weight: 500;
    font-size: 14px;
  }
  .price_staff {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .label {
      margin-top: 10px;
    }
    .price {
      width: 33%;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0px 20px 15px;
    }
    .staff {
      width: 66%;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0px 20px 15px;
      .el-select {
        width: 100%;
      }
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
  }
  .direction,
  .discription,
  .save {
    display: block;
    background-color: #fff;
    padding: 10px 20px 15px;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 15px;
    .label {
      display: block;
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
  .tool {
    .tool_item {
      width: 32%;
    }
    .el-select {
      width: 100%;
    }
  }
  .save {
    display: flex;
    justify-content: center;
    #save.el-button {
      color: #fff;
      background: #fbad18;
      border-radius: 15px;
      margin: 0 auto;
      padding: 8px 20px;
    }
  }
}
</style>
