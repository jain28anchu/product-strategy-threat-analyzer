function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

let latestPlainText = "";

function generateStrategy() {
  const companyName = document.getElementById("companyName").value.trim();
  const marketType = document.getElementById("marketType").value;

  let businessGoal = document.getElementById("businessGoal").value;
  let competitivePressure = document.getElementById("competitivePressure").value;
  let timeHorizon = document.getElementById("timeHorizon").value;
  let knownThreat = document.getElementById("knownThreat").value.trim();

  const output = document.getElementById("output");

  if (!companyName || !marketType) {
    output.className = "output-placeholder";
    output.innerHTML = "Please enter a company / product and select a market type.";
    return;
  }

  if (!businessGoal) {
    const goalDefaults = {
      "Consumer Tech": "Grow Users",
      "Enterprise SaaS": "Expand Platform Adoption",
      "Fintech": "Defend Market Share",
      "Marketplace": "Improve Retention",
      "AI Platform": "Launch AI Capabilities",
      "Media / Entertainment": "Increase Revenue"
    };
    businessGoal = goalDefaults[marketType];
  }

  if (!competitivePressure) {
    const pressureDefaults = {
      "Consumer Tech": "High",
      "Enterprise SaaS": "Medium",
      "Fintech": "High",
      "Marketplace": "High",
      "AI Platform": "High",
      "Media / Entertainment": "High"
    };
    competitivePressure = pressureDefaults[marketType];
  }

  if (!timeHorizon) {
    timeHorizon = "Next 3 Years";
  }

  if (!knownThreat) {
    const threatDefaults = {
      "Consumer Tech": "AI-native consumer apps and changing user behavior",
      "Enterprise SaaS": "AI-native workflow platforms and platform consolidation",
      "Fintech": "embedded finance, big tech wallets, and AI-powered underwriting",
      "Marketplace": "disintermediation, trust erosion, and supply-demand imbalance",
      "AI Platform": "commoditization, open-source models, and infrastructure lock-in",
      "Media / Entertainment": "short-form platforms, AI-generated content, and creator monetization shifts"
    };
    knownThreat = threatDefaults[marketType];
  }

  const marketThreats = {
    "Consumer Tech": [
      "User attention is shifting toward faster, more personalized, AI-native experiences.",
      "Distribution advantages are weakening as discovery moves across social, search, and AI assistants.",
      "Younger users may form habits on newer products before incumbents can adapt."
    ],
    "Enterprise SaaS": [
      "AI-native tools may collapse multiple workflows into simpler end-to-end platforms.",
      "Customers may consolidate vendors to reduce cost and complexity.",
      "Internal users may resist adoption if workflows feel fragmented or hard to operationalize."
    ],
    "Fintech": [
      "Trust, compliance, and risk controls can become competitive differentiators or blockers.",
      "Big tech and banks can bundle financial services into existing ecosystems.",
      "AI-enabled underwriting and fraud detection may reset customer expectations."
    ],
    "Marketplace": [
      "Supply or demand concentration can weaken marketplace liquidity.",
      "Participants may disintermediate the platform once trust is established.",
      "Trust, safety, pricing, and matching quality can become strategic bottlenecks."
    ],
    "AI Platform": [
      "Model capabilities may commoditize faster than product differentiation can compound.",
      "Open-source alternatives can pressure pricing and reduce switching costs.",
      "Enterprise buyers may prefer platforms with stronger governance, integration, and reliability."
    ],
    "Media / Entertainment": [
      "Short-form and AI-generated content may change consumption habits.",
      "Creator monetization pressure can weaken supply-side loyalty.",
      "Advertisers may shift spend toward platforms with stronger targeting or measurable ROI."
    ]
  };

  const strategicOptions = {
    "Consumer Tech": [
      "Build stronger personalization and habit-forming product loops.",
      "Partner with creators, communities, or distribution platforms.",
      "Defend engagement through differentiated user experience and trust."
    ],
    "Enterprise SaaS": [
      "Build integrated workflows that reduce customer switching.",
      "Partner with ecosystem platforms to improve interoperability.",
      "Defend through data, governance, and embedded enterprise processes."
    ],
    "Fintech": [
      "Build trust-first product experiences with transparent decisions.",
      "Partner with banks, employers, or platforms to improve distribution.",
      "Defend through risk controls, compliance strength, and member lifecycle value."
    ],
    "Marketplace": [
      "Build stronger matching, trust, and liquidity systems.",
      "Partner with supply-side or demand-side aggregators.",
      "Defend through network effects and differentiated participant value."
    ],
    "AI Platform": [
      "Build productized workflows on top of model capabilities.",
      "Partner with cloud, data, or enterprise software ecosystems.",
      "Defend through proprietary data, integrations, governance, and reliability."
    ],
    "Media / Entertainment": [
      "Build creator tools, AI-assisted production workflows, and monetization products.",
      "Partner with creators, studios, advertisers, and AI tooling providers.",
      "Defend through content quality, creator loyalty, and monetization advantage."
    ]
  };

  const signals = {
    "Consumer Tech": ["DAU/MAU trend", "Gen Z engagement", "session frequency", "creator/user migration", "organic acquisition"],
    "Enterprise SaaS": ["seat expansion", "workflow adoption", "renewal rate", "admin activation", "integration usage"],
    "Fintech": ["approval rate", "fraud rate", "member trust", "loan conversion", "lifecycle product adoption"],
    "Marketplace": ["liquidity", "match rate", "repeat transactions", "supply churn", "take rate"],
    "AI Platform": ["model usage", "API retention", "enterprise adoption", "latency/reliability", "governance incidents"],
    "Media / Entertainment": ["watch time", "creator churn", "CPM trends", "short-form engagement", "subscription/ads mix"]
  };

  const severityScore = calculateThreatScore(competitivePressure, timeHorizon, knownThreat, marketType);
  const confidenceScore = calculateConfidenceScore(competitivePressure, knownThreat, timeHorizon);

  const severityLabel =
    severityScore >= 85
      ? "Existential Threat"
      : severityScore >= 70
      ? "High Strategic Threat"
      : severityScore >= 50
      ? "Moderate Threat"
      : "Manageable Threat";

  const topThreats = marketThreats[marketType];

  const mostLikelyFailureMode =
    generateFailureMode(companyName, marketType, businessGoal);

  const whyThreatWins =
    generateWhyThreatWins(marketType, knownThreat);

  const secondOrderEffects =
    generateSecondOrderEffects(marketType);

  const recommendedBet =
    generateStrategicBet(companyName, marketType, businessGoal);

  const aiRecommendation =
    `Because ${companyName} operates in ${marketType.toLowerCase()} with ${competitivePressure.toLowerCase()} competitive pressure, the strongest move is to prioritize defensible product loops, customer lock-in, and faster learning cycles before expanding into lower-confidence bets.`;

  const executiveSummary =
    `${companyName} faces a ${severityLabel.toLowerCase()} over the ${timeHorizon.toLowerCase()}, driven by ${knownThreat}. The main strategic risk is not just direct competition, but a shift in customer behavior, distribution power, and product expectations.`;

  latestPlainText = `
PRODUCT STRATEGY THREAT ANALYSIS

Company / Product:
${companyName}

Executive Summary:
${executiveSummary}

Threat Severity:
${severityScore}/100 — ${severityLabel}

Strategic Confidence:
${confidenceScore}%

Top Threats:
- ${topThreats.join("\n- ")}

Why This Threat Wins:
${whyThreatWins}

Most Likely Failure Mode:
${mostLikelyFailureMode}

Second-Order Effects:
${secondOrderEffects}

Recommended Strategic Bet:
${recommendedBet}

AI Recommendation:
${aiRecommendation}
`;

  output.className = "output-grid";

  output.innerHTML = `
    <div class="result-card purple-card">
      <h2>Executive Summary</h2>
      <p>${executiveSummary}</p>
    </div>

    <div class="metrics-row">
      <div class="metric-box">
        <span>Threat Severity</span>
        <strong>${severityLabel}</strong>
      </div>

      <div class="metric-box">
        <span>Threat Score</span>
        <strong>${severityScore}/100</strong>
      </div>

      <div class="metric-box">
        <span>Strategic Confidence</span>
        <strong>${confidenceScore}%</strong>
      </div>

      <div class="metric-box">
        <span>Time Horizon</span>
        <strong>${timeHorizon}</strong>
      </div>
    </div>

    <div class="result-card red-card">
      <h2>Threat Score</h2>
      <p><strong>${severityScore}/100 — ${severityLabel}</strong></p>
      <div class="score-bar">
        <div class="score-fill" style="width: ${severityScore}%"></div>
      </div>
    </div>

    <div class="result-card orange-card">
      <h2>Top Strategic Threats</h2>
      <ul>
        ${topThreats.map(threat => `<li>${threat}</li>`).join("")}
      </ul>
    </div>

    <div class="result-card red-card">
      <h2>Why This Threat Wins</h2>
      <p>${whyThreatWins}</p>
    </div>

    <div class="result-card orange-card">
      <h2>Most Likely Failure Mode</h2>
      <p>${mostLikelyFailureMode}</p>
    </div>

    <div class="result-card blue-card">
      <h2>Second-Order Effects</h2>
      <p>${secondOrderEffects}</p>
    </div>

    <div class="result-card green-card">
      <h2>Strategic Options</h2>
      <ul>
        ${strategicOptions[marketType].map(option => `<li>${option}</li>`).join("")}
      </ul>
    </div>

    <div class="result-card green-card">
      <h2>Recommended Strategic Bet</h2>
      <p>${recommendedBet}</p>
    </div>

    <div class="result-card purple-card">
      <h2>AI Recommendation Engine</h2>
      <p>${aiRecommendation}</p>
    </div>

    <div class="result-card blue-card">
      <h2>90-Day Action Plan</h2>
      <div class="timeline">
        <div class="timeline-step">
          <strong>Days 1–30 — Diagnose</strong>
          Validate threat assumptions, benchmark competitors, and identify exposed customer segments.
        </div>

        <div class="timeline-step">
          <strong>Days 31–60 — Prioritize</strong>
          Define strategic bets, quantify business impact, and align stakeholders around tradeoffs.
        </div>

        <div class="timeline-step">
          <strong>Days 61–90 — Execute</strong>
          Launch pilots, measure early signals, and decide whether to scale, partner, or defend.
        </div>
      </div>
    </div>

    <div class="result-card green-card">
      <h2>Signals To Monitor</h2>
      <ul>
        ${signals[marketType].map(signal => `<li>${signal}</li>`).join("")}
      </ul>
    </div>

    <div class="result-card orange-card">
      <h2>Leadership Questions</h2>
      <ul>
        <li>Why is this the most important strategic threat right now?</li>
        <li>What customer behavior is changing fastest?</li>
        <li>What capability would be hardest for competitors to copy?</li>
        <li>Should we build, buy, partner, or defend?</li>
        <li>What would make us change this strategy?</li>
      </ul>
    </div>

    <div class="result-card purple-card">
      <h2>Assumptions Used</h2>
      <ul>
        <li>Business goal, pressure, and time horizon were recommended when left blank.</li>
        <li>Known threat was auto-generated based on selected market type if left blank.</li>
        <li>Threat score is directional and based on market type, pressure, time horizon, and stated threat.</li>
        <li>Recommendations should be validated with customer, competitor, and financial data.</li>
      </ul>
    </div>
  `;
}

