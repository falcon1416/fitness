<template>
	<div>
		<van-nav-bar title="用户信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<van-icon name="add-o" slot="right" />
		</van-nav-bar>

		<van-loading v-if="info==null" style="margin:auto" type="gradient-circle" color="black" />
		<van-cell-group v-else>
			<van-cell title="姓名" :label="info.realname"  />
			<van-cell title="身高" :label="info.height" />
			<van-cell title="体重" :label="info.weight" />
			<van-cell title="胸围" :label="info.bust" />
			<van-cell title="腰围" :label="info.waistline" />
			<van-cell title="左上臂围" :label="info.left_upperarm" />
			<van-cell title="右上臂围" :label="info.right_upperarm" />
			<van-cell title="左大腿围" :label="info.left_thigh" />
			<van-cell title="右大腿围" :label="info.right_thigh" />
			<van-cell title="左小腿围" :label="info.left_calf" />
			<van-cell title="右小腿围" :label="info.right_calf" />
			<van-cell title="测量时间" :label="info.create_time" />
		</van-cell-group>
	</div>
</template>


<script>
import { Dialog } from "vant";
import "@/assets/css/index.css";
import bus from "../../components/Bus";

export default {
  data() {
    return {
      uid: 0,
      info: null
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push({ path: "/user-add-body", query: { uid: this.uid } });
    }
  },
  created() {
    this.uid = this.$route.query.uid;
  },
  mounted() {
    loadData(this);
  }
};

function loadData(self) {
  self.$api.post("USER_INFO_URL", { uid: self.uid }, function(
    code,
    message,
    info
  ) {
    if (code == 200) {
		for(var key in info){
			info[key]=info[key]+"";
		}
      self.info = info;
    }
  });
}
</script>