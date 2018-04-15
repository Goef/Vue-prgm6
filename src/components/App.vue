<template>
    <div>
        
        <navigation v-on:setgrid="setGrid" v-on:goToPage="goToPage" v-on:newLp="postLP"></navigation>
        
        <div class="columns">
            
            <div class="cards">
                <!-- Hier onder gebruik je v-on om de events van emit op te vangen zoals dit: v-on:event="functie()-->

                <card v-for="(f,index) in lps" :key="f.episode_id" :lp="f" :display="gridstyle" v-on:lpclicked="addToList(index)"
                 v-on:deleteItem="deleteLp" v-on:editLp="editLp"
                 ></card>
            </div>
            <div class="Navigation" v-on:newLp="postLP">
               
                </div>
            <listenlist v-if="listenlater.length > 0" :listenlater="listenlater" v-on:listitemclicked="removeFromList"></listenlist>
      
        </div>
     

    </div>
    
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import Card from "./Card.vue"
import Navigation from "./Navigation.vue"
import listenlist from "./listenlist.vue"
import DataLoader from "../services/DataLoader"

@Component({
    components: {Card, Navigation, listenlist}
})

export default class App extends Vue {
    lps: Lp[] = []
    listenlater :Lp[] = []
    gridstyle:string = "card"
    page:string = "goToShow"
    created(){
        this.loadData()
    }
    async loadData(){
        this.lps = (await DataLoader.loadJSON(`http://95.85.9.243:8001/api/lps`)).items
    }
    // Hier functie om post aan te roepen, bijna hetzelfde als hierboven. Je moet alleen ook het id meegeven van het item. en de data
    // Hier functie om put aan te roepen, zelfde als post
    async editLp(lpid:string, data:object){ 

        console.log(data)       
        await DataLoader.PutLp(`http://95.85.9.243:8001/api/lps/`+ lpid, data)
                console.log(data)
                location.reload()

    }
    // Hier functie om delete te doen, ook id meegeven verder niks
    async deleteLp(item:string){
    
        await DataLoader.delete(`http://95.85.9.243:8001/api/lps/` + item)
        location.reload()
        console.log(item)
    }

     async postLP(data:object){
             console.log("2")

        console.log("postData executed")
        await DataLoader.postlp(`http://95.85.9.243:8001/api/lps/`, data)
        location.reload()
         
     }

    addToList(i:number){
        this.listenlater.push(this.lps[i])
    }
    removeFromList(i:number){
        this.listenlater.splice(i,1)
    }
    setGrid(s:string){
        this.gridstyle = s
    }
    goToPage(s:string){
        this.page = s
    }
    
}

</script>

<style>
body {
    font-family: sans-serif;
    background: black;
    margin:0px; padding:0px;
}

html {
    min-height: 100%;
}

h1, h2, h3, h4 {
    margin-top:0px;
	font-family: 'Audiowide', cursive;
}

div {
    box-sizing: border-box;
}

.cards {
    width:100vw;
    display:flex;
    flex-wrap: wrap;  /*cards can go to the next line*/
}
.columns {
    display:flex;
}
</style>
