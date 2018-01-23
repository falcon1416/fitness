<template>
    <div>
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">

        </van-nav-bar>

        <van-panel :title="title">
            <div>
                <van-cell-group>
                    <van-field v-model="value" label="类型名称" placeholder="力量训练/有氧训练/热身训练" />
                </van-cell-group>
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
                parent_id: 0,
                title: '',
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onSave(){
                if(this.value.length==0) return;

                saveData(this);
            }
        },
        created() {
            this.parent_id = this.$route.query.parent_id;
            this.title = this.$route.query.title;
        },
        mounted() {

        }
    }


    //添加事件
    function saveData(self) {
        self.$api.post("ADD_SYS_TYPE_URL", { parent_id: self.parent_id, name: self.value }, function (code, message, info) {
            if (code == 200) {
                bus.$emit('close-add-type', { is_refresh: true });

                self.$router.back();
            }
        });
    }
</script>