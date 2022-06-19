<template>
    <div id="app">
      <div class="box1"></div>
      <div class="box2"></div>
        <!-- <nav>
          <router-link to="/havekeep">我</router-link> |
          <router-link to="/havekeep">币安行情</router-link>
        </nav> -->
        <!-- <el-switch  v-model="isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <keep-alive>
              <my-keep v-if="isShow"></my-keep>
        </keep-alive>
        <keep-alive exclude="nokeep">
              <my-nokeep v-if="isShow"></my-nokeep>
        </keep-alive> -->
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Add from './components/compo_add.vue'
import Sub from './components/compo_sub.vue'
import Keep from './components/havekeep.vue'
import NoKeep from './components/nokeep.vue'

export default {
  name: 'App',
  components: {
    'my-add': Add,
    'my-sub': Sub,
    'my-keep': Keep,
    'my-nokeep': NoKeep,
  },
  methods: {
  },
  data () {
    return {
      isShow: true,
    }
  }
}
</script>

<style  src = "./assets/css/main.css"
        lang="css" scoped>
</style>
<!-- 
<style>
.buttonGroup {
  display: grid;
  width: 600px;
}
.numGroup button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ccc;
  font-size: 30px;
  color: #ccc;
  background-color: #fff;
  outline: none;
  cursor: pointer;
}

.calculatorBTN button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ccc;
  font-size: 30px;
  color: #ccc;
  background-color: #fff;
  outline: none;
  cursor: pointer;
}
#controlBack {
  font-size: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
