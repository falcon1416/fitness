<template>
    <div>
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">

        </van-nav-bar>

        <van-panel :title="title">
            <div>
                <van-cell-group>
                    <van-field v-model="value" label="动作名称" placeholder="跑步/俯卧撑" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="desc" label="说明" placeholder="" />
                </van-cell-group>
                <br />
                <span style="font-size:14px;">设置动作类型</span>
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell v-for="(item, index) in list" :key="index">
                            <van-checkbox :name="item.id">{{ item.name }}</van-checkbox>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>
            <div slot="footer">
                <van-button v-on:click="onSave" size="small" type="danger">保存</van-button>
            </div>
        </van-panel>
    </div>


</template>

<script>
    import "@/assets/css/index.css"
    import bus from '../../components/Bus'

    export default {
        data() {
            return {
                value: '',
                desc: '',
                parent_id: 0,
                title: '',

                list: [],
                result: [],
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onSave() {
                if (this.value.length == 0) return;
                if (this.result.length == 0) return;

                saveData(this);
            }
        },
        created() {
            this.parent_id = this.$route.query.parent_id;
            this.title = this.$route.query.title;
        },
        mounted() {
            loadData(this);
        }
    }


    function loadData(self) {
        self.$api.post("SYS_TYPE_URL", { parent_id: -1 }, function (code, message, info) {
            if (code == 200) {
                self.list = info;
            }
        });
    }

    //添加事件
    function saveData(self) {
        self.$api.post(
            "ADD_SYS_MOTION_URL",
            { title: self.value, desc: self.desc, type: self.result.join(",") },
            function (code, message, info) {
                if (code == 200) {
                    //关闭界面

                    self.$router.back();
                }
            }
        );
    }
</script>