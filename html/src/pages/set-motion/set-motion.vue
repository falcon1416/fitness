<template>
	<div class="page has-navbar" v-nav="{title: '动作', showBackButton: true,showMenuButton:true,menuButtonText:menuButtonText,onMenuButtonClick:onShowPopup}">
		<div class="page-content">
			<!--数据列表-->
			<list class="list-ios">
				<item v-for="item in list" :key="item.id" class="item item-icon-right" >
					{{item.title}}

					<i v-if="is_del==0" class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
					<i v-if="is_del==1" class="icon ion-close-circled" style="color:crimson;" @click="onDel(item)"></i>
				</item>
			</list>
		</div>
	</div>
</template>

<script>
	import addModel from "./add.vue";
	import bus from "../../components/Bus";

	export default {
		data() {
			return {
				menuButtonText: '<a class="button button-icon icon  ion-ios-more"></a>',
				list: [],
				modal: null,

				is_del: 0
			};
		},
		methods: {
			onAdd: function () {
				this.modal.show();
				bus.$emit("set-motion", {modal: this.modal });
			},
			onDel: function (item) {
				//删除
				delData(this, item.id);
			},
			//显示弹框
			onShowPopup() {
				var self = this;
				$actionSheet.show({
					// 支持三种主题样式 ios/android/weixin
					theme: "ios",
					title: "",
					buttons: {
						// 操作列表选项文字及回调函数
						添加: () => {
							self.onAdd();
						},
						删除: () => {
							self.is_del = 1;
						}
					}
				});
			}
		},
		created() {
			listenEvent(this);
			loadData(this);
		},
		mounted() {
			$modal
				.fromComponent(addModel, {
					title: "添加类型",
					theme: "default"
				})
				.then(modal => {
					this.modal = modal;
				});
		}
	};

	function loadData(self) {
		self.$api.post("SYS_MOTION_URL", { parent_id: self.parent_id }, function (code, message, info) {
			if (code == 200) {
				self.list = info;
			}
		});
	}

	//删除数据
	function delData(self, id) {
		self.$api.post("DEL_SYS_MOTION_URL", { id: id }, function (code, message, info) {
			if (code == 200) {
				//删除数据
				delList(self, id);
				self.is_del=0;
			}
		});
	}

	//删除数据节点
	function delList(self, id) {
		for (var i = 0; i < self.list.length; i++) {
			var obj = self.list[i];
			if (obj.id == id) {
				//删除
				self.list.splice(i, 1);
				break;
			}
		}

		//强制刷新界面
		self.$forceUpdate();
	}

	//监听事件
	function listenEvent(self) {
		bus.$on("close-set-motion", function (data) {
			if (data) {
				if (data.is_done == true) {
					//刷新数据
					loadData(self);
				}
			}
		});
	}
</script>