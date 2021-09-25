const axios = require('axios').default;

// const url = 'http://localhost:308/';
const url = 'http://vps-1883265-x.dattaweb.com:308/';


// const urlApi = 'http://localhost:300/api/';
const urlApi = 'https://api.poscloud.com.ar/api/';

const config = {
    // "Data Source=localhost;Initial Catalog=prueba;trustServerCertificate: True;Persist Security Info=False;User ID=DESKTOP-36OV17R/Krouz;Password=;"

    user: "Bsalud",
    password: 'Javier2021',
    server: '192.168.88.251',
    database: 'wfarma',
    options: {
        encrypt: false, // seems decorative, connection encrypts without this
        trustServerCertificate: true

    },
    // Local
    // user: "asd",
    // password: 'asd',
    // server: '192.168.0.213',
    // database: 'wfarma2',
    // options: {
    //     encrypt: false, // seems decorative, connection encrypts without this
    //     trustServerCertificate: true

    // },
    port: 1433
}

async function getTokenBsalud() {

    return new Promise((resolve, reject) => {

        axios.post(
            urlApi+`login`,
            {
                database: 'bsalud',
                user: 'soporte',
                password: 'Z2C936cB'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( async (res)=> {
            // console.log('res.data.user.token: ',res)
            resolve  (res.data.user.token)

        }).catch(async (e) => {
            // console.log('error token: ', e)
            reject (e)
        })
    })
}
    

module.exports = {
    config,
    getTokenBsalud,
    url
}
