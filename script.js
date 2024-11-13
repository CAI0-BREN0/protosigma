let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
let operacoes = JSON.parse(localStorage.getItem('operacoes')) || [];


function adicionarCliente() {
   const nome = prompt("Digite o nome do cliente:");
   const cpf = prompt("Digite o CPF do cliente:");
   const endereco = prompt("Digite o endereço do cliente:");

   if (nome && cpf && endereco) {
       clientes.push({ nome, cpf, endereco });
       localStorage.setItem('clientes', JSON.stringify(clientes));
       atualizarListaClientes();
   }
}

function atualizarListaClientes() {
   const lista = document.getElementById("lista-clientes");
   lista.innerHTML = ""; 

   clientes.sort((a, b) => a.nome.localeCompare(b.nome)); 

   clientes.forEach((cliente, index) => {
       const li = document.createElement("li");
       li.textContent = `${cliente.nome} - ${cliente.cpf} - ${cliente.endereco}`;
       

       const btnRemover = document.createElement("button");
       btnRemover.textContent = "Remover";
       btnRemover.onclick = () => {
           removerCliente(index);
       };

       li.appendChild(btnRemover);
       lista.appendChild(li);
   });
}

function removerCliente(index) {
   clientes.splice(index, 1); 
   localStorage.setItem('clientes', JSON.stringify(clientes)); 
   atualizarListaClientes(); 
}


function adicionarVeiculo() {
   const modelo = prompt("Digite o modelo do veículo:");
   const placa = prompt("Digite a placa do veículo:");
   const marca = prompt("Digite a marca do veículo:");
   const imagemUrl = prompt("Digite a URL da imagem do veículo:");

   if (modelo && placa && marca && imagemUrl) {
       veiculos.push({ modelo, placa, marca, imagemUrl });
       localStorage.setItem('veiculos', JSON.stringify(veiculos));
       atualizarListaVeiculos();
   }
}

function atualizarListaVeiculos() {
   const lista = document.getElementById("lista-veiculos");
   lista.innerHTML = ""; 

   veiculos.sort((a, b) => a.marca.localeCompare(b.marca) || a.modelo.localeCompare(b.modelo)); // Ordena por marca e modelo

   veiculos.forEach((veiculo, index) => {
       const li = document.createElement("li");
       const img = document.createElement("img");
       img.src = veiculo.imagemUrl;
       img.alt = `Imagem do ${veiculo.modelo}`;
       img.style.width = "100px"; 
       img.style.height = "auto"; 

       li.textContent = `${veiculo.marca} - ${veiculo.modelo} - ${veiculo.placa}`;
       
  
       const btnRemover = document.createElement("button");
       btnRemover.textContent = "Remover";
       btnRemover.onclick = () => {
           removerVeiculo(index);
       };

       li.appendChild(img);
       li.appendChild(btnRemover);
       
       lista.appendChild(li);
   });
}

function removerVeiculo(index) {
   veiculos.splice(index, 1); 
   localStorage.setItem('veiculos', JSON.stringify(veiculos)); 
   atualizarListaVeiculos(); 
}


function carregarSelects() {
   const clienteSelect = document.getElementById('cliente-select');
   const veiculoSelect = document.getElementById('veiculo-select');

   clientes.forEach(cliente => {
       const option = document.createElement('option');
       option.value = cliente.cpf;
       option.textContent = cliente.nome;
       clienteSelect.appendChild(option);
   });

   veiculos.forEach(veiculo => {
       const option = document.createElement('option');
       option.value = veiculo.placa;
       option.textContent = `${veiculo.marca} - ${veiculo.modelo}`;
       veiculoSelect.appendChild(option);
   });
}


document.getElementById('form-operacao').addEventListener('submit', function(e) {
   e.preventDefault(); 

   const tipoOperacao = document.getElementById('tipo-operacao').value;
   const numero = document.getElementById('numero').value;
   const data = document.getElementById('data').value;
   const clienteCpf = document.getElementById('cliente-select').value;
   const vendedor = document.getElementById('vendedor').value;
   const veiculoPlaca = document.getElementById('veiculo-select').value;

   let operacao;

   if (tipoOperacao === 'compra') {
       operacao = {
           tipo: 'compra',
           numero,
           data,
           cliente: clienteCpf,
           vendedor,
           veiculo: veiculoPlaca,
           valor: prompt("Digite o valor da compra:")
       };
   } else {
       operacao = {
           tipo: 'venda',
           numero,
           data,
           cliente: clienteCpf,
           vendedor,
           veiculo: veiculoPlaca,
           valorEntrada: prompt("Digite o valor de entrada:"),
           valorFinanciado: prompt("Digite o valor financiado:"),
           valorTotal: prompt("Digite o valor total:")
       };
   }

   operacoes.push(operacao);
   localStorage.setItem('operacoes', JSON.stringify(operacoes));
   atualizarListaOperacoes();
});


function atualizarListaOperacoes() {
    const listaOperacoes = document.getElementById("lista-operacoes");
    listaOperacoes.innerHTML = ""; 

    operacoes.forEach((operacao, index) => {
        const li = document.createElement("li");
        li.textContent = `${operacao.tipo.charAt(0).toUpperCase() + operacao.tipo.slice(1)} - Número: ${operacao.numero}, Data: ${operacao.data}, Cliente: ${operacao.cliente}, Vendedor: ${operacao.vendedor}, Veículo: ${operacao.veiculo}`;
        
        if (operacao.tipo === 'venda') {
            li.textContent += `, Valor Entrada: ${operacao.valorEntrada}, Valor Financiado: ${operacao.valorFinanciado}, Valor Total: ${operacao.valorTotal}`;
        } else {
            li.textContent += `, Valor: ${operacao.valor}`;
        }


        const btnRemoverOperacao = document.createElement("button");
        btnRemoverOperacao.textContent = "Remover";
        btnRemoverOperacao.onclick = () => {
            removerOperacao(index);
        };

        li.appendChild(btnRemoverOperacao);
        
        listaOperacoes.appendChild(li);
    });
}

function removerOperacao(index) {
    operacoes.splice(index, 1); 
    localStorage.setItem('operacoes', JSON.stringify(operacoes)); 
    atualizarListaOperacoes(); 
}


window.onload = function() {
    if (document.getElementById("lista-clientes")) atualizarListaClientes();
    if (document.getElementById("lista-veiculos")) atualizarListaVeiculos();
    if (document.getElementById("cliente-select")) carregarSelects();
    if (document.getElementById("lista-operacoes")) atualizarListaOperacoes();
}