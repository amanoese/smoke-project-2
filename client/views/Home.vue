<template>
  <div class="page">
    <header-vue></header-vue>
    <counter></counter>
  </div>
</template>

<script>
import HeaderVue from 'components/Header'
import Counter from 'components/Counter'

export default {
  components: {
    HeaderVue,
    Counter
  }
}
</script>
