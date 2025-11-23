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

  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '© Google',
  }).addTo(map)

  // const basemaps = {
  //   OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '© OpenStreetMap contributors',
  //   }),
  //   'Esri Streets': L.tileLayer(
  //     'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  //     {
  //       attribution: '© Esri',
  //     },
  //   ),
  //   'Esri Satellite': L.tileLayer(
  //     'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  //     {
  //       attribution: '© Esri, Maxar',
  //     },
  //   ),
  //   'Carto Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  //     attribution: '© CartoDB',
  //   }),
  //   'Carto Dark': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  //     attribution: '© CartoDB',
  //   }),
  //   'Google Streets': L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //     attribution: '© Google',
  //   }),
  //   'Google Hybrid': L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //     attribution: '© Google',
  //   }),
  //   'Google Satellite': L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //     attribution: '© Google',
  //   }),
  //   'Google Terrain': L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //     attribution: '© Google',
  //   }),
  //   OpenTopoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //     attribution: '© OpenTopoMap',
  //   }),
  //   'Hike & Bike': L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
  //     attribution: '© OpenStreetMap, CC-BY-SA',
  //   }),
  // }

  // // Default base layer
  // basemaps['OpenStreetMap'].addTo(map)

  // // Layer control
  // L.control.layers(basemaps).addTo(map)

  L.marker([lat, lng]).addTo(map).bindPopup('Selected Location').openPopup()
})
</script>

<style>
#map {
  z-index: 1;
}
</style>