function calculateThreatScore(pressure, horizon, threat, marketType) {
  let score = 50;

  if (pressure === "High") score += 25;
  if (pressure === "Medium") score += 12;
  if (pressure === "Low") score -= 5;

  if (horizon === "Next 5 Years") score += 15;
  if (horizon === "Next 3 Years") score += 10;
  if (horizon === "Next 6 Months") score += 4;

  if (threat.length > 20) score += 8;

  if (marketType === "AI Platform" || marketType === "Media / Entertainment") {
    score += 7;
  }

  return Math.max(35, Math.min(100, score));
}

function calculateConfidenceScore(pressure, threat, horizon) {
  let score = 62;

  if (pressure === "High") score += 10;
  if (threat.length > 20) score += 12;
  if (horizon === "Next 3 Years" || horizon === "Next 5 Years") score += 8;

  return Math.max(45, Math.min(95, score));
}

function generateFailureMode(company, market, goal) {
  const modes = {
    "Consumer Tech":
      `${company} over-optimizes engagement while missing a deeper shift in user habits and discovery behavior.`,

    "Enterprise SaaS":
      `${company} loses strategic relevance if customers consolidate workflows into fewer AI-native platforms.`,

    "Fintech":
      `${company} underestimates how trust, compliance, and embedded distribution reshape customer acquisition.`,

    "Marketplace":
      `${company} loses liquidity if one side of the marketplace finds cheaper or more direct alternatives.`,

    "AI Platform":
      `${company} becomes commoditized if model capability improves faster than product differentiation and workflow lock-in.`,

    "Media / Entertainment":
      `${company} loses creator or viewer loyalty if monetization, format, or discovery shifts faster than the core product adapts.`
  };

  return modes[market];
}

