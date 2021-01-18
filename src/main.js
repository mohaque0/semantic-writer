import Vue from 'vue'
import App from './App.vue'
import './quasar'

Vue.config.productionTip = false

Vue.component('SemanticStyles', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
