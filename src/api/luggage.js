import http from '../utils/http'

const luggageApi={
    async getStatics(){
        return http.get('logs/check')
    },

}

export default luggageApi