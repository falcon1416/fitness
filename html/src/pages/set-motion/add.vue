<template>
	<div class="page-content padding padding-top text-center">
		<von-input style="margin-top:20px;" type="text" v-model="title" placeholder="原地高抬腿/击掌开合/俯卧撑" label="动作名称">
		</von-input>

		<von-input style="margin-top:20px;" type="text" v-model="desc" placeholder="" label="动作说明">
		</von-input>

		<div class="text-left">
			<div style="margin-top:20px;" class="item item-divider">
				动作类型:
			</div>
			<von-checkbox :options="show_list" v-model="chosen_list" theme="positive"></von-checkbox>
		</div>

		<md-button style="margin-top:20px;" class="button button-positive" @click.native="onSave()">
			保存
		</md-button>
	</div>
</template>


<script>
	import bus from "../../components/Bus";
	export default {
		data() {
			return {
				title: "",
				desc: "",

				list:[],
				show_list:[],
				chosen_list:[],

				modal: null
			};
		},
		created() {
			loadData(this);
		},
		mounted(){
			listenEvent(this);
		},
		methods: {
			onSave: function () {
				if (this.title.length == 0) return;
				if (this.chosen_list.length == 0) return;

				saveData(this);
			}
		}
	};

	//监听事件
	function listenEvent(self) {
		bus.$on('set-motion', function (data) {
			if(data){
				self.title='';
				self.desc="",

				self.chosen_list=[],
				
				self.modal=data.modal;
			}
		});
	}


	function loadData(self) {
		self.$api.post("SYS_TYPE_URL", { parent_id: -1 }, function (code, message, info) {
			if (code == 200) {
				self.list = info;
				for(var i=0;i<info.length;i++){
					self.show_list.push(info[i].name);
				}
			}
		});
	}

	//添加事件
	function saveData(self) {
		var list=[];
		for(var i=0;i<self.chosen_list.length;i++){
			var index=self.chosen_list[i];
			var obj=self.list[index];
			list.push(obj.id);
		}
		self.$api.post(
			"ADD_SYS_MOTION_URL",
			{ title: self.title, desc: self.desc ,type:list.join(",")},
			function (code, message, info) {
				if (code == 200) {
					//关闭界面
					if (self.modal) {
						console.log("关闭界面");
						self.modal.hide();
					}

					bus.$emit("close-set-motion", { is_done: true });
				}
			}
		);
	}
</script>