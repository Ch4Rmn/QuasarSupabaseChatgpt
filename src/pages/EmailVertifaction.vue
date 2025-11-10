<template>
  <q-page class="q-pa-md">
    <h3>Thank for Registation!</h3>
    <p>
      plz email comfirmation sir
      <a v-if="$route.query.email" href="https://workspace.google.com/intl/en-US/gmail/">{{
        $route.query.email
      }}</a>
    </p>
  </q-page>
</template>

<script setup></script>
