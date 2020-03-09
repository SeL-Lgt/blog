<template>
  <div id="Home">
    <!--  头部  -->
    <div id="Header" :style="{backgroundImage:'url(' + bg + ')'}">
      <el-row style="padding:20px;margin: 0px" type="flex" justify="end">
        <el-col :span="1">
          <el-button type="text" @click.native="sunOrNight=!sunOrNight,SunOrNight()">
            <i v-show="sunOrNight==true" class="el-icon-sunny"></i>
            <i v-show="sunOrNight==false" class="el-icon-moon"></i>
          </el-button>
        </el-col>
        <el-col :span="2" id="menuBtn">
          <el-button icon="el-icon-s-fold" @click="drawerShow =!drawerShow">MENU</el-button>
        </el-col>
      </el-row>

      <el-row class="Header-title">
        <p>你</p>
        <p style="font-size: 5vh">Li</p>
        <p>说</p>
      </el-row>

      <el-row style="font-size:10vh;color: white;text-align: center">
        <p class="el-icon-arrow-down"></p>
      </el-row>
    </div>
    <router-view></router-view>
    <!--  资料卡  -->
    <el-drawer :visible.sync="drawerShow" direction="ltr" size="16%" :withHeader="false">
      <div class="drawerCard">
        <el-menu>
          <el-row class="mydata">
            <el-row>
              <el-avatar :size="100" :src="mydata.face" fit="contain"></el-avatar>
            </el-row>
            <el-row>
              <p>{{mydata.name}}</p>
            </el-row>
            <el-row>
              <span>{{mydata.autograph}}</span>
            </el-row>
          </el-row>
          <el-divider></el-divider>

          <el-row class="Menu">
            <p class="drawerCardTitle">导航</p>
            <el-menu-item v-for="(router,i) in routers" :key="i" :index="i.toString()">
              <i :class="router.icon"></i>
              <span>{{router.name}}</span>
            </el-menu-item>
          </el-row>
          <el-divider></el-divider>

          <el-row class="Menu">
            <p class="drawerCardTitle">文章</p>
            <el-menu-item v-for="(assembly,i) in assemblys" :key="i" :index="(4+i).toString()">
              <i :class="assembly.icon"></i>
              <span>{{assembly.name}}</span>
            </el-menu-item>
          </el-row>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    import face from "@/assets/images/face.jpg";
    import Night from "@/assets/images/Night.jpg";
    import Morning from "@/assets/images/Morning.jpg"

    export default {
        name: "App.vue",
        data() {
            return {
                sunOrNight: false,//0为Morning，1为Night,
                drawerShow: false,//抽屉显示
                mydata: {
                    face: face,
                    name: "狼通大大",
                    autograph: "暂不开放",
                },
                routers: [
                    {
                        name: "首页",
                        icon: "el-icon-s-home",
                        url: ""
                    }, {
                        name: "git",
                        icon: "el-icon-upload",
                        url: ""
                    }, {
                        name: "随便逛逛",
                        icon: "el-icon-position",
                        url: ""
                    }, {
                        name: "友情链接",
                        icon: "el-icon-s-promotion",
                        url: ""
                    }],
                assemblys: [
                    {
                        name: "Java",
                        icon: "el-icon-s-home",
                        url: ""
                    }, {
                        name: "JS",
                        icon: "el-icon-s-home",
                        url: ""
                    }, {
                        name: "vue",
                        icon: "el-icon-s-home",
                        url: ""
                    }, {
                        name: "docker",
                        icon: "el-icon-s-home",
                        url: ""
                    }, {
                        name: "Linux",
                        icon: "el-icon-s-home",
                        url: ""
                    }],
                bg: Night
            }
        },
        created() {

        },
        methods: {
            SunOrNight() {
                if (this.sunOrNight)
                    this.bg=Night;
                else
                    this.bg=Morning
            }
        }
    }
</script>

<style scoped>

  #Header {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
  }

  #Header >>> .el-button {
    background: #FFF0;
    color: white;
  }

  #Header >>> .el-button:hover {
    color: #409EFF;
  }

  #menuBtn >>> .el-button {
    background: #FFF0;
    color: white;
  }

  #menuBtn >>> .el-button:hover,
  #menuBtn >>> .el-button:focus {
    border-color: #409EFF;
    color: #409EFF;
  }

  #Header >>> .el-icon-moon,
  #Header >>> .el-icon-sunny {
    font-size: 30px;
    transform: translate(0, -20%);
  }

  /*标题*/
  .Header-title {
    text-align: center;
    color: white;
    font-family: HYSWSS;
    text-shadow: 3px 3px 4px #000;
    font-size: 25vh;
  }

  .drawerCard {
    margin-top: 25px;
  }

  .mydata {
    text-align: center;
  }

  .drawerCardTitle {
    padding: 0 20px;
    margin-bottom: 10px;
  }

  .Menu >>> .el-menu-item {
    padding: 0 40px !important;
  }

</style>
