<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div v-if="loading" class="q-pa-md" style="width: 100%">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left" style="width: 150px">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th v-for="n in 10" :key="n" class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 20" :key="n">
              <td class="text-left">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
              <td v-for="i in 5" :key="i" class="text-right">
                <q-skeleton animation="blink" type="text" width="50px" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <q-table
        v-else
        @row-click="openDialog"
        title="POI List"
        style="width: 100%"
        flat
        dense
        class="my-sticky-header-table"
        bordered
        :loading="false"
        :rows="filteredRows"
        :columns="columns"
        row-key="Sort_ID"
        :filter="filter"
        :visible-columns="visibleColumns"
        :pagination="pagination"
        @update:pagination="(val) => (pagination = val)"
      >
        <template v-slot:body-cell-Longitude="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              color="primary"
              @click.stop="goMap(props.row.Latitude, props.row.Longitude)"
            >
              {{ props.row.Longitude }}
            </q-btn>
          </q-td>
        </template>

        <template v-slot:body-cell-Latitude="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              color="primary"
              @click.stop="goMap(props.row.Latitude, props.row.Longitude)"
            >
              {{ props.row.Latitude }}
            </q-btn>
          </q-td>
        </template>

        <template v-slot:body-cell-POI_N_Eng="props">
          <q-td :props="props">
            <q-item class="row items-center no-wrap">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ (props.row.POI_N_Eng || '').charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <div>
                  <table style="border-collapse: collapse; font-size: 13px">
                    <tr>
                      <td style="padding: 0 6px 2px 0; font-weight: 600">Myanmar</td>
                      <td style="padding: 0 0 2px 6px" class="text-primary">
                        {{ toUni(props.row.POI_N_Zaw) }}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 2px 0; font-weight: 600">English</td>
                      <td style="padding: 0 0 2px 6px" class="text-primary">
                        {{ props.row.POI_N_Eng }}
                      </td>
                    </tr>
                    <!-- <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Win</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.POI_N_Win }}</td>
                    </tr> -->
                    <tr>
                      <td style="padding: 0 6px 2px 0; font-weight: 600">Street</td>
                      <td style="padding: 0 0 2px 6px">{{ props.row.St_N_Eng }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Township</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.Tsp_N_Eng }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Type</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.Type }}</td>
                    </tr>
                  </table>
                </div>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:top>
          <div class="row q-gutter-sm items-center no-wrap">
            <q-btn v-if="isDesktop && userRole == 'admin'" color="primary" label="Create" />
            <q-btn icon="refresh" @click="refresh" color="primary" label="Refresh" />

            <q-btn
              v-if="isDesktop && userRole == 'admin'"
              color="primary"
              icon-right="archive"
              label="Export CSV"
              no-caps
              @click="exportTable"
            />

            <q-select
              v-if="isDesktop && userRole == 'admin'"
              v-model="visibleColumns"
              multiple
              outlined
              dense
              options-dense
              display-value="Columns"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              option-label="label"
              style="min-width: 100px"
            />
          </div>

          <q-space />

          <div class="row q-gutter-sm q-mx-md">
            <q-select
              outlined
              dense
              options-dense
              v-model="filterTownship"
              :options="townshipOptions"
              label="Township"
              clearable
              style="min-width: 140px"
            />
            <q-select
              outlined
              dense
              options-dense
              v-model="filterType"
              :options="typeOptions"
              label="Type"
              clearable
              style="min-width: 140px"
            />
          </div>

          <q-input
            bordered
            label="Search"
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            outlined
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-action="props" v-if="isDesktop && userRole == 'admin'">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn color="primary" dense label="Edit" />
            <q-btn color="negative" dense label="Destroy" />
          </q-td>
        </template>
      </q-table>

      <q-dialog v-model="detailDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">{{ selectedRow?.POI_N_Eng }}</div>
            <div class="text-h6">{{ toUni(selectedRow?.POI_N_Zaw) }}</div>
            <div class="text-subtitle2">Type: {{ selectedRow?.Type }}</div>
            <div class="text-caption">Township: {{ selectedRow?.Tsp_N_Eng }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div><b>Street:</b> {{ selectedRow?.St_N_Eng }}</div>
            <div><b>Ward:</b> {{ selectedRow?.Ward_N_Eng }}</div>
            <div><b>District:</b> {{ selectedRow?.Dist_N_Eng }}</div>

            <div class="q-mt-sm">
              <b>Location:</b>
              <q-btn
                flat
                dense
                color="primary"
                @click="goMap(selectedRow.Latitude, selectedRow.Longitude)"
              >
                {{ selectedRow?.Latitude }}, {{ selectedRow?.Longitude }}
              </q-btn>
            </div>
            <div class="q-mt-md flex flex-center">
              <QRCodeVue
                v-if="selectedRow"
                :value="`https://www.google.com/maps?q=${selectedRow.Latitude},${selectedRow.Longitude}`"
                :size="200"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar, exportFile } from 'quasar'
import { useUserApiStore } from 'src/stores/user'
import { useAuthStore } from 'stores/auth'
// import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'
import QRCodeVue from 'qrcode.vue'
// ✅ Safe Rabbit Node Import
import * as rabbit from 'rabbit-node'

// --- 1. SETUP & UTILS ---
const $q = useQuasar()
// const router = useRouter()
const auth = useAuthStore()
const user = useUserApiStore()
const userStore = useUserApiStore()

// Safe Converter Function
const toUni = (text) => {
  if (!text) return ''
  // Try to find the correct function depending on import structure
  const converter = rabbit.zg2uni || (rabbit.default && rabbit.default.zg2uni)
  if (typeof converter === 'function') {
    return converter(text)
  }
  return text
}

