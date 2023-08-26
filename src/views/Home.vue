<script setup lang="ts">
import { ref, onMounted } from "vue";
import SmoothieCard from "../components/SmoothieCard.vue";
import axios from "axios";
import Smoothie from "../interfaces/Smoothie";

const fetchError = ref<string | null>(null);
const smoothies = ref<Smoothie[] | null>(null);
const orderBy = ref<string>("created_at");

const setOrderBy = (order: string): void => {
  orderBy.value = order;
  fetchSmoothies(order);
};

const handleDelete = (id: number): void => {
  console.log(`Smoothie with ID ${id} deleted`);
  if (smoothies.value) {
    smoothies.value = smoothies.value?.filter((smoothie) => smoothie.id !== id);
  }
};

const fetchSmoothies = async (order: string): Promise<void> => {
  try {
    const res = await axios.get(
      "http://localhost/projects/supa_smoothies_back_end/get.php",
      {
        params: {
          orderBy: order,
        },
      }
    );
    console.log("xd");
    console.log(res.data.smoothie);
    smoothies.value = res.data.smoothie;
    fetchError.value = null;
    console.log(order);
  } catch (error) {
    console.log(
      `Oops! something went wrong, details: ${(error as Error).message}`
    );
    fetchError.value = "An error ocurred while fetching the smoothies.";
  }
};

onMounted(() => {
  fetchSmoothies(orderBy.value);
});
</script>

<template>
  <div class="page home">
    <p v-if="fetchError">{{ fetchError }}</p>
    <div v-if="smoothies" class="smoothies">
      <div class="smoothie-grid">
        <div class="order-by">
          <p>Order by:</p>
          <button @click.prevent="setOrderBy('created_at')">
            Time Created
          </button>
          <button @click.prevent="setOrderBy('title')">Title</button>
          <button class="rating" @click.prevent="setOrderBy('rating')">
            Rating
          </button>
          {{ orderBy }}
        </div>
        <SmoothieCard
          v-for="smoothie in smoothies"
          :key="smoothie.id"
          :smoothie="smoothie"
          @onDelete="handleDelete">
        </SmoothieCard>
      </div>
    </div>
  </div>
</template>
