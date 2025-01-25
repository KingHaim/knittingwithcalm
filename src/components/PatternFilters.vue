<script setup>
import { ref } from 'vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
});

const selectedFilters = ref({
  categories: [],
  yarnWeight: [],
  skillLevel: [],
  age: []
});

const emit = defineEmits(['filter-change']);

const updateFilter = (category, value) => {
  if (selectedFilters.value[category].includes(value)) {
    selectedFilters.value[category] = selectedFilters.value[category].filter(item => item !== value);
  } else {
    selectedFilters.value[category].push(value);
  }
  emit('filter-change', selectedFilters.value);
};
</script>

<template>
  <aside class="bg-white p-6 rounded-lg shadow-sm">
    <div v-for="(options, category) in filters" :key="category" class="mb-6">
      <h3 class="text-lg font-semibold mb-3 capitalize">{{ category }}</h3>
      <div class="space-y-2">
        <label 
          v-for="option in options" 
          :key="option"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <input 
            type="checkbox"
            :value="option"
            :checked="selectedFilters[category].includes(option)"
            @change="updateFilter(category, option)"
            class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <span class="text-gray-700">{{ option }}</span>
        </label>
      </div>
    </div>
  </aside>
</template>