import axios from 'axios'
import awsmobile from './aws-exports'
import { Storage } from 'aws-amplify'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const urldev = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/dev/'
const urlprod = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod/'
// const bucket = 'amplify-cp-dev-devtwo-214019-deployment'


let dev = false
let url
if (dev) {
    url = urldev
}
else {
    url = urlprod
}

export async function getProfileData(walletId, artist_name=null) {
    const querystring = '?PassportDataID=' + walletId
    return axios.get(proxyurl + url + 'getpassportdata' + querystring)
}

export function updateProfileData(walletId, data, jwtToken) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': jwtToken
    }

    axios.post(proxyurl + url + 'storepassportdata',
        {"PassportId": walletId, "PassportData": data},
        {headers: headers}
    ).then(
        res => { 
          return res
        }).catch(function (error) {
        console.log(error)
    })
    
}

export function SetS3Config(bucket, level) {
    // level = public, protected and private
    Storage.configure({ 
        bucket: bucket,
        level: level,
        region: 'eu-west-2',  
        identityPoolId: awsmobile.aws_cognito_identity_pool_id
    })
}