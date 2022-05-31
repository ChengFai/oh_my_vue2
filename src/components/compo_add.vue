<template>
    <div>
        <h3>当前的count值为：{{$store.state.count}}</h3>
        <button @click="add(8)">+8</button>
        <button @click="add(1)">+1</button>
    </div>
</template>

<script>
export default ({
    data() {
        return {
        }
    },
    methods: {
        add(a) {
            this.$store.commit("addMethod", a);
        }
        // showCount() {
        //     alert("通过Store.state来访问数据:"+ this.$store.state.count)
        // }
    }
})
</script>
