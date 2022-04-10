import { requestForm, connectAPi } from './utils.js'

const getConnectDatasByCultId = async () =>{
  
  const response = await requestForm(connectAPi + '/cult/2?relationship=1')
  const cultDatas = await response.json()

  return cultDatas
}

const loadTableData = (datas) => {
  const table = document.getElementById("tableBody");

  datas?.connects.forEach( item => {
    let row = table.insertRow();

    let id = row.insertCell(0);
    id.innerHTML = datas.id;

    let date = row.insertCell(1);
    date.innerHTML = datas.data;
    
    let schedule = row.insertCell(2);
    schedule.innerHTML = datas.horario;
    
    let connectName = row.insertCell(3);
    connectName.innerHTML = item.nome;
    
    let braceletNumber = row.insertCell(4);
    braceletNumber.innerHTML = item.connectCulto.numeroPulseira;
    
    let responsableName = row.insertCell(5);
    responsableName.innerHTML = item.responsavels[0].nome;
    
    let responsableFone = row.insertCell(6);
    responsableFone.innerHTML = item.responsavels[0].telefone;
  });
}

(async function () { 
  const connectDatas = await getConnectDatasByCultId()

  loadTableData(connectDatas)
})()
