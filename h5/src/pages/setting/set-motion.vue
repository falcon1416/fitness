<template>
        <div>
            <van-nav-bar title="动作类型" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
                <van-icon name="add-o" slot="right" />
            </van-nav-bar>
    
            <van-loading v-if="list==null" style="margin:auto" type="gradient-circle" color="black" />
            <template v-else>
                <van-cell-swipe v-for="item in list" :key="item.id" :right-width="65">
                    <van-cell-group>
                        <van-cell  :title="item.title" />
                    </van-cell-group>
                    <span slot="right" v-on:click="onDel(item)">删除</span>
                </van-cell-swipe>
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
                    parent_id: 0,
                    list: null,
                };
            },
            methods: {
                onClickLeft() {
                    this.$router.back();
                },
                onClickRight() {
                    this.$router.push({ path: "/add-motion", query: { parent_id: this.parent_id, title: '添加动作' } });
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
            self.$api.post("DEL_SYS_MOTION_URL", { id: id }, function (code, message, info) {
                if (code == 200) {
                    //删除数据
                    delList(self, id);
                }
            });
        }
    
    
        function loadData(self) {
            self.$api.post("SYS_MOTION_URL", { parent_id: self.parent_id }, function (code, message, info) {
                if (code == 200) {
                    self.list = info;
                }
            });
        }
    </script>