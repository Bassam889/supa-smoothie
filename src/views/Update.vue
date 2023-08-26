<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "../router/router";

const route = useRoute();
const { id } = route.params;

const title = ref<string>("");
const method = ref<string>("");
const rating = ref<number>();
const formError = ref<string | null>(null);

const fetchSmoothieData = async () => {
  try {
    const res = await axios.get(
      `http://localhost/projects/supa_smoothies_back_end/get.php?id=${id}`
    );
    if (res.data.ok === 1) {
      const smoothie = res.data.smoothie;
      title.value = smoothie.title;
      method.value = smoothie.method;
      rating.value = smoothie.rating;
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(
      `Oops! something went wrong while fetching smoothie data, details: ${
        (error as Error).message
      }`
    );
  }
};

onMounted(() => {
  fetchSmoothieData();
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (!title.value || !method.value || !rating.value) {
    formError.value = "Please fill in all the fields correctly.";
    return;
  }

  try {
    const res = await axios.put(
      "http://localhost/projects/supa_smoothies_back_end/update.php",
      {
        id: id,
        title: title.value,
        method: method.value,
        rating: rating.value,
      }
    );

    if (res.data.ok === 1) {
      console.log(res.data.message);
      formError.value = null;
      router.push("/");
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(
      `Oops! something went wrong, details: ${(error as Error).message}`
    );
    formError.value = "An error occurred while creating the smoothie.";
  }
};
</script>

<template>
  <div class="page create">
    <form @submit="handleSubmit">
      <label for="title">Title: </label>
      <input type="text" id="title" v-model.trim.lazy="title" />

      <label for="method">Method: </label>
      <textarea type="text" id="method" v-model="method" />

      <label for="rating">Rating: </label>
      <input type="number" id="rating" v-model="rating" />

      <button>Update Smoothie Recipe</button>

      <p v-if="formError" class="error">{{ formError }}</p>
    </form>
  </div>
</template>
