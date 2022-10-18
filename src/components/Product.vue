<template>
  <div class="ui card product">
    <div class="image imgSize">
      <img :src="API_URL_IMAGE + product.image.data[0].attributes.url" :alt="product.name" />
    </div>
    <div class="content">
      <div class="header">{{ product.name }}</div>
      <div class="description">{{ product.price }} $</div>
    </div>
   <div class="ui button primary" @click="addProductCart(productid)" >
      Comprar
    </div>
  </div>
</template>

<script>
import { API_URL_IMAGE } from "../utils/constants";
import { addProductCartApi } from "../api/cart";
import { object } from 'yup/lib/locale';
export default {
  name: "Product",
  props: {
    product: Object,
    productid: Number,
  },
  setup(props) {
    const addProductCart = (idProduct) => {
     addProductCartApi(idProduct);
    };
    return {
      API_URL_IMAGE,
      addProductCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.product {
  &:hover {
    .ui.button {
      min-height: 36px;
    }
  }
  .ui.button {
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: min-height 0.6s ease;
  }
  .imgSize{
    height: 50%;
    width: 70%;
    margin: auto;
  }
}
</style>