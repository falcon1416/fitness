<template>
    <div>
        <van-nav-bar title="添加身体信息" left-arrow @click-left="onClickLeft">

        </van-nav-bar>


        <van-panel title="输入信息">
            <div>
                <van-cell-group>
                    <van-field v-model="input_data.height" type="number" label="身高" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.weight" type="number" label="体重" placeholder="单位（公斤)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.bust" type="number" label="胸围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.waistline" type="number" label="腰围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                        <van-field v-model="input_data.hip" type="number" label="臀围" placeholder="单位（厘米)" />
                    </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.shoulder" type="number" label="肩宽" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.left_upperarm" type="number" label="左上臂围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.right_upperarm" type="number" label="右上臂围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.left_thigh" type="number" label="左大腿围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.right_thigh" type="number" label="右大腿围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.left_calf" type="number" label="左小腿围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.right_calf" type="number" label="右小腿围" placeholder="单位（厘米)" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="input_data.create_time" label="测量时间" placeholder="yyyy-mm-dd" />
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
                uid: 0,

                input_data: {
                    height: '',
                    weight: '',
                    bust: '',
                    hip:'',
                    shoulder:'',
                    waistline: '',
                    left_upperarm: '',
                    right_upperarm: '',
                    left_thigh: '',
                    right_thigh: '',
                    left_calf: '',
                    right_calf: '',
                    create_time: ''
                }
            };
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onSave(){
                save(this);
            }
        },
        created() {
            this.uid = this.$route.query.uid;
        },
        mounted() {

        }
    }

    function save(self){
        self.$api.post("USER_ADD_BODY_URL", { uid: self.uid,data:self.input_data }, function (code, message, info) {
            if (code == 200) {
                self.$router.back();
            }
        });
    }
</script>