<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAtqZIhOZK9bUFwdNApRImAjqEStkBRrdo",
  authDomain: "to-do-list-8ae56.firebaseapp.com",
  projectId: "to-do-list-8ae56",
  storageBucket: "to-do-list-8ae56.appspot.com",
  messagingSenderId: "924863191365",
  appId: "1:924863191365:web:647db999ffb633df80c62c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default{
    data() {
        return {
        id: this.$route.params.id,
        nama : "",
        tanggal : "",
        Tags : [],
        checkedTags : [],
        Notes : "Add Notes here...",
        tanggal_edited : false,
        tags_edited : false,
        nama_edited : false,
        description_edited : false,
        }
    },
    mounted() {
    this.load();
  },
  methods: {
    async setTanggal() {
        const docRef = doc(db, "list", this.id);
        try {
          console.log(this.id);
          await updateDoc(docRef, {
            end_date : this.tanggal,
          });
          this.load();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async setNama() {
        const docRef = doc(db, "list", this.id);
        try {
          console.log(this.id);
          await updateDoc(docRef, {
            Name : this.nama,
          });
          this.load();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async setTags() {
        const docRef = doc(db, "list", this.id);
        try {
          console.log(this.id);
          await updateDoc(docRef, {
            Tags : this.checkedTags,
          });
          this.load();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async setDescription() {
        const docRef = doc(db, "list", this.id);
        try {
          console.log(this.id);
          await updateDoc(docRef, {
            Description : this.Notes,
          });
          this.load();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async load() {
      try {
        const querySnapshot = await getDocs(collection(db, "list"));
        querySnapshot.forEach(doc=> {
            if (doc.id === this.id) {
                console.log(doc.data());
                this.nama = doc.data().Name;
                this.tanggal = doc.data().end_date;
                this.Tags = doc.data().Tags;
                this.Notes = doc.data().Description;
            }
        })
      }
      catch (err) {
        console.log(err.message)
      }
    },
}
}
</script>

<template>
    <div >
        <h3> {{ nama }} </h3>
        <label v-if="this.nama_edited">
            Enter Your Task :
            <input type="text"  v-model="nama" />
        </label>
        <button v-if="!this.nama_edited" @click="this.nama_edited = !this.nama_edited"> Edit Nama </button>
        <button v-if="this.nama_edited" @click="this.nama_edited = !this.nama_edited; setNama()"> Set Nama </button>
        <h3> {{ tanggal}} </h3>
        <label v-if="this.tanggal_edited">
            Set Deadlines :
            <input type="date" v-model="tanggal" />
        </label>
        <button v-if="!this.tanggal_edited" @click="this.tanggal_edited = !this.tanggal_edited"> Edit Tanggal </button>
        <button v-if="this.tanggal_edited" @click="this.tanggal_edited = !this.tanggal_edited; setTanggal()"> Set Tanggal </button>
        <h3 v-for="tag in Tags" :key="tag"> {{ tag}} </h3>
        <button v-if="!this.tags_edited" @click="this.tags_edited = !this.tags_edited"> Edit Tags </button>
        <div v-if="this.tags_edited">
            <input type="checkbox" id="complete" value="Complete" v-model="checkedTags">
            <label for="complete">Complete</label>

            <input type="checkbox" id="on progress" value="On Progress" v-model="checkedTags">
            <label for="On Progress">On Progress</label>

            <input type="checkbox" id="Not Started" value="Not Started" v-model="checkedTags">
            <label for="Not Started">Not Started</label>

            <input type="checkbox" id="Improtant" value="Important" v-model="checkedTags">
            <label for="Important">Important</label>

            <input type="checkbox" id="Can be Postponed" value="Can be Postponed" v-model="checkedTags">
            <label for="Can be Postponed">Can be Postponed</label>

            <input type="checkbox" id="urgent" value="Urgent" v-model="checkedTags">
            <label for="Urgent">Urgent</label>
        </div>
        <button v-if="this.tags_edited" @click="this.tags_edited = !this.tags_edited; setTags()"> Save Tags </button>
        <br>
        <h3 v-if="!this.description_edited"> {{ Notes }}</h3>
        <button v-if="!this.description_edited" @click="this.description_edited = !this.description_edited"> Edit </button>
        <br>
        <input v-if="this.description_edited" type="text"  v-model="Notes" placeholder="Add description here..." />
        <br>
        <button v-if="this.description_edited" @click="this.description_edited = !this.description_edited; setDescription()"> Save </button>
    </div> 
</template>
