<template>
  <div id="demand_table">
    <v-data-table
      :headers="headers"
      :items="demands"
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
            <div>{{ row.item.customer }}</div>
            <div class="side">{{ row.item.side }}</div>
          </td>
          <td>
            {{ row.item.wards }}<span class="highlight">||</span> {{ row.item.district
            }}<span class="highlight">||</span> {{ row.item.province }}
          </td>
          <td>{{ row.item.price }}</td>
          <td>{{ row.item.floor }}</td>
          <td>{{ row.item.bedroom }}</td>
          <td>{{ row.item.direction }}</td>
          <td>{{ row.item.staff }}</td>
          <td>{{ row.item.type_estate }}</td>
          <td>{{ row.item.type_house }}</td>
          <td>{{ row.item.square }} <span>&#13217;</span></td>
          <td>{{ row.item.proble }}</td>
          <td>{{ row.item.discription }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "#", value: "id", width: "50px" },
      {
        text: "KHÁCH HÀNG",
        align: "start",
        sortable: false,
        value: "customer",
        width: "140px",
      },
      { text: "KHU VỰC", value: "area", width: "260px" },
      { text: "KHOẢNG GIÁ", value: "price", width: "140px" },
      { text: "SỐ LẦU", value: "floor", width: "100px" },
      { text: "SỐ PN", value: "bedroom", width: "100px" },
      { text: "HƯỚNG", value: "direction", width: "100px" },
      { text: "NHÂN VIÊN", value: "staff", width: "160px" },
      { text: "LOẠI BĐS", value: "type_estate", width: "160px" },
      { text: "LOẠI NHÀ", value: "type_house", width: "160px" },
      { text: "DIỆN TÍCH", value: "square", width: "140px" },
      { text: "BĐS PHÙ HỢP", value: "proble", width: "160px" },
      { text: "MÔ TẢ", value: "discription", width: "260px" },
      { text: "Actions", value: "actions", sortable: false, width: "100px" },
    ],
    demands: [],
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
    ...mapState("demand", ["demandList"]),
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
    this.getDemandList();
  },

  methods: {
    async getDemandList() {
      try {
        await this.$store.dispatch("demand/getDemandList", {
          limit: 10,
          page: 1,
          resolved: true,
        });
        await this.initializeList();
      } catch {}
    },
    initializeList() {
      console.log("array", this.demandList[0].descriptions);
      // this.demands = [
      //   {
      //     id: 3243,
      //     customer: "Anh An",
      //     area: "Phường 2, Nguyễn An Ninh, Vũng Tàu",
      //     price: "1 tỷ - 5 tỷ",
      //     floor: "4",
      //     bedroom: "2",
      //     direction: "Nam",
      //     staff: "Đào Duy Anh",
      //     type_estate: "Nhà mặt tiền",
      //     type_house: "Nhà cấp 4",
      //     square: "120m2",
      //     proble: "1BĐS",
      //     side: "Mua",
      //   },
      //   {
      //     id: 1234,
      //     customer: "Anh Vân",
      //     area: "Phường 2, Nguyễn Lý Thông, Vũng Tàu",
      //     price: "2 tỷ - 9 tỷ",
      //     floor: "9",
      //     bedroom: "2",
      //     direction: "Bắc",
      //     staff: "Đào Duy Từ",
      //     type_estate: "Nhà mặt tiền",
      //     type_house: "Nhà cấp 3",
      //     square: "178m2",
      //     proble: "0BĐS",
      //     side: "Mua",
      //   },
      //   {
      //     id: 3435,
      //     customer: "Anh Tân",
      //     area: "Phường 1, Nguyễn Trung Trực, Vũng Tàu",
      //     price: "4 tỷ - 5 tỷ",
      //     floor: "7",
      //     bedroom: "2",
      //     direction: "Tây",
      //     staff: "Đào Thiên Lâm",
      //     type_estate: "Nhà mặt tiền",
      //     type_house: "Nhà cấp 4",
      //     square: "120m2",
      //     proble: "1BĐS",
      //     side: "Mua",
      //   },
      // ];
      this.demands = this.demandList.map((item, index) => {
        return {
          id: item.id,
          customer: item.customer,
          wards: item.wards[0].name,
          district: item.district.name,
          province: item.province.name,
          price: `${item.price_min} tỷ - ${item.price_max} tỷ`,
          floor: item.floor_number_min,
          bedroom: item.bedroom_number_min,
          direction: item.house_orientation,
          staff: item.user?.name,
          type_estate: item.house_orientations[0].name,
          type_house: item.house_type,
          square: item.land_area_min,
          proble: `${item.purpose} BĐS`,
          side: "Mua",
          discription: item.descriptions,
        };
      });
    },

    editItem(item) {
      this.editedIndex = this.demands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.demands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.demands.splice(this.editedIndex, 1);
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
        Object.assign(this.demands[this.editedIndex], this.editedItem);
      } else {
        this.demands.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped></style>
