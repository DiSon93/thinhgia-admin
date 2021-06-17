<template>
  <div id="admin_table">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :mobile-breakpoint="0"
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
          <td>
            <div class="d-flex">
              <img :src="row.item.image" alt="" id="user_img" />
              <div class="user_detail">
                {{ row.item.name }}
                <div v-if="row.item.position == 'Admin'" class="position">
                  {{ row.item.position }}
                </div>
                <div v-else class="staff">
                  {{ row.item.position }}
                </div>
              </div>
            </div>
          </td>
          <td>{{ row.item.sdt }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.cmnd }}</td>
          <td>{{ row.item.cmnd_date }}</td>
          <td>{{ row.item.status }}</td>

          <td>
            <v-btn text color="error" class="btn_select"> Chọn </v-btn>
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "#", value: "id", width: "58px" },
      {
        text: "NHÂN VIÊN",
        align: "start",
        sortable: false,
        value: "name",
        width: "240px",
      },
      { text: "SĐT", value: "sdt", width: "130px" },
      { text: "EMAIL", value: "email", width: "140px" },
      { text: "NGÀY SINH", value: "birthday", width: "140px" },
      { text: "CMND", value: "cmnd", width: "140px" },
      { text: "NGÀY CẤP CMND", value: "cmnd_date", width: "160px" },
      { text: "TRẠNG THÁI", value: "status", sortable: false, width: "140px" },
      { text: "CHỈNH SỬA", value: "actions", sortable: false, width: "100px" },
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
          name: "Nguyễn Văn Linh",
          sdt: "09123124",
          email: "linh123@gmail.com",
          birthday: "16/12/2020",
          cmnd: "13123214",
          cmnd_date: "21/5/2021",
          status: "Đang hoạt động",
          position: "Admin",
          image: require("@/assets/images/layouts/house2.png"),
        },
        {
          id: 45,
          name: "Nguyễn Tiến Mạnh",
          sdt: "0124235423",
          email: "manh23124@gmail.com",
          birthday: "02/12/1991",
          cmnd: "2424325",
          cmnd_date: "11/5/2021",
          status: "Đang hoạt động",
          position: "Techical",
          image: require("@/assets/images/layouts/house3.png"),
        },
        {
          id: 87,
          name: "Đinh Thị Phượng Hằng",
          sdt: "012435346",
          email: "son38124@gmail.com",
          birthday: "22/09/1993",
          cmnd: "1324325",
          cmnd_date: "11/5/2021",
          status: "Đang hoạt động",
          position: "Sale",
          image: require("@/assets/images/layouts/house4.png"),
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
    },
  },
};
</script>
<style lang="scss" scoped>
#admin_table {
  width: 100vw;
  .user_detail {
    text-align: left;
    margin-left: 10px;
    padding-top: 14px;
    font-size: 14px;
    color: #000;
    .position {
      color: orangered !important;
      margin-top: 3px;
      font-size: 13px;
    }
    .staff {
      color: gray !important;
      margin-top: 3px;
      font-size: 13px;
    }
  }

  #user_img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px 0;
  }
  .btn_select {
    text-transform: capitalize;
    font-size: 13px;
  }
}
</style>
