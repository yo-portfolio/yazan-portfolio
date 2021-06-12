<template>
    <div class="flex flex-wrap form pt-10 px-20 text-left">
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
        <div class="field py-2 w-1/2">
            <label class="block font-bold mb-5" for="description">background</label>
            <input type="file" ref="fileBg" @change="projectFormUpload($event,'bg')"  accept="image/*"/>
            <p class="text-blue-900 inline-block ml-5 cursor-pointer" @click="clearFile('bg')" v-if="!!projectForm.background"><i class="pi pi-times"></i></p>
            <img class="max-h-48" :src="projectForm.background" v-if="projectForm.background">
        </div>
        <div class="field py-2 w-1/2">
            <label class="block font-bold mb-5" for="description">Logo</label>
            <input type="file" ref="fileLogo" @change="projectFormUpload($event,'logo')"  accept="image/*"/>
            <p class="text-blue-900 inline-block ml-5 cursor-pointer" @click="clearFile('logo')" v-if="!!projectForm.logo"><i class="pi pi-times"></i></p>
            <img class="max-h-48" :src="projectForm.logo" v-if="projectForm.logo">
        </div>
        <div class="flex flex-wrap w-full">
            <p class="w-full text-right mb-10"><span class="cursor-pointer"  @click="addComponent"><i class="pi pi-plus"></i> Add Component</span></p>
            <div class="field w-1/3" v-for="(item, index) in projectForm.detials" :key="index">
                <p class="font-bold text-center">Component #{{index + 1}}</p>
                <div class="border border-solid m-3 p-2">
                    <div class="mb-3">
                        <label class="mr-10">Type</label>
                        <Dropdown v-model="item.type" :options="componentTypes" optionLabel="name" placeholder="Select a Component" />
                    </div>
                    <div v-if="item.type && ['img_r', 'img_l','full_img'].indexOf(item.type.value) !== -1">
                        <div class="mb-3">
                            <label class="mr-10">image</label>
                            <input type="file" :id="'image_'+ index" @change="projectFormUpload($event,'logo')"  accept="image/*"/>
                        </div>
                        <div class="flex mb-3">
                            <label class="mr-10">Text</label>
                            <Textarea class="w-full" v-model="item.data.text" rows="5" cols="30" :autoResize="true" />
                        </div>
                    </div>
                    <div v-if="item.type && ['side_by_side'].indexOf(item.type.value) !== -1">
                        <div class="mb-3">
                            <label class="mr-10">image #1</label>
                            <input type="file" :id="'image_1_'+ index" @change="projectFormUpload($event,'logo')"  accept="image/*"/>
                        </div>
                        <div class="flex mb-3">
                            <label class="mr-10">Text #1</label>
                            <Textarea class="w-full" v-model="item.data.text1" rows="5" cols="30" :autoResize="true" />
                        </div>
                        <div class="mb-3">
                            <label class="mr-10">image #2</label>
                            <input type="file" :id="'image_1_'+ index" @change="projectFormUpload($event,'logo')"  accept="image/*"/>
                        </div>
                        <div class="flex mb-3">
                            <label class="mr-10">Text #2</label>
                            <Textarea class="w-full" v-model="item.data.text2" rows="5" cols="30" :autoResize="true" />
                        </div>
                    </div>
                    <div v-if="item.type && ['heading_sub', 'quote','heading'].indexOf(item.type.value) !== -1">
                        <div class="flex mb-3">
                            <label class="mr-10">{{item.type.value === 'quote' ?'Quote':'Heading'}}</label>
                            <InputText class="w-full" v-model="item.data.text1" />
                            
                            <!-- <Dropdown  :options="emojis" placeholder="Select a emoji"  v-if="item.type.value !== 'quote' ">
                                <template #option="slotProps">
                                    <div>
                                        <img :alt="slotProps.option" width="30px" :src="slotProps.option" />
                                    </div>
                                </template>
                            </Dropdown> -->
                        </div>
                        <div class="flex mb-3" v-if="item.type.value === 'heading_sub'">
                            <label class="mr-10">Sub Heading</label>
                            <InputText class="w-full" v-model="item.data.text1" />
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        
        <div class="w-full text-right">
            <Button :label="editMode? 'Update Project' :'Add Project'" @click="addProject" />
        </div>
        
    </div>
