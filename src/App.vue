<template>

 <v-app>
     <div class="bg">
     <main>
         <router-view></router-view>
     </main>
     </div>
 </v-app>

</template>

<script>
 export default {
     name: 'app',
     watch:{
         '$route':{
             handler:(to,from)=>{
                 document.title = to.meta.title || 'KULINERKUY'
             },immediate:true
         }
     }
 }
</script>
