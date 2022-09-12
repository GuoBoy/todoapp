import {
	mainStore
} from '@/store/index.js'

// 获取所有待办
export const getAllToDoItem = () => {
	const store = mainStore()
	const baseUrl = store.serverAddr
	return new Promise((resolve, reject) => {
		if (!store.logined) {
			reject()
			return
		}
		uni.request({
			url: baseUrl + 'todo/' + store.userinfo.uid,
			method: 'GET',
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '更新失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}

// 添加待办
export const addToDoItem = (data) => {
	const store = mainStore()
	const baseUrl = store.serverAddr
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + 'todo',
			method: 'POST',
			data: data,
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '添加失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}

// 删除待办
export const delToDoItem = (id) => {
	const store = mainStore()
	const baseUrl = store.serverAddr
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + 'todo/' + id,
			method: 'DELETE',
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '删除失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}

// 登录
export const loginAcc = (data) => {
	const store = mainStore()
	const baseUrl = store.serverAddr
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + 'login',
			method: 'POST',
			data: data,
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '登录失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}

// 注册
export const registerAcc = (data) => {
	const store = mainStore()
	const baseUrl = store.serverAddr
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + 'register',
			method: 'POST',
			data: data,
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '注册失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}

// 测试连接
export const testServerAddr = (addr) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: addr,
			method: 'GET',
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '连接失败',
					icon: 'error'
				});
				reject(err)
			}
		});
	})
}