</template>

<script>
  import firebase from '../../firebaseDb';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import Checkbox from 'primevue/checkbox';
  import FileUpload from 'primevue/fileupload';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import emojis from '../emoji-array';
  import { v4 as uuidv4 } from 'uuid';

    export default {
        components: {
            InputText,
            Textarea,
            Checkbox,
            FileUpload,
            Button,
            Dropdown
        },
        data(){
            return {
                id: null,
                projects: null,
                projectForm: {},
                editMode: !!this.$route.params.id,
                emojis: [],
                componentTypes:[
                    {
                        name: 'Image Right',
                        value: 'img_r'
                    },
                    {
                        name: 'Image Left',
                        value: 'img_l'
                    },
                    {
                        name: 'Image Side by Side',
                        value: 'side_by_side'
                    },
                    {
                        name: 'full Image',
                        value: 'full_img'
                    },
                    {
                        name: 'Heading and sub-heading',
                        value: 'heading_sub'
                    },
                    {
                        name: 'Quote',
                        value: 'quote'
                    },
                    {
                        name: 'Heading',
                        value: 'heading'
                    },
                ]
            };
        },
        created(){
            this.resetProjectForm();
            this.getEmojis();
            this.id = this.editMode ? this.$route.params.id: uuidv4();
            if (this.editMode) {
                firebase.db.collection('projects').doc(this.id).get().then((res)=>{
                    if (res.exists) {
                        this.projectForm = res.data();

                    } else {
                        this.$router.push('/dashboard');
                    }
                });
            }
        },
        methods: {
            addProject (){
                if (this.projectFormValiator()) {
                    if (this.projectForm.background.file) {
                        this.uploadImage('bg');
                    }
                    if (this.projectForm.logo.file) {
                        this.uploadImage('logo');
                    }
                    const form = this.projectForm;
                    form.id= this.id;
                    firebase.db.collection('projects').doc(this.id).set(form).then(()=>{
                       if (!this.editMode) {
                        firebase.db.collection('order').doc('main').get().then(res =>{
                            let order;
                            if (res.exists) {
                                 order = res.data().order;
                            } else {
                                 order = [];
                            }
                            order.push(this.id);
                            firebase.db.collection('order').doc('main').set({order});

                            this.$router.push('/dashboard')
                        });
                       } else {
                           this.$router.push('/dashboard');
                       }
                        
                    },()=>{
                        console.log('error');
                    });

                }                
            },
            getEmojis(){
                for (let i = 1; i < 10; i++) {
                    firebase.storage.child(`memoji/emoji-${i}.svg`).getDownloadURL().then(res=>{
                        this.emojis.push(res);
                    });
                }
                
            },

            uploadImage(type, file){
                const meta = {
                    contentType:file.type
                }
                firebase.storage.child(`projects/${type}/${this.id}`).put(file, meta).then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                    if (type === 'bg') {
                        this.projectForm.background = url;
                    } else {
                         this.projectForm.logo = url;
                    }
                });
                
            },
            projectFormUpload(event, type){
                if (type === 'bg') { 
                    this.uploadImage(type, event.target.files[0]);
                } else {
                    this.uploadImage(type, event.target.files[0]);
                }
               
            },
            clearFile(type){
                if (type === 'bg') {
                    this.projectForm.background = null; 
                    this.$refs.fileBg.value = null
                } else {
                    this.projectForm.logo = null; 
                    this.$refs.fileLogo.value = null
                }                
            },
            addComponent(){
                this.projectForm.detials.push({
                    'type': null,
                    'data': {}
                });
            },
            resetProjectForm(){
                this.projectForm = {
                    'name': '',
                    'discription':'',
                    'hasWeb': false,
                    'hasMob': false,
                    'hasBranding': false,
                    'background': null,
                    'logo': null,
                    'detials': []
                };
            },
            projectFormValiator(){
                if (this.projectForm.name.length && this.projectForm.discription.length && this.projectForm.background && this.projectForm.logo) {
                    return true;
                } else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>