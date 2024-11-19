
//LISTAR CLIENTE
async function loadCliente() {
    const response = await fetch('http://localhost:3063/cliente/listar');
    const result = await response.json();

    if (result.success) { 
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; 
        
        result.data.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.endereco}</td>
                <td>
                    <button onclick="editCliente(${cliente.id})">Editar</button>
                    <button onclick="deleteCliente(${cliente.id})">Deletar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } else {
        alert(result.message);
    }
}


//CADASTRAR CLIENTE

async function cadastrarCliente(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value
    const telefone = document.getElementById('telefone').value
    const endereco = document.getElementById('endereco').value

    const data = { nome, telefone, endereco}
    
  
    const response = await fetch('http://localhost:3063/cliente/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }) 

    const result = await response.json()
    
    if (result.success) {
        alert("cadastro completo")
        window.location.reload()
                   
    }
}


//EDITAR CLIENTE 
async function editCliente(id) {
    const nome = prompt("Novo nome do cliente:");
    const telefone = prompt("Novo telefone do cliente:");
    const endereco = prompt("Novo endereço do cliente:");
  
    await fetch(`http://localhost:3063/cliente/editar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone, endereco })
    });

    loadCliente();
}
 



async function deleteCliente(id){
    await fetch(`http://localhost:3063/cliente/deletar/${id}`, { 
        method: 'DELETE'
    })
    window.location.reload()

}



loadCliente();