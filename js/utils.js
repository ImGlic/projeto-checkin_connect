const connectAPi = 'https://connect-api-logoinha.herokuapp.com'

const requestForm = async (url, datas={}, method='GET') => {

    let options
    const body = datas ? datas : undefined

    if (method === 'POST') {
        options = { 
            method,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        }
    }
  
    const response = await fetch( url, options)
  
    return response
}

export { requestForm, connectAPi }
