const API = "https://api.github.com/users/";


const app=Vue.createApp({
    data(){
        return{
            search:null,
            result:null,
            error:null,
            favorites: new Map(),
            ifFavortie:false
            //inicializamos en nulo porque es 100% explicito y esto lo asociamos
            //a la directiva del input, asi tenemos la reactividad de un sentido
            // vista al modelo
        }
    },
    methods:{
        async  doSearch(){
            this.result=this.error=null
            try {
                const response= await fetch(API+this.search)

                if(!response.ok) throw new  Error ("User not found ")
                const data= await response.json()
                console.log(data)
                this.result=data
                
            } catch (error) {
                this.error=error
                
            }
            finally{
                this.search=null
            }
        
        },
        addFavorite(){
            this.favorites.set(this.result.id, this.result)
        },
        removeFavorite(){
            this.favorites.delete(this.result.id)
        }

    },
    computed:{
        isFavorite(){
            return this.favorites.has(this.result.id)
        }
    }

    
})