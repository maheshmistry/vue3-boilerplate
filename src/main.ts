import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

// using services from openapi-ts generator was not properly working with custom error handling.
// If worked properly, would be able to directly use the api endpoints from services.gen.ts as an axios client to access api

// import { client } from './client';
// import { handleError } from "./api/client";

// client.setConfig({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: { [import.meta.env.VITE_AUTH_KEY]: import.meta.env.VITE_AUTH_VALUE}
// });

// client.instance.interceptors.response.use(response => response, handleError)
