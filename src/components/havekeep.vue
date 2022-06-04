<template>
     <div>
          <el-input type="textarea" v-model="myText"></el-input>
          <h3>{{myText}}</h3>
     </div>
</template>

<script>

export default ({
    data() {
        return {
            myText: '',
        }
    },
    mounted() {
    },
    methods: {
    },
})
</script>