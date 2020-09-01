<template>
    <div id="adminView">
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
    data(){

    },
    components:{
        leftNav
    },
    mounted(){},
    activated(){},
    methods:{},
}
</script>
<style scoped>
#adminView{
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* min-width: 1100px; */
}

</style>