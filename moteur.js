/* =====================================================================
   MOTEUR DES CARTES MENTALES — version 2.4
   Commun à toutes les cartes : ne pas modifier pour changer de chapitre.
   Chaque page de chapitre charge d'abord son fichier de contenu (CONFIG),
   puis ce moteur, qui construit toute la page.
   ===================================================================== */
(function () {
// Copie de la page telle qu'elle est au chargement (sert au bouton « Ouvrir en grand »)
const SOURCE_PAGE = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
if (typeof CONFIG === "undefined") {
  document.body.insertAdjacentHTML("afterbegin", "<p style='font:16px sans-serif;color:#a00;padding:20px'>Carte mentale : le fichier du chapitre n'a pas été chargé (CONFIG introuvable).</p>");
  return;
}
const MOTEUR_VERSION = "2.4";
const CSS = "  * { box-sizing: border-box; }\n  html, body { margin: 0; height: 100%; }\n  body {\n    font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, Arial, sans-serif;\n    background: #f4f1ea; color: #222;\n    display: flex; flex-direction: column; min-height: 480px;\n  }\n  button {\n    font: inherit; font-size: 14px; padding: 9px 13px; border-radius: 10px;\n    border: none; cursor: pointer; background: #2c3e66; color: #fff; font-weight: 600;\n    touch-action: manipulation;\n  }\n  button.secondaire { background: #e9e4d8; color: #333; }\n  button:hover { filter: brightness(1.08); }\n\n  /* ---------- Barre du haut ---------- */\n  .top { padding: 10px 12px 8px; background: #fff; border-bottom: 1px solid #e2ddd2; flex: none; }\n  .consigne { font-size: 14px; margin: 0 0 8px; color: #444; }\n  .ligne { display: flex; gap: 7px; flex-wrap: wrap; align-items: center; }\n  .ligne input {\n    flex: 1 1 200px; min-width: 0; font-size: 16px; padding: 9px 12px;\n    border: 2px solid #c9c2b3; border-radius: 10px; outline: none;\n  }\n  .ligne input:focus { border-color: #2c3e66; }\n  .outils { margin-top: 7px; }\n  .infos { display: flex; justify-content: space-between; gap: 4px 12px; flex-wrap: wrap;\n           margin-top: 7px; font-size: 13.5px; min-height: 20px; }\n  #message { font-weight: 600; }\n  #message.ok { color: #1e7a3c; } #message.ko { color: #a0522d; } #message.info { color: #2c3e66; }\n  #stats { color: #666; }\n\n  /* ---------- Carte en étoile (ordinateur / tablette) ---------- */\n  #carte {\n    position: relative; flex: 1; min-height: 420px; overflow-x: hidden; overflow-y: auto;\n    background-image: radial-gradient(#d9d3c5 1px, transparent 1px); background-size: 22px 22px;\n  }\n  #liens { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; }\n  .noeud {\n    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);\n    transition: left .55s ease, top .55s ease; white-space: nowrap; user-select: none;\n  }\n  .centre {\n    background: #1f2a44; color: #fff; padding: 12px 20px; border-radius: 18px;\n    text-align: center; font-weight: 800; font-size: 19px; z-index: 4;\n    box-shadow: 0 6px 18px rgba(0,0,0,.25);\n  }\n  .centre { white-space: normal; max-width: 300px; line-height: 1.2; }\n  body.compact .centre { max-width: 230px; }\n  .centre small { display: block; font-weight: 500; font-size: 12.5px; opacity: .8; margin-top: 2px; }\n  .centre.bravo, .l-centre.bravo { animation: brille 1.2s ease 2; }\n  @keyframes brille { 50% { box-shadow: 0 0 0 10px rgba(240,190,60,.55); } }\n  .pole {\n    padding: 6px 11px; border-radius: 14px; font-weight: 700; font-size: 14.5px;\n    white-space: normal; max-width: 200px; width: max-content; text-align: center; line-height: 1.25;\n    color: #fff; z-index: 3; box-shadow: 0 3px 10px rgba(0,0,0,.18);\n  }\n  .pole.cache { background: #fff !important; color: #999; border: 2px dashed #bbb; box-shadow: none; font-weight: 600; }\n  .pole.indice { color: #777; font-style: italic; }\n  .anim { animation: pop .5s ease; }\n  .badge {\n    display: inline-block; margin-left: 6px; padding: 1px 7px; border-radius: 999px;\n    background: rgba(255,255,255,.28); font-size: 12.5px; font-weight: 700;\n  }\n  .badge.atteint { background: #ffd54a; color: #4a3b00; }\n  .sous {\n    background: #fff; color: var(--c); border: 3px solid var(--c); border-radius: 10px;\n    padding: 4px 10px; font-weight: 700; font-size: 13.5px; z-index: 2; cursor: default;\n    box-shadow: 0 2px 6px rgba(0,0,0,.12);\n  }\n  .sous.cache { border-style: dashed; font-size: 16px; padding: 2px 12px; background: #fffdf6; }\n  .mot {\n    background: #fff; border: 2px solid #999; border-radius: 999px; padding: 4px 11px;\n    font-size: 14px; z-index: 1; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,.08);\n    animation: pop .45s ease;\n  }\n  .mot:hover { box-shadow: 0 2px 9px rgba(0,0,0,.22); }\n  @keyframes pop {\n    0% { transform: translate(-50%,-50%) scale(0); }\n    70% { transform: translate(-50%,-50%) scale(1.15); }\n    100% { transform: translate(-50%,-50%) scale(1); }\n  }\n\n  /* ---------- Carte en liste (téléphone) ---------- */\n  #liste { display: none; flex: 1; overflow-y: auto; padding: 10px; -webkit-overflow-scrolling: touch; }\n  body.mobile #carte { display: none; }\n  body.mobile #liste { display: block; }\n  .l-centre { background: #1f2a44; color: #fff; border-radius: 14px; padding: 10px 14px;\n              text-align: center; font-weight: 800; font-size: 17px; margin-bottom: 10px; }\n  .l-centre small { display: block; font-weight: 500; font-size: 12.5px; opacity: .8; }\n  .l-pole { background: #fff; border-radius: 12px; margin-bottom: 9px; overflow: hidden; border: 2px solid var(--c); }\n  .l-pole.cache { border: 2px dashed #bbb; }\n  .l-tete { background: var(--c); color: #fff; font-weight: 700; padding: 7px 10px; font-size: 14.5px;\n            display: flex; justify-content: space-between; align-items: center; gap: 6px; }\n  .l-pole.cache .l-tete { background: #f3f1ec; color: #999; font-weight: 600; }\n  .l-pole.cache.indice .l-tete { font-style: italic; color: #777; }\n  .l-barre { height: 5px; background: #eee; }\n  .l-barre i { display: block; height: 100%; background: var(--c); transition: width .4s; }\n  .l-mots { padding: 7px 8px 4px; display: flex; flex-wrap: wrap; gap: 6px; }\n  .l-sous { margin: 7px 8px 2px; border-left: 4px solid var(--c); padding: 2px 0 0 8px; }\n  .l-sous.cache { border-left-style: dashed; }\n  .l-sous-titre { font-weight: 700; font-size: 13.5px; color: var(--c); margin-bottom: 4px; }\n  .l-sous .l-mots { padding: 0; }\n  .l-mots .mot, #bac .mot { position: static; transform: none; animation: none; display: inline-block; margin: 0 0 4px; }\n  .l-mots .mot.nouveau { animation: popl .45s ease; }\n  @keyframes popl { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }\n  .flash { animation: flash .8s ease; }\n  @keyframes flash { 30% { box-shadow: 0 0 0 5px rgba(240,190,60,.6); } }\n\n  /* ---------- Bac \"à trier\" ---------- */\n  #bac { display: none; background: #fff; border-top: 1px solid #e2ddd2; padding: 7px 12px; font-size: 13.5px; flex: none; }\n  #bac.visible { display: block; }\n  #bac .mot { border-style: dashed; margin: 2px 3px; }\n  .mot.essentiel { font-weight: 700; border-width: 3px; }\n  .mot.essentiel::before { content: \"🔑 \"; font-size: 11px; }\n  .mot.apres { background: #eef3ff; }\n  .mot.mineur { font-size: 12px; padding: 2px 8px; border-width: 1.5px; color: #444; box-shadow: none; }\n  #carte.dense .mot { font-size: 12.5px; padding: 3px 9px; }\n  #carte.dense .mot.mineur { font-size: 11px; padding: 1px 7px; }\n  #carte.dense .sous { font-size: 12px; padding: 3px 8px; }\n  #carte.dense .pole { font-size: 13px; }\n  .mot.fantome { border: 2px dashed #aaa !important; color: #888; font-style: italic; background: #f7f7f5;\n                 cursor: default; box-shadow: none; font-size: 12.5px; padding: 2px 8px; }\n  .sous.fantome { font-style: italic; opacity: .8; }\n  .sous.essentiel { border-width: 4px; font-weight: 800; }\n  .sous.essentiel::before { content: \"🔑 \"; font-size: 11px; }\n  .l-sous.essentiel .l-sous-titre::after { content: \"  🔑\"; }\n  #modalCorr { position: fixed; inset: 0; background: rgba(20,25,40,.6); z-index: 60;\n               display: none; align-items: center; justify-content: center; padding: 12px; }\n  #modalCorr.visible { display: flex; }\n  .corr-score { background: #f4f1ea; border-radius: 10px; padding: 8px 10px; font-size: 14px; margin: 0 0 8px; }\n  .corr-pole { margin: 9px 0; font-size: 13.5px; }\n  .corr-pole h4 { margin: 0 0 3px; font-size: 14.5px; color: var(--c); }\n  .corr-pole p { margin: 2px 0 2px 12px; }\n  .corr-ok { color: #1e7a3c; font-weight: 600; }\n\n  /* ---------- Mots à bien orthographier ---------- */\n  #ortho { display: none; background: #fffaf0; border-top: 1px solid #ecd9b5; padding: 6px 12px; font-size: 13.5px; flex: none; }\n  #ortho.visible { display: block; }\n  #ortho summary { cursor: pointer; font-weight: 700; color: #8a5a00; }\n  #orthoListe { display: flex; flex-wrap: wrap; gap: 5px 14px; padding: 6px 0 2px; max-height: 92px; overflow-y: auto; }\n  .faute s { color: #b23b2a; }\n  .faute b { color: #1e7a3c; }\n  .faute em { color: #8a7a5a; font-size: 12px; font-style: normal; }\n\n  /* ---------- Menu contextuel ---------- */\n  .menu {\n    position: fixed; z-index: 50; background: #fff; border-radius: 12px;\n    box-shadow: 0 8px 24px rgba(0,0,0,.28); padding: 8px; width: 240px; font-size: 13.5px;\n    max-height: 80vh; overflow-y: auto;\n  }\n  .menu p { margin: 2px 6px 6px; color: #555; }\n  .menu button { display: block; width: 100%; text-align: left; margin: 4px 0; padding: 7px 10px; font-size: 13.5px; }\n  .menu button.st { width: calc(100% - 16px); margin-left: 16px; background: #fff; border: 2px solid; padding: 5px 9px; }\n  .menu .suppr { background: #f6e3dc; color: #8a2d12; }\n\n  /* ---------- Fenêtre de téléchargement ---------- */\n  #modal { position: fixed; inset: 0; background: rgba(20,25,40,.6); z-index: 60;\n           display: none; align-items: center; justify-content: center; padding: 12px; }\n  #modal.visible { display: flex; }\n  .boite { background: #fff; border-radius: 14px; padding: 14px; width: min(760px, 100%);\n           max-height: 100%; overflow-y: auto; }\n  .boite h3 { margin: 0 0 8px; font-size: 17px; }\n  .boite img { width: 100%; border: 1px solid #ddd; border-radius: 8px; margin: 8px 0; }\n  .boite .aide { font-size: 12.5px; color: #666; margin: 4px 0 0; }\n\n  body.compact .pole { font-size: 13px; max-width: 165px; }\n  body.compact .mot { font-size: 12.5px; padding: 3px 9px; }\n  body.compact .sous { font-size: 12.5px; }\n  body.compact .centre { font-size: 16px; padding: 9px 14px; }\n  body.compact .centre small { font-size: 11px; }\n  /* ---------- Téléphone : la page entière défile, la saisie reste en haut ---------- */\n  .legende { display: flex; flex-wrap: wrap; gap: 3px 14px; margin-top: 5px; font-size: 12.5px; color: #555; }\n  .legende:empty { display: none; }\n  .pastille { display: inline-block; width: 13px; height: 13px; border-radius: 3px; margin-right: 5px; vertical-align: -2px;\n              border: 1px solid rgba(0,0,0,.2); }\n  .pole.drapeau { padding-bottom: 11px; }\n  body.mobile .legende { font-size: 11.5px; gap: 2px 10px; margin-top: 3px; }\n  .court { display: none; }\n  body.mobile { display: block; height: auto; min-height: 0; }\n  body.mobile .top { position: sticky; top: 0; z-index: 30; padding: 6px 8px; box-shadow: 0 2px 6px rgba(0,0,0,.1); }\n  body.mobile .consigne { font-size: 12.5px; margin: 0 0 6px; cursor: pointer; display: -webkit-box;\n    -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }\n  body.mobile .consigne::before { content: \"ℹ️ \"; }\n  body.mobile .consigne.ouverte { display: block; }\n  body.mobile .ligne { gap: 5px; }\n  body.mobile .ligne input { padding: 8px 10px; }\n  body.mobile #ajouter { padding: 8px 12px; }\n  body.mobile .outils { flex-wrap: nowrap; margin-top: 6px; }\n  body.mobile .outils button { flex: 1 1 auto; padding: 7px 4px; font-size: 12.5px; white-space: nowrap; }\n  body.mobile .long { display: none; }\n  body.mobile .court { display: inline; }\n  body.mobile .infos { font-size: 12px; margin-top: 5px; min-height: 0; }\n  body.mobile #message { flex-basis: 100%; font-size: 12.5px; }\n  body.mobile #message:empty { display: none; }\n  body.mobile #liste { overflow: visible; flex: none; padding: 8px; }\n  body.mobile .l-pole, body.mobile .l-sous { scroll-margin-top: 175px; scroll-margin-bottom: 80px; }\n  body.mobile #bac { position: sticky; bottom: 0; z-index: 25; box-shadow: 0 -2px 6px rgba(0,0,0,.1); padding: 6px 8px; }\n  body.mobile #bac > span:last-child { display: none; }\n  @media (max-width: 420px) {\n    .consigne { font-size: 13px; }\n    button { padding: 8px 10px; font-size: 13px; }\n  }\n\n  /* ---------- Pépites 💎 : contour dégradé violet-or et léger scintillement ---------- */\n  .mot.pepite { border: 2px solid transparent !important; color: #4a148c; font-weight: 700;\n    background: linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #7b1fa2, #f9a825, #7b1fa2) border-box;\n    animation: scintille 2.8s ease-in-out infinite; }\n  .mot.pepite::before { content: \"💎 \"; font-size: 11px; }\n  @keyframes scintille { 0%, 100% { box-shadow: 0 0 0 2px rgba(249,168,37,.2), 0 0 8px rgba(123,31,162,.3); }\n                         50% { box-shadow: 0 0 0 3px rgba(249,168,37,.45), 0 0 16px rgba(123,31,162,.55); } }\n  .noeud.mot.pepite { animation: pop .45s ease, scintille 2.8s ease-in-out .45s infinite; }\n  @media (prefers-reduced-motion: reduce) { .mot.pepite, .noeud.mot.pepite { animation: none; } }\n\n  /* ---------- Mot rangé par l'élève, absent de la liste ---------- */\n  .mot.nonverif { border-style: dashed !important; }\n  .mot.nonverif::before { content: \"📌 \"; font-size: 11px; }\n\n  /* ---------- Modes de jeu ---------- */\n  .modes { display: flex; gap: 6px; margin-top: 7px; flex-wrap: wrap; }\n  .mode { background: #fff; color: #2c3e66; border: 2px solid #c9c2b3; padding: 6px 11px; font-size: 13.5px; }\n  .mode.actif { background: #2c3e66; color: #fff; border-color: #2c3e66; }\n  .choix { display: none; margin-top: 8px; background: #f6f2ff; border: 2px solid #6a1b9a; border-radius: 12px; padding: 8px 10px; }\n  .choix.visible { display: block; animation: popl .3s ease; }\n  .choix p { margin: 0 0 6px; font-size: 14px; }\n  .choix-poles { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }\n  .choix-poles button { font-size: 13px; padding: 7px 10px; }\n  .choix .annuler { font-size: 12.5px; padding: 5px 10px; }\n  button.relier { background: #ede3f7; color: #4a148c; }\n\n  /* ---------- Liens 🔗 sur la carte ---------- */\n  #liensPhrases { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; }\n\n  /* ---------- Phase 2 : relier ---------- */\n  #modalRelier { position: fixed; inset: 0; background: rgba(20,25,40,.6); z-index: 60;\n                 display: none; align-items: center; justify-content: center; padding: 12px; }\n  #modalRelier.visible { display: flex; }\n  #modalRelier .aide2 { font-size: 13.5px; margin: 0 0 8px; color: #444; }\n  .choix-mots select { flex: 1 1 160px; min-width: 0; font-size: 15px; padding: 7px; border-radius: 9px; border: 2px solid #c9c2b3; }\n  .choix-mots .plus { font-weight: 800; color: #6a1b9a; }\n  #phrase { width: 100%; margin-top: 8px; font: inherit; font-size: 16px; padding: 9px 11px; border-radius: 10px;\n            border: 2px solid #c9c2b3; resize: vertical; }\n  #phrase:focus { outline: none; border-color: #6a1b9a; }\n  .connecteurs { display: flex; flex-wrap: wrap; gap: 5px; margin: 6px 0; }\n  .puce-connecteur { background: #ede3f7; color: #4a148c; padding: 4px 9px; font-size: 12.5px; border-radius: 999px; font-weight: 600; }\n  .verifs { list-style: none; padding: 0; margin: 6px 0 10px; font-size: 13.5px; }\n  .verifs li { margin: 2px 0; }\n  .verifs li.ok { color: #1e7a3c; } .verifs li.ko { color: #666; } .verifs li.conseil { color: #8a6a12; }\n  #validerPhrase:disabled { opacity: .45; cursor: not-allowed; filter: none; }\n  .phrases, #phrasesListe { margin: 8px 0 0; padding-left: 22px; font-size: 13.5px; }\n  .phrases li, #phrasesListe li { margin: 4px 0; }\n  .phrases small, #phrasesListe small { color: #6a1b9a; }\n  .suppr-phrase { background: none; color: #a0522d; padding: 0 6px; font-size: 16px; }\n  #phrasesZone { display: none; background: #f7f1fc; border-top: 1px solid #e2d3f0; padding: 6px 12px; font-size: 13.5px; flex: none; }\n  #phrasesZone.visible { display: block; }\n  #phrasesZone summary { cursor: pointer; font-weight: 700; color: #4a148c; }\n  #phrasesListe { max-height: 110px; overflow-y: auto; }\n  body.mobile .modes { margin-top: 5px; }\n  body.mobile .mode { padding: 5px 8px; font-size: 12.5px; }\n\n  /* ---------- Drapeaux ---------- */\n  svg.drapeau { width: 18px; height: 12px; vertical-align: -1px; margin-right: 5px; border-radius: 2px;\n                box-shadow: 0 0 0 1px rgba(0,0,0,.25); }\n\n  /* ---------- Glisser-déposer ---------- */\n  .glissable { touch-action: none; cursor: grab; user-select: none; -webkit-user-select: none; }\n  .mot.a-ranger { border: 2px dashed #6a1b9a !important; background: #f6f0fc; font-weight: 600; animation: appel 1.6s ease-in-out infinite; }\n  @keyframes appel { 50% { box-shadow: 0 0 0 4px rgba(106,27,154,.18); } }\n  .mot.parti { opacity: .35; }\n  .fantome-glisse { position: fixed !important; z-index: 100; pointer-events: none; transform: translate(-50%, -120%) scale(1.1) !important;\n                    box-shadow: 0 8px 20px rgba(0,0,0,.3) !important; animation: none !important; margin: 0 !important; }\n  body.glisse, body.glisse * { cursor: grabbing !important; }\n  .pole.cible, .l-pole.cible { outline: 4px solid #ffd54a; outline-offset: 3px; transform: translate(-50%, -50%) scale(1.08); }\n  .l-pole.cible { transform: none; }\n  #bac.ranger { background: #f6f0fc; border-top: 2px solid #6a1b9a; }\n  #bac.ranger #bacTitre { color: #4a148c; }\n  #bac .mot { touch-action: none; }\n  @media (prefers-reduced-motion: reduce) { .mot.a-ranger { animation: none; } }\n\n  /* ---------- Défis brevet ---------- */\n  button.defi { background: #6a1b9a; margin: 2px 0 6px; }\n  .question { display: none; background: #fff8e1; border-left: 5px solid #f9a825; border-radius: 8px; padding: 8px 10px;\n              font-size: 14.5px; margin-bottom: 8px; }\n  .question.visible { display: block; }\n  .question b { color: #4a148c; }\n  .question .manque { display: block; margin-top: 4px; color: #a0522d; font-size: 13.5px; }\n";
const MARKUP = "\n<div class=\"top\">\n  <p class=\"consigne\" id=\"consigne\"></p>\n  <div class=\"ligne\">\n    <input id=\"champ\" type=\"text\" maxlength=\"90\" autocomplete=\"off\" autocapitalize=\"off\" enterkeyhint=\"done\"\n           placeholder=\"\">\n    <button id=\"ajouter\">Ajouter</button>\n  </div>\n  <div class=\"modes\" role=\"group\" aria-label=\"Façon de jouer\">\n    <button id=\"modeAuto\" class=\"mode actif\" aria-pressed=\"true\">✨<span class=\"long\"> Rangement automatique</span><span class=\"court\"> Auto</span></button>\n    <button id=\"modeRanger\" class=\"mode\" aria-pressed=\"false\">🧭<span class=\"long\"> Je range moi-même</span><span class=\"court\"> Je range</span></button>\n  </div>\n  <div id=\"choix\" class=\"choix\" aria-live=\"polite\"></div>\n  <div class=\"ligne outils\">\n    <button id=\"indice\" class=\"secondaire\">💡<span class=\"long\"> Indice</span><span class=\"court\"> Indice</span></button>\n    <button id=\"relier\" class=\"secondaire relier\" title=\"Relier deux idées par une phrase\">🔗<span class=\"long\"> Relier</span><span class=\"court\"> Relier</span></button>\n    <button id=\"corriger\" class=\"secondaire\">✅<span class=\"long\"> Correction</span><span class=\"court\"> Corriger</span></button>\n    <button id=\"telecharger\" class=\"secondaire\">⬇️<span class=\"long\"> Télécharger</span><span class=\"court\"> Image</span></button>\n    <button id=\"reset\" class=\"secondaire\" title=\"Recommencer\">↺<span class=\"long\"> Recommencer</span></button>\n    <button id=\"pleinEcran\" class=\"secondaire\" title=\"Plein écran\" hidden>⛶<span class=\"long\"> Plein écran</span></button>\n    <button id=\"grand\" class=\"secondaire\" title=\"Ouvrir l'exercice en grand dans un nouvel onglet\">↗️<span class=\"long\"> Ouvrir en grand</span></button>\n  </div>\n  <div class=\"infos\">\n    <span id=\"message\" aria-live=\"polite\"></span>\n    <span id=\"stats\"></span>\n  </div>\n  <div id=\"legende\" class=\"legende\"></div>\n</div>\n\n<div id=\"carte\"><svg id=\"liens\"></svg><svg id=\"liensPhrases\"></svg></div>\n<div id=\"liste\"></div>\n\n<div id=\"bac\">\n  <strong id=\"bacTitre\">🤔 À trier :</strong> <span id=\"bacMots\"></span>\n  <span id=\"bacAide\" style=\"color:#777\"></span>\n</div>\n\n<details id=\"ortho\">\n  <summary>✏️ Mots à bien orthographier (<span id=\"nbOrtho\">0</span>)</summary>\n  <div id=\"orthoListe\"></div>\n</details>\n\n<details id=\"phrasesZone\">\n  <summary>🔗 Mes phrases (<span id=\"nbPhrases\">0</span>)</summary>\n  <ol id=\"phrasesListe\"></ol>\n</details>\n\n<div id=\"modalRelier\">\n  <div class=\"boite\">\n    <h3>🔗 Relie deux idées</h3>\n    <p class=\"aide2\"><b>Comment faire ?</b> ① Prends un <b>🎯 défi brevet</b> (ou choisis toi-même deux mots de ta carte).\n      ② Écris une phrase qui <b>explique</b> le lien entre les deux mots, avec un <b>connecteur</b> (car, donc, parce que…).\n      ③ Valide. Quelques phrases bien reliées… et tu as presque un développement construit !</p>\n    <div class=\"ligne\"><button id=\"defi\" class=\"defi\">🎯 Défi brevet</button></div>\n    <div id=\"question\" class=\"question\"></div>\n    <div class=\"ligne choix-mots\">\n      <select id=\"motA\" aria-label=\"Premier mot\"></select>\n      <span class=\"plus\">＋</span>\n      <select id=\"motB\" aria-label=\"Deuxième mot\"></select>\n      <button id=\"hasard\" class=\"secondaire\" title=\"Choisir deux mots au hasard\">🎲<span class=\"long\"> Au hasard</span></button>\n    </div>\n    <textarea id=\"phrase\" rows=\"3\" aria-label=\"Ta phrase\"></textarea>\n    <div id=\"connecteurs\" class=\"connecteurs\" aria-label=\"Connecteurs logiques\"></div>\n    <ul id=\"verifs\" class=\"verifs\"></ul>\n    <div class=\"ligne\">\n      <button id=\"validerPhrase\" disabled>Valider ma phrase</button>\n      <button id=\"fermerRelier\" class=\"secondaire\">Fermer</button>\n    </div>\n    <ol id=\"phrasesModal\" class=\"phrases\"></ol>\n  </div>\n</div>\n\n<div id=\"modalCorr\">\n  <div class=\"boite\">\n    <h3>✅ Correction</h3>\n    <div id=\"corrContenu\"></div>\n    <div class=\"ligne\" style=\"margin-top:10px\"><button id=\"voirCarte\">Voir sur ma carte</button></div>\n  </div>\n</div>\n\n<div id=\"modal\">\n  <div class=\"boite\">\n    <h3>⬇️ Sauvegarder ma carte</h3>\n    <div class=\"ligne\">\n      <input id=\"prenom\" type=\"text\" maxlength=\"40\" placeholder=\"Prénom et classe (ex. : Léa, 3e B)\">\n      <button id=\"dl\">Télécharger l'image</button>\n      <button id=\"fermer\" class=\"secondaire\">Fermer</button>\n    </div>\n    <img id=\"apercu\" alt=\"Aperçu de la carte mentale\">\n    <p class=\"aide\">Si le téléchargement ne démarre pas : sur ordinateur, fais un clic droit sur l'image puis « Enregistrer l'image sous… » ; sur téléphone, garde le doigt appuyé sur l'image puis « Enregistrer l'image ».</p>\n  </div>\n</div>\n\n";
(function construirePage() {
  const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
  if (!document.querySelector('meta[name="viewport"]')) {
    const mv = document.createElement("meta"); mv.name = "viewport"; mv.content = "width=device-width, initial-scale=1";
    document.head.appendChild(mv);
  }
  document.documentElement.lang = "fr";
  document.body.insertAdjacentHTML("afterbegin", MARKUP);
})();

/* =====================================================================
   MOTEUR — inutile de modifier ce qui suit
   ===================================================================== */
const $ = id => document.getElementById(id);
const carte = $("carte"), svg = $("liens"), liste = $("liste"), champ = $("champ");
const msg = $("message"), stats = $("stats"), bac = $("bac"), bacMots = $("bacMots");
$("consigne").textContent = CONFIG.consigne;
champ.placeholder = CONFIG.exemple || "Écris un mot…";
document.title = "Carte mentale – " + CONFIG.titre;
const CLE_SAUVEGARDE = "carte-mentale-v2:" + (CONFIG.id || CONFIG.titre);

/* ---------- Reconnaissance des mots ---------- */
const ARTICLES = ["le", "la", "les", "l", "un", "une", "des", "du", "de", "d", "au", "aux"];
const VIDES = ["le", "la", "les", "l", "un", "une", "des", "du", "de", "d", "a", "au", "aux", "en", "et",
               "dans", "sur", "pour", "par", "pendant", "ce", "qui", "que"];
function normaliser(s) {
  let t = s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[’'`]/g, " ").replace(/-/g, " ").replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  while (t.length > 1 && ARTICLES.includes(t[0])) t.shift();
  t = t.map(m => (m.length > 3 && /[sx]$/.test(m)) ? m.slice(0, -1) : m);
  return t.join(" ");
}
const jetons = n => n.split(" ").filter(t => t && !VIDES.includes(t));
function levenshtein(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}
// Comparaison « stricte » (mots) : identique, contenu, ou faute de frappe
function scoreCle(n, k) {
  if (n === k) return 0;
  if (n.replace(/ /g, "") === k.replace(/ /g, "")) return 0.1;   // « peri-urbanisation » = « périurbanisation »
  if (k.length >= 4 && (" " + n + " ").includes(" " + k + " ")) return 0.5;
  if (n.length >= 5 && (" " + k + " ").includes(" " + n + " ")) return 0.7;
  const tol = n.length >= 8 ? 2 : (n.length >= 5 ? 1 : 0);
  const d = levenshtein(n, k);
  return d <= tol ? 1 + d : Infinity;
}
// Comparaison « souple » (noms des sous-thèmes) : mots en commun, dans le désordre
function memeJeton(a, b) {
  if (a === b) return true;
  if (a.length >= 5 && b.length >= 5) return a.slice(0, 6) === b.slice(0, 6) || levenshtein(a, b) <= 1;
  return false;
}
function scoreSouple(nT, kT) {
  if (!nT.length || !kT.length) return Infinity;
  const inOk = nT.filter(a => kT.some(b => memeJeton(a, b))).length;
  const kOk = kT.filter(b => nT.some(a => memeJeton(a, b))).length;
  if (kOk < Math.min(2, kT.length)) return Infinity;
  const covN = inOk / nT.length, covK = kOk / kT.length;
  if (covN === 1 && covK >= 0.5) return 0.8 + (1 - covK) * 0.5;
  if (covK === 1 && covN >= 0.5) return 0.9;
  return Infinity;
}

/* ---------- État ---------- */
const TYPES = { mots: "mot", personnes: "personne", lieux: "lieu", pays: "pays", dates: "date", evenements: "evenement" };
const entrees = o => Object.entries(TYPES).flatMap(([cle, type]) => (o[cle] || []).flatMap(w => {
  const variantes = w.replace(/^[*+]/, "").split("|").map(x => x.trim()).filter(Boolean);
  const groupe = { nom: variantes[0], textes: variantes, essentiel: w.startsWith("*"), pepite: w.startsWith("+"), cles: variantes.map(normaliser), type };
  return variantes.map(v => ({ texte: v, cle: normaliser(v), type, groupe }));
}));
const groupesEss = lst => [...new Set(lst.filter(e => e.groupe.essentiel).map(e => e.groupe))];
const poles = CONFIG.poles.map(p => ({
  ...p, trouve: false, indice: false, el: null, entrees: entrees(p),
  sous: (p.sousThemes || []).map(st => {
    const textesRev = [st.nom, ...(st.reveler || [])];
    const rev = textesRev.map(normaliser);
    return { ...st, revele: false, el: null, entrees: entrees(st), textesRev, clesRev: rev, jetonsRev: rev.map(jetons) };
  })
}));
let mots = [];      // { texte, cle, pole (-1 = à trier), sous (-1 = directement sous le pôle), el }
let prenom = "";
poles.forEach(p => {
  p.essentiels = groupesEss(p.entrees);
  p.sous.forEach(st => st.essentiels = groupesEss(st.entrees));
  p.tousEss = [...p.essentiels, ...p.sous.flatMap(st => st.essentiels)];
  const pep = lst => [...new Set(lst.filter(e => e.groupe.pepite).map(e => e.groupe))];
  p.tousPep = [...pep(p.entrees), ...p.sous.flatMap(st => pep(st.entrees))];
});
let fautes = [];    // { ecrit, correct, type } : mots à bien orthographier
let suivi = { indices: 0, reponses: 0, essais: 1 };   // conservé même après « Recommencer »

function trouver(saisie) {
  const n = normaliser(saisie);
  if (!n) return null;
  const nT = jetons(n);
  const cands = [];
  poles.forEach((p, i) => {
    p.entrees.forEach(e => cands.push({ type: "mot", pole: i, sous: -1, s: scoreCle(n, e.cle), e }));
    p.sous.forEach((st, j) => {
      st.entrees.forEach(e => cands.push({ type: "mot", pole: i, sous: j, s: scoreCle(n, e.cle), e }));
      st.clesRev.forEach((k, q) => {
        const sc = scoreCle(n, k), ss = scoreSouple(nT, st.jetonsRev[q]);
        cands.push({ type: "reveler", pole: i, sous: j, s: Math.min(sc, ss) - 0.01,
                     // forme de référence (pour l'orthographe) seulement si l'élève a écrit le nom lui-même
                     e: sc <= ss && (sc <= 0.1 || sc >= 1) ? { texte: st.textesRev[q], cle: k } : null });
      });
    });
  });
  let best = null;
  cands.forEach(c => { if (c.s < Infinity && (!best || c.s < best.s)) best = c; });
  if (!best) return null;
  // même mot prévu dans plusieurs pôles : on le placera partout
  const alts = [];
  if (best.type === "mot" && best.e) cands.forEach(c => {
    if (c.type === "mot" && c.e && (c.pole !== best.pole || c.sous !== best.sous) && c.s === best.s && c.e.cle === best.e.cle &&
        !alts.some(a => a.pole === c.pole && a.sous === c.sous)) alts.push(c);
  });
  best.alts = alts;
  const vus = new Set(), revs = [];
  cands.forEach(c => {
    if (c.type === "reveler" && c.s <= best.s + 0.06 && !vus.has(c.pole + ":" + c.sous)) {
      vus.add(c.pole + ":" + c.sous); revs.push(c);
    }
  });
  return { best, revs };
}

/* ---------- Orthographe ----------
   Compare ce que l'élève a écrit avec la forme correcte (accents, majuscules,
   traits d'union, lettres). Les articles et le pluriel ne comptent pas comme fautes. */
const sansAccent = x => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function formeEcrite(s) {
  let t = s.replace(/[’`]/g, "'").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  while (t.length > 1 && ARTICLES.includes(sansAccent(t[0].toLowerCase()).replace(/'$/, ""))) t.shift();
  if (t.length && /^[lLdD]'./.test(t[0])) t[0] = t[0].slice(2);
  return t;
}
const minuscule = w => /^[a-zà-ÿ]/.test(w);
// égalité mot à mot ; le pluriel (s, x) n'est toléré que pour les noms communs
function egal(a, b, f) {
  if (a.length !== b.length) return false;
  return b.every((w, k) => {
    const x = f(a[k]), y = f(w);
    if (x === y) return true;
    return minuscule(w) && (x === y + "s" || x === y + "x" || y === x + "s" || y === x + "x");
  });
}
function verifierOrthographe(ecrit, correct, titre) {
  const a = formeEcrite(ecrit), b = formeEcrite(correct);
  const bas = x => x.toLowerCase(), sa = x => sansAccent(x.toLowerCase());
  const colle = (t, pl) => { const c = sansAccent(t.join("").toLowerCase()).replace(/[-\s']+/g, ""); return pl ? c.replace(/[sx]$/, "") : c; };
  const types = [];
  if (!egal(a, b, bas)) {
    if (egal(a, b, sa)) types.push("accent");
    else if (colle(a) === colle(b) || (minuscule(b[b.length - 1] || "") && colle(a, 1) === colle(b, 1))) types.push("trait d'union ou espace");
    else types.push("orthographe");
  }
  // majuscules des noms propres (pas pour la 1re lettre d'un titre de bulle)
  // la majuscule de début d'une expression (plusieurs mots) n'est pas exigée
  if (a.length === b.length && b.some((w, k) => !((titre || b.length > 1) && k === 0) && /^[A-ZÀ-Ý]/.test(w) && a[k] && minuscule(a[k])))
    types.push("majuscule");
  if (!types.length) return null;
  // on garde le pluriel de l'élève pour un nom commun d'un seul mot
  let texte = correct;
  const dernier = ecrit.trim().split(/\s+/).pop();
  if (!correct.includes(" ") && minuscule(correct) && /[sx]$/i.test(dernier) && !/[sx]$/.test(correct))
    texte = correct + (/(au|eu)$/.test(correct) || correct === "pou" ? "x" : "s");
  return { texte, type: types.join(" + ") };
}
function noterFaute(ecrit, correct, type) {
  fautes = fautes.filter(f => normaliser(f.correct) !== normaliser(correct));
  fautes.push({ ecrit, correct, type });
}
function rendreOrtho() {
  const zone = $("ortho"), lst = $("orthoListe");
  $("nbOrtho").textContent = fautes.length;
  zone.classList.toggle("visible", fautes.length > 0);
  lst.innerHTML = "";
  fautes.forEach(f => {
    const el = document.createElement("span");
    el.className = "faute";
    el.innerHTML = "<s></s> → <b></b> <em></em>";
    el.querySelector("s").textContent = f.ecrit;
    el.querySelector("b").textContent = f.correct;
    el.querySelector("em").textContent = "(" + f.type + ")";
    lst.appendChild(el);
  });
}

const motsDe = (i, j) => mots.filter(m => m.pole === i && (j === undefined || m.sous === j));
const nbDans = i => motsDe(i).length + poles[i].sous.filter(s => s.revele).length;
/* Étoiles : calculées sur les idées essentielles 🔑 du pôle (mots + noms de bulles 🔑).
   ★ = au moins 1/3 des 🔑 du pôle · ★★ = 2/3 · ★★★ = toutes.
   Un pôle sans idée essentielle garde les paliers en nombre de mots (paliers: [..]). */
function essPole(i) {
  const p = poles[i];
  const total = p.tousEss.length + p.sous.filter(st => st.essentiel).length;
  const trouves = p.tousEss.filter(g => groupeTrouve(g, i)).length + p.sous.filter(st => st.essentiel && st.revele).length;
  return { total, trouves };
}
function seuils(i) {
  const { total } = essPole(i);
  if (!total) return poles[i].paliers || [3, 6, 9];
  return [Math.max(1, Math.ceil(total / 3)), Math.max(1, Math.ceil(2 * total / 3)), total];
}
const valeurPole = i => essPole(i).total ? essPole(i).trouves : nbDans(i);
const etoiles = i => seuils(i).filter(x => valeurPole(i) >= x).length;
const sousVisible = (i, j) => poles[i].sous[j].revele || motsDe(i, j).length > 0;
const nomSous = st => st.revele ? st.nom : "?";
const nomAffiche = st => (st.revele || correction) ? st.nom : "?";
const totalEtoiles = () => poles.reduce((s, p, i) => s + etoiles(i), 0);
const toutesBulles = () => poles.every(p => p.sous.every(s => s.revele));
const toutFini = () => poles.every((p, i) => etoiles(i) === 3) && toutesBulles();
const NIVEAUX = ["", "★ Pas mal !", "★★ Bien !", "★★★ Très bien !"];
const nbMots = () => new Set(mots.map(m => m.cle)).size;
const nbBulles = () => poles.reduce((s, p) => s + p.sous.filter(x => x.revele).length, 0);
const totBulles = () => poles.reduce((s, p) => s + p.sous.length, 0);

/* ---------- Idées essentielles et correction ---------- */
let correction = false, scoreAvant = null, fantomes = [];
const fantomeEls = new Map();
const maj1 = t => t.charAt(0).toUpperCase() + t.slice(1);
const contient = (a, b) => !!a && !!b && b.length >= 3 && (" " + a + " ").includes(" " + b + " ");
// le mot de l'élève valide l'idée s'il EST l'idée (ou une de ses variantes), ou s'il la contient
// (« guerre des tranchées » valide « tranchée ») ; « 1918 » ne valide pas « 11 novembre 1918 »
const satisfait = (g, m) => g.cles.some(k => m.ref === k || m.cle === k || contient(m.cle, k));
const groupeTrouve = (g, i) => motsDe(i).some(m => satisfait(g, m));
const estPepite = m => m.pole >= 0 && poles[m.pole].tousPep.some(g => g.cles.includes(m.ref) || g.cles.includes(m.cle));
const nbPepites = () => new Set(mots.filter(estPepite).map(m => m.cle)).size;
const estEssentiel = m => m.pole >= 0 && poles[m.pole].tousEss.some(g => satisfait(g, m));
const bullesEss = () => poles.flatMap(p => p.sous.filter(st => st.essentiel));
const totalEss = () => poles.reduce((s, p) => s + p.tousEss.length, 0) + bullesEss().length;
const essTrouves = () => poles.reduce((s, p, i) => s + p.tousEss.filter(g => groupeTrouve(g, i)).length, 0) +
  bullesEss().filter(st => st.revele).length;
function calculerManquants() {
  const res = [];
  poles.forEach((p, i) => {
    p.essentiels.forEach(g => { if (!groupeTrouve(g, i)) res.push({ cleF: `${i}:-1:${g.nom}`, texte: maj1(g.nom), pole: i, sous: -1, fantome: true }); });
    p.sous.forEach((st, j) => st.essentiels.forEach(g => {
      if (!groupeTrouve(g, i)) res.push({ cleF: `${i}:${j}:${g.nom}`, texte: maj1(g.nom), pole: i, sous: j, fantome: true });
    }));
  });
  return res;
}
function majFantomes() {
  const lst = correction ? calculerManquants() : [];
  const garde = new Set(lst.map(f => f.cleF));
  fantomeEls.forEach((o, k) => { if (!garde.has(k)) { o.el.remove(); fantomeEls.delete(k); } });
  fantomes = lst.map(f => {
    let o = fantomeEls.get(f.cleF);
    if (!o) {
      o = f; o.el = document.createElement("div");
      o.el.className = "noeud mot fantome"; o.el.textContent = f.texte;
      o.el.title = "Idée essentielle oubliée";
      carte.appendChild(o.el); fantomeEls.set(f.cleF, o);
    }
    return o;
  });
}
const fantomesDe = (i, j) => fantomes.filter(f => f.pole === i && f.sous === j);

function etatCourant() {
  return {
    mots: mots.map(m => ({ texte: m.texte, cle: m.cle, ref: m.ref, corrige: m.corrige, apres: m.apres, nonVerifie: m.nonVerifie, pole: m.pole, sous: m.sous })),
    fautes, scoreAvant, suivi, modeRanger, rangement, aRanger,
    phrases, defisFaits: [...defisFaits],
    trouve: poles.map(p => p.trouve), indice: poles.map(p => p.indice),
    revele: poles.map(p => p.sous.map(s => s.revele)), prenom
  };
}
function sauvegarder() {
  try { localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(etatCourant())); } catch (e) {}
}
function restaurer() {
  try {
    let d = window.__ETAT_INITIAL || null;           // état transmis par « Ouvrir en grand »
    if (!d) d = JSON.parse(localStorage.getItem(CLE_SAUVEGARDE) || "null");
    if (!d) return;
    poles.forEach((p, i) => {
      p.trouve = !!d.trouve[i]; p.indice = !!d.indice[i];
      p.sous.forEach((s, j) => s.revele = !!(d.revele[i] && d.revele[i][j]));
    });
    prenom = d.prenom || "";
    fautes = d.fautes || [];
    scoreAvant = d.scoreAvant || null;
    if (d.suivi) suivi = d.suivi;
    if (d.rangement) rangement = d.rangement;
    modeRanger = !!d.modeRanger;
    aRanger = d.aRanger || [];
    phrases = d.phrases || [];
    defisFaits = new Set(d.defisFaits || []);
    d.mots.forEach(m => {
      if (m.pole >= poles.length) return;
      if (m.pole >= 0 && m.sous >= poles[m.pole].sous.length) m.sous = -1;
      creerEtiquette(m); mots.push(m);
    });
  } catch (e) {}
}

/* ---------- Drapeaux (dessinés : pas d'émoji, qui ne s'affichent pas sous Windows) ----------
   Formes simplifiées des drapeaux de l'époque (Empire allemand noir-blanc-rouge, etc.). */
const PAYS_DRAPEAU = Object.assign({
  "france": "fr", "royaume uni": "gb", "angleterre": "gb", "grande bretagne": "gb", "russie": "ru", "empire russe": "ru",
  "empire de russie": "ru", "allemagne": "de", "empire allemand": "de", "autriche hongrie": "ah",
  "empire d autriche hongrie": "ah", "autriche": "ah", "empire ottoman": "ot", "turquie": "ot", "italie": "it",
  "belgique": "be", "serbie": "rs", "bulgarie": "bg", "etat uni": "us", "japon": "jp", "pologne": "pl",
  "tchecoslovaquie": "cz"
}, CONFIG.drapeaux || {});
const CODES_DRAPEAU = new Map(Object.entries(PAYS_DRAPEAU).map(([k, v]) => [normaliser(k), v]));
const drapeauDe = m => CODES_DRAPEAU.get(m.ref) || CODES_DRAPEAU.get(m.cle) || null;
// dessin sur une grille 24 × 16, avec un « crayon » qui sait écrire en SVG ou sur un canevas
function dessinerDrapeau(code, c) {
  const bandesV = cs => cs.forEach((col, k) => c.rect(k * 24 / cs.length, 0, 24 / cs.length + .05, 16, col));
  const bandesH = cs => cs.forEach((col, k) => c.rect(0, k * 16 / cs.length, 24, 16 / cs.length + .05, col));
  switch (code) {
    case "fr": bandesV(["#0055A4", "#fff", "#EF4135"]); break;
    case "it": bandesV(["#009246", "#fff", "#CE2B37"]); break;
    case "be": bandesV(["#000", "#FDDA24", "#EF3340"]); break;
    case "ru": bandesH(["#fff", "#0039A6", "#D52B1E"]); break;
    case "de": bandesH(["#000", "#fff", "#DD0000"]); break;
    case "ah": bandesH(["#C8102E", "#fff", "#C8102E"]); break;
    case "rs": bandesH(["#C6363C", "#0C4076", "#fff"]); break;
    case "bg": bandesH(["#fff", "#00966E", "#D62612"]); break;
    case "pl": bandesH(["#fff", "#DC143C"]); break;
    case "cz": bandesH(["#fff", "#D7141A"]); c.poly([[0, 0], [11, 8], [0, 16]], "#11457E"); break;
    case "jp": c.rect(0, 0, 24, 16, "#fff"); c.cercle(12, 8, 4.6, "#BC002D"); break;
    case "ot": c.rect(0, 0, 24, 16, "#E30A17"); c.cercle(10, 8, 4.2, "#fff"); c.cercle(11.3, 8, 3.4, "#E30A17"); c.cercle(15.6, 8, 1.4, "#fff"); break;
    case "us":
      for (let k = 0; k < 7; k++) c.rect(0, k * 16 / 7, 24, 16 / 7 + .05, k % 2 ? "#fff" : "#B22234");
      c.rect(0, 0, 10, 16 * 4 / 7, "#3C3B6E"); break;
    case "gb":
      c.rect(0, 0, 24, 16, "#012169");
      c.trait(0, 0, 24, 16, 3.2, "#fff"); c.trait(24, 0, 0, 16, 3.2, "#fff");
      c.trait(0, 0, 24, 16, 1.1, "#C8102E"); c.trait(24, 0, 0, 16, 1.1, "#C8102E");
      c.rect(9.5, 0, 5, 16, "#fff"); c.rect(0, 5.5, 24, 5, "#fff");
      c.rect(10.5, 0, 3, 16, "#C8102E"); c.rect(0, 6.5, 24, 3, "#C8102E"); break;
  }
}
function svgDrapeau(code) {
  let h = "";
  dessinerDrapeau(code, {
    rect: (x, y, w, hh, col) => h += `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${col}"/>`,
    cercle: (x, y, r, col) => h += `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`,
    poly: (pts, col) => h += `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${col}"/>`,
    trait: (x1, y1, x2, y2, ep, col) => h += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${ep}"/>`
  });
  return `<svg class="drapeau" viewBox="0 0 24 16" aria-hidden="true">${h}</svg>`;
}
function canvasDrapeau(ctx, code, x, y, w, hh) {
  const k = w / 24;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, hh / 16);
  ctx.beginPath(); ctx.rect(0, 0, 24, 16); ctx.clip();
  dessinerDrapeau(code, {
    rect: (a, b, ww, h2, col) => { ctx.fillStyle = col; ctx.fillRect(a, b, ww, h2); },
    cercle: (a, b, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(a, b, r, 0, 7); ctx.fill(); },
    poly: (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach(([a, b], n) => n ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.fill(); },
    trait: (a, b, c2, d, ep, col) => { ctx.strokeStyle = col; ctx.lineWidth = ep; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c2, d); ctx.stroke(); }
  });
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,.3)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, hh);
}
// texte d'une étiquette, précédé du drapeau s'il s'agit d'un pays
function remplirEtiquette(el, m) {
  el.textContent = m.texte;
  const d = drapeauDe(m);
  if (d) el.insertAdjacentHTML("afterbegin", svgDrapeau(d));
}

