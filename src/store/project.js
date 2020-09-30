import axios from 'axios'

export const project = {
    state:{
        projects: [],
        calls: [],
        callsbyid: {},
        side: [],
        folderinfo: {}
    },
    mutations:{
      Project(state, data){
        state.projects = data.data
      },
      Calls(state, data){
          state.calls = data
      },
      ClearCalls(state){
          state.callsbyid = {}
      },
      CallsById(state, data){
          state.callsbyid = data.data
      },
      FolderInfo(state, data){
          state.folderinfo = data
      },
      TestId(state, data){
          let obj = state.calls.find(o => o._id === data);
          state.callsbyid = obj
      },
      SET_METHOD(state, method){
          state.callsbyid.method = method
      },
      SET_NAME(state, name){
        state.callsbyid.name = name
    },
    SET_URL(state, url){
        state.callsbyid.url = url
    },
    SET_STATUS(state, status){
        state.callsbyid.status = status
    },
    SET_REQUEST(state, request){
        state.callsbyid.request = request
    },
    SET_RESPONSE(state, response){
        state.callsbyid.response = response
    }
      
        
    },
    actions:{
        GetProjects: ({commit}) => {
            return new Promise((resolve, reject)=>{
            axios.get("/project")
            .then(({data, status})=>{
                if(status === 200){
                    commit('Project', data)
                    resolve(data)
                    // const result = data.data
                    // resolve(data);
                    // for(let i=0; i<result.length; i++){
                    //     var calls = result[i].calls
                    //     console.log(calls)
                    // }
                    // commit('Calls', calls)
                }
            })
            .catch((error)=>{
                reject(error);
            });
            })
        },
        AddProject: ({commit},payload) =>{
        return new Promise((resolve, reject)=>{
            axios.post("/project", payload)
            .then(({status, data})=>{
                if(status === 201){
                resolve(data);
                commit()
                
                }
            })
            .catch((error)=>{
                reject(error);
            });
            })
        },
        UpdateProject: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.put("/project", payload)
                .then(({status, data})=>{
                    if(status === 200){
                    resolve(data);
                    commit()
                    
                    }
                })
                .catch((error)=>{
                    reject(error);
                });
            })
        },
        DeleteProject: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
            axios.delete("/project/"+payload.id)
            .then(({status, data})=>{
                if(status === 200){
                resolve(data);
                commit()
                
                }
            })
            .catch((error)=>{
                reject(error);
            });
            })
        },
        AddFolder: ({commit}, payload) =>{
            return new Promise((resolve, reject)=>{
                axios.post("/folder ", payload)
                .then(({status, data})=>{
                    if(status === 201){
                    resolve(data);
                    commit()
                    
                    }
                })
                .catch((error)=>{
                    reject(error);
                });
                })
        },
        UpdateFolder: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.put("/folder", payload)
                .then(({status, data})=>{
                    if(status === 200){
                    resolve(data);
                    commit()
                    
                    }
                })
                .catch((error)=>{
                    reject(error);
                });
            })
        },
        DeleteFolder: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
                axios.delete("/folder/"+payload.id)
                .then(({status, data})=>{
                    if(status === 200){
                    resolve(data);
                    commit() 
                    }
                })
            .catch((error)=>{
                reject(error);
            });
            })
        },
        ClearCalls: ({commit})=>{
            commit("ClearCalls")
        },
        GetCalls: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.get("/calls/"+payload)
                .then(({data, status})=>{
                  if(status === 200){
                    commit('CallsById', data)
                    resolve(data);
                  }
                })
                .catch((error)=>{
                  reject(error);
                });
              })
        },
        TestCalls:({commit},payload)=>{
            commit('TestId', payload)
        },
        FolderInfo:({commit}, payload)=>{
            commit('FolderInfo', payload)
        },
        SaveExample: ({commit},payload)=>{
         return new Promise((resolve, reject)=>{
            axios.post("/calls", payload)
            .then(({status, data})=>{
                if(status === 201){
                resolve(data);
                commit()
                }
            })
            .catch((error)=>{
                reject(error);
            });
         })
        },
        updateExample: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
               axios.put("/calls", payload)
               .then(({status, data})=>{
                   if(status === 200){
                   resolve(data);
                   commit()
                   }
               })
               .catch((error)=>{
                   reject(error);
               });
            })
        },
        deleteRequest: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
                axios.delete("/calls/"+payload.id)
                .then(({status, data})=>{
                    if(status === 200){
                    resolve(data);
                    commit() 
                    }
                })
            .catch((error)=>{
                reject(error);
            });
        }) 
        }
      
    }
     
}