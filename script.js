// -------------------- MODAL DE CONFIRMAÇÃO --------------------
const modal = document.getElementById("modal");

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

async function sendMessage() {
  const name = document.getElementById("name").value.trim();
  const selectedRadio = document.querySelector(
    'input[name="confirmation"]:checked'
  );
  const selectedOption = selectedRadio ? selectedRadio.value : "";

  if (!name || !selectedOption) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  const message = `Olá, Obrigado pelo convite para a festa 15 anos da Ana!\nNome: ${name}\nConfirmação: ${selectedOption}`;
  const phone = "+555581202442"; // Número do WhatsApp no formato internacional

  // Envia para o banco de dados (exemplo usando fetch para uma API)
  try {
    await fetch("https://db-conect-ana.vercel.app/api/save-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, confirmation: selectedOption }),
    });
  } catch (error) {
    console.error(error);
    return;
  }

  // Envia mensagem pelo WhatsApp
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappLink, "_blank");

  closeModal();
}

// -------------------- CONTADOR --------------------
const targetDate = new Date("2025-07-19T19:30:00");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    clearInterval(interval);
    daysElement.textContent = 0;
    hoursElement.textContent = 0;
    minutesElement.textContent = 0;
    secondsElement.textContent = 0;
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// -------------------- POPUP DE MÚSICA --------------------
const music = document.getElementById("backgroundMusic");
const toggleButton = document.getElementById("toggleButton");
const overlay = document.getElementById("overlay");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const toggleImg = toggleButton.querySelector("img"); // Seleciona o <img> dentro do botão

function toggleMusic() {
  if (music.paused) {
    music.play();
    toggleImg.src = "./img/pause.svg"; // Caminho do ícone de pause
  } else {
    music.pause();
    toggleImg.src = "./img/play_pause.svg"; // Caminho do ícone de play
  }
}

btnSim.addEventListener("click", () => {
  music.play();
  toggleImg.src = "./img/pause.svg";
  overlay.classList.remove("show");
});

btnNao.addEventListener("click", () => {
  music.pause();
  toggleImg.src = "./img/play_pause.svg";
  overlay.classList.remove("show");
});

// Exibe o popup na carga da página
window.addEventListener("load", () => {
  overlay.classList.add("show");
  music.pause();
  toggleImg.src = "./img/play_pause.svg";
});

// -------------------- COPIAR CODIGO PIX --------------------

document.getElementById("copyButton").addEventListener("click", function () {
  const pixCode = document.getElementById("pixCode").innerText;

  // Copiar texto para a área de transferência
  navigator.clipboard
    .writeText(pixCode)
    .then(() => {
      const message = document.getElementById("copyMessage");
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 2000); // Mensagem desaparece após 2 segundos

      // Redirecionar para o aplicativo ou página do banco
      window.location.href = `pix://pagamento?chave=${encodeURIComponent(
        pixCode
      )}`;
    })
    .catch((err) => {
      alert(
        "Não foi possível copiar o código PIX. Por favor, tente manualmente."
      );
      console.error("Erro ao copiar o código PIX:", err);
    });
});
