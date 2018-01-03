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
	import bus from '../../components/Bus'
	export default {
		data() {
			return {
				value: '',
				parent_id: 0,

				modal:null,
			}
		},
		mounted() {
			listenEvent(this);
		},
		methods: {
			onSave: function () {
				if(this.value.length==0) return;

				saveData(this);
			}
		}
	}


	//监听事件
	function listenEvent(self) {
		bus.$on('set-type', function (data) {
			if(data){
				self.value='';
				
				self.parent_id=data.parent_id;
				self.modal=data.modal;
			}
		});
	}

	//添加事件
	function saveData(self){
		self.$api.post("ADD_SYS_TYPE_URL", {parent_id:self.parent_id,name:self.value}, function (code, message, info) {
			if (code == 200) {
				//关闭界面
				if(self.modal){
					self.modal.hide();
				}

				bus.$emit('close-set-type', { is_done:true });
			}
		});
	}
</script>