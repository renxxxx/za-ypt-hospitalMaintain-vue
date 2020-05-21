<template>
  <div class="login">
    <div data-v-10d9df09="" id="login" class="login">
      <div data-v-10d9df09="" class="logo smargin"><img data-v-10d9df09="" src="data:image/png;base64,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"
          alt="">
        <h2 data-v-10d9df09="">医品通忠安医疗器械有限公司</h2>
        <p style="font-size: 20px;">运维后台</p>
      </div>
      <div data-v-10d9df09="" class="number phone"><input  v-model="account" data-v-10d9df09="" type="text" class="name">
        <div data-v-10d9df09=""><img data-v-10d9df09="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAEM4U94AAAAAXNSR0IArs4c6QAAAs9JREFUSA2dlWlrFTEUhselarVSrUWtqL2gFbcPilpww/nrftAPriBSV5CKewVFi611fZ50zpiZube9+MI7Sd6cnOQkJ5miWMVYVXaLaaTNXRnlUqhlVTnWForxSgmLohcmlJPWN1bCjqq0WPQTHclKocL4pqhRnoPb4adMK8qskdczuShO24o5rmZd7fmSu2uZQapeyIQy6nUlBMrRfLnqs3AGboBboQux/Q7+hA2UtEYayr+Ga2psYXT9ikqrVE/OnDpHRHcXcQn24CH4EH6EnfP/gbYFuvZluAuKzvoPIob3ZNH6eHalWpzEUerXFQbgG7pLnGrHoP0RuA9+h0/gIqyRn8M21CvQGF5A130SOvg17KBE6SQGmnoPJkQMe2j9gWnrVrvq7w1qvWjFgAmEfsbaudU1YoCB7a7VZiVskhqNt7S8xAbexmWEhRDzXfqK6AVT+wK9ohehW38bJrTPwVn0GLrbO58sq0902DRvzlT6Z0rvwyhcgTdhA74lJdSgjfMInTwrEU2wQXCACZqSL3bGBBuE+3SYoGmA+2/urwV3LSEPOrQo3bEZaPKthQ90PoUmawf9JvDczsIxaD6+hB7Fb5jDJJmGh6F+zC5Dbbwj7Ql07g/A0qfrMRwGxzHaD3XuEdeTRKqiJfgAReYN69yB2rrvjtVHjfYE0a5XUFuuX4kx4SONaDRQ4iUxUw6s77O20DZud/hIne0zUPQ2mP2Ga+4+gl7cftiJeAJ6KYzgDlyCNfpNEJ1ev1PQN3MtrNA5B73PHbjKQTCv3UKfmUF2voZv4AI0pTvoF8FerAzbPnP/FfRBbIRO2ydgCpo1LsQJzKb3sEY+gUaz0IHu/T3Y93ait+Gt93Ia7TK8BdPFzEP3YD0sQ34QBpTDQGeOG4ETcLJqp9CoF/6mnF3DZ/B/8ZyB+tCXPusJ3F9/xfOw72GhDwPH6kNfblXxF3HJdhANzvxCAAAAAElFTkSuQmCC"
            alt=""> <span data-v-10d9df09="">用户名</span></div>
      </div>
      <div data-v-10d9df09="" class="number pwd" style="margin-top: 24px;"><input data-v-10d9df09="" autocomplete="off"
          type="text" onfocus="this.type='password'" v-model="password"  class="password">
        <div data-v-10d9df09=""><img data-v-10d9df09="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAFBKe5zAAAAAXNSR0IArs4c6QAAAllJREFUSA2llUlrVUEQha/GCcEQFWeDhocigi5UiAuV/utZiRtX4sohzuAQcUZJ8jxfv66m+o7vvhw4t6pr6Km6+1bVDKcllpI+r3hggfuTch9lVwziezFjYlowJcnVfUm5V3NYn9kckjaxjHrE1M9/XdEr4qeUFcVZ1wimZ8UMkisHUqM+q4/YQ3KuJYm44mfz0jkq7/D2qmsdu34dBAXxgvhbxHdJvCkeEr+IGVel3c6tpmKd5UrfUMzDZlxhOaLWsu0HnmOFu9lglCW/6h8yGJelM0VrI/+JlR+BtuGdFBbagG1faHjaDc8swdxs5TXxpPhXpGqxvpIRPoGtPS8ynQ/iYZHkg+KGOBUzVqWF3CoVzmDD1zCUOdUdtZlBPEzHJXdo9OCxfEw3JxQLa0nk1kZQB3hGPBUtAx8rHDft7UAslc+VpuyU3xCkvBKL24PTnyXaHvHseAN6XwIFbKArYbMRmQyjE9ilP+JE5HgMwg4f0vSupFi8viBed0bm1PaBa/BcbD0tbQNcVzCdA4q/KW6LbWALLosXk5NBniY9Cj8Arw5vOLYX4mtxDHgj10S25pHIyvKzR/XuisgnIhd6LL4p4afIPTknsvqpHQuuHs/LlvhZXBTk0gdbl68znR3lI/yaiT19+a2A2CcjeXBW5zqvPqlDj29kfYA3CubIdYHXDnydidZvcanqA7RmJOMtSf5I4LvIszkIK/JgoAJ8h17vzR0zAB0V/57enpNzzBaRsjFPpz6mPgBtbvReUPRpTwWXjDfohGi2RQdhG7dE3qSdRTuZO+8/2J9WmFCjr+4AAAAASUVORK5CYII="
            alt=""> <span data-v-10d9df09="">密码</span></div>
      </div>
      <div data-v-10d9df09="" class="zdlogin">
        <div data-v-10d9df09="" class="rt forgetpwd">修改密码</div>
      </div>
      <div data-v-10d9df09="" class="loginbtn"><button data-v-10d9df09="" @click="login()">登录</button></div>
      <div data-v-10d9df09="" class="zdlogin"></div>
      <div data-v-10d9df09="" id="updatePwdPad" style="display: none;">
        <div data-v-10d9df09="" class="number phone" style="margin-top: 50px;"><input data-v-10d9df09="" type="text"
            class="names">
          <div data-v-10d9df09=""><img data-v-10d9df09="" src="image/zhanghu.png" alt=""> <span data-v-10d9df09="">用户名</span></div>
        </div>
        <div data-v-10d9df09="" class="number oldpwd" style="margin-top: 24px;"><input data-v-10d9df09="" autocomplete="off"
            type="password" class="passwords">
          <div data-v-10d9df09=""><img data-v-10d9df09="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAFBKe5zAAAAAXNSR0IArs4c6QAAAllJREFUSA2llUlrVUEQha/GCcEQFWeDhocigi5UiAuV/utZiRtX4sohzuAQcUZJ8jxfv66m+o7vvhw4t6pr6Km6+1bVDKcllpI+r3hggfuTch9lVwziezFjYlowJcnVfUm5V3NYn9kckjaxjHrE1M9/XdEr4qeUFcVZ1wimZ8UMkisHUqM+q4/YQ3KuJYm44mfz0jkq7/D2qmsdu34dBAXxgvhbxHdJvCkeEr+IGVel3c6tpmKd5UrfUMzDZlxhOaLWsu0HnmOFu9lglCW/6h8yGJelM0VrI/+JlR+BtuGdFBbagG1faHjaDc8swdxs5TXxpPhXpGqxvpIRPoGtPS8ynQ/iYZHkg+KGOBUzVqWF3CoVzmDD1zCUOdUdtZlBPEzHJXdo9OCxfEw3JxQLa0nk1kZQB3hGPBUtAx8rHDft7UAslc+VpuyU3xCkvBKL24PTnyXaHvHseAN6XwIFbKArYbMRmQyjE9ilP+JE5HgMwg4f0vSupFi8viBed0bm1PaBa/BcbD0tbQNcVzCdA4q/KW6LbWALLosXk5NBniY9Cj8Arw5vOLYX4mtxDHgj10S25pHIyvKzR/XuisgnIhd6LL4p4afIPTknsvqpHQuuHs/LlvhZXBTk0gdbl68znR3lI/yaiT19+a2A2CcjeXBW5zqvPqlDj29kfYA3CubIdYHXDnydidZvcanqA7RmJOMtSf5I4LvIszkIK/JgoAJ8h17vzR0zAB0V/57enpNzzBaRsjFPpz6mPgBtbvReUPRpTwWXjDfohGi2RQdhG7dE3qSdRTuZO+8/2J9WmFCjr+4AAAAASUVORK5CYII="
              alt=""> <span data-v-10d9df09="">旧密码</span></div>
        </div>
        <div data-v-10d9df09="" class="number newpwd" style="margin-top: 24px;"><input data-v-10d9df09="" autocomplete="off"
            type="password" class="passwords1">
          <div data-v-10d9df09=""><img data-v-10d9df09="" src="image/mima.png" alt=""><span data-v-10d9df09="">新密码</span></div>
        </div>
        <div data-v-10d9df09="" class="pwdbtn" style="margin-top: 50px;"><button data-v-10d9df09="" >确认</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'login',
    data() {
      return {
        account:'',
        password:'',
        loginHospitalId:'1',
      }
    },
    methods:{
      // { loginHospitalId:queryStringObject.loginHospitalId,account: account, password: password },

      login() {
        this.$axios
          .post(
            '/hospital-maintain/login?',
            qs.stringify({
              loginHospitalId: this.loginHospitalId,
              account: this.account,
              password: this.password,
            })
          )
          .then(res => {
            if (res.data.code == 20) {

            } else if (res.data.code == 0) {
              //    			 this.$message.success('入驻申请已提交，请耐心等待审核')
                 			this.$router.push({path:'/index'});
            } else {
              this.$message.error(res.data.codeMsg);
            }
          })
          .catch();
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    padding: 0;
    margin: 0;
  }
 #login{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
        background: url(../assets/background.png);
        background-size: cover;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

  }
