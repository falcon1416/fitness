<template>
    <div>
        <van-nav-bar title="人员" left-arrow @click-left="onClickLeft">
        </van-nav-bar>

        <van-loading v-if="list==null" style="margin:auto" type="gradient-circle" color="black" />
        <template v-else>
            <van-cell-group v-for="item in list" :key="item.uid">
                <van-cell v-on:click="onClick(item)" :title="item.realname" is-link />
            </van-cell-group>
        </template>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import "@/assets/css/index.css"
    import bus from '../../components/Bus'

    export default {
        data() {
            return {
                list: null,
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClick: function (item) {
                this.$router.push({ path: "/user-info", query: { uid: item.uid} });
            }
        },
        mounted() {
            listenEvent(this);

            loadData(this);
        }
    }

    function listenEvent(self) {
        bus.$on("close-add-type", function (data) {
            if (data) {
                if (data.is_refresh == true) {
                    //刷新数据
                    loadData(self);
                }
            }
        });
    }

    function loadData(self) {
        self.$api.post("USER_LIST_URL", {}, function (code, message, info) {
            if (code == 200) {
                self.list = info;
            }
        });
    }
</script>