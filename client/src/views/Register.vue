<template>
    <div>
        <h4>Register</h4>
        <form>
            <label for="email" >E-Mail Address</label>
            <div>
                <input id="username" type="username" v-model="username" required>
            </div>
            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
             <button type="submit" @click="register"> Register </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        data(){
            return {
                username : "",
                password : "",
            }
        },
       methods: {
         register() {
             axios
                 .post('http://localhost:5000/api/v1/auth/register',{
                 username:this.username,
                 password:this.password
            }).then(()=>{
                alert("Success")
                window.location.href = "/login"
            }) .catch(() => {
                alert("Username Already Taken Please try again")
                this.username="",
                this.password=""
                
            })
         }
       }
    }
</script>