import {ref, reactive} from 'vue'
import {defineStore} from 'pinia'

export const mainStore = defineStore('main',()=> {
	const userinfo = reactive({
		username: "",
		password: "",
		uid: null
	})
	const logined = ref(false)
	
	function setUserInfo ({username, password, uid}){
		logined.value = true
		userinfo.username = username
		userinfo.password = password
		userinfo.uid = uid
		uni.setStorageSync("userinfo", JSON.stringify(userinfo))
	}
	
	const serverAddr = ref('http://localhost')
	function setServerAddr(s){
		if (!s.startsWith("http"))s = 'https://'+s
		if(!s.endsWith("/"))s = s + '/'
		serverAddr.value = s
		uni.setStorageSync("server_addr", s)
	}
	
	function initStore(){
		try{
			const serveRes=  uni.getStorageSync("server_addr")
			if (serveRes!=="")setServerAddr(serveRes)
		}catch(_){
			
		}
		try{
			const userinfoRes = uni.getStorageSync("userinfo")
			if(userinfoRes!==""){
				Object.assign(userinfo, JSON.parse(userinfoRes))
				logined.value = true
			}
		}catch(_){
			
		}
	}
	
	return {
		userinfo,
		logined,
		setUserInfo,
		serverAddr,
		setServerAddr,
		initStore
	}
})