<template> 
    <v-container> 
        <v-card> 
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Hotel</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 > 
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details ></v-text-field> 
                    </v-flex> 
                </v-layout> 
                <v-data-table :headers="headers" :items="foods" :search="keyword" :loading="load" > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in foods" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td><img :src = "$apiUrl2 + 'food_pict/' + item.foto" contain width="80" height="80"></td>
                                <td>{{ item.nama_hotel }}</td> 
                                <td>{{ item.alamat}}</td> 
                                <td>{{ item.bintang_hotel }}</td> 
                                <td class="text-center"> 
                                    <v-btn icon color="error" light @click="tampil(item)" > 
                                        Read More
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
                    <span class="headline">Detail Hotel</span> 
                </v-card-title> 
                <v-card-text>
                    <v-btn class="mx-2" fab dark small color="pink" @click="tambahfaorite()">
                        <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <img :src = "$apiUrl2 + 'food_pict/' + form.foto" contain width="80" height="80">
                            </v-col> 
                            <v-col cols="12"> 
                                <p>{{ form.nama_hotel }}</p>
                            </v-col> 
                            <v-col cols="12"> 
                                <p>{{form.review}}</p> 
                            </v-col> 
                        </v-row> 
                    </v-container>
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
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
                        text: 'Nama Hotel', 
                        value: 'nama_hotel' 
                    }, 
                    { 
                        text: 'Alamat', 
                        value: 'alamat' 
                    }, 
                    { 
                        text: 'Bintang', 
                        value: 'bintang_hotel' 
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
                    nama_hotel : '', 
                    alamat : '', 
                    bintang_hotel : '',
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
                var uri = this.$apiUrl + '/hotel' 
                this.$http.get(uri,auth).then(response =>{ 
                    this.foods=response.data.message 
                }) 
            },
            tampil(item){
                this.form.nama_hotel = item.nama_hotel;
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