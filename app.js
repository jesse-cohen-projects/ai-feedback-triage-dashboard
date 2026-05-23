const feedback = [
  {
    id: 1,
    customer: "Northstar Health",
    source: "Sales call",
    sentiment: "negative",
    urgency: "high",
    theme: "Reporting",
    quote: "The weekly executive report takes too much manual cleanup before we can share it with leadership.",
    impact: 9,
    confidence: 8,
    effort: 5,
    summary: "Enterprise admins need polished, shareable reports without manual spreadsheet cleanup."
  },
  {
    id: 2,
    customer: "BrightLedger",
    source: "Support ticket",
    sentiment: "mixed",
    urgency: "medium",
    theme: "Integrations",
    quote: "The Slack alerts are useful, but they are too noisy for our account managers.",
    impact: 7,
    confidence: 7,
    effort: 4,
    summary: "Notification controls could reduce alert fatigue while preserving workflow visibility."
  },
  {
    id: 3,
    customer: "Orbit Schools",
    source: "App review",
    sentiment: "negative",
    urgency: "high",
    theme: "Onboarding",
    quote: "I could not tell what to do after inviting my team, so we dropped the trial.",
    impact: 8,
    confidence: 6,
    effort: 3,
    summary: "Trial activation may be blocked by unclear next steps after team invitation."
  },
  {
    id: 4,
    customer: "Summit Supply",
    source: "Interview",
    sentiment: "positive",
    urgency: "low",
    theme: "Analytics",
    quote: "The usage trends view is the first thing our team checks on Monday mornings.",
    impact: 6,
    confidence: 8,
    effort: 2,
    summary: "The trends view is valuable and could become a stronger habit-forming entry point."
  },
  {
    id: 5,
    customer: "Helio Foods",
    source: "Support ticket",
    sentiment: "negative",
    urgency: "medium",
    theme: "Permissions",
    quote: "Regional managers can see accounts outside their territory, which makes rollout harder.",
    impact: 8,
    confidence: 7,
    effort: 6,
    summary: "Role-based access gaps are slowing multi-region deployment."
  },
  {
    id: 6,
    customer: "Copperline Bank",
    source: "Sales call",
    sentiment: "mixed",
    urgency: "high",
    theme: "Reporting",
    quote: "We need audit-ready exports before procurement will approve a larger contract.",
    impact: 10,
    confidence: 7,
    effort: 6,
    summary: "Audit-ready reporting may unlock larger regulated-market deals."
  },
  {
    id: 7,
    customer: "Vale Retail",
    source: "Interview",
    sentiment: "positive",
    urgency: "medium",
    theme: "Integrations",
    quote: "If Salesforce sync worked both ways, this would replace two manual handoff meetings.",
    impact: 8,
    confidence: 6,
    effort: 7,
    summary: "Bidirectional CRM sync could reduce operational overhead for revenue teams."
  },
  {
    id: 8,
    customer: "Mariner Logistics",
    source: "Support ticket",
    sentiment: "negative",
    urgency: "medium",
    theme: "Reporting",
    quote: "Our account leads rebuild the same monthly customer report by hand because the export does not match the renewal meeting format.",
    impact: 8,
    confidence: 8,
    effort: 5,
    summary: "Customer-facing teams need reusable report formats that support renewal and account review conversations."
  }
];

const state = {
  selectedId: feedback[0].id,
  activeView: "inbox",
  filterStickPoint: 0,
  filters: {
    source: "all",
    sentiment: "all",
    urgency: "all",
    theme: "all"
  }
};

