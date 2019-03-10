import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
  load() {
    return JSON.parse(localStorage.getItem('vue_coin') || '[]')
  },
  save(data) {
    localStorage.setItem('vue_coin', JSON.stringify(data))
  }
}

function findIndex(data, symbol) {
  return data.findIndex(el => {
    return el.symbol === symbol
  })
}
export default new Vuex.Store({
  state: {
    cur_coin: 'All',
    coin_record: [
      {
        symbol: 'BTC',
        total: 4,
        records: [
          { date: '20190304', price: '4000', amount: '1' },
          { date: '20190304', price: '4000', amount: '1' },
          { date: '20190304', price: '4000', amount: '1' },
          { date: '20190304', price: '4000', amount: '1' }
        ]
      }
    ]
  },
  getters: {
    coin_pie(state) {
      let pie = {}
      pie.columns = ['symbol', 'total']
      pie.rows =
        state.coin_record.map(item => {
          return {
            symbol: item.symbol,
            total: item.total
          }
        }) || []
      return pie
    }
  },
  mutations: {
    SET(state, data) {
      state.coin_record = data
      LS.save(state.coin_record)
    },
    ADD_coin(state, symbol) {
      let i = findIndex(state.coin_record, symbol)
      if (i === -1)
        state.coin_record.push({
          symbol: symbol,
          total: 0,
          records: []
        })
      LS.save(state.coin_record)
    },
    DELETE_coin(state, symbol) {
      let i = findIndex(state.coin_record, symbol)
      state.coin_record.splice(i, 1)
      LS.save(state.coin_record)
    },
    ADD_record(state, { symbol, record }) {
      // data = {
      //   symbol: 'BTC',
      // total:0,
      //   record: { date: '20190304', price: '4000', amount: '1' }
      // }

      let i = findIndex(state.coin_record, symbol)
      state.coin_record[i].records.push(record)
      state.coin_record[i].records.sort((a, b) => a.date - b.date)

      state.coin_record[i].total += record.amount
      LS.save(state.coin_record)
    },
    UPDATE_record(state, { symbol, index, record, total }) {
      let i = findIndex(state.coin_record, symbol)
      state.coin_record[i].records[index].date = record.date
      state.coin_record[i].records[index].price = record.price
      state.coin_record[i].records[index].amount = record.amount
      state.coin_record[i].records.sort((a, b) => a.date - b.date)
      state.coin_record[i].total += total
      LS.save(state.coin_record)
    },
    DELETE_record(state, { symbol, index }) {
      let i = findIndex(state.coin_record, symbol)
      state.coin_record[i].records.splice(index, 1)
      LS.save(state.coin_record)
    }
  },
  actions: {
    INIT({ commit }) {
      commit('SET', LS.load())
    }
  }
})
