<script setup>
import {ref} from "vue";
import Dropdown from 'primevue/dropdown';

const value = ref(null);

const selectedCity = ref();
const cities = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
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
  <div class="equip__wrapper d-flex flex-column">
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
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a User" class="w-full md:w-14rem"/>
        <Button icon="pi pi-times" label="" severity="equip-closebtn" aria-label="Cancel" class="rounded-circle"/>
      </div>
    </div>
    <nav class="equip__nav d-flex justify-content-between">
      <div class="d-flex align-items-center is-active">
        <a href="#">Upload template library</a>
      </div>
      <div class="d-flex align-items-center">
        <a href="#">Upload spreadsheet</a>
      </div>
      <div class="d-flex align-items-center">
        <a href="#">Select content</a>
      </div>
      <div class="d-flex align-items-center">
        <a href="#">Select lessons</a>
      </div>
      <div class="d-flex align-items-center">
        <a href="#">Generate lessons</a>
      </div>
      <div class="d-flex align-items-center">
        <a href="#">Summary</a>
      </div>
    </nav>
    <div class="equip__content d-flex">
      <!--first screen-->
<!--      <div class="d-flex flex-column align-items-center justify-content-center w-100">-->
<!--        <h2>Hello, Johnson Dope!</h2>-->
<!--        <p>What would you like to do today?</p>-->
<!--        <div class="d-flex gap-4">-->
<!--          <button type="button" class="btn btn-primary">Review lessons</button>-->
<!--          <button type="button" class="btn btn-primary">Generate lessons</button>-->
<!--        </div>-->
<!--      </div>-->
      <!--/first screen-->
      <!--second screen-->
      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <h2>Upload template library</h2>
        <div class="card">
          <Toast />
          <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">

            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
              <div class="d-flex flex-column justify-content-between align-items-center gap-2">
                <div class="d-flex gap-2">
                  <Button @click="chooseCallback()" class="btn btn-primary">Choose file</Button>
                  <Button @click="uploadEvent(uploadCallback)" severity="success" :disabled="!files || files.length === 0" class="btn btn-success">Upload Files</Button>
                  <Button @click="clearCallback()" severity="danger" :disabled="!files || files.length === 0" class="btn btn-danger">Remove Files</Button>
                </div>
                <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                ><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar
                >
              </div>
            </template>
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
              <div v-if="files.length > 0">
                <h5>Pending</h5>
                <div class="d-flex flex-wrap p-0 sm:p-5 gap-5">
                  <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                    <div>
                      <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                    </div>
                    <span>{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Pending" severity="warning" />
                    <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                  </div>
                </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                <h5>Completed</h5>
                <div class="d-flex flex-wrap p-0 sm:p-5 gap-5">
                  <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 d-flex flex-column border-1 surface-border align-items-center gap-3">
                    <div>
                      <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                    </div>
                    <span class="font-semibold">{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Completed" class="mt-3" severity="success" />
                    <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" />
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div class="d-flex align-items-center justify-content-center flex-column">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                  <g clip-path="url(#clip0_73_8227)">
                    <path d="M31.1666 39H12.8333C11.8608 39 10.9282 38.6137 10.2406 37.9261C9.55293 37.2384 9.16663 36.3058 9.16663 35.3333V9.66667C9.16663 8.69421 9.55293 7.76157 10.2406 7.07394C10.9282 6.38631 11.8608 6 12.8333 6H25.6666L34.8333 15.1667V35.3333C34.8333 36.3058 34.447 37.2384 33.7593 37.9261C33.0717 38.6137 32.1391 39 31.1666 39Z" fill="#0090DA" fill-opacity="0.1" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25.6666 6V13.3333C25.6666 13.8196 25.8598 14.2859 26.2036 14.6297C26.5474 14.9735 27.0137 15.1667 27.5 15.1667H34.8333" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 31.6667V22.5" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 31.6666V29.8333" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M27.5 31.6667V26.1667" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_73_8227">
                      <rect width="44" height="44" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
                <p class="mt-4 mb-0 text-center">Drag and drop template library here to upload.<br>
                  Template should be in .docx format.</p>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
      <!--/second screen-->
    </div>
  </div>
</template>