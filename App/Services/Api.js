// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

const create = (baseURL = AppConfig.baseApiUrl) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache'
        },
        timeout: 10000
    })

    return {
        setHeader: api.setHeader
    }
}

// let's return back our create method as the default.
export default {
    create
}
