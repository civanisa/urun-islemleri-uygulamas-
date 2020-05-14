import Vue from "vue";
import ProductsListe from "./components/products/ProductsListe";
import ProductsSatinAlma from "./components/products/ProductsSatinAlma";
import ProductsSatis from "./components/products/ProductsSatis";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {path : "/" , component : ProductsListe},
  {path : "/urun-islemleri" , component : ProductsSatinAlma},
  {path : "/urun-cikisi" , component : ProductsSatis},
  {path : "*" , redirect : "/"}
];

export const router = new VueRouter({
  mode : "history",
  routes
});