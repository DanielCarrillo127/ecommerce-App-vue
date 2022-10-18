<template>
  <BasicLayout>
    <div class="ui grid">
     <div
        class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product.attributes" :productid="product.id" />
     </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "../layouts/BasicLayout";
import Product from "../components/Product"
import { getProductsCategoryApi } from "../api/product";

export default {
  name: "Category",
  components: {
    BasicLayout,
    Product,
  },
  watch: {
    $route(to, from) {
      this.getProduts(to.params.category);
    },
  },
  setup() {
    let products = ref(null);
    const { params } = useRoute();

    onMounted(() => {
      getProduts(params.category);
    });

    const getProduts = async (category) => {
    const response = await getProductsCategoryApi(category);
    products.value = response.data;
    };
    return {
      getProduts,
       products,
    };
  },
};
</script>

<style>
</style>