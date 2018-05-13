<template>
    <div>
      <ul>
        <SettingsItem
          v-for="(val, key, index) in params"
          :value="val"
          :key="index"
          :name="key"
        />
      </ul>
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
            save() {
            }
        },
      components:{
          SettingsItem
      }
    }
</script>

<style scoped>

</style>
