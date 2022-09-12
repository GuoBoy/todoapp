<template>
	<view class="main">
		<view class="add-todo">
			<navigator url="/pages/editor/editor" v-if="store.logined">添加待办</navigator>
			<navigator url="/pages/login/login" v-else>添加待办</navigator>
		</view>
		<view class="item" v-if="todoItems.length !== 0" v-for="item in todoItems" :key="item.id"
			@longpress="onDelItem(item.id)">
			<view class="item-info">
				<view class="detail">
					{{ item.detail }}
				</view>
				<view class="date-info">
					{{ item.update }}
				</view>
			</view>
		</view>
		<view class="no-item" v-else>
			<navigator url="/pages/editor/editor"  v-if="store.logined">还没有待办。点我添加吧！</navigator>
			<navigator url="/pages/login/login" v-else>还没有待办。点我添加吧！</navigator>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onActivated
	} from 'vue'
	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		getAllToDoItem,
		delToDoItem
	} from '@/request/index.js'

	import {
		mainStore
	} from '@/store/index.js'
	const store = mainStore()
	const todoItems = ref([])
	// 长按删除
	const onDelItem = async (id) => {
		const {
			cancel
		} = await uni.showModal({
			title: '提示',
			content: '确认要删除吗？',
			showCancel: true
		})
		if (cancel) {
			uni.showToast({
				title: '取消删除',
				icon: 'error'
			});
		} else {
			const res = await delToDoItem(id)
			if (res.code === 200) {
				todoItems.value = todoItems.value.filter(i => i.id !== id)
				uni.showToast({
					title: '删除成功',
					icon: 'success'
				})
			} else {
				uni.showModal({
					title: '删除失败',
					content: res.msg,
				})
			}
		}
	}
	// 刷新
	const refreshTodoTitem = async () => {
		try {
			const res = await getAllToDoItem()
			if (res && res.code === 200) {
				todoItems.value = res.data
				return
			}
			uni.showToast({
				title: '刷新失败',
				icon: 'error'
			})
		} catch (e) {
			uni.showToast({
				title: '刷新失败',
				icon: 'error'
			})
		}
	};
	// 下拉刷新
	onPullDownRefresh(() => {
		getAllToDoItem().then((res) => {
			uni.stopPullDownRefresh();
			if (res.code === 200) {
				todoItems.value = res.data
				return
			}
			uni.showToast({
				title: '刷新失败',
				icon: 'error'
			});
		}).catch(() => {
			uni.stopPullDownRefresh()
			uni.showToast({
				title: '刷新失败',
				icon: 'error'
			});
		})
	})
	onMounted(() => {
		refreshTodoTitem()
	})
	onActivated(() => {
		refreshTodoTitem()
	})
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;

		.add-todo {
			margin: 1vh;
			padding: 1vh;
			background-color: #ff5500;
			text-align: center;
		}

		.item {
			margin: 1vw;
			padding: 1vw;
			border: 1px solid #000;
			border-radius: 3vw;
			position: relative;

		}

		.no-item {
			text-align: center;
			margin: 5vh;
			font-size: 5vw;
			font-weight: bold;
		}
	}
</style>
