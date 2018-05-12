// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import FractionOutput from './components/FractionOutput';
import FractionInput from './components/FractionInput';
import FractionSign from './components/FractionSign';
import router from './router';

Vue.config.productionTip = false;
Vue.component("FractionOutput", FractionOutput);
Vue.component("FractionInput", FractionInput);
Vue.component("FractionSign", FractionSign);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App: App },
  template: '<App/>'
});

//# sourceMappingURL=main-compiled.js.map