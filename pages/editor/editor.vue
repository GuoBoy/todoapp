<template>
	<view class="title-bar">
		<view class="back-btn" @click="onBack()">
			&lt;
		</view>
		<view class="title">
			编辑待办{{edited?'*':''}}
		</view>
		<!-- 占位 -->
		<view></view>
	</view>
	<view class="container">
		<button type="primary" @click="onSave" style="width: 100%;">保存</button>
		<textarea id="editor-area" placeholder="输入待办" v-model="content" @input="edited=true"></textarea>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		addToDoItem
	} from '@/request/index.js'
	import {mainStore} from '@/store/index.js'
	const store = mainStore()
	const content = ref('')
	// 正在编辑
	const edited = ref(true)
	// 保存
	const onSave = async () => {
		if (content.value === "") return
		const res = await addToDoItem({
			detail: content.value,
			userid: store.userinfo.uid
		})
		if (res.code === 200) {
			edited.value = false
			uni.showToast({
				title: '保存成功'
			});
		} else {
			uni.showModal({
				title: '保存失败',
				content: res.msg
			})
		}
	}
	// 返回上级目录
	const onBack = async () => {
		if (edited.value && content.value !== "") {
			const {
				cancel
			} = uni.showModal({
				title: '提示',
				content: '退出前要保存吗？',
				showCancel: true
			});
			if (cancel) {
				uni.navigateBack()
			} else {
				const res = await addToDoItem({
					detail: content.value,
					userid: 4
				})
				if (res.code === 200) {
					uni.showToast({
						title: '保存成功'
					});
					edited.value = false
					uni.navigateBack();
				} else {
					uni.showModal({
						title: '保存失败',
						content: res.msg
					})
				}
			}
		} else {
			uni.navigateBack();
		}
	}
</script>

<style lang="scss" scoped>
	.title-bar {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 2.5vh;
		padding: 1vw;
		margin: 1vw;

		.back-btn {
			font-size: 3vh;
			margin-left: 2vw;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		margin: 1vw;

		#editor-area {
			background-color: #e6faff;
			width: auto;
			margin-top: 2vw;
			padding: 2vw;
		}
	}
</style>
