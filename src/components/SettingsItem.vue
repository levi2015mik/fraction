<template>
<li>
  <div v-if="iterable">
    {{localeName}}
    <DescriptViewer v-if="iterable"><span v-html="description"></span></DescriptViewer>
    <ul>
      <SettingsItem
          v-for="(val, key, index) in value"
          :value="val"
          :name="key"
          :key="index"
          ref="settingsItems"
      />
    </ul>
  </div>

      <input type="text"
             v-else-if="textType"
             v-model.lazy="value"
             :id="name"
             title=""
             size="40"
      />
      <input type="checkbox"
            v-else-if="checkboxType"
            v-model.lazy="value"
            :id="name"
      />
      <select
            v-else-if="selectType"
            v-model.lazy="value"
            :id="name">
        <option v-for="val in options">{{val}}</option>
      </select>
      <span v-else-if="twonumsType">
        <input type="number"
               size="1"
               v-model.number.lazy="value.min"
               :id="name+'min'"
        />
        <label :for="name+'min'">минимум</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="number"
               size="1"
               v-model.number.lazy="value.max"
               :id="name+'max'"
        />
        <label :for="name+'max'">максимум</label>
      </span>

  <label
    v-if="!iterable"
    class="prnm"
    :for="name">{{localeName}}</label>
  <DescriptViewer v-if="helpable"><span v-html="description"></span></DescriptViewer>

</li>
</template>

<script>
    import DICTIONARY from "../dictionary"  // Словарь, содержащий сведенья о всех пунктах настроек
                                            // и перечень вариантов выбора -- Плохое решение
    import DescriptViewer from "./DescriptViewer"

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
            if(this.name === "_id") return;
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
            helpable(){
              return !this.iterable && this.name !== "_id"
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
        },
        components:{
            DescriptViewer
        }
    }
</script>

<style scoped>
li{
  margin: 0.4em;
  list-style: none;
}
input{
  padding-left: 0.2em;
  font-size: 1em;
}
input[type="number"] {
  width: 3em;
}
select, option {
  font-size: 1em;
}
label.prnm{
  margin-left: 0.3em;
}
</style>
