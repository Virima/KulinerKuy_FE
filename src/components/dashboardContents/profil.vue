<template>
<v-container>
    <v-spacer></v-spacer>
<v-card
    class="mx-auto"
    max-width="500"
    top="20">
    <h2 class="text-center">Profil</h2> 
    <v-card-text class="justify-center">
        <v-form>
            <v-img
                :src = "$apiUrl2 + 'profile_pict/' + foods.foto"
                class="grey lighten-2"
                width="450"
                max-height="300"
            ></v-img>
            <v-checkbox v-model="disabled" class="mx-2" label="Ganti Foto"></v-checkbox>
            <input :disabled="!disabled" type="file" accept="image/*" label="Select an Image*" @change="onFileSelected"  required>
            <br>
            <v-text-field
                outlined
                v-model="foods.username"
                counter
                maxlength="15"
                label="Username"
            ></v-text-field>

            <v-text-field
                v-model="foods.email"
                outlined
                counter
                maxlength="15"
                label="Email"
                required
            >{{foods.username}}</v-text-field>

            <v-text-field
                v-model="foods.password"
                outlined
                type="password"
                label="password"
                required
            ></v-text-field>
            
            <div class="text-center">
                <v-btn  
                depressed 
                rounded 
                large 
                style="text-transform: none !important;"
                color="primary"
                @click="setForm()">Send</v-btn>
            </div>
        </v-form>
    </v-card-text>
</v-card>
<v-snackbar 
            v-model="snackbar"
            :color="color" 
            :multi-line="true" 
            :timeout="3000" 
        > {{ text }} 
            <v-btn dark text @click="snackbar = false" > Close </v-btn> 
        </v-snackbar> 
</v-container>
</template>
<script> 
    export default { 
        data () { 
            return { 
                dialog: false,
                tempTampil:[], 
                keyword: '', 
                foods: [], 
                snackbar: false, 
                color: null, 
                text: '', 
                load: false,
                disabled: false,
                form: { 
                    username: '',
                email: '',
                password: '',
                foto: '', 
                }, 
                user : new FormData, 
                typeInput: 'new', 
                errors : '', 
                updatedId : '', 
            } 
        }, 
        methods:{ 
            getData(){ 
                const auth = {
                headers: {Authorization: localStorage.getItem('token')} 
                }
                var useria = localStorage.getItem('username')
                var uri = this.$apiUrl + '/user?username=' + useria 
                this.$http.get(uri,auth).then(response =>{ 
                    this.foods=response.data.message 
                }) 
            },
            sendData() {
                this.user.append('username', this.foods.username);
                this.user.append('email', this.foods.email);
                this.user.append('password', this.foods.password);
                this.user.append('foto',this.foods.foto);
                console.log(this.user.email)
                var useria = localStorage.getItem('username')
                var uri = this.$apiUrl + '/User/'+useria
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
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false; 
                })
            },
            setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                console.log("dddd")
                this.updateData()
            }
        },
            onFileSelected(event) {
                console.log(event)
                this.foods.foto = event.target.files[0];
            },
            tampil(item){
                this.form.nama_makanan = item.nama_makanan;
                this.form.foto = item.foto;
                this.form.review = item.review;
                this.form.id = item.id;
                this.dialog = true; 
            }, 
            resetForm(){ 
                this.form = {
                    name : '', 
                    email : '', 
                    password : '' 
                } 
            } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>