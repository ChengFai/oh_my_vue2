<template>
    <div>
        <h3>当前的count值为：{{count}}</h3>
        <button @click="subNum"> -1 </button>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default ({
    data() {
        return {
        }
    },
    computed: {
        ...mapState(["count"])
    },
    methods: {
        subNum() {
            // this.$store.state.count -- ;
            //这种更改数据的方式不推荐？
            //vuex不推荐组件直接修改全局数据，建议使用mutation来修改数据
        }
    }
})
</script>
