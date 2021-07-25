<template>
  <div id="project_table" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="projects"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.name.toUpperCase() }}</td>
          <td class="d-flex image_item">
            <div v-for="img in row.item.images.slice(0, 4)" :key="img.id">
              <img :src="img.thumbnail" alt="" class="project_picture" />
            </div>
            <span v-if="row.item.images.length > 4" class="more_picture">
              +{{ row.item.images.length - 4 }}</span
            >
          </td>
          <td>
            <el-button
              type="warning"
              plain
              @click="showRealEstateDetail(row.item.real_estates)"
              >{{ row.item.estate }} BĐS</el-button
            >
          </td>
          <td>
            {{ row.item.create_date }}
            <div>{{ row.item.create_time }}</div>
          </td>
          <td>
            {{ row.item.update_date }}
            <div>{{ row.item.update_time }}</div>
          </td>
          <td>
            <v-icon small class="mr-2" @click="editItem(row.item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(row.item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <el-dialog title="BĐS" :visible.sync="dialogTableVisible" class="suitableEstate">
      <el-table :data="gridData">
        <el-table-column property="id" label="#" width="50"></el-table-column>
        <el-table-column property="name" label="KHÁCH HÀNG" width="150"></el-table-column>
        <el-table-column
          property="address"
          label="THÔNG TIN"
          width="250"
        ></el-table-column>
        <el-table-column property="create_date" label="NGÀY TẠO" width="150">
          <templates slot-scope="scope">
            {{ scope.row.create_date }}
            <div>{{ scope.row.create_time }}</div>
          </templates>
        </el-table-column>
        <el-table-column label="ACTION">
          <template>
            <el-button class="views" icon="el-icon-view" type="warning" plain>
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
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    currentPage: 1,
    rowPerPage: 10,
    page: 1,
    gridData: [],
    dialogTableVisible: false,
    headers: [
      { text: "#", value: "id", width: "80px" },
      {
        text: "TÊN",
        align: "start",
        sortable: false,
        value: "name",
        width: "400px",
      },
      { text: "ẢNH", value: "picture", width: "150px" },
      { text: "BĐS", value: "estate", width: "140px" },
      { text: "NGÀY TẠO", value: "create_date", width: "140px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", width: "140px" },
      { text: "ACTIONS", value: "actions", sortable: false, width: "100px" },
    ],
    projects: [],
  }),

  computed: {
    ...mapState("projects", ["projectList", "total"]),
  },

  created() {
    this.getProjectListPerPage();
  },

  methods: {
    async getProjectListPerPage() {
      this.loading = true;
      try {
        await this.$store.dispatch("projects/getProjectList", {
          limit: this.rowPerPage,
          page: this.page,
        });
        await this.initializeList();
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    initializeList() {
      console.log("page2", this.projectList);
      this.projects = this.projectList.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          picture: [
            { id: 1, src: require("@/assets/images/layouts/house2.png") },
            { id: 2, src: require("@/assets/images/layouts/house1.png") },
            { id: 3, src: require("@/assets/images/layouts/house3.png") },
            { id: 4, src: require("@/assets/images/layouts/house4.png") },
          ],
          estate: item.real_estates.length,
          real_estates: item.real_estates,
          create_date: item.created_at.slice(0, 10),
          create_time: item.created_at.slice(11, 19),
          update_date: item.updated_at.slice(0, 10),
          update_time: item.updated_at.slice(11, 19),
          province_id: item.province_id,
          district_id: item.district_id,
          ward_id: item.ward_id,
          street: item.street,
          type: item.type,
          progress: item.progress,
          investor: item.investor,
          location: item.location,
          utilities: item.utilities,
          ground: item.ground,
          title: item.title,
          descriptions: item.descriptions,
          image_id: item.image_id,
          images: item.images,
        };
      });
    },

    editItem(item) {
      this.$store.commit("projects/selectedProject", item);
      this.$router.push("/form/projects/update");
    },

    deleteItem(item) {
      this.$confirm(`Are you sure to delete this project. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.deleteProjectInSystem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },

    async deleteProjectInSystem(item) {
      try {
        await this.$store.dispatch("projects/deleteProjectIntoSystem", item.id);
        await this.getProjectListPerPage();
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
      await this.getProjectListPerPage();
      this.loading = false;
    },
    async handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      await this.getProjectListPerPage();
      this.loading = false;
    },
    showRealEstateDetail(item) {
      this.dialogTableVisible = true;
      console.log("item", item);
      this.gridData = item.map((u, i) => {
        return {
          id: u.id,
          name: u.customer_id,
          address: `${u.ward_id}/${u.district_id}/${u.province_id}`,
          date: u.created_at,
          create_date: u.created_at.slice(0, 10),
          create_time: u.created_at.slice(11, 19),
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#project_table {
  width: 100vw;
}
.image_item {
  align-items: center;
  justify-content: center;
  .more_picture {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.295);
    font-weight: 700;
    color: #fff;
    line-height: 30px;
    margin-left: -5px;
  }
  .project_picture {
    opacity: 0.6;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto 0;
    margin-left: -5px;
  }
}
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>
