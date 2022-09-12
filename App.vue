<script setup>
	import {ref} from 'vue'
	import {mainStore} from '@/store/index.js'
	const store = mainStore()
	// uni.setStorageSync("server_addr", "http://localhost:80")
	store.initStore()
	
</script>

<style>
	/*每个页面公共css */
</style>
