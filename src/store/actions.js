import Vue from "vue";
import response from "vue-resource/src/http/response";

export const setTradeResult = ({ state , commit } , tradeResult) => {
  commit("updateTradeResult" , tradeResult);
  let tradData = {
    purchase : state.purchase,
    sale : state.sale
  }
  Vue.http.put("https://urun-islemleri-1d244.firebaseio.com/trade-result.json" , tradData)
    .then(response => {
    });
}

export const getTradeResult = ({ commit }) => {
  Vue.http.get("https://urun-islemleri-1d244.firebaseio.com/trade-result.json")
    .then(response => {
      commit("updateTradeResult" , response.body);
    });
}