<template>
  <q-page padding>
    <div class="marquee-wrapper">
      <div class="marquee">
        Breaking News: DPS Maps launches new features! &nbsp; | &nbsp; ရန်ကုန်နှင့်
        မြန်မာပြည်မြေပုံများ အထူးဈေးနှုန်း ( 50% လျော့ဈေး ) ဖြင့် ရယူလိုက်ပါ ( 2026 Jan 15 အထိသာ)
        &nbsp; | &nbsp; Visit dpsmap.com for more updates! &nbsp; | &nbsp; Download maps for offline
        use!
      </div>
    </div>
    <br />

    <!--  -->
    <div class="q-pa-md">
      <q-carousel
        swipeable
        v-model:fullscreen="fullscreen"
        animated
        v-model="slide"
        :autoplay="autoplay"
        ref="carousel"
        class="home-carousel"
        infinite
      >
        <q-carousel-slide :name="1" img-src="/images/quasar_cv_banner.png" />
        <q-carousel-slide :name="2" img-src="/images/yangon.jpg" />
        <q-carousel-slide :name="3" img-src="/images/shan.jpg" />
        <q-carousel-slide :name="4" img-src="/images/mandalay.jpg" />

        <template v-slot:control>
          <q-carousel-control position="bottom-left" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>

          <q-carousel-control
            position="top-right"
            :offset="[18, 18]"
            class="text-white rounded-borders"
            style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
          >
            <q-toggle dense dark color="orange" v-model="autoplay" label="Auto Play" />
          </q-carousel-control>

          <q-carousel-control position="bottom-right" :offset="[18, 18]" class="q-gutter-xs">
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <!--  -->
    <div class="text-h6 q-mb-md">Latest News</div>

    <q-list bordered>
      <q-item v-for="n in news" :key="n.id">
        <q-item-section>
          <q-item-label>{{ n.title }}</q-item-label>
          <q-item-label caption>{{ n.date }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!--  -->
    <br />
    <div class="text-h6 q-mb-md">Maps</div>

    <div class="row items-start q-gutter-md">
      <q-card class="my-card col-12 col-md-4" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Jpg,Vinyl</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Yangon</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="/images/yangon.jpg" />
          </q-card-section>
        </q-card-section>

        <q-separator />
        <!--  -->
        <q-card-actions>
          <!-- <q-btn flat round icon="event" /> -->
          <q-btn flat> 250,000 MMK </q-btn>
          <q-btn flat color="primary" @click="openViberChat()"> Buy Now </q-btn>
        </q-card-actions>
      </q-card>
      <!--  -->
      <q-card class="my-card col-12 col-md-4" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Jpg,Vinyl</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Mandalay</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="/images/mandalay.jpg" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <!-- <q-btn flat round icon="event" /> -->
          <q-btn flat> 250,000 MMK </q-btn>
          <q-btn flat color="primary" @click="openViberChat()"> Buy Now </q-btn>
        </q-card-actions>
      </q-card>
      <!--  -->
      <q-card class="my-card col-12 col-md-4" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Nook</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Yangon Township Map Book</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="/images/book.png" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <!-- <q-btn flat round icon="event" /> -->
          <q-btn flat> 250,000 MMK </q-btn>
          <q-btn flat color="primary" @click="openViberChat()"> Buy Now </q-btn>
        </q-card-actions>
      </q-card>
      <!--  -->
      <q-card class="my-card col-12 col-md-4" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Jpg,Vinyl</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Shan</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="/images/shan.jpg" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <!-- <q-btn flat round icon="event" /> -->
          <q-btn flat> 250,000 MMK </q-btn>
          <q-btn flat color="primary" @click="openViberChat()"> Buy Now </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <!--  -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" square icon="phone" direction="left">
        <q-fab-action square @click="callPhoneNumber" color="primary" icon="call" />
        <q-fab-action square @click="openViberChat" color="purple" icon="message" />
        <q-fab-action square @click="openMessenger" color="blue" icon="facebook" />
      </q-fab>
    </q-page-sticky>
    <!--  -->
  </q-page>
</template>

<style>
/* Marquee Styling */
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: #0e1e2f;
  color: white;
  padding: 6px 0;
}

.dark .marquee-wrapper {
  background-color: #212121;
  color: #00bcd4;
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.home-carousel .q-carousel__slide {
  background-position: center;
  background-size: cover;
}

@media (max-width: 600px) {
  .home-carousel .q-carousel__slide {
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { Device } from '@capacitor/device'

const slide = ref(1)
const autoplay = ref(true)
const fullscreen = ref(false)
const news = ref([
  { id: 1, title: 'Breaking: Quasar 2.10 Released', date: 'Nov 2, 2025' },
  { id: 2, title: 'Vue 3 Composition API Deep Dive', date: 'Nov 1, 2025' },
  { id: 3, title: 'Laravel 11 Features Announced', date: 'Oct 30, 2025' },
])

const logDeviceInfo = async () => {
  const info = await Device.getInfo()

  console.log(info)
}

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo()
  if (info) {
    console.log(info)
  }
}

const logLanguageCode = async () => {
  const info = await Device.getLanguageCode()
  console.log(info)
}

const openViberChat = () => {
  // Format the phone number (remove any non-digit characters and add country code)
  const phoneNumber = '959775204020' // Add country code 95 for Myanmar

  // For mobile apps
  const viberAppUrl = `viber://add?number=${phoneNumber}`

  // For web fallback
  const viberWebUrl = `https://viber.com/chat?number=${phoneNumber}`

  // Try to open Viber app
  window.location.href = viberAppUrl

  // Fallback to Viber web if the app doesn't open
  setTimeout(() => {
    window.location.href = viberWebUrl
  }, 500)
}

const callPhoneNumber = () => {
  const phoneNumber = '959775204020'
  window.location.href = `tel:${phoneNumber}`
}

const openMessenger = () => {
  const messengerUrl = 'https://m.me/myanmarofficedirectory' // Replace with your Facebook Page username
  window.open(messengerUrl, '_blank')
}

onMounted(() => {
  logDeviceInfo()
  logBatteryInfo()
  logLanguageCode()
})

// we are using QResizeObserver to keep
// this example mobile-friendly

// const visible = ref(false)

// const step = ref(1)
</script>
