<template>
     <div id="navigation">
        <div @click='goToShow("goToShow")' ></div>
            <div>
                <button @click="editShow">New Lp </button>

                 <div v-if="editClick"> 
                <form @submit="newLp">
                    <label>
                    Title:
                    <input type="text" v-model="lpNew.title"/>
                    </label>
                    <label>
                    Artist:
                <input type="text" v-model="lpNew.artist"/>
                    </label>
                <label>
                    Genre:
                    <input type="text" v-model="lpNew.genre"/>
                    </label>
                    <button type="submit">Submit</button>

                </form>
                </div>
            </div>


        <div @click='goToPage("goToPage")' class="button">Artiesten</div>
        
        <div id="divider"></div>
        <div class="button" @click='setGrid("card")'>Grid</div>
        <div class="button" @click='setGrid("list")'>List</div>
   
    </div>
    

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";


@Component
export default class Navigation extends Vue {
    editClick: boolean = false;
    data() {
        return {
            lpNew: {
                title: '',
                artist: '',
                genre: ''
            }
        }
    }     
    setGrid(s:string){
        this.$emit('setgrid', s)
        
    }
        gedrukt: boolean = false;

 goToPage(s:string){
     this.$emit('goToPage',s)

 }
 editShow(){
        this.editClick = !this.editClick

 }
  newLp(data:object) {
        // $emit event en stuur id en data van het form door naar app.vue
        // this.$emit('')
        //Variable veranderen tip = boolean
         
            //Variable veranderen tip = boolean
            console.log("1")
            this.$emit('newLp', this.$data.lpNew)
    
  }
}


</script>

<style scoped>

#navigation {
    background-color:#95BED8;
    margin-bottom:10px;
    font-size:1.2em;
    display: flex;
    align-items: stretch;
    justify-content: center;
}
#navigation div {
    padding:10px;
}
.button {
    cursor: pointer;
}
.button:hover {
    background-color: white;
    color:darkslategrey;
}
#divider {
    flex:1 1 auto;
    cursor: default;
}
.disabled {
    pointer-events: none;
    opacity: 0.4;
}
</style>
