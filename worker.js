export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Dragon Gold Rush</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <script src="https://sad.adsgram.ai/js/sad.min.js"></script>
  <style>
    :root { --bg: #0b0f19; --card: #151c2c; --border: #26334d; --accent: #f59e0b; --accent-glow: rgba(245, 158, 11, 0.35); --cyan: #10b981; --text: #f8fafc; --muted: #94a3b8; }
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); padding-bottom: 85px; overflow-x: hidden; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: rgba(21, 28, 44, 0.9); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50; backdrop-filter: blur(8px); }
    .user-box { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #000; }
    .u-name { font-size: 14px; font-weight: 700; }
    .u-sub { font-size: 11px; color: var(--muted); }
    .sync-badge { font-size: 11px; padding: 4px 10px; border-radius: 20px; background: rgba(16, 185, 129, 0.15); color: var(--cyan); border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600; }
    .balance-card { margin: 14px 16px; padding: 18px; border-radius: 18px; background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid var(--border); text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.4); }
    .bal-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
    .bal-val { font-size: 34px; font-weight: 900; color: var(--accent); margin: 4px 0; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .bal-usd { font-size: 13px; color: var(--cyan); font-weight: 600; }
    .stats-row { display: flex; justify-content: space-around; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 12px; }
    .stat-item span { display: block; font-weight: 800; color: var(--text); font-size: 14px; margin-top: 2px; }
    .view { display: none; padding: 0 16px; }
    .view.active { display: block; }
    .dragon-stage { position: relative; height: 230px; display: flex; align-items: center; justify-content: center; margin: 10px 0; }
    .dragon-circle { width: 185px; height: 185px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(21,28,44,0.9) 75%); border: 3px solid var(--accent); box-shadow: 0 0 35px var(--accent-glow); display: flex; align-items: center; justify-content: center; font-size: 92px; cursor: pointer; transition: transform 0.08s ease; }
    .dragon-circle:active { transform: scale(0.92); }
    .float-num { position: absolute; font-weight: 900; font-size: 22px; color: var(--accent); pointer-events: none; animation: floatUp 0.7s ease-out forwards; }
    @keyframes floatUp { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-70px) scale(1.25); } }
    .energy-wrap { margin-bottom: 16px; }
    .energy-top { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; font-weight: 700; }
    .progress-bg { width: 100%; height: 10px; background: #1e293b; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #10b981); width: 100%; transition: width 0.2s; }
    .card-box { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 16px; margin-bottom: 14px; }
    .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 700; font-size: 14px; }
    .btn { width: 100%; padding: 13px; border-radius: 12px; border: none; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .btn-gold { background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; box-shadow: 0 4px 15px var(--accent-glow); }
    .btn-cyan { background: linear-gradient(135deg, #10b981, #059669); color: #000; }
    .btn-outline { background: #1e293b; color: var(--text); border: 1px solid var(--border); }
    .btn:disabled { opacity: 0.5; }
    .wheel-wrap { position: relative; width: 220px; height: 220px; margin: 15px auto; }
    .wheel { width: 100%; height: 100%; border-radius: 50%; border: 5px solid var(--accent); background: #f59e0b; background-image: conic-gradient(#f59e0b 0deg 60deg, #10b981 60deg 120deg, #3b82f6 120deg 180deg, #8b5cf6 180deg 240deg, #ec4899 240deg 300deg, #ef4444 300deg 360deg); transition: transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(245,158,11,0.3); }
    .wheel-center { width: 55px; height: 55px; border-radius: 50%; background: var(--bg); border: 3px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 22px; }
    .wheel-pointer { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); font-size: 22px; z-index: 5; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--card); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 10px; }
    .input { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--border); background: #0f172a; color: #fff; margin-bottom: 10px; font-size: 14px; }
    .nav { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(15, 23, 42, 0.96); border-top: 1px solid var(--border); display: flex; justify-content: space-around; padding: 8px 4px 12px; z-index: 100; }
    .nav-btn { background: none; border: none; color: var(--muted); font-size: 11px; font-weight: 600; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; flex: 1; }
    .nav-btn.active { color: var(--accent); }
    .nav-icon { font-size: 20px; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 200; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; }
    .modal.show { display: flex; }
    .toast { position: fixed; top: 70px; left: 50%; transform: translateX(-50%); background: var(--cyan); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 30px; font-size: 13px; z-index: 300; display: none; }
  </style>
</head>
<body>
  <div id="toast" class="toast">+15 Coins!</div>
  <div class="header">
    <div class="user-box">
      <div class="avatar" id="uAvatar">D</div>
      <div>
        <div class="u-name" id="uName">Dragon Player</div>
        <div class="u-sub" id="uSub">@DragonGoldRush_bot</div>
      </div>
    </div>
    <div class="sync-badge" id="syncStatus">Cloud Synced</div>
  </div>
    <div class="balance-card">
    <div class="bal-label">Total Dragon Gold</div>
    <div class="bal-val">🪙 <span id="coinBal">100</span></div>
    <div class="stats-row">
      <div class="stat-item">Per Tap<span id="tapStat">+2</span></div>
      <div class="stat-item">Farm Level<span id="farmLvlStat">Lvl 1</span></div>
      <div class="stat-item">Ads Today<span id="adCountStat">0/10</span></div>
    </div>
  </div>
  <div id="view-home" class="view active">
    <div class="dragon-stage" id="dragonStage"><div class="dragon-circle" id="dragonBtn">🐉</div></div>
    <div class="energy-wrap">
      <div class="energy-top"><span>⚡ Energy</span><span><span id="energyCur">500</span> / 500</span></div>
      <div class="progress-bg"><div class="progress-fill" id="energyBar"></div></div>
    </div>
    <div class="card-box">
      <div class="card-head"><span>📺 Watch Rewarded Ad</span><span style="color:var(--accent)" id="adTracker">0/10</span></div>
      <p style="font-size:12px; color:var(--muted); margin-bottom:12px;">Watch a short sponsor video to earn instant Dragon Gold + full energy refill.</p>
      <button class="btn btn-gold" onclick="watchRewardedAd('ad')">🎬 +15 Gold & Refill Energy (Watch Ad)</button>
    </div>
    <div class="card-box">
      <div class="card-head"><span>🌾 Dragon Gold Farm (2h Cycle)</span><span style="color:var(--cyan)">+80 Gold</span></div>
      <p style="font-size:12px; color:var(--muted); margin-bottom:12px;" id="farmStatusText">Ready to start 2-hour passive mining expedition.</p>
      <button class="btn btn-cyan" id="farmActionBtn" onclick="handleFarmButton()">🚀 Start 2h Farming</button>
    </div>
  </div>
  <div id="view-earn" class="view">
    <div class="card-box" style="text-align:center;">
      <div class="card-head" style="justify-content:center;">🎰 Lucky Dragon Spin Wheel</div>
      <div class="wheel-wrap"><div class="wheel-pointer">▼</div><div class="wheel" id="wheelEl"><div class="wheel-center">🐉</div></div></div>
      <p style="font-size:12px; color:var(--muted); margin-bottom:12px;">Watch 1 short ad to spin and win between 10 and 100 Gold!</p>
      <button class="btn btn-gold" id="spinBtn" onclick="spinWheelWithAd()">🎲 Watch Ad & Spin Now</button>
    </div>
    <div class="card-box">
      <div class="card-head">🎯 Daily Partner Quests</div>
      <div class="list-item">
        <div><div style="font-weight:700; font-size:13px;">Join Official Telegram Channel</div><div style="font-size:11px; color:var(--accent);">+50 Gold</div></div>
        <button class="btn btn-outline" style="width:auto; padding:8px 14px;" onclick="completeTask(this, 50, 'https://t.me/DragonGoldRush_bot')">Claim</button>
      </div>
      <div class="list-item">
        <div><div style="font-weight:700; font-size:13px;">Share Bot in 1 Telegram Group</div><div style="font-size:11px; color:var(--accent);">+30 Gold</div></div>
        <button class="btn btn-outline" style="width:auto; padding:8px 14px;" onclick="completeTask(this, 30, 'https://t.me/share/url?url=https://t.me/DragonGoldRush_bot/play')">Share</button>
      </div>
    </div>
  </div>
  <div id="view-cards" class="view">
    <div class="card-box">
      <div class="card-head">🃏 Dragon Power Cards</div>
      <div class="list-item">
        <div><div style="font-weight:700; font-size:14px;">🔥 Fire Breath (+2/tap)</div><div style="font-size:12px; color:var(--muted);">Cost: 150 Gold</div></div>
        <button class="btn btn-gold" style="width:auto; padding:8px 16px;" onclick="buyUpgrade(150, 2)">Buy</button>
      </div>
      <div class="list-item">
        <div><div style="font-weight:700; font-size:14px;">⚡ Thunder Wings (+5/tap)</div><div style="font-size:12px; color:var(--muted);">Cost: 400 Gold</div></div>
        <button class="btn btn-gold" style="width:auto; padding:8px 16px;" onclick="buyUpgrade(400, 5)">Buy</button>
      </div>
    </div>
  </div>
  <div id="view-invite" class="view">
    <div class="card-box" style="text-align:center;">
      <div style="font-size:38px; margin-bottom:8px;">🤝</div>
      <h3 style="margin-bottom:6px;">Invite Friends & Earn</h3>
      <p style="font-size:12px; color:var(--muted); margin-bottom:16px;">Earn +100 Gold & 10% bonus commission when your friends join via your personal link!</p>
      <input type="text" class="input" id="refLinkInput" readonly value="https://t.me/DragonGoldRush_bot/play" />
      <div class="grid-2">
        <button class="btn btn-gold" onclick="copyRefLink()">📋 Copy Link</button>
        <button class="btn btn-cyan" onclick="shareRefLink()">📤 Share on TG</button>
      </div>
    </div>
  </div>
  <div id="view-wallet" class="view">
    <div class="card-box">
      <div class="card-head"><span>💼 Manual USDT (BEP20 / TON) Payout</span><span style="color:var(--accent)">Min: 1,000 Gold</span></div>
      <input type="text" id="walletAddr" class="input" placeholder="Paste your USDT (BEP20) or TON Address..." />
      <input type="number" id="withdrawCoins" class="input" placeholder="Amount of Gold (Min 1000)" value="1000" />
      <button class="btn btn-gold" onclick="submitManualWithdrawal()">💸 Request Manual Withdrawal</button>
      <div id="withdrawMsg" style="margin-top:12px; font-size:12px; text-align:center; color:var(--cyan);"></div>
    </div>
  </div>
  <div class="modal" id="adModal">
    <div style="font-size:48px; margin-bottom:12px;">📺</div>
    <h3 style="margin-bottom:8px;">Sponsor Video Ad Playing...</h3>
    <p style="font-size:13px; color:var(--muted); margin-bottom:20px;">Please wait <span id="adTimer">5</span> seconds to claim your reward.</p>
    <div class="progress-bg" style="max-width:260px;"><div class="progress-fill" id="adProgress" style="width:0%"></div></div>
  </div>
  <div class="nav">
    <button class="nav-btn active" onclick="switchTab('home', this)"><span class="nav-icon">🐉</span>Home</button>
    <button class="nav-btn" onclick="switchTab('earn', this)"><span class="nav-icon">🎰</span>Spin & Earn</button>
    <button class="nav-btn" onclick="switchTab('cards', this)"><span class="nav-icon">🃏</span>Cards</button>
    <button class="nav-btn" onclick="switchTab('invite', this)"><span class="nav-icon">👥</span>Invite</button>
    <button class="nav-btn" onclick="switchTab('wallet', this)"><span class="nav-icon">👛</span>Wallet</button>
  </div>
  <script>
    const API_URL = "https://dragon-game-api.renu2451143.workers.dev";
    const BOT_USERNAME = "DragonGoldRush_bot";
    const ADSGRAM_BLOCK_ID = "int-57908";
    const tg = window.Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); }
    const initData = tg?.initData || "";
    const tgUser = tg?.initDataUnsafe?.user;
    const FARM_DURATION_MS = 2 * 60 * 60 * 1000;
    let state = {
      coins: Number(localStorage.getItem("dg_coins")) || 100,
      tapPower: Number(localStorage.getItem("dg_tap")) || 2,
      energy: 500, maxEnergy: 500,
      adsWatched: Number(localStorage.getItem("dg_ads")) || 0,
      farmStartTime: Number(localStorage.getItem("dg_farm_start")) || 0,
      wheelDeg: 0
    };
    if (tgUser) {
      const name = tgUser.first_name || tgUser.username || "Player";
      document.getElementById("uName").innerText = name;
      document.getElementById("uAvatar").innerText = name.charAt(0).toUpperCase();
      document.getElementById("uSub").innerText = tgUser.username ? "@" + tgUser.username : "ID: " + tgUser.id;
      document.getElementById("refLinkInput").value = "https://t.me/" + BOT_USERNAME + "/play?startapp=r_" + tgUser.id;
    }
    async function loadUserFromCloudflare() {
      if (!initData) { document.getElementById("syncStatus").innerText = "Preview Mode"; updateUI(); return; }
      try {
        const res = await fetch(API_URL + "/api/user", { method: "GET", headers: { "Authorization": initData } });
        const data = await res.json();
        if (data && data.coins !== undefined) {
          state.coins = data.coins; state.adsWatched = data.ads_watched_today || 0;
          saveLocal(); updateUI(); document.getElementById("syncStatus").innerText = "Cloud Verified ✓";
        }
      } catch (e) { document.getElementById("syncStatus").innerText = "Offline Mode"; }
    }
    async function creditRewardOnServer(type, amount = 15) {
      state.coins += amount; if (type === "ad") state.adsWatched += 1;
      saveLocal(); updateUI(); showToast("+" + amount + " Dragon Gold Added!");
      if (!initData) return;
      try {
        const res = await fetch(API_URL + "/api/reward", {
          method: "POST", headers: { "Authorization": initData, "Content-Type": "application/json" },
          body: JSON.stringify({ type, amount })
        });
        const data = await res.json();
        if (data?.user?.coins !== undefined) {
          state.coins = data.user.coins; state.adsWatched = data.user.ads_watched_today;
          saveLocal(); updateUI();
        }
      } catch (e) {}
    }
    const dragonBtn = document.getElementById("dragonBtn");
    const dragonStage = document.getElementById("dragonStage");
    dragonBtn.addEventListener("pointerdown", (e) => {
      if (state.energy < state.tapPower) { showToast("⚡ Low Energy! Watch an ad to refill."); return; }
      state.energy -= state.tapPower; state.coins += state.tapPower; saveLocal(); updateUI();
      if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
      const num = document.createElement("div"); num.className = "float-num"; num.innerText = "+" + state.tapPower;
      num.style.left = (e.clientX - 20) + "px"; num.style.top = (e.clientY - 120) + "px";
      dragonStage.appendChild(num); setTimeout(() => num.remove(), 700);
    });
    setInterval(() => {
      if (state.energy < state.maxEnergy) { state.energy = Math.min(state.maxEnergy, state.energy + 2); updateUI(); }
      updateFarmTimerUI();
    }, 1000);
    function updateFarmTimerUI() {
      const btn = document.getElementById("farmActionBtn"); const txt = document.getElementById("farmStatusText");
      if (!state.farmStartTime) { txt.innerText = "Ready to start a 2-hour passive Dragon Gold expedition."; btn.innerText = "🚀 Start 2h Farming"; btn.disabled = false; return; }
      const elapsed = Date.now() - state.farmStartTime;
      if (elapsed < FARM_DURATION_MS) {
        const rem = FARM_DURATION_MS - elapsed;
        const hrs = Math.floor(rem / 3600000); const mins = Math.floor((rem % 3600000) / 60000); const secs = Math.floor((rem % 60000) / 1000);
        txt.innerText = "Dragon is farming gold... Time left: " + hrs + "h " + mins + "m " + secs + "s";
        btn.innerText = "⏳ Farming (" + hrs + "h " + mins + "m " + secs + "s)"; btn.disabled = true;
      } else {
        txt.innerText = "🎉 Harvest Ready! Watch a short ad to claim +80 Gold."; btn.innerText = "🎬 Watch Ad & Claim +80 Gold"; btn.disabled = false;
      }
    }
    function handleFarmButton() {
      if (!state.farmStartTime) { state.farmStartTime = Date.now(); saveLocal(); updateFarmTimerUI(); showToast("🌾 2-Hour Farming Started!"); }
      else if (Date.now() - state.farmStartTime >= FARM_DURATION_MS) { watchRewardedAd("farm"); }
    }
    function watchRewardedAd(rewardType, customAmount = 15) {
      if (ADSGRAM_BLOCK_ID && window.Adsgram) {
        try {
          const AdController = window.Adsgram.init({ blockId: ADSGRAM_BLOCK_ID });
          AdController.show().then(() => onAdCompleted(rewardType, customAmount)).catch(() => runFallbackAdModal(rewardType, customAmount));
        } catch (err) { runFallbackAdModal(rewardType, customAmount); }
      } else { runFallbackAdModal(rewardType, customAmount); }
    }
    function runFallbackAdModal(rewardType, customAmount) {
      const modal = document.getElementById("adModal"); const timerEl = document.getElementById("adTimer"); const progEl = document.getElementById("adProgress");
      modal.classList.add("show"); let sec = 5; timerEl.innerText = sec; progEl.style.width = "0%";
      const iv = setInterval(() => {
        sec--; timerEl.innerText = sec; progEl.style.width = (((5 - sec) / 5) * 100) + "%";
        if (sec <= 0) { clearInterval(iv); modal.classList.remove("show"); onAdCompleted(rewardType, customAmount); }
      }, 1000);
    }
    function onAdCompleted(rewardType, customAmount) {
      if (rewardType === "farm") { state.farmStartTime = 0; saveLocal(); updateFarmTimerUI(); creditRewardOnServer("farm", 80); }
      else if (rewardType === "spin") { creditRewardOnServer("spin", customAmount); }
      else { state.energy = state.maxEnergy; creditRewardOnServer("ad", 15); }
    }
    function spinWheelWithAd() {
      const prizes = [10, 25, 40, 60, 80, 100]; const won = prizes[Math.floor(Math.random() * prizes.length)];
      state.wheelDeg += 1440 + Math.floor(Math.random() * 360);
      document.getElementById("wheelEl").style.transform = "rotate(" + state.wheelDeg + "deg)";
      document.getElementById("spinBtn").disabled = true;
      setTimeout(() => { document.getElementById("spinBtn").disabled = false; watchRewardedAd("spin", won); }, 3600);
    }
    function buyUpgrade(cost, extraTap) {
      if (state.coins < cost) { showToast("❌ Not enough Gold!"); return; }
      state.coins -= cost; state.tapPower += extraTap; saveLocal(); updateUI(); showToast("🔥 Upgraded! Now +" + state.tapPower + " per tap!");
    }
    function completeTask(btn, reward, url) { window.open(url, "_blank"); btn.disabled = true; btn.innerText = "Done ✓"; creditRewardOnServer("ad", reward); }
    function copyRefLink() { const inp = document.getElementById("refLinkInput"); inp.select(); navigator.clipboard.writeText(inp.value); showToast("📋 Referral Link Copied!"); }
    function shareRefLink() { const link = document.getElementById("refLinkInput").value; const text = encodeURIComponent("🐉 Play Dragon Gold Rush with me and earn USDT rewards!"); window.open("https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + text, "_blank"); }
    async function submitManualWithdrawal() {
      const wallet = document.getElementById("walletAddr").value.trim(); const amountCoins = Number(document.getElementById("withdrawCoins").value); const msgEl = document.getElementById("withdrawMsg");
      if (!wallet || wallet.length < 10) { msgEl.innerText = "⚠️ Please enter a valid wallet address."; return; }
      if (amountCoins < 1000 || state.coins < amountCoins) { msgEl.innerText = "⚠️ Minimum 1,000 Gold required."; return; }
      if (!initData) { state.coins -= amountCoins; saveLocal(); updateUI(); msgEl.innerText = "✅ Withdrawal queued!"; return; }
      try {
        const res = await fetch(API_URL + "/api/withdraw", { method: "POST", headers: { "Authorization": initData, "Content-Type": "application/json" }, body: JSON.stringify({ wallet, amountCoins }) });
        const data = await res.json();
        if (data.success) { state.coins -= amountCoins; saveLocal(); updateUI(); msgEl.innerText = "✅ Request saved! Manual payout within 24h."; }
        else { msgEl.innerText = "❌ " + (data.error || "Failed"); }
      } catch (e) { msgEl.innerText = "❌ Network error, please try again."; }
    }
    function switchTab(tab, btn) {
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active")); document.getElementById("view-" + tab).classList.add("active");
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active")); btn.classList.add("active");
    }
    function showToast(msg) { const t = document.getElementById("toast"); t.innerText = msg; t.style.display = "block"; setTimeout(() => t.style.display = "none", 2200); }
    function saveLocal() { localStorage.setItem("dg_coins", state.coins); localStorage.setItem("dg_tap", state.tapPower); localStorage.setItem("dg_ads", state.adsWatched); localStorage.setItem("dg_farm_start", state.farmStartTime); }
    function updateUI() {
      document.getElementById("coinBal").innerText = state.coins.toLocaleString(); document.getElementById("usdBal").innerText = (state.coins * 0.0001).toFixed(4);
      document.getElementById("tapStat").innerText = "+" + state.tapPower; document.getElementById("adCountStat").innerText = state.adsWatched + "/10";
      document.getElementById("adTracker").innerText = state.adsWatched + "/10"; document.getElementById("energyCur").innerText = state.energy;
      document.getElementById("energyBar").style.width = ((state.energy / state.maxEnergy) * 100) + "%";
    }
    loadUserFromCloudflare(); updateFarmTimerUI();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  }
};