/*  body{
     width: 100%;
      height: 100%;
       background: url(../assets/background.png);
      background-size:cover ;
  	box-sizing: border-box;
  } */
  .logo{
     /* width: 380px; */
      /* height: 33px; */
      /* line-height: 33px; */
      text-align: center;
      padding-top: 200px;
      /* margin-bottom: 0.91rem; */
      margin: 0 auto 50px;
      /* vertical-align: middle; */
  }
  .logo img{
      /*width: 0.41rem;*/
      /*height: 0.33rem;*/
      width: 41px;
      height: 33px;
      display: inline-block;
      vertical-align: middle;
      margin-top: -10px;
      /* float: left; */
  }
  .logo h2{
      line-height: 33px;
      /*font-size: 0.33rem;*/
      font-size: 33px;
      font-family: PingFangSC-Regular;
      color: rgba(0,0,0,0.85);
      display: inline-block;
      margin: 0;
      /* float: right; */
  }
  .number{
     box-sizing: border-box;
      margin: 0 auto;
      /*width: 3.68rem;*/
      /*height: 0.4rem;*/
      width: 368px;
      height: 40px;
      border: 1px solid #d9d9d9;
      position: relative;
  }
  .number input{
      width: 100%;
      height: 100%;
      border: 0;
      outline: none;
      padding-left: 100px;
      padding-right: 10px;
      color: #000;
       box-sizing: border-box;
  }
  .number>div{
      width: 90px;
      height: 100%;
      position: absolute;
      top:0;
      line-height: 40px;
      color: rgba(0,0,0,0.25);
      box-sizing: border-box;
  }
  .number>div img{
      width: 16px;
      height: 16px;
      float: left;
      margin-top: 12px;
      margin-left:12px ;
      margin-right: 10px;
  }
  .zdlogin{
      width: 368px;
      height: 16px;
      margin: 27px auto;

      color: rgba(0,0,0,0.65);
      line-height: 16px;
  }
  .zdlogin div input{
      width: 16px;
      height: 16px;
      margin-right:10px ;
      margin-top: 0;
      border-radius: 2px;
      cursor: pointer;
  }
  .zdlogin span{
      display: inline-block;
      font-size: 14px;
  }
  .forgetpwd{
      color: #1890ff;
      font-size: 14px;
      cursor: pointer;
      float: right;
  }
  .loginbtn,.pwdbtn{
      width: 368px;
      height: 40px;
      margin: 0 auto;

      border-radius: 4px;
  }
  .loginbtn button,.pwdbtn button{
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: #1890ff;
      color: #fff;
      border: 0;
  }
  .registernow{
      color: #1890ff;
      cursor: pointer;
  }
</style>
