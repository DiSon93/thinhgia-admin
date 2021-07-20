<template>
  <div id="project_table" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="projects"
      sort-by="calories"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
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
          <td>{{ row.item.estate }} BĐS</td>
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
    headers: [
      { text: "#", value: "id", width: "80px" },
      {
        text: "TÊN",
        align: "start",
        sortable: false,
        value: "name",
        width: "500px",
      },
      { text: "ẢNH", value: "picture", width: "150px" },
      { text: "BĐS", value: "estate", width: "140px" },
      { text: "NGÀY TẠO", value: "create_date", width: "140px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", width: "140px" },
      { text: "ACTIONS", value: "actions", sortable: false, width: "100px" },
    ],
    projects: [],
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
    ...mapState("projects", ["projectList", "total"]),
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
          name: item.name,
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

    // deleteItem(item) {
    //   this.editedIndex = this.projects.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogDelete = true;
    // },

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
      this.loading = true;
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
        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        this.projects.push(this.editedItem);
      }
      this.close();
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
  .project_picture {
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
