<template>
<div>
  <button v-if="this.filter" @click="load_filter()"> Set Filter </button>
  <button v-if="!this.filter" @click="this.filter = !this.filter"> Filter </button>
    <div v-if="this.filter" >
    <input type="radio" id="complete" value="Complete" v-model="checkedTags" >
    <label for="complete">Complete</label>

    <input type="radio" id="on progress" value="On Progress" v-model="checkedTags">
    <label for="On Progress">On Progress</label>

    <input type="radio" id="Not Started" value="Not Started" v-model="checkedTags">
    <label for="Not Started">Not Started</label>

    <input type="radio" id="Improtant" value="Important" v-model="checkedTags">
    <label for="Important">Important</label>

    <input type="radio" id="Can be Postponed" value="Can be Postponed" v-model="checkedTags">
    <label for="Can be Postponed">Can be Postponed</label>

    <input type="radio" id="urgent" value="Urgent" v-model="checkedTags">
    <label for="Urgent">Urgent</label>
  </div>
  <button v-if="this.filter" @click="this.filter=!this.filter"> Back </button>
  <div v-if="!filter" class="w-1/4 mx-auto justify-center home">
    <!-- <button @click="setData(id_edit)"> SET CURRENT LIST</button> -->
    <img src="../assets/progress.png" class="absolute z-50 bg-white rounded-full w-[72px] -mt-10 -ml-8">
    <div class="bg-gradient-to-r from-sky-200 to-indigo-400 rounded-lg mt-8  py-4">
      <div class="grid grid-cols-3 gap-4 bg-blue-100  opacity-80 rounded-lg my-3 py-2 mx-3" v-for="(list, id) in lists_progress" :key="id">
        <button  @click="setStatusTrue(list.id)"> <input class="place-self-start col-span-1 " type="checkbox" unchecked="unchecked"/></button> 
        <router-link class="inline" :to="{ name: 'detailList', params: { id:list.id }}">  
          <h3 class="inline text-stone-800 text-lg font-semibold col-span-2 "> {{ list.data().Name }} </h3> 
        </router-link>
        <button class="place-self-center" @click="DeleteData(list.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 bg-red-300 rounded-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
    <img src="../assets/select.png" class="absolute z-50  w-[64px] bg-white rounded-xl -p-2 -ml-7 mt-6">
    <div class="bg-gradient-to-r from-neutral-800 to-zinc-900 rounded-lg  py-4 mt-16">
      <div class="grid grid-cols-3 gap-4 bg-slate-700 opacity-80 rounded-lg my-3 py-2 mx-3" v-for="(list, id) in lists_complete" :key="id">
        <button  @click="setStatusFalse(list.id)"> <input class="inline" type="checkbox" checked ="checked"/></button> 
        <router-link class="inline" :to="{ name: 'detailList', params: { id:list.id }}">  
          <h3 class="inline text-indigo-100 text-lg font-semibold col-span-2 "> {{ list.data().Name }} </h3> 
        </router-link>
        <button class="place-self-center " @click="DeleteData(list.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 bg-red-300 rounded-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
    <router-link to="/addList"> ADD NEW LIST </router-link>
  </div>
  <div v-if="filter" class="w-1/4 mx-auto bg-gradient-to-r from-sky-200 to-indigo-400 rounded-lg mt-8  py-4">
      <div class="grid grid-cols-3 gap-4 bg-blue-100  opacity-80 rounded-lg my-3 py-2 mx-3" v-for="(list, id) in lists_filtered" :key="id">
        <button  @click="setStatusTrue(list.id)"> <input class="place-self-start col-span-1 " type="checkbox" unchecked="unchecked"/></button> 
        <router-link class="inline" :to="{ name: 'detailList', params: { id:list.id }}">  
          <h3 class="inline text-stone-800 text-lg font-semibold col-span-2 "> {{ list.data().Name }} </h3> 
        </router-link>
        <button class="place-self-center" @click="DeleteData(list.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 bg-red-300 rounded-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
</div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, query, where, doc} from 'firebase/firestore';


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
  name: 'HomeView',
  data() {
    return {
      lists_progress : [],
      lists_complete : [],
      nama_list : "Test",
      id_edit : 0,
      tanggal : "",
      checkedTags : [],
      lists_filtered : [],
      status : false,
      filter : false

    }
  },
  mounted() {
    this.load_progress();
    this.load_complete();
  },
  methods: {
    async addData() {
      try {
        console.log(this.checkedTags);
        const docRef = await addDoc(collection(db, "list"), {
          Name : this.nama_list,
          end_date : this.tanggal,
          Tags : this.checkedTags
      });

      console.log("Document written with ID: ", docRef.id);
      this.load_progress();
      this.load_complete();
      this.tags_checked = [];
      } catch (e) {
        console.error("Error adding document: ", e);
    }
    },
    EditData(id) {
      this.id_edit = id;
      console.log
    },
    async setStatusTrue(id) {
        const docRef = doc(db, "list", id);
        try {
          await updateDoc(docRef, {
            status : true
          });
          this.load_progress();
          this.load_complete();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async setStatusFalse(id) {
        const docRef = doc(db, "list", id);
        console.log(this.list_progress)
        try {
          await updateDoc(docRef, {
            status : false
          });
          this.load_progress();
          this.load_complete();
          }
        catch (e) {
            console.error("Error editing document: ", e);
          }

    },
    async DeleteData(id) {
    const docRef = doc(db, "list", id);
     try {
      console.log(id);
      await deleteDoc(docRef);
      this.load_progress();
      this.load_complete();
      console.log("Document deleted with ID: ", docRef.id);
    }
     catch (e) {
      console.error("Error deleting document: ", e);
     }
    },
    // async load() {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "list"));
    //     this.lists = [];
    //     querySnapshot.forEach(doc=> {
    //       console.log(doc.data());
    //       this.lists.push(doc);
    //     })
    //   }
    //   catch (err) {
    //     console.log(err.message)
    //   }
    // },

    async load_progress() {
      try {
        const q = query(collection(db, "list"), where("status", "==", false));
        const querySnapshot = await getDocs(q);
        this.lists_progress = [];
        querySnapshot.forEach(doc=> {
          console.log(doc.data());
          this.lists_progress.push(doc);
        })
      }
      catch (err) {
        console.log(err.message)
      }
    },

    async load_complete() {
      try {
        const q = query(collection(db, "list"), where("status", "==", true));
        const querySnapshot = await getDocs(q);
        this.lists_complete = [];
        querySnapshot.forEach(doc=> {
          console.log(doc.data());
          this.lists_complete.push(doc);
        })
      }
      catch (err) {
        console.log(err.message)
      }
    },

    async load_filter() {
      try {
        console.log(this.checkedTags)
        const q = query(collection(db, "list"), where("Tags", "array-contains", this.checkedTags));
        const querySnapshot = await getDocs(q);
        this.lists_filtered = [];
        querySnapshot.forEach(doc=> {
          console.log(doc.data());
          this.lists_filtered.push(doc);
        })
      }
      catch (err) {
        console.log(err.message)
      }
    },
    
  }
}
</script>
