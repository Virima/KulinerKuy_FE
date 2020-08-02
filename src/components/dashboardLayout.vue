<template>
  <div>
    <v-navigation-drawer
      v-model="drawer" expand-on-hover class="grey darken-3" dark app clipped fixed temporary
    >
      <v-list-item router to= '/YourProfil'>
        <v-list-item-avatar>
          <v-img src="../assets/man.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{username}}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" router :to= "item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <template v-slot:append> 
                <div class="pa-2"> 
                    <v-btn @click="logout()" block>Logout</v-btn>
                </div> 
            </template> 
    </v-navigation-drawer>
    <v-app-bar dark app fixed clipped-left height="70px" color="grey darken-3"> 
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
            <VSpacer /> 
        </v-app-bar> 
        <VContent > 
            <router-view /> 
        </VContent> 
  </div>
</template>

 

<script> 
export default { 
    data () { 
        return { 
            username:localStorage.getItem('username'),
            drawer: null, 
            items: [ 
                { title: 'Review Makanan', icon: 'mdi-food', link: '/makanan' }, 
                { title: 'Review Hotel', icon: 'mdi-hotel', link: '/hotelReview'},
                { title: 'Favorite', icon: 'mdi-star-circle', link: '/fav'},
                { title: 'Create FoodReview ', icon: 'mdi-plus-circle-outline', link: '/createFood'},
                { title: 'Create HotelReview ', icon: 'mdi-plus-circle-outline', link: '/createHotel'},
                { title: 'Your Review', icon: 'mdi-file-multiple', link: '/YourReview'},
            ],
            mini: true, 
        } 
    },
    methods: {
            logout()
            {
                localStorage.removeItem('token')
                this.$router.push({name : "loginPage"})
            }
        } 
} 
</script>