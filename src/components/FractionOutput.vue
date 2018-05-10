<template>
  <span id ="root">
    <span v-if="fraction.sign" class="sign">-</span>
    <span v-if="fraction.whole" class="whole">{{fraction.whole}}</span>
    <span class="frac">
      <span class="num"  >{{fraction.num}}</span>
      <span class="denom">{{fraction.denom}}</span>
    </span>
  </span>
</template>
<script type="text/javascript">
  import Fraction from "../classis/Fraction"
  export default {
    name: "FractionOutput",
    props:["fraction"],
    created:function(){
    }
  }
</script>
<style scoped>
#root{
  margin: 10px;
  font-size: 2em;
}
.sign{
  position: relative;
  bottom: 0.7em;
  margin-right: 0;
  padding-right: 0;
}
.whole{
  position: relative;
  bottom: 0.7em;
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
