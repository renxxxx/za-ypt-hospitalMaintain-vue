<template>
    <div id="adminView" v-if="isRouterAlive">
        <leftNav></leftNav>
        <keep-alive>
            <router-view ></router-view>
        </keep-alive>
    </div>
</template>
<script>
import leftNav from "./functionComponents/leftNav"
export default {
    name: 'outpatient',
     provide(){
        return{
            reload:this.reload
        }
    },
    data(){
        return{
            isRouterAlive:true,
        }
    },
    components:{
        leftNav
    },
    mounted(){},
    activated(){
    },
    methods:{
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true
            });
        }
    },
}
</script>
<style scoped>
#adminView{
    height: 100%;
    width: 100%;
    overflow: hidden;
    min-width: 1185px;
    /* overflow-y: scroll; */
}

</style>