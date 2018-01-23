<template>
    <div>
        <van-nav-bar title="用户信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="add-o" slot="right" />
        </van-nav-bar>

    </div>
</template>


<script>
    import { Dialog } from 'vant';
    import "@/assets/css/index.css"
    import bus from '../../components/Bus'

    export default {
        data() {
            return {
                uid: 0,
                info: null,
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClickRight() {
                this.$router.push({ path: "/user-add-body", query: { uid: this.uid } });
            },
        },
        created() {
            this.uid = this.$route.query.uid;
        },
        mounted() {
            loadData(this);
        }
    }

    function loadData(self) {
        self.$api.post("USER_INFO_URL", { uid: self.uid }, function (code, message, info) {
            if (code == 200) {
                self.info = info;
            }
        });
    }
</script>