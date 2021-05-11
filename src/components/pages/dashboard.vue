<template>
    <div class="w-full">
        <div class="w-full">
            <div class="flex p-3 justify-between">
                <h2 class="text-left font-bold">Projects</h2>
                <div class="font-bold hover:underline my-auto text-blue-400 cursor-pointer" @click="display = true"><i class="pi pi-plus mr-1"></i>add Project</div>
            </div>
            
            <draggable v-model="projects" group="people" @start="drag=true" @end="drag=false" class="flex w-full p-3">
                <div v-for="element in projects" :key="element.id" class="bg-gray-200 rounded flex-1 mr-2 cursor-grab">{{element.name}}</div>
            </draggable>
        </div>
        <Dialog class="w-2/3 m-auto" header="Add Project" :visible.sync="display" >
            <div class="form text-left flex flex-wrap">
                <div class="field py-2 w-full">
                    <label class="block font-bold mb-1" for="name">Name</label>
                    <InputText class="w-full" id="name" type="text" v-model="projectForm.name" />
                </div>
                 <div class="field py-2 w-full">
                    <label class="block font-bold mb-1" for="description">Discription</label>
                    <Textarea class="w-full" id="description" v-model="projectForm.discription" rows="5" cols="30" :autoResize="true" />
                </div>
                 <div class="field py-2 w-1/3 flex">
                    <Checkbox class="inline-block" id="web" v-model="projectForm.hasWeb" :binary="true" />
                    <label class="font-bold ml-2" for="web">Web</label>
                </div>
                <div class="field py-2 w-1/3 flex">
                    <Checkbox class="inline-block"  id="mobile" v-model="projectForm.hasMob" :binary="true" />
                    <label class="font-bold ml-2" for="mobile">Mobile</label>
                </div>
                <div class="field py-2 w-1/3 flex">
                    <Checkbox class="inline-block"  id="branding" v-model="projectForm.hasBranding" :binary="true" />
                    <label class="font-bold ml-2" for="branding">Branding</label>
                </div>
                <div class="field py-2 w-full">
                    <label class="block font-bold mb-5" for="description">Media</label>
                    <FileUpload class="inline-block" ref="file"  mode="basic" name="file"  :customUpload="true" @select="projectFormUpload" />
                    <p class="text-blue-900 inline-block ml-5 cursor-pointer" @click="clearFile" v-if="!!projectForm.media"><i class="pi pi-times"></i> Remove File</p>
                    <img :src="projectForm.media" v-if="projectForm.media">
                </div>
                <div class="w-full text-right">
                    <Button placeholder="Add Project" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import Dialog from 'primevue/dialog'; 
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import Checkbox from 'primevue/checkbox';
  import FileUpload from 'primevue/fileupload';
  import Button from 'primevue/button';



  import db from '../../firebaseDb';

    export default {
        components: {
            draggable,
            Dialog,
            InputText,
            Textarea,
            Checkbox,
            FileUpload,
            Button
        },
        async created(){
            this.resetProjectForm();
           db.collection('projects').doc('MAIN').get().then(res =>{
            //   this.projects = res.data();
            if (res.exists) {
                this.projects = res.data();
            } else {
                this.projects = [];
            }
          });
        },
        data(){
            return {
                display: false,
                projects: null,
                projectForm: {}
            };
        },
        methods: {
            addProject (){
               db.collection('projects').doc('MAIN').set(this.projects);
            },
            projectFormUpload(event){
                this.projectForm.media = event.files[0];
                console.log(this.projectForm.media);
            },
            clearFile(){
                this.projectForm.media = null; 
                this.$refs.file.clear();
            },
            resetProjectForm(){
                this.projectForm = {
                    'name': '',
                    'discription':'',
                    'hasWeb': false,
                    'hasMob': false,
                    'hasBranding': false,
                    'media': null
                };
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>