<template>
    <div>
        <ul role="menu" v-if="children">
            <li v-for="item in children" :key="item.id" :class="{ 'has-nested-menu': item.sub_categories.length > 0 }">
                 <a href="#" v-if="item.sub_categories.length > 0">{{ item.name }}</a>
                <ul>
                 <p v-if="item.sub_categories.length === 0">{{ item.name }}</p>
                <ChildComponent v-if="item.sub_categories.length > 0" :dataTree="item.subCategories"></ChildComponent>
                </ul>
                
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "ChildComponent",
    props: ['dataTree'],
    data() {
        return {
           children: this.dataTree
        }
    },
    created(){
        console.log(this.children);
    }
}
</script>