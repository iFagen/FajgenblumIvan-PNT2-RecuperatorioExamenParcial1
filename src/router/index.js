import { createWebHistory, createRouter } from 'vue-router'

import FormularioPagos from '../components/FormularioPagos.vue'
import Preguntas from '../components/Preguntas.vue'
//import { data } from 'jquery'

const routes = [
    { path: '/', name: 'Home', component: FormularioPagos },
    { path: '/formulario', name: 'FormularioPagos', component: FormularioPagos },
    { path: '/preguntas', name: 'Preguntas', component: Preguntas }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 

