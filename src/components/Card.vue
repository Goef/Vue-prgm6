<template>

    <div :class="display">
                
        <div :style="{backgroundImage:headerImage}"></div>

        <div>
            <h3>{{lp.title}}</h3>
            <button @click="clickFunctie">Details</button>
            <button @click="editShow">Aanpassen </button>
            <button @click="deleteItem">Delete </button>

            <div v-if="gedrukt">
                <p>{{lp.artist}}, {{lp.genre}}</p>
            
                <!-- delete knop -->
            </div>


            <div v-if="editClick"> 
                <form @submit="editLp">
                    <label>
                    Title:
                    <input type="text" v-model="newlp.title"/>
                    </label>
                    <label>
                    Artist:
                <input type="text" v-model="newlp.artist"/>
                    </label>
                <label>
                    Genre:
                    <input type="text" v-model="newlp.genre"/>
                    </label>
                    <button type="submit">Submit</button>

                </form>
            </div>
            
        </div>
        

        
    </div>
    
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import DataLoader from "../services/DataLoader"

@Component
export default class Card extends Vue {
    @Prop() lp: Lp
    @Prop() display: string
    headerImage:string = ""
    // je variable declaren (gedrukt)
    gedrukt: boolean = false;
    editClick: boolean = false;
    data() {
        return {
            newlp: {
                title: this.lp.title,
                artist: this.lp.artist,
                genre: this.lp.genre
            }
        }
    }     
    created(){
        DataLoader.loadImage(this.lp.title).then(gifurl => { 
            this.headerImage = `url('${gifurl}')`
        })
    }
    lpClicked(){
        this.$emit('lpclicked')
    }
    clickFunctie(){
        //Variable veranderen tip = boolean
        this.gedrukt = !this.gedrukt
        
    }
    editShow(){
        this.editClick = !this.editClick
        


    }
    editLp() {
        // $emit event en stuur id en data van het form door naar app.vue
        // this.$emit('')
        //Variable veranderen tip = boolean
         this.$emit('editLp', this.lp._id, this.$data.newlp)
    }   
    deleteItem() {
        // $emit event en stuur id en data van het form door naar app.vue
        // this.$emit('deleteItem')
        this.$emit("deleteItem", this.lp._id)

        
    }
    get shortIntro():string {
        return this.lp.title.substring(0,60) + "...<br>Add to listenlist"
    }
       ShowPostItem(){
        this.gedrukt = !this.gedrukt
    }

  
}
</script>

<style scoped>
.card {
    background-color:white;
    margin:2vw;
    width:20vw; height:400px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.4);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.card:hover {
	transform:scale(1.05);
	box-shadow: 0px 0px 45px rgba(0,0,0,0.8);
}
.card div:nth-child(1){
    background-color:slategray;
    background-size:cover;
    background-position: center;
    height:230px;
}

.card div:nth-child(2){
    padding:12px; 
    height:170px;
}

.list {
    background-color:white;
    display:flex;
    margin:2vw;
    width:80vw; height:200px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.4);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.list:hover {
	transform:scale(2.05,3);
	box-shadow: 0px 0px 45px rgba(0,0,0,0.8);
}
.list div:nth-child(1){
    background-color:slategray;
    background-size:cover;
    background-position: center;
    width:200px;
    height:200px;
}

.list div:nth-child(2){
    padding:12px; 
    height:200px;
}
.button {
    transform: (10px)
}
</style>