<template>
<<<<<<< HEAD
  <div id="project_table">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.customer"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.area"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Carbs (g)">
                        <button type="">Thêm giá</button>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.floor"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template> -->
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.name }}</td>
          <td class="d-flex image_item">
            <div v-for="img in row.item.picture" :key="img.id">
              <img :src="img.src" alt="" class="project_picture" />
            </div>
          </td>
          <td>{{ row.item.estate }}</td>
          <td>{{ row.item.create_date }}</td>
          <td>{{ row.item.update_date }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
=======
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
    <el-dialog
      title="BĐS"
      :visible.sync="dialogTableVisible"
      class="suitableEstate"
      :width="modal"
    >
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
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
>>>>>>> main
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
<<<<<<< HEAD
    headers: [
      { text: "#", value: "id", width: "80px" },
=======
    loading: false,
    loadingChild: false,
    currentPage: 1,
    rowPerPage: 10,
    page: 1,
    gridData: [],
    dialogTableVisible: false,
    modal: window.innerWidth < 600 ? "96%" : window.innerWidth < 1200 ? "70%" : "50%",
    headers: [
      { text: "#", value: "id", width: "80px", sortable: false },
>>>>>>> main
      {
        text: "TÊN",
        align: "start",
        sortable: false,
        value: "name",
<<<<<<< HEAD
        width: "500px",
      },
      { text: "ẢNH", value: "picture", width: "150px" },
      { text: "BĐS", value: "estate", width: "140px" },
      { text: "NGÀY TẠO", value: "create_date", width: "140px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", width: "140px" },
      { text: "ACTIONS", value: "actions", sortable: false, width: "100px" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 23,
          name: "Khu Nhà Ở CBCNV Công ty May XK Vũng Tàu",
=======
        width: "400px",
      },
      { text: "ẢNH", value: "picture", sortable: false, width: "150px" },
      { text: "BĐS", value: "estate", sortable: false, width: "140px" },
      { text: "NGÀY TẠO", value: "create_date", sortable: false, width: "140px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", sortable: false, width: "140px" },
      { text: "ACTIONS", value: "actions", sortable: false, width: "100px" },
    ],
    projects: [],
  }),

  computed: {
    ...mapState("projects", ["projectList", "total"]),
    ...mapState("realEstate", ["listOnDemand"]),
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
      if (this.page > 1) {
        this.$store.commit(
          "projects/getProjectListOverPageOne",
          Object.values(this.projectList)
        );
      }
      this.projects = this.projectList.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
>>>>>>> main
          picture: [
            { id: 1, src: require("@/assets/images/layouts/house2.png") },
            { id: 2, src: require("@/assets/images/layouts/house1.png") },
            { id: 3, src: require("@/assets/images/layouts/house3.png") },
            { id: 4, src: require("@/assets/images/layouts/house4.png") },
          ],
<<<<<<< HEAD
          estate: "6BĐS",
          create_date: "16/12/2020 19:23:33",
          update_date: "21/5/2021 10:34:11",
        },
        {
          id: 45,
          name: "KHU BIỆT THỰ VIỆT ANH",
          picture: "",
          estate: "1BĐS",
          create_date: "22/09/2020 11:23:33",
          update_date: "09/05/2021 09:34:11",
        },
        {
          id: 87,
          name: "Căn hộ nghĩ dưỡng khách sạn AQUATA",
          picture: [
            { id: 1, src: require("@/assets/images/layouts/house2.png") },
            { id: 2, src: require("@/assets/images/layouts/house1.png") },
          ],
          estate: "10BĐS",
          create_date: "06/12/2020 19:23:33",
          update_date: "29/5/2021 10:34:11",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
=======
          estate: item.real_estates.length,
          real_estates: item.real_estates,
          create_date: `${moment(item.created_at).format("L")}`,
          create_time: `${moment(item.created_at).format("LTS")}`,
          update_date: `${moment(item.updated_at).format("L")}`,
          update_time: `${moment(item.updated_at).format("LTS")}`,
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
      // this.$store.commit("projects/selectedProject", item);
      this.$router.push(`/form/projects/update/${item.id}`);
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
        message: "Delete project successfull!!!",
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
>>>>>>> main
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
<<<<<<< HEAD
  .project_picture {
=======
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
>>>>>>> main
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto 0;
    margin-left: -5px;
  }
}
<<<<<<< HEAD
=======
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
>>>>>>> main
</style>
