<template>
  <div id="exercise">
    <!--Компонент задан статически, а не через component is
    Это дает возможность работать с меню, но убирает компоненты
    -->
    <component :is="exercComponent"  :params="params" ref="exercise"/>

    <div id="btns">
      <button @click="reset">Сброс</button>
      <button @click="submit">Готово</button>
    </div>


    <!-- Сообщение, выдающее ответ, указание, правильный ли он
      -- и при соответствующем условии, правильный варивнт ответа
      -- Вставка контента осуществляется путем прямой манипуляции
      -- DOM через $refs при помощи библиотеки katex.
      -- В элемент DOM вставляются строки LaTeX,
      -- katex.render("-1\\frac{2}{3}", res,{displayMode: true})
      -->
    <div id="resulr-alert" v-show="result" :class="{right:resultBody.isRight}">
      <div ref="answer" style="font-size: 1.5em"></div>

      <!--<span v-if="showRight">Правильный ответ:</span>-->

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
  import ReduceSimple from "./exercises/ReduceSimple.vue"
  import Stub from  "./exercises/stub"
  import store from "@/store"

  export default {
    name: "Test",
    data(){
      return {
        id:this.$route.params.id,
        result:false,
        resultBody:{},        // Данные об ответе. Они отправятся в статистику
        exercComponent:Stub
      }
    },
    created(){
      setTimeout(()=>{
        this.exercComponent = this.params.component;
      },1000);
    },
    computed:{
      params(){
         return store.state.exercises.find(el =>
           el._id == this.id
         )
      },
      // showRight() {
      //   if(typeof this.params === "undefined")
      //     return false;
      //   else
      //     return params.showRight
      // }
    },
    methods:{
      /**
       * Проверка результата, вывод сообщения о результате, сохранение статистики через vuex
       */
      async submit(){
        let result = this.$refs.exercise.submit();
        this.resultBody = result;
        this.showResult(result);
        let saveStat = await store.dispatch("pushStatistic",this.resultBody);
        if(!saveStat){} //Обработка отсутствия соединения
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
  div #exercise{
    margin: 2em;
    border: solid 2px #efefef;
    padding: 2em;
    background: #ffffff;
    text-align: center;
  }

  #btns{
    margin: 1em;
  }

  div #exercise button {
    font-size: 1.2em;
    margin-right: 1em;
  }

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