const elements = {
  feedbackList: document.querySelector("#feedbackList"),
  navItems: document.querySelectorAll(".nav-item"),
  viewSections: document.querySelectorAll(".view-section"),
  pmLensCopy: document.querySelector("#pmLensCopy"),
  themeList: document.querySelector("#themeList"),
  opportunityList: document.querySelector("#opportunityList"),
  filters: document.querySelector(".filters"),
  resultCount: document.querySelector("#resultCount"),
  visibleCount: document.querySelector("#visibleCount"),
  highestPriorityTheme: document.querySelector("#highestPriorityTheme"),
  mostUrgentTheme: document.querySelector("#mostUrgentTheme"),
  highestCountTheme: document.querySelector("#highestCountTheme"),
  briefTitle: document.querySelector("#briefTitle"),
  briefPriority: document.querySelector("#briefPriority"),
  briefWhy: document.querySelector("#briefWhy"),
  briefEvidence: document.querySelector("#briefEvidence"),
  briefQuestions: document.querySelector("#briefQuestions"),
  briefPartner: document.querySelector("#briefPartner"),
  detailCustomer: document.querySelector("#detailCustomer"),
  detailQuote: document.querySelector("#detailQuote"),
  detailImpact: document.querySelector("#detailImpact"),
  detailConfidence: document.querySelector("#detailConfidence"),
  detailEffort: document.querySelector("#detailEffort"),
  aiBrief: document.querySelector("#aiBrief"),
  generateSummary: document.querySelector("#generateSummary"),
  sourceFilter: document.querySelector("#sourceFilter"),
  sentimentFilter: document.querySelector("#sentimentFilter"),
  urgencyFilter: document.querySelector("#urgencyFilter"),
  themeFilter: document.querySelector("#themeFilter")
};

function priorityScore(item) {
  return Math.round((item.impact * item.confidence) / item.effort);
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function uniqueValues(key) {
  return [...new Set(feedback.map((item) => item[key]))].sort();
}

function populateFilter(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = titleCase(value);
    select.appendChild(option);
  });
}

function filteredFeedback() {
  return feedback.filter((item) => {
    return Object.entries(state.filters).every(([key, value]) => value === "all" || item[key] === value);
  });
}

function renderMetrics(items) {
  const themes = summarizeThemes(items);
  const highestPriority = themes[0];
  const mostUrgent = [...themes].sort((a, b) => b.urgentCount - a.urgentCount || b.averageScore - a.averageScore)[0];
  const highestCount = [...themes].sort((a, b) => b.count - a.count || b.averageScore - a.averageScore)[0];

  elements.visibleCount.textContent = items.length;
  elements.highestPriorityTheme.innerHTML = highestPriority
    ? `${highestPriority.theme}<small>Priority ${highestPriority.averageScore}</small>`
    : "-";
  elements.mostUrgentTheme.innerHTML = mostUrgent && mostUrgent.urgentCount > 0
    ? `${mostUrgent.theme}<small>${mostUrgent.urgentCount} urgent</small>`
    : "None";
  elements.highestCountTheme.innerHTML = highestCount
    ? `${highestCount.theme}<small>${highestCount.count} items</small>`
    : "-";
}

function renderFeedback(items) {
  elements.resultCount.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
  elements.feedbackList.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <strong>No matching feedback</strong>
      <p>Try broadening the filters to review more customer signals.</p>
    `;
    elements.feedbackList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = `feedback-card${item.id === state.selectedId ? " selected" : ""}`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="feedback-meta">
        <strong>${item.customer}</strong>
        <span>${item.source}</span>
      </div>
      <p>${item.quote}</p>
      <div class="tag-row">
        <span class="tag ${item.sentiment}">${titleCase(item.sentiment)}</span>
        <span class="tag ${item.urgency}">${titleCase(item.urgency)} urgency</span>
        <span class="tag theme">${item.theme}</span>
        <span class="priority-score">Priority ${priorityScore(item)}</span>
        <span class="view-signal-cue">${item.id === state.selectedId ? "Signal open" : "View signal"}</span>
      </div>
      ${item.id === state.selectedId ? `
        <div class="mobile-signal-detail">
          <strong>Selected signal</strong>
          <dl class="mobile-score-grid">
            <div>
              <dt>Impact</dt>
              <dd>${item.impact}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>${item.confidence}</dd>
            </div>
            <div>
              <dt>Effort</dt>
              <dd>${item.effort}</dd>
            </div>
          </dl>
          <p>${item.summary}</p>
        </div>
      ` : ""}
    `;
    card.addEventListener("click", () => selectFeedback(item.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectFeedback(item.id);
      }
    });
    elements.feedbackList.appendChild(card);
  });
}

function renderDetail() {
  const selected = feedback.find((item) => item.id === state.selectedId) || feedback[0];
  elements.detailCustomer.textContent = selected.customer;
  elements.detailQuote.textContent = selected.quote;
  elements.detailImpact.textContent = selected.impact;
  elements.detailConfidence.textContent = selected.confidence;
  elements.detailEffort.textContent = selected.effort;
  elements.aiBrief.textContent = selected.summary;
}

