<template>
  <div class="container">
    <div class="row card-panel">
      <div id="chart" class="col s12"></div>
    </div>
  </div>
</template>

<script>
//import * as d3 from 'd3'
import '../../node_modules/billboard.js/dist/billboard.css'
import { bb , d3 } from 'billboard.js'
import _ from 'lodash'

const graphCache = 30;
const graphSize = 10;

export default {
  data (){
    return {
      chart : {},
      temperatureData : _.range(10).map(x=>0)
    }
  },
  mounted (){
    this.chart = bb.generate({
      bindto: '#chart',
      data: {
        columns : [
          ['temperature', ...this.temperatureData],
        ],
      },
      size : {
        height : 600
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
        if(this.temperatureData.length < graphCache){ return }
        this.temperatureData = this.temperatureData.slice(graphSize)
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
</style>
