<template>
    <div id="app">
        <!-- <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </nav> -->
        <hr>
        <h1>下面是我的组件，用来测试i18n和router</h1>
        <h2>宁选择的时间是{{0}}</h2>
        <nav>
            <router-link to="/home">首页</router-link> |
            <router-link to="/data">数据</router-link>
        </nav>

        <hr>

        <div id="app">
            <p>{{ $d(new Date(), 'short') }}</p>
            <p>{{ $d(new Date(), 'long', 'ja-JP') }}</p>
        </div>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Add from './components/compo_add.vue'
import Sub from './components/compo_sub.vue'

export default {
  name: 'App',
  components: {
    "my-add": Add,
    "my-sub": Sub
    },
  methods: {
  },
  data() {
    return {  
    }
  }
}
</script>


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
</style>
