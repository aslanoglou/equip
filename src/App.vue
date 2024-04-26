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

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Abort lesson generation process?</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to abort the process of lesson generation? Your progress will be lost.
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Abort lesson generation</button>
          <button type="button" class="btn btn-primary">Continue generating</button>
        </div>
      </div>
    </div>
  </div>


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
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a User"
                  class="w-full md:w-14rem"/>
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
      <div class="d-flex w-100">
        <!--Upload Template Library-->
        <div class="flex-grow-1 d-flex flex-column align-items-center upload-template-library">
          <h2 class="mt-auto">Upload template library</h2>
          <div class="d-flex justify-content-center align-items-center mb-auto card card--upload">
            <Toast/>
            <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="false"
                        accept="/*" :maxFileSize="1000000" @select="onSelectedFiles">

              <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="d-flex flex-column justify-content-between align-items-center gap-2">
                  <div class="d-flex gap-2">
                    <Button @click="chooseCallback()" class="btn btn-outline-primary d-flex "><span class="pi pi-upload me-2"></span><span class="text-nowrap">Choose file</span></Button>
                    <Button @click="uploadEvent(uploadCallback)" severity="success"
                            :disabled="!files || files.length === 0" class="btn btn-outline-success text-nowrap">Upload Files
                    </Button>
                    <Button @click="clearCallback()" severity="danger" :disabled="!files || files.length === 0"
                            class="btn btn-outline-danger text-nowrap">Remove Files
                    </Button>
                  </div>

                </div>
              </template>
              <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">


                <!--File Details-->
                <div class="px-3 overflow-hidden file-details">
                  <ProgressBar :value="totalSizePercent" :showValue="true"
                               :class="['d-block w-100 mb-3 file-details__progress-bar', { 'exceeded-progress-bar': totalSizePercent > 100 }]">
                    <!-- <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>-->
                  </ProgressBar>
                  <div class="d-flex mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                      <mask id="mask0_364_144" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="41"
                            height="41">
                        <rect x="0.5" y="0.5" width="40" height="40" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_364_144)">
                        <path
                            d="M14.25 30.0833H26.7499V27.5834H14.25V30.0833ZM14.25 23.4167H26.7499V20.9168H14.25V23.4167ZM11.0128 36.3333C10.1709 36.3333 9.45833 36.0417 8.875 35.4583C8.29167 34.875 8 34.1624 8 33.3205V7.67958C8 6.83769 8.29167 6.12508 8.875 5.54175C9.45833 4.95841 10.1709 4.66675 11.0128 4.66675H24.25L32.9999 13.4167V33.3205C32.9999 34.1624 32.7083 34.875 32.1249 35.4583C31.5416 36.0417 30.829 36.3333 29.9871 36.3333H11.0128ZM23 14.6667V7.16671H11.0128C10.8846 7.16671 10.7671 7.22012 10.6602 7.32696C10.5534 7.43382 10.5 7.55136 10.5 7.67958V33.3205C10.5 33.4487 10.5534 33.5663 10.6602 33.6731C10.7671 33.78 10.8846 33.8334 11.0128 33.8334H29.9871C30.1153 33.8334 30.2328 33.78 30.3397 33.6731C30.4465 33.5663 30.5 33.4487 30.5 33.3205V14.6667H23Z"
                            fill="#696969"/>
                      </g>
                    </svg>
                    <div class="ms-2">
                      <h4 class="file-details__title">Level C Reading V3_Vocabulary.doc</h4>
                      <div class="file-details__size">32 KB</div>
                    </div>
                    <button class="p-button p-component p-button-icon-only p-button-equip-closebtn border-0 ms-auto"
                            type="button" aria-label="Cancel" data-pc-name="button" data-pc-section="root"
                            data-p-severity="equip-closebtn" data-pd-ripple="true" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <span class="p-button-icon pi pi-times" data-pc-section="icon"></span><span class="p-button-label"
                                                                                                  data-pc-section="label">&nbsp;</span>
                    </button>
                  </div>
                </div>
                <!--/File Details-->
                <div class="text-danger d-flex align-items-center mt-2"><i
                    class="pi pi-exclamation-circle me-2"></i><span>This file type is not supported. Please try again with .docx format.</span>
                </div>

                <div v-if="files.length > 0">
                  <h5>Pending</h5>
                  <div class="d-flex flex-wrap p-0 sm:p-5 gap-5">
                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                         class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                      <div>
                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50"/>
                      </div>
                      <span>{{ file.name }}</span>
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge value="Pending" severity="warning"/>
                      <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                              outlined rounded severity="danger"/>
                    </div>
                  </div>
                </div>

                <div v-if="uploadedFiles.length > 0">
                  <h5>Completed</h5>
                  <div class="d-flex flex-wrap p-0 sm:p-5 gap-5">
                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                         class="card m-0 px-6 d-flex flex-column border-1 surface-border align-items-center gap-3">
                      <div>
                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50"/>
                      </div>
                      <span class="font-semibold">{{ file.name }}</span>
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge value="Completed" class="mt-3" severity="success"/>
                      <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded
                              severity="danger"/>
                    </div>
                  </div>
                </div>
              </template>
              <template #empty>
                <div class="d-flex align-items-center justify-content-center flex-column">
                  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                    <g clip-path="url(#clip0_73_8227)">
                      <path
                          d="M31.1666 39H12.8333C11.8608 39 10.9282 38.6137 10.2406 37.9261C9.55293 37.2384 9.16663 36.3058 9.16663 35.3333V9.66667C9.16663 8.69421 9.55293 7.76157 10.2406 7.07394C10.9282 6.38631 11.8608 6 12.8333 6H25.6666L34.8333 15.1667V35.3333C34.8333 36.3058 34.447 37.2384 33.7593 37.9261C33.0717 38.6137 32.1391 39 31.1666 39Z"
                          fill="#0090DA" fill-opacity="0.1" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round"
                          stroke-linejoin="round"/>
                      <path
                          d="M25.6666 6V13.3333C25.6666 13.8196 25.8598 14.2859 26.2036 14.6297C26.5474 14.9735 27.0137 15.1667 27.5 15.1667H34.8333"
                          stroke="#0090DA" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.5 31.6667V22.5" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M22 31.6666V29.8333" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M27.5 31.6667V26.1667" stroke="#0090DA" stroke-width="2.3" stroke-linecap="round"
                            stroke-linejoin="round"/>
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
          <div class="upload-template-library__bottom-btn-area d-flex justify-content-end w-100 p-5">
            <!-- Remove disabled and the button color is blue-->
            <button class="btn btn-primary" disabled>Proceed</button>
          </div>
        </div>
        <!--Upload Template Library-->
      </div>
      <!--/second screen-->
    </div>
  </div>
</template>