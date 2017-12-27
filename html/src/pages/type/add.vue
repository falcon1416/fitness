<template>
	<div class="page-content padding padding-top text-center">
		<von-input style="margin-top:20px;" type="text" v-model="value" placeholder="有氧训练/力量训练/热身运动" label="训练类型">
		</von-input>

		<md-button style="margin-top:20px;" class="button button-positive" @click.native="onSave()">
			保存
		</md-button>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				value: '',
				parent_id:0,
			}
		},
		methods: {
			onSave:function(){
				console.log(this);
			}
		}
	}
</script>