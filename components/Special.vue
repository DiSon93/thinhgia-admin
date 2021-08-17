<template>
  <div>
    <div class="special_title">Bất động sản nổi bật</div>
    <div class="data_table">
      <v-simple-table fixed-header id="table_special">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Địa chỉ</th>
              <th class="text-left">Lượt xem</th>
            </tr>
          </thead>
          <tbody v-if="specialList.length != 0">
            <tr
              v-for="item in specialList"
              :key="item.id"
              @click="$router.push(`/detail/house/${item.id}`)"
            >
              <td>{{ item.id }}</td>
              <td>
                {{ item.updated_at.slice(0, 10) }} {{ item.updated_at.slice(11, 19) }}
                <div d-flex>
                  <v-btn
                    depressed
                    color="primary"
                    id="social_network"
                    v-if="item.share_public"
                  >
                    Cộng đồng
                  </v-btn>
                  <v-btn v-if="item.share_web" depressed color="success" id="web">
                    Web
                  </v-btn>
                </div>
              </td>
              <td>{{ item.viewed }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecialList();
  },
  computed: {
    ...mapState("realEstate", ["specialList"]),
  },
  methods: {
    async getSpecialList() {
      try {
        await this.$store.dispatch("realEstate/getRealEstateSpecialList", {
          sort_view: 1,
          limit: 10,
          page: 1,
        });
        console.log("realEstateListSpecail", this.specialList);
      } catch {}
    },
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
  // height: 620px;
  background: #ffffff;
  border-radius: 15px;
  // overflow: hidden;
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
      height: auto !important;
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
  .data_table {
    margin-bottom: 60px;
  }
}
</style>
