import http from '../utils/http.js'

const hotelApi={
    async getHotels(){
        return http.get('admin/hotels')
    }
}

export default hotelApi