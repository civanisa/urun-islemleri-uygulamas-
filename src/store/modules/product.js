import Vue from "vue";
import {router} from "../../router";
import response from "vue-resource/src/http/response";

const state = {
  products : []
}

const getters = {
  getProducts(state){
    return state.products;
  },
  getProduct(state) {
    return key => state.products.filter(element => {
      return element.key == key;
    })
  }
}

const mutations = {
  uddateProductListe(state , product){
    state.products.push(product);
  }
}

const actions = {
  initApp({commit }){
    //Vue Resource İşlemleri
    Vue.http.get("https://urun-islemleri-1d244.firebaseio.com/products.json")
      .then(response => {
        let data = response.body;
        for(let key in data){
          data[key].key = key;
          commit("uddateProductListe" , data[key])
        }
      });
  },
  saveProduct({dispatch , commit , state } , product){
    //Vue Resource İşlemleri
    Vue.http.post("https://urun-islemleri-1d244.firebaseio.com/products.json", product)
      .then((response) => {
        /*Ürün Listesinin Güncellenmesi*/
        product.key = response.body.name;
        commit("uddateProductListe" , product);
        /*Alış Satış Bakiye Güncellenmesi*/
        let tradeResult = {
          purchase  : product.price,
          sale : 0,
          count : product.count
        }
        dispatch("setTradeResult" , tradeResult);
        router.replace("/");
      });
  },
  satisProduct({state , commit , dispatch}, payload){
    //Vue Resource İşlemleri
    let product = state.products.filter(element => {
      return element.key == payload.key;
    })
    if (product){
      let totalCount = product[0].count - payload.count;
      Vue.http.patch("https://urun-islemleri-1d244.firebaseio.com/products/" + payload.key + ".json",{count: totalCount })
        .then(response => {
          product[0].count = totalCount;
          let tradeResult = {
            purchase  : 0,
            sale : product[0].price,
            count : payload.count
          }
          dispatch("setTradeResult" , tradeResult);
          router.replace("/");
        })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}