<template>
    <div class="listenlist">
        
        <div>
            <h2>listenlist</h2>
            <p>listenlist {{listenlater.length}} listening will take {{listenlater.length*1}} hours</p>
        </div>
        <div class="listenlist" v-for="(f,index) in listenlater" :key="f.episode_id">
            <h4>{{f.title}}</h4>
            <p @click="remove(index)">Remove</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class listenlist extends Vue {
    @Prop() listenlater: Lp[]
    remove(i:number){
        this.$emit('listitemclicked', i)
    }
}
</script>

<style scoped>
.listenlist {
    display: flex;
    flex-direction: column;
    width:25vw; padding:10px; margin-right:1vw;
    background-color:rgba(255,255,255,0.5);
    box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
}

.watchitem {
    background-color:white;
    width:90%;
    padding:10px; margin:5px auto;
    cursor:pointer;
}
</style>