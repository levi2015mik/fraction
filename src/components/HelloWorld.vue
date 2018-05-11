<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <FractionOutput v-for="frc in fr" :fraction="frc"/>
    <div>
      <FractionInput v-model="binded"/><FractionOutput :fraction="binded"/>
    </div>
  </div>

</template>

<script>
import Fraction from "../classis/Fraction"
var config = {
  num:{min:1, max:9},
  denom:{min:-9, max:9},
  whole:{min:0, max:1},
  coef:{min:1, max:9},
  x:{min:0, max:5},
  y:{min:0, max:9}
};
export default {
  name: 'HelloWorld',
  created:function(){
    for(let i =0;i < 10;i ++)
    this.fr[i] = Fraction.generate(config);
  },
  data: function (){
    return {
      msg: 'Welcome to Your Vue.js App',
      fr:[],
      binded:new Fraction(1,5,-3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