// --- 2. STATE ---
const rows = ref([])
const loading = ref(true)
const filter = ref('')
const userRole = ref(null)
const realtimeChannel = ref(null)
const isDesktop = computed(() => $q.platform.is.desktop)

// --- 3. FILTER VARIABLES ---
const filterTownship = ref(null)
const filterType = ref(null)

// --- 4. TABLE CONFIG ---
const pagination = ref({ page: 1, rowsPerPage: 25 })

const visibleColumns = ref([
  'Type',
  'Sub_Type',
  'St_N_Eng',
  'POI_N_Eng',
  'Ward_N_Eng',
  'Tsp_N_Eng',
  'Dist_N_Eng',
  'Longitude',
  'Latitude',
  'Verify_date',
  'action',
])

const columns = [
  { name: 'Sort_ID', label: 'Sort ID', field: 'Sort_ID', sortable: true, align: 'left' },
  { name: 'DPS_ID', label: 'DPS ID', field: 'DPS_ID', sortable: true, align: 'left' },
  { name: 'Source', label: 'Source', field: 'Source', sortable: true, align: 'left' },
  { name: 'POI_N_Eng', label: 'POI Name (Eng)', field: 'POI_N_Eng', sortable: true, align: 'left' },
  { name: 'POI_N_Myn3', label: 'POI Name (Myn)', field: 'POI_N_Myn3', align: 'left' },
  { name: 'Type', label: 'Type', field: 'Type', sortable: true, align: 'left' },
  { name: 'Sub_Type', label: 'Sub Type', field: 'Sub_Type', align: 'left' },
  { name: 'Postal_Code', label: 'Postal Code', field: 'Postal_Code', align: 'left' },
  { name: 'St_N_Eng', label: 'Street (Eng)', field: 'St_N_Eng', align: 'left' },
  { name: 'Ward_N_Eng', label: 'Ward (Eng)', field: 'Ward_N_Eng', align: 'left' },
  { name: 'Tsp_N_Eng', label: 'Township (Eng)', field: 'Tsp_N_Eng', align: 'left' },
  { name: 'Dist_N_Eng', label: 'District (Eng)', field: 'Dist_N_Eng', align: 'left' },
  { name: 'Longitude', label: 'Longitude', field: 'Longitude', align: 'left' },
  { name: 'Latitude', label: 'Latitude', field: 'Latitude', align: 'left' },
  { name: 'Verify_date', label: 'Verify Date', field: 'Verify_date', align: 'left' },
  { name: 'Project', label: 'Project', field: 'Project', align: 'left' },
  { name: 'action', label: 'Action', field: 'action', align: 'left' },
]

// --- 5. LOGIC: COMPUTED OPTIONS & FILTERING ---

// Generate Unique Township Options
const townshipOptions = computed(() => {
  const unique = [...new Set(rows.value.map((row) => row.Tsp_N_Eng))]
  return unique.filter(Boolean).sort()
})

// Generate Unique Type Options
const typeOptions = computed(() => {
  const unique = [...new Set(rows.value.map((row) => row.Type))]
  return unique.filter(Boolean).sort()
})

// Main Filter Logic (Filters + Search)
const filteredRows = computed(() => {
  return rows.value.filter((row) => {
    // Check Township
    const matchTownship = filterTownship.value ? row.Tsp_N_Eng === filterTownship.value : true

    // Check Type
    const matchType = filterType.value ? row.Type === filterType.value : true

    return matchTownship && matchType
  })
})

// --- 6. ACTIONS ---

const loadUserRole = async () => {
  if (auth.user?.id) {
    const userData = await user.getByIdForColumns('users', auth.user.id, 'role')
    userRole.value = userData?.role || null
  }
}

const handleList = async () => {
  loading.value = true
  try {
    const data = await userStore.list('business2026')
    rows.value = data || []
  } catch (err) {
    $q.notify({ message: 'Failed to load data', color: 'negative' })
    rows.value = []
    console.error('handleList error', err)
  } finally {
    loading.value = false
  }
}

const refresh = async () => {
  userStore.clearCache('business_list')
  await handleList()
}

function goMap(lat, lng) {
  // router.push(`/map?lat=${lat}&lng=${lng}`)
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
}

// Dialog Logic
const detailDialog = ref(false)
const selectedRow = ref(null)

function openDialog(evt, row) {
  selectedRow.value = row
  detailDialog.value = true
}

// --- 7. REALTIME ---
async function startRealtime() {
  if (realtimeChannel.value) return
  realtimeChannel.value = supabase
    .channel('business_list_realtime')
    .on('postgres_changes', { event: '*', table: 'business_list' }, async () => {
      userStore.clearCache('business_list')
      await handleList()
    })
    .subscribe()
}

async function stopRealtime() {
  if (!realtimeChannel.value) return
  await supabase.removeChannel(realtimeChannel.value)
  realtimeChannel.value = null
}

// --- 8. EXPORT CSV ---
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val
  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)
  formatted = formatted.split('"').join('""')
  return `"${formatted}"`
}

const exportTable = () => {
  // Use filteredRows so we export only what we see
  const dataToExport = filteredRows.value

  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      dataToExport.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n')

  const status = exportFile('table-export.csv', content, 'text/csv')
  if (status !== true) {
    $q.notify({ message: 'Browser denied file download...', color: 'negative', icon: 'warning' })
  }
}

// --- 9. LIFECYCLE ---
onMounted(() => {
  loadUserRole()
  handleList()
  startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime()
})
</script>

<style scoped>
.my-sticky-header-table {
  /* height or max-height is important */
  height: calc(100vh - 100px);
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #fff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}
</style>
