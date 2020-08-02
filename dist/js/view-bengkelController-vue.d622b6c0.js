(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-bengkelController-vue"],{"0e8f":function(t,a,e){"use strict";e("20f6");var o=e("e8f2");a["a"]=Object(o["a"])("flex")},a722:function(t,a,e){"use strict";e("20f6");var o=e("e8f2");a["a"]=Object(o["a"])("layout")},eae4:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-card",[e("v-container",{attrs:{"grid-list-md":"","mb-0":""}},[e("h2",{staticClass:"text-md-center"},[t._v("Data Hotel")]),e("v-layout",{staticStyle:{margin:"10px"},attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-text-field",{attrs:{"append-icon":"mdi-search",label:"Search","hide-details":""},model:{value:t.keyword,callback:function(a){t.keyword=a},expression:"keyword"}})],1)],1),e("v-data-table",{attrs:{headers:t.headers,items:t.foods,search:t.keyword,loading:t.load},scopedSlots:t._u([{key:"body",fn:function(a){a.items;return[e("tbody",t._l(t.foods,(function(a,o){return e("tr",{key:a.id},[e("td",[t._v(t._s(o+1))]),e("td",[e("img",{attrs:{src:t.$apiUrl2+"food_pict/"+a.foto,contain:"",width:"80",height:"80"}})]),e("td",[t._v(t._s(a.nama_hotel))]),e("td",[t._v(t._s(a.alamat))]),e("td",[t._v(t._s(a.bintang_hotel))]),e("td",{staticClass:"text-center"},[e("v-btn",{attrs:{icon:"",color:"error",light:""},on:{click:function(e){return t.tampil(a)}}},[t._v(" Read More ")])],1)])})),0)]}}])})],1)],1),e("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v("Detail Hotel")])]),e("v-card-text",[e("v-btn",{staticClass:"mx-2",attrs:{fab:"",dark:"",small:"",color:"pink"},on:{click:function(a){return t.tambahfaorite()}}},[e("v-icon",{attrs:{dark:""}},[t._v("mdi-heart")])],1),e("v-container",[e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("img",{attrs:{src:t.$apiUrl2+"food_pict/"+t.form.foto,contain:"",width:"80",height:"80"}})]),e("v-col",{attrs:{cols:"12"}},[e("p",[t._v(t._s(t.form.nama_hotel))])]),e("v-col",{attrs:{cols:"12"}},[e("p",[t._v(t._s(t.form.review))])])],1)],1)],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(a){t.dialog=!1}}},[t._v("Close")])],1)],1)],1),e("v-snackbar",{attrs:{color:t.color,"multi-line":!0,timeout:3e3},model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[t._v(" "+t._s(t.text)+" "),e("v-btn",{attrs:{dark:"",text:""},on:{click:function(a){t.snackbar=!1}}},[t._v(" Close ")])],1)],1)},r=[],n=(e("b0c0"),{data:function(){return{dialog:!1,tempTampil:[],keyword:"",headers:[{text:"No",value:"no"},{text:"",value:""},{text:"Nama Hotel",value:"nama_hotel"},{text:"Alamat",value:"alamat"},{text:"Bintang",value:"bintang_hotel"},{text:"",value:null}],foods:[],snackbar:!1,color:null,text:"",load:!1,form:{id:"",nama_hotel:"",alamat:"",bintang_hotel:"",review:"",foto:""},food:new FormData,typeInput:"new",errors:"",updatedId:""}},methods:{getData:function(){var t=this,a={headers:{Authorization:localStorage.getItem("token")}},e=this.$apiUrl+"/hotel";this.$http.get(e,a).then((function(a){t.foods=a.data.message}))},tampil:function(t){this.form.nama_hotel=t.nama_hotel,this.form.foto=t.foto,this.form.review=t.review,this.form.id=t.id,this.dialog=!0},tambahfaorite:function(){var t=this;this.food.append("username",localStorage.getItem("username")),this.food.append("id",this.form.id);var a=this.$apiUrl+"/favorite_food";this.$http.post(a,this.food).then((function(a){t.snackbar=!0,t.color="green",t.text=a.data.message})).catch((function(a){t.errors=a,t.snackbar=!0,t.text="Try Again",t.color="red",t.load=!1}))},sendData:function(){var t=this;this.user.append("name",this.form.name),this.user.append("email",this.form.email),this.user.append("password",this.form.password);var a=this.$apiUrl+"/user";this.load=!0,this.$http.post(a,this.user).then((function(a){t.snackbar=!0,t.color="green",t.text=a.data.message,t.load=!1,t.dialog=!1,t.getData(),t.resetForm()})).catch((function(a){t.errors=a,t.snackbar=!0,t.text="Try Again",t.color="red",t.load=!1}))},editHandler:function(t){this.typeInput="edit",this.dialog=!0,this.form.name=t.name,this.form.email=t.email,this.form.password="",this.updatedId=t.id},setForm:function(){"new"===this.typeInput?this.sendData():(console.log("dddd"),this.updateData())},resetForm:function(){this.form={name:"",email:"",password:""}}},mounted:function(){this.getData()}}),i=n,s=e("2877"),l=e("6544"),d=e.n(l),c=e("8336"),h=e("b0af"),f=e("99d9"),m=e("62ad"),u=e("a523"),v=e("8fea"),p=e("169a"),b=e("0e8f"),g=e("132d"),_=e("a722"),k=e("0fd9"),x=e("2db4"),w=e("2fa4"),y=e("8654"),V=Object(s["a"])(i,o,r,!1,null,null,null);a["default"]=V.exports;d()(V,{VBtn:c["a"],VCard:h["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VCol:m["a"],VContainer:u["a"],VDataTable:v["a"],VDialog:p["a"],VFlex:b["a"],VIcon:g["a"],VLayout:_["a"],VRow:k["a"],VSnackbar:x["a"],VSpacer:w["a"],VTextField:y["a"]})}}]);
//# sourceMappingURL=view-bengkelController-vue.d622b6c0.js.map