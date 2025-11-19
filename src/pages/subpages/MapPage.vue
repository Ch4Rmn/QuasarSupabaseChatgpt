<template>
  <q-page class="q-pa-none">
    <q-btn class="q-mt-md q-ml-md" @click="$router.back()">Back</q-btn>
    <div id="map" style="height: 100vh; width: 100%"></div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  const lat = parseFloat(route.query.lat)
  const lng = parseFloat(route.query.lng)

  const map = L.map('map').setView([lat, lng], 18)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  L.marker([lat, lng]).addTo(map).bindPopup('Selected Location').openPopup()
})
</script>

<style>
#map {
  z-index: 1;
}
</style>
