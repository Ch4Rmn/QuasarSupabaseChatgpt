<template>
  <q-page class="q-pa-none window-height window-width relative-position">
    <div ref="mapContainer" class="full-width full-height"></div>

    <q-btn
      icon="arrow_back"
      round
      color="white"
      text-color="black"
      class="absolute-top-left q-ma-md shadow-2"
      style="z-index: 2000"
      @click="$router.back()"
    />

    <div class="absolute-top-right q-ma-md column q-gutter-y-sm" style="z-index: 2000">
      <q-btn round color="white" text-color="dark" class="shadow-2">
        <q-icon
          name="explore"
          size="sm"
          :style="{ transform: `rotate(${heading}deg)`, transition: 'transform 0.3s' }"
          color="red"
        />
      </q-btn>
      <q-btn round color="white" text-color="dark" icon="layers" class="shadow-2">
        <q-menu anchor="center left" self="center right">
          <q-list style="min-width: 150px">
            <q-item clickable v-close-popup @click="switchLayer('street')">
              <q-item-section avatar><q-icon name="map" /></q-item-section>
              <q-item-section>Street Map</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="switchLayer('satellite')">
              <q-item-section avatar><q-icon name="satellite" /></q-item-section>
              <q-item-section>Satellite</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn
        round
        color="white"
        text-color="primary"
        icon="my_location"
        class="shadow-2"
        @click="recenterMap"
      />
    </div>

    <transition name="q-transition--slide-up">
      <q-card
        v-if="routeInfo.hasRoute"
        class="absolute-bottom q-ma-md shadow-10 bg-white"
        style="z-index: 2000; border-radius: 16px; margin-bottom: 30px; bottom: 86px"
      >
        <q-list dense>
          <q-item class="q-pt-sm">
            <q-item-section avatar>
              <q-icon name="place" color="red" size="md" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold text-subtitle1">Destination</q-item-label>
              <q-item-label
                caption
                class="ellipsis-2-lines text-grey-8"
                style="max-width: 280px; line-height: 1.2"
              >
                {{ routeInfo.address }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset />

          <q-item class="q-pb-md">
            <q-item-section>
              <div class="row items-center justify-around q-mt-sm">
                <div class="col-auto text-center">
                  <div class="text-h6 text-weight-bold text-primary">{{ routeInfo.distance }}</div>
                  <div class="text-caption text-grey-7">Distance</div>
                </div>
                <q-separator vertical />
                <div class="col-auto text-center">
                  <div class="text-h6 text-weight-bold text-primary">{{ routeInfo.time }}</div>
                  <div class="text-caption text-grey-7">Est. Time</div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </transition>

    <q-inner-loading :showing="loading" style="z-index: 3000" color="primary">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-primary q-mt-sm">Locating...</div>
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, markRaw } from 'vue'
import L from 'leaflet'
import { useRoute } from 'vue-router'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'

// Icons Fix
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const route = useRoute()
const mapContainer = ref(null)
const loading = ref(true)
const heading = ref(0)

const routeInfo = reactive({
  hasRoute: false,
  distance: '',
  time: '',
  address: 'Loading address...', // Default text
})

let map = null
let routingControl = null
let userMarker = null
let tileLayers = {}
let currentLayer = null

onMounted(async () => {
  const destLat = parseFloat(route.query.lat)
  const destLng = parseFloat(route.query.lng)

  if (isNaN(destLat) || isNaN(destLng)) {
    loading.value = false
    return
  }

  // --- 1. GET REAL ADDRESS (Responsive Data) ---
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${destLat}&lon=${destLng}`,
    )
    const data = await response.json()
    // Use the road name or fallback to display name
    routeInfo.address = data.address.road || data.address.suburb || data.display_name.split(',')[0]
  } catch (error) {
    error.message
    routeInfo.address = 'Selected Location' // Fallback if API fails
  }

  // --- 2. MAP SETUP ---
  const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  })
  const satLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19 },
  )
  tileLayers = { street: streetLayer, satellite: satLayer }

  map = markRaw(
    L.map(mapContainer.value, {
      preferCanvas: true,
      zoomControl: false,
      layers: [streetLayer],
    }).setView([destLat, destLng], 14),
  )
  currentLayer = streetLayer

  L.control.zoom({ position: 'bottomleft' }).addTo(map)
  L.marker([destLat, destLng], { icon: redIcon }).addTo(map)

  // --- 3. TRACKING ---
  map.locate({ setView: false, watch: true, enableHighAccuracy: true })

  map.on('locationfound', (e) => {
    loading.value = false
    const newLoc = e.latlng

    if (userMarker) userMarker.setLatLng(newLoc)
    else userMarker = L.marker(newLoc, { icon: blueIcon }).addTo(map).bindPopup('<b>You</b>')

    if (!routingControl) {
      routingControl = L.Routing.control({
        waypoints: [newLoc, L.latLng(destLat, destLng)],
        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
        lineOptions: { styles: [{ color: '#1976D2', opacity: 0.8, weight: 6 }] },
        createMarker: () => null,
        addWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
      }).addTo(map)

      routingControl.on('routesfound', (ev) => {
        const summary = ev.routes[0].summary
        routeInfo.distance = (summary.totalDistance / 1000).toFixed(1) + ' km'
        routeInfo.time = Math.round(summary.totalTime / 60) + ' min'
        routeInfo.hasRoute = true
      })
      routingControl.on('routingerror', () => (loading.value = false))
    }
  })

  map.on('locationerror', () => {
    loading.value = false
  })
  if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', handleOrientation)
})

const handleOrientation = (event) => {
  if (event.webkitCompassHeading) heading.value = event.webkitCompassHeading
  else if (event.alpha) heading.value = 360 - event.alpha
}

const switchLayer = (type) => {
  if (!map) return
  if (currentLayer) map.removeLayer(currentLayer)
  tileLayers[type].addTo(map)
  currentLayer = tileLayers[type]
}

const recenterMap = () => {
  if (map && userMarker) map.flyTo(userMarker.getLatLng(), 17, { duration: 1.5 })
  else alert('Waiting for GPS...')
}

onUnmounted(() => {
  window.removeEventListener('deviceorientation', handleOrientation)
  if (map) {
    map.stopLocate()
    map.remove()
    map = null
  }
})
</script>

<style>
.leaflet-routing-container {
  display: none !important;
}
</style>
