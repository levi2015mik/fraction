<template>
<li>
  <div v-if="iterable">
    {{localeName}}
    <ul>
      <SettingsItem
          v-for="(val, key, index) in value"
          :value="val"
          :name="key"
          :key="index"
      />
    </ul>
  </div>

      <input type="text"
             v-else-if="textType"
             v-model="value"
             :id="name"
             title="1234"
      />
      <input type="checkbox"
            v-else-if="checkboxType"
            v-model="value"
            :id="name"
      />
      <select
            v-else-if="selectType"
            v-model="value"
            :id="name">
        <option v-for="val in options">{{val}}</option>
      </select>
      <span v-else-if="twonumsType">
        <input type="number"
               size="1"
               v-model.number="value.min"
               :id="name+'min'"
        />
        <label :for="name+'min'">минимум</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="number"
               size="1"
               v-model.number="value.max"
               :id="name+'max'"
        />
        <label :for="name+'max'">максимум</label>
      </span>

  <label
    v-if="!iterable"
    :for="name">{{localeName}}</label>

</li>
</template>

<script>
    import DICTIONARY from "../dictionary"  // Словарь, содержащий сведенья о всех пунктах настроек
                                            // и перечень вариантов выбора -- Плохое решение

    export default {
        name: "SettingsItem",
        props:["name","value"],
        data(){
            return{
                localeName:"",
                description:"",
                options:[]
            }
        },
        created(){
            this.localeName = DICTIONARY[this.name].name;
            this.description = DICTIONARY[this.name].description;
            if(DICTIONARY[this.name].options !== undefined)
              this.options = DICTIONARY[this.name].options;
        },
        computed:{
            iterable(){
                return typeof this.value === "object"    &&
                  typeof this.value.min  === "undefined" &&
                  typeof this.value.max  === "undefined"
            },

            textType(){
              return typeof this.value === "string" && this.options.length === 0;
            },
            selectType(){
              return typeof this.value === "string" && this.options.length > 0;
            },
            checkboxType(){
              return typeof this.value === "boolean"
            },
            twonumsType(){
              return typeof this.value.min  === "number" &&
                     typeof this.value.max  === "number"
            }
        }
    }
</script>

<style scoped>
input[type="number"] {
  width: 4em;
}
</style>
