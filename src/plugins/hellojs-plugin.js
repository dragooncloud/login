import Vue from 'vue'
import * as HelloJs from 'hellojs/dist/hello.all.min.js';
import VueHello from 'vue-hellojs';

HelloJs.init({
  google: '681562465675-bkvojgd1t3cj0mablii1k5itb3igf4rj.apps.googleusercontent.com',
  facebook: '1148326378649443',
  windows: '04ebe6f7-27ef-4255-aa60-fa561999f012',
}, {
  redirect_uri: 'https://login.dragoon.cloud',
  display: 'popup',
  scope: 'basic,email',
});

Vue.use(VueHello, HelloJs);