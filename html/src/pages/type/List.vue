<template>
	<div class="page has-navbar" v-nav="{title: '类型', showBackButton: false,showMenuButton:true,menuButtonText:menuButtonText,onMenuButtonClick:onAdd}">
		<div class="page-content">
			<!--数据列表-->
			<list class="list-ios">
				<item v-for="item in list" :key="item.id" class="item item-icon-right">
					{{item.name}}
					<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
				</item>
			</list>
		</div>
	</div>
</template>

<script>
	import addModel from "./add.vue";

	export default {
		data() {
			return {
				menuButtonText:
					'<a class="button button-icon icon  ion-ios-plus-empty"></a>',
				list: [],
				parent_id: 0,

				modal:null,
			};
		},
		methods: {
			onAdd: function () {
				this.modal.show();
			}
		},
		created() {
			loadData(this);
		},
		mounted() {
			addModel.parent_id="11";
			console.log(addModel)
			console.log(addModel.data)
			$modal.fromComponent(addModel, {
				title: "添加类型",
				theme: "default",
			})
			.then(modal => {
				
				this.modal = modal;
			});
		}
	};

	function loadData(self) {
		self.$api.post("SYS_TYPE_URL", {}, function (code, message, info) {
			if (code == 200) {
				self.list = info;
			}
		});
	}
</script>