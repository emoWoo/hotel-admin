import http from '../utils/http'

const auth={
    async login(data){
        return http.post('/login',data)
    }
}

export default auth