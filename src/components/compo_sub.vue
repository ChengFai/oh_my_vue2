<template>
    <div>
        <h3>当前的count值为：{{count}}</h3>
        <button @click="subNum(1)"> -1 </button>
        <button @click="subNum(5)"> -5 </button>   
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex"
export default ({
    data() {
        return {
        }
    },
    computed: {
        ...mapState(["count"])
    },
    methods: {
        ...mapMutations(["reduceMethod"]),
        subNum(a) {
            this.reduceMethod(a);
            //this.$store.commit("reduceMethod", a);

            // this.$store.state.count -- ;
            //这种更改数据的方式不推荐？
            //vuex不推荐组件直接修改全局数据，建议使用mutation来修改数据
            //这样能让vuex监控数据的变化，便于维护
        }
    }
})
</script>
