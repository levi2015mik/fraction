import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Test from '@/components/Test';
import Settings from '@/components/Settings';
import ExercList from '@/components/ExercList';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/test/:id',
    name: 'Test',
    component: Test
  }, {
    path: '/settings/:id',
    name: 'Settings',
    component: Settings
  }, {
    path: '/exerclist',
    name: 'ExercList',
    component: ExercList
  }]
});

//# sourceMappingURL=index-compiled.js.map