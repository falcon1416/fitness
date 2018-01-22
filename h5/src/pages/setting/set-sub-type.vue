<template>
    <div>
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="wap-nav" slot="right" />
        </van-nav-bar>

        <van-loading v-if="list==null" style="margin:auto" type="gradient-circle" color="black" />
        <van-cell-group v-else>
            <van-cell v-for="item in list" :key="item.id" :title="item.name" />
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                parent_id: 0,
                title:'',
                list:null,
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClickRight() {

            },
        },
        created(){
            this.parent_id = this.$route.query.parent_id;
            this.title = this.$route.query.title;
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