<template>
    <div>
        <van-nav-bar title="设置" />
        <van-cell-group>
            <van-cell v-on:click="onClick(1)" title="设置训练类型" is-link />
            <van-cell v-on:click="onClick(2)" title="设置训练动作" is-link />
            <van-cell v-on:click="onClick(3)" title="设置人员信息" is-link />
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        methods: {
            onClick:function(index){
                switch(index){
                    case 1:
                    this.$router.push({ path: "/set-type"});
                    break;
                    case 2:
                    this.$router.push({ path: "/set-motion"});
                    break;
                    case 3:
                    this.$router.push({ path: "/user-list"});
                    break;
                }
            }
        }
    }
</script>