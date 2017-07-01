<template>
  <div class="counter-wrapper">
    <div class="container">
      <div class="col s3">temperature:{{ temperature }}</div>
    </div>
    <div class="container">
      <div id="chart" class="col s12"></div>
    </div>
    <button @click="$store.commit('INCREMENT')">Increment</button>
    <button @click="$store.commit('DECREMENT')">Decrement</button>
    <button @click="$store.dispatch('incrementAsync')">Increment Async</button>
    <button @click="$store.dispatch('autoIncrement')">Auto Increment</button>
    <button @click="$store.dispatch('autoIncrementStop')">Auto Increment Stop</button>
    <v-btn-link @click.native.prevent="$dialog('Toast!')">Toast!</v-btn-link>
    <br> {{ connect }}
    <br> {{ hello }}
    <br> 
    <div class="counter">
      {{ count }}
    </div>
  </div>
</template>

<script>
//import * as d3 from 'd3'
import '../../node_modules/billboard.js/dist/billboard.css'
import { bb , d3 } from 'billboard.js'
import _ from 'lodash'

export default {
  data (){
    return {
      chart : {},
      temperatureData : _.range(10).map(x=>0),
      dataSize : 0
    }
  },
  mounted (){
    this.chart = bb.generate({
      bindto: '#chart',
      data: {
        columns : [
          ['temperature', ...this.temperatureData],
        ],
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
      return this.$store.state.temperature
    },
    temps (){
      return this.$store.state.temps
    }
  },
  watch: {
    temps (data){
      console.log(data)
      this.temperatureData = [...this.temperatureData, ...data]

      this.chartUpdate(data,()=>{
        if(this.temperatureData.length < 30){ return }
        this.temperatureData = this.temperatureData.slice(-10)
        this.chartClean(this.temperatureData)
      })
    }
  },
  methods: {
    chartUpdate (data, callback = _.noop ){

      this.chart.flow({
        columns: [
          ['temperature', ...data]
        ],
        length : data.length,
        done : callback
      })
    },
    chartClean (data){
      this.chart.load({
        columns: [
          ['temperature', ...data]
        ]
      })
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
