<template>
    <div>
        <van-nav-bar title="训练类型" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="add-o" slot="right" />
        </van-nav-bar>

        <van-loading v-if="list==null" style="margin:auto" type="gradient-circle" color="black" />
        <template v-else>
            <van-cell-swipe v-for="item in list" :key="item.id" :right-width="65">
                <van-cell-group>
                    <van-cell v-on:click="onClick(item)" :title="item.name" is-link />
                </van-cell-group>
                <span slot="right" v-on:click="onDel(item)">删除</span>
            </van-cell-swipe>
        </template>



        <van-popup v-model="popup_show" position="bottom">
            <div style="height:300px; text-align:center;">
            <van-cell-group style="margin-top:50px;">
                <van-field v-model="add_type_name" label="训练类型" icon="clear" placeholder="有氧训练/力量训练/热身运动" required @click-icon="username = ''" />
            </van-cell-group>
            <van-button type="default" style="margin-top:30px;width:60%">保存</van-button>
            </div>
        </van-popup>
    </div>
</template>


<script>
    import { Dialog } from 'vant';
    import "@/assets/css/index.css"

    export default {
        data() {
            return {
                parent_id: 0,
                list: null,

                popup_show: false,
                add_type_name:'',
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClickRight() {
                this.popup_show=true;
            },
            onDel(item) {
                var self = this;
                Dialog.confirm({
                    title: '提示',
                    message: '确定要删除？'
                }).then(() => {
                    // on confirm
                    delData(self, item.id);
                }).catch(() => {
                    // on cancel
                });
            },
            onClick: function (item) {
                this.$router.push({ path: "/set-sub-type", query: { parent_id: item.id, title: item.name } });
            }
        },
        mounted() {
            loadData(this);
        }
    }

    //删除数据节点
    function delList(self, id) {
        for (var i = 0; i < self.list.length; i++) {
            var obj = self.list[i];
            if (obj.id == id) {
                //删除
                self.list.splice(i, 1);
                break;
            }
        }

        //强制刷新界面
        self.$forceUpdate();
    }

    //删除数据
    function delData(self, id) {
        self.$api.post("DEL_SYS_TYPE_URL", { id: id }, function (code, message, info) {
            if (code == 200) {
                //删除数据
                delList(self, id);
            }
        });
    }

    function loadData(self) {
        self.$api.post("SYS_TYPE_URL", { parent_id: self.parent_id }, function (code, message, info) {
            if (code == 200) {
                self.list = info;
            }
        });
    }
</script>