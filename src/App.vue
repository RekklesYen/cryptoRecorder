<template>
  <div id="app">
    <el-container>
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
            <el-col
              :span="12"
              :offset="6"
            >
              <el-row type="flex">
                <el-col
                  :span="4"
                  v-for="(coin,index) in coinTable"
                  :key="coin"
                >
                  <span
                    class="coin grid-content"
                    :class="{active:index===selected}"
                    @click="Select(index)"
                  >
                    {{coin}}
                    <el-button
                      :class="{active:index===selected}"
                      class="delete"
                      size="mini"
                      @click.stop="DeleteCoin(index)"
                      round
                      :disabled="coinTable.length===1"
                    >&times;</el-button>
                  </span>

                </el-col>
              </el-row>
            </el-col>

          </el-row>
          <!-- coin table -->

          <el-row type="flex">
            <el-col
              :span="3"
              :offset="6"
            >
              <el-input
                class="coinInput"
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
          <!-- add coin -->

          <el-row
            type="flex"
            :gutter="20"
          >
            <el-col
              :span="4"
              :offset="6"
            >
              <el-date-picker
                style="left:-20px;"
                v-model="date"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-col>

            <el-col :span="4">
              <el-input
                placeholder="請輸入成本價 EX:4000"
                v-model="price"
                clearable
              >
                <template slot="prepend">成本</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                placeholder="請輸入成本價 EX:1"
                v-model="amount"
                clearable
              >
                <template slot="prepend">數量</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                type="info"
                round
                @click="addRecord"
              >新增</el-button>
            </el-col>
          </el-row>
          <!-- add record -->

          <el-row type="flex">
            <el-col
              :span="12"
              :offset="6"
            >
              <el-table
                class="tb-edit"
                :data="recordTable"
                max-height="250"
                border
                highlight-current-row
                style="width: 100%"
                stripe
                @row-click="handleCurrentChange"
                show-summary
                :summary-method="getSummaries"
              >
                <el-table-column label="日期">
                  <template scope="scope">
                    <el-date-picker
                      v-model="dateEdit"
                      type="date"
                      placeholder="请输入日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyyMMdd"
                      @change="editHandler(scope.row,scope.$index)"
                      @blur="cancelHandler"
                    >
                    </el-date-picker>
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="價格">
                  <template scope="scope">
                    <el-input
                      size="small"
                      v-model="priceEdit"
                      placeholder="请输入價格"
                      @keyup.enter.native="editHandler(scope.row,scope.$index)"
                      @keyup.esc.native="cancelHandler"
                      @blur="cancelHandler"
                      autofocus
                    ></el-input>
                    <span>{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="數量">
                  <template scope="scope">
                    <el-input
                      size="small"
                      v-model="amountEdit"
                      placeholder="请输入數量"
                      @keyup.enter.native="editHandler(scope.row,scope.$index)"
                      @keyup.esc.native="cancelHandler"
                      @blur="cancelHandler"
                    ></el-input>
                    <span>{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="花費"
                  prop="cost"
                >
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!-- records table -->

          <el-row class="chart">
            <el-col
              :span="6"
              :offset="6"
            >
              <template>
                <ve-line :data="chartData"></ve-line>
              </template>
            </el-col>
            <el-col :span="6">
              <template>
                <ve-pie :data="pie_data"></ve-pie>
              </template>
            </el-col>
          </el-row>

        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      api: '',
      coins: ['ALL'],
      newCoin: '',
      selected: 0,
      price: '',
      amount: '',
      date: '',
      edit: null,
      dateEdit: null,
      priceEdit: null,
      amountEdit: null,
      avgPrice: null,
      totalAmount: null
    }
  },
  computed: {
    coinTable() {
      let coin = this.$store.state.coin_record.map(coin => coin.symbol)
      return [...this.coins, ...coin]
    },
    recordTable() {
      if (this.selected != 0)
        return this.$store.state.coin_record[this.selected - 1].records
      return []
    },
    pie_data() {
      return this.$store.getters['coin_pie']
    }
  },
  methods: {
    AddNewCoin() {
      if (!this.newCoin) return

      this.$store.commit('ADD_coin', this.newCoin.toUpperCase())
      this.newCoin = ''
    },
    DeleteCoin(i) {
      if (i !== 0) {
        if (confirm('Delete this coin?')) {
          this.selected = 0
          this.$store.commit('DELETE_coin', this.coinTable[i])
        }
      } else {
        if (confirm('Delete All coins?')) {
          this.selected = 0
          while (this.coinTable.length > 1)
            this.$store.commit(
              'DELETE_coin',
              this.coinTable[this.coinTable.length - 1]
            )
        }
      }
    },
    Select(i) {
      this.selected = i
    },
    addRecord() {
      if (this.price === '' || this.date === '' || this.amount === '') {
        alert('empty')
        return
      }
      if (isNaN(this.price) || isNaN(this.amount)) {
        alert('not number')
        this.price = ''
        this.amount = ''
        return
      }
      if (this.selected === 0) {
        alert('choose a coin to add record')
        return
      }
      let data = {
        symbol: this.coinTable[this.selected],
        record: {
          date: this.date,
          price: Number(this.price),
          amount: Number(this.amount),
          cost: (Number(this.price) * Number(this.amount)).toFixed(2)
        }
      }
      this.$store.commit('ADD_record', data)
      this.date = ''
      this.price = ''
      this.amount = ''
    },
    handleCurrentChange(row) {
      this.dateEdit = row.date
      this.priceEdit = row.price
      this.amountEdit = row.amount
    },
    editHandler(row, index) {
      let old = row.amount
      row.date = this.dateEdit
      row.price = this.priceEdit
      row.amount = this.amountEdit
      console.log(index)
      this.$store.commit('UPDATE_record', {
        symbol: this.coinTable[this.selected],
        index: index,
        total: row.amount - old,
        record: {
          date: row.date,
          price: Number(row.price),
          amount: Number(row.amount),
          cost: Number(row.price) * Number(row.amount)
        }
      })
      this.cancelHandler()
    },
    cancelHandler() {
      if (document.querySelector('.current-row'))
        document.querySelector('.current-row').classList.toggle('current-row')
    },
    getSummaries({ columns, data }) {
      const sums = []
      if (data.length === 0) return sums
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[0] = '總數量'
          sums[2] = '平均成本'
          return
        }
        if (column.label === '數量') {
          let amount = data.map(d => d.amount).reduce((a, c) => a + c)
          sums[1] = amount.toFixed(2)
          this.totalAmount = amount.toFixed(2)
          return
        }
      })
      let amount = 0,
        cost = 0
      data.forEach(d => {
        amount += d.amount
        cost += d.price * d.amount
      })
      cost /= amount
      sums[3] = cost
      return sums
    }
  },
  mounted() {
    this.$store.dispatch('INIT')
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #409eff;
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
  background-color: #e9e9eb;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.coin {
  background-color: #909399;
  color: white;
  text-align: center;
}
.coin > button {
  margin-left: 5px;
  border: none;
  background-color: #909399;
}
.coinInput {
  margin-left: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  padding: 20px;
  border-radius: 4px;
  min-height: 36px;
}
.coin {
  cursor: pointer;
}
.active {
  background-color: #91ee63 !important;
}
.el-table__header {
  line-height: 40px;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
.chart {
  margin-top: 20px;
}
</style>
