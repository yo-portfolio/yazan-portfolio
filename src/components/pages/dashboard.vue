<template>
    <div class="w-full">
        <div class="w-full flex">
            <div class="item w-16 h-16 rounded bg-white border" v-for=" (item, i) in items" :key="i">
                <button @click="movebackword(i)"> back </button>
                <button @click="moveForword(i)"> next</button>
                {{item.name}}
            </div>
        </div>
        <div class="w-30 h-30">dsfada</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                items: [
                    {
                        name: 'item 1'
                    },
                    {
                        name: 'item 2'
                    },
                    {
                        name: 'item 3'
                    },
                    {
                        name: 'item 4'
                    },
                    {
                        name: 'item 5'
                    },
                    {
                        name: 'item 6'
                    }
                ]
            }
        },
        methods: {
            moveForword(i){
                if (i < this.items.length - 1) {
                    const temp = this.items[i];
                    this.items[i] = this.items[i+i];
                    this.items[i+1] = temp;
                    this.items = JSON.parse(JSON.stringify(this.items));
                }
                
            },
            movebackword(i){
                if (i > 0 ) {
                    const temp = this.items[i];
                    this.items[i] = this.items[i-1];
                    this.items[i-1] = temp;
                    this.items = JSON.parse(JSON.stringify(this.items));
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>