<template>
  <div class="counter-wrapper">
    <div id="chart"></div>
    <div class="counter">
      {{ count }}
    </div>
    <button @click="$store.commit('INCREMENT')">Increment</button>
    <button @click="$store.commit('DECREMENT')">Decrement</button>
    <button @click="$store.dispatch('incrementAsync')">Increment Async</button>
    <button @click="$store.dispatch('autoIncrement')">Auto Increment</button>
    <button @click="$store.dispatch('autoIncrementStop')">Auto Increment Stop</button>
  </div>
</template>

<script>
//import * as d3 from 'd3'
import '../../node_modules/billboard.js/dist/billboard.css'
import * as modules from 'billboard.js'
const { bb , d3 } = modules

export default {
  mounted (){
    console.log('mounted')
    console.log({bb})
    bb.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
.counter {
  margin: 100px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}
</style>
