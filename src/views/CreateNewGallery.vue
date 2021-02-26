<template>
  <div>
    <h2 class="m-2">Create  New Gallery</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-field mb-3">
        <label for="title">Title</label>
        <input class="form-control" type="text" v-model="formData.title">
      </div>

      <div class="form-field mb-3">
        <label for="description">Description</label>
        <input class="form-control" type="text" v-model="formData.description">
      </div>

       <div class="form-field" v-for="(imageUrl ,index) in formData.imageUrls" :key="index">
        <label for="imageUrl">{{index+1}}. Image</label>
        <input type="text" class="form-control" v-model="imageUrl.value">
        <span>
          <a v-show="formData.imageUrls.length > 1" class="btn btn-danger" @click="removeField(index)">X</a>
          <a class="btn btn-info m-4" @click="addField()">Add another Image</a>
        </span>
        </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data(){
    return{
      formData: {
        title: "",
        description: "",
        imageUrls: [
          {}
        ]
      }
    }
  },

  methods: {
    ...mapActions('galleries', ['createGallery']),
   async onSubmit(){
      try{
      await this.createGallery(this.formData);
        this.$router.push('/my-galleries');
      } catch(error){
        console.log(error)
      }
    },

    addField() {
      this.formData.imageUrls.push({ value:'' });
    },
    removeField(index) {
      this.formData.imageUrls.splice(index,1);
    }
  }
}
</script>

<style>

</style>
