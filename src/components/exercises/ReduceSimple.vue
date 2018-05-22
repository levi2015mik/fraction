<template>
  <div>
    <FractionOutput :fraction="question"/>
    <FractionSign>=</FractionSign>
    <FractionInput v-model="answer"/>
  </div>
</template>
<script type="application/javascript">
  import Fraction from "../../classis/Fraction.js"
  import {fracKatexFmt} from "../../functions"

  export default {
    name:"ReduceSimple",
    props:["params"],
    data(){
      let answer = new Fraction();
      answer.sign = false;
      return {
        question: new Fraction(1,5,0,false),
        answer : answer,
        right: new Fraction(0,0,0,false)
      }
    },
    created(){
      // адержка дает время загрузки для store
      setTimeout(this.generate(),1000);
      // this.generate();
    },
    methods:{
      //Сброс вводимого ответа
      reset(){
        let answer = new Fraction();
        answer.sign = false;
        this.answer = answer;
      },

      //Проверка правильности ответа и передача наверх результата
      submit(){
        let answer = fracKatexFmt(this.question) + "="
          + fracKatexFmt(this.answer);
        let right = fracKatexFmt(this.question) + "="
          + fracKatexFmt(this.right);
        let isRight = this.answer.equal(this.right);
        return {
          isRight:isRight,
          answer:answer,
          right:right
        }
      },
      generate(){
        //Генерация числа question по данным params
        this.question = Fraction.generate(this.params.fraction);
        //Генерация правильного ответа right
        let right = this.question.reduce();
        if(!right){
          this.generate();
          return
        }
        this.right = right.isolateWhole()
      }
    }
  }
</script>
<style></style>
