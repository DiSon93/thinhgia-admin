<template>
  <div id="contact" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="contactTypeList"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.title ? row.item.title.toUpperCase() : null }}</td>
          <td>
            {{ row.item.email }}
          </td>
          <td>
            {{ row.item.name }}
          </td>
          <td>
            <div class="content" v-html="row.item.content"></div>
            <!-- <div class="readMore">Xem thêm</div> -->
          </td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click="$router.push(`/form/contact/${row.item.id}`)"
            >
              mdi-pencil
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      toggle_exclusive: [],
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      headers: [
        { text: "#", value: "id", width: "50px", sortable: false },
        {
          text: "Tiêu đề",
          align: "start",
          sortable: false,
          value: "title",
          width: "150px",
        },
        { text: "Email", value: "email", sortable: false, width: "250px" },

        { text: "Loại liên hệ", value: "name", sortable: false, width: "200px" },
        { text: "Nội dung", value: "content", sortable: false, width: "450px" },

        { text: "Chỉnh sửa", value: "actions", sortable: false, width: "100px" },
      ],
      contacts: [
        { id: 1, name: "a", type: "Thông tin liên lạc" },
        { id: 2, name: "b", type: "Ý kiến" },
        { id: 3, name: "b", type: "Tuyển dụng" },
        { id: 4, name: "b", type: "Ký gửi bất động sản" },
      ],
    };
  },
  mounted() {
    this.getContactTypeList();
  },
  computed: {
    ...mapState("contact", ["contactTypeList"]),
  },
  methods: {
    // ...mapActions("contact", ["getContactTypeList"]),
    async getContactTypeList() {
      this.loading = true;
      try {
        await this.$store.dispatch("contact/getContactTypeList");
        this.loading = false;
      } catch {}
    },

    editItem() {},
    overview: function () {
      this.isOverview = true;
      this.isResquest = false;
    },
    request: function () {
      this.isOverview = false;
      this.isResquest = true;
    },
  },
};
</script>

<style lang="scss" scoped>
#contact {
  // width: 630px;
  margin: 40px 20px;
  tr td:nth-child(5) {
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 10px 0;
    }

    // height: 67px;
  }
}
</style>
=======
<template>
  <div id="contact" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="contactTypeList"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.title ? row.item.title.toUpperCase() : null }}</td>
          <td>
            {{ row.item.email }}
          </td>
          <td>
            {{ row.item.name }}
          </td>
          <td>
            <div class="content" v-html="row.item.content"></div>
            <!-- <div class="readMore">Xem thêm</div> -->
          </td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click="$router.push(`/form/contact/${row.item.id}`)"
            >
              mdi-pencil
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      toggle_exclusive: [],
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      headers: [
        { text: "#", value: "id", width: "50px", sortable: false },
        {
          text: "Tiêu đề",
          align: "start",
          sortable: false,
          value: "title",
          width: "150px",
        },
        { text: "Email", value: "email", sortable: false, width: "250px" },

        { text: "Loại liên hệ", value: "name", sortable: false, width: "200px" },
        { text: "Nội dung", value: "content", sortable: false, width: "450px" },

        { text: "Chỉnh sửa", value: "actions", sortable: false, width: "100px" },
      ],
      contacts: [
        { id: 1, name: "a", type: "Thông tin liên lạc" },
        { id: 2, name: "b", type: "Ý kiến" },
        { id: 3, name: "b", type: "Tuyển dụng" },
        { id: 4, name: "b", type: "Ký gửi bất động sản" },
      ],
    };
  },
  mounted() {
    this.getContactTypeList();
  },
  computed: {
    ...mapState("contact", ["contactTypeList"]),
  },
  methods: {
    // ...mapActions("contact", ["getContactTypeList"]),
    async getContactTypeList() {
      this.loading = true;
      try {
        await this.$store.dispatch("contact/getContactTypeList");
        this.loading = false;
      } catch {}
    },

    editItem() {},
    overview: function () {
      this.isOverview = true;
      this.isResquest = false;
    },
    request: function () {
      this.isOverview = false;
      this.isResquest = true;
    },
  },
};
</script>

<style lang="scss" scoped>
#contact {
  // width: 630px;
  margin: 40px 20px;
  tr td:nth-child(5) {
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 10px 0;
    }

    // height: 67px;
  }
}
</style>