function generateWhyThreatWins(market, threat) {
  const reasons = {
    "Consumer Tech":
      `${threat} wins if it changes user habits faster than incumbents can rebuild distribution and engagement loops.`,

    "Enterprise SaaS":
      `${threat} wins if it becomes embedded into daily workflows and reduces switching friction for enterprise teams.`,

    "Fintech":
      `${threat} wins if it combines lower friction, higher trust, and better risk decisions inside existing financial behavior.`,

    "Marketplace":
      `${threat} wins if it improves liquidity, trust, or pricing faster than the incumbent marketplace can respond.`,

    "AI Platform":
      `${threat} wins if it commoditizes core capabilities and shifts value toward workflow ownership, data access, or enterprise trust.`,

    "Media / Entertainment":
      `${threat} wins if it captures creator supply, changes content consumption habits, or monetizes attention more effectively.`
  };

  return reasons[market];
}

function generateSecondOrderEffects(market) {
  const effects = {
    "Consumer Tech":
      "As user behavior shifts, acquisition costs may rise, organic engagement may weaken, and product teams may face pressure to copy competitors instead of differentiating.",

    "Enterprise SaaS":
      "Workflow consolidation can reduce seat expansion, weaken admin control, and make integrations or data portability more strategically important.",

    "Fintech":
      "Risk controls, trust failures, or regulatory pressure can slow innovation and make customer acquisition more expensive.",

    "Marketplace":
      "Small liquidity issues can compound into lower trust, worse matching, supply churn, and weaker unit economics.",

    "AI Platform":
      "Model commoditization may shift competition toward distribution, proprietary data, enterprise governance, and workflow depth.",

    "Media / Entertainment":
      "Creator incentives, advertiser trust, moderation costs, and format shifts can reshape the entire business model."
  };

  return effects[market];
}

