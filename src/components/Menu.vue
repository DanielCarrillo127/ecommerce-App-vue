<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <div class="left menu">
        <router-link class="item" to="/">
          <img
            class="ui small image"
            src="../assets/logo.png"
            alt="Ecommerce"
          />
          <template v-for="category in categories" :key="category.attributes.id">
            <router-link class="item" :to="category.attributes.slug">
              {{ category.attributes.title }}
            </router-link> 
          </template>
        </router-link>
      </div>

      <div class="right menu">
        <router-link class="item" to="/login" v-if="!token">
          Iniciar sesión
        </router-link>
        <template v-if="token">
          <router-link class="item" to="/orders">Pedidos</router-link>
          <span class="ui item cart" @click="openCart">
            <i class="shopping cart icon"></i>
          </span>
          <span class="ui item logout" @click="handlerLogout">
            <i class="sign out alternate icon"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getTokenApi, deleteTokenApi } from "../api/token";
import { useStore } from "vuex";
import { getCategoriesApi } from "../api/category";

export default {
  name: "Menu",
  setup() {
    const token = getTokenApi();
    const store = useStore();
    const categories = ref(null);

    const handlerLogout = () => {
      deleteTokenApi();
      location.replace("/");
    };

    const openCart = () => {
      store.commit("setShowCart", true);
    };
    onMounted(async () => {
      const response = await getCategoriesApi();
      categories.value = response.data;
    });

    return {
      handlerLogout,
      token,
      categories,
      openCart
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background-color: #16202b;
  .item {
    color: #fff;
    &:hover {
      color: #1fa1f1;
    }
  }
  .menu.left {
    width: 50%;
    .ui.image {
      width: 40px;
    }
  }
  .menu.right {
    width: 50%;
    justify-content: flex-end;
    .logout,
    .cart {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
