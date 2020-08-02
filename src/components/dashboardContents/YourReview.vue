<template> 
    <v-container> 
        <v-card> 
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Makanan</h2> 
                <v-data-table :items="foods" loading="load" > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in foods" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td><img :src = "$apiUrl2 + 'food_pict/' + item.foto" contain width="80" height="80"></td> 
                                <td>{{ item.nama_makanan }}</td> 
                                <td>{{ item.alamat}}</td> 
                                <td>{{ item.jenis_makanan }}</td> 
                                <td class="text-center"> 
                                    <v-btn icon color="indigo" light @click="tampil(item)" > 
                                        Edit
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id)" > 
                                        <v-icon>mdi-delete</v-icon> 
                                    </v-btn> 
                                </td> 
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table>
                <h2 class="text-md-center">Data Hotel</h2>
                <v-data-table :items="hotels"> 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in hotels" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td><img :src = "$apiUrl2 + 'food_pict/' + item.foto" contain width="80" height="80"></td> 
                                <td>{{ item.nama_hotel }}</td> 
                                <td>{{ item.alamat}}</td> 
                                <td>{{ item.bintang_hotel }}</td> 
                                <td class="text-center"> 
                                    <v-btn icon color="indigo" light @click="tampil(item)" > 
                                        Edit
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteDataHOtel(item.id)" > 
                                        <v-icon>mdi-delete</v-icon> 
                                    </v-btn> 
                                </td> 
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table>  
            </v-container> 
        </v-card> 
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Detail Makanan</span> 
                </v-card-title> 
                <v-card-text>
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <img :src = "$apiUrl2 + 'food_pict/' + form.foto" contain width="80" height="80">
                            </v-col>

                            <v-col cols="12"> 
                                <v-text-field label="Nama Makanan" v-model="form.nama_makanan" required></v-text-field>
                                <!-- <p>{{ form.nama_makanan }}</p> -->
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="Jenis Makanan" v-model="form.jenis_makanan" required></v-text-field>
                                <!-- <p>{{ form.nama_makanan }}</p> -->
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="Alamat" v-model="form.alamat" required></v-text-field>
                                <!-- <p>{{ form.nama_makanan }}</p> -->
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="Nama Makanan" v-model="form.nama_makanan" required></v-text-field>
                                <!-- <p>{{ form.nama_makanan }}</p> -->
                            </v-col>   
                            <v-col cols="12"> 
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
                            </v-col> 
                        </v-row> 
                    </v-container>
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>  
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                </v-card-actions> 
            </v-card> 
        </v-dialog> 
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
                hotels:[], 
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
                var useria = localStorage.getItem('username')
                var uri = this.$apiUrl + '/makanan?username=' + useria
                console.log(uri);
                this.$http.get(uri,auth).then(response =>{ 
                    this.foods=response.data.message 
                }) 
                var uri2 = this.$apiUrl + '/hotel?username=' + useria
                this.$http.get(uri2,auth).then(response =>{ 
                    this.hotels=response.data.message 
                })
            },
            tampil(item){
                this.typeInput = 'edit'; 
                this.form.nama_makanan = item.nama_makanan;
                this.form.foto = item.foto;
                this.form.jenis_makanan= item.jenis_makanan
                this.form.alamat= item.alamat
                this.form.review = item.review;
                this.form.id = item.id;
                this.nama_hotel = item.nama_hotel;
                this.bintang_hotel = item.bintang_hotel;
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
                this.user.append('name', this.form.name); 
                this.user.append('email', this.form.email); 
                this.user.append('password', this.form.password); 
                var uri =this.$apiUrl + '/user' 
                this.load = true 
                this.$http.post(uri,this.user).then(response =>{ 
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
            updateData(){ 
                this.food.append('nama_makanan', this.form.nama_makanan);
                this.food.append('jenis_makanan', this.form.jenis_makanan); 
                this.food.append('alamat', this.form.alamat); 
                this.food.append('review', this.form.review); 
                var uri = this.$apiUrl + '/makanan/' + this.form.id; 
                this.load = true 
                this.$http.post(uri,this.food).then(response =>{
                    this.snackbar = true; //mengaktifkan snackbar 
                    this.color = 'green'; //memberi warna snackbar 
                    this.text = response.data.message; //memasukkan pesan ke snackbar 
                    this.load = false; this.dialog = false 
                    this.getData(); //mengambil data user 
                    this.resetForm(); this.typeInput = 'new'; 
                }).catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                    this.load = false; 
                    this.typeInput = 'new'; 
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
            deleteData(deleteId){ 
                //mengahapus data 
                
                var uri = this.$apiUrl + '/makanan/' + deleteId; 
                //data dihapus berdasarkan id 
                this.$http.delete(uri).then(response =>{ 
                    this.snackbar = true; 
                    this.text = response.data.message; 
                    this.color = 'green' 
                    this.deleteDialog = false; 
                    this.getData(); 
                }).catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                }) 
            }, 
            deleteDataHOtel(deleteId){
                var uri = this.$apiUrl + '/hotel/' + deleteId; 
                //data dihapus berdasarkan id 
                this.$http.delete(uri).then(response =>{ 
                    this.snackbar = true; 
                    this.text = response.data.message; 
                    this.color = 'green' 
                    this.deleteDialog = false; 
                    this.getData(); 
                }).catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                }) 
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