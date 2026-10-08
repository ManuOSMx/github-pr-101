const promptExamples = {
  build: "“Crea una página de inicio sencilla para una cafetería. Usa HTML y CSS, incluye un menú de productos y un botón para reservar.”",
  learn: "“Explícame cómo funciona una función map() en JavaScript. Usa un ejemplo pequeño y compáralo con un bucle for.”",
  fix: "“Este botón no cambia de color al hacer clic. Revisa mi código, explica el problema y propón una corrección mínima.”",
};

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");
const promptText = document.querySelector("#promptText");
const copyFeedback = document.querySelector("#copyFeedback");

function showSection(id) {
  const target = document.querySelector(`#${id}`);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.target === id));
}

navItems.forEach((item) => item.addEventListener("click", () => showSection(item.dataset.target)));
document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.scrollTo));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.target === entry.target.id));
      }
    });
  },
  { rootMargin: "-25% 0px -65% 0px" }
);
sections.forEach((section) => observer.observe(section));

document.querySelectorAll(".step-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".step-card").forEach((item) => item.classList.remove("is-current"));
    card.classList.add("is-current");
  });
});

document.querySelectorAll(".prompt-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".prompt-tab").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    promptText.textContent = promptExamples[tab.dataset.prompt];
    copyFeedback.classList.remove("is-visible");
  });
});

document.querySelector("#copyPrompt").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptText.textContent.replace(/[“”]/g, ""));
    copyFeedback.classList.add("is-visible");
    window.setTimeout(() => copyFeedback.classList.remove("is-visible"), 1800);
  } catch {
    copyFeedback.textContent = "Selecciona y copia el texto";
    copyFeedback.classList.add("is-visible");
  }
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
