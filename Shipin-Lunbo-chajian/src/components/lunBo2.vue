<template>
    <div class="recommed">
        <slide :loop = 'loop' :autoPlay='autoPlay'>
            <div class="slider-item">11</div>
            <div class="slider-item">22</div>
            <div class="slider-item">33</div>
            <div class="slider-item">444</div>
            <div class="slider-item">555</div>
        </slide>
    </div>
</template>
<script>
    import Slide from './slide.vue'
    export default {
        name:'recommend',
        components:{
            Slide
        },
        data (){
            return {
                loop:true,
                autoPlay:true,
            }
        }
    }
</script>