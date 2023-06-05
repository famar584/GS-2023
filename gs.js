document.querySelector("#salvar").addEventListener("click", cadastrarRelatorio)
document.querySelector("#salvar").addEventListener("click", mostrarTendencias)


let relatorio_agua = []
let result = []

window.addEventListener("load",() => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    atualizar() 
    mostrarTendencias()
})

function mostrarTendencias(){
  maximoo.innerHTML = `O maior consumo de água em um mês foi de: ${acharMax()}L.`
  minimoo.innerHTML = `O menor consumo de água em um mês foi de: ${acharMin()}L.`
  media.innerHTML = `A média de todo seu consumo de água é de: ${acharAvg()}L.`
}

document.querySelector("#home").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua
    atualizar()
  })
  

document.querySelector("#jan").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "1")
    atualizar()
})

document.querySelector("#fev").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "2")
    atualizar()
})

document.querySelector("#mar").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "3")
    atualizar()
})

document.querySelector("#mai").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "4")
    atualizar()
})

document.querySelector("#abr").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "5")
    atualizar()
})

document.querySelector("#jun").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "6")
    atualizar()
})

document.querySelector("#jul").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "7")
    atualizar()
})

document.querySelector("#ago").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "8")
    atualizar()
})

document.querySelector("#set").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "9")
    atualizar()
})

document.querySelector("#out").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "10")
    atualizar()
})

document.querySelector("#nov").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "11")
    atualizar()
})

document.querySelector("#dez").addEventListener("click", () => {
    relatorio_agua = JSON.parse(localStorage.getItem("relatorio_agua")) || []
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.mes == "12")
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
    const ano = document.querySelector("#busca").value
    relatorio_agua = relatorio_agua.filter(relatorio => relatorio.ano.includes(ano))
    atualizar()
  })

function cadastrarRelatorio(){
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let mes = document.querySelector("#mes").value
    let ano = document.querySelector("#ano").value
    let qtd = parseFloat(document.querySelector("#qtd").value)
    let tipo = document.querySelector("#tipo").value

    const relatorio = {
        id: Date.now(),
        mes: mes,
        ano: ano,
        qtd: qtd,
        tipo: tipo
    }

    if (relatorio.mes == [] || relatorio.mes > 12 || relatorio.mes <= 0){
    document.querySelector("#mes").classList.add("is-invalid")
    return
    }

    if (relatorio.ano == [] || relatorio.ano < 1899){
        document.querySelector("#ano").classList.add("is-invalid")
        return
    }

    if (relatorio.qtd == [] || relatorio.qtd <= 0){
        document.querySelector("#qtd").classList.add("is-invalid")
        return
    }

    if (relatorio.tipo == "Localidade" || relatorio.tipo == []){
        document.querySelector("#tipo").classList.add("is-invalid")
        return
    }

    relatorio_agua.push(relatorio)

    document.querySelector("#relatorios").innerHTML += gerarRelatorio(relatorio)
    document.querySelector("#mes").value = ""
    document.querySelector("#ano").value = ""
    document.querySelector("#qtd").value = ""
    document.querySelector("#tipo").value = ""
  
  
    salvar()
    modal.hide()
    apenasQtd()
}

function atualizar() {
    document.querySelector("#relatorios").innerHTML = ""
    relatorio_agua.forEach((relatorio) => {
      document.querySelector("#relatorios").innerHTML += gerarRelatorio(relatorio)
    })
    mostrarTendencias()
  }



function salvar() {
    localStorage.setItem("relatorio_agua", JSON.stringify(relatorio_agua))
    mostrarTendencias()
  }

  function acharMin(){
    const qtdArray = localStorage.getItem("qtdAgua")
    const qtdJava = JSON.parse(qtdArray)
    const minAgua = Math.min(...qtdJava)
    return minAgua
    }

  function acharMax(){
  const qtdArray = localStorage.getItem("qtdAgua")
  const qtdJava = JSON.parse(qtdArray)
  const maxAgua = Math.max(...qtdJava)
  return maxAgua
  }

  function acharAvg(){
    const qtdArray = localStorage.getItem("qtdAgua")
    const qtdJava = JSON.parse(qtdArray)
    const soma = qtdJava.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const avg = soma/qtdJava.length
    return avg
  }


function apenasQtd(){
  JSON.parse(localStorage.getItem("relatorio_agua"))
  let result = relatorio_agua.map(item => item.qtd)
  localStorage.setItem("qtdAgua", JSON.stringify(result))
  console.log(result)
}

  function apagar(id) {
    relatorio_agua = relatorio_agua.filter((relatorio) => { //isso é igual &
      return relatorio.id != id
    })
    salvar()
    atualizar()
    apenasQtd()
    mostrarTendencias()
  }

function gerarRelatorio(relatorio) {

    let corTipo = "warning"
    if (relatorio.tipo == "Residência") corTipo = "danger"
    if (relatorio.tipo == "Corporetivo") corTipo = "primary"

    return `        <div class="col-12 col-md-6 col-lg-3">
    <div class="card mb-2 ">
      <div class="card-header">${relatorio.mes}/${relatorio.ano} <i class="bi bi-calendar3"></i></div>
      <div class="card-body">
        <p class="card-text">${relatorio.qtd}L</p>
        <p>
          <span class="badge text-bg-${corTipo}">${relatorio.tipo}</span>
        </p>
        <a href="#" onClick='apagar(${relatorio.id})' class="btn btn-danger">
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
    </div>
  </div>`
}