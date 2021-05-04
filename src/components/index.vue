<template>
  <div class="container">
      <div class="container">
        <div class="float-end p-4">
          <router-link to="/add-category">
            <button class="btn btn-primary">Add category</button>
          </router-link>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">price</th>
                <th scope="col">parent Name</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody  v-if="listCategory.length > 0">
              <tr v-for="(list,i) in listCategory" :key="i">
                <th scope="row">{{ i+1 }}</th>
                <td>{{ list.name }}</td>
                <td>{{ list.price }}</td>
                <td>{{ parent(list.category_id) }}</td>
                <td><a href="#" @click="deletes(list.id)">Delete</a></td>
                <td><router-link :to="'/update/'+ list.id"><a href="#">Update</a></router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-4" v-if="listCategory.length > 0">
          <childComponent :dataTree="listCategory"></childComponent>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import childComponent from './CategoryTree';
export default {
  name: 'HelloWorld',
  props: ['dataTree'],
  components:{
    childComponent
  },
  data() {
      return {
        listCategory:[],
      }
  },
   mounted(){
     this.categoryList();
  },
  methods:{
    async categoryList() {
       await axios.get('http://localhost:8000/api/getCategoryList').then((response) =>{
            if(response.data.data.length > 0) {
                this.listCategory = response.data.data;
            }else {
                this.listCategory =[];
            }
        })
    },
    parent(id) { 
       let data =  id != null ? this.listCategory.find( data => data.id == id) : '';
        return data.name;
    },
    deletes(ids){
      axios.post('http://localhost:8000/api/delete', {id : ids}).then((response) =>{
          console.log(response);
          this.listCategory =  this.listCategory.splice(ids, 1);
      })
    }
  }
}
</script>

