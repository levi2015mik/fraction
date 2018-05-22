<template>
    <div id="root">
        <button @click="show()">?</button>
        <span id="win" v-if="isShow">
          <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "descriptViewer",
        data(){
          return {isShow:false}
        },
        methods:{
            show(){
                this.isShow = true;
                setTimeout(()=>{this.isShow=false},5000)
            }
        }
    }
</script>

<style scoped>
div#root{
  display: inline-block;
  margin-left: 3em;
}
span#win{
  display: inline-block;
  position: absolute;
  width: 16em;
  margin-left: 1em;
  border: 1px solid #ddddbb;
  padding: 3px 3px 3px 5px;
  background: #ffffDD;
}
</style>
