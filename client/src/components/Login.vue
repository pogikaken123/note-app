<template>
    <div>
        <h4 v-if="IsAuthenticated">Login</h4>
        <form v-if="IsAuthenticated">
            <label for="username" >Username</label>
            <div>
                <input id="username" type="username" v-model="username" required autofocus>
            </div>
            <div>
                <label for="password" >Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click.prevent="userLogin">
                    Login
                </button>
            </div>
        </form>
        <div v-if="IsAuthenticated==false" >
        <h1 > Welcome {{username}} </h1>
        <div>
        <form>
             <label for="Title" >Note Title</label>
            <div>
                <input id="Title" type="Title" v-model="title" required autofocus>
            </div>
            <div>
                <label for="password" >Note Description</label>
                <div>
                    <input id="description" type="textarea" v-model="description" required>
                </div>
            </div>
                <div><input type="checkbox" id="checkbox" v-model="isCompleted"> </div>
                <label for="checkbox">isCompleted: {{ isCompleted }}</label>
                <div> 
                    <button class="button2" @click.prevent="addNotes"> Add new notes</button>
                </div>  
         </form>
        </div>
        <button @click="viewAllNotes"> View all notes </button>
        <button @click="completedNotes"> Pending notes </button>
        <button @click="notCompletedNotes"> Completed Notes</button>
        <ul v-if="isNotShow">
            <h3 v-for="notes in data.data.data" :key="notes._id"> Notes Description:{{notes.description}} || Completed:{{notes.isCompleted}} 
                <button class="remove" @click="deleteNotes(notes._id)"> X </button> 
                <button class="button1" @click="reverseMark(notes)"> Mark Complete/Incomplete </button> 
                 <button @click="form(notes._id)"> Edit </button> 
                 
                </h3>
             </ul>
                <div v-if="completed"> 
                    <ul  v-for="notes in data.data.data" :key="notes._id" >
                    <h1  v-if="!notes.isCompleted" > {{notes.description}}:{{notes.isCompleted}} 
                        <button class="remove" @click="deleteNotes(notes._id)"> X </button>
                        <button class="button1" @click="reverseMark(notes)"> Mark Complete/Incomplete </button> 
                         <button @click="form(notes._id)"> Edit </button> 
                     </h1>
                </ul>
             </div>
              <div v-if="note">
                  <ul  v-for="notes in data.data.data" :key="notes._id" >
                    <h1  v-if="notes.isCompleted" > {{notes.description}}:{{notes.isCompleted}} 
                        <button class="remove" @click="deleteNotes(notes._id)"> X </button>
                        <button class="button1" @click="reverseMark(notes)"> Mark Complete/Incomplete </button> 
                         <button @click="form(notes._id)"> Edit </button> 
                     </h1>

                </ul> 
              </div>
                <div v-if="editBol"> 
             <form>
             <label for="Title" >Note Title</label>
            <div>
                <input id="Title" type="Title" v-model="title" required autofocus>
            </div>
            <div>
                <label for="password" >Note Description</label>
                <div>
                    <input id="description" type="textarea" v-model="description" required>
                </div>
            </div>
                <div><input type="checkbox" id="checkbox" v-model="isCompleted"> </div>
                <label for="checkbox">isCompleted: {{ isCompleted }}</label>
                <div> 
                    <button class="button2" @click.prevent="addNotes">Update notes</button>
                </div>  
         </form> 
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return {
                username : "",
                password : "",
                message:"",
                token:"",
                IsAuthenticated:true,
                isNotShow:false,
                completed:false,
                data:"",
                title:"",
                description:"",
                isCompleted:false,
                note:false,
                editBol:false,
                id:''
                
            }
        },
        methods : {
            form(id){
                this.editBol=!this.editBol
                console.log(id)
                this.id=id
            },
            updateForms() {
                axios
            .put('http://localhost:5000/api/v1/notes/'+this.id,{
                title:this.title,
                description:this.description,
                isCompleted:this.isCompleted
            }, {headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }}
             ).then(()=> {
                 this.viewAllNotes()
                 alert('Update Success')
             })
             .catch(()=> {
                 alert('error')
             })
            },
            userLogin() {
                axios
                 .post('http://localhost:5000/api/v1/auth/login',{
                 username:this.username,
                 password:this.password
            }).then(response=>{
                this.token=response.data.token
                this.message=response;
                this.IsAuthenticated=false;
            }) .catch(() => {
                
                alert("Invalid Credentials please try again")
                this.username="",
                this.password=""
                
            })
         },

         viewAllNotes() {
             axios.get('http://localhost:5000/api/v1/notes', {
             headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }
           }) .then(response=> {
               this.data=response,
               this.completed=false
               this.note=false,
               this.isNotShow=!this.isNotShow
           })
         },

         completedNotes() {
             axios.get('http://localhost:5000/api/v1/notes', {
             headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }
           }) .then(response=> {
               this.data=response,
               this.isNotShow=false,
               this.note=false,
               this.completed=!this.completed
           })
         },
            notCompletedNotes() {
             axios.get('http://localhost:5000/api/v1/notes', {
             headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }
           }) .then(response=> {
               this.data=response,
               this.isNotShow=false,
               this.completed=false,
               this.note=!this.note
           })
         },

         deleteNotes(id) {
             axios
            .delete('http://localhost:5000/api/v1/notes/'+id,{
            headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }
            })
            .then(response => {
                console.log(response)
                alert("Successful Delete")
                this.viewAllNotes()
            });
         },

        addNotes() {
         axios
        .post('http://localhost:5000/api/v1/notes',{ 
                title:this.title,
                description:this.description,
                isCompleted:this.isCompleted

             }, {headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }}).then(()=> {
                alert('Successfully added')
            this.title="",
            this.description="",
            this.isCompleted=false
            this.viewAllNotes()
         }).catch(()=> {
             alert('Please fill up the field')
         })
       
   },
     reverseMark(notes) {
              axios
            .put('http://localhost:5000/api/v1/notes/'+notes._id,{
                isCompleted:!notes.isCompleted
            }, {headers: {
             Authorization: 'Bearer ' + this.token //the token is a variable which holds the token
             }}
             ).then(()=> {
                 this.viewAllNotes()
                 alert('Success')
             })
             .catch(()=> {
                 alert('error')
             })
         }
   


    },
}
</script>

<style scoped>

.remove {
    background-color: red;
    text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}
.remove:hover {
    background-color: lightcoral
}
.button1 {
 
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button1:hover {background-color: #3e8e41}

.button1:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

button {
	display: inline-block;
  margin: 0;
  padding: 0.75rem 1rem;
	border: 0;
	border-radius: 0.317rem;
	background-color: #aaa;
	color: #fff;
	text-decoration: none;
	font-weight: 700;
	font-size: 1rem;
  line-height: 1.5;
	font-family: "Helvetica Neue", Arial, sans-serif;
	cursor: pointer;
	-webkit-appearance: none;
	-webkit-font-smoothing: antialiased;
}

button:hover {
	opacity: 0.85;
}

</style>