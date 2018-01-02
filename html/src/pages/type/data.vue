<template>
	<div class="page has-navbar" v-nav="{title: '类型', showBackButton: false,showMenuButton:true,menuButtonText:menuButtonText,onMenuButtonClick:onShowPopup}">
		<div class="page-content">
			<!--数据列表-->
			<list class="list-ios">
				<item v-for="item in list" :key="item.id" class="item item-icon-right" @click.native="is_del==0 && isClick==true?onListClick(item):''">
					{{item.name}}

					<template v-if="isClick==true">
						<i v-if="is_del==0" class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
					</template>
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
				parent_id: 0,

				modal: null,

				is_del: 0
			};
		},
		props: ["isClick"],
		methods: {
			onAdd: function () {
				this.modal.show();
				bus.$emit("type-list", { parent_id: this.parent_id, modal: this.modal });
			},
			onDel: function (item) {
				//删除
				delData(this, item.id);
			},
			onListClick: function (item) {
				//点击
				this.$router.push({ path: "/sub-list", query: { parent_id: item.id } });
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
			if (this.$route.query.parent_id) {
				this.parent_id = this.$route.query.parent_id;
			}

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
		self.$api.post("SYS_TYPE_URL", { parent_id: self.parent_id }, function (code, message, info) {
			if (code == 200) {
				self.list = info;
			}
		});
	}

	//删除数据
	function delData(self, id) {
		self.$api.post("DEL_SYS_TYPE_URL", { id: id }, function (code, message, info) {
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
		bus.$on("close-type-list", function (data) {
			if (data) {
				if (data.is_done == true) {
					//刷新数据
					loadData(self);
				}
			}
		});
	}
</script>