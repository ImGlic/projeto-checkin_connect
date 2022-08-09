import { requestForm, connectAPi } from './utils.js'

const getConnectDatasByCultId = async () =>{

  const urlDatas = new URL(window.location.href)
  const params = urlDatas.searchParams

  const cultoId = params?.get('cultoId')

  if (!cultoId) return false
  
  const response = await requestForm(connectAPi + `/cult/${cultoId}?relationship=1`)
  const cultDatas = await response.json()

  return cultDatas
}

const loadCultTableData = (datas) => {
  const connects = datas?.connects

  if (!connects){
    document.querySelector("#cult-table").style.display = "none"
    return
  }

  document.querySelector("#num-total-connect").innerHTML = datas?.amountConnect
  document.querySelector("#cult-table").style.display = "block"
  const table = document.querySelector("#tableBody-cult")

  connects.forEach( item => {
    let row = table.insertRow()

    let id = row.insertCell(0)
    id.innerHTML = datas.id

    let date = row.insertCell(1)
    date.innerHTML = datas.data
    
    let schedule = row.insertCell(2)
    schedule.innerHTML = datas.horario
    
    let connectName = row.insertCell(3)
    connectName.innerHTML = item.nome
    
    let braceletNumber = row.insertCell(4)
    braceletNumber.innerHTML = item.connect_culto.numeroPulseira
    
    let responsableName = row.insertCell(5)
    responsableName.innerHTML = item.responsavels[0].nome
    
    let responsableFone = row.insertCell(6)
    hidePhoneData(responsableFone, item.responsavels[0].telefone)
  })
}

const getConnectDatasByName = async (name) =>{
  
  const response = await requestForm(connectAPi + `/connect/${name}`)

  if (!response.ok) {
    console.log('Error >>', await response.text())
    alert('Algo deu errado, Busque novamente')
    return []
  }

  const connectDatas = await response.json()

  return connectDatas
}

const loadConnectTableData = (datas) => {
  console.log(datas)
  
  document.querySelector("#connect-table").style.display = "block"
  
  const table = document.querySelector("#tableBody-connect")
  table.innerHTML = ''

  datas.forEach( item => {
    let row = table.insertRow()

    let id = row.insertCell(0)
    id.innerHTML = item.id

    let date = row.insertCell(1)
    date.innerHTML = item.nome
    
    let schedule = row.insertCell(2)
    schedule.innerHTML = item.dataNascimento
  })
}

const hidePhoneData = (phoneElement, originalValue) => {
  phoneElement.setAttribute('class', 'phoneData hide')
  const hideData = '***********'
  phoneElement.innerHTML = hideData

  phoneElement.addEventListener('click', (e) => {
    e.preventDefault()
    const currentValue = phoneElement.innerText
    if (!currentValue.includes('*')) {
      phoneElement.setAttribute('class', 'phoneData hide')
      phoneElement.innerHTML = hideData
    } else {
      phoneElement.setAttribute('class', 'phoneData')
      phoneElement.innerHTML = originalValue
    }
  })
}

const cultConnectTable = async () => {
  const connectDatas = await getConnectDatasByCultId()

  loadCultTableData(connectDatas)
}

const connectTable = async () => {
  let form = document.querySelector('#get-connect-datas')
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('#btn-get').disabled = true
  
    const formDatas = new FormData(form)
  
    const name = formDatas.get('connectName')
  
    const connectDatas = await getConnectDatasByName(name)

    document.querySelector('#btn-get').disabled = false

    if (!connectDatas.length) {
      document.querySelector("#connect-table").style.display = "none"
      return
    }

    loadConnectTableData(connectDatas)
  })
}

(async function () { 
  cultConnectTable()
  connectTable()
})()
