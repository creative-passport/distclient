import axios from 'axios'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const urldev = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/dev/'
const urlprod = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod/'

let dev = true
let url
if (dev) {
    url = urldev
}
else {
    url = urlprod
}

// export function getJWTToken(store) {
//     var cog = store.getState().cognito
//     if (cog.user !== undefined) {
//         cog.user.getSession((err, session) => {
//             if (err) {
//               console.log(err)
//             } else {
//               return session.getIdToken().getJwtToken()
//             }
//         })
//     }
//     return ''
// }


export async function getProfileData(walletId, artist_name=null) {
    const querystring = '?PassportDataID=' + walletId
    return axios.get(proxyurl + url + '/getpassportdata' + querystring)
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

export function deleteProfileData(artist_name) {

    
}

export function addProfile(artist_name) {

    
}
