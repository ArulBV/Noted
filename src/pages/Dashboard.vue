<template>
	<Navbar />
	<Home />
</template>

<script>
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
export default {
	name: 'DashBoard',
	components: {
		Navbar,
		Home
	}
}
</script>

<style>
@import '@/assets/style.css'
</style>