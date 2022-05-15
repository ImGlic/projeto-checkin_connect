import { requestForm, connectAPi } from './utils.js'

const getConnectDatasByCultId = async () =>{

  const urlDatas = new URL(window.location.href)
  const params = urlDatas.searchParams

  const cultoId = params?.get('cultoId')
  
  const response = await requestForm(connectAPi + `/cult/${cultoId}?relationship=1`)
  const cultDatas = await response.json()

  return cultDatas
}

const loadCultTableData = (datas) => {
  if (!datas){
    document.getElementById("cult-table").style.display = "none"
    return
  }
  
  document.getElementById("cult-table").style.display = "block"
  const table = document.getElementById("tableBody-cult")

  datas?.connects.forEach( item => {
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
    braceletNumber.innerHTML = item.connectCulto.numeroPulseira
    
    let responsableName = row.insertCell(5)
    responsableName.innerHTML = item.responsavels[0].nome
    
    let responsableFone = row.insertCell(6)
    responsableFone.innerHTML = item.responsavels[0].telefone
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
  
  document.getElementById("connect-table").style.display = "block"
  
  const table = document.getElementById("tableBody-connect")
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


(async function () { 
  const connectDatas = await getConnectDatasByCultId()

  loadCultTableData(connectDatas)
  
  let form = document.getElementById('get-connect-datas')
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.getElementById('btn-get').disabled = true
  
    const formDatas = new FormData(form)
  
    const name = formDatas.get('connectName')
  
    const connectDatas = await getConnectDatasByName(name)

    document.getElementById('btn-get').disabled = false

    if (!connectDatas.length) {
      document.getElementById("connect-table").style.display = "none"
      return
    }

    loadConnectTableData(connectDatas)
  })
})()
