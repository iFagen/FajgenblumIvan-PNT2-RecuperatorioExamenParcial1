<template>
  <section class="src-components-estructura">
    <div class="jumbotron">
        <h1>Lista de usuarios</h1>
        <div class="table-responsive ">

            <table class="table">
                <tr class="bg-dark text-white ">
                    <th>Número de pregunta </th>
                    <th>Respuesta</th>
                </tr>
                <tr>   
                    <td>1</td>
                    <td>A</td>
                </tr>
                <tr>   
                    <td>2</td>
                    <td>A, C y E</td>
                </tr>
                <tr>   
                    <td>3</td>
                    <td>C</td>
                </tr>
                <tr>   
                    <td>4</td>
                    <td>B</td>
                </tr>
                <tr>   
                    <td>5</td>
                    <td>B</td>
                </tr>
            </table>

        </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-preguntas",
  props: [],
  mounted() {

  },
  data() {
    return {
 
    };
  },
  methods: {

  },
  computed: {

  },
};
</script>

<style scoped lang="css">

    .jumbotron {
    background-color: rgb(253, 253, 253);
    color: rgb(0, 0, 0);
    }

</style>
