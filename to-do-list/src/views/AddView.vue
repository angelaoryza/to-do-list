<template>
<div>
  <label>
    Enter Your Task :
    <input type="text"  v-model="nama_list" />
  </label>
  <br>
  <label>
    Set Deadlines :
    <input type="date" v-model="tanggal" />
  </label>
  <br>
  <div>
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
  <router-link to="/"> <button @click="addData"> ADD NEW LIST </button> </router-link>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc} from 'firebase/firestore';


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


export default {
    data() {
    return {
      lists : [],
      nama_list : "Test",
      tanggal : "",
      checkedTags : [],
    }
  },
  methods: {
    async addData() {
      try {
        console.log(this.checkedTags);
        const docRef = await addDoc(collection(db, "list"), {
          Name : this.nama_list,
          end_date : this.tanggal,
          Tags : this.checkedTags,
          Description : "Add description here...",
          status : false,
      });

      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }
    },
    }   
}
</script>
