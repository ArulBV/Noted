<template>
  <Dashboard />
</template>

<script>
import M from 'materialize-css'
import Dashboard from '@/pages/Dashboard';
export default {
  name: 'App',
  components: {
    Dashboard
  },
  mounted() {
    M.AutoInit()
  }
}
</script>