<template>
    <div>
        <h3>当前的count值为：{{$store.state.count}}</h3>
        <button> +1 </button>
        <button @click="showCount">
        click me to show count</button>
    </div>
</template>

<script>
export default ({
    data() {
        return {
        }
    },
    methods: {
        showCount() {
            alert("通过Store.state来访问数据:"+ this.$store.state.count)
        }
    }
})
</script>
