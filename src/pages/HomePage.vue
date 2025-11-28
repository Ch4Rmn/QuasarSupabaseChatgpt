<template>
  <q-page padding>
    <div class="marquee-wrapper">
      <div class="marquee">
        Breaking News: DPS Maps launches new features! &nbsp; | &nbsp; Dark mode is now available!
        &nbsp; | &nbsp; Visit dpsmap.com for more updates! &nbsp; | &nbsp; Download maps for offline
        use!
      </div>
    </div>
    <br />

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
    <div class="q-pa-md">
      <q-carousel
        swipeable
        v-model:fullscreen="fullscreen"
        animated
        v-model="slide"
        :autoplay="autoplay"
        ref="carousel"
        infinite
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />

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

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat> 7:30PM </q-btn>
          <q-btn flat color="primary"> Reserve </q-btn>
        </q-card-actions>
      </q-card>
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat> 7:30PM </q-btn>
          <q-btn flat color="primary"> Reserve </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <!--  -->

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
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

<script setup>
import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)
const fullscreen = ref(false)
const news = ref([
  { id: 1, title: 'Breaking: Quasar 2.10 Released', date: 'Nov 2, 2025' },
  { id: 2, title: 'Vue 3 Composition API Deep Dive', date: 'Nov 1, 2025' },
  { id: 3, title: 'Laravel 11 Features Announced', date: 'Oct 30, 2025' },
])

// we are using QResizeObserver to keep
// this example mobile-friendly

// const visible = ref(false)

// const step = ref(1)
</script>
