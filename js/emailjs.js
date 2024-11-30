function sendMail(nome, email) {
    const parms = {
        nome : document.getElementById("nome").value,
        email : document.getElementById("email").value
    };

    emailjs.send("service_6gh7r3q", "template_ap5dg8q", parms)
    .then(response => {
        alert("Email enviado com sucesso", response);
    })
    .catch(error => {
        alert("Erro ao enviar o e-mail", error);
    });
}
