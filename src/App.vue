<script setup>
import {ref} from "vue";
import Dropdown from 'primevue/dropdown';

const value = ref(null);

const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);


</script>

<template>
  <div class="equip__sidebar d-flex flex-column align-items-center pt-4">
    <a href="#" class="equip__sidebar__logo">
      <img src="./assets/EQUIP-logo.png" width="74" height="38" alt="EQUIP Education Quality Improvement Program">
    </a>
    <a href="#" class="equip__sidebar__hut">
      <img src="./assets/hut.svg" width="44" height="35" alt="">
    </a>
    <a href="#" class="equip__sidebar__s">
      <img src="./assets/s-sidebar.png" width="57" height="56" alt="">
    </a>
  </div>
  <div class="equip__wrapper">
    <div class="equip__header d-flex justify-content-between align-items-center">
      <h1 class="equip__header__title mb-3">
        Generate lessons
      </h1>
      <div class="equip__header__right-col d-flex gap-2 align-items-center">
        <figure class="d-flex justify-content-center align-items-center mb-0">
          <span>
            JS
          </span>
        </figure>
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a User" class="w-full md:w-14rem" />
      </div>

    </div>
  </div>
</template>