import http from '../utils/http'

const luggageApi={
    async getStatics(){
        return http.get('admin/luggages/counts')
    }
}

export default luggageApi