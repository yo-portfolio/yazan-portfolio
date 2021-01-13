<template>
    <div>
        <!-- <draggable 
            v-model="myArray" 
            group="people" 
            @start="drag=true" 
            @end="drag=false" 
            item-key="id">
            <template #item="{element}">
                <div>{{element.name}}</div>
            </template>
        </draggable> -->
    </div>
</template>

<script>
  import draggable from 'vuedraggable';

    export default {
        components: {
            draggable,
        },
        data(){
            return {
                myArray: [
                    {name: 'test 1'},
                    {name: 'test 2'},
                    {name: 'test 3'},
                    {name: 'test 4'},
                    {name: 'test 5'},
                    {name: 'test 6'}
                ]
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>