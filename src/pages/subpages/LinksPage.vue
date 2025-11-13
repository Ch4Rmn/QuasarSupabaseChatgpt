<template>
  <q-page class="q-pa-md">
    <!-- <h5 class="text-primary text-center q-mb-lg">DPS Map Links</h5> -->

    <div class="q-gutter-md column">
      <q-btn
        v-for="(site, index) in sites"
        :key="index"
        :color="site.color"
        :label="site.label"
        :icon="site.icon"
        glossy
        @click="openSite(site.url, site.label)"
      />
    </div>

    <!-- Website Preview Dialog -->
    <q-dialog v-model="showWeb" maximized>
      <q-card style="height: 100vh">
        <q-bar class="bg-primary text-white">
          <div class="text-h6">{{ currentTitle }}</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-bar>

        <iframe
          :src="currentUrl"
          style="width: 100%; height: calc(100vh - 50px); border: none"
        ></iframe>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const showWeb = ref(false)
const currentUrl = ref('')
const currentTitle = ref('')

// 🔹 Dynamic Website Data Array
const sites = ref([
  { label: 'Homepage', url: 'https://dpsmap.com', color: 'primary', icon: 'home' },
  { label: 'Yangon Maps', url: 'https://dpsmap.com/yangon', color: 'secondary', icon: 'map' },
  {
    label: 'Mandalay Maps',
    url: 'https://dpsmap.com/mandalay',
    color: 'accent',
    icon: 'explore',
  },
  { label: 'Bago Maps', url: 'https://dpsmap.com/bago', color: 'deep-orange', icon: 'place' },
  {
    label: 'Naypyitaw Maps',
    url: 'https://dpsmap.com/naypyitaw',
    color: 'purple',
    icon: 'emoji_objects',
  },
  {
    label: 'Contact Us',
    url: 'https://dpsmap.com/contact',
    color: 'teal',
    icon: 'contact_page',
  },
  { label: 'About DPSMAP', url: 'https://dpsmap.com/about', color: 'indigo', icon: 'info' },
])

// 🔹 Function to open selected site in dialog
const openSite = (url, label) => {
  currentUrl.value = url
  currentTitle.value = label
  showWeb.value = true
}
</script>
