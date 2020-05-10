<template>
  <v-form class="elevation-3" id="contact-form" ref="form">
          <v-row>
            <v-col cols="12" align="center" class="text-center secondary--text pa-0">
                <h2 class="d-inline pr-1">¡Ayúdanos a mejorar!</h2>
                <v-icon class="d-inline secondary--text  pl-1 mb-3 pb-3">fas fa-bolt</v-icon>
            </v-col>    
          </v-row>
          <v-row>
              <v-col class="text-center secondary--text pb-2">
                  <p class="display-12 mb-0">Deja tu sugerencia para mejorar la calidad de nuestra plataforma y/o servicios.</p>
              </v-col>
          </v-row>         
          <v-row class="pt-0 mt-0">
              <v-col cols="12">
                <v-text-field class="pt-0 mt-0"
                name="Message" v-model="Message" label="Me gustaría que..."
                required :counter="140"
                ></v-text-field>
            </v-col>
          </v-row>
          <div class="center-btn">
            <v-btn class="text-center success secondary--text" @click="submit" width="200" align="center">Enviar</v-btn>
          </div>
          <v-row>
              <v-col class="text-center gray--text">
                <p style="font-size: 15px; color: gray" class="pb-0 mb-0 pt-2">También puedes contactarnos a través de contacto@shipthis.com</p>
              </v-col>
          </v-row>
          
        </v-form>
</template>

<script>
export default {
    name: "ContactForm",
    
    data: () => ({     
      Message: ''        
    }),
    methods: {
      submit () {
        this.$refs.form.validate();
      }
    }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
    
</style>