/* ---------- Éléments de la carte en étoile ---------- */
const centre = document.createElement("div");
centre.className = "noeud centre";
centre.innerHTML = `${CONFIG.titre}<small>${CONFIG.sousTitre || ""}</small>`;
carte.appendChild(centre);
poles.forEach(p => {
  p.el = document.createElement("div"); p.el.dataset.pole = poles.indexOf(p); carte.appendChild(p.el);
  p.sous.forEach(st => {
    st.el = document.createElement("div"); st.el.dataset.pole = poles.indexOf(p);
    st.el.style.setProperty("--c", p.couleur);
    st.el.style.display = "none";
    carte.appendChild(st.el);
  });
});

function creerEtiquette(m) {
  m.el = document.createElement("div");
  m.el.className = "noeud mot" + (m.corrige ? " corrige" : "") + (m.nonVerifie ? " nonverif" : "");
  if (m.nonVerifie) m.el.title = "Mot rangé par l'élève, absent de la liste : à vérifier";
  remplirEtiquette(m.el, m);
  if (m.corrige) m.el.title = "Tu avais écrit : " + m.corrige;
  m.el.addEventListener("click", e => { e.stopPropagation(); ouvrirMenu(m, m.el); });
  carte.appendChild(m.el);
}
function animer(el) { el.classList.remove("anim"); void el.offsetWidth; el.classList.add("anim"); }

