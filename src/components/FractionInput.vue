<template>
  <span>
    <span class="whole">
      <input type="text" size="1"  :value="whole" @change="input($event,'whole')">
    </span>
    <span class="frac">
      <span class="num"  >
        <input type="text" size="1"  :value="value.num" @input="input($event,'num')">
      </span>
      <span class="denom">
        <input type="text" size="1" :value="value.denom" @input="input($event,'denom')">
      </span>
    </span>
  </span>
</template>
<script type="application/javascript">
  import Fraction from "../classis/Fraction"

  export default {
    name: "FractionInput",
    props:["value"],
    computed:{
      whole:function(){
        let whole = Number(this.value.whole);
        if(isNaN(whole) ) whole = "";
        return ((this.value.sign)? '-' : '') + whole
      }
    },
    methods:{
      input: function(event,field){
        let val = Number(event.target.value);
        if((field == "whole" && val < 0 )|| event.target.value == "-")
          this.value.sign = true;
        if((field == "whole" && val >= 0 )|| event.target.value == "")
          this.value.sign = false;
          this.value[field] = val;
        this.$emit("input", new Fraction(
          this.value.num,
          this.value.denom,
          this.value.whole,
          this.value.sign
        ))
      }
    },
    created:function(){
    }
  }
</script>
<style scoped>
  input{
    margin: 5px;
    width: 1.6em;
    font-size: 1.7em;
  }
  #root{
    margin: 10px;
    font-size: 2em;
  }
  .whole{
    position: relative;
    bottom: 1.5em;
  }
  .frac{
    display: inline-block;
  }
  .num{
    display: block;
    border-bottom: solid 3px #000099;
  }
  .denom{
    display: block;
  }

</style>
