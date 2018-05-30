<template>
    <div id="settings">
      <ul>
        <SettingsItem
          v-for="(val, key, index) in params"
          :value="val"
          :key="index"
          :name="key"
          ref="settingsItems"
        />
      </ul>
      <button @click="save()">сохранить</button>
    </div>
</template>

<script>
    import SettingsItem from "./SettingsItem"
    import store from "@/store"
    export default {
        name: "Settings",
        data(){
          return {
            params:{}
          }
        },
        created(){
          this.load()
        },
        methods: {
          // Загрузка из store по идентификатору
            load() {
                let id = this.$route.params.id;
                this.params = store.state.exercises.find(el=>el._id == id);

            },

            save(){
              // Сбор и сохранение настроек не рекурсивно, а происходит в циклах.
              // Допускается два уровня вложенности, не больше.
              // Работает оно на неудобных и трудночитаемых командах
              //console.log(this.$refs.settingsItems);
              let settings = {};
              for (let i = 0; i < this.$refs.settingsItems.length; i++) {
                if(
                  typeof this.$refs.settingsItems[i].value === "boolean" ||
                  typeof this.$refs.settingsItems[i].value === "string"  ||
                  typeof this.$refs.settingsItems[i].value === "number"
                ){
                  settings[this.$refs.settingsItems[i].name] = this.$refs.settingsItems[i].value
                }
                else if(
                    typeof this.$refs.settingsItems[i].value === "object" &&
                    !this.$refs.settingsItems[i].value.hasOwnProperty("min") &&
                    !this.$refs.settingsItems[i].value.hasOwnProperty("max")
                ){
                  settings[this.$refs.settingsItems[i].name] = {};
                  for(let j = 0;j < this.$refs.settingsItems[i].$refs.settingsItems.length;j ++){
                    settings[this.$refs.settingsItems[i].name]
                      [this.$refs.settingsItems[i].$refs.settingsItems[j].name] =
                      this.$refs.settingsItems[i].$refs.settingsItems[j].value
                  }
                }
              }

              // Заглушка. Эти данные должны сохраняться в объект store
              console.log(JSON.stringify(settings,2));
              store.dispatch("updateExercise",settings);
              this.$router.push("/exercList")
            }
        },
      components:{
          SettingsItem
      }
    }
</script>

<style scoped>
#settings{
    margin: 2em;
    border: solid 2px #efefef;
    padding: 2em;
    background: #ffffff;
}
li{
  margin: 7px;
  list-style: none;
  font-size: 1.2em;
}
button{
  font-size: 1.2em;
}
input{
  padding-left: 0.2em;
  font-size: 1em;
}
select, option {
  font-size: 1em;
}
</style>
