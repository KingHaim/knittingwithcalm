<script setup>
import { ref, computed } from 'vue';

// This would come from your database
const patterns = ref([
  {
    id: 1,
    title: 'Cozy Winter Sweater',
    price: 8.50,
    image: '/images/patterns/winter-sweater.jpg',
    category: 'Sweaters',
    yarnWeight: 'Worsted',
    skillLevel: 'Intermediate'
  },
  // Add more patterns...
]);

const addToCart = (pattern) => {
  // Implement cart functionality
  console.log('Adding to cart:', pattern);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article 
      v-for="pattern in patterns" 
      :key="pattern.id"
      class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <img :src="pattern.image" :alt="pattern.title" class="w-full h-64 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ pattern.title }}</h3>
        <p class="text-gray-600 mt-1">${{ pattern.price.toFixed(2) }}</p>
        <div class="flex gap-2 mt-2">
          <span class="text-sm bg-gray-100 px-2 py-1 rounded">{{ pattern.category }}</span>
          <span class="text-sm bg-gray-100 px-2 py-1 rounded">{{ pattern.yarnWeight }}</span>
        </div>
        <button 
          @click="addToCart(pattern)"
          class="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </article>
  </div>
</template>