function renderOpportunities(items) {
  const grouped = items.reduce((groups, item) => {
    groups[item.theme] ||= [];
    groups[item.theme].push(item);
    return groups;
  }, {});

  const opportunities = Object.entries(grouped)
    .map(([theme, group]) => {
      const averageScore = Math.round(group.reduce((total, item) => total + priorityScore(item), 0) / group.length);
      const urgentCount = group.filter((item) => item.urgency === "high").length;
      return {
        theme,
        averageScore,
        copy: `${group.length} signal${group.length === 1 ? "" : "s"} with ${urgentCount} high-urgency item${urgentCount === 1 ? "" : "s"}. Review customer impact, revenue relevance, and implementation effort.`
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  elements.opportunityList.innerHTML = "";

  if (opportunities.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <strong>No opportunities available</strong>
      <p>Roadmap candidates appear when at least one feedback item matches the filters.</p>
    `;
    elements.opportunityList.appendChild(empty);
    return;
  }

  opportunities.forEach((opportunity) => {
    const card = document.createElement("article");
    card.className = "opportunity-card";
    card.innerHTML = `
      <strong>${opportunity.theme}</strong>
      <p>${opportunity.copy}</p>
      <span class="priority-score">Avg. priority ${opportunity.averageScore}</span>
    `;
    elements.opportunityList.appendChild(card);
  });
}

function highestPriorityTheme(items) {
  const themes = summarizeThemes(items);
  return themes[0] || null;
}

function partnerForTheme(theme) {
  const partners = {
    Analytics: "Product and data engineering",
    Integrations: "Product, partnerships, and platform engineering",
    Onboarding: "Product, design, and growth",
    Permissions: "Product, security, and engineering",
    Reporting: "Product, design, and reporting engineering"
  };
  return partners[theme] || "Product, design, and engineering";
}

function questionForTheme(theme) {
  const questions = {
    Analytics: "Which usage signals predict retention or expansion?",
    Integrations: "Which integrations remove the most manual work for revenue teams?",
    Onboarding: "Where do new teams lose momentum during trial activation?",
    Permissions: "Which permission gaps block rollout for multi-region customers?",
    Reporting: "Which export formats and approval workflows are required for executive or regulated buyers?"
  };
  return questions[theme] || "What evidence would increase confidence before roadmap commitment?";
}

function renderDecisionBrief(items) {
  const theme = highestPriorityTheme(items);

  if (!theme) {
    elements.briefTitle.textContent = "No recommendation available";
    elements.briefPriority.textContent = "Priority -";
    elements.briefWhy.textContent = "No feedback matches the current filters.";
    elements.briefEvidence.textContent = "Broaden the filters to review more customer signals.";
    elements.briefQuestions.textContent = "Which customer segment should be investigated first?";
    elements.briefPartner.textContent = "Product";
    return;
  }

  elements.briefTitle.textContent = `Investigate ${theme.theme}`;
  elements.briefPriority.textContent = `Avg. priority ${theme.averageScore}`;
  elements.briefWhy.textContent = `${theme.theme} is the highest-priority visible theme based on impact, confidence, and effort.`;
  elements.briefEvidence.textContent = `${theme.count} signal${theme.count === 1 ? "" : "s"} with ${theme.urgentCount} high-urgency item${theme.urgentCount === 1 ? "" : "s"}.`;
  elements.briefQuestions.textContent = questionForTheme(theme.theme);
  elements.briefPartner.textContent = partnerForTheme(theme.theme);
}

function summarizeThemes(items) {
  const grouped = items.reduce((groups, item) => {
    groups[item.theme] ||= [];
    groups[item.theme].push(item);
    return groups;
  }, {});

  return Object.entries(grouped)
    .map(([theme, group]) => {
      const averageScore = Math.round(group.reduce((total, item) => total + priorityScore(item), 0) / group.length);
      const urgentCount = group.filter((item) => item.urgency === "high").length;
      const sentimentMix = group.reduce((counts, item) => {
        counts[item.sentiment] = (counts[item.sentiment] || 0) + 1;
        return counts;
      }, {});
      return {
        theme,
        count: group.length,
        urgentCount,
        averageScore,
        sentimentMix,
        summary: group[0].summary
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);
}

function renderThemes(items) {
  const themes = summarizeThemes(items);
  elements.themeList.innerHTML = "";

  if (themes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <strong>No themes available</strong>
      <p>Theme summaries appear when at least one feedback item matches the filters.</p>
    `;
    elements.themeList.appendChild(empty);
    return;
  }

  themes.forEach((theme) => {
    const sentimentText = Object.entries(theme.sentimentMix)
      .map(([sentiment, count]) => `${count} ${sentiment}`)
      .join(", ");
    const card = document.createElement("article");
    card.className = "theme-card";
    card.innerHTML = `
      <strong>${theme.theme}</strong>
      <p>${theme.summary}</p>
      <footer>
        <span class="tag theme">${theme.count} signal${theme.count === 1 ? "" : "s"}</span>
        <span class="tag high">${theme.urgentCount} high urgency</span>
        <span class="priority-score">Avg. priority ${theme.averageScore}</span>
        <span class="tag">${sentimentText}</span>
      </footer>
    `;
    elements.themeList.appendChild(card);
  });
}

function switchView(view) {
  const lensCopy = {
    inbox: "Review raw signals before jumping to conclusions.",
    themes: "Look for patterns across feedback, not isolated comments.",
    roadmap: "Treat priority as a discussion aid, not a decision machine."
  };

  state.activeView = view;
  document.body.classList.toggle("non-inbox-view", view !== "inbox");
  if (view !== "inbox") {
    document.body.classList.add("filters-active");
  }
  elements.pmLensCopy.textContent = lensCopy[view] || lensCopy.inbox;
  elements.navItems.forEach((item) => {
    const isActive = item.dataset.view === view;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });
  elements.viewSections.forEach((section) => {
    section.classList.toggle("hidden", section.dataset.section !== view);
  });
}

function jumpToMobileWorkArea(view) {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  if (!isMobile || view === "inbox") {
    return;
  }

  const jump = () => {
    document.body.classList.add("filters-active");
    const activeSection = document.querySelector(`.view-section[data-section="${view}"]`);
    const filterHeight = elements.filters.offsetHeight;
    const top = activeSection.getBoundingClientRect().top + window.scrollY - filterHeight - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  };

  requestAnimationFrame(() => requestAnimationFrame(jump));
  window.setTimeout(jump, 80);
}

function updateFilterStickPoint() {
  const analyticsHeight = document.querySelector(".sticky-analytics")?.offsetHeight || 0;
  state.filterStickPoint = elements.filters.offsetTop - analyticsHeight;
}

function selectFeedback(id) {
  state.selectedId = id;
  render();
}

function render() {
  const items = filteredFeedback();
  renderMetrics(items);
  renderDecisionBrief(items);
  renderFeedback(items);
  renderDetail();
  renderThemes(items);
  renderOpportunities(items);
  switchView(state.activeView);
  updateFilterStickPoint();
}

function initialize() {
  populateFilter(elements.sourceFilter, uniqueValues("source"));
  populateFilter(elements.sentimentFilter, uniqueValues("sentiment"));
  populateFilter(elements.urgencyFilter, uniqueValues("urgency"));
  populateFilter(elements.themeFilter, uniqueValues("theme"));

  [
    ["source", elements.sourceFilter],
    ["sentiment", elements.sentimentFilter],
    ["urgency", elements.urgencyFilter],
    ["theme", elements.themeFilter]
  ].forEach(([key, select]) => {
    select.addEventListener("change", () => {
      state.filters[key] = select.value;
      render();
    });
  });

  elements.navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const view = item.dataset.view;
      switchView(view);
      jumpToMobileWorkArea(view);
    });
  });

  elements.generateSummary.addEventListener("click", () => {
    const items = filteredFeedback();
    const urgent = items.filter((item) => item.urgency === "high").length;
    const theme = highestPriorityTheme(items)?.theme || "No theme";
    elements.aiBrief.textContent = `AI brief: ${items.length} visible feedback items include ${urgent} high-urgency signals. ${theme} is the strongest current theme and should be evaluated against customer impact, revenue relevance, confidence, and effort.`;
  });

  window.addEventListener("resize", updateFilterStickPoint);

  window.addEventListener("scroll", () => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const shouldActivateFilters = isMobile && window.scrollY >= state.filterStickPoint;
    const shouldReleaseFilters = (!isMobile || window.scrollY < state.filterStickPoint - 180) && state.activeView === "inbox";
    document.body.classList.toggle("is-scrolled", window.scrollY > 96);
    if (shouldActivateFilters) {
      document.body.classList.add("filters-active");
    }
    if (shouldReleaseFilters) {
      document.body.classList.remove("filters-active");
    }
  }, { passive: true });

  render();
}

initialize();
