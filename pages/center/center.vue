<template>
	<view class="un-login" v-if="!store.logined">
		<navigator url="/pages/login/login" style="background-color: #ff5500">登录</navigator>
		<navigator url="/pages/register/register">注册</navigator>
	</view>
	<view class="logined" v-else>
		<h2>用户信息</h2>
		<view class="row">
			<h4>id:</h4>{{store.userinfo.uid}}
		</view><view class="row">
			<h4>用户名:</h4>{{store.userinfo.username}}
		</view><view class="row">
			<h4>密&nbsp;&nbsp;&nbsp;码:</h4>{{'*'.repeat(store.userinfo.password.length)}}
		</view>
	</view>
	<view class="item-container">
		<view class="label">服务器</view>
		<view class="content">
			<input type="text" v-model="currentServerAddr">
			<input type="button" value="重置" @click="currentServerAddr=''">
			<input type="button" value="修改" @click="onModify()">
			<input type="button" value="测试连接" @click="onTest()">
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,onActivated
	} from 'vue'
	import {
		mainStore
	} from '@/store/index.js'
	import {testServerAddr} from '@/request/index.js'
	const currentServerAddr = ref('')
	const store = mainStore()
	onMounted(() => {
		currentServerAddr.value = store.serverAddr
	})
	onActivated(() => {
		currentServerAddr.value = store.serverAddr
	})
	// 确认修改
	const onModify = ()=>{
		store.setServerAddr(currentServerAddr.value)
		uni.showToast({
			title: '修改成功',
			icon:"success"
		});
	}
	// 测试服务器
	const onTest =async ()=>{
		console.log(currentServerAddr.value);
		if (!currentServerAddr.value.startsWith("http"))currentServerAddr.value = 'https://'+currentServerAddr.value
		if(!currentServerAddr.value.endsWith("/"))currentServerAddr.value = currentServerAddr.value + '/'
		const res = await testServerAddr(currentServerAddr.value)
		if(res.code===200){uni.showToast({
			title: '服务器正常',
			icon:"success"
		});}else{
			uni.showToast({
				title: '连接失败',
				icon:"error"
			});
		}
	}
</script>

<style lang="scss">
	.un-login {
		display: flex;
		justify-content: space-around;

		navigator {
			margin: 5vw;
			padding: 3vw 10vw;
			border: 1px solid #000;
			border-radius: 2vw;
		}
	}

	.item-container {
		padding: 2vw;
		border: 1px solid #000;
	
	.content {
			display: flex;
			input {
				border: 1px solid #000;
				border-radius: 2vw;
				margin: 0 1vw;
				padding: 1vh;
			}
		}
	}
	.logined{
		margin: 2vh 35vw;
		.row{
			display: flex;
			h4{
				margin-right: 2vw;
			}
		}
	}
</style>