function texteEtoiles(i) {
  const e = etoiles(i), ep = essPole(i);
  const suite = ep.total ? `🔑 ${ep.trouves}/${ep.total}` : `${nbDans(i)} mots`;
  return "★".repeat(e) + "☆".repeat(3 - e) + " " + suite;
}
const badgeHTML = i => `<span class="badge${etoiles(i) ? " atteint" : ""}">${texteEtoiles(i)}</span>`;

function majElements() {
  poles.forEach((p, i) => {
    const anim = p.el.classList.contains("anim") ? " anim" : "";
    if (p.trouve) {
      p.el.className = "noeud pole" + anim;
      p.el.style.background = fondPole(p);
      p.el.classList.toggle("drapeau", !!p.drapeau);
      p.el.innerHTML = `${p.icone} ${p.nom}${badgeHTML(i)}`;
      p.el.style.display = "";
    } else {
      const montrer = p.indice || correction;
      p.el.className = "noeud pole cache" + (montrer ? " indice" : "");
      p.el.style.background = "";
      p.el.textContent = montrer ? `? ${p.nom}` : "?";
      p.el.style.display = (CONFIG.afficherPolesCaches || montrer) ? "" : "none";
    }
    p.sous.forEach((st, j) => {
      const a = st.el.classList.contains("anim") ? " anim" : "";
      const vis = sousVisible(i, j) || correction;
      st.el.className = "noeud sous" + (st.revele ? "" : " cache") + (!st.revele && correction ? " fantome" : "") +
        (st.essentiel && (st.revele || correction) ? " essentiel" : "") + a;
      st.el.textContent = nomAffiche(st);
      st.el.style.display = vis ? "" : "none";
      if (!vis) st.place = false;
    });
  });
}

/* ---------- Disposition en étoile (sert aussi pour l'image) ---------- */
const ESPACE = 10;   // espace minimal (en px) entre deux étiquettes
function calculerDisposition(W, H, tCentre, tPoles, arbres) {
  const N = tPoles.length, cx = W / 2, cy = H * (CONFIG.centreY || 0.5);   // centreY < 0.5 : plus de place en bas
  const Rx = W * 0.31, Ry = H * 0.32;
  const base = Math.max(62, Math.min(W, H) * 0.15);
  const borner = b => {
    b.x = Math.max(b.w / 2 + 4, Math.min(W - b.w / 2 - 4, b.x));
    b.y = Math.max(b.h / 2 + 4, Math.min(H - b.h / 2 - 4, b.y));
  };
  // place une étiquette autour d'un point ; si elle sortirait de la carte, on la fait pivoter vers l'intérieur
  const dehors = (x, y, w, h) => Math.max(0, w / 2 + 4 - x) + Math.max(0, x - (W - w / 2 - 4)) +
                                 Math.max(0, h / 2 + 4 - y) + Math.max(0, y - (H - h / 2 - 4));
  function placerAutour(x0, y0, ang, r, kx, ky, w, h) {
    let best = null;
    for (const d of [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4, Math.PI]) {
      const a = ang + d, x = x0 + r * Math.cos(a) * kx, y = y0 + r * Math.sin(a) * ky, o = dehors(x, y, w, h);
      if (!best || o < best.o - 1) best = { x, y, a, o };
      if (o === 0) break;
    }
    return best;
  }
  const boites = [];
  const c = { x: cx, y: cy, w: tCentre.w, h: tCentre.h, poids: Infinity };
  boites.push(c);
  const ps = tPoles.map((t, i) => {
    const a = t.angle != null ? t.angle * Math.PI / 180 : -Math.PI / 2 + Math.PI / N + i * 2 * Math.PI / N;
    const b = { x: cx + Rx * Math.cos(a), y: cy + Ry * Math.sin(a), w: t.w, h: t.h, poids: 4, a };
    borner(b); boites.push(b); return b;
  });
  const items = arbres.map((lst, i) => {
    const p = ps[i];
    return lst.map((t, j) => {
      const anneau = Math.floor(j / 5), k = j % 5;
      const nb = Math.min(5, lst.length - anneau * 5);
      const ecart = 0.62 - anneau * 0.12;
      const ang = p.a + (k - (nb - 1) / 2) * ecart + anneau * 0.25;
      const r = base + anneau * base * 0.75;
      const pl = placerAutour(p.x, p.y, ang, r, 1.2, 0.8, t.w, t.h);
      const b = { x: pl.x, y: pl.y, w: t.w, h: t.h, poids: 1 };
      borner(b); b.cx = b.x; b.cy = b.y; boites.push(b);
      b.enfants = (t.enfants || []).map((e, q) => {
        const n2 = t.enfants.length, an2 = Math.floor(q / 4), k2 = q % 4, nb2 = Math.min(4, n2 - an2 * 4);
        const a2 = pl.a + (k2 - (nb2 - 1) / 2) * 0.6 + an2 * 0.3;
        const r2 = base * 0.85 + an2 * base * 0.6;
        const pl2 = placerAutour(b.x, b.y, a2, r2, 1.15, 0.8, e.w, e.h);
        const e2 = { x: pl2.x, y: pl2.y, w: e.w, h: e.h, poids: 1 };
        borner(e2); e2.cx = e2.x; e2.cy = e2.y; boites.push(e2); return e2;
      });
      return b;
    });
  });
  // liens (traits) de la carte : centre → pôles, pôle → étiquettes, bulle → mots
  const aretes = [];
  ps.forEach((p, i) => {
    aretes.push([c, p]);
    items[i].forEach(b => { aretes.push([p, b]); b.enfants.forEach(e => aretes.push([b, e])); });
  });
  // une étiquette traversée par un trait qui ne la concerne pas s'écarte du trait
  function eviterTraits() {
    let bouge = false;
    aretes.forEach(([P, Q]) => {
      const dx = Q.x - P.x, dy = Q.y - P.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
      boites.forEach(B => {
        if (B === P || B === Q || B.poids === Infinity) return;
        if (Math.max(P.x, Q.x) < B.x - B.w / 2 - 4 || Math.min(P.x, Q.x) > B.x + B.w / 2 + 4 ||
            Math.max(P.y, Q.y) < B.y - B.h / 2 - 4 || Math.min(P.y, Q.y) > B.y + B.h / 2 + 4) return;
        for (let t = 0.1; t <= 0.9; t += 0.08) {
          const sx = P.x + dx * t, sy = P.y + dy * t;
          if (Math.abs(sx - B.x) < B.w / 2 + 4 && Math.abs(sy - B.y) < B.h / 2 + 4) {
            const cote = ((B.x - sx) * nx + (B.y - sy) * ny) >= 0 ? 1 : -1;
            const pas = 3 / B.poids;
            B.x += nx * cote * pas; B.y += ny * cote * pas;
            bouge = true; break;
          }
        }
      });
    });
    return bouge;
  }
  const auBord = b => b.x - b.w / 2 <= 5 || b.x + b.w / 2 >= W - 5;
  const auBordY = b => b.y - b.h / 2 <= 5 || b.y + b.h / 2 >= H - 5;
  for (let it = 0; it < 450; it++) {
    let bouge = false;
    for (let a = 0; a < boites.length; a++) for (let d = a + 1; d < boites.length; d++) {
      const A = boites[a], B = boites[d];
      const ox = (A.w + B.w) / 2 + ESPACE - Math.abs(A.x - B.x);
      const oy = (A.h + B.h) / 2 + ESPACE - Math.abs(A.y - B.y);
      if (ox > 0 && oy > 0) {
        bouge = true;
        let parX = ox < oy * 1.3;
        if (it > 60) {
          if (auBord(A) || auBord(B)) parX = false;          // collé à gauche/droite : on pousse verticalement
          else if (auBordY(A) || auBordY(B)) parX = true;    // collé en haut/en bas : on pousse horizontalement
        }
        const sens = parX ? (A.x < B.x || (A.x === B.x && a < d) ? -1 : 1) : (A.y < B.y || (A.y === B.y && a < d) ? -1 : 1);
        const tot = (parX ? ox : oy) + 0.5;
        const iA = 1 / A.poids, iB = 1 / B.poids, s = iA + iB;
        if (parX) { A.x += sens * tot * iA / s; B.x -= sens * tot * iB / s; }
        else { A.y += sens * tot * iA / s; B.y -= sens * tot * iB / s; }
      }
    }
    // les étiquettes s'écartent des traits qui les traversent
    if (it < 340 && it % 2 === 0 && eviterTraits()) bouge = true;
    // ressort : chaque étiquette est légèrement rappelée vers sa place idéale (près de son pôle)
    if (it < 300) boites.forEach(b => { if (b.cx != null) { b.x += (b.cx - b.x) * 0.03; b.y += (b.cy - b.y) * 0.03; } });
    boites.forEach(b => { if (b.poids !== Infinity) borner(b); });
    if (!bouge && it >= 300) break;
    if (!bouge && it < 300) { /* on laisse le ressort agir encore un peu */ }
  }
  return { centre: c, poles: ps, items };
}

function elementsDuPole(i) {
  const p = poles[i], res = [];
  p.sous.forEach((st, j) => {
    if (sousVisible(i, j) || correction) res.push({ type: "sous", st, j, enfants: [...motsDe(i, j), ...fantomesDe(i, j)] });
  });
  [...motsDe(i, -1), ...fantomesDe(i, -1)].forEach(m => res.push({ type: "mot", m }));
  return res;
}

const placer = (el, x, y) => { el.style.left = x + "px"; el.style.top = y + "px"; };
function placerAnime(obj, el, depart, arrivee) {
  if (!obj.place) { el.style.transition = "none"; placer(el, depart.x, depart.y); void el.offsetWidth; el.style.transition = ""; obj.place = true; }
  placer(el, arrivee.x, arrivee.y);
}

function rendreEtoile() {
  majElements();
  const W = carte.clientWidth, H0 = carte.clientHeight;
  if (!W || !H0) return;
  carte.classList.toggle("dense", mots.filter(m => m.pole >= 0).length > 40);   // carte très remplie : tout un peu plus petit
  mots.forEach(m => {
    if (m.pole >= 0) m.el.dataset.pole = m.pole;
    m.el.style.display = m.pole < 0 ? "none" : ""; if (m.pole < 0) m.place = false;
    m.el.classList.toggle("essentiel", estEssentiel(m));
    m.el.classList.toggle("pepite", estPepite(m));
    m.el.classList.toggle("mineur", !estEssentiel(m) && !estPepite(m));
    m.el.classList.toggle("apres", !!m.apres);
  });
  const arbres = poles.map((p, i) => elementsDuPole(i));
  const tailles = arbres.map(lst => lst.map(it => it.type === "sous"
    ? { w: it.st.el.offsetWidth + 6, h: it.st.el.offsetHeight + 6,
        enfants: it.enfants.map(m => ({ w: m.el.offsetWidth + 6, h: m.el.offsetHeight + 6 })) }
    : { w: it.m.el.offsetWidth + 6, h: it.m.el.offsetHeight + 6 }));
  // carte très remplie : on l'agrandit en hauteur (elle défile) plutôt que d'empiler les étiquettes
  let aire = centre.offsetWidth * centre.offsetHeight;
  poles.forEach(p => aire += p.el.offsetWidth * p.el.offsetHeight);
  tailles.forEach(l => l.forEach(t => { aire += t.w * t.h; (t.enfants || []).forEach(e => aire += e.w * e.h); }));
  const H = Math.max(H0, Math.round(aire * 3.6 / W), poles.length >= 9 ? Math.round(W * 0.62) : 0);
  svg.style.height = H + "px";
  const d = calculerDisposition(W, H, { w: centre.offsetWidth, h: centre.offsetHeight },
    poles.map(p => ({ w: p.el.offsetWidth, h: p.el.offsetHeight, angle: p.angle })), tailles);

  placer(centre, d.centre.x, d.centre.y);
  let traits = "";
  const ligne = (a, b, coul, ep, op, tirets) =>
    `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${coul}" stroke-width="${ep}" opacity="${op}" stroke-linecap="round"${tirets ? ' stroke-dasharray="6 6"' : ""}/>`;
  poles.forEach((p, i) => {
    const b = d.poles[i];
    placer(p.el, b.x, b.y);
    if (p.el.style.display !== "none")
      traits += p.trouve ? ligne(d.centre, b, p.couleur, 4, .75) : ligne(d.centre, b, "#bbb", 2, 1, true);
    arbres[i].forEach((it, j) => {
      const q = d.items[i][j];
      if (it.type === "mot") {
        placerAnime(it.m, it.m.el, b, q);
        traits += it.m.fantome ? ligne(b, q, "#aaa", 2, .8, true) : ligne(b, q, p.couleur, estEssentiel(it.m) ? 2 : 1.2, estEssentiel(it.m) ? .6 : .4);
      } else {
        placerAnime(it.st, it.st.el, b, q);
        traits += ligne(b, q, p.couleur, 3, .7, !it.st.revele);
        it.enfants.forEach((m, k) => {
          const e = q.enfants[k];
          placerAnime(m, m.el, q, e);
          traits += m.fantome ? ligne(q, e, "#aaa", 2, .8, true) : ligne(q, e, p.couleur, estEssentiel(m) ? 2 : 1.2, estEssentiel(m) ? .55 : .4);
        });
      }
    });
  });
  svg.innerHTML = traits;
  $("liensPhrases").style.height = H + "px";
  $("liensPhrases").innerHTML = svgLiensPhrases();
}

/* ---------- Carte en liste (téléphone) ---------- */
function puce(m) {
  const el = document.createElement("span");
  el.className = "mot" + (m.nouveau ? " nouveau" : "") + (m.corrige ? " corrige" : "") +
    (estEssentiel(m) ? " essentiel" : "") + (estPepite(m) ? " pepite" : "") + (!estEssentiel(m) && !estPepite(m) ? " mineur" : "") +
    (m.apres ? " apres" : "") + (m.nonVerifie ? " nonverif" : "");
  remplirEtiquette(el, m);
  if (m.corrige) el.title = "Tu avais écrit : " + m.corrige;
  el.style.borderColor = m.pole >= 0 ? poles[m.pole].couleur : "#999";
  el.addEventListener("click", e => { e.stopPropagation(); ouvrirMenu(m, el); });
  return el;
}
function puceFantome(f) {
  const el = document.createElement("span");
  el.className = "mot fantome"; el.textContent = f.texte; el.title = "Idée essentielle oubliée";
  return el;
}
function rendreListe(flash) {
  liste.innerHTML = "";
  const c = document.createElement("div");
  c.className = "l-centre";
  c.innerHTML = `${CONFIG.titre}<small>${CONFIG.sousTitre || ""}</small>`;
  liste.appendChild(c);
  let cible = null;
  poles.forEach((p, i) => {
    if (!p.trouve && !CONFIG.afficherPolesCaches && !p.indice) return;
    const bloc = document.createElement("div");
    bloc.className = "l-pole" + (p.trouve ? "" : " cache" + (p.indice || correction ? " indice" : ""));
    bloc.style.setProperty("--c", p.couleur); bloc.dataset.pole = i;
    const tete = document.createElement("div");
    tete.className = "l-tete";
    if (p.trouve && p.drapeau) { tete.style.background = fondPole(p); tete.style.paddingBottom = "12px"; }
    tete.innerHTML = p.trouve ? `<span>${p.icone} ${p.nom}</span>${badgeHTML(i)}`
                              : `<span>${p.indice || correction ? "? " + p.nom : "? Pôle à découvrir"}</span>`;
    bloc.appendChild(tete);
    if (p.trouve || correction) {
      const barre = document.createElement("div");
      barre.className = "l-barre";
      barre.innerHTML = `<i style="width:${Math.min(100, 100 * valeurPole(i) / seuils(i)[2])}%"></i>`;
      bloc.appendChild(barre);
      p.sous.forEach((st, j) => {
        if (!sousVisible(i, j) && !correction) return;
        const s = document.createElement("div");
        s.className = "l-sous" + (st.revele ? "" : " cache") + (st.essentiel && (st.revele || correction) ? " essentiel" : "");
        const t = document.createElement("div");
        t.className = "l-sous-titre";
        t.textContent = st.revele ? "↳ " + st.nom : (correction ? "↳ " + st.nom + "  (nom à trouver)" : "↳ ?  (trouve le nom de ce groupe)");
        s.appendChild(t);
        const z = document.createElement("div");
        z.className = "l-mots";
        motsDe(i, j).forEach(m => z.appendChild(puce(m)));
        fantomesDe(i, j).forEach(f => z.appendChild(puceFantome(f)));
        s.appendChild(z);
        if (flash && flash.pole === i && flash.sous === j) { s.classList.add("flash"); cible = s; }
        bloc.appendChild(s);
      });
      const zone = document.createElement("div");
      zone.className = "l-mots";
      motsDe(i, -1).forEach(m => zone.appendChild(puce(m)));
      fantomesDe(i, -1).forEach(f => zone.appendChild(puceFantome(f)));
      bloc.appendChild(zone);
    }
    if (flash && flash.pole === i && !cible) { bloc.classList.add("flash"); cible = bloc; }
    liste.appendChild(bloc);
  });
  if (cible) setTimeout(() => cible.scrollIntoView({ block: "nearest", behavior: "smooth" }), 30);
}

/* ---------- Rendu général ---------- */
function rendre(flash) {
  majFantomes();
  const nR = rangement.justes + rangement.faux;
  stats.textContent = `${nbMots()} mot${nbMots() > 1 ? "s" : ""} · ` +
    (modeRanger ? "" : `${poles.filter(p => p.trouve).length}/${poles.length} pôles · `) +
    `${nbBulles()}/${totBulles()} bulles · 🔑 ${essTrouves()}/${totalEss()}` + (nbPepites() ? ` · 💎 ${nbPepites()}` : "") +
    ` · ★ ${totalEtoiles()}/${poles.length * 3}` + (nR ? ` · 🎯 ${rangement.justes}/${nR}` : "") +
    (phrases.length ? ` · 🔗 ${phrases.length}` : "");
  rendreBac();
  if (document.body.classList.contains("mobile")) rendreListe(flash); else rendreEtoile();
  mots.forEach(m => m.nouveau = false);
  rendreOrtho(); rendrePhrases();
  sauvegarder();
}

function verifierMode() {
  const mobile = window.innerWidth < 700;
  document.body.classList.toggle("compact", !mobile && (window.innerWidth < 1050 || window.innerHeight < 700));
  if (mobile !== document.body.classList.contains("mobile")) {
    document.body.classList.toggle("mobile", mobile);
    rendre();
  } else if (!mobile) rendreEtoile();
}

/* ---------- Ajout d'un mot ---------- */
function afficherMessage(t, type) { msg.textContent = t; msg.className = type || ""; }
function celebrer() {
  document.querySelectorAll(".centre, .l-centre").forEach(el => {
    el.classList.remove("bravo"); void el.offsetWidth; el.classList.add("bravo");
  });
}
function decouvrirPole(p) {
  if (p.trouve) return false;
  p.trouve = true; animer(p.el); return true;
}
// Messages de fin : à appeler après chaque ajout
function bilanApres(avant) {
  if (!avant.fini && toutFini()) {
    afficherMessage("🏆 Extraordinaire ! ★★★ partout et toutes les bulles sont nommées. Télécharge ta carte !", "ok"); celebrer();
  } else if (!avant.tousUn && poles.every((p, i) => etoiles(i) >= 1)) {
    afficherMessage("🏅 Bravo ! Tu as au moins ★ dans chaque pôle. Vise maintenant ★★★ partout !", "ok"); celebrer();
  }
}
const etatAvant = () => ({ fini: toutFini(), tousUn: poles.every((p, i) => etoiles(i) >= 1) });

/* ---------- Ajout d'un mot ----------
   1) on analyse ce que l'élève a écrit ;
   2a) mode automatique : on range tout de suite ;
   2b) mode « je range moi-même » : l'élève choisit le pôle, puis on valide ou on corrige. */
let modeRanger = false;
let rangement = { justes: 0, faux: 0, erreurs: [] };   // erreurs : { texte, choisi, correct }

function analyser(brut) {
  const cle = normaliser(brut);
  if (!cle) return null;
  const r = trouver(brut);
  // nom d'un sous-thème (bulle)
  if (r && r.best.type === "reveler") {
    const nonRev = r.revs.filter(c => !poles[c.pole].sous[c.sous].revele);
    const visibles = nonRev.filter(c => motsDe(c.pole, c.sous).length);
    if (!nonRev.length) return { type: "deja", texte: poles[r.revs[0].pole].sous[r.revs[0].sous].nom };
    let cible = null;
    if (nonRev.length === 1) cible = nonRev[0];
    else if (visibles.length === 1) cible = visibles[0];
    else return { type: "ambigu" };
    const st = poles[cible.pole].sous[cible.sous];
    const faute = cible.e ? verifierOrthographe(brut, cible.e.texte, cible.e.texte === st.nom) : null;
    return { type: "reveler", brut, cible, faute, texte: st.nom, poles: [cible.pole] };
  }
  // un mot : forme correcte seulement si le mot reconnu est le mot lui-même (pas une expression qui le contient)
  const ent = r && r.best.e && (r.best.s <= 0.1 || r.best.s >= 1) ? r.best.e : null;
  const ref = ent ? ent.cle : cle;
  const deja = mots.find(m => m.cle === cle || m.ref === ref || (ent && ent.groupe.cles.includes(m.ref)));   // « Blum » puis « Léon Blum » = un seul mot
  if (deja) return { type: "deja", texte: deja.texte };
  // si l'une des variantes prévues est écrite exactement, ce n'est pas une faute
  const faute = ent && !ent.groupe.textes.some(v => normaliser(v) === ent.cle && !verifierOrthographe(brut, v))
    ? verifierOrthographe(brut, ent.texte) : null;
  let texte = faute ? faute.texte : brut;
  texte = texte.charAt(0).toUpperCase() + texte.slice(1);
  // un même mot peut être prévu dans plusieurs pôles : on le placera partout
  const places = r ? [{ pole: r.best.pole, sous: r.best.sous }, ...(r.best.alts || []).map(a => ({ pole: a.pole, sous: a.sous }))] : [];
  return { type: "mot", brut, cle, ref, texte, faute, places, poles: places.map(x => x.pole) };
}

function ajouter() {
  fermerMenu(); fermerChoix();
  const brut = champ.value.trim().replace(/\s+/g, " ");
  if (!brut) return;
  const a = analyser(brut);
  if (!a) { champ.value = ""; return; }
  if (a.type === "deja") { afficherMessage(`« ${a.texte} » est déjà sur la carte !`, "ko"); champ.value = ""; return; }
  if (a.type === "ambigu") {
    afficherMessage(`🤔 Plusieurs groupes peuvent correspondre à « ${brut} ». Précise ta réponse (où ? qui ? quand ?)`, "info");
    champ.focus(); return;
  }
  champ.value = "";
  if (modeRanger) {
    if (!aRanger.some(b => normaliser(b) === normaliser(brut))) aRanger.push(brut);
    champ.focus(); rendre();
    afficherMessage(`🧭 Fais glisser « ${a.texte} » vers le bon pôle (ou touche-le pour choisir).`, "info");
    return;
  }
  champ.focus();
  executer(a);
}

// Place le mot (ou dévoile la bulle). prefixe : verdict du mode « je range » ; poleForce : pôle choisi pour un mot inconnu
function executer(a, prefixe = "", poleForce = null) {
  const avant = etatAvant();
  if (a.type === "reveler") {
    const p = poles[a.cible.pole], st = p.sous[a.cible.sous];
    if (a.faute) noterFaute(a.brut, a.cible.e.texte, a.faute.type);
    const eAvant = etoiles(a.cible.pole);
    st.revele = true;
    const nouveauPole = decouvrirPole(p);
    animer(st.el);
    const eApres = etoiles(a.cible.pole);
    afficherMessage(prefixe + `🔓 Bulle trouvée : « ${st.nom} » (${p.nom})` +
      (nouveauPole ? " — nouveau pôle découvert !" : "") +
      (eApres > eAvant ? ` ${NIVEAUX[eApres]}` : "") +
      (motsDe(a.cible.pole, a.cible.sous).length ? "" : " Trouve maintenant des mots qui vont dedans."), "ok");
    rendre({ pole: a.cible.pole, sous: a.cible.sous });
    bilanApres(avant);
    garderPrefixe(prefixe);
    return;
  }
  if (a.faute) noterFaute(a.brut, a.faute.texte, a.faute.type);
  let places = a.places, nonVerifie = false;
  if (!places.length && poleForce != null) { places = [{ pole: poleForce, sous: -1 }]; nonVerifie = true; }
  const [pr, ...autres] = places.length ? places : [{ pole: -1, sous: -1 }];
  const pole = pr.pole, sous = pr.sous, texte = a.texte;
  const eAvant = pole >= 0 ? etoiles(pole) : 0;
  const m = { texte, cle: a.cle, ref: a.ref, pole, sous, nouveau: true, corrige: a.faute ? a.brut : null,
              apres: !!scoreAvant, nonVerifie };
  creerEtiquette(m);
  mots.push(m);
  const copies = autres.map(x => {
    const c = { ...m, pole: x.pole, sous: x.sous, el: null };
    creerEtiquette(c); mots.push(c); decouvrirPole(poles[x.pole]); return c;
  });

  if (pole >= 0 && nonVerifie) {
    decouvrirPole(poles[pole]);
    afficherMessage(`📌 « ${texte} » est rangé dans « ${poles[pole].nom} ». Ce mot n'est pas dans ma liste : ton professeur vérifiera.`, "info");
  } else if (pole >= 0) {
    const p = poles[pole];
    const st = sous >= 0 ? p.sous[sous] : null;
    const nouvelleBulle = st && !st.revele && motsDe(pole, sous).length === 1;
    if (nouvelleBulle) animer(st.el);
    const chemin = `${p.icone} ${p.nom}` + (st ? ` › ${nomSous(st)}` : "");
    const eApres = etoiles(pole);
    if (decouvrirPole(p)) {
      afficherMessage(`🎉 Nouveau pôle découvert : ${p.icone} ${p.nom} !` + (nouvelleBulle ? " Une bulle « ? » est apparue : trouve son nom !" : ""), "ok");
    } else if (eApres > eAvant) {
      const ep = essPole(pole);
      afficherMessage(`${NIVEAUX[eApres]} « ${p.nom} » : ` + (ep.total ? `${ep.trouves}/${ep.total} idées essentielles 🔑.` : `${nbDans(pole)} mots.`), "ok");
    } else if (nouvelleBulle) {
      afficherMessage(`❓ « ${texte} » → ${chemin} : une bulle mystère est apparue, quel est son nom ?`, "info");
    } else {
      afficherMessage(`✅ « ${texte} » → ${chemin}`, "ok");
    }
  } else {
    afficherMessage(`🤔 Je ne sais pas où ranger « ${texte} ». Fais-le glisser (en bas) vers le pôle qui convient.`, "info");
  }
  if (estPepite(m)) msg.textContent += `  💎 Pépite ! Peu d'élèves pensent à « ${texte} ».`;
  if (copies.length) msg.textContent += `  ➕ Aussi placé dans : ${copies.map(c => c.pole === pole && c.sous >= 0 ? (poles[c.pole].sous[c.sous].revele ? poles[c.pole].sous[c.sous].nom : "une autre bulle « ? »") : poles[c.pole].nom).join(", ")}.`;
  const note = noteDe(m);
  if (note) msg.textContent += "  ℹ️ " + note;
  rendre(pole >= 0 ? { pole, sous } : null);
  if (pole >= 0 && !nonVerifie) bilanApres(avant);
  garderPrefixe(prefixe);
}
function garderPrefixe(prefixe) {
  if (prefixe && !msg.textContent.startsWith(prefixe)) msg.textContent = prefixe + msg.textContent;
}

/* ---------- Bac du bas : mots à ranger (mode « je range ») et mots inconnus ---------- */
function rendreBac() {
  bacMots.innerHTML = "";
  aRanger.forEach(brut => {
    const a = analyser(brut);
    if (!a || a.type !== "mot" && a.type !== "reveler") return;
    const el = document.createElement("span");
    el.className = "mot a-ranger";
    remplirEtiquette(el, { texte: a.texte, ref: a.ref, cle: a.cle });
    el.addEventListener("click", e => { e.stopPropagation(); if (el.dataset.glisse) return; demanderPole({ ...a, brut }); });
    rendreGlissable(el, i => rangerDans(brut, i));
    bacMots.appendChild(el);
  });
  mots.filter(m => m.pole < 0).forEach(m => {
    const el = puce(m);
    rendreGlissable(el, i => {
      m.pole = i; m.sous = -1; m.nonVerifie = true; m.place = false; decouvrirPole(poles[i]);
      afficherMessage(`📌 « ${m.texte} » est rangé dans « ${poles[i].nom} ». Ton professeur vérifiera.`, "info");
      rendre({ pole: i, sous: -1 });
    });
    bacMots.appendChild(el);
  });
  const attenteRanger = aRanger.length > 0;
  $("bacTitre").textContent = attenteRanger ? "🧭 À ranger :" : "🤔 À trier :";
  $("bacAide").textContent = "— fais glisser un mot vers son pôle (ou touche-le).";
  bac.classList.toggle("visible", bacMots.children.length > 0);
  bac.classList.toggle("ranger", attenteRanger);
}

