import http from "node:http";

const PORT = process.env.PORT || 3000;

const SCRIPT_URL =
  "https://gist.githubusercontent.com/parthsahni88995-png/e25cd89cc9e87ea76966f19d9a3df20b/raw/88c70a62eb7c477654d009a9364a7598af5e31a6/gistfile1.txt";

const PAGE = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#070605">
<title>EGO EMPIRE | PROTECTOR V2</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Manrope:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#070605;
  --gold-1:#fff1b8;
  --gold-2:#f6d365;
  --gold-3:#d9a32b;
  --gold-4:#8a5e12;
  --ink:#1a1206;
  --text:#f3e7c4;
  --muted:#9c8858;
  --glass:rgba(255,222,120,.045);
  --line:rgba(246,211,101,.28);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  padding:32px 16px;overflow-x:hidden;color:var(--text);
  font-family:"Manrope",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;
  background:
    radial-gradient(900px 520px at 50% -8%,rgba(246,211,101,.17),transparent 65%),
    radial-gradient(700px 480px at 85% 105%,rgba(217,163,43,.12),transparent 60%),
    radial-gradient(600px 400px at 8% 90%,rgba(138,94,18,.16),transparent 60%),
    var(--bg);
}
body::before{ /* fine grain for depth */
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
#sparks{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}

/* ===== CARD ===== */
.stage{position:relative;z-index:1;width:min(100%,600px);perspective:1200px}
.card{
  position:relative;padding:50px 34px 30px;text-align:center;border-radius:30px;
  background:linear-gradient(160deg,rgba(255,226,140,.09),rgba(255,255,255,.02) 40%,rgba(217,163,43,.07));
  backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%);
  box-shadow:
    0 40px 90px -30px rgba(0,0,0,.9),
    0 0 80px -10px rgba(246,211,101,.16),
    inset 0 1px 0 rgba(255,255,255,.12);
  transform-style:preserve-3d;transition:transform .25s ease-out;
  animation:rise .9s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes rise{from{opacity:0;transform:translateY(26px) scale(.97)}to{opacity:1;transform:none}}
/* animated gold border */
.card::before{
  content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;
  background:conic-gradient(from var(--a,0deg),#8a5e12,#fff1b8,#d9a32b,#4a3208,#f6d365,#8a5e12);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  animation:spin 7s linear infinite;
}
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes spin{to{--a:360deg}}
/* corner ornaments */
.corner{position:absolute;width:26px;height:26px;border:2px solid var(--gold-2);opacity:.7;pointer-events:none}
.corner.tl{top:14px;left:14px;border-right:0;border-bottom:0;border-top-left-radius:12px}
.corner.tr{top:14px;right:14px;border-left:0;border-bottom:0;border-top-right-radius:12px}
.corner.bl{bottom:14px;left:14px;border-right:0;border-top:0;border-bottom-left-radius:12px}
.corner.br{bottom:14px;right:14px;border-left:0;border-top:0;border-bottom-right-radius:12px}

/* ===== EMBLEM ===== */
.emblem{position:relative;width:104px;height:104px;margin:0 auto 22px;display:grid;place-items:center}
.emblem::before,.emblem::after{
  content:"";position:absolute;inset:0;border-radius:50%;
  border:1px solid rgba(246,211,101,.45);
}
.emblem::before{animation:pulse 3.2s ease-out infinite}
.emblem::after{animation:pulse 3.2s ease-out 1.6s infinite}
@keyframes pulse{from{transform:scale(.8);opacity:.9}to{transform:scale(1.7);opacity:0}}
.emblem .disc{
  position:relative;width:92px;height:92px;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 30% 25%,#4a3510,#14100a 70%);
  border:1.5px solid rgba(246,211,101,.65);
  box-shadow:0 0 40px rgba(246,211,101,.35),inset 0 0 22px rgba(246,211,101,.14);
}
.emblem svg{width:50px;height:50px;filter:drop-shadow(0 0 8px rgba(246,211,101,.7))}
.emblem .disc{animation:float 5s ease-in-out infinite}
@keyframes float{50%{transform:translateY(-5px)}}

/* ===== TITLES ===== */
h1{
  font-family:"Cinzel",Georgia,serif;font-weight:900;
  font-size:clamp(34px,8.4vw,52px);line-height:1.05;letter-spacing:.09em;
  background:linear-gradient(100deg,var(--gold-4) 0%,var(--gold-2) 22%,var(--gold-1) 38%,var(--gold-3) 55%,var(--gold-1) 72%,var(--gold-4) 100%);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shine 5s linear infinite;
  filter:drop-shadow(0 4px 22px rgba(246,211,101,.28));
}
@keyframes shine{to{background-position:-220% 0}}
.badge{
  display:inline-flex;align-items:center;gap:10px;margin:16px 0 26px;padding:7px 18px;
  border:1px solid var(--line);border-radius:999px;background:rgba(246,211,101,.07);
  font-family:"Cinzel",serif;font-weight:800;font-size:13px;letter-spacing:.38em;color:var(--gold-2);
  padding-left:calc(18px + .38em);
}
.badge i{width:6px;height:6px;border-radius:50%;background:#7dff9a;box-shadow:0 0 10px #7dff9a;animation:blink 1.8s infinite}
@keyframes blink{50%{opacity:.25}}

.tagline{font-size:14.5px;line-height:1.8;font-weight:600;color:var(--gold-1);margin:10px 0}
.tagline.second{font-size:13px;font-weight:400;color:#d9c995;opacity:.9}

.divider{display:flex;align-items:center;gap:14px;margin:28px 0 22px;color:var(--gold-3)}
.divider::before,.divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(217,163,43,.6))}
.divider::after{transform:scaleX(-1)}
.divider span{font-size:12px}

/* ===== CODE WINDOW ===== */
.label{font-size:12px;font-weight:800;letter-spacing:.22em;color:var(--muted);margin-bottom:12px}
.window{
  text-align:left;border-radius:16px;overflow:hidden;
  border:1px solid rgba(246,211,101,.22);background:rgba(5,4,3,.72);
  box-shadow:inset 0 0 40px rgba(0,0,0,.6),0 10px 30px -12px rgba(246,211,101,.15);
}
.window-bar{display:flex;align-items:center;gap:7px;padding:10px 14px;border-bottom:1px solid rgba(246,211,101,.12);background:rgba(246,211,101,.04)}
.window-bar b{width:10px;height:10px;border-radius:50%;background:#3a2d12}
.window-bar b:nth-child(1){background:#ff6b5e}.window-bar b:nth-child(2){background:#ffc542}.window-bar b:nth-child(3){background:#35d36b}
.window-bar em{margin-left:auto;font-style:normal;font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--muted)}
.output{
  padding:18px 16px;font-family:"JetBrains Mono",Consolas,monospace;font-size:12.5px;line-height:1.75;
  color:#ffe9a6;overflow-wrap:anywhere;user-select:all;cursor:text;
}
.output .k{color:#f6d365}.output .s{color:#9fe3a4}.output .f{color:#ffb86b}.output .p{color:#8a7a4e}

/* ===== BUTTON ===== */
.copy{
  position:relative;overflow:hidden;width:100%;margin-top:18px;padding:18px;border:0;border-radius:15px;cursor:pointer;
  font-family:"Cinzel",serif;font-weight:800;font-size:15px;letter-spacing:.2em;color:var(--ink);
  background:linear-gradient(100deg,#f6d365,#ffe9a0 45%,#d9a32b);
  box-shadow:0 12px 34px -8px rgba(246,211,101,.5),inset 0 1px 0 rgba(255,255,255,.55);
  transition:transform .2s,box-shadow .2s,filter .2s;
}
.copy::after{ /* sweep */
  content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.65),transparent);
  transform:skewX(-20deg);animation:sweep 3.6s ease-in-out infinite;
}
@keyframes sweep{0%,55%{left:-60%}100%{left:140%}}
.copy:hover{transform:translateY(-2px);box-shadow:0 18px 40px -8px rgba(246,211,101,.65),inset 0 1px 0 rgba(255,255,255,.6)}
.copy:active{transform:scale(.98)}
.copy:focus-visible{outline:2px solid #fff;outline-offset:3px}
.copy.done{background:linear-gradient(100deg,#7dff9a,#c9ffd6 50%,#35d36b)}
.copy .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);transform:scale(0);animation:rip .6s ease-out;pointer-events:none}
@keyframes rip{to{transform:scale(4);opacity:0}}

.note{min-height:20px;margin-top:14px;font-size:12.5px;font-weight:600;color:var(--gold-2);transition:opacity .3s}

/* ===== HOW TO ===== */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:22px}
.step{padding:12px 8px;border-radius:12px;border:1px solid rgba(246,211,101,.14);background:var(--glass);font-size:11.5px;line-height:1.5;color:#cbb987}
.step strong{display:block;font-size:18px;margin-bottom:4px;color:var(--gold-2)}

.footer{margin-top:26px;font-size:10.5px;letter-spacing:.28em;color:#6f6038;font-weight:700}

@media(max-width:480px){
  .card{padding:42px 20px 26px}
  .tagline{font-size:12.5px}.tagline.second{font-size:11.5px}
  .steps{grid-template-columns:1fr}
  .badge{letter-spacing:.28em;font-size:12px}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
}
</style>
</head>
<body>
<canvas id="sparks"></canvas>

<div class="stage" id="stage">
  <main class="card" id="card">
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>

    <div class="emblem">
      <div class="disc">
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#fff1b8"/><stop offset=".5" stop-color="#f6d365"/><stop offset="1" stop-color="#b8801c"/>
            </linearGradient>
          </defs>
          <path d="M6 22l12 10 14-18 14 18 12-10-5 28H11L6 22z" fill="url(#g)" stroke="#fff1b8" stroke-width="1.2" stroke-linejoin="round"/>
          <rect x="11" y="52" width="42" height="5" rx="2" fill="url(#g)"/>
          <circle cx="6" cy="21" r="3" fill="#fff1b8"/><circle cx="32" cy="12" r="3.2" fill="#fff1b8"/><circle cx="58" cy="21" r="3" fill="#fff1b8"/>
        </svg>
      </div>
    </div>

    <h1>EGO EMPIRE</h1>
    <div class="badge"><i></i>PROTECTOR V2</div>

    <p class="tagline">🇦🇱 13_Pᴀʀᴛʜ Pᴀᴘᴀ Jɪ Oɴ Tᴏᴘ — 🇦🇱</p>
    <p class="tagline second">🇦🇱 Pᴀᴘᴀ Kɪ Sᴄʀɪ𝒑ᴛ Cʜᴏʀɪ Nʜɪ Kʀ Sᴀᴋᴛᴀ Bᴇᴛᴇ 🇦🇱</p>

    <div class="divider"><span>✦</span><span>✦</span><span>✦</span></div>

    <div class="label">YOUR GENERATED LOADSTRING</div>
    <div class="window">
      <div class="window-bar"><b></b><b></b><b></b><em>loadstring.lua</em></div>
      <div class="output" id="loadstring"></div>
    </div>

    <button class="copy" id="copyButton" type="button">COPY LOADSTRING</button>
    <div class="note" id="message" aria-live="polite"></div>

    <div class="steps">
      <div class="step"><strong>1</strong>Copy the loadstring</div>
      <div class="step"><strong>2</strong>Paste it in your executor</div>
      <div class="step"><strong>3</strong>Execute and enjoy</div>
    </div>

    <div class="footer">✦ EGO EMPIRE • PROTECTOR V2 ✦</div>
  </main>
</div>

<script>
(function(){
  var endpoint = window.location.origin + "/load";
  var generated = 'loadstring(game:HttpGet("' + endpoint + '"))()';

  /* colourised display (copied text stays plain) */
  function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;");}
  document.getElementById("loadstring").innerHTML =
    '<span class="f">loadstring</span><span class="p">(</span><span class="k">game</span><span class="p">:</span>' +
    '<span class="f">HttpGet</span><span class="p">(</span><span class="s">"' + esc(endpoint) + '"</span>' +
    '<span class="p">))()</span>';

  /* copy button */
  var btn = document.getElementById("copyButton");
  var message = document.getElementById("message");
  var resetTimer;
  function success(text){
    btn.classList.add("done");
    btn.textContent = "✓ COPIED";
    message.textContent = text;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function(){
      btn.classList.remove("done");
      btn.textContent = "COPY LOADSTRING";
      message.textContent = "";
    }, 2600);
  }
  btn.addEventListener("click", async function(e){
    var r = btn.getBoundingClientRect(), d = Math.max(r.width, r.height);
    var rip = document.createElement("span");
    rip.className = "ripple";
    rip.style.width = rip.style.height = d + "px";
    rip.style.left = (e.clientX - r.left - d/2) + "px";
    rip.style.top = (e.clientY - r.top - d/2) + "px";
    btn.appendChild(rip);
    setTimeout(function(){rip.remove();}, 650);

    try {
      await navigator.clipboard.writeText(generated);
      success("✓ LOADSTRING COPIED SUCCESSFULLY!");
    } catch (error) {
      var field = document.createElement("textarea");
      field.value = generated;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      var copied = false;
      try { copied = document.execCommand("copy"); } catch (x) {}
      field.remove();
      if (copied) success("✓ LOADSTRING COPIED!");
      else message.textContent = "Please select and copy the loadstring above.";
    }
  });

  /* 3D tilt (desktop, motion allowed) */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var card = document.getElementById("card");
  var stage = document.getElementById("stage");
  if(!reduce && window.matchMedia("(hover:hover)").matches){
    stage.addEventListener("mousemove", function(e){
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = "rotateY(" + (x*7) + "deg) rotateX(" + (-y*7) + "deg)";
    });
    stage.addEventListener("mouseleave", function(){ card.style.transform = ""; });
  }

  /* golden sparks + petals */
  var cv = document.getElementById("sparks"), ctx = cv.getContext("2d");
  var W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), parts = [];
  function resize(){
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener("resize", resize); resize();
  function make(initial){
    return {
      x: Math.random()*W,
      y: initial ? Math.random()*H : H + 20,
      r: 1 + Math.random()*2.6,
      vy: .25 + Math.random()*.9,
      vx: (Math.random()-.5)*.4,
      ph: Math.random()*6.28,
      tw: .01 + Math.random()*.03,
      petal: Math.random() < .22,
      rot: Math.random()*6.28
    };
  }
  var count = W < 600 ? 38 : 70;
  for(var i=0;i<count;i++) parts.push(make(true));
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<parts.length;i++){
      var p = parts[i];
      p.y -= p.vy; p.x += p.vx + Math.sin(p.ph)*.25; p.ph += p.tw*3; p.rot += .02;
      if(p.y < -20) parts[i] = make(false);
      var a = .35 + .55*Math.abs(Math.sin(p.ph));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y);
      if(p.petal){
        ctx.rotate(p.rot);
        ctx.fillStyle = "#f6d365";
        ctx.shadowColor = "#f6d365"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.ellipse(0,0,p.r*2.2,p.r*1.1,0,0,6.283); ctx.fill();
      } else {
        var g = ctx.createRadialGradient(0,0,0,0,0,p.r*4);
        g.addColorStop(0,"rgba(255,241,184,1)");
        g.addColorStop(.4,"rgba(246,211,101,.5)");
        g.addColorStop(1,"rgba(246,211,101,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0,0,p.r*4,0,6.283); ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  if(!reduce) requestAnimationFrame(frame);
})();
</script>
</body>
</html>`;

async function sendLua(res) {
  try {
    const response = await fetch(SCRIPT_URL, {
      headers: { "User-Agent": "EgoEmpireProtectorV2/1.0" }
    });

    if (!response.ok) {
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Script source could not be fetched. Please try again later.");
      return;
    }

    const lua = await response.text();
    if (!lua.trim()) {
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("The script source is empty.");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(lua);
  } catch (error) {
    console.error("Lua fetch error:", error);
    res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Unable to load the script right now.");
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
    return;
  }

  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", project: "EGO EMPIRE PROTECTOR V2" }));
    return;
  }

  if (pathname !== "/" && pathname !== "/load") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const acceptsHtml = (req.headers.accept || "").includes("text/html");
  const isBrowserNavigation = req.headers["sec-fetch-mode"] === "navigate";

  if (acceptsHtml || isBrowserNavigation) {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(PAGE);
    return;
  }

  await sendLua(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("EGO EMPIRE PROTECTOR V2 running on port " + PORT);
});
