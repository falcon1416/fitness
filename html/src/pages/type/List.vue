<template>
	<div class="page has-navbar" v-nav="{title: '类型', showBackButton: false,showMenuButton:true,menuButtonText:menuButtonText,onMenuButtonClick:onAdd}">
		<div class="page-content">
			<list class="list-ios">
				<item>
					Item - 1
				</item>
				<item class="item item-icon-right">
					Item - 2
					<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
				</item>
				<item>
					Item - 3
				</item>
			</list>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menuButtonText: '<a class="button button-icon icon  ion-ios-plus-empty"></a>',
			}
		},
		methods: {
			onAdd:function(){
				alert("aaa");
			}
		}
	}
</script>