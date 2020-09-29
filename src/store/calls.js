import axios from 'axios'

export const calls = {
    state:{
       response: {}
    },
    mutations:{
        response(state, data){
            state.response = data
          },
        ErrorResponse(state){
            state.response = {}
          },
          
        
    },
    actions:{
        MakeCalls: ({commit},payload) =>{
        return new Promise((resolve, reject)=>{
            if(payload.method == 'GET'){
                axios.get(`${payload.url}`)
                .then(({data, status})=>{
                    if(status === 200){
                        commit('response', data)
                        resolve(data);
                    }
                   
                    
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'POST'){
                axios.post(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'PUT'){
                axios.put(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'DELETE'){
                axios.delete(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'HEAD'){
                axios.head(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'PATCH'){
                axios.patch(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
            if(payload.method == 'OPTIONS'){
                axios.options(`${payload.url}`)
                .then(({data})=>{
                    commit()
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                });
            }
         }) 
        },
        ErrorCalls: ({commit}) =>{
            commit('ErrorResponse')
        },
      
    }
     
}