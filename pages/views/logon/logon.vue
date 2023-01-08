<template>
	<view class="detail">
		<view class="login_top">
		  <img class="login_top_img" src="../../../assets/images/login_top.png" alt="">
		  <img class="login_top_img_up" src="../../../assets/images/login_top_up.png" alt="">
		  <img class="login_heard" src="../../../assets/images/userheard.jpg" alt="">
		  <view class="login_name">易莱博(<span class="login_name_tap" @click="popupIf = true">点击切换</span>)</view>
		</view>
		<view class="login_bottom">
		  <view class="login_name">欢迎登陆</view>
		  <view class="user_input">
		    <u-input v-model="dynamicValidateForm.phone" placeholder="用户名">
		    </u-input>
		  </view>
		  <view class="user_input">
		    <u-input v-model="dynamicValidateForm.pass" placeholder="密码">
		    </u-input>
		  </view>
		  <view class="forget_pass">
		    <view class="forget_pass1" @click="goRegister">
		      注册账号
		    </view>
		    <view class="forget_pass1" @click="goforgot">
		      忘记密码?
		    </view>
		  </view>
		  <view class="login_btn" @click="getLogin">
		    登录
		  </view>
		</view>
		<view class="popup_choice" v-if="popupIf" >
		  <view class="choice_box">
		    <view class="tap_name">
		      <span>学校代码</span>
		      <u-input v-model="dynamicValidateForm.phone" placeholder="uib">
		      </u-input>
		    </view>
		    <view class="tab_button">
		      <view class="tab_button_left " @click="popupIf = false">取消</view>
		      <view class="tab_button_left border_left" >确定</view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	 import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			var cheackMobile = (rule, value, cb) => {
			  // 手机号一般最小以“13”开头
			  const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			  if (regMobile.test(value)) {
			    return cb()
			  }
			  cb(new Error('请输入合法的手机号!'))
			};
			var validatePass = (rule, value, cb) => {
			  if (value === '') {
			    cb(new Error('请输入密码'));
			  } else {
			    if (this.dynamicValidateForm.checkPass !== '') {
			      this.$refs.dynamicValidateForm.validateFiud('checkPass');
			    } else {
			      return cb()
			    }
			  }
			};
			var validatePass2 = (rule, value, cb) => {
			  if (value === '') {
			    cb(new Error('请再次输入密码'));
			  } else if (value !== this.dynamicValidateForm.pass) {
			    cb(new Error('两次输入密码不一致!'));
			  } else {
			    return cb()
			  }
			};
			return {
				
				  data: '',
				  dynamicValidateForm: {
				    phone: '',
				    code: '',
				    pass: '',
				    checkPass: ''
				  },
				  rules: {
				    email: [
				      {required: true, message: '请输入邮箱', trigger: 'blur'},
				      {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
				      ],
				    phone: [
				      {required: true, message: '请输入手机号', trigger: 'blur'},
				      {validator: cheackMobile, trigger: 'blur'}],
				    pass: [
				      {validator: validatePass, trigger: 'blur'}
				    ],
				    checkPass: [
				      {validator: validatePass2, trigger: 'blur'}
				    ],
				  },
				  ifCode: true,
				  register: false,
				  popupIf:false
			}
		},
		// 计算属性 类似于 data 概念
		computed: {
		  ...mapGetters([
		    'userPhone'
		  ])
		},
		methods: {
			...mapActions([
			  'setUserPhone',
			  'setUserId',
			  'setToken',
			  'setNickName',
			  'setUserImageUrl'
			]),
			goRegister(){
			  this.$router.push({
			    path: '/register'
			  })
			},
			goforgot(){
			  this.$router.push({
			    path: '/forgotPass'
			  })
			},
			getLogin(){
			  // this.setToken("res.data.token")
			  // this.$router.push('/user')
			  getLogin({
			    deviceId: "string",
			    password: this.dynamicValidateForm.pass,
			    phone: this.dynamicValidateForm.phone,
			    version: "string"
			  }).then((res)=>{
			    if(res.status===1011){
			      this.setToken(res.data.token)
			      this.$router.push('/user')
			    }
			  })
			},
			submitLogin() {
			  let userName = this.dynamicValidateForm.phone;
			  let password = this.dynamicValidateForm.pass;
			  console.log("danci ",userName,password)
			  if (userName === 'admin' && password === '123456') {
			    localStorage.setItem('token', '123');
			    this.$router.push({
			      path: '/home'
			    })
			  } else {
			    return
			  }
			
			}
		}
	}
</script>

