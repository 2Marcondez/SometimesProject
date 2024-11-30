const inputCPF = document.querySelector('#cpf');

inputCPF.addEventListener('input', () => {
    let valor = inputCPF.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (valor.length <= 3) {
        inputCPF.value = valor;
    } else if (valor.length <= 6) {
        inputCPF.value = valor.replace(/(\d{3})(\d{1,})/, '$1.$2');
    } else if (valor.length <= 9) {
        inputCPF.value = valor.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    } else if (valor.length <= 11) {
        inputCPF.value = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    }
});

// Função para validar CPF
function TestaCPF(strCPF) {
    var Soma = 0;
    var Resto;
    strCPF = strCPF.replace(/[^\d]+/g, ''); // Remove pontos e traços apenas para validação

    if (strCPF == "00000000000" || strCPF.length !== 11) return false;

    for (var i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
}

// Função para validar o formulário
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio imediato do formulário para validação

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const cpf = document.getElementById("cpf").value;

    // Verificar se os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha || !cpf) {
        Swal.fire({
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos obrigatórios.',
            icon: 'warning',
            confirmButtonText: 'OK',
            background: '#fff',       
            color: '#000',          
            confirmButtonColor: '#000', 
            confirmButtonText: 'OK',
            buttonsStyling: false,    
            customClass: {
                confirmButton: 'btn-confirm' 
            }
        });
        return false;
    }

    // Validar o CPF
    if (!TestaCPF(cpf)) {
        Swal.fire({
            title: 'CPF Inválido',
            text: 'Por favor, insira um CPF válido.',
            icon: 'error',
            confirmButtonText: 'OK',
            background: '#fff',
            color: '#000',
            confirmButtonColor: '#000',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
        document.getElementById("cpf").focus();
        return false;
    }

    // Se tudo estiver correto, enviar os dados para o servidor
    const dados = {
        nome: nome,
        email: email,
        password: senha,
        cpf: cpf
    };

    fetch('http://localhost:3000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Registrado com sucesso!') {
            // Caso o registro seja bem-sucedido, redireciona para a página 'shop.html'
            Swal.fire({
                title: 'Sucesso!',
                text: 'Registrado com sucesso! Redirecionando para nosso shop!',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#fff',
                color: '#000',
                confirmButtonColor: '#000',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn-confirm'
                }
            }).then(() => {
                window.location.href = 'shop.html';
            });
            // Enviar e-mail após sucesso na validação
            sendMail(nome, email);  // Chamando a função sendMail para enviar o e-mail
        } else {
            // Caso haja erro no registro
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao registrar: ' + data.error,
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#fff',
                color: '#000',
                confirmButtonColor: '#000',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn-confirm'
                }
            });
        }
    })
    .catch(error => {
        console.error('Erro na comunicação com o servidor:', error);
        Swal.fire({
            title: 'Erro na comunicação',
            text: 'Erro na comunicação com o servidor.',
            icon: 'error',
            confirmButtonText: 'OK',
            background: '#fff',
            color: '#000',
            confirmButtonColor: '#000',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
    });

    return false; 
}
