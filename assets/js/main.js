/* =============================================
   C Programming Fundamentals — Main JS
   Author: Aditya Pratap Bhuyan
   License: GNU GPL v3
   ============================================= */

(function () {
  "use strict";

  /* ── Mobile sidebar toggle ── */
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar    = document.querySelector(".sidebar");
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (sidebar.classList.contains("open") &&
          !sidebar.contains(e.target) &&
          e.target !== menuToggle) {
        sidebar.classList.remove("open");
      }
    });
  }

  /* ── Copy-to-clipboard for code blocks ── */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.closest(".code-block").querySelector("pre");
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = "Copy"; }, 1800);
      });
    });
  });

  /* ── Hint toggles for exercises ── */
  document.querySelectorAll(".hint-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var body = btn.nextElementSibling;
      if (!body) return;
      var open = body.style.display === "block";
      body.style.display = open ? "none" : "block";
      btn.textContent = open ? "💡 Show hint" : "🙈 Hide hint";
    });
  });

  /* ── OS tab switcher ── */
  document.querySelectorAll(".os-tabs").forEach(function (tabs) {
    tabs.querySelectorAll(".os-tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.dataset.os;
        var container = tabs.closest(".os-tab-group");
        container.querySelectorAll(".os-tab-btn").forEach(function (b) { b.classList.remove("active"); });
        container.querySelectorAll(".os-tab-content").forEach(function (c) { c.classList.remove("active"); });
        btn.classList.add("active");
        var panel = container.querySelector('[data-os-panel="' + target + '"]');
        if (panel) panel.classList.add("active");
      });
    });
  });

  /* ── Generic tab switcher (chapter sections) ── */
  document.querySelectorAll(".tab-bar a").forEach(function (link) {
    /* active state is handled via server-side HTML active class; just highlight current page */
    if (link.href === window.location.href) link.classList.add("active");
  });

  /* ── Quiz logic ── */
  document.querySelectorAll(".quiz-form").forEach(function (form) {
    var submitBtn = form.querySelector(".quiz-submit");
    if (!submitBtn) return;
    submitBtn.addEventListener("click", function () {
      var questions = form.querySelectorAll(".quiz-question");
      var total  = questions.length;
      var score  = 0;
      var answered = true;
      questions.forEach(function (q) {
        var selected = q.querySelector("input[type='radio']:checked");
        var feedback = q.querySelector(".quiz-feedback");
        if (!selected) { answered = false; return; }
        var correct = selected.dataset.correct === "true";
        feedback.style.display = "block";
        if (correct) {
          score++;
          feedback.className = "quiz-feedback correct";
          feedback.textContent = "✓ Correct! " + (feedback.dataset.explanation || "");
        } else {
          feedback.className = "quiz-feedback wrong";
          var correctLabel = q.querySelector("input[data-correct='true']");
          feedback.textContent = "✗ Incorrect. " + (feedback.dataset.explanation || "");
        }
      });
      if (!answered) { alert("Please answer all questions before submitting."); return; }
      var scoreBox = form.querySelector(".quiz-score");
      if (scoreBox) {
        scoreBox.style.display = "block";
        var pct = Math.round((score / total) * 100);
        scoreBox.innerHTML =
          "Your score: <strong>" + score + " / " + total + "</strong> (" + pct + "%)" +
          (pct === 100 ? " 🎉 Perfect!" : pct >= 70 ? " 👍 Good job!" : " 📖 Review the material and try again.");
      }
      submitBtn.disabled = true;
    });
  });

  /* ── Mark sidebar active link ── */
  var path = window.location.pathname.replace(/\/$/, "") || "/index.html";
  document.querySelectorAll(".sidebar ul li a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && path.endsWith(href.replace(/^\.\//, "").replace(/\/$/, ""))) {
      a.classList.add("active");
    }
  });
})();