/* ---------- Glisser-déposer (souris et doigt) ---------- */
function cibleSous(x, y, fant) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el === fant || (fant && fant.contains(el))) continue;
    const t = el.closest("[data-pole]");
    if (t && !t.closest("#bac")) return Number(t.dataset.pole);
  }
  return null;
}
function surlignerPole(i, oui) {
  if (i == null) return;
  const els = [poles[i].el, ...document.querySelectorAll(`#liste .l-pole[data-pole="${i}"]`)];
  els.forEach(e => e && e.classList.toggle("cible", oui));
}
let defilement = 0, vitesse = 0;
function defiler() {
  if (!vitesse) { defilement = 0; return; }
  if (document.body.classList.contains("mobile")) window.scrollBy(0, vitesse); else carte.scrollTop += vitesse;
  defilement = requestAnimationFrame(defiler);
}
function rendreGlissable(el, deposer) {
  el.classList.add("glissable");
  el.addEventListener("pointerdown", e => {
    if (e.button > 0) return;
    const x0 = e.clientX, y0 = e.clientY;
    let fant = null, cible = null, parti = false;
    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    const bouger = ev => {
      if (!parti && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return;
      if (!parti) {
        parti = true; fermerChoix(); fermerMenu();
        fant = el.cloneNode(true); fant.classList.add("fantome-glisse"); document.body.appendChild(fant);
        document.body.classList.add("glisse"); el.classList.add("parti");
      }
      ev.preventDefault();
      fant.style.left = ev.clientX + "px"; fant.style.top = ev.clientY + "px";
      const t = cibleSous(ev.clientX, ev.clientY, fant);
      if (t !== cible) { surlignerPole(cible, false); cible = t; surlignerPole(cible, true); }
      // défilement automatique près des bords
      const zone = document.body.classList.contains("mobile")
        ? { haut: document.querySelector(".top").getBoundingClientRect().bottom, bas: bac.getBoundingClientRect().top }
        : { haut: carte.getBoundingClientRect().top, bas: carte.getBoundingClientRect().bottom };
      vitesse = ev.clientY < zone.haut + 50 ? -12 : ev.clientY > zone.bas - 50 ? 12 : 0;
      if (vitesse && !defilement) defilement = requestAnimationFrame(defiler);
    };
    const lacher = () => {
      el.removeEventListener("pointermove", bouger); el.removeEventListener("pointerup", lacher); el.removeEventListener("pointercancel", lacher);
      vitesse = 0;
      if (!parti) return;
      fant.remove(); document.body.classList.remove("glisse"); el.classList.remove("parti"); surlignerPole(cible, false);
      el.dataset.glisse = "1"; setTimeout(() => delete el.dataset.glisse, 50);
      if (cible != null) deposer(cible);
      else afficherMessage("Lâche le mot SUR un pôle de la carte pour le ranger.", "info");
    };
    el.addEventListener("pointermove", bouger);
    el.addEventListener("pointerup", lacher);
    el.addEventListener("pointercancel", lacher);
  });
}

/* ---------- Mode « je range moi-même » ---------- */
let attente = null;
let aRanger = [];   // mots tapés en mode « je range », en attente d'être glissés vers un pôle
function demanderPole(a) {
  attente = a;
  const z = $("choix");
  z.innerHTML = "";
  const q = document.createElement("p");
  q.append("🧭 Dans quel pôle ranges-tu ");
  const b = document.createElement("b"); b.textContent = `« ${a.texte} »`; q.append(b, " ?");
  z.appendChild(q);
  const grille = document.createElement("div");
  grille.className = "choix-poles";
  poles.forEach((p, i) => {
    const bt = document.createElement("button");
    bt.textContent = `${p.icone} ${p.nom}`;
    bt.style.background = fondPole(p);
    bt.onclick = e => { e.stopPropagation(); choisirPole(i); };
    grille.appendChild(bt);
  });
  z.appendChild(grille);
  const ann = document.createElement("button");
  ann.className = "secondaire annuler"; ann.textContent = "Annuler";
  ann.onclick = e => { e.stopPropagation(); fermerChoix(); };
  z.appendChild(ann);
  z.classList.add("visible");
  // sur ordinateur, le clavier peut servir directement (Tab / Entrée) ; sur téléphone, on évite de fermer le clavier
  if (!document.body.classList.contains("mobile")) setTimeout(() => grille.querySelector("button").focus({ preventScroll: true }), 0);
}
function fermerChoix() { attente = null; const z = $("choix"); if (z) z.classList.remove("visible"); }
function choisirPole(i) {
  const a = attente;
  fermerChoix();
  if (a) rangerDans(a.brut, i);
}
// range un mot en attente dans le pôle i (après un glisser-déposer ou un choix)
function rangerDans(brut, i) {
  aRanger = aRanger.filter(b => b !== brut);
  const a = analyser(brut);
  if (!a || a.type === "deja" || a.type === "ambigu") {
    if (a && a.type === "deja") afficherMessage(`« ${a.texte} » est déjà sur la carte !`, "ko");
    rendre(); return;
  }
  const p = poles[i];
  if (!a.poles.length) { executer(a, "", i); return; }        // mot inconnu : rangé là où l'élève l'a mis
  if (a.poles.includes(i)) {
    rangement.justes++;
    executer(a, "🎯 Bien rangé ! ");
  } else {
    rangement.faux++;
    const bon = poles[a.poles[0]];
    rangement.erreurs.push({ texte: a.texte, choisi: p.nom, correct: bon.nom });
    executer(a, `❌ Pas tout à fait : « ${a.texte} » va dans ${bon.icone} « ${bon.nom} », pas dans « ${p.nom} ». `);
  }
}
function majModes() {
  $("modeAuto").classList.toggle("actif", !modeRanger); $("modeAuto").setAttribute("aria-pressed", String(!modeRanger));
  $("modeRanger").classList.toggle("actif", modeRanger); $("modeRanger").setAttribute("aria-pressed", String(modeRanger));
}
$("modeAuto").onclick = e => {
  e.stopPropagation(); fermerChoix();
  if (!modeRanger) return;
  modeRanger = false; majModes();
  const enAttente = aRanger; aRanger = [];
  enAttente.forEach(b => { const a = analyser(b); if (a && (a.type === "mot" || a.type === "reveler")) executer(a); });
  rendre();
  afficherMessage("✨ Rangement automatique : écris un mot, il se range tout seul.", "info");
};
$("modeRanger").onclick = e => {
  e.stopPropagation();
  if (modeRanger) return;
  modeRanger = true; poles.forEach(p => p.trouve = true); majModes(); rendre();
  afficherMessage("🧭 À toi de ranger ! Écris tes mots : ils arrivent en bas de l'écran. Fais-les ensuite glisser vers le bon pôle.", "info");
};
document.addEventListener("keydown", e => { if (e.key === "Escape") { fermerChoix(); fermerMenu(); } });

/* ---------- Phase 2 : relier deux idées ----------
   L'élève choisit deux mots de deux pôles différents et écrit une phrase qui les relie,
   avec un connecteur logique : c'est l'entraînement au développement construit. */
const CONNECTEURS = ["car", "donc", "parce que", "puisque", "ainsi", "alors", "c'est pourquoi", "en effet", "mais",
  "pourtant", "cependant", "grâce à", "à cause de", "en raison de", "afin de", "pour", "entraîne", "provoque",
  "permet", "conduit à", "ce qui", "lorsque", "quand", "après", "avant", "pendant", "par conséquent", "de plus",
  "aussi", "comme", "si bien que", "depuis", "alors que", "tandis que", "en conséquence", "c'est pour cela"];
// (pas « dès » : sans accent, il se confond avec l'article « des »)
const CONNECTEURS_PROPOSES = ["car", "donc", "parce que", "c'est pourquoi", "ainsi", "en effet", "grâce à", "à cause de", "ce qui", "par conséquent"];
const OBJECTIF_PHRASES = CONFIG.objectifPhrases || 3;
// comme normaliser(), mais sans retirer l'article du début (pour une phrase entière)
function normPhrase(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[’'`]/g, " ").replace(/-/g, " ").replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ").trim().split(" ").filter(Boolean)
    .map(m => (m.length > 3 && /[sx]$/.test(m)) ? m.slice(0, -1) : m);
}
const jetonProche = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && (a.slice(0, 6) === b.slice(0, 6) || levenshtein(a, b) <= 1));
function phraseContientMot(phraseTokens, m) {
  // le mot de la carte, sa forme de référence et ses variantes (« Blum » / « Léon Blum »)
  const cles = new Set([m.cle, m.ref].filter(Boolean));
  if (m.pole >= 0) {
    const p = poles[m.pole];
    [...p.entrees, ...p.sous.flatMap(st => st.entrees)].forEach(e => { if (e.cle === m.ref) e.groupe.cles.forEach(k => cles.add(k)); });
  }
  for (const k of cles) {
    const kt = k.split(" ").filter(t => !VIDES.includes(t));
    if (!kt.length) continue;
    const pt = phraseTokens.filter(t => !VIDES.includes(t));
    for (let i = 0; i + kt.length <= pt.length; i++)
      if (kt.every((t, n) => jetonProche(pt[i + n], t))) return true;
  }
  return false;
}
function aConnecteur(tokens) {
  const ph = " " + tokens.join(" ") + " ";
  return CONNECTEURS.some(c => ph.includes(" " + normPhrase(c).join(" ") + " "));
}
let phrases = [];   // { a: {texte, cle, pole}, b: {...}, texte }
const modalRelier = $("modalRelier"), selA = $("motA"), selB = $("motB"), zonePhrase = $("phrase");
function motsReliables() {
  const vus = new Set(), res = [];
  mots.forEach(m => { if (m.pole >= 0 && !vus.has(m.pole + "|" + m.cle)) { vus.add(m.pole + "|" + m.cle); res.push(m); } });
  return res;
}
function remplirSelect(sel, garder) {
  const liste = motsReliables();
  sel.innerHTML = '<option value="">— choisis un mot —</option>';
  poles.forEach((p, i) => {
    const ms = liste.filter(m => m.pole === i);
    if (!ms.length) return;
    const g = document.createElement("optgroup"); g.label = `${p.icone} ${p.nom}`;
    ms.forEach(m => { const o = document.createElement("option"); o.value = i + "|" + m.cle; o.textContent = m.texte; g.appendChild(o); });
    sel.appendChild(g);
  });
  if (garder) sel.value = garder;
}
function motChoisi(sel) {
  if (!sel.value) return null;
  const [pole, cle] = [Number(sel.value.split("|")[0]), sel.value.split("|").slice(1).join("|")];
  return mots.find(m => m.pole === pole && m.cle === cle) || null;
}
function verifierPhrase() {
  const A = motChoisi(selA), B = motChoisi(selB), txt = zonePhrase.value.trim();
  const tk = normPhrase(txt), nbMotsPhrase = txt.split(/\s+/).filter(w => /[A-Za-zÀ-ÿ0-9]/.test(w)).length;
  const v = [
    defiActif && A && B && defiOk(A, B)
      ? { ok: true, txt: "Les deux mots du défi", bloque: true }
      : { ok: !!A && !!B && A.pole !== B.pole, txt: A && B && A.pole === B.pole ? "Choisis deux mots de deux pôles DIFFÉRENTS" : "Deux mots de deux pôles différents", bloque: true },
    { ok: !!A && phraseContientMot(tk, A), txt: `La phrase contient « ${A ? A.texte : "mot 1"} »`, bloque: true },
    { ok: !!B && phraseContientMot(tk, B), txt: `La phrase contient « ${B ? B.texte : "mot 2"} »`, bloque: true },
    { ok: aConnecteur(tk), txt: "Un connecteur logique (car, donc, parce que…)", bloque: true },
    { ok: nbMotsPhrase >= 8, txt: `Au moins 8 mots (${nbMotsPhrase})`, bloque: true },
    { ok: /^[A-ZÀ-Ý«"]/.test(txt) && /[.!?]$/.test(txt), txt: "Majuscule au début, point à la fin (conseil)", bloque: false }
  ];
  $("verifs").innerHTML = v.map(x => `<li class="${x.ok ? "ok" : (x.bloque ? "ko" : "conseil")}">${x.ok ? "✅" : (x.bloque ? "⬜" : "💡")} ${x.txt.replace(/</g, "&lt;")}</li>`).join("");
  $("validerPhrase").disabled = !v.filter(x => x.bloque).every(x => x.ok);
  return { A, B, txt };
}
function rendrePhrases() {
  $("nbPhrases").textContent = phrases.length;
  $("phrasesZone").classList.toggle("visible", phrases.length > 0);
  const remplir = ol => {
    ol.innerHTML = "";
    phrases.forEach((ph, k) => {
      const li = document.createElement("li");
      const t = document.createElement("span"); t.textContent = ph.texte;
      const meta = document.createElement("small"); meta.textContent = ` (${ph.a.texte} ↔ ${ph.b.texte})`;
      const x = document.createElement("button"); x.className = "suppr-phrase"; x.textContent = "×"; x.title = "Supprimer cette phrase";
      x.onclick = e => { e.stopPropagation(); phrases.splice(k, 1); rendre(); rendrePhrases(); };
      li.append(t, meta, x); ol.appendChild(li);
    });
  };
  remplir($("phrasesListe")); remplir($("phrasesModal"));
}
function ouvrirRelier() {
  fermerMenu(); fermerChoix();
  const liste = motsReliables();
  if (new Set(liste.map(m => m.pole)).size < 2) {
    afficherMessage("🔗 Pour relier, il te faut des mots dans au moins deux pôles différents. Continue à remplir ta carte !", "info");
    return;
  }
  remplirSelect(selA, selA.value); remplirSelect(selB, selB.value);
  const ex = CONFIG.exemplePhrase ? "Ex. : " + CONFIG.exemplePhrase : "Ex. : « mot 1 » … car … « mot 2 ».";
  zonePhrase.placeholder = ex;
  $("connecteurs").innerHTML = "";
  CONNECTEURS_PROPOSES.forEach(c => {
    const b = document.createElement("button"); b.className = "puce-connecteur"; b.textContent = c; b.type = "button";
    b.onclick = e => {
      e.stopPropagation();
      const d = zonePhrase.selectionStart ?? zonePhrase.value.length, f = zonePhrase.selectionEnd ?? d, v = zonePhrase.value;
      const ins = (d > 0 && !/\s$/.test(v.slice(0, d)) ? " " : "") + c + " ";
      zonePhrase.value = v.slice(0, d) + ins + v.slice(f);
      zonePhrase.focus(); zonePhrase.selectionStart = zonePhrase.selectionEnd = d + ins.length;
      verifierPhrase();
    };
    $("connecteurs").appendChild(b);
  });
  verifierPhrase(); rendrePhrases();
  modalRelier.classList.add("visible");
}
$("relier").onclick = e => { e.stopPropagation(); ouvrirRelier(); };
/* Défis brevet : deux idées imposées et une question, prévues dans le fichier du chapitre (CONFIG.defis) */
const DEFIS = CONFIG.defis || [];
let defiActif = null, defisFaits = new Set(), rangDefi = 0;
function motPour(nom) {
  const n = normaliser(nom);
  return mots.find(m => m.pole >= 0 && (m.ref === n || m.cle === n || contient(m.cle, n))) || null;
}
const defiOk = (A, B) => {
  if (!defiActif) return false;
  const a = motPour(defiActif.a), b = motPour(defiActif.b);
  return !!a && !!b && ((A.cle === a.cle && B.cle === b.cle) || (A.cle === b.cle && B.cle === a.cle));
};
if (!DEFIS.length) $("defi").hidden = true;
$("defi").onclick = e => {
  e.stopPropagation();
  // on propose d'abord les défis pas encore réussis dont les deux mots sont déjà sur la carte
  const ordre = DEFIS.map((d, k) => DEFIS[(rangDefi + k) % DEFIS.length]);
  const prets = ordre.filter(d => !defisFaits.has(d.question) && motPour(d.a) && motPour(d.b));
  const d = prets[0] || ordre.find(d => !defisFaits.has(d.question)) || ordre[0];
  rangDefi = (DEFIS.indexOf(d) + 1) % DEFIS.length;
  defiActif = d;
  const A = motPour(d.a), B = motPour(d.b), z = $("question");
  z.innerHTML = "";
  const t = document.createElement("div"); t.innerHTML = "🎯 <b>Défi :</b> "; t.append(d.question);
  const u = document.createElement("div"); u.append("Utilise « " + maj1(d.a) + " » et « " + maj1(d.b) + " ».");
  z.append(t, u);
  const manquent = [[d.a, A], [d.b, B]].filter(x => !x[1]).map(x => "« " + maj1(x[0]) + " »");
  if (manquent.length) {
    const w = document.createElement("span"); w.className = "manque";
    w.textContent = `⚠️ Ajoute d'abord ${manquent.join(" et ")} à ta carte (ferme cette fenêtre et écris-le), puis reviens relever le défi.`;
    z.appendChild(w);
  }
  z.classList.add("visible");
  remplirSelect(selA, A ? A.pole + "|" + A.cle : ""); remplirSelect(selB, B ? B.pole + "|" + B.cle : "");
  verifierPhrase(); zonePhrase.focus();
};
$("hasard").onclick = e => {
  e.stopPropagation(); defiActif = null; $("question").classList.remove("visible");
  const liste = motsReliables();
  const prefere = liste.filter(estEssentiel).length >= 2 ? liste.filter(estEssentiel) : liste;
  for (let essai = 0; essai < 50; essai++) {
    const A = auHasard(prefere), B = auHasard(prefere);
    if (A.pole !== B.pole) { selA.value = A.pole + "|" + A.cle; selB.value = B.pole + "|" + B.cle; break; }
  }
  verifierPhrase();
};
[selA, selB].forEach(sl => sl.addEventListener("change", verifierPhrase));
zonePhrase.addEventListener("input", verifierPhrase);
$("validerPhrase").onclick = e => {
  e.stopPropagation();
  const { A, B, txt } = verifierPhrase();
  if ($("validerPhrase").disabled) return;
  const q = defiActif && defiOk(A, B) ? defiActif.question : null;
  phrases.push({ a: { texte: A.texte, cle: A.cle, pole: A.pole }, b: { texte: B.texte, cle: B.cle, pole: B.pole }, texte: txt, question: q });
  if (q) defisFaits.add(q);
  zonePhrase.value = ""; selA.value = ""; selB.value = ""; defiActif = null; $("question").classList.remove("visible");
  verifierPhrase(); rendre(); rendrePhrases();
  afficherMessage(phrases.length === OBJECTIF_PHRASES
    ? `🏅 Bravo, ${OBJECTIF_PHRASES} phrases ! Tu t'entraînes vraiment au développement construit. Tu peux continuer.`
    : `🔗 Phrase ${phrases.length} enregistrée ! Le lien apparaît sur ta carte.`, "ok");
};
$("fermerRelier").onclick = () => modalRelier.classList.remove("visible");
modalRelier.addEventListener("click", e => { if (e.target === modalRelier) modalRelier.classList.remove("visible"); });
// position (sur la carte en étoile) d'un mot relié
function posMot(ref) {
  const m = mots.find(x => x.pole === ref.pole && x.cle === ref.cle) || mots.find(x => x.cle === ref.cle && x.pole >= 0);
  if (!m || !m.el || m.el.style.display === "none" || !m.el.style.left) return null;
  return { x: parseFloat(m.el.style.left), y: parseFloat(m.el.style.top) };
}
function svgLiensPhrases() {
  let h = "";
  phrases.forEach((ph, k) => {
    const A = posMot(ph.a), B = posMot(ph.b);
    if (!A || !B) return;
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1;
    const cx = mx - dy / L * Math.min(60, L * .2), cy = my + dx / L * Math.min(60, L * .2);
    h += `<path d="M${A.x} ${A.y} Q${cx} ${cy} ${B.x} ${B.y}" fill="none" stroke="#6a1b9a" stroke-width="2.5" stroke-dasharray="3 6" stroke-linecap="round" opacity=".85"/>`;
    const bx = (A.x + 2 * cx + B.x) / 4, by = (A.y + 2 * cy + B.y) / 4;
    h += `<circle cx="${bx}" cy="${by}" r="11" fill="#6a1b9a"/><text x="${bx}" y="${by + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="system-ui,sans-serif">${k + 1}</text>`;
  });
  return h;
}

/* ---------- Menu : déplacer / retirer un mot ---------- */
let menu = null;
function fermerMenu() { if (menu) { menu.remove(); menu = null; } }
function ouvrirMenu(m, ancre) {
  fermerMenu();
  menu = document.createElement("div");
  menu.className = "menu";
  menu.addEventListener("click", e => e.stopPropagation());
  const titre = document.createElement("p");
  titre.style.fontWeight = "700"; titre.textContent = `« ${m.texte} »`;
  menu.appendChild(titre);
  const deplacer = (i, j, lib) => {
    m.pole = i; m.sous = j; m.place = false; fermerMenu(); rendre({ pole: i, sous: j });
    afficherMessage(`↪ « ${m.texte} » rangé dans ${lib}`, "ok");
  };
  const trouves = poles.map((p, i) => ({ p, i })).filter(o => o.p.trouve);
  const info = document.createElement("p");
  info.textContent = trouves.length ? "Ranger dans :" : "Découvre d'abord un pôle pour y ranger ce mot.";
  menu.appendChild(info);
  trouves.forEach(({ p, i }) => {
    if (!(m.pole === i && m.sous === -1)) {
      const b = document.createElement("button");
      b.textContent = `${p.icone} ${p.nom}`; b.style.background = p.couleur;
      b.onclick = () => deplacer(i, -1, p.nom);
      menu.appendChild(b);
    }
    p.sous.forEach((st, j) => {
      if (!st.revele || (m.pole === i && m.sous === j)) return;
      const b = document.createElement("button");
      b.className = "st"; b.textContent = `↳ ${st.nom}`;
      b.style.color = p.couleur; b.style.borderColor = p.couleur;
      b.onclick = () => deplacer(i, j, st.nom);
      menu.appendChild(b);
    });
  });
  const s = document.createElement("button");
  s.className = "suppr"; s.textContent = "🗑 Retirer ce mot";
  s.onclick = () => { mots = mots.filter(x => x !== m); m.el.remove(); fermerMenu(); rendre(); };
  menu.appendChild(s);
  document.body.appendChild(menu);
  const r = ancre.getBoundingClientRect();
  let x = r.left, y = r.bottom + 6;
  if (y + menu.offsetHeight > window.innerHeight - 6) y = r.top - menu.offsetHeight - 6;
  x = Math.max(6, Math.min(window.innerWidth - menu.offsetWidth - 6, x));
  y = Math.max(6, y);
  menu.style.left = x + "px"; menu.style.top = y + "px";
}
document.addEventListener("click", fermerMenu);

/* ---------- Indice ----------
   Niveau 1 : le pôle, le type de mot (personne, date…) et une petite définition
   Niveau 2 : + la première lettre et le nombre de mots
   Niveau 3 : la réponse */
const QUOI = { personne: "une personne", lieu: "un lieu", pays: "un pays", date: "une date",
               evenement: "un événement", mot: "une notion ou un mot" };
const auHasard = t => t[Math.floor(Math.random() * t.length)];
const DEFS = new Map(Object.entries(CONFIG.definitions || {}).map(([k, v]) => [normaliser(k), v]));
const NOTES = new Map(Object.entries(CONFIG.notes || {}).map(([k, v]) => [normaliser(k), v]));
const definitionDe = (nom, variantes) => DEFS.get(normaliser(nom)) || (variantes || []).map(v => DEFS.get(normaliser(v))).find(Boolean) || "";
function noteDe(m) { return NOTES.get(m.ref) || NOTES.get(m.cle) || ""; }
let indiceEnCours = null;
function debut(s) {
  const n = s.trim().split(/\s+/).length;
  return `Ça commence par « ${s.trim().charAt(0).toUpperCase()} » (${n} mot${n > 1 ? "s" : ""}, ${s.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").length} lettres et chiffres).`;
}
function indiceResolu(c) {
  if (!c) return true;
  if (c.type === "bulle") return poles[c.i].sous[c.j].revele;
  return groupeTrouve(c.groupe, c.i);
}
function choisirCible() {
  // 1) une bulle « ? » déjà visible à nommer
  const bulles = [];
  poles.forEach((p, i) => p.sous.forEach((st, j) => { if (!st.revele && motsDe(i, j).length) bulles.push({ i, j }); }));
  if (bulles.length) { const b = auHasard(bulles); return { type: "bulle", i: b.i, j: b.j }; }
  // 2) une idée d'un pôle qui n'a pas encore ★★★ (pôles non découverts d'abord, puis les moins avancés)
  const candidats = poles.map((p, i) => ({ p, i })).filter(o => etoiles(o.i) < 3);
  let pool;
  if (candidats.length) {
    const nonTrouves = candidats.filter(o => !o.p.trouve);
    const min = Math.min(...candidats.map(o => etoiles(o.i)));
    pool = nonTrouves.length ? nonTrouves : candidats.filter(o => etoiles(o.i) === min);
  } else {
    pool = poles.map((p, i) => ({ p, i })).filter(o => o.p.sous.some(st => !st.revele));
    if (!pool.length) return null;
  }
  const { p, i } = auHasard(pool);
  // une bulle 🔑 pas encore trouvée du pôle
  const bullesEssPole = p.sous.map((st, j) => ({ st, j })).filter(o => o.st.essentiel && !o.st.revele);
  if (bullesEssPole.length && Math.random() < 0.35) { const o = auHasard(bullesEssPole); return { type: "bulleCachee", i, j: o.j }; }
  const libres = [];
  p.entrees.forEach(x => libres.push({ ...x, st: null }));
  p.sous.forEach(st => st.entrees.forEach(x => libres.push({ ...x, st })));
  const nonTrouve = x => x.texte === x.groupe.nom && !x.groupe.pepite && !groupeTrouve(x.groupe, i) && !/mans/.test(x.texte);
  let choix = libres.filter(nonTrouve);
  if (!choix.length) return bullesEssPole.length ? { type: "bulleCachee", i, j: bullesEssPole[0].j } : null;
  // priorité : idées 🔑 avec une définition, puis idées 🔑, puis mots précis (personnes, dates…)
  const essDef = choix.filter(x => x.groupe.essentiel && definitionDe(x.texte, x.groupe.textes));
  const ess = choix.filter(x => x.groupe.essentiel);
  if (essDef.length) choix = essDef; else if (ess.length) choix = ess;
  else { const precis = choix.filter(x => x.type !== "mot"); if (precis.length) choix = precis; }
  const x = auHasard(choix);
  return { type: "mot", i, groupe: x.groupe, texte: x.texte, quoi: x.type, st: x.st };
}
$("indice").onclick = e => {
  e.stopPropagation();
  if (indiceEnCours && !indiceResolu(indiceEnCours) && indiceEnCours.niveau < 3) indiceEnCours.niveau++;
  else {
    const c = choisirCible();
    if (!c) { afficherMessage("Tout est trouvé, plus besoin d'indice 😉", "info"); indiceEnCours = null; return; }
    c.niveau = 1; indiceEnCours = c;
  }
  const c = indiceEnCours, p = poles[c.i], n = c.niveau;
  suivi.indices++; if (n === 3) suivi.reponses++;
  const suite = n === 1 ? "  (Bloqué ? Reclique sur 💡 pour un indice plus facile.)" : n === 2 ? "  (Reclique pour avoir la réponse.)" : "";
  if (c.type === "bulle" || c.type === "bulleCachee") {
    const st = p.sous[c.j];
    const ex = motsDe(c.i, c.j).slice(0, 3).map(m => m.texte).join(", ");
    const def = definitionDe(st.nom);
    const q = c.type === "bulle"
      ? `💡 Dans « ${p.nom} », comment s'appelle le groupe qui réunit : ${ex} ?`
      : `💡 Dans « ${p.nom} », il manque un grand thème 🔑.`;
    afficherMessage(n === 3
      ? `💡 Réponse : « ${st.nom} ». Écris-le pour l'ajouter à ta carte !`
      : `${q}${def ? " Indice : " + def : ""}${n === 2 ? " " + debut(st.nom) : ""}${suite}`, "info");
    rendre();
  } else {
    p.indice = true;
    let ou = `${p.icone} ${p.nom}`;
    if (c.st) ou += c.st.revele ? ` › ${c.st.nom}` : "";
    const def = definitionDe(c.texte, c.groupe.textes);
    // pas de définition : on donne les mots déjà trouvés du même groupe
    const voisins = c.st ? motsDe(c.i, p.sous.indexOf(c.st)).slice(0, 3).map(m => m.texte) : [];
    const aide = def ? ` Indice : ${def}` : (voisins.length ? ` Ça va avec : ${voisins.join(", ")}.` : "");
    afficherMessage(n === 3
      ? `💡 Réponse : « ${c.texte} » (${ou}). Écris-la pour l'ajouter à ta carte !`
      : `💡 ${ou} : trouve ${c.groupe.essentiel ? "🔑 " : ""}${QUOI[c.quoi]}.${aide}${n === 2 ? " " + debut(c.texte) : ""}${suite}`, "info");
    rendre();
  }
};

/* ---------- Recommencer ---------- */
const btnReset = $("reset");
let resetArme = false;
btnReset.onclick = e => {
  e.stopPropagation();
  if (!resetArme) {
    resetArme = true; etiquette(btnReset, "↺", "Sûr ? Touche encore", "Sûr ?");
    setTimeout(() => { resetArme = false; etiquette(btnReset, "↺", "Recommencer", ""); }, 3000);
    return;
  }
  resetArme = false; etiquette(btnReset, "↺", "Recommencer", "");
  mots.forEach(m => m.el.remove()); mots = []; fautes = []; indiceEnCours = null; phrases = []; aRanger = [];
  // on garde l'historique : score avant correction, indices utilisés, nombre d'essais
  suivi.essais++;
  correction = false; etiquette($("corriger"), "✅", "Correction", "Corriger");
  poles.forEach(p => {
    p.trouve = false; p.indice = false; p.el.classList.remove("anim");
    p.sous.forEach(st => { st.revele = false; st.place = false; st.el.classList.remove("anim"); });
  });
  if (modeRanger) poles.forEach(p => p.trouve = true);
  afficherMessage(scoreAvant ? "Nouvelle carte ! Ton score avant correction et tes indices restent notés sur l'image." : "", "info");
  rendre(); champ.focus();
};

/* ---------- Correction ---------- */
const btnCorr = $("corriger"), modalCorr = $("modalCorr");
let corrArme = false;
function photoScore() {
  return { etoiles: totalEtoiles(), ess: essTrouves(), bulles: nbBulles(), mots: nbMots(),
           manquants: [...bullesEss().filter(st => !st.revele).map(st => st.nom), ...calculerManquants().map(f => f.texte)],
           bullesManquantes: poles.flatMap(p => p.sous.filter(s => !s.revele).map(s => s.nom)) };
}
btnCorr.onclick = e => {
  e.stopPropagation(); fermerMenu();
  if (correction) {
    correction = false; etiquette(btnCorr, "✅", "Correction", "Corriger"); rendre();
    afficherMessage("Correction masquée. Tu peux continuer à compléter ta carte.", "info"); return;
  }
  if (!scoreAvant && !corrArme) {
    corrArme = true; etiquette(btnCorr, "✅", "Sûr ? Essaie d'abord !", "Sûr ?");
    setTimeout(() => { corrArme = false; if (!correction) etiquette(btnCorr, "✅", "Correction", "Corriger"); }, 3000);
    return;
  }
  corrArme = false;
  if (!scoreAvant) scoreAvant = photoScore();
  correction = true; etiquette(btnCorr, "🙈", "Masquer la correction", "Masquer");
  rendre(); afficherCorrection();
};
function afficherCorrection() {
  const a = scoreAvant, z = $("corrContenu");
  let h = `<p class="corr-score"><b>Ton score avant la correction :</b> ★ ${a.etoiles}/${poles.length * 3} · ` +
    `🔑 ${a.ess}/${totalEss()} idées essentielles · ${a.bulles}/${totBulles()} bulles · ${a.mots} mots</p>` +
    `<p style="font-size:13.5px;margin:0 0 6px">Voici les <b>idées essentielles 🔑</b> et les <b>noms de bulles</b> qui manquent encore. ` +
    `Elles apparaissent sur ta carte en <i>gris pointillé</i>. Recopie-les pour compléter ta carte !</p>`;
  const manq = calculerManquants();
  poles.forEach((p, i) => {
    const lignes = [];
    const racine = manq.filter(f => f.pole === i && f.sous === -1).map(f => f.texte);
    if (racine.length) lignes.push(`<p>🔑 ${racine.join(", ")}</p>`);
    p.sous.forEach((st, j) => {
      const l = manq.filter(f => f.pole === i && f.sous === j).map(f => f.texte);
      if (!st.revele || l.length)
        lignes.push(`<p>↳ <b>${st.essentiel ? "🔑 " : ""}${st.nom}</b>${st.revele ? "" : " <i>(nom de bulle à trouver)</i>"}${l.length ? " : 🔑 " + l.join(", ") : ""}</p>`);
    });
    h += `<div class="corr-pole" style="--c:${p.couleur}"><h4>${p.icone} ${p.nom}${p.trouve ? "" : " <i>(pôle non découvert)</i>"}</h4>` +
      (lignes.length ? lignes.join("") : `<p class="corr-ok">✔ Rien d'essentiel ne manque, bravo !</p>`) + `</div>`;
  });
  z.innerHTML = h;
  modalCorr.classList.add("visible");
}
$("voirCarte").onclick = () => modalCorr.classList.remove("visible");
modalCorr.addEventListener("click", e => { if (e.target === modalCorr) modalCorr.classList.remove("visible"); });

/* ---------- Image téléchargeable ---------- */
function rr(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function genererImage() {
  const W = 2100, HT = 156;
  let HM = 1400;   // agrandie si la carte est très remplie (calcul plus bas)
  const aTrier = mots.filter(m => m.pole < 0);
  const POL = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  // lignes de bas de page (mots à trier + orthographe), découpées à la largeur
  const mesure = document.createElement("canvas").getContext("2d");
  mesure.font = `500 22px ${POL}`;
  const couper = (texte) => {
    const res = []; let ligne = "";
    texte.split(" ").forEach(w => {
      const essai = ligne ? ligne + " " + w : w;
      if (mesure.measureText(essai).width > W - 72 && ligne) { res.push(ligne); ligne = w; } else ligne = essai;
    });
    if (ligne) res.push(ligne);
    return res;
  };
  const piedTrier = aTrier.length ? couper("À trier : " + aTrier.map(m => m.texte).join(" · ")) : [];
  const piedEss = scoreAvant && scoreAvant.manquants.length ? couper("🔑 Idées essentielles oubliées (avant correction) : " +
    scoreAvant.manquants.join(" · ")) : [];
  const piedCouleurs = CONFIG.legende ? couper("Code couleur : " + CONFIG.legende.map(l => {
    const nomCoul = l.drapeau ? "bleu-blanc-rouge" : ({ "#c62828": "rouge", "#a0714f": "marron", "#37474f": "gris" }[l.couleur] || "");
    return `${l.label}${nomCoul ? " (" + nomCoul + ")" : ""}`; }).join(" · ")) : [];
  const piedLegende = couper("Légende : 🔑 idée essentielle · 💎 pépite (idée peu connue) · gris pointillé : idée essentielle oubliée" +
    " · 🔗 lien expliqué par une phrase · 📌 mot rangé par l'élève, à vérifier" +
    (scoreAvant ? " · fond bleuté : ajouté après la correction" : ""));
  const piedPhrases = phrases.length ? phrases.flatMap((ph, k) => couper(`🔗 ${k + 1}. ${ph.question ? "🎯 " + ph.question + " → " : ""}${ph.texte}   (${ph.a.texte} ↔ ${ph.b.texte})`)) : [];
  const piedRanger = rangement.erreurs.length ? couper("🧭 Rangements à revoir : " +
    rangement.erreurs.map(x => `${x.texte} (mis dans « ${x.choisi} » → « ${x.correct} »)`).join(" · ")) : [];
  const piedOrtho = fautes.length ? couper("✏️ Mots à bien orthographier : " +
    fautes.map(f => `${f.ecrit} → ${f.correct} (${f.type})`).join(" · ")) : [];
  const HB = 40 + (piedPhrases.length ? 14 : 0) +
    (piedPhrases.length + piedRanger.length + piedTrier.length + piedOrtho.length + piedEss.length + piedCouleurs.length + piedLegende.length) * 34;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = HT + HM + HB;
  const ctx = cv.getContext("2d");
  const F_MOT = `500 22px ${POL}`, F_ESS = `800 22px ${POL}`, F_FANT = `italic 500 22px ${POL}`, F_SOUS = `700 22px ${POL}`, F_POLE = `700 24px ${POL}`,
        F_C1 = `800 34px ${POL}`, F_C2 = `500 21px ${POL}`;
  const larg = (t, f) => { ctx.font = f; return ctx.measureText(t).width; };

  function dessinerEntete() {
  ctx.fillStyle = "#fbf9f4"; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "#1f2a44"; ctx.fillRect(0, 0, W, HT);
  ctx.fillStyle = "#fff"; ctx.font = `800 36px ${POL}`; ctx.textBaseline = "middle";
  ctx.fillText(`Carte mentale — ${CONFIG.titre}`, 36, 44);
  ctx.font = `500 22px ${POL}`;
  ctx.fillText(`${prenom ? prenom + " — " : ""}${new Date().toLocaleDateString("fr-FR")} — ${nbMots()} mots — ` +
    `${poles.filter(p => p.trouve).length}/${poles.length} pôles — ${nbBulles()}/${totBulles()} bulles — ` +
    `🔑 ${essTrouves()}/${totalEss()} idées essentielles — 💎 ${nbPepites()} pépites — ★ ${totalEtoiles()}/${poles.length * 3}`, 36, 88);
  // 3e ligne : historique (indices, essais, rangement, phrases, score avant correction)
  const nR = rangement.justes + rangement.faux, morceaux = [];
  morceaux.push(`💡 ${suivi.indices} indice${suivi.indices > 1 ? "s" : ""}` + (suivi.reponses ? ` (dont ${suivi.reponses} réponse${suivi.reponses > 1 ? "s" : ""} donnée${suivi.reponses > 1 ? "s" : ""})` : ""));
  if (suivi.essais > 1) morceaux.push(`${suivi.essais}e essai`);
  if (nR) morceaux.push(`🧭 rangé seul : ${rangement.justes}/${nR} justes`);
  morceaux.push(`🔗 ${phrases.length} phrase${phrases.length > 1 ? "s" : ""}`);
  if (scoreAvant) morceaux.push(`avant correction : 🔑 ${scoreAvant.ess}/${totalEss()} · ★ ${scoreAvant.etoiles}/${poles.length * 3} · ${scoreAvant.mots} mots`);
  ctx.fillStyle = "#ffd54a";
  ctx.fillText(morceaux.join(" — "), 36, 126, W - 72);
  }
  const libSous = st => (st.essentiel && (st.revele || correction) ? "🔑 " : "") + nomAffiche(st);
  const libMot = m => (!m.fantome && estEssentiel(m) ? "🔑 " : "") + (!m.fantome && estPepite(m) ? "💎 " : "") + (m.nonVerifie ? "📌 " : "") + m.texte;
  const posImg = new Map();   // position de chaque mot sur l'image (pour les liens 🔗)
  const F_MIN = `500 18px ${POL}`;
  const fontMot = m => m.fantome ? F_FANT : (estEssentiel(m) ? F_ESS : (estPepite(m) ? `700 22px ${POL}` : F_MIN));
  const hautMot = m => fontMot(m) === F_MIN ? 36 : 44;
  const dessinerMot = (q, m, p) => {
    posImg.set(m, q);
    if (m.fantome) return bulle(q, libMot(m), F_FANT, "#f4f4f2", "#aaa", "#888", "pill", true);
    if (estPepite(m)) {   // pépite : halo et contour dégradé violet-or
      const w = q.w - 6, h = q.h - 6, x0 = q.x - w / 2, y0 = q.y - h / 2;
      const g = ctx.createLinearGradient(x0, y0, x0 + w, y0 + h);
      g.addColorStop(0, "#7b1fa2"); g.addColorStop(.5, "#f9a825"); g.addColorStop(1, "#7b1fa2");
      ctx.save(); ctx.shadowColor = "rgba(123,31,162,.55)"; ctx.shadowBlur = 16;
      rr(ctx, x0, y0, w, h, h / 2); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore();
      rr(ctx, x0, y0, w, h, h / 2); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.stroke();
      ctx.fillStyle = "#4a148c"; ctx.font = `700 22px ${POL}`; ctx.fillText(libMot(m), q.x, q.y + 1);
      return;
    }
    const dr = drapeauDe(m);
    if (dr) {   // pays : drapeau à gauche du texte
      bulle(q, "", fontMot(m), m.apres ? "#eef3ff" : "#fff", p.couleur, "#222", "pill", !!m.nonVerifie, estEssentiel(m) ? 5 : 3);
      ctx.font = fontMot(m); const tw = ctx.measureText(libMot(m)).width, tot = 30 + 8 + tw, x0 = q.x - tot / 2;
      canvasDrapeau(ctx, dr, x0, q.y - 10, 30, 20);
      ctx.fillStyle = "#222"; ctx.textAlign = "left"; ctx.fillText(libMot(m), x0 + 38, q.y + 1); ctx.textAlign = "center";
      return;
    }
    bulle(q, libMot(m), fontMot(m), m.apres ? "#eef3ff" : "#fff", p.couleur, "#222", "pill", !!m.nonVerifie, estEssentiel(m) ? 5 : 3);
  };

  const libPole = (p, i) => p.trouve ? `${p.icone} ${p.nom}  ${texteEtoiles(i)}` : (p.indice || correction ? `? ${p.nom}` : "?");
  const arbres = poles.map((p, i) => elementsDuPole(i));
  const tailles = arbres.map(lst => lst.map(it => it.type === "sous"
    ? { w: larg(libSous(it.st), F_SOUS) + 34, h: 44, enfants: it.enfants.map(m => ({ w: larg(libMot(m), fontMot(m)) + 34 + (drapeauDe(m) ? 38 : 0), h: hautMot(m) })) }
    : { w: larg(libMot(it.m), fontMot(it.m)) + 34 + (drapeauDe(it.m) ? 38 : 0), h: hautMot(it.m) }));
  const tC = { w: Math.max(larg(CONFIG.titre, F_C1), larg(CONFIG.sousTitre || "", F_C2)) + 50, h: 96 };
  let aireI = tC.w * tC.h;
  tailles.forEach(l => l.forEach(t => { aireI += t.w * t.h; (t.enfants || []).forEach(e => aireI += e.w * e.h); }));
  HM = Math.max(HM, Math.round(aireI * 4.2 / W));
  cv.height = HT + HM + HB;   // (redimensionner efface le canevas : on dessine l'en-tête ensuite)
  dessinerEntete();
  const d = calculerDisposition(W, HM, tC, poles.map((p, i) => ({ w: larg(libPole(p, i), F_POLE) + 32, h: 48, angle: p.angle })), tailles);

  ctx.save(); ctx.translate(0, HT);
  const trait = (a, b, coul, ep, op, tirets) => {
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = coul; ctx.lineWidth = ep; ctx.globalAlpha = op; ctx.setLineDash(tirets ? [9, 9] : []);
    ctx.stroke(); ctx.globalAlpha = 1; ctx.setLineDash([]);
  };
  function bulle(b, texte, font, fond, bord, coulTexte, rayon, tirets, epaisseur) {
    const w = b.w - 6, h = b.h - 6;
    rr(ctx, b.x - w / 2, b.y - h / 2, w, h, rayon === "pill" ? h / 2 : rayon);
    ctx.fillStyle = fond; ctx.fill();
    if (bord) { ctx.strokeStyle = bord; ctx.lineWidth = epaisseur || 3; ctx.setLineDash(tirets ? [8, 6] : []); ctx.stroke(); ctx.setLineDash([]); }
    ctx.fillStyle = coulTexte; ctx.font = font; ctx.fillText(texte, b.x, b.y + 1);
  }
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  poles.forEach((p, i) => {
    const b = d.poles[i];
    if (p.trouve) trait(d.centre, b, p.couleur, 6, .75); else trait(d.centre, b, "#bbb", 3, 1, true);
    arbres[i].forEach((it, j) => {
      const q = d.items[i][j];
      if (it.type === "mot") { if (it.m.fantome) trait(b, q, "#aaa", 3, .9, true); else trait(b, q, p.couleur, 3, .5); }
      else {
        trait(b, q, p.couleur, 4, .7, !it.st.revele);
        q.enfants.forEach((e, k) => { if (it.enfants[k].fantome) trait(q, e, "#aaa", 3, .9, true); else trait(q, e, p.couleur, 3, .5); });
      }
    });
  });
  poles.forEach((p, i) => arbres[i].forEach((it, j) => {
    const q = d.items[i][j];
    if (it.type === "mot") dessinerMot(q, it.m, p);
    else {
      bulle(q, libSous(it.st), F_SOUS, it.st.revele ? "#fff" : "#fffdf6", p.couleur, p.couleur, 12, !it.st.revele, it.st.essentiel && (it.st.revele || correction) ? 6 : 3);
      it.enfants.forEach((m, k) => dessinerMot(q.enfants[k], m, p));
    }
  }));
  // liens 🔗 entre les mots reliés par une phrase
  phrases.forEach((ph, k) => {
    const trouverM = r => mots.find(x => x.pole === r.pole && x.cle === r.cle) || mots.find(x => x.cle === r.cle && x.pole >= 0);
    const A = posImg.get(trouverM(ph.a)), B = posImg.get(trouverM(ph.b));
    if (!A || !B) return;
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1;
    const cx = mx - dy / L * Math.min(90, L * .2), cy = my + dx / L * Math.min(90, L * .2);
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.quadraticCurveTo(cx, cy, B.x, B.y);
    ctx.strokeStyle = "#6a1b9a"; ctx.lineWidth = 4; ctx.setLineDash([4, 9]); ctx.lineCap = "round"; ctx.globalAlpha = .85;
    ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    const bx = (A.x + 2 * cx + B.x) / 4, by = (A.y + 2 * cy + B.y) / 4;
    ctx.beginPath(); ctx.arc(bx, by, 17, 0, Math.PI * 2); ctx.fillStyle = "#6a1b9a"; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = `800 20px ${POL}`; ctx.fillText(String(k + 1), bx, by + 1);
  });
  poles.forEach((p, i) => {
    const b = { ...d.poles[i], w: d.poles[i].w + 6, h: d.poles[i].h + 6 };
    if (p.trouve) {
      bulle(b, libPole(p, i), F_POLE, p.couleur, null, "#fff", 16);
      if (p.drapeau) {   // bande bleu-blanc-rouge en bas du pôle
        const w = b.w - 6, h = b.h - 6, x0 = b.x - w / 2, y0 = b.y - h / 2;
        ctx.save(); rr(ctx, x0, y0, w, h, 16); ctx.clip();
        [["#002395", 0], ["#ffffff", 1], ["#ed2939", 2]].forEach(([c, k]) => { ctx.fillStyle = c; ctx.fillRect(x0 + k * w / 3, y0 + h - 7, w / 3 + 1, 7); });
        ctx.restore();
      }
    }
    else bulle(b, libPole(p, i), F_POLE, "#fff", "#bbb", "#999", 16, true);
  });
  const c = d.centre;
  rr(ctx, c.x - c.w / 2, c.y - c.h / 2, c.w, c.h, 22);
  ctx.fillStyle = "#1f2a44"; ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = F_C1; ctx.fillText(CONFIG.titre, c.x, c.y - 15);
  ctx.font = F_C2; ctx.globalAlpha = .85; ctx.fillText(CONFIG.sousTitre || "", c.x, c.y + 24); ctx.globalAlpha = 1;
  ctx.restore();

  ctx.textAlign = "left"; ctx.font = `500 22px ${POL}`;
  let yPied = HT + HM + 30;
  if (piedPhrases.length) {
    ctx.fillStyle = "#4a148c"; ctx.font = `600 22px ${POL}`;
    piedPhrases.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
    yPied += 14; ctx.font = `500 22px ${POL}`;
  }
  ctx.fillStyle = "#b23b2a"; piedRanger.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  ctx.fillStyle = "#555"; piedTrier.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  ctx.fillStyle = "#8a5a00"; piedOrtho.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  ctx.fillStyle = "#6a3d8f"; piedEss.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  ctx.fillStyle = "#555"; piedCouleurs.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  ctx.fillStyle = "#888"; piedLegende.forEach(l => { ctx.fillText(l, 36, yPied); yPied += 34; });
  return cv.toDataURL("image/png");
}

const modal = $("modal"), champPrenom = $("prenom"), apercu = $("apercu");
function majApercu() { apercu.src = genererImage(); }
$("telecharger").onclick = e => {
  e.stopPropagation(); fermerMenu();
  champPrenom.value = prenom; majApercu();
  modal.classList.add("visible");
};
let minuterie;
champPrenom.addEventListener("input", () => {
  prenom = champPrenom.value.trim(); sauvegarder();
  clearTimeout(minuterie); minuterie = setTimeout(majApercu, 300);
});
$("dl").onclick = () => {
  majApercu();
  const a = document.createElement("a");
  a.href = apercu.src;
  const nom = (prenom || "eleve").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-");
  a.download = `carte-mentale-${CONFIG.fichier || "carte"}-${nom}.png`;
  document.body.appendChild(a); a.click(); a.remove();
};
$("fermer").onclick = () => modal.classList.remove("visible");
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("visible"); });

/* ---------- Code couleur ---------- */
const DRAPEAU = "linear-gradient(90deg,#002395 33.3%,#fff 33.3% 66.6%,#ed2939 66.6%)";
function fondPole(p) { return p.drapeau ? `${DRAPEAU} bottom / 100% 6px no-repeat, ${p.couleur}` : p.couleur; }
if (CONFIG.legende) {
  $("legende").innerHTML = CONFIG.legende.map(l =>
    `<span><i class="pastille" style="background:${l.drapeau ? DRAPEAU : l.couleur}"></i>${l.label}</span>`).join("");
}

/* ---------- Boutons : libellés longs (ordinateur) / courts (téléphone) ---------- */
function etiquette(btn, ico, long, court) {
  btn.innerHTML = ico + (long ? `<span class="long"> ${long}</span>` : "") + (court ? `<span class="court"> ${court}</span>` : "");
}
$("consigne").addEventListener("click", () => $("consigne").classList.toggle("ouverte"));
const btnPE = $("pleinEcran");
if (document.fullscreenEnabled) {
  btnPE.hidden = false;
  btnPE.onclick = e => {
    e.stopPropagation();
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => { btnPE.hidden = true; });
  };
  document.addEventListener("fullscreenchange", () => setTimeout(verifierMode, 100));
}

/* ---------- Ouvrir en grand (nouvel onglet, hors du cadre Google Sites) ---------- */
const btnGrand = $("grand");
if (window.__OUVERT_EN_GRAND) btnGrand.hidden = true;   // déjà en grand
btnGrand.onclick = e => {
  e.stopPropagation(); fermerMenu();
  const etat = JSON.stringify(etatCourant()).replace(/</g, "\\u003c");
  const injection = `<script>window.__ETAT_INITIAL = ${etat}; window.__OUVERT_EN_GRAND = true;<\/script>`;
  const html = SOURCE_PAGE.replace(/<head[^>]*>/i, m => m + injection);
  let ok = false;
  // 1er essai : une page « blob » (comme un fichier ouvert dans un onglet)
  try {
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    const w = window.open(url, "_blank");
    ok = !!w;
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {}
  // 2e essai : un onglet vide dans lequel on écrit la page
  if (!ok) {
    try {
      const w = window.open("", "_blank");
      if (w) { w.document.open(); w.document.write(html); w.document.close(); ok = true; }
    } catch (err) {}
  }
  if (ok) afficherMessage("↗️ L'exercice s'est ouvert dans un nouvel onglet. Continue là-bas !", "ok");
  else {
    afficherMessage("Ton navigateur ou le site bloque l'ouverture d'un nouvel onglet. Sur ordinateur, appuie sur F11 pour afficher la page en plein écran.", "ko");
    btnGrand.hidden = true;
  }
};

/* ---------- Démarrage ---------- */
$("ajouter").onclick = e => { e.stopPropagation(); ajouter(); };
// preventDefault : sinon la touche Entrée « clique » aussi sur le premier bouton du choix de pôle
champ.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); ajouter(); } });
restaurer();
document.body.classList.toggle("mobile", window.innerWidth < 700);
document.body.classList.toggle("compact", window.innerWidth >= 700 && (window.innerWidth < 1050 || window.innerHeight < 700));
$("ortho").open = window.innerWidth >= 700;
$("phrasesZone").open = window.innerWidth >= 700;
majModes();
rendre();
if (mots.length) afficherMessage("Ta carte a été retrouvée, tu peux continuer 🙂", "info");
// Redimensionnement : on ne redessine que si la taille de la fenêtre a vraiment changé,
// une fois par image (évite l'erreur « ResizeObserver loop »)
let tailleVue = window.innerWidth + "x" + window.innerHeight, attenteVue = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(attenteVue);
  attenteVue = requestAnimationFrame(() => {
    const t = window.innerWidth + "x" + window.innerHeight;
    if (t === tailleVue) return;
    tailleVue = t;
    verifierMode();
  });
});

})();
