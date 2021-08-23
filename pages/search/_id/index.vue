<template>
  <div>
    <!-- <v-row>
      <v-col cols="12" sm="3"></v-col>
             <v-col cols="12" sm="4" class="col_search">
          <div id="search_all">
            <el-select
              v-model="value"
              filterable
              placeholder="Tìm kiếm tất cả thông tin"
              class="el-input--prefix"
              @change="chooseSearchAll($event)"
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </div>
        </v-col>
      <v-col cols="12" sm="3"></v-col>

    </v-row> -->
    <div class="search_title">
      KẾT QUẢ TÌM KIẾM CHO:
      <span class="highlight">
        {{ detailProject.name ? detailProject.name.toUpperCase() : null }}</span
      >
    </div>
    <div class="title">DỰ ÁN</div>
    <div class="projects">
      {{ detailProject.name ? detailProject.name.toUpperCase() : null }}
    </div>
    <div class="title">BẤT ĐỘNG SẢN</div>
    <div class="real_estate" v-for="item in search" :key="item.id">
      <NuxtLink class="route_estate" :to="`/detail/house/${item.id}`"
        >{{ item.title ? item.title.toUpperCase() : null }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "default",

  data() {
    return {
      search: [],
      options: [],
    };
  },
  computed: {
    ...mapState("projects", ["detailProject"]),
  },
  mounted() {
    this.selectedSearchList();
  },
  methods: {
    async selectedSearchList() {
      await this.$store.dispatch("projects/showProjectDetail", this.$route.params.id);
      console.log("detailProject", this.detailProject);
      this.search = this.detailProject.real_estates;
    },
  },
};
</script>

<style lang="scss" scoped>
.search_title {
  font-weight: 700;
  color: orange;
  margin-top: 15px;
}
.highlight {
  color: blue;
}
.title {
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0 20px 0px;
}
.route_estate {
  line-height: 40px;
  font-weight: 500;
}
</style>
