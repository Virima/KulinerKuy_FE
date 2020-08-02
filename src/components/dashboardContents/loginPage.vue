<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.username" label="Username" name="username" type="text" />

                  <v-text-field
                    v-model="form.password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions align="center">
                <v-spacer />
                <v-btn @click="login()" color="primary">Login</v-btn>
                <v-btn router to="/daftar" color="primary">Sign UP</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      user: new FormData()
    };
  },
   methods: {
     login() {
       var url = this.$apiUrl + '/auth';
       this.user = new FormData();
       this.user.append("username", this.form.username);
       this.user.append("password", this.form.password);
       this.$http.post(url, this.user).then(response => {
         if (response.data.token) {
           localStorage.setItem("token", response.data.token);
           localStorage.setItem("username",this.form.username);
          //  headers.setItem("token", response.data.token);
           console.log(localStorage)
           this.$router.push({ name: "UserController" });
         } else {
           alert("gagal login");
         }
       });
     }
   }
};
</script>

