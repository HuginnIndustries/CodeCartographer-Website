document.documentElement.classList.add("js");
/* Pipeline data for the interactive switcher */
const pipelineData = {
  "full-with-deep-audit": {
    kicker: "7 phases",
    title: "Full with deep audit",
    description:
      "Complete analysis with a two-pass defect scan. An early mechanical sweep catches surface-level issues; a later semantic pass re-examines defects with full contracts and protocols context before reimplementation planning.",
    phases: [
      "Architecture",
      "Defect scan (mechanical)",
      "Contracts",
      "Protocols",
      "Defect scan (semantic)",
      "Porting",
      "Reimplementation spec",
    ],
    note: "The default pipeline. Best when you need the deepest defect analysis grounded in full behavioral understanding.",
  },
  "full-with-audit": {
    kicker: "6 phases",
    title: "Full with audit",
    description:
      "Complete reverse-engineering with a single defect scan phase before contracts, protocols, porting, and reimplementation planning.",
    phases: [
      "Architecture",
      "Defect scan",
      "Contracts",
      "Protocols",
      "Porting",
      "Reimplementation spec",
    ],
    note: "Best when the codebase has mostly mechanical defects and you do not need a second, context-grounded defect pass.",
  },
  full: {
    kicker: "5 phases",
    title: "Full",
    description:
      "A full understanding and reimplementation workflow without a dedicated defect-scan phase.",
    phases: ["Architecture", "Contracts", "Protocols", "Porting", "Reimplementation spec"],
    note: "A good fit when porting matters more than auditing existing bugs.",
  },
  "defect-scan": {
    kicker: "2 phases",
    title: "Defect scan",
    description:
      "A maintenance-oriented pass that maps the system and then hunts for correctness, reliability, security, and environment defects.",
    phases: ["Architecture", "Defect scan"],
    note: "Use this when the goal is triage and cleanup rather than a full rewrite plan.",
  },
  lite: {
    kicker: "3 phases",
    title: "Lite",
    description:
      "A focused behavior-recovery workflow for understanding how a system works without producing the porting bundle.",
    phases: ["Architecture", "Contracts", "Protocols"],
    note: "The fastest option that still leaves you with durable product and protocol knowledge.",
  },
  "architecture-only": {
    kicker: "1 phase",
    title: "Architecture only",
    description:
      "A quick structural pass that documents system intent, layers, public surfaces, and runtime shape.",
    phases: ["Architecture"],
    note: "Ideal as a low-cost first pass when you only need to orient yourself.",
  },
  synthesis: {
    kicker: "4 phases · forward flow",
    title: "Synthesis",
    description:
      "Combines a product vision with explicitly confirmed, versioned library specifications to create an implementation-ready plan without losing provenance.",
    phases: ["Vision capture", "Candidate proposal + human confirmation", "Specification merge", "Project plan"],
    note: "Pi/MCP only. Runtime preflight refuses to merge or finalize until a human confirms at least one version-pinned input.",
  },
};

function initPipelineSwitcher() {
  const tabs = document.querySelectorAll(".pipeline-tab");
  const kicker = document.querySelector("#pipeline-kicker");
  const title = document.querySelector("#pipeline-title");
  const description = document.querySelector("#pipeline-description");
  const phases = document.querySelector("#pipeline-phases");
  const note = document.querySelector("#pipeline-note");

  if (!tabs.length || !kicker || !title) return;

  function update(key) {
    const data = pipelineData[key];
    if (!data) return;

    kicker.textContent = data.kicker;
    title.textContent = data.title;
    description.textContent = data.description;
    if (phases) {
      phases.innerHTML = data.phases.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    }
    if (note) note.textContent = data.note;

    tabs.forEach(function (tab) {
      var isActive = tab.dataset.pipeline === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      update(tab.dataset.pipeline);
    });
  });

  update("full-with-deep-audit");
}

function initCopyButtons() {
  document.querySelectorAll(".copy-button").forEach(function (button) {
    var originalLabel = button.textContent.trim();
    button.addEventListener("click", function () {
      var text = button.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(function () {
        button.textContent = "Copied";
        setTimeout(function () {
          button.textContent = originalLabel;
        }, 1600);
      }).catch(function () {
        /* clipboard unavailable; silently ignore */
      });
    });
  });
}

function initScrollReveal() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-reveal]").forEach(function (node) {
    observer.observe(node);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initPipelineSwitcher();
  initCopyButtons();
  initScrollReveal();
});
