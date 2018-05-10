// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FractionOutput from './components/FractionOutput'
import router from './router'

Vue.config.productionTip = false;
Vue.component("FractionOutput",FractionOutput);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
