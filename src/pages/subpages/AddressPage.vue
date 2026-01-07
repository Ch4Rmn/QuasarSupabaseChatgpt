<template>
  <q-page class="q-pa-md">
    <!-- filter -->
    <div class="row q-gutter-md q-mb-md">
      <q-select
        outlined
        dense
        label="Country"
        v-model="selectedCountry"
        :options="countryOptions"
        :loading="loading"
        option-label="label"
        option-value="value"
        emit-value
        map-options
        class="min-width-200"
        placeholder="Select Country"
      />

      <q-select
        outlined
        dense
        label="Township"
        v-model="selectedTownship"
        :options="townshipOptions"
        option-label="label"
        option-value="value"
        :loading="loading"
        emit-value
        map-options
      />

      <q-select
        outlined
        dense
        label="Street"
        v-model="selectedStreet"
        :options="streetOptions"
        option-label="label"
        option-value="value"
        emit-value
        map-options
      />

      <q-select
        outlined
        dense
        label="HomeNumber"
        v-model="selectedHomeNumber"
        :options="homeNumberOptions"
        option-label="label"
        option-value="value"
        emit-value
        map-options
        class="min-width-200"
        placeholder="Select HomeNumber"
      />
    </div>

    <!-- table -->
    <q-table
      title="POI List"
      flat
      bordered
      :pagination="pagination"
      :filter="filter"
      :rows="filteredRows"
      :columns="columns"
      row-key="ID"
      @row-click="showDetail"
    >
      <template v-slot:top-right>
        <q-input
          bordered
          label="Search"
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          outlined
          class="q-ml-md"
        >
          <template #append><q-icon name="search" /></template>
        </q-input>
      </template>
    </q-table>

    <!-- dialog -->
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="text-h6 text-primary"> Address Details </q-card-section>

        <q-card-section v-if="selectedRow">
          <div><strong>ID:</strong> {{ selectedRow.ID }}</div>
          <div><strong>DPS ID:</strong> {{ selectedRow.DPS_ID }}</div>
          <div><strong>Home Number:</strong> {{ selectedRow.HN_Eng }}</div>
          <div><strong>Street:</strong> {{ selectedRow.St_N_Eng }}</div>
          <div><strong>Ward:</strong> {{ selectedRow.Ward_N_Eng }}</div>
          <div><strong>Township:</strong> {{ selectedRow.Tsp_N_Eng }}</div>
          <div><strong>District:</strong> {{ selectedRow.Dist_N_Eng }}</div>
          <div><strong>Country:</strong> {{ selectedRow.Country_N }}</div>
          <div><strong>Postal Code:</strong> {{ selectedRow.Postal_Cod }}</div>
          <div class="q-mt-sm">
            <b>Location:</b>
            <q-btn
              flat
              dense
              color="primary"
              @click="
                goMap(
                  selectedRow.Latitude,
                  selectedRow.Longitude,
                  selectedRow.HN_Eng,
                  selectedRow.Ward_N_Eng,
                )
              "
            >
              {{ selectedRow?.Latitude }}, {{ selectedRow?.Longitude }}
            </q-btn>
          </div>
          <div>
            <QRCodeVue
              :value="`https://www.google.com/maps/place/${selectedRow.Latitude},${selectedRow.Longitude}`"
              :size="200"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserApiStore } from 'src/stores/user'
import QRCodeVue from 'qrcode.vue'

const router = useRouter()
const userStore = useUserApiStore()

const rows = ref([])
const loading = ref(false)
const filter = ref('')

const selectedCountry = ref(null)
const selectedTownship = ref(null)
const selectedStreet = ref(null)
const selectedHomeNumber = ref(null)