function generateStrategicBet(company, market, goal) {
  const bets = {
    "Consumer Tech":
      `Invest in differentiated engagement loops, personalization, and habit formation before user behavior shifts permanently.`,

    "Enterprise SaaS":
      `Build deeper workflow integration, governance, and data-layer differentiation to make ${company} harder to replace.`,

    "Fintech":
      `Prioritize trust, lifecycle engagement, and smarter risk infrastructure to defend against embedded and AI-native competitors.`,

    "Marketplace":
      `Strengthen liquidity, trust, and matching quality so the marketplace becomes more valuable as it scales.`,

    "AI Platform":
      `Move beyond model access by owning workflows, proprietary data loops, enterprise controls, and developer adoption.`,

    "Media / Entertainment":
      `Double down on creator tooling, monetization, AI-assisted production, and differentiated discovery experiences.`
  };

  return bets[market];
}

function copyOutput() {
  if (!latestPlainText.trim()) {
    alert("Generate a strategy analysis first.");
    return;
  }

  navigator.clipboard.writeText(latestPlainText);
  alert("Copied to clipboard.");
}

function downloadText() {
  if (!latestPlainText.trim()) {
    alert("Generate a strategy analysis first.");
    return;
  }

  const blob = new Blob([latestPlainText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "strategy-threat-analysis.txt";
  link.click();

  URL.revokeObjectURL(url);
}

document.querySelectorAll("select, input").forEach((field) => {
  field.addEventListener("change", () => {
    if (field.value) {
      field.classList.add("valid");
    } else {
      field.classList.remove("valid");
    }
  });

  field.addEventListener("input", () => {
    if (field.value) {
      field.classList.add("valid");
    } else {
      field.classList.remove("valid");
    }
  });
});