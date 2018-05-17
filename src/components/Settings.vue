<template>
    <div>
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
                //TODO Загрузка из store по номеру
                this.params = {
                    name:"",
                    component: "ReduceSimple",
                    showRight: true,
                    fraction: {
                        num: {min: 1, max: 9},
                        denom: {min: 1, max: 2},
                        whole: {min: -9, max: 9},
                        coef: {min: 1, max: 2},
                        x: {min: 0, max: 5},
                        y: {min: 0, max: 9}
                    }
                }
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
              console.log(JSON.stringify(settings,2))
            }
        },
      components:{
          SettingsItem
      }
    }
</script>

<style scoped>

</style>
