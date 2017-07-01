<template>
  <nav class="top-nav">
    <div class="container">
      <div class="nav-wrapper row">
      <div class="col s3">smoke-project-2</div>
      <div class="col offset-s7 s2 right-align">{{ $store.state.temperature | fixed }}℃ </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  filters : {
    fixed (value){
      return value.toFixed(1)
    }
  }
}
</script>
