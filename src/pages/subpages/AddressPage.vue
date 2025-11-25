<template>
  <q-page class="q-pa-md">
    <!-- Filters -->
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
        clearable
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
        emit-value
        map-options
        clearable
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
        clearable
      />
    </div>

    <q-table
      title="POI List"
      flat
      dense
      bordered
      :pagination="pagination"
      :filter="filter"
      :rows="filteredRows"
      :columns="columns"
      row-key="ID"
    >
      <!-- Search bar in table header -->
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
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-Longitude="props">
        <q-td :props="props">
          <q-btn flat dense color="primary" @click="goMap(props.row.Latitude, props.row.Longitude)">
            {{ props.row.Longitude }}
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-Latitude="props">
        <q-td :props="props">
          <q-btn flat dense color="primary" @click="goMap(props.row.Latitude, props.row.Longitude)">
            {{ props.row.Latitude }}
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserApiStore } from 'src/stores/user'

const router = useRouter()
const userStore = useUserApiStore()
const rows = ref([])
const loading = ref(false)
const filter = ref('')

// Select box models
const selectedCountry = ref(null)
const selectedTownship = ref(null)
const selectedStreet = ref(null)

// Table columns
const columns = [
  { name: 'ID', label: 'ID', field: 'ID', align: 'left' },
  { name: 'DPS_ID', label: 'DPS ID', field: 'DPS_ID', align: 'left' },
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

// Computed options for select boxes
const countryOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.Country_N))]
    .filter((v) => v !== null && v !== undefined && v !== '')
    .map((v) => ({ label: v, value: v })),
)

const townshipOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.Tsp_N_Eng))]
    .filter((v) => v !== null && v !== undefined && v !== '')
    .map((v) => ({ label: v, value: v })),
)

const streetOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.St_N_Eng))]
    .filter((v) => v !== null && v !== undefined && v !== '')
    .map((v) => ({ label: v, value: v })),
)

// Filtered rows based on select boxes
const filteredRows = computed(() =>
  rows.value.filter((row) => {
    return (
      (!selectedCountry.value || row.Country_N === selectedCountry.value) &&
      (!selectedTownship.value || row.Tsp_N_Eng === selectedTownship.value) &&
      (!selectedStreet.value || row.St_N_Eng === selectedStreet.value)
    )
  }),
)

const goMap = (lat, lng) => {
  router.push(`/map?lat=${lat}&lng=${lng}`)
}

// Load data
const handleList = async () => {
  loading.value = true
  try {
    const data = await userStore.list('address_list')
    // console.log('Data from API:', data)
    rows.value = Array.isArray(data) ? data : []
    console.log('ROWS LENGTH:', rows.value.length)
    console.log('FIRST ROW:', rows.value[0])
  } catch (err) {
    console.error('handleList error', err)
    rows.value = []
  } finally {
    loading.value = false
  }
}

// console.log('ONE ROW:', rows.value[0])

// console.log(`data is row` + rows.value[0])

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
})
</script>
