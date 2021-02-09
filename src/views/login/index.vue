<template>
  <div class="page-container">
    <div class="login-wrapper">
      <img src="~@/assets/astro.jpg" />
      <div class="login-container">
        <a-form
          style="width: 100%"
          :model="form"
          :rules="rules"
          v-bind="modalFormLayout"
          @finish="onSubmit"
        >
          <a-form-item  :wrapper-col="{ span: 18, offset: 6 }" class="f-mb0">
            <h3 class="logo-row"><img src="~@/assets/astro.jpg" class="logo" />数据工厂</h3>
          </a-form-item>
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="form.password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item  :wrapper-col="{ span: 18, offset: 6 }">
            <a-button html-type="submit" type="primary" block>
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>

</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~@/assets/bg.jpg');
}
.login-wrapper {
  width: 50%;
  display: flex;
  justify-content: center;
  img {
    max-width: 50%;
  }
}
.login-container {
  min-width: 50%;
  padding: 0 60px;
  // height: 435px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.img-container {
  width: 30%;
  border-radius: 50%;

}
.logo-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 60px;
  margin-right: 30px;
}
</style>
