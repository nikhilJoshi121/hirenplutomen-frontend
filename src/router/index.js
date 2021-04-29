import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Hello from '@/components/index'
import AddCategoryComponent from '@/components/AddCategory'
import UpdateComponent from '@/components/Update'



export default new Router({
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello
      },
      {
        path: '/add-category',
        name: 'AddCategory',
        component: AddCategoryComponent
      },
      {
        path: '/update/:id',
        component: UpdateComponent,
        props: true
      }
    ]
  })