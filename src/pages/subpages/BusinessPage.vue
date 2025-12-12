<!--  -->
<template>
  <q-page class="q-pa-md">
    <div class="row">
      <!-- show skeleton while loading -->
      <div v-if="loading" class="q-pa-md" style="width: 100%">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left" style="width: 150px">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="n in 20" :key="n">
              <td class="text-left">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="50px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="35px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="65px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="25px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- real table -->
      <q-table
        @row-click="openDialog"
        v-else
        title="POI List"
        style="width: 100%"
        flat
        dense
        class="my-sticky-header-table"
        bordered
        :loading="false"
        :rows="rows"
        :columns="columns"
        row-key="Sort_ID"
        :filter="filter"
        :visible-columns="visibleColumns"
        :pagination="pagination"
        @update:pagination="(val) => (pagination = val)"
      >
        <!--  -->

        <!--  -->
        <template v-slot:body-cell-Longitude="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              color="primary"
              @click="goMap(props.row.Latitude, props.row.Longitude)"
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
              @click="goMap(props.row.Latitude, props.row.Longitude)"
            >
              {{ props.row.Latitude }}
            </q-btn>
          </q-td>
        </template>

        <!-- custom cell: show avatar and small table for Street (St_N_Eng) -->
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
                      <td style="padding: 0 6px 2px 0; font-weight: 600">Street</td>
                      <td style="padding: 0 0 2px 6px">{{ props.row.St_N_Eng }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">POI</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.POI_N_Eng }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Township</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.Tsp_N_Eng }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Type</td>
                      <td style="padding: 0 0 0 6px">{{ props.row.Type }}</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 6px 0 0; font-weight: 600">Location</td>
                      <q-btn
                        flat
                        dense
                        color="primary"
                        @click.stop="goMap(props.row.Latitude, props.row.Longitude)"
                        style="min-height: 0; min-width: 0; padding: 0; font-size: 13px"
                      >
                        {{ props.row.Latitude }}, {{ props.row.Longitude }}
                      </q-btn>
                    </tr>
                  </table>
                </div>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <!--  -->
        <template v-slot:top>
          <q-btn
            v-if="isDesktop && userRole == 'admin'"
            color="primary"
            label="Create"
            class="q-mr-md"
          />
          <q-btn icon="refresh" @click="refresh" color="primary" label="Refresh" class="q-mr-md" />

          <q-btn
            v-if="isDesktop && userRole == 'admin'"
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
          <!-- <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          /> -->

          <q-select
            v-if="isDesktop && userRole == 'admin'"
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            label="visible columns"
            :options="columns"
            option-value="name"
            option-label="label"
            options-cover
            style="min-width: 200px; margin-left: 20px"
          />

          <q-space />
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

        <template v-slot:body-cell-action="props" v-if="isDesktop && userRole == 'admin'">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn color="primary" dense>Edit</q-btn>
            <q-btn color="negative" dense>Destroy</q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="detailDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">{{ selectedRow?.POI_N_Eng }}</div>
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
            <div>
              <QRCodeVue
                :value="`https://www.google.com/maps/place/${selectedRow.Latitude},${selectedRow.Longitude}`"
                :size="200"
              />
            </div>

            <!-- <div class="q-mt-sm"><b>Verify Date:</b> {{ selectedRow?.Verify_date }}</div> -->
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
import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'
import QRCodeVue from 'qrcode.vue'

const pagination = ref({
  page: 1,
  rowsPerPage: 25,
})

//  <h4>Welcome, {{ auth.user?.email }}</h4>
//     <p>User ID: {{ auth.user?.id }}</p>
//     <p>User Created_at: {{ auth.user?.created_at }}</p>

const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()
const user = useUserApiStore()
const userRole = ref(null)
const realtimeChannel = ref(null)

const isDesktop = computed(() => $q.platform.is.desktop)
console.log('isDesktop', isDesktop.value)
const userStore = useUserApiStore()

// const getUser = async() => {
//   await user.getById('users')
// }

function goMap(lat, lng) {
  router.push(`/map?lat=${lat}&lng=${lng}`)
  // window.open(`https://www.google.com/maps?q=${lat},${lng}&z=15`, '_blank')
}

const loadUserRole = async () => {
  const userId = auth.user.id

  const userData = await user.getByIdForColumns('users', userId, 'role')

  userRole.value = userData.role
  // console.log('hello' + userRole.value)
}
const rows = ref([])
const loading = ref(true)
const filter = ref('')
const visibleColumns = ref([
  // 'Sort_ID',
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

const handleList = async () => {
  loading.value = true
  try {
    const data = await userStore.list('business_list')
    rows.value = data || []
  } catch (err) {
    $q.notify({ message: 'Failed to load data', color: 'negative' })
    rows.value = []
    console.error('handleList error', err)
  } finally {
    loading.value = false
  }
}

const detailDialog = ref(false)
const selectedRow = ref(null)

function openDialog(evt, row) {
  selectedRow.value = row
  detailDialog.value = true
}

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
  console.log('Realtime stopped')
}

// export csv
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) =>
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
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}

const refresh = async () => {
  userStore.clearCache('business_list')
  rows.value = await userStore.list('business_list')
  // alert('click')
}

onMounted(() => {
  loadUserRole()
  handleList() //  auto load real data
  startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime()
})
</script>
