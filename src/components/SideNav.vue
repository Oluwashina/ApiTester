<template>
  <div>

 <!-- Header section navbar -->
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
            <!-- <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"> -->
            <i class="mdi mdi-check mr-3" ></i>API Tester
            </a>
        </nav>
   
       <!-- sidebar -->
<div class="">
    <a id="show-sidebar" class="btn btn-sm btn-dark">
        <i class="fas fa-bars"></i>
    </a>
       <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-brand">
            <a href="#">API Tester</a>
            <div id="close-sidebar">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="sidebar-header">
            <div class="user-pic">
              <img class="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                alt="User picture">
            </div>
            <div class="user-info">
              <span class="user-name">Jhon
                <strong>Smith</strong>
              </span>
              <span class="user-role">Administrator</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-search">
            <div>
              <a style="color: white; cursor: pointer;" @click="toggleModal"><i class="mdi mdi-plus mr-2"></i>New Project</a>
            </div>
              <!-- <button type="button" class="btn btn-primary" @click="toggleModal">My Modal</button> -->
          </div>

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

       
          <!-- sidebar-search  -->
          <div class="sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Projects</span>
              </li>
               <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-tachometer-alt"></i>
              <span>Dashboard</span>
              <span class="badge badge-pill badge-warning">New</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">Dashboard 1
                    <span class="badge badge-pill badge-success">Pro</span>
                  </a>
                </li>
                <li>
                  <a href="#">Dashboard 2</a>
                </li>
                <li>
                  <a href="#">Dashboard 3</a>
                </li>
              </ul>
            </div>
          </li>

              <!-- projects list -->
              <!-- <li class="sidebar-dropdown"  v-for="n in projects" :key="n._id">
                <a style="cursor: pointer">
                  <i class="mdi mdi-folder"></i>
                  <span>{{n.name}}</span>
                  
                </a>

                <div class="sidebar-submenu">
                  <ul>
                    <li v-for="call in n.calls" :key="call._id"  @click="ViewExample(call._id)">
                      
                      <a style="cursor: pointer;">{{call.url}}
                        <span :class="call.method=='GET' ? 'badge badge-pill badge-success' : 'badge badge-pill badge-warning'">{{call.method}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li> -->
            
            
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
        <!-- sidebar-content  -->
        
      </nav>
</div>
       

  </div>
</template>

<script>
import $ from 'jquery';
import iziToast from 'izitoast'
  $(function() {

    // Dropdown functionality
      $(".sidebar-dropdown > a").click(function() {
            $(".sidebar-submenu").slideUp();
            if (
                $(this)
                .parent()
                .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                .parent()
                .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                .next(".sidebar-submenu")
                .slideDown();
                $(this)
                .parent()
                .addClass("active");
            }
      });

      // use jquery fully to toggle the sidenav
        $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
        });
        $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
        });

  });
export default {
    data(){
        return{
            active: false,
              show: false,
              name: '',
              sendOk: false,
              nameBlured: false,
              valid: false,
              valid1: false,
              valid2: false,
              description: '',
              url: '',
              urlBlured: false,
              descriptionBlured: false,
              statusShow: false,
              responseCode: '',
              responseColor: '',
              method: 'GET',
              methodSelect: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
              responseMessage: '',
              loader: false,
              loading: false
        }
    },
      methods:{
      validateName: function(){
      this.nameBlured = true;
      if(this.validName(this.name)){
        this.valid = true
      }
    },
     validateDescription: function(){
      this.descriptionBlured = true;
      if(this.validDescription(this.description)){
        this.valid1 = true
      }
    },
    validateUrl: function(){
      this.urlBlured = true;
      if(this.validUrl(this.url)){
        this.valid2 = true
      }
    },
    validName: function(name){
      return name
    },
    validDescription: function(description){
      return description
    },
    validUrl: function(url){
      return url
    },
      toggleModal() {
        const body = document.querySelector("body");
        this.active = !this.active;
        this.active
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
        setTimeout(() => (this.show = !this.show), 10);
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
      ViewExample(id){
        // alert(id)
        // this.$store.dispatch('GetCalls', id)
        // .then((success)=>{
        //   console.log(success)
          this.$router.push(`/project/${id}`)
        // })
        // .catch((err)=>{
        //   console.log(err)
        // })

      }

    },
    computed:{
        projects(){
            return this.$store.state.project.projects
        },
    },
      created(){
        this.$store.dispatch("GetProjects")
        .then((success)=>{ 
          console.log(success)
        })
        .catch(()=>{
        });
    },
}
</script>

<style scoped>

  /*styles */
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box; 
}


.success_style{
  background: #17c5a6;
  padding: 15px 20px;
  color: #fff;
}

.error_style{
  background: #fd3c3c;
  padding: 15px 20px;
  color: #fff
}

