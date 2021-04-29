<template>
  <div class="container">
    <div class="container"> 
     <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label float-start">Select Category</label>
            <select class="form-select" aria-label="Default select example" v-model="category.category_id ">
                <option disabled selected>-- select list --</option>
                <option v-for="(list,i) in listCategory" :key="i" :value="list.id"  v-show="listCategory.length >0">{{ list.name }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label float-start">Name</label>
            <input type="text" v-model="category.name"  class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label float-start">Price</label>
            <input type="number" v-model="category.price" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click.prevent="submitForm" :disabled="isDisabled">Submit</button>
     </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
        category:{
           category_id : null,
           name: '',
           price:'' 
        },
        listCategory:[],
      }
  },
  computed: {
    isDisabled() { return !this.category.name || !this.category.price; },
  },
  mounted(){
     this.categoryList();
  },
  methods:{
    categoryList() {
        axios.get('http://localhost:8000/api/getCategoryList').then((response) =>{
            if(response.data.data.length > 0) {
                this.listCategory = response.data.data;
                this.datafilter();
            }else {
                this.listCategory =[];
            }
        })
    }, 
    datafilter() {
        let idget = this.$route.params.id;
        this.category = this.listCategory.find(data => data.id == idget);
    },
    submitForm() {
        axios.put('http://localhost:8000/api/update/'+this.$route.params.id, this.category).then((response) => {
            console.log(response);
            this.$router.push('/');
        })
    },
      
  }
}
</script>
