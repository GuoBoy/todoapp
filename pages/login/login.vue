<template>
	<view class="login-register-form">
		<input type="text" placeholder="输入账户" v-model="username">
		<input type="text" placeholder="输入密码" v-model="password" password>
		<button type="primary" @click="onLogin()">登录</button>
		<navigator url="/pages/register/register" >
			<button style="background-color: aqua;">注册</button>
		</navigator>
		<button @click="username='';password=''">重置</button>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {loginAcc} from '@/request/index.js'
	import {mainStore} from '@/store/index.js'
	const store = mainStore()
	const username = ref('')
	const password = ref('')
	const onLogin = async()=>{
		if(username.value==="" || password.value===""){
			uni.showToast({
				title: '请输入正确~',
				icon:"error"
			});
		}else{
			const res = await loginAcc({username:username.value, password:password.value})
			if(res.code===200){
				store.setUserInfo({username:username.value, password:password.value, uid:res.uid})
				uni.showToast({
					title: '登录成功',
					icon:"success"
				});
				setTimeout(()=>{
					uni.switchTab({
						url: "/pages/home/home"
					});
				}, 1000)
			}else{
				uni.showToast({
					title: res.msg,
					icon:"error"
				});
			}
		}
	}
</script>

<style lang="scss">
	.login-register-form{
		margin: 2vw;
		input{
			// background-color: #ff5500;
			border: 1px solid #000;
			border-radius: 3vw;
			padding: 2vw;
			margin: 2vw;
		}
		button{
			margin: 2vw;
		}
	}
</style>
