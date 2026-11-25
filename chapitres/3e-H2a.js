/* =====================================================================
   CARTE MENTALE — 3e, Histoire, chapitre 2a : Les régimes totalitaires
   ---------------------------------------------------------------------
   Contenu du chapitre seulement ; le fonctionnement est dans moteur.js.
   Mode d'emploi complet : voir l'en-tête de chapitre-3e-H1.js.
     *mot = idée essentielle 🔑 (les étoiles ★ sont calculées dessus)
     +mot = pépite 💎      a|b = variantes d'une même idée
     essentiel: true dans un sous-thème = le nom de la bulle est une idée 🔑
   ===================================================================== */
const CONFIG = {
  id: "3e-H2a-regimes-totalitaires",
  exemplePhrase: "Staline fait régner la terreur grâce au NKVD, car il veut éliminer tous ses opposants.",
  objectifPhrases: 3,
  definitions: {
    "régime totalitaire": "Régime où un parti unique et son chef contrôlent toute la société et la vie des individus.",
    "suppression des libertés": "Les habitants n'ont plus le droit de s'exprimer, de voter librement ou de s'opposer.",
    "parti unique": "Un seul parti politique est autorisé : tous les autres sont interdits.",
    "culte de la personnalité": "Le chef est présenté comme un homme exceptionnel, admiré et adoré par tous.",
    "Staline": "Dirigeant de l'URSS après la mort de Lénine, de 1924 à 1953.",
    "PCUS": "Le parti communiste, seul parti autorisé en URSS.",
    "procès de Moscou": "Procès truqués où d'anciens dirigeants communistes sont condamnés à mort.",
    "OGPU puis NKVD": "La police politique de Staline, qui arrête et fait disparaître les opposants.",
    "Petit père des peuples": "Surnom donné à Staline par la propagande.",
    "communisme": "Idéologie qui veut une société sans classes sociales et sans propriété privée.",
    "suppression des classes sociales": "Le but du communisme : plus de riches ni de pauvres, plus de patrons ni d'ouvriers.",
    "Hitler": "Chef du parti nazi, il devient chancelier en 1933 puis Führer.",
    "30 janvier 1933": "Date où Hitler est nommé chancelier de l'Allemagne.",
    "pleins pouvoirs": "Droit de gouverner seul, sans le Parlement : Hitler l'obtient en mars 1933.",
    "NSDAP": "Le parti nazi, seul parti autorisé en Allemagne à partir de 1933.",
    "Gestapo": "La police politique secrète des nazis.",
    "SA et SS": "Milices du parti nazi qui font régner la violence et la terreur.",
    "Jeunesses hitlériennes": "Organisation qui embrigade les jeunes Allemands dans l'idéologie nazie.",
    "Goebbels": "Ministre de la Propagande d'Hitler.",
    "antisémitisme": "Haine et rejet des Juifs.",
    "supériorité de la race aryenne": "Idée raciste des nazis selon laquelle les Allemands seraient une « race » supérieure.",
    "réarmement": "L'Allemagne reconstruit son armée, malgré le traité de Versailles.",
    "Anschluss": "Annexion de l'Autriche par l'Allemagne nazie en 1938.",
    "Guernica": "Ville espagnole bombardée en 1937 par l'aviation allemande.",
    "Grande Terreur": "Vague d'arrestations et d'exécutions en URSS en 1937-1938.",
    "Goulag": "Système des camps de travail forcé en URSS.",
    "Collectivisation des terres": "Les terres des paysans sont regroupées de force dans des fermes d'État.",
    "Plans quinquennaux": "Programmes de 5 ans fixés par l'État pour développer l'industrie.",
    "Lois de Nuremberg": "Lois de 1935 qui retirent aux Juifs leurs droits de citoyens allemands.",
    "Nuit de Cristal": "Pogrom de novembre 1938 : synagogues et magasins juifs détruits dans toute l'Allemagne.",
    "Espace vital": "Territoires qu'Hitler veut conquérir à l'est pour agrandir l'Allemagne.",
    "Guerre d'Espagne": "Guerre civile de 1936-1939 où Hitler et Mussolini aident Franco."
  },
  defis: [
    { a: "Staline", b: "Grande Terreur", question: "Montre que Staline fait régner la terreur en URSS." },
    { a: "Goulag", b: "NKVD", question: "Explique ce que deviennent les opposants en URSS." },
    { a: "Hitler", b: "pleins pouvoirs", question: "Explique comment Hitler installe sa dictature en 1933." },
    { a: "Gestapo", b: "SA et SS", question: "Montre que les nazis éliminent leurs opposants par la violence." },
    { a: "Jeunesses hitlériennes", b: "Goebbels", question: "Montre que les nazis embrigadent la population." },
    { a: "antisémitisme", b: "Lois de Nuremberg", question: "Montre que les Juifs sont persécutés en Allemagne." },
    { a: "collectivisation", b: "communisme", question: "Explique comment Staline veut imposer le communisme." },
    { a: "parti unique", b: "culte de la personnalité", question: "Montre que l'URSS et l'Allemagne nazie sont des régimes totalitaires." },
    { a: "réarmement", b: "Anschluss", question: "Montre qu'Hitler prépare la guerre." }
  ],
  titre: "Les expériences totalitaires",
  sousTitre: "L'URSS de Staline et l'Allemagne d'Hitler",
  fichier: "H2a-totalitarismes",
  exemple: "Ex. : Staline, Gestapo, propagande…",
  consigne: "Écris un mot ou une expression qui te fait penser aux régimes totalitaires de Staline et d'Hitler, puis valide. Découvre les 8 pôles, gagne jusqu'à ★★★ dans chacun et trouve le nom des bulles « ? ». Les idées 🔑 sont essentielles, les 💎 sont des pépites !",
  // Code couleur affiché sous les boutons et sur l'image téléchargée
  legende: [
    { label: "URSS de Staline", couleur: "#c62828" },
    { label: "Allemagne d'Hitler", couleur: "#a0714f" },
    { label: "Points communs", couleur: "#37474f" }
  ],
  afficherPolesCaches: true,
  centreY: 0.5,   // position verticale du centre (0.5 = milieu ; plus petit = plus de place en bas de la carte)
  // angle : position du pôle sur la carte (en degrés : -90 = en haut, 0 = à droite, 90 = en bas, 180 = à gauche)
  poles: [
    /* ======================= POINTS COMMUNS ======================= */
    { nom: "Les régimes totalitaires", icone: "⚙️", couleur: "#37474f", angle: -90, paliers: [4, 7, 10],
      mots: [ "*régime totalitaire|régimes totalitaires", "*suppression des libertés|suppression des libertés individuelles|libertés supprimées|fin des libertés|aucune liberté|privation de liberté",
        "liberté d'expression supprimée|plus de liberté d'expression", "liberté de la presse supprimée|plus de liberté de la presse", "totalitarisme", "totalitaire", "dictature", "dictateur",
        "*parti unique|un seul parti", "un seul chef|chef unique", "élimination des oppositions|opposants",
        "soumission et obéissance de la société|soumission|obéissance", "terreur", "surveillance", "propagande",
        "médias contrôlés", "censure", "*culte de la personnalité|culte du chef", "embrigadement", "endoctrinement",
        "idéologie", "camps", "police politique|police secrète", "contrôle de la société", "entre-deux-guerres" ] },

    /* ======================= URSS (rouge) ======================= */
    { nom: "Staline au pouvoir", icone: "☭", couleur: "#c62828", angle: -145, paliers: [4, 7, 10],
      mots: [ "URSS|Union soviétique|Union des républiques socialistes soviétiques|Russie soviétique",
        "faucille et marteau|faucille|marteau", "drapeau rouge", "étoile rouge",
        "*PCUS|parti communiste|parti communiste d'Union soviétique|Parti communiste de l'Union soviétique",
        "dictature de Staline|dictature stalinienne", "+NEP|nouvelle politique économique", "+testament de Lénine" ],
      personnes: [ "*Staline|Joseph Staline", "Trotski|Trotsky|Léon Trotski", "Lénine", "+Kirov" ],
      dates: [ "1924|mort de Lénine|1924 mort de Lénine", "1922", "1917", "1936-1938|1936 - 1938" ],
      evenements: [ "*procès de Moscou|procès", "exil de Trotski|Trotski exilé", "+assassinat de Kirov" ] },

    { nom: "Terreur et propagande en URSS", icone: "👁️", couleur: "#a8201a", angle: 175, paliers: [4, 7, 10],
      mots: [ "*OGPU puis NKVD|OGPU|NKVD|Guépéou|GPU", "Pionniers et Komsomol|Pionniers|Komsomol|Jeunesses communistes",
        "Petit père des peuples", "portraits de Staline|statues de Staline", "affiches soviétiques", "+Pravda", "+Iejov" ],
      sousThemes: [
        { nom: "Grande Terreur", essentiel: true, reveler: ["1937-1938", "1937 - 1938", "grandes purges"],
          mots: [ "purges", "arrestations", "exécutions", "dénonciation", "peur", "+680 000 exécutions" ] },
        { nom: "Goulag", essentiel: true, reveler: ["goulags", "camps du Goulag", "camps de travail", "camp de travail"],
          lieux: [ "Sibérie", "+Kolyma" ],
          mots: [ "travaux forcés", "déportés", "déportation", "prisonniers politiques", "+Soljenitsyne" ] }
      ] },

    { nom: "Imposer le communisme", icone: "🚜", couleur: "#d84315", angle: 125, paliers: [4, 7, 10],
      mots: [ "*communisme|idéologie communiste", "communiste", "*suppression des classes sociales|classes sociales|société sans classes",
        "abolition de la propriété privée|propriété privée", "marxisme", "socialisme|société socialiste", "Karl Marx|Marx", "dictature du prolétariat",
        "ouvriers", "paysans", "étatisation de l'économie|économie étatisée|économie planifiée" ],
      sousThemes: [
        { nom: "Collectivisation des terres", essentiel: true, reveler: ["collectivisation", "collectivisation de l'agriculture"],
          dates: [ "1929" ],
          mots: [ "kolkhoze", "sovkhoze", "koulak", "dékoulakisation", "famine", "famine en Ukraine", "paysans déportés", "+Holodomor" ] },
        { nom: "Plans quinquennaux", essentiel: true, reveler: ["plan quinquennal", "planification", "plans de 5 ans", "Gosplan"],
          dates: [ "1928" ],
          mots: [ "industrie lourde|priorité à l'industrie lourde", "sidérurgie", "mines", "acier", "charbon", "barrages",
            "industrialisation", "usines", "+Stakhanov|stakhanovisme", "+Magnitogorsk" ] }
      ] },

    /* ======================= ALLEMAGNE (marron clair) ======================= */
    { nom: "Hitler au pouvoir", icone: "👤", couleur: "#a0714f", angle: -35, paliers: [5, 9, 13],
      mots: [ "Allemagne nazie|Allemagne|IIIe Reich|Troisième Reich|Reich|régime nazi", "croix gammée|svastika",
        "*NSDAP|parti nazi|parti national-socialiste", "chancelier|nommé chancelier", "*pleins pouvoirs", "Führer",
        "Mein Kampf", "dictature nazie|dictature d'Hitler", "+Weimar|République de Weimar" ],
      personnes: [ "*Hitler|Adolf Hitler", "Hindenburg|président Hindenburg", "+Ernst Röhm|Röhm" ],
      dates: [ "*30 janvier 1933|30/01/1933|nommé chancelier le 30 janvier 1933", "1933", "27-28 février 1933|février 1933",
        "mars 1933", "1934", "août 1934" ],
      evenements: [ "incendie du Reichstag|incendie du Parlement", "Nuit des longs couteaux",
        "Hitler devient Führer|Hitler devient le Führer", "+putsch de Munich|putsch de la Brasserie" ] },

    { nom: "Terreur et propagande nazies", icone: "📣", couleur: "#8f6646", angle: 5, paliers: [4, 7, 10],
      mots: [ "*Gestapo", "*SA et SS|SA|SS|sections d'assaut", "chemises brunes", "+Himmler|Heinrich Himmler",
        "camps de concentration|camp de concentration", "*Jeunesses hitlériennes|Hitlerjugend|Jeunesse hitlérienne",
        "+Ligue des jeunes filles allemandes|BDM", "*Goebbels|Joseph Goebbels", "ministre de la Propagande",
        "autodafés|autodafé|livres brûlés", "rassemblements de Nuremberg|congrès de Nuremberg", "salut nazi|Heil Hitler",
        "défilés", "radio", "+Leni Riefenstahl", "+Le Triomphe de la volonté", "Führer|guide" ],
      lieux: [ "Dachau", "+Buchenwald" ] },

    { nom: "Une société raciste et antisémite", icone: "⛔", couleur: "#b07c55", angle: 40, paliers: [4, 7, 10],
      mots: [ "nazisme|idéologie nazie|national-socialisme|nazi", "*supériorité de la race aryenne|race aryenne|aryens|race supérieure",
        "*antisémitisme|antisémite", "racisme", "Juifs", "Juifs = indésirables|Juifs indésirables|indésirables",
        "Tsiganes", "handicapés", "boycott des magasins juifs|boycott", "+Volksgemeinschaft|communauté du peuple",
        "+sous-hommes|Untermenschen", "+eugénisme" ],
      sousThemes: [
        { nom: "Lois de Nuremberg", essentiel: true, reveler: ["Nuremberg", "lois raciales", "lois de 1935"],
          dates: [ "1935" ],
          mots: [ "exclusion et persécution des Juifs|exclusion des Juifs|persécution des Juifs|persécutions|exclusion",
            "perte de la citoyenneté|citoyenneté", "mariages mixtes interdits|interdiction des mariages mixtes" ] },
        { nom: "Nuit de Cristal", essentiel: true, reveler: ["Kristallnacht"],
          dates: [ "1938", "novembre 1938|9 novembre 1938|9-10 novembre 1938" ],
          mots: [ "pogrom", "synagogues incendiées|synagogues", "vitrines brisées|magasins juifs détruits" ] }
      ] },

    { nom: "Préparer la guerre et la conquête", icone: "⚔️", couleur: "#7d5a3f", angle: 75, paliers: [4, 7, 10],
      mots: [ "*réarmement|réarmer", "économie de guerre", "service militaire obligatoire|service militaire", "Wehrmacht",
        "armée", "+Luftwaffe", "remilitarisation de la Rhénanie|Rhénanie", "violation du traité de Versailles|traité de Versailles" ],
      sousThemes: [
        { nom: "Espace vital", essentiel: true, reveler: ["agrandir l'espace vital", "Lebensraum", "conquête", "expansion"],
          mots: [ "*Anschluss", "Autriche", "1938", "mars 1938", "Sudètes", "accords de Munich|conférence de Munich",
            "Tchécoslovaquie" ] },
        { nom: "Guerre d'Espagne", reveler: ["guerre civile espagnole", "Espagne", "guerre civile en Espagne"],
          dates: [ "1936-1939|36-39", "1937" ],
          personnes: [ "Franco|aide à Franco|aide à la dictature de Franco", "Picasso" ],
          lieux: [ "Guernica" ],
          mots: [ "bombardement", "républicains|républicains espagnols|camp républicain|République espagnole",
            "nationalistes|franquistes|camp nationaliste", "+Légion Condor", "+Brigades internationales" ] }
      ] }
  ]
};
