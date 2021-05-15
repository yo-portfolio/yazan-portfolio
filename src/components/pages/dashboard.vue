<template>
    <div class="w-full">
        <div class="w-full">
            <div class="flex p-3 justify-between">
                <h2 class="text-left font-bold">Projects</h2>
                <router-link class="font-bold hover:underline my-auto text-blue-400 cursor-pointer" to="/project"><i class="pi pi-plus mr-1"></i>add Project</router-link>
            </div>
            
            <draggable v-model="projects" group="people"  @end="changeOrder" class="flex w-full p-3">
                <div v-for="project in projects" :key="project.name" class="bg-gray-200 rounded flex-1 mr-2 cursor-grab text-left p-3">
                    <div class="flex flex-wrap w-full justify-between">
                        <p class="font-bold mb-3 text-2xl text-black flex-1">{{project.name}}</p>
                        <div class="actions">
                            <p class="inline-block cursor-pointer mr-2" @click="editProject(project.id)"><i class="pi pi-pencil text-blue-500"></i> Edit</p>
                            <p class="inline-block cursor-pointer"  @click="deleteProject(project.id)"><i class="pi pi-times text-red-500"></i> Delete</p>
                        </div>
                        <div class="w-full m-auto">
                            <img  :src="project.background" class="max-h-32" :alt="project.name">
                        </div>
                    </div>
                    
                    
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable';

  import firebase from '../../firebaseDb';
    export default {
        components: {
            draggable,
        },
        data(){
            return {
                projects : []
            };
        },
         created(){
           firebase.db.collection('projects').get().then(res =>{
            //   this.projects = res.data();
                const unorderedProjects = [];

            res.forEach(item =>{
            if (item.exists) {
                unorderedProjects.push(item.data());
            } 
            });
            firebase.db.collection('order').doc('main').get().then(order => {
                let orderObj = [];
                if (order.exists) {
                     orderObj = order.data().order;
                }
                for (let i = 0; i < orderObj.length; i++) {
                    const elem = orderObj[i];
                    for (let x = 0; x < unorderedProjects.length; x++) {
                        const item = unorderedProjects[x];
                        if (item.id === elem) {
                            this.projects.push (item);
                        }
                    }
                }
            });
          });
        },
        methods:{
            changeOrder(){
                firebase.db.collection('order').doc('main').set({order: this.projects.map(item => item.id)})
            },
            editProject(id){
                this.$router.push('/project/'+id);
            },
            deleteProject(id){
                firebase.db.collection('projects').doc(id).delete().then(()=>{
                    this.projects = this.projects.filter(item => item.id !== id);
                    this.changeOrder();
                });
            },
        }
       
    }
</script>

<style lang="scss" scoped>

</style>