<template>
	<div class="page has-navbar" v-nav="{title: '设置', showBackButton: false,showMenuButton:false}">
		<div class="page-content">
			<!--数据列表-->
			<list class="list-ios">
				<item class="item item-icon-right" @click.native="onListClick(0)">
					设置训练类型
					<i  class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
				</item>
				<item class="item item-icon-right" @click.native="onListClick(1)">
					设置训练动作
					<i  class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
				</item>
			</list>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			onListClick:function(index){
				switch(index){
					case 0:
					this.$router.push({ path: "/set-type"});
					break;
					case 1:
					this.$router.push({ path: "/set-motion"});
					break;
				}
			}
		},
		created() {

		},
		mounted() {

		}
	};
</script>