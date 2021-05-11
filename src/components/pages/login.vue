<template>
   <div class="w-full flex h-screen login-screen">
       <form class="w-1/3 m-auto flex flex-col align-center p-5 login-container" @submit="login">
            <p class="font-bold text-4xl text-white" >Login</p>
            <div class="block text-left my-3">
                <span class="uppercase text-sm  font-bold text-white">Email</span>
                <input class="w-full bg-gray-300 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email" placeholder="Email" v-model="email">
            </div>
            <div class="block text-left my-3">
                <span class="uppercase text-sm  font-bold text-white">Password</span>
                <input class="w-full bg-gray-300 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="password" placeholder="***********" v-model="password">
            </div>
            <div class="block my-3">
                <button class="bg-gray-300 rounded p-3 font-bold text-black" type="submit">login FFS!</button>
            </div>
       </form>
   </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login(e){
                e.preventDefault();
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(res =>{
                    console.log(res);
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
.login-screen{
    background-image: url('~@/assets/login-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .login-container {
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba(156, 158, 187, 0.37);
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
    }

}
</style>