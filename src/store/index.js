import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    time: ''
  },
  getters: {
  },
  mutations: {
    addMethod(state, payload) {
    //   setTimeout(() => {
    //     state.count += payload
    // }, 1000);
    //千万不能通过这种方式设置延迟，因为这样会导致状态不一致
    //mutation里面不能写异步操作，请改用action
        state.count += payload
    },
    reduceMethod(state, payload) {
    //   setTimeout(() => {
    //     state.count -= payload
    // }, 1000);
      state.count -= payload
    }
  },
  actions: {
    //action专门用来处理异步任务
    //action里面也不能直接修改state，只有mutations里面可以
    asyncMethodSub(context, payload) {
      setTimeout(() => {
        context.commit('reduceMethod', payload)
      }, 1000);
    },
    asyncMethodAdd(context, payload) {
      setTimeout(() => {
        context.commit('addMethod', payload)
      }, 1000);
    }
  },
  modules: {
  }
})