<style lang="scss" scoped>
 @import "../../../assets/css/variable";
  @import "../../../assets/css/mixin";

  .detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    background-size: 100%, 100%;
    z-index: 999;

    .login_top {
      width: 100%;
      height: 300px;
      position: ruative;

      .login_top_img {
        width: 100%;
        height: 98%;
      }

      .login_top_img_up {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .login_heard {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        position: absolute;
        top: 65px;
        left: 50px;

      }

      .login_name {
        position: absolute;
        top: 188px;
        left: 50px;
        color: #ffffff;

        .login_name_tap {
          color: #0DDCD0;
        }
      }
    }

    .login_bottom {
      padding: 10px 10% 50px 10%;
      width: 80%;
      height: 300px;

      .login_name {
        margin-top: 10px;
        margin-bottom: 40px;
        font-size: 25px;
        line-height: 30px;
      }

      .user_input {
        margin-top: 30px;
        width: 95%;
        height: 70px;
        background: #F7F7FB;
        box-shadow: 0 4px 6px 0 rgba(89, 89, 89, 0.2000);
        border-radius: 5px;
        color: #666666;
        line-height: 70px;
        font-size: 22px;
        padding-left: 5%;

        ::v-deep .u-input__inner {
          padding: 0;
          margin: 0;
          height: 70px;
          line-height: 70px;
          @include font_size($font_medium);
          background: rgba(255, 255, 255, 0.01);
          border: none;
        }
      }

      .forget_pass {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        color: #666666;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        .forget_pass1 {
          height: 30px;
          line-height: 30px;
          margin-top: 15px;
          color: #666666;
          font-size: 18px;
        }
      }

      .login_btn {
        width: 100%;
        height: 70px;
        background: #0DDCD0;
        text-align: center;
        line-height: 70px;
        color: #ffffff;
        margin-top: 80px;
      }
    }

    .popup_choice {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);

      .choice_box {
        width: 90%;
        position: absolute;
        top: 40%;
        margin-left: 5%;
        background: #ffffff;
        border-radius: 5px;

        .tap_name {
          display: flex;
          font-size: 18px;
          /*width: 100%;*/
          align-items: center;
          padding: 5%;
          span {
            text-align: center;
            font-size: 18px;
            width: 120px;
            color: #666666;
          }

          ::v-deep .u-input__inner {
            padding-left: 10px;
            margin: 0;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            /*background: rgba(255, 255, 255, 0.01);*/
            /*border: none;*/
          }
        }
        .tab_button{
          width: 100%;
          height: 50px;
          border-top: 1px solid #cccccc;
          display: flex;
          .tab_button_left{
            width: 50%;
            text-align: center;
            line-height: 50px;
            color: #0DDCD0;;
          }
          .border_left{
            border-left: 1px solid #cccccc;
          }
        }
      }
    }


    .loginClose {
      position: absolute;
      left: 20px;
      top: 30px;
      font-size: 50px;
      color: #FFFFFF;
    }

    .registerInlet {
      position: absolute;
      right: 20px;
      top: 30px;
      font-size: 40px;
      color: #FFFFFF;
    }

    .detailBox {
      width: 100%;
      /*background: red;*/
      height: 750px;
      position: ruative;
      left: 0;
      top: 150px;
      /*background: rgba(255,255,255,0.6);*/
      h1 {
        width: 300px;
        height: 80px;
        line-height: 80px;
        font-size: 60px;
        color: #FFFFFF;
        margin-left: 40px;
      }

      .phoneBox {
        display: flex;
        justify-content: center;
        align-items: center;
        position: ruative;
        text-align: center;
        margin-top: 50px;
        width: 100%;
        /*padding: 0 50px 0 50px;*/
        ::v-deep .u-row {
          display: flex;
          text-align: center;
          align-items: center;
          width: 600px;
          height: 100px;
          line-height: 100px;
          background: rgba(255, 255, 255, 0.6);
          /*color: #000000;*/
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 20px 0 20px;
          margin-top: 20px;
        }

        .phonueft {
          height: 100px;
          line-height: 100px;
          /*width: 50px;*/
          @include font_size($font_medium);
          text-align: center;
          color: #000000;
        }

        ::v-deep .u-input {
          height: 100%;
          line-height: 100%;
          padding: 0;
        }

        ::v-deep input::-webkit-input-placeholder {
          color: #6d6c6c;
        }

        ::v-deep .u-input__inner {
          padding: 0;
          margin: 0;
          height: 80px;
          line-height: 80px;
          @include font_size($font_medium);
          background: rgba(255, 255, 255, 0.01);
          /*color: #000000;*/
          border: none;
        }

        ::v-deep .u-input__icon {
          font-size: 40px;
          margin-right: 20px;
          line-height: 90px;
        }

        ::v-deep .u-form-item__content {
          @include font_size($font_medium);
        }

        ::v-deep .u-form-item__error {
          @include font_size($font_medium);
          color: #fd2c2c;
        }
      }
    }

    .loginBottom {
      margin-top: 350px;
      /*position: absolute;*/
      /*bottom: 60px;*/
      /*left: 0;*/
      width: 100%;
      /*padding: 0 50px 0 50px;*/
      .loginTxt {
        width: 80%;
        margin-left: 10%;
        font-size: 25px;
        color: #cccccc;
        margin-top: 30px;
        text-align: center;
      }

      .accountsLogin {
        width: 50%;
        margin-left: 25%;
        font-size: 40px;
        color: #cccccc;
        text-align: center;
        margin-top: 15px;
      }

      .loginBtn {
        width: 80%;
        margin-left: 10%;
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        background: linear-gradient(to right, #eccc88, #cf98ec, #63c2f1);
        color: #000000;
        font-size: 40px;
        text-align: center;
      }
    }
  }
</style>
