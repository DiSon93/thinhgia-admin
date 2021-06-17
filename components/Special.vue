<template>
  <div>
    <div class="special_title">Bất động sản nổi bật</div>
    <div class="data_table">
      <v-simple-table fixed-header height="620px" id="table_special">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Địa chỉ</th>
              <th class="text-left">Lượt xem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.id">
              <td>{{ item.id }}</td>
              <td>
                {{ item.name }}
                <div d-flex>
                  <v-btn depressed color="primary" id="social_network"> Cộng đồng </v-btn>
                  <v-btn
                    v-if="item.web ? true : false"
                    depressed
                    color="success"
                    id="web"
                  >
                    Web
                  </v-btn>
                </div>
              </td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          id: 2971,
          name: "18-04 30 tháng 04",
          calories: 159,
          web: true,
        },
        {
          id: 2972,
          name: "18-04 30 tháng 04",
          calories: 237,
        },
        {
          id: 2973,
          name: "18-04 30 tháng 04",
          calories: 262,
          web: true,
        },
        {
          id: 2974,
          name: "18-04 30 tháng 04",
          calories: 305,
        },
        {
          id: 2975,
          name: "18-04 30 tháng 04",
          calories: 356,
        },
        {
          id: 2976,
          name: "18-04 30 tháng 04",
          calories: 375,
        },
        {
          id: 2977,
          name: "18-04 30 tháng 04",
          calories: 392,
        },
        {
          id: 2978,
          name: "18-04 30 tháng 04",
          calories: 408,
        },
        {
          id: 2979,
          name: "18-04 30 tháng 04",
          calories: 452,
        },
        {
          id: 2980,
          name: "18-04 30 tháng 04",
          calories: 518,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.special_title {
  font-weight: 500;
  font-size: 15px;
  color: #fbad18;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  margin-top: 30px;
}
.data_table {
  height: 620px;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  #table_special {
    border-radius: 15px !important;
    td {
      font-size: 13px;
      height: 55px !important;
    }
    tr:hover {
      background: #fdd27f;
    }
    #social_network {
      text-transform: capitalize !important;
      border-radius: 15px;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 0.5px;
      height: 22px;
      background-color: #2db7f5 !important;
    }
    #web {
      text-transform: capitalize !important;
      border-radius: 15px;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 0.5px;
      height: 22px;
      background-color: #87d068 !important;
    }
    .v-data-table__wrapper {
      border-radius: 15px !important;
    }
  }
}
@media screen and (max-width: 600px) {
  #social_network {
    padding: 3px 3px;
    font-size: 9px;
    border-radius: 5px !important;
  }
  #web {
    padding: 3px 3px !important;
    font-size: 9px;
    border-radius: 5px !important;
    margin-left: 5px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    min-width: 30px !important;
  }
  #table_special {
    td {
      font-size: 12px !important;
    }
  }
  .data_table{
    margin-bottom: 60px
  }
}
</style>
