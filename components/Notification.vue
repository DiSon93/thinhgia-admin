<template>
  <div>
    <div class="notification d-flex">
      <div class="title">Thông báo</div>
      <v-btn color="warning" dark id="btn_readmore"> Xem tất cả </v-btn>
    </div>
    <div class="noti_content">
      <div class="d-flex user_noti">
        <img src="@image/icons/username.png" alt="" />
        <span>User Name đã chia sẻ bđs lên trang cộng đồng</span>
      </div>
      <div class="d-flex user_noti">
        <img src="@image/icons/username.png" alt="" />
        <span>User Name đã chia sẻ bđs lên trang cộng đồng</span>
      </div>
      <div class="d-flex user_noti">
        <img src="@image/icons/username.png" alt="" />
        <span>User Name đã chia sẻ bđs lên trang cộng đồng</span>
      </div>
      <div class="d-flex user_noti">
        <img src="@image/icons/username.png" alt="" />
        <span>User Name đã chia sẻ bđs lên trang cộng đồng</span>
      </div>
      <div class="d-flex user_noti">
        <img src="@image/icons/username.png" alt="" />
        <span>User Name đã chia sẻ bđs lên trang cộng đồng</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notification {
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  .title {
    font-weight: 500;
    font-size: 15px !important;
    color: #fbad18;
    letter-spacing: 0.5px !important;
  }
  #btn_readmore {
    text-transform: capitalize;
    font-weight: 300;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #000000;
    width: 64px;
    border-radius: 15px;
    width: 70px;
    height: 18px;
  }
}
.noti_content {
  .user_noti {
    background: #ffffff;
    border-radius: 15px;
    height: 48px;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    &:hover {
      background-color: rgba(192, 192, 192, 0.466);
      transition: 0.5s;
    }
    img {
      width: 30px;
      height: 30px;
      margin: 0 25px;
    }
    span {
      font-size: 13px;
      letter-spacing: 0.5px;
    }
  }
}
@media screen and (max-width: 600px){
  .user_noti{
    span{
      font-size: 11px!important;
    }
  }
}
</style>
