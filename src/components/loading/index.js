import Loging from "./Loging.vue";
import Vue from "vue";
let Logingcontructor = Vue.extend(Loging);
Logingcontructor.constructor = Logingcontructor;
let createLoging = function(opt) {
  let instance = new Logingcontructor({
    el: document.createElement("div")
  });
  instance.$on("afterleave", data => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
  });
  if (opt) {
    instance.opt = opt;
  }
  instance.visible = true;
  document.body.appendChild(instance.$el);
  return instance;
};

export default Vue => {
  Vue.prototype.$loading = opt => {
    return createLoging(opt);
  };
};
