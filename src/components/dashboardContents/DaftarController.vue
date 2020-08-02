<template>
<v-container fluid>
        <v-card class="mx-auto" max-width="800">
        <v-flex xs12 class="text-xs-center" mt-5>
            <h2 class="text-center">Signup</h2>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
            <form>
                    <v-flex>
                        <v-text-field name="username" label="username" id="username" type="username" v-model="form.username" required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field name="email" label="email" id="email" type="email" v-model="form.email" required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field name="password" label="Password" id="password" type="password" v-model="form.password" required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <input type="file" accept="image/" label="Select an Image" @change="uploadFoto">
                    </v-flex>
                    <div class="text-center">
                        <v-btn depressed rounded large style="text-transform: none !important;" color="primary" @click="setForm()">Sign Up</v-btn>
                    </div>
            </form>
        </v-flex>
        </v-card>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }}
        <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                foto: '',
            },
            snackbar: false,
            color: null,
            text: '',
            load: false,
            user: new FormData,
            typeInput: 'new',
            errors: '',
            errors: ''
        }
    },
    methods: {
        sendData() {
            this.user.append('username', this.form.username);
            this.user.append('email', this.form.email);
            this.user.append('password', this.form.password);
            this.user.append('foto',this.form.foto);
            var uri = this.$apiUrl + '/User'
            console.log(uri);
            // this.load = true
            this.$http.post(uri, this.user).then(response => {
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = response.data.message; //memasukkan pesan ke snackbar 
                this.load = false;
                this.dialog = false
                // this.getData(); //mengambil data user 
                this.resetForm();
                this.$router.push({ name: "loginPage" }); 
            }).catch(error => {
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false; 
            })
        },
        uploadFoto(event) {
            console.log(event);
            this.form.foto = event.target.files[0];
        },
        setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                console.log("dddd")
                this.updateData()
            }
        },
        resetForm(){ 
                this.form = {
                    username: '',
                    email: '',
                    password: '',
                } 
            } 
    }
}
</script>
