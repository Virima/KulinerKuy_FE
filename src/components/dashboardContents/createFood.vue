<template>
<v-container>
<v-card
    class="mx-auto"
    max-width="500">
    <h2 class="text-center">Food</h2> 
    <v-card-text>
        <v-form>
            <input type="file" accept="image/*" label="Select an Image*" @change="onFileSelected"  required>
            <v-text-field
                outlined
                v-model="form.nama_makanan"
                counter
                maxlength="15"
                label="Nama Makanan"
            ></v-text-field>

            <v-text-field
                v-model="form.jenis_makanan"
                outlined
                counter
                maxlength="15"
                label="Jenis Makanan"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.alamat"
                outlined
                label="Alamat"
                required
            ></v-text-field>

            <v-textarea
                v-model="form.review"
                label="Message"
                outlined
                counter
                maxlength="200"
                full-width
                single-line
                required
            ></v-textarea>
            
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
 <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }}
        <v-btn dark text @click="snackbar = false"> Close </v-btn>
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
                headers:[
                    { 
                        text: 'No',
                        value: 'no', 
                    }, 
                    { 
                        text: '', 
                        value: '' 
                    }, 
                    { 
                        text: 'Nama Makanan', 
                        value: 'nama_makanan' 
                    }, 
                    { 
                        text: 'Alamat', 
                        value: 'alamat' 
                    }, 
                    { 
                        text: 'Jenis Makanan', 
                        value: 'jenis_makanan' 
                    },
                    { 
                        text: '', 
                        value: null 
                    },
                ],
                foods: [], 
                snackbar: false, 
                color: null, 
                text: '', 
                load: false,
                form: { 
                    id:'',
                    nama_makanan : '', 
                    alamat : '', 
                    jenis_makanan : '',
                    review:'',
                    foto:'', 
                }, 
                food : new FormData, 
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
                var uri = this.$apiUrl + '/makanan' 
                this.$http.get(uri,auth).then(response =>{ 
                    this.foods=response.data.message 
                }) 
            },
            onFileSelected(event) {
                console.log(event)
                this.form.foto = event.target.files[0];
            },
            tampil(item){
                this.form.nama_makanan = item.nama_makanan;
                this.form.foto = item.foto;
                this.form.review = item.review;
                this.form.id = item.id;
                this.dialog = true; 
            },
            tambahfaorite(){
                this.food.append('username',localStorage.getItem('username'));
                this.food.append('id',this.form.id);
                var uri = this.$apiUrl + '/favorite_food'
                this.$http.post(uri,this.food).then(response =>{ 
                    this.snackbar = true;
                    this.color = 'green'; //memberi warna snackbar 
                    this.text = response.data.message;
                }) .catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                    this.load = false; 
                })
            },
            sendData(){ 
                var useria = localStorage.getItem('username')
                this.food.append('nama_makanan', this.form.nama_makanan);
                this.food.append('jenis_makanan', this.form.jenis_makanan); 
                this.food.append('alamat', this.form.alamat); 
                this.food.append('review', this.form.review); 
                this.food.append('foto', this.form.foto);
                this.food.append('username', useria);
                var uri =this.$apiUrl + '/Makanan' 
                this.load = true 
                this.$http.post(uri,this.food).then(response =>{ 
                    this.snackbar = true; //mengaktifkan snackbar 
                    this.color = 'green'; //memberi warna snackbar 
                    this.text = response.data.message; //memasukkan pesan ke snackbar 
                    this.load = false; this.dialog = false 
                    this.getData(); //mengambil data user 
                    this.resetForm(); 
                }).catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                    this.load = false; 
                }) 
            }, 
            editHandler(item){ 
                this.typeInput = 'edit'; 
                this.dialog = true; 
                this.form.name = item.name; 
                this.form.email = item.email; 
                this.form.password = '', 
                this.updatedId = item.id 
            }, 
            setForm(){ 
                if (this.typeInput === 'new') { 
                    this.sendData() 
                } else { 
                    console.log("dddd") 
                    this.updateData() 
                } 
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