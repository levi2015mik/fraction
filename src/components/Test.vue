<template>
  <div>
    <h1>Test</h1>
    <component v-once :is="params.component" :params="params" ref="exercise"/>
    <button @click="reset">Сброс</button>
    <button @click="submit">Готово</button>

    <!-- Сообщение, выдающее ответ, указание, правильный ли он
      -- и при соответствующем условии, правильный варивнт ответа
      -- Вставка контента осуществляется путем прямой манипуляции
      -- DOM через $refs при помощи библиотеки katex.
      -- В элемент DOM вставляются строки LaTeX,
      -- katex.render("-1\\frac{2}{3}", res,{displayMode: true})
      -- TODO Изменить тег div на dialog modal
      -->
    <div id="resulr-alert" v-show="result" :class="{right:resultBody.isRight}">
      <div ref="answer" style="font-size: 1.5em"></div>
      Правильный ответ:
      <div ref="right" style="font-size: 1.5em"></div>
      <button @click="renew()">Попробовать снова</button>
      <button @click="nextExerc()">Далее</button>
    </div>

  </div>
</template>
<script type="application/javascript">
  /**
   * В этом компоненте, в зависимости от this.$router.params.id,
   * будет динамически подключаться шаблон задания из папки ./exercises
   */
  // Перечень всех доступных компонентов-шаблонов заданий
  import Fraction from "../classis/Fraction"
  import ReduceSimple from "./exercises/ReduceSimple.vue"
  export default {
    name: "Test",
    data(){
      return {
        params:{
          // Набор параметров теста
          //TODO Добавлять через vuex по идентификатору
          component:"ReduceSimple",
          showRight:true,
          fraction:{
            num:   {min:1,  max:9},
            denom: {min:1,  max:2},
            whole: {min:-9, max:9},
            coef:  {min:1,  max:2},
            x:     {min:0,  max:5},
            y:     {min:0,  max:9}
          }
        },
        id:this.$route.params.id,
        result:false,
        resultBody:{}
      }
    },
    created(){
    },
    methods:{
      /**
       * Проверка результата, вывод сообщения о результате, сохранение статистики через vuex
       */
      submit(){
        let result = this.$refs.exercise.submit();
        this.resultBody = result;
        this.showResult(result);
        //TODO Сохранение result
      },

      //Сброс вводимого ответа
      reset(){
        this.$refs.exercise.reset(); 
      },

      /**
       * Вывод сообщения о правильном ответе или ошибке
       */
      showResult(result){
        this.result = true;
        let answer = this.$refs.answer;
        let right =this.$refs.right;
        katex.render(result.answer, answer,{displayMode: true});
        if(this.params.showRight)
          katex.render(result.right, right,{displayMode: true});
      },

      // Попытка заново решить предыдущее задание
      renew(){
        this.result = false;
        this.$refs.exercise.reset()
      },
      nextExerc(){
        this.result = false;
        this.$refs.exercise.reset();
        this.$refs.exercise.generate();
      }
    },
    components:
    {"ReduceSimple":ReduceSimple}
  }
</script>
<style>
  #resulr-alert{
    margin: 0 1em 1em;
    padding: 0 1em 1em;
    border: solid 3px #CCCCCC;
    background-color: #AA3333;
    color: #FFFFFF;
  }
  #resulr-alert.right{
    background-color: #006600;
  }
</style>