@keyframes swing {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    30% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(0deg);
    }
    60% {
      transform: rotate(5deg);
    }
    70% {
      transform: rotate(0deg);
    }
    80% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  
  @keyframes sonar {
    0% {
      transform: scale(0.9);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  body {
    font-size: 0.9rem;
  }
  .page-wrapper .sidebar-wrapper,
  .sidebar-wrapper .sidebar-brand > a,
  .sidebar-wrapper .sidebar-dropdown > a:after,
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a:before,
  .sidebar-wrapper ul li a i,
  .page-wrapper .page-content,
  .sidebar-wrapper .sidebar-search input.search-menu,
  .sidebar-wrapper .sidebar-search .input-group-text,
  .sidebar-wrapper .sidebar-menu ul li a,
  #show-sidebar,
  #close-sidebar {
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  
  /*----------------page-wrapper----------------*/
  
  .page-wrapper {
    height: 100vh;
  }
  
  .page-wrapper .theme {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 4px;
    margin: 2px;
  }
  
  .page-wrapper .theme.chiller-theme {
    background: #1e2229;
  }
  
  /*----------------toggeled sidebar----------------*/
  
  .page-wrapper.toggled .sidebar-wrapper {
    left: 0px;
  }
  
  @media screen and (min-width: 768px) {
    .page-wrapper.toggled .page-content {
      padding-left: 300px;
    }
  }
  /*----------------show sidebar button----------------*/
  #show-sidebar {
    position: fixed;
    left: 0;
    top: 10px;
    border-radius: 0 4px 4px 0px;
    width: 35px;
    transition-delay: 0.3s;
  }
  .page-wrapper.toggled #show-sidebar {
    left: -40px;
  }
  /*----------------sidebar-wrapper----------------*/
  
  .sidebar-wrapper {
    width: 300px;
    height: 100%;
    max-height: 100%;
    position: fixed;
    top: 0;
    left: -300px;
    z-index: 999;
  }
  
  .sidebar-wrapper ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-wrapper a {
    text-decoration: none;
  }
  
  /*----------------sidebar-content----------------*/
  
  .sidebar-content {
    max-height: calc(100% - 30px);
    height: calc(100% - 30px);
    overflow-y: auto;
    position: relative;
  }
  
  .sidebar-content.desktop {
    overflow-y: hidden;
  }
  
  /*--------------------sidebar-brand----------------------*/
  
  .sidebar-wrapper .sidebar-brand {
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }
  
  .sidebar-wrapper .sidebar-brand > a {
    text-transform: uppercase;
    font-weight: bold;
    flex-grow: 1;
  }
  
  .sidebar-wrapper .sidebar-brand #close-sidebar {
    cursor: pointer;
    font-size: 20px;
  }
  /*--------------------sidebar-header----------------------*/
  
  .sidebar-wrapper .sidebar-header {
    padding: 20px;
    overflow: hidden;
  }
  
  .sidebar-wrapper .sidebar-header .user-pic {
    float: left;
    width: 60px;
    padding: 2px;
    border-radius: 12px;
    margin-right: 15px;
    overflow: hidden;
  }
  
  .sidebar-wrapper .sidebar-header .user-pic img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  
  .sidebar-wrapper .sidebar-header .user-info {
    float: left;
  }
  
  .sidebar-wrapper .sidebar-header .user-info > span {
    display: block;
  }
  
  .sidebar-wrapper .sidebar-header .user-info .user-role {
    font-size: 12px;
  }
  
  .sidebar-wrapper .sidebar-header .user-info .user-status {
    font-size: 11px;
    margin-top: 4px;
  }
  
  .sidebar-wrapper .sidebar-header .user-info .user-status i {
    font-size: 8px;
    margin-right: 4px;
    color: #5cb85c;
  }
  
  /*-----------------------sidebar-search------------------------*/
  
  .sidebar-wrapper .sidebar-search > div {
    padding: 10px 20px;
  }
  
  /*----------------------sidebar-menu-------------------------*/
  
  .sidebar-wrapper .sidebar-menu {
    padding-bottom: 10px;
  }
  
  .sidebar-wrapper .sidebar-menu .header-menu span {
    font-weight: bold;
    font-size: 14px;
    padding: 15px 20px 5px 20px;
    display: inline-block;
  }
  
  .sidebar-wrapper .sidebar-menu ul li a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    position: relative;
    padding: 8px 30px 8px 20px;
  }
  
  .sidebar-wrapper .sidebar-menu ul li a i {
    margin-right: 10px;
    font-size: 12px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
  }
  
  .sidebar-wrapper .sidebar-menu ul li a:hover > i::before {
    display: inline-block;
    animation: swing ease-in-out 0.5s 1 alternate;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown > a:after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f105";
    font-style: normal;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: 0 0;
    position: absolute;
    right: 15px;
    top: 14px;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu ul {
    padding: 5px 0;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li {
    padding-left: 25px;
    font-size: 13px;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a:before {
    content: "\f15b";
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    font-style: normal;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 10px;
    font-size: 8px;
  }
  
  .sidebar-wrapper .sidebar-menu ul li a span.label,
  .sidebar-wrapper .sidebar-menu ul li a span.badge {
    float: right;
    margin-top: 8px;
    margin-left: 5px;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a .badge,
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a .label {
    float: right;
    margin-top: 0px;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-submenu {
    display: none;
  }
  
  .sidebar-wrapper .sidebar-menu .sidebar-dropdown.active > a:after {
    transform: rotate(90deg);
    right: 17px;
  }
  
  /*--------------------------side-footer------------------------------*/
  
  .sidebar-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
  }
  
  .sidebar-footer > a {
    flex-grow: 1;
    text-align: center;
    height: 30px;
    line-height: 30px;
    position: relative;
  }
  
  .sidebar-footer > a .notification {
    position: absolute;
    top: 0;
  }
  
  .badge-sonar {
    display: inline-block;
    background: #980303;
    border-radius: 50%;
    height: 8px;
    width: 8px;
    position: absolute;
    top: 0;
  }
  
  .badge-sonar:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid #980303;
    opacity: 0;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    animation: sonar 1.5s infinite;
  }
  
  /*--------------------------page-content-----------------------------*/
  
  .page-wrapper .page-content {
    display: inline-block;
    width: 100%;
    padding-left: 0px;
    padding-top: 20px;
  }
  
  .page-wrapper .page-content > div {
    padding: 20px 40px;
  }
  
  .page-wrapper .page-content {
    overflow-x: hidden;
  }
  
  /*------scroll bar---------------------*/
  
  ::-webkit-scrollbar {
    width: 5px;
    height: 7px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #525965;
    border: 0px none #ffffff;
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #525965;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #525965;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: transparent;
  }
  ::-webkit-scrollbar-track:active {
    background: transparent;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  
  
  /*-----------------------------chiller-theme-------------------------------------------------*/
  
  .chiller-theme .sidebar-wrapper {
      background: #31353D;
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-header,
  .chiller-theme .sidebar-wrapper .sidebar-search,
  .chiller-theme .sidebar-wrapper .sidebar-menu {
      border-top: 1px solid #3a3f48;
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-search input.search-menu,
  .chiller-theme .sidebar-wrapper .sidebar-search .input-group-text {
      border-color: transparent;
      box-shadow: none;
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-header .user-info .user-role,
  .chiller-theme .sidebar-wrapper .sidebar-header .user-info .user-status,
  .chiller-theme .sidebar-wrapper .sidebar-search input.search-menu,
  .chiller-theme .sidebar-wrapper .sidebar-search .input-group-text,
  .chiller-theme .sidebar-wrapper .sidebar-brand>a,
  .chiller-theme .sidebar-wrapper .sidebar-menu ul li a,
  .chiller-theme .sidebar-footer>a {
      color: #ffffff;
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-menu ul li:hover>a,
  .chiller-theme .sidebar-wrapper .sidebar-menu .sidebar-dropdown.active>a,
  .chiller-theme .sidebar-wrapper .sidebar-header .user-info,
  .chiller-theme .sidebar-wrapper .sidebar-brand>a:hover,
  .chiller-theme .sidebar-footer>a:hover i {
      color: #b8bfce;
  }
  
  .page-wrapper.chiller-theme.toggled #close-sidebar {
      color: #bdbdbd;
  }
  
  .page-wrapper.chiller-theme.toggled #close-sidebar:hover {
      color: #ffffff;
  }
  
  .chiller-theme .sidebar-wrapper ul li:hover a i,
  .chiller-theme .sidebar-wrapper .sidebar-dropdown .sidebar-submenu li a:hover:before,
  .chiller-theme .sidebar-wrapper .sidebar-search input.search-menu:focus+span,
  .chiller-theme .sidebar-wrapper .sidebar-menu .sidebar-dropdown.active a i {
      color: #16c7ff;
      text-shadow:0px 0px 10px rgba(22, 199, 255, 0.5);
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-menu ul li a i,
  .chiller-theme .sidebar-wrapper .sidebar-menu .sidebar-dropdown div,
  .chiller-theme .sidebar-wrapper .sidebar-search input.search-menu,
  .chiller-theme .sidebar-wrapper .sidebar-search .input-group-text {
      background: #3a3f48;
  }
  
  .chiller-theme .sidebar-wrapper .sidebar-menu .header-menu span {
      color: #6c7b88;
  }
  
  .chiller-theme .sidebar-footer {
      background: #3a3f48;
      box-shadow: 0px -1px 5px #282c33;
      border-top: 1px solid #464a52;
  }
   
  .chiller-theme .sidebar-footer>a:first-child {
      border-left: none;
  }
  
  .chiller-theme .sidebar-footer>a:last-child {
      border-right: none;
  }
  

</style>