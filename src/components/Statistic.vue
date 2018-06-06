<template>
<div id="statistic">
  <fieldset id="filters">
  <legend>Фильтрация</legend>
  <fieldset>
      <legend>Фильтрация по времени</legend>
      <span class="sel-wraper">
        <label for="month">Месяц</label>
        <select id ="month" v-model.number="monthInt">
          <option value="-1">все</option>
          <option v-for="(month, num) in months"
                  :key="num"
                  :value="num">
            {{month.time}}
          </option>
        </select>
      </span>

      <span class="sel-wraper">
        <label for="day">День</label>
        <select id ="day" v-model.number="dateInt">
          <option value="-1">все</option>
          <option v-for="(day, num) in days"
                  :key="num"
                  :value="num">
            {{day.time}}
          </option>
        </select>
      </span>

      <span class="sel-wraper">
        <label for="hour">Час</label>
        <select v-model.number="hourInt" id ="hour">
          <option value="-1">все</option>
          <option v-for="(hour, num) in hours"
                  :key="num"
                  :value="num">
            {{hour.time}}
          </option>
        </select>
      </span>
    </fieldset>

    <span class="sel-wraper">
    <label for="exerc">упражнение</label>
      <select id="exerc" v-model.number="eid">
        <option value="-1">все</option>
        <option
                v-for="(exer, num) in exercises"
                :key="num"
                :value="exer._id">
          {{exer.name}}
        </option>
      </select>
    </span>

    <div class="sel-wraper">
      <h4>Категория правильности:</h4>
      <input type="radio"
             id="all"
             name="is-right"
             value="0"
             v-model.number="isRight"/>
        <label for="all">все</label><br/>
      <input type="radio"
             id="right"
             name="is-right"
             value="1"
             v-model.number="isRight"/>
        <label for="right">правильные</label><br/>
      <input type="radio"
             id="wrong"
             name="is-right"
             value="2"
             v-model.number="isRight"/>
        <label for="wrong">неверные</label><br/>
    </div>

    <div class="sel-wraper">
      <p>Всего:&nbsp;{{statistic.length}}</p>
      <p>&nbsp;в том числе верно:&nbsp;{{rightFullStatistic}}</p>
      <p>показано:&nbsp;{{displayed.length}}</p>
      <p>&nbsp;в том числе верно:&nbsp;{{rightDisplayedStatistic}}</p>
    </div>

    <div class="sel-wraper">
      <input type="checkbox" id="links" v-model="showLinks"/><label for="links">показывать ссылки на задания</label>
    </div>
    <div class="sel-wraper">
      <input type="checkbox" id="rights" v-model="showRights"/><label for="rights">показывать правильные ответы</label>
    </div>


  </fieldset>

  <div id="statistic-box">
    <div v-for="(el , key) in displayed" class="statItem" :class="{right:el.isRight}">
      <h3>{{timeFMT(el.time)}}</h3>
      <span class="katex" v-katex="el.answer"></span>
      <span v-if="showRights" class="katex" v-katex="el.right"></span>
      <router-link v-if="showLinks" :to="/test/+el.eid">{{getExerciseName(el.eid)}}</router-link>
    </div>
    <div v-if="displayed.length === 0 && statistic.length === 0" class="statItem">
      <h3>Статистика отсутствует</h3>
      <span class="info">Решите какое ни будь задание, чтобы появилась статистика </span>
    </div>

    <div v-else-if="displayed.length === 0" class="statItem info">
      <h3>В этой категории статистика отсутствует</h3>
      <span class="info">Выберите другую категорию</span>
    </div>

  </div>
</div>
</template>

<script>
  /**
   * Показ статистики пользователя с фильтрацией:
   * - по времени, с показом дат и часов
   * - по упражнению
   * - пользователю через параметр url
   * Также должен быть выбор, видно ли правильный ответ
   * TODO Решить проблему с ошибками при загрузке со итратистики
   */
  import store from "@/store"
  import {getIntRandom} from "@/functions"
    export default {
        name: "Statistic",
        props:{
          monthInt:{default:-1},
          dateInt:{default:-1},
          hourInt:{default:-1},
          eid:{default:-1},
          uid:{default:0},
          isRight:{default:0},
          showLinks:{default:false},
          showUserSelect:{default:false},
          showRights:{default:true}

        },
        created(){
        },
        computed:{
          /**
           * Список статистики, полученной из store.
           * @return {*[]}
           */
          statistic(){
            //return this.setTest();// Отладочные данные
            return store.state.statistic
          },

          /**
           * Отфильтрованная статистика. Выводит статистику с учетом переменных
           * - monthInt:-1
           * - dateInt:-1
           * - hourInt:-1
           * @return {*[]}
           */
          displayed(){

            let interval;
            let data = this.statistic;

            if(this.eid !== -1)
              data = data.filter((el)=>
                el.eid === this.eid
              );

            // Интервал вывода
            if(this.hourInt !== -1) interval = this.hours[this.hourInt].interval;
            else if(this.dateInt !== -1) interval = this.days[this.dateInt].interval;
            else if(this.monthInt !== -1) interval = this.months[this.monthInt].interval;
            else interval =[0,data.length];

            data=data.filter((el,num)=>
              num >= interval[0] && num <= interval[1]
            );

            if(this.isRight !== 0)
              data = data.filter((el)=>{
                  if(this.isRight === 1)
                    return el.isRight;
                  else
                    return !el.isRight;
                }
              );

            data = data.sort((a,b)=>{
              if(a.time < b.time) return 1;
              if(a.time > b.time) return -1
            });
            return data
          },

          /**
           * Генерация списка вывода перечня месяцев.
           * На его основании строится select выбора monthInt
           * @return {*[]}
           */
          months(){

            let data = this.statistic;
            let out = [];

            if(data[0] === undefined)
              return [];

            let lastMonth  = new Date(data[0].time).toLocaleDateString().substr(-7); // Предыдущий месяц
            let startMonth = 0; // Начало нового месяца во входном массиве
            let lastAddedMonth = 0; // Последний добавленный новый месяц в выходном массиве

            for (let i = 0; i < data.length + 1; i++) {
              let month;
              if (data[i] !== undefined)
                month = new Date(data[i].time).toLocaleDateString().substr(-7);
              else month = "end";
              if (lastMonth !== month) {
                out.push({
                  time: lastMonth,
                  interval: [startMonth]
                });
                out[lastAddedMonth].interval.push(i - 1);
                lastAddedMonth++;
                lastMonth = month;
                startMonth = i;
              }
            }

            return out;

          },

          /**
           * Генерация списка вывода перечня дней.
           * На его основании строится select выбора dateInt
           * @return {*[]}
           */
          days(){

            let data = this.statistic;
            let out = [];

            if(data[0] === undefined)
              return [];

            let interval;
            if(this.monthInt == "-1")
              interval = [0,data.length];
            else
              interval = this.months[this.monthInt].interval; // Рабочий интервал. Задается через дату
            let lastDay = new Date(data[0].time).toLocaleDateString(); // Дата предыдущего упражнения
            let startDay = 0; // Начало нового дня во входном массиве
            let lastAddedDay = 0; // Последний добавленный новый день в выходном массиве

            for (let i = interval[0];i <= interval[1] + 1;i ++){
              let day;
              if(data[i] !== undefined)
                day = new Date(data[i].time).toLocaleDateString();
              else day = "end";

              if(day !==lastDay){
                out.push({
                  time: lastDay,
                  interval: [startDay]
                });

                out[lastAddedDay].interval.push(i - 1);

                lastAddedDay ++;
                lastDay = day;
                startDay = i;
              }
            }

            // Удаление первого элемента списка, в том случае, если работаем не с началом.
            // Это исправляет ошибку, при которой добавляется первый элемент
            if(interval[0]!==0)out.splice(0,1);

            return out;
          },

          /**
           * Генерация списка вывода перечня часов.
           * На его основании строится select выбора hourInt
           * @return {*[]}
           */
          hours(){
            if(this.dateInt == "-1")
              return [];

            let interval = this.days[this.dateInt].interval; // Рабочий интервал. Задается через дату

            let data = this.statistic;
            let out = [];

            // Проверка на наличие данных - позволяет избежать ошибки
            if(data[0] === undefined)
              return [];

            let lastHour = new Date(data[interval[0]].time).getHours(); // Предидущий час
            let startHour = interval[0]; // Начало нового часа во входном массиве
            let lastAddedHour = 0; // Последний добавленный час в выходном массиве

            for (let i = interval[0]; i <= interval[1] + 1; i++) {
              let hour;
              if(data[i] !== undefined)
                hour = new Date(data[i].time).getHours();
              else hour = "end";
              if (lastHour !== hour) {
                out.push({
                  time: `${lastHour}:00`,
                  interval: [startHour]
                });

                out[lastAddedHour].interval.push(i - 1);

                lastAddedHour++;
                lastHour = hour;
                startHour = i;
              }
            }

            return out;

          },

          /**
           * На основе этого списка строится select выбора eid
           * @returns {*[]}
           */
          exercises(){
            let data = store.state.exercises;
            let out = [];

            data.forEach(el=>{
              out.push({
                name:el.name,
                _id:el._id
              })
            });

            return out;
          },

          /**
           * Подсчет количества правильных ответов в общей выборке
           * и отфильтрованной выборке
           */
          rightFullStatistic(){
            if(this.statistic === undefined)
              return undefined;

            return this.statistic.reduce((sum,el)=>{
              if(el.isRight) return sum + 1;
              else return sum
            },0)
          },

          rightDisplayedStatistic(){
            if(this.statistic === undefined)
              return undefined;

            return this.displayed.reduce((sum,el)=>{
              if(el.isRight) return sum + 1;
              else return sum
            },0)
          }
        },
        methods:{
          timeFMT(time){
            return new Date(time).toLocaleString()
          },

          /**
           *
           * @param eid {number}
           * @return {string}
           */
          getExerciseName(eid){
            for(let i = 0;i < this.exercises.length;i ++)
              if(this.exercises[i]._id === eid) return this.exercises[i].name
          },

          al(){
            alert(store.state.statistic[0].time);
            console.log(store.state.statistic);
            console.log(this.displayed)
          },
          /**
           * Отладочная функция генерации большого объема данных статистики
           * @returns {*}
           */
          setTest(){

            let list =[];
            let time = new Date();
            time = time.setFullYear(2014,5,16);
            for(let i = 0;i < 200;i ++){
              time += getIntRandom(0, 1000 * 60 * 60 * 24);
              let element = {
                answer:"-4\frac{16}{2}=0",
                eid:0,
                right:"-4\frac{16}{2}=-12",
                uid:0
              };
              let rand = getIntRandom(0,2) === 1;
              element.time = time;
              element.isRight = rand; //== 1;
              list.push(element)
            }
            return list;
          }
        },
      /**
       * Через наблюдатели selectы фильтрации
       * сбрасываются на начальное значение в те моменты,
       * когда из-за внесения других фильтраций, их значения теряют смысл
       */
      watch:{
          monthInt(){
            this.dateInt = -1
          },
          dateInt(){
            this.hourInt = -1
          }
        },
        directives:{
          katex(el,binding){
              katex.render(binding.value, el,{displayMode: true});
            }
        }
    }
</script>

<style scoped>
#statistic{
  margin: 2em;
  border: solid 2px #efefef;
  padding: 2em 2em 2em 0;
  background: #ffffff;
}
.statItem{
  margin: 0.5em 0 1em;
  border: #c3cbd0 2px solid;
  background: #CC0000;
}

.statItem h3{
  margin-top: 0;
  background: #D0D8DD;
  padding: 0.4em;
}

.statItem a{
  padding: 0.4em;
  display: block;
  background: #c0c8cc;
}

.right{
  background: #006600;
}
#filters{
  margin-left: 2em;
  margin-bottom: 2em;
  vertical-align: top;
  display: inline-block;
  width: 20em;
  font-size: 1.01em;
}
#statistic-box{
  margin-left: 2em;
  display: inline-block;
  width: 40em;
}
.sel-wraper{
  margin: 1em 5px 5px;
  display: block;
}
.sel-wraper h4{
  margin: 0.4em 0;
}
.sel-wraper p{
  margin: 2px 0;
}

</style>
