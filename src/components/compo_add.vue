<template>
    <div>
        <h3>当前的count值为：{{$store.state.count}}</h3>
        <h3>这是加一{{countPlus}}</h3>
        <h3>price: {{$store.getters.showPrice}}</h3>
        <button @click="add(8)">+8</button>
        <button @click="addPrice()">+price</button>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default ({
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["countPlus","showPrice"])
  },

  methods: {
    add (a) {
      this.$store.commit('addMethod', a)
    },
    addPrice() {
      this.$store.commit('addPrice', 1.00)
    }
    // showCount() {
    //     alert("通过Store.state来访问数据:"+ this.$store.state.count)
    // }
  }
})
</script>
