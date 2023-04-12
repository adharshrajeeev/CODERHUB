import axios from 'axios'
import { baseUserUrl } from './ConstUrls';


const instance=axios.create({
    baseURL:baseUserUrl
})


export default instance