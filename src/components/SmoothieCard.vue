<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import axios from "axios";
import Smoothie from "../interfaces/Smoothie";

const props = defineProps<{
  smoothie: Smoothie;
}>();

const route = useRoute();
const router = useRouter();
const smoothie = ref(props.smoothie);
const formError = ref<string | null>(null);

const handleDelete = async () => {
  try {
    const res = await axios.delete(
      `http://localhost/projects/supa_smoothies_back_end/delete.php`,
      {
        data: {
          id: smoothie.value.id,
        },
      }
    );
    router.go(0);
    if (res.data.success === 1) {
      console.log("onDelete event emitted");
      console.log(res.data.message);
      const onDelete = route.query.onDelete as unknown as (id: number) => void;
      onDelete(smoothie.value.id);
    } else {
      formError.value = res.data.message;
    }
  } catch (error) {
    console.log(
      `Oops! something went wrong, details: ${(error as Error).message}`
    );
    formError.value = "An error occured while deleting the smoothie.";
  }
};
</script>

<template>
  <div class="smoothie-card">
    <h3>{{ smoothie.title }}</h3>
    <p>{{ smoothie.method }}</p>
    <div class="rating">{{ smoothie.rating }}</div>
    <div class="buttons">
      <RouterLink :to="'/' + smoothie.id">
        <i class="material-icons">edit</i>
      </RouterLink>
      <i class="material-icons" @click="handleDelete">delete</i>
      <p v-if="formError" class="error">{{ formError }}</p>
    </div>
  </div>
</template>
