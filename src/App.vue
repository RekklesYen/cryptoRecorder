<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header height="">
          <!-- Header content -->
          <el-row
            type="flex"
            justify="space-around"
          >
            <el-col :span="6">
              <div>
                <el-input
                  placeholder="请输入内容"
                  v-model="api"
                >
                  <template slot="prepend">CMC API</template>
                </el-input>
              </div>
            </el-col>
          </el-row>

        </el-header>

        <el-main height="">
          <!-- Main content -->
          <el-row type="flex">
            <el-col :span="12">
              <el-row type="flex">
                <el-col
                  :span="4"
                  v-for="(coin,index) in coins"
                  :key="coin"
                >
                  <span class="coin grid-content">
                    {{coin}}
                    <el-button
                      size="mini"
                      @click="DeleteCoin(index)"
                      round
                    >&times;</el-button>
                  </span>

                </el-col>
              </el-row>

            </el-col>
            <el-col :span="4">
              <el-input
                v-model="newCoin"
                placeholder="Add a coin"
                @keyup.enter.native="AddNewCoin"
              >
                <template slot="append">
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="AddNewCoin"
                  ></el-button>
                </template>
              </el-input>
            </el-col>

          </el-row>

        </el-main>

        <el-footer height="">
          <!-- Footer content -->
          <div>footer</div>
        </el-footer>
      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      api: '',
      coins: ['BTC', 'ETH', 'XRP'],
      newCoin: ''
    }
  },
  methods: {
    AddNewCoin() {
      console.log(this.newCoin)
      this.coins.push(this.newCoin.toUpperCase())
      this.newCoin = ''
    },
    DeleteCoin(i) {
      this.coins.splice(i, 1)
    }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // margin-top: 60px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.coin {
  background-color: rgb(184, 186, 226);
  text-align: center;
}
.coin > button {
  margin-left: 5px;
  border: none;
  background-color: rgb(184, 186, 226);
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  padding: 20px;
  border-radius: 4px;
  min-height: 36px;
}

.coin:hover {
  cursor: pointer;
  background-color: rgb(92, 121, 199);
}
</style>
