<template>

  <section class="src-components-formularioVue">

    <div class="jumbotron">
      <h1>Formulario </h1>

          <form novalidate autocomplete="off" @submit.prevent="enviar()">

          <!-- Nombre -->
          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="$v.f.nombre.$model"
                >

                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.nombre.required.$invalid">El campo es obligatorio</div>
                </div>
          </div>

          <!-- DNI -->
          <div class="form-group">
                <label for="dni">DNI</label>
                <input 
                    type="number"
                    id="dni"
                    class="form-control"
                    v-model.number="$v.f.dni.$model"
                >

                <div v-if="$v.f.dni.$error && $v.f.dni.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.dni.required.$invalid">El campo es obligatorio</div>
                </div>
          </div>
          
          <!-- Monto a Pagar -->
          <div class="form-group">
                <label for="montoAPagar">Monto a Pagar</label>
                <input 
                    type="number"
                    id="montoAPagar"
                    class="form-control"
                    v-model.number="$v.f.montoAPagar.$model"
                >

                <div v-if="$v.f.montoAPagar.$error && $v.f.montoAPagar.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.montoAPagar.required.$invalid">El campo es obligatorio</div>
                </div>
          </div>

          <!-- Pago que realizo -->
          <div class="form-group">
                <label for="pagoRealizado">Pago realizado</label>
                <input 
                    type="number"
                    id="pagoRealizado"
                    class="form-control"
                    v-model.number="$v.f.pagoRealizado.$model"
                >

                <div v-if="$v.f.pagoRealizado.$error && $v.f.pagoRealizado.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.pagoRealizado.required.$invalid">El campo es obligatorio</div>
                </div>
          </div>

          <!-- Enviar -->
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="$v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form> 

      <hr/>
        <h1>Lista de usuarios</h1>
        <div class="table-responsive ">

            <table class="table">
                <tr class="bg-dark text-white ">
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Monto a pagar</th>
                    <th>Pago realizado</th>
                    <th>Fecha de creacion</th>
                    <th>Saldo</th>
                </tr>
                <tr
                    v-for="(pago, index) in pagos"
                    :key="index"
                    :style="{color: white, background: colorSaldo(pago.id)}"
                >   
                    <td>{{ pago.nombre }}</td>
                    <td>{{ pago.dni }}</td>
                    <td>${{ pago.montoAPagar }}</td>
                    <td>${{ pago.pagoRealizado }}</td>
                    <td>{{ formatoFecha(pago.fechaDeCreacion) }}</td>
                    <td>${{ pago.saldo  }}</td>
                </tr>
            </table>

        </div>

    </div>

  </section>

</template>

<script>
  import { required } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario-pagos',
    props: [],
    mounted () {
        this.getDatos()
    },
    data () {
      return {
          url : 'https://5f96610111ab98001603a8ef.mockapi.io/pagos',
          f: this.resetForm(),
          pagos:[]
      }
    },
    validations: {
      f: {
        nombre: { 
          required,
        },
        dni: { 
          required,
        },
        montoAPagar: { 
          required,

        },
        pagoRealizado: { 
          required,
        }
      }
    },
    methods: {

      async getDatos() {
        try {
          let res = await this.axios(this.url)
              this.pagos = res.data
              console.log(res.data);
            }
            catch(error) {
              console.log('Error get', error)
            }
        },

        async sendDatos(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              this.pagos.push(datos)
              console.log(res.data)
            }
            catch(error) {
              console.log('Error post', error)
            }
        },

        async enviar() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
              let form = this.f
              await this.sendDatos(form)
              this.f = this.resetForm()
              this.$v.$reset()
            }
        },
        
        resetForm() {
            return {
              nombre: '',
              dni: '',
              montoAPagar: '',
              pagoRealizado : ''
            }
        },

        formatoFecha(fecha){ 
          return new Date(fecha).toLocaleString()
        },

        colorSaldo(id){
          let pago = this.pagos.find(p => p.id == id)
          pago.saldo = pago.montoAPagar - pago.pagoRealizado 

          let colorSaldo
          if(pago.saldo == 0 ) colorSaldo = 'green'
          if(pago.saldo < 0 ) colorSaldo = 'red'
          if(pago.saldo > 0 ) colorSaldo = 'blue'

          return colorSaldo
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .jumbotron {
    background-color: rgb(62, 114, 19);
    color: white;
  }

</style>