// col
const columns = [
  // { name: 'ID', label: 'ID', field: 'ID', align: 'left' },
  // { name: 'DPS_ID', label: 'DPS ID', field: 'DPS_ID', align: 'left' },
  { name: 'HN_Eng', label: 'HN Eng', field: 'HN_Eng', align: 'left' },
  { name: 'HN_Myn', label: 'HN Myn', field: 'HN_Myn', align: 'left' },
  { name: 'Postal_Cod', label: 'Postal Code', field: 'Postal_Cod', align: 'left' },
  { name: 'St_N_Eng', label: 'Street Eng', field: 'St_N_Eng', align: 'left' },
  { name: 'Ward_N_Eng', label: 'Ward Eng', field: 'Ward_N_Eng', align: 'left' },
  { name: 'Tsp_N_Eng', label: 'Township Eng', field: 'Tsp_N_Eng', align: 'left' },
  { name: 'Dist_N_Eng', label: 'District Eng', field: 'Dist_N_Eng', align: 'left' },
  { name: 'Country_N', label: 'Country', field: 'Country_N', align: 'left' },
  { name: 'Longitude', label: 'Longitude', field: 'Longitude', align: 'left' },
  { name: 'Latitude', label: 'Latitude', field: 'Latitude', align: 'left' },
]

const pagination = ref({
  page: 1,
  rowsPerPage: 25,
})

function goMap(lat, lng) {
  // const label = `${hn} ${ward}`,
  router.push(`/map?lat=${lat}&lng=${lng}`)
  // window.open(
  //   `https://www.google.com/maps?q=${lat},${lng}&z=15`,
  //   // `https://www.google.com/maps?q=${lat},${lng}(${encodeURIComponent(label)})&z=15`,
  //   '_blank',
  // )
}

// options start
const countryOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.Country_N))]
    .filter((v) => v)
    .map((v) => ({ label: v, value: v })),
)

const townshipOptions = computed(() =>
  rows.value
    .filter((r) => !selectedCountry.value || r.Country_N === selectedCountry.value)
    .map((r) => r.Tsp_N_Eng)
    .filter((v, i, arr) => v && arr.indexOf(v) === i)
    .map((v) => ({ label: v, value: v })),
)

const streetOptions = computed(() =>
  rows.value
    .filter(
      (r) =>
        (!selectedCountry.value || r.Country_N === selectedCountry.value) &&
        (!selectedTownship.value || r.Tsp_N_Eng === selectedTownship.value),
    )
    .map((r) => r.St_N_Eng)
    .filter((v, i, arr) => v && arr.indexOf(v) === i)
    .map((v) => ({ label: v, value: v })),
)

const homeNumberOptions = computed(() =>
  rows.value
    .filter(
      (r) =>
        (!selectedCountry.value || r.Country_N === selectedCountry.value) &&
        (!selectedTownship.value || r.Tsp_N_Eng === selectedTownship.value) &&
        (!selectedStreet.value || r.St_N_Eng === selectedStreet.value),
    )
    .map((r) => r.HN_Eng)
    .filter((v, i, arr) => v && arr.indexOf(v) === i)
    .map((v) => ({ label: v, value: v })),
)

// filter rows start
const filteredRows = computed(() =>
  rows.value.filter(
    (r) =>
      (!selectedCountry.value || r.Country_N === selectedCountry.value) &&
      (!selectedTownship.value || r.Tsp_N_Eng === selectedTownship.value) &&
      (!selectedStreet.value || r.St_N_Eng === selectedStreet.value) &&
      (!selectedHomeNumber.value || r.HN_Eng === selectedHomeNumber.value),
  ),
)
// filter rows end

// dialog show start
const dialog = ref(false)
const selectedRow = ref(null)

const showDetail = (event, row) => {
  selectedRow.value = row
  dialog.value = true
}
// dialog show end

const handleList = async () => {
  loading.value = true
  try {
    const data = await userStore.list('address')
    rows.value = Array.isArray(data) ? data : []
    console.log(rows.value)
  } catch (err) {
    console.error(err)
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await handleList()
  if (countryOptions.value.length > 0) {
    selectedCountry.value = countryOptions.value[0].value
  }
  if (townshipOptions.value.length > 0) {
    selectedTownship.value = townshipOptions.value[0].value
  }
  if (streetOptions.value.length > 0) {
    selectedStreet.value = streetOptions.value[0].value
  }
  if (homeNumberOptions.value.length > 0) {
    selectedHomeNumber.value = homeNumberOptions.value[0].value
  }
})
</script>
