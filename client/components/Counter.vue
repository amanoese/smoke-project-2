<template>
  <div class="counter-wrapper">
    <div id="chart"></div>
    <button @click="$store.commit('INCREMENT')">Increment</button>
    <button @click="$store.commit('DECREMENT')">Decrement</button>
    <button @click="$store.dispatch('incrementAsync')">Increment Async</button>
    <button @click="$store.dispatch('autoIncrement')">Auto Increment</button>
    <button @click="$store.dispatch('autoIncrementStop')">Auto Increment Stop</button>
    <br> {{ connect }}
    <br> {{ hello }}
    <br> {{ temperature }}
    <div class="counter">
      {{ count }}
    </div>
  </div>
</template>

<script>
//import * as d3 from 'd3'
import '../../node_modules/billboard.js/dist/billboard.css'
import { bb , d3 } from 'billboard.js'

export default {
  data (){
    return {
      chart : {},
      temperatureData : []
    }
  },
  mounted (){
    this.chart = bb.generate({
      bindto: '#chart',
      data: {
        columns : [
          ['temperature'],
        ]
      }
    });
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    connect () {
      return this.$store.state.connect
    },
    hello () {
      return this.$store.state.hello
    },
    temperature () {
      console.log(this.$store.state.temperature)
      return this.$store.state.temperature
    },
    columns() {
      this.temperatureData = [...this.temperatureData.slice(-30),this.$store.state.temperature];
      return [
        ['temperature',...this.temperatureData]
      ];
    }
  },
  watch : {
    columns (columns){
      this.chart.load({ columns });
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
