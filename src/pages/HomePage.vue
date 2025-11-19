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

    <!-- <div class="q-pa-md">
      <q-video :ratio="16 / 9" src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />
    </div> -->
    <!--  -->
    <!-- <div class="q-pa-md">
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="Select campaign settings" icon="settings" :done="step > 1">
          For each ad campaign that you create, you can control how much you're willing to spend on
          clicks and conversions, which networks and geographical locations you want your ads to
          show on, and more.
        </q-step>

        <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads which target a shared set of keywords.
        </q-step>

        <q-step :name="3" title="Ad template" icon="assignment" disable>
          This step won't show up because it is disabled.
        </q-step>

        <q-step :name="4" title="Create an ad" icon="add_comment">
          Try out different ad text to see what brings in the most customers, and learn how to
          enhance your ads using features like ad extensions. If you run into any problems with your
          ads, find out how to tell if they're running and how to resolve approval issues.
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 4 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div> -->
    <!-- show example map -->
    <!-- <div class="q-pa-md" style="max-width: 500px">
      <q-toggle v-model="visible" label="Show Example Map" class="q-mb-md" />

      <q-slide-transition>
        <div v-show="visible">
          <img class="responsive" src="https://cdn.quasar.dev/img/quasar.jpg" />
        </div>
      </q-slide-transition>
    </div> -->
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

const news = ref([
  { id: 1, title: 'Breaking: Quasar 2.10 Released', date: 'Nov 2, 2025' },
  { id: 2, title: 'Vue 3 Composition API Deep Dive', date: 'Nov 1, 2025' },
  { id: 3, title: 'Laravel 11 Features Announced', date: 'Oct 30, 2025' },
])

// const visible = ref(false)

// const step = ref(1)
</script>
