<template>
 <nav>


<!-- Modal dialog show for creating new project -->
         <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a new project</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <!-- name of project -->
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control mt-2" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                  v-model="name"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validName(name) && nameBlured}"
                  v-on:blur="nameBlured = true"
                 >
                  <div class="invalid-feedback">Enter a project name</div>
              </div>

              <!-- description -->
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control mt-2"
                     id="exampleFormControlTextarea1" 
                     placeholder="This description will show in your project, along with the descriptions of its folders and requests"
                    rows="6"
                     v-model="description"
                     v-bind:class="{'form-control' : true, 'is-invalid' : !validDescription(description) && descriptionBlured}"
                    v-on:blur="descriptionBlured = true"
                    ></textarea>
                     <div class="invalid-feedback">Enter a description name</div>
                 </div>              
            </form>
            <!-- footer -->
          </div>
          
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleModal"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading" type="submit" class="btn btn-primary"  @click="CreateProject($event)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                       Create
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active" class="modal-backdrop fade show"></div>

      <!-- end of modal show -->

      <!-- Modal for edit project -->
        <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active2}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Project</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleEditModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <!-- name of project -->
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control mt-2" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                  v-model="editName"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validEditName(editName) && editNameBlured}"
                  v-on:blur="editNameBlured = true"
                 >
                  <div class="invalid-feedback">Enter a project name</div>
              </div>

              <!-- description -->
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control mt-2"
                     id="exampleFormControlTextarea1" 
                     placeholder="This description will show in your project, along with the descriptions of its folders and requests"
                    rows="6"
                    v-model="editDesc"
                     v-bind:class="{'form-control' : true, 'is-invalid' : !validEditDescription(editDesc) && editDescBlured}"
                    v-on:blur="editDescBlured = true"
                    ></textarea>
                     <div class="invalid-feedback">Enter a description name</div>
                 </div>              
            </form>
            <!-- footer -->
          </div>
          
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleEditModal"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading2" type="submit" class="btn btn-primary"  @click="UpdateProject($event, folder.id)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader2"></span>
                       Update
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active2" class="modal-backdrop fade show"></div>

      <!-- End of modal for edit project -->

      <!-- Modal for delete Project -->
           <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active3}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Project</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleDeleteModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this project</p> 
          </div>
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleDeleteModal"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading3" type="submit" class="btn btn-primary"  @click="DeleteProject($event, folder.id)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader3"></span>
                      Delete
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active3" class="modal-backdrop fade show"></div>

      <!-- Modal for adding new folder -->
          <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active1}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Folder To {{folder.name}}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleModalFolder"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <!-- name of project -->
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control mt-2" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                  v-model="folderName"
                  placeholder="Folder Name"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validName(folderName) && folderNameBlured}"
                  v-on:blur="folderNameBlured = true"
                 >
                  <div class="invalid-feedback">Enter a folder name</div>
              </div>

              <!-- description -->
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control mt-2"
                     id="exampleFormControlTextarea1" 
                     placeholder="Makes things easier with a complete folder description"
                    rows="6"
                     v-model="folderDesc"
                     v-bind:class="{'form-control' : true, 'is-invalid' : !validDescription(folderDesc) && folderDescBlured}"
                    v-on:blur="folderDescBlured = true"
                    ></textarea>
                     <div class="invalid-feedback">Enter a description</div>
                 </div>              
            </form>
            <!-- footer -->
          </div>
          
          
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleModalFolder"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading1" type="submit" class="btn btn-primary" @click="AddFolder($event,folder.id)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader1"></span>
                      Add
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active1" class="modal-backdrop fade show"></div>

       <!-- end of add new folder  -->

       <!-- ModaL For editing folder -->

          <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active4}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Folder</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleEditFolder"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <!-- name of project -->
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control mt-2" id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                  v-model="editFolderName"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validEditFolderName(editFolderName) && editFolderNameBlured}"
                  v-on:blur="editFolderNameBlured = true"
                 >
                  <div class="invalid-feedback">Enter a folder name</div>
              </div>

              <!-- description -->
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control mt-2"
                     id="exampleFormControlTextarea1" 
                     placeholder="This description will show in your project, along with the descriptions of its folders and requests"
                    rows="6"
                    v-model="editFolderDesc"
                     v-bind:class="{'form-control' : true, 'is-invalid' : !validEditFolderDescription(editFolderDesc) && editFolderDescBlured}"
                    v-on:blur="editFolderDescBlured = true"
                    ></textarea>
                     <div class="invalid-feedback">Enter a description name</div>
                 </div>              
            </form>
            <!-- footer -->
          </div>
          
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleEditFolder"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading4" type="submit" class="btn btn-primary"  @click="UpdateFolder($event, folder.id)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader4"></span>
                       Update
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active3" class="modal-backdrop fade show"></div>

       <!-- End of edit modal -->

       <!-- Modal for deleting a folder -->

           <div
      ref="modal"
      class="modal fade"
      :class="{show, 'd-block': active5}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Folder</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleDeleteFolder"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this folder</p> 
          </div>
                  <div class="modal-footer">
                    
                  <div class="text-right">
                            <button
                      type="button"
                      class="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleDeleteFolder"
                    >
                      Cancel
                    </button>
                     <button :disabled="loading5" type="submit" class="btn btn-primary"  @click="DeleteFolder($event, folder.id)">
                       <span class="fa fa-circle-o-notch fa-spin" v-if="loader5"></span>
                      Delete
                       </button>
                  </div>
                  </div>
        </div>
      </div>
    </div>
       <div v-if="active4" class="modal-backdrop fade show"></div>


       <!-- end of modal for deleting a folder -->


 <!-- navigation drawer -->
 <v-navigation-drawer app clipped-left v-model="drawer" class="nav" floating color="#1e2229" width="300"> 
 <v-layout column align-center>
 <v-flex class="mt-3">
 <div class="mr-2">
     <p class="col title">Api Tester</p>
  </div>
 </v-flex>
 </v-layout> 
 
        <v-layout column align-center>
          <v-flex class="mt-n4">
              <div class="">
                <v-list-item-avatar  size="50">
                    <v-img src="/logo.svg" ></v-img>
                </v-list-item-avatar>
              </div>
            
          </v-flex>
        </v-layout>

 <div class="mt-4 text-center">
    <a style="color: white; cursor: pointer;"  @click="toggleModal" class=" no-line">Add New Project</a>
  </div>
 <v-divider color="#bdbdbd"></v-divider>
 <p class="mx-3 col">Projects</p>
 <v-list dense nav class="mt-n6"> 
 <v-list-group v-for="proj in projects" :key="proj._id">
 <template v-slot:activator>
 <v-list-item-icon class=" ">
 <v-icon color="#B45C5C">mdi-folder-table</v-icon>
 </v-list-item-icon>
 <v-list-item-content>
 <v-list-item-title style="color:#bdbdbd; font-size:14px">{{proj.name}}</v-list-item-title>
 </v-list-item-content>
 
 </template>
 <div class="text-center">
    <v-menu open-on-hover
      right
      offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="grey"
          dark
          v-bind="attrs"
          v-on="on"
          small
          text
          class="text-none"
        >
          Project Actions
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="no-line"  @click="toggleModalFolder(proj.name,proj._id)">
          <v-list-item-title >Add Folder</v-list-item-title>
        </v-list-item>
        <v-list-item  class="no-line" @click="addProjRequest(proj._id)">
          <v-list-item-title >Add Request</v-list-item-title>
        </v-list-item>
        <v-list-item  class="no-line" @click="toggleEditModal(proj.name,proj.description, proj._id)">
          <v-list-item-title >Edit Project</v-list-item-title>
        </v-list-item>
        <v-list-item class="no-line" @click="toggleDeleteModal(proj._id)">
          <v-list-item-title>Delete Project</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    <v-list dense nav>
        <v-list-group v-for="folder in proj.folders"   prepend-icon="mdi-folder"
        
         :key="folder._id">
            <template v-slot:activator>
                <!-- <v-list-item-icon class="ml-2">
                <v-icon color="#B45C5C" small>mdi-folder</v-icon>
                </v-list-item-icon> -->
                <v-list-item-content>
                <v-list-item-title style="color:#bdbdbd; font-size:14px">{{folder.name}}</v-list-item-title>
                </v-list-item-content>
            </template>
            
            <div class="text-center">
              <v-menu open-on-hover
                right
                offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="grey"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    text
                    class="text-none"
                  >
                    Folder Actions
                  </v-btn>
                </template>
                <v-list>
                  
                  <v-list-item class="no-line"  @click="addFolderRequest(folder._id)">
                    <v-list-item-title>Add Request</v-list-item-title>
                  </v-list-item>
                  <v-list-item  class="no-line" @click="toggleEditFolder(folder.name,folder.description,folder._id,)">
                    <v-list-item-title >Edit Folder</v-list-item-title>
                  </v-list-item>
                  <v-list-item  class="no-line"  @click="toggleDeleteFolder(folder._id)">
                    <v-list-item-title >Delete Folder</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-list-item class="ml-2 no-line" v-for="call in folder.calls" :key="call._id">
                <v-list-item-icon>
                    <!-- <span class="badge badge-pill badge-warning">New</span> -->
                    <span
                     v-bind:class="{ 'text-danger': call.method == 'DELETE', 'text-success': call.method == 'GET','text-warning': call.method == 'POST', 'text-primary': call.method == 'PUT', 'text-white': call.method == 'PATCH' }"
                     style="font-size: 12px;">{{call.method}}</span>
                <!-- <v-icon color="#B45C5C" small>mdi-file</v-icon> -->
                </v-list-item-icon>
                <v-item-content >
                <v-list-item-title style="color:#7A7674; font-size:14px;cursor: pointer;" @click="ViewExample(call._id)" class="text-truncate">
                {{call.name}}
                </v-list-item-title>
            </v-item-content>
        
            </v-list-item>

            
        </v-list-group>
    </v-list>
    <v-list-item class="no-line"  v-for="call in proj.calls" :key="call._id">
        <v-list-item-icon>
        <v-icon color="#B45C5C" small>mdi-file</v-icon>
        </v-list-item-icon>
        <v-item-content >
        <v-list-item-title style="color:#7A7674; font-size:14px; cursor: pointer;" @click="ViewExample(call._id)" class="truncate">
        {{call.name}}
        </v-list-item-title>
    </v-item-content>
 
 </v-list-item>

 
 </v-list-group>
 

 
 </v-list>
 <!-- <v-list>

      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
        v-for="proj in projects" :key="proj._id"
      >
        <template v-slot:activator>
          <v-list-item-title>{{proj.name}}</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
          v-for="folder in proj.folders" :key="folder._id"
        >
          <template v-slot:activator >
            <v-list-item-content>
              <v-list-item-title>{{folder.name}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="call in folder.calls"
            :key="call._id"
            link
          >
            <v-list-item-title v-text="call"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item class="" router-link to="/consultants" v-for="call in proj.calls" :key="call._id">
        <v-list-item-icon>
        <v-icon color="#B45C5C">mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-item-content >
        <v-list-item-title style="color:#7A7674; font-size:14px" class="truncate">
        {{call.name}}
        </v-list-item-title>
    </v-item-content>
 
 </v-list-item>
      </v-list-group>
    </v-list> -->
 </v-navigation-drawer>
 </nav>
 
</template>

<script>
import iziToast from 'izitoast'
export default {
 data(){
 return{
    active: false,
    show: false,
    show1: false,
    active1: false,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
    drawer: null,
     name: '',
      sendOk: false,
      nameBlured: false,
      valid: false,
      valid1: false,
      valid2: false,
      valid3: false,
      valid4: false, 
      valid5: false,
      valid6: false,
      valid7: false,
      description: '',
      descriptionBlured: false,
      folderName: '',
      folderNameBlured: false,
      folderDesc: '',
      folderDescBlured: false,
      editName: '',
      editDesc: '',
      editNameBlured: false,
      editDescBlured: false,
      editFolderName: '',
      editFolderDesc: '',
      editFolderNameBlured: false,
      editFolderDescBlured: false,
      loader: false,
      loader1: false,
      loader2: false,
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loader3: false,
      loading4: false,
      loader4: false,
      loader5: false,
      loading5: false,
    url:"https://res.cloudinary.com/dmnghlyic/image/upload/v1587634815/",
    
    admins: [
    ['Management', 'people_outline'],
    ['Settings', 'settings'],
    ],
    }
 },
 computed:{
    projects(){
        let proj= this.$store.state.project.projects
        return proj
    },
  folder(){
        let folder= this.$store.state.project.folderinfo
        return folder
    },
    
 },
 methods:{
toggleModal() {
        const body = document.querySelector("body");
        this.active = !this.active;
        this.active
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
      toggleModalFolder(name,id) {
         this.$store.dispatch("FolderInfo", {
           "name": name,
           "id": id
         })
        const body = document.querySelector("body");
        this.active1 = !this.active1;
        this.active1
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
      toggleEditModal(name,desc,id){
        this.editName = name
        this.editDesc = desc
        this.$store.dispatch("FolderInfo", {
           "name": name,
           "desc": desc,
           "id": id
         })
          const body = document.querySelector("body");
        this.active2 = !this.active2;
        this.active2
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
      toggleDeleteModal(id){
          this.$store.dispatch("FolderInfo", {
           "id": id
         })
        const body = document.querySelector("body");
        this.active3 = !this.active3;
        this.active3
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
      toggleDeleteFolder(id){
         this.$store.dispatch("FolderInfo", {
           "id": id
         })
        const body = document.querySelector("body");
        this.active5 = !this.active5;
        this.active5
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
       toggleEditFolder(name,desc,id){
         this.editFolderName = name
         this.editFolderDesc = desc
          this.$store.dispatch("FolderInfo", {
           "id": id
         })
        const body = document.querySelector("body");
        this.active4 = !this.active4;
        this.active4
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
      },
       validName: function(name){
      return name
    },
     validEditName: function(editName){
      return editName
    },
    validEditFolderName: function(editFolderName){
      return editFolderName
    },
    validDescription: function(description){
      return description
    },
    validEditDescription: function(editDesc){
      return editDesc
    },
    validEditFolderDescription: function(editFolderDesc){
      return editFolderDesc
    },
      validateName: function(){
      this.nameBlured = true;
      if(this.validName(this.name)){
        this.valid = true
      }
    }, 
     validateEditName: function(){
      this.editNameBlured = true;
      if(this.validEditName(this.editName)){
        this.valid4 = true
      }
    },
      validateEditFolderName: function(){
      this.editFolderNameBlured = true;
      if(this.validEditFolderName(this.editFolderName)){
        this.valid6 = true
      }
    }, 
    validateFolderName: function(){
      this.folderNameBlured = true;
      if(this.validName(this.folderName)){
        this.valid2 = true
      }
    },  
     validateDescription: function(){
      this.descriptionBlured = true;
      if(this.validDescription(this.description)){
        this.valid1 = true
      }
    },
     validateEditDescription: function(){
      this.editDescBlured = true;
      if(this.validEditDescription(this.editDesc)){
        this.valid5 = true
      }
    },
    validateEditFolderDescription: function(){
      this.editFolderDescBlured = true;
      if(this.validEditFolderDescription(this.editFolderDesc)){
        this.valid7 = true
      }
    },
     validateFolderDesc: function(){
      this.folderDescBlured= true;
      if(this.validDescription(this.folderDesc)){
        this.valid3 = true
      }
    },
       CreateProject(event){
        event.preventDefault()
        this.validateName();
        this.validateDescription();
         if(this.valid == true && this.valid1 ==true){
            this.loading = true
            this.loader = true
            this.$store.dispatch("AddProject", {
            "name":  this.name,
            "description": this.description,
          })
        .then(()=>{
          this.loading = false
          this.loader = false
          this.name = ''
          this.description = ''
          this.nameBlured = false
          this.descriptionBlured = false
           iziToast.success({
          message: 'Project created',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading = false
          this.loader = false
        })
      }    
    },
    DeleteProject(event, id){
      event.preventDefault()
       this.loading3 = true
          this.loader3 = true
        this.$store.dispatch("DeleteProject", {
            "id": id
          })
        .then(()=>{
          this.loading3 = false
          this.loader3 = false
           iziToast.success({
          message: 'Project successfully deleted',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading3 = false
          this.loader3 = false
        })

    },
    UpdateProject(event, id){
      event.preventDefault()
        this.validateEditName();
        this.validateEditDescription();
         if(this.valid4 == true && this.valid5 ==true){
            this.loading2 = true
            this.loader2 = true
            this.$store.dispatch("UpdateProject", {
            "name":  this.editName,
            "description": this.editDesc,
            "_id": id
          })
        .then(()=>{
          this.loading2 = false
          this.loader2 = false
          this.editNameBlured = false
          this.editDescBlured = false
           iziToast.success({
          message: 'Project successfully updated',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading = false
          this.loader = false
        })
      }    
    },
    DeleteFolder(event, id){
      event.preventDefault()
       this.loading5 = true
          this.loader5 = true
        this.$store.dispatch("DeleteFolder", {
            "id": id
          })
        .then(()=>{
          this.loading5 = false
          this.loader5 = false
           iziToast.success({
          message: 'Folder successfully deleted',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading5 = false
          this.loader5 = false
        })
    },
    UpdateFolder(event, id){
       event.preventDefault()
        this.validateEditFolderName();
        this.validateEditFolderDescription();
         if(this.valid6 == true && this.valid7 ==true){
            this.loading4 = true
            this.loader4 = true
            this.$store.dispatch("UpdateFolder", {
            "name":  this.editFolderName,
            "description": this.editFolderDesc,
            "_id": id
          })
        .then(()=>{
          this.loading4 = false
          this.loader4 = false
          this.editFolderNameBlured = false
          this.editFolderDescBlured = false
           iziToast.success({
          message: 'Folder successfully updated',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading4 = false
          this.loader4 = false
        })
      } 
    },
    AddFolder(event, id){
      event.preventDefault()
       this.validateFolderName();
        this.validateFolderDesc();
         if(this.valid2 == true && this.valid3 ==true){
            this.loading1 = true
            this.loader1 = true
            this.$store.dispatch("AddFolder", {
            "name":  this.folderName,
            "description": this.folderDesc,
            "project_id": id
          })
        .then(()=>{
          this.loading1 = false
          this.loader1 = false
          this.folderName = ''
          this.folderDesc = ''
          this.folderNameBlured = false
          this.folderDescBlured = false
           iziToast.success({
          message: 'Folder successfully added',
          progressBar: false,
          })
          this.$store.dispatch("GetProjects")
        })
        .catch(()=>{
          this.loading1 = false
          this.loader1 = false
        })
      } 
    },
    
    ViewExample(id){
      this.$store.dispatch('GetCalls', id)
      .then((success)=>{
        console.log(success)
        this.$router.push(`/project/${id}`)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    addProjRequest(id){
      alert(id)
      this.$router.push('/addrequest/'+id)
    },
    addFolderRequest(id){
       this.$router.push('/addfolderrequest/'+id)
    }
 },
 created(){
    this.$store.dispatch("GetProjects")
      .then((success)=>{ 
        console.log(success)
      })
      .catch(()=>{
      });
 }
}
</script>

<style scoped>
*{
 font-family: 'Lato';
}
.v-list .v-list-item--active{
 background-color: #BCFF9E;
}
.nav{
 box-shadow: 0px 14px 8px rgba(0, 0, 0, 0.25);
}
.title{
 color:#08911B;
}
.v-badge__badge{
 width:auto;
 border-radius: 12px;
 padding: 5px;
}
.dot {
 height: 25px;
 width: 25px;
 background-color: #bbb;
 border-radius: 50%;
}
.col{
    color: #bdbdbd
}
.no-line{
  text-decoration: none;
}
</style>