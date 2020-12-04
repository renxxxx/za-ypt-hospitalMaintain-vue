<template>
    <div id="adminView" v-if="isRouterAlive">
        <leftNav></leftNav>
            <div class="right scrollStyle ">
                <transition :name="$store.state.common.transitionName">
                    <keep-alive>
                        <router-view class="routreView"></router-view>
                    </keep-alive>
                </transition>
            </div>
        
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
    mounted(){
        this.$store.state.common.hospitalAboutData = JSON.parse(localStorage.getItem('hospital'))
        if(!this.$store.state.common.account){
            this.$common.checkLogin(this.$route.query.account)
        }
    },
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
    display: flex;
    justify-content: space-between;
    /* min-width: 1185px; */
    /* overflow-y: scroll; */
}
.right{
    background: rgba(240, 242, 245, 1);
    width: calc(100% - 200px);
    height: 100%;
    /* float: left; */
    overflow-y: hidden;
    overflow-x: scroll;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'DINPro' !important;
}
.routreView{
    position: absolute;
    width:  calc(100% - 200px)!important;
    transition: all 0.6s ease;
}
.slide-bottom-enter,.slide-top-leave-active{
    opacity :0;
    -webkit-transform:  translate(0,-100%);
    transform:  translate(0,-100%);
}
        
.slide-bottom-leave-active,.slide-top-enter{
    opacity: 0;
    background: red;
    -webkit-transform:  translate(0,100%);
    transform:  translate(0,100%);

}
</style>