<template>
  <div id="demand_table" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="demands"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
      fixed-header
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>
            <div>{{ row.item.customer }}</div>
            <div class="side">{{ row.item.side }}</div>
          </td>
          <td>
            {{
              row.item.wards
                .map((u) => `${u.name}, `)
                .join("")
                .slice(0, -2)
            }}<span class="highlight">||</span> {{ row.item.district
            }}<span class="highlight">||</span> {{ row.item.province }}
          </td>
          <td>{{ row.item.price_min }} tỷ - {{ row.item.price_max }} tỷ</td>
          <td>
            {{ row.item.floor }}
          </td>
          <td>
            {{ row.item.bedroom }}
          </td>
          <td>
            <el-tag
              type="success"
              style="margin: 2px"
              v-for="item in row.item.direction"
              :key="item.id"
            >
              {{ item.name }}
            </el-tag>
            <!-- {{ row.item.direction.map((u) => `${u.name} `).join(" ") }} -->
          </td>
          <td>{{ row.item.staff }}</td>
          <td>{{ row.item.type_estate }}</td>
          <td>{{ row.item.type_house }}</td>
          <td>{{ row.item.square }} <span>&#13217;</span></td>
          <td>
            <el-button
              type="warning"
              plain
              @click="showRealEstateDetail(row.item.real_estates)"
              >{{ row.item.estate }} BĐS</el-button
            >
          </td>
          <td>{{ row.item.discription }}</td>
          <td>
            <!-- <el-tooltip class="item" effect="dark" content="Sửa" placement="top"> -->
            <v-icon small class="mr-2" @click="updateDemandCustomer(row.item)">
              mdi-pencil
            </v-icon>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="Chuyển trạng thái"
              placement="top"
            > -->
            <v-icon small class="mr-2" @click="convertStatus(row.item)">
              mdi-rotate-3d-variant
            </v-icon>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="Xóa" placement="top"> -->
            <v-icon small @click="deleteItem(row.item)"> mdi-delete </v-icon>
            <!-- </el-tooltip> -->
          </td>
        </tr>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
    <el-dialog title="BĐS" :visible.sync="dialogTableVisible" class="suitableEstate">
      <el-table :data="gridData" v-loading="loadingChild">
        <el-table-column property="id" label="#" width="50"></el-table-column>
        <el-table-column property="name" label="KHÁCH HÀNG" width="150"></el-table-column>
        <el-table-column
          property="address"
          label="THÔNG TIN"
          width="250"
        ></el-table-column>
        <el-table-column property="create_date" label="NGÀY TẠO" width="150">
          <template slot-scope="scope">
            {{ scope.row.create_date }}
            <div>{{ scope.row.create_time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="ACTION">
          <template slot-scope="scope">
            <el-button
              class="views"
              icon="el-icon-view"
              type="warning"
              plain
              @click="$router.push(`/detail/house/${scope.row.id}`)"
            >
              Xem</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">Hủy</el-button>
      </span>
    </el-dialog>
    <div class="block_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["selected_op"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    huong: "",
    loading: false,
    currentPage: 1,
    page: 1,
    rowPerPage: 10,
    dialogTableVisible: false,
    loadingChild: false,
    gridData: [],
    headers: [
      {
        text: "#",
        value: "id",
        width: "50px",
        sortable: false,
      },
      {
        text: "KHÁCH HÀNG",
        align: "start",
        sortable: false,
        value: "customer",
        width: "180px",
      },
      {
        text: "KHU VỰC",
        value: "area",
        width: "300px",
        sortable: false,
      },
      {
        text: "KHOẢNG GIÁ",
        value: "price",
        width: "140px",
        sortable: false,
      },
      {
        text: "SỐ LẦU",
        value: "floor",
        width: "100px",
        sortable: false,
      },
      {
        text: "SỐ PN",
        value: "bedroom",
        width: "100px",
        sortable: false,
      },
      {
        text: "HƯỚNG",
        value: "direction",
        width: "150px",
        sortable: false,
      },
      {
        text: "NHÂN VIÊN",
        value: "staff",
        width: "160px",
        sortable: false,
      },
      {
        text: "LOẠI BĐS",
        value: "type_estate",
        width: "160px",
        sortable: false,
      },
      {
        text: "LOẠI NHÀ",
        value: "type_house",
        width: "160px",
        sortable: false,
      },
      {
        text: "DIỆN TÍCH",
        value: "square",
        width: "140px",
        sortable: false,
      },
      {
        text: "BĐS PHÙ HỢP",
        value: "proble",
        width: "160px",
        sortable: false,
      },
      {
        text: "MÔ TẢ",
        value: "discription",
        width: "260px",
        sortable: false,
      },
      {
        text: "SỬA-CHUYỂN HƯỚNG-XÓA",
        value: "actions",
        sortable: false,
        width: "185px",
      },
    ],
    demands: [],
  }),

  computed: {
    ...mapState("demand", ["demandList", "total"]),
    ...mapState("realEstate", ["listOnDemand"]),
  },

  created() {
    this.getDemandList();
  },

  methods: {
    async getDemandList() {
      this.loading = true;
      try {
        await this.$store.dispatch("demand/getDemandList", {
          limit: this.rowPerPage,
          page: this.page,
          resolved: this.selected_op,
        });
        await this.initializeList();
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    initializeList() {
      if (this.page > 1) {
        this.$store.commit(
          "demand/getDemandListOverPageOne",
          Object.values(this.demandList)
        );
      }
      this.demands = this.demandList.map((item, index) => {
        return {
          id: item.id,
          customer: item.customer?.name,
          customer_id: item.customer_id,
          wards: item.wards,
          wards_id: item.wards.map((u) => u.id),
          district: item.district.name,
          dictrict_id: item.district_id,
          province: item.province.name,
          province_id: item.province_id,
          price_min: item.price_min,
          price_max: item.price_max,
          floor: item.floor_number_min,
          bedroom: item.bedroom_number_min,
          direction: item.house_orientations,
          direction_id: item.house_orientations.map((u) => u.id),
          staff: item.user?.name,
          user_id: item.user_id,
          type_estate: item.real_estate_type_dict?.name,
          type_estate_id: item.real_estate_type_dict?.id,
          type_house: item.house_type_dict?.name,
          type_house_id: item.house_type_dict?.id,
          square: item.land_area_min,
          proble: item.purpose,
          side: item.purpose == 0 ? "Mua" : "Thuê",
          discription: item.descriptions,
          estate: item.real_estates.length,
          real_estates: item.real_estates,
        };
      });
    },

    updateDemandCustomer(val) {
      this.$store.commit("demand/selectedDemand", { ...val, resolved: this.selected_op });
      this.$router.push("/form/demand/update");
    },

    convertStatus(item) {
      this.$confirm(`Are you sure to convert this demand. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.convertStatusIntoSystem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },

    async convertStatusIntoSystem(item) {
      this.loading = true;
      try {
        await this.$store.dispatch("demand/convertDemandOfCustomer", {
          id: item.id,
          resolved: this.selected_op == 1 ? 0 : 1,
        });
        await this.getDemandList();
        setTimeout(this.openNotificationSuccessConvert(), 1000);
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },

    deleteItem(item) {
      this.$confirm(`Are you sure to delete this demand. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.deleteDemandInSystem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async deleteDemandInSystem(item) {
      this.loading = true;
      try {
        await this.$store.dispatch("demand/deleteDemandIntoSystem", item.id);
        await this.getDemandList();
        setTimeout(this.openNotificationSuccess(), 1000);
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },

    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Delete demand successfull!!!",
        type: "success",
      });
    },
    openNotificationSuccessConvert() {
      this.$notify({
        title: "Success",
        message: "Convert demand successfull!!!",
        type: "success",
      });
    },

    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },

    async handleSizeChange(val) {
      this.loading = true;
      if (this.page > 1) {
        return (this.page = 1);
      }
      this.rowPerPage = val;
      await this.getDemandList();
      this.loading = false;
    },
    async handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      await this.getDemandList();
      this.loading = false;
    },

    async showRealEstateDetail(item) {
      this.dialogTableVisible = true;
      this.loadingChild = true;
      let id_arr = item.map((u) => {
        return u.id;
      });
      try {
        await this.$store.dispatch("realEstate/getRealEstateListOnDemand", id_arr);
        this.gridData = this.listOnDemand.map((u, i) => {
          return {
            id: u.id,
            name: u.customer?.name,
            address: `${u.street_name}/${u.ward?.name}/${u.district?.name}/${u.province?.name}`,
            date: u.created_at,
            create_date: u.created_at.slice(0, 10),
            create_time: u.created_at.slice(11, 19),
          };
        });
        this.dialogTableVisible = true;
        this.loadingChild = false;
      } catch {
        this.gridData = [];
        this.dialogTableVisible = true;
        this.loadingChild = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>
