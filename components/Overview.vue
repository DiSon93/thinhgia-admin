<template>
  <div>
    <div class="overview">Tổng quan</div>
    <div class="d-flex data">
      <div class="real-estate data_items">
        <div d-flex>
          <img src="@image/icons/real-estate.png" alt="" />
          <span>Bất động sản</span>
        </div>
        <div class="figures">5587</div>
        <div class="user_share">200 đã chia sẻ</div>
      </div>
      <div class="demands data_items right">
        <div d-flex>
          <img src="@image/icons/email.png" alt="" />
          <span>Nhu cầu</span>
        </div>
        <div class="figures">9</div>
        <div class="user_share">5 đã chia sẻ</div>
      </div>
    </div>
    <div class="d-flex data">
      <div class="users data_items">
        <div d-flex>
          <img src="@image/icons/data_user.png" alt="" />
          <span>Người dùng</span>
        </div>
        <div class="figures">53</div>
        <div class="user_share">20 đã chia sẻ</div>
      </div>
      <div class="customers data_items right">
        <div d-flex>
          <img src="@image/icons/customers.png" alt="" />
          <span>Khách hàng</span>
        </div>
        <div class="figures">977</div>
        <div class="user_share">3 đã chia sẻ</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
    padding: 20px 50px;
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
</style>
