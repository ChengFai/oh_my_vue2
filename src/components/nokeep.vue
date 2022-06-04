<template>
     <div>
        <hr>
          <el-input type="textarea" v-model="myText"></el-input>
          <h3>这是nokeep{{myText}}</h3>
     </div>
</template>


<script>

export default ({
    name: "nokeep",
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