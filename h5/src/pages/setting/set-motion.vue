<template>
    <div>
        <van-nav-bar title="标题" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    </div>
</template>

<script>
    export default {
        methods: {
            onClickLeft() {
                 
            },
            onClickRight() {
                 
            }
        },
        mounted() {
			loadData(this);
		}
    }

    function loadData(self) {
		self.$api.post("SYS_TYPE_URL", { parent_id: self.parent_id }, function (code, message, info) {
			if (code == 200) {
				self.list = info;
			}
		});
	}
</script>