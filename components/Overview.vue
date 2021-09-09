<template>
<<<<<<< HEAD
  <div>
=======
  <div v-if="overview">
>>>>>>> main
    <div class="overview">Tổng quan</div>
    <div class="d-flex data">
      <div class="real-estate data_items">
        <div d-flex>
          <img src="@image/icons/real-estate.png" alt="" />
          <span>Bất động sản</span>
        </div>
<<<<<<< HEAD
        <div class="figures">5587</div>
        <div class="user_share">200 đã chia sẻ</div>
=======
        <div class="figures">{{ overview.real_estates }}</div>
        <div class="user_share">{{ overview.shared_real_estates }} đã chia sẻ</div>
>>>>>>> main
      </div>
      <div class="demands data_items right">
        <div d-flex>
          <img src="@image/icons/email.png" alt="" />
          <span>Nhu cầu</span>
        </div>
<<<<<<< HEAD
        <div class="figures">9</div>
        <div class="user_share">5 đã chia sẻ</div>
=======
        <div class="figures">{{ overview.needs }}</div>
        <div class="user_share">{{ overview.shared_needs }} đã chia sẻ</div>
>>>>>>> main
      </div>
    </div>
    <div class="d-flex data">
      <div class="users data_items">
        <div d-flex>
          <img src="@image/icons/data_user.png" alt="" />
          <span>Người dùng</span>
        </div>
<<<<<<< HEAD
        <div class="figures">53</div>
        <div class="user_share">20 đã chia sẻ</div>
=======
        <div class="figures">{{ overview.users }}</div>
        <div class="user_share">{{ overview.staff_users }} nhân viên</div>
>>>>>>> main
      </div>
      <div class="customers data_items right">
        <div d-flex>
          <img src="@image/icons/customers.png" alt="" />
          <span>Khách hàng</span>
        </div>
<<<<<<< HEAD
        <div class="figures">977</div>
        <div class="user_share">3 đã chia sẻ</div>
=======
        <div class="figures">{{ overview.customers }}</div>
        <div class="user_share">{{ overview.new_customers }} khách hàng mới</div>
>>>>>>> main
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
export default {};
=======
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getOverviewInSystem();
  },
  computed: {
    ...mapState("homepage", ["overview"]),
  },
  methods: {
    ...mapActions("homepage", ["getOverviewInSystem"]),
  },
};
>>>>>>> main
</script>

<style lang="scss" scoped>
.overview {
  font-weight: 500;
  font-size: 15px;
  color: #fbad18;
  letter-spacing: 0.5px;
  margin: 20px 0;
  margin-top: 40px;
}
.detail {
  background: #ffffff;
  border-radius: 15px;
}
.data {
  .data_items {
    width: 98%;
    height: 120px;
    background: #ffffff;
    border-radius: 15px;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 20px 20px;
    &:hover {
      background-color: rgba(192, 192, 192, 0.466);
      transition: 0.5s;
    }
    span {
      font-weight: 300;
      font-size: 15px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
  .right {
    margin-right: 0;
  }
  .figures {
    font-size: 22px;
    font-weight: 700;
    // line-height: 24px;
  }
  .user_share {
    font-size: 13px;
    font-weight: 300;
  }
}
@media screen and (min-width: 1265px) {
  .data {
    .data_items {
      padding-top: 20px;
      padding-left: 10%;
    }
  }
}
<<<<<<< HEAD
=======
@media screen and (max-width: 500px) {
  .data_items {
    span {
      font-size: 13px !important;
      margin-left: 0px !important;
      font-weight: 700;
    }
  }
  .overview {
    margin-top: -120px !important;
  }
}
>>>>>>> main
</style>
