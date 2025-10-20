document.addEventListener("DOMContentLoaded", () => {
  const linhas = document.querySelectorAll(".timer");

  linhas.forEach(timer => {
    const fim = new Date(timer.dataset.fim);
    const linha = timer.closest("tr");
    const statusCell = linha.querySelector(".status");
    const botao = linha.querySelector(".btn-ver");

    function atualizar() {
      const agora = new Date();
      const diff = fim - agora;

      if (diff <= 0) {
        timer.textContent = "Encerrada ❌";
        statusCell.textContent = "Encerrada ❌";
        statusCell.classList.remove("ativa");
        statusCell.classList.add("encerrada");
        botao.disabled = true;

        // chama a API pra desativar a campanha
        const id = linha.dataset.id;
        fetch(`/api/campanhas/desativar/${id}`, { method: "POST" });

        clearInterval(interval);
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);

      timer.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    atualizar();
    const interval = setInterval(atualizar, 1000);
  });
});
