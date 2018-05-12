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
    data: function(){
      var answer = new Fraction();
      answer.sign = false;
      return {
        question: new Fraction(1,5,0,false),
        answer : answer,
        right:{}
      }
    },
    created:function(){
      this.generate();
    },
    methods:{
      //Сброс вводимого ответа
      reset:function(){
        var answer = new Fraction();
        answer.sign = false;
        this.answer = answer;
      },

      //Проверка правильности ответа и передача наверх результата
      submit:function(){
        // TODO Проверка ответа, составление строк результата

        var answer = fracKatexFmt(this.question) + "="
          + fracKatexFmt(this.answer);
        var right = fracKatexFmt(this.question) + "="
          + fracKatexFmt(this.right);
        return {
          isRight:false,
          answer:answer,
          right:right
        }
      },
      generate:function(){
        //Генерация числа question по данным params
        this.question = Fraction.generate(this.params.fraction);
        //Генерация правильного ответа right
        this.right = this.question.reduce().isolateWhole()
      }
    }
  }
</script>
<style></style>
