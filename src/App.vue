<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    
    <h1>
      {{str}}
    </h1>
    <div class="buttonGroup" @click="clickHandler">
      <div class="numGroup">
        <button value="1">1</button>
        <button value="2">2</button>
        <button value="3">3</button>
        <button value="4">4</button>
        <button value="5">5</button>
        <button value="6">6</button>
        <button value="7">7</button>
        <button value="8">8</button>
        <button value="9">9</button>
        <button value="0">0</button>
        <button value=".">.</button>
        <button>=</button>
      </div>

      <div class="calculatorBTN">
        <button id="controlBack">回退</button>
        <button value="-">-</button>
        <button value="+">+</button>
        <button value="*">x</button>
        <button value="/">%</button>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {},
  methods: {
    clickHandler(e) {
      console.log(e)
      if(e.target.id === 'controlBack') {
        if(this.isShowResult)
        {
          return this.str = "";
        }
        else 
        {
          return this.str = this.str.slice(0, -1);
        }
      } else if(e.target.innerText == '=') {
        this.str = eval(this.str)
        this.isShowResult = true;
      } else {
        this.isShowResult = false;
        this.str += e.target.value;
      }
    }
  },
  data() {
    return {
      str: "",
      express: "",
      express_result: "",
      isShowResult: false,
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
