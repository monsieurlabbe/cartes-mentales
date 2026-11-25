/* =====================================================================
   CARTE MENTALE — 3e, Histoire, chapitre 1 — VERSION « SPÉCIAL DNB »
   Civils et militaires dans la Première Guerre mondiale :
   violences de masse, expérience combattante, mobilisation des civils.
   ---------------------------------------------------------------------
   Même fonctionnement que les autres cartes (voir le mode d'emploi en tête
   de chapitre-3e-H1.js) :
     *mot = idée essentielle 🔑   +mot = pépite 💎   a|b = variantes
   ===================================================================== */
const CONFIG = {
  id: "3e-H1-DNB-civils-et-militaires",
  titre: "Civils et militaires dans la Grande Guerre",
  sousTitre: "Violences de masse et guerre totale · spécial DNB",
  exemple: "Ex. : poilus, mitrailleuse, munitionnettes, génocide…",
  exemplePhrase: "Les munitionnettes fabriquent des obus car la guerre totale mobilise aussi les civils.",
  objectifPhrases: 3,
  consigne: "Spécial brevet : écris ce que tu sais sur les soldats et les civils pendant la Première Guerre mondiale. Découvre les 4 pôles, gagne ★★★ dans chacun grâce aux idées 🔑 et trouve le nom des bulles « ? ». Puis entraîne-toi avec 🔗 Relier !",
  afficherPolesCaches: true,
  legende: [
    { label: "Les militaires", couleur: "#5b6b3a" },
    { label: "Les civils", couleur: "#2f6f8f" }
  ],
  definitions: {
    "tranchée": "Fossé creusé dans la terre où les soldats vivent et se protègent sur le front.",
    "poilu": "Surnom donné aux soldats français de la Grande Guerre.",
    "guerre de position": "Le front est figé de fin 1914 à 1918 : chaque armée s'enterre dans ses tranchées.",
    "violences de masse": "Violences qui touchent un très grand nombre de personnes, soldats comme civils.",
    "mitrailleuse": "Arme automatique qui tire des centaines de balles par minute et brise les assauts.",
    "gaz": "Arme chimique utilisée à partir de 1915 ; les soldats doivent porter un masque.",
    "obus": "Projectile qui explose, tiré par les canons : il cause la plupart des blessures.",
    "char": "Véhicule blindé à chenilles qui apparaît en 1916 pour franchir les tranchées.",
    "9 millions de morts": "Le nombre de soldats tués pendant la guerre.",
    "gueules cassées": "Soldats défigurés par leurs blessures au visage.",
    "guerre totale": "Guerre qui mobilise toutes les forces d'un pays : soldats, civils, économie, opinion publique.",
    "munitionnette": "Surnom des ouvrières qui fabriquent les obus dans les usines d'armement.",
    "emprunt": "L'État demande à la population de lui prêter de l'argent pour payer la guerre.",
    "troupes coloniales": "Soldats venus des colonies (Afrique, Indochine…) pour combattre en Europe.",
    "déportation": "Déplacement forcé d'une population loin de chez elle, souvent jusqu'à la mort.",
    "désert de Syrie": "Lieu où l'Empire ottoman envoie les Arméniens déportés, qui y meurent en masse.",
    "1915": "Année où commence le génocide des Arméniens.",
    "occupation": "Une armée ennemie contrôle une région et impose sa loi aux habitants.",
    "pénurie": "Il manque de nourriture, de charbon, de produits de base.",
    "Bataille de Verdun": "Bataille de 1916, devenue le symbole de l'enfer des tranchées pour les Français.",
    "Conditions de vie au front": "Ce que les soldats vivent et subissent chaque jour dans les tranchées.",
    "Armes industrielles": "Armes nouvelles produites en masse par les usines.",
    "Bilan humain": "Les morts et les blessés causés par la guerre.",
    "Mobilisation économique": "Les usines et les travailleurs, dont les femmes, produisent pour la guerre.",
    "Effort financier": "Les moyens trouvés par l'État pour payer la guerre.",
    "Propagande et censure": "Le contrôle de l'information pour garder le moral de la population.",
    "Mobilisation des colonies": "Les colonies envoient des soldats et des travailleurs en Europe.",
    "Génocide arménien": "Extermination organisée des Arméniens par l'Empire ottoman en 1915-1916.",
    "Conditions de vie à l'arrière": "Les difficultés des civils loin du front : pénuries, occupation, destructions, deuil…"
  },
  // Défis « Relier » : deux idées à relier par une phrase, avec une question de type brevet
  defis: [
    { a: "poilu", b: "violences de masse", question: "Montre que les soldats subissent des violences de masse." },
    { a: "mitrailleuse", b: "9 millions de morts", question: "Explique pourquoi le bilan humain est si lourd." },
    { a: "tranchée", b: "guerre de position", question: "Décris les conditions de vie des soldats dans les tranchées." },
    { a: "munitionnette", b: "guerre totale", question: "Montre que les femmes participent à l'effort de guerre." },
    { a: "emprunt", b: "guerre totale", question: "Montre que toute la population aide à financer la guerre." },
    { a: "troupes coloniales", b: "guerre totale", question: "Montre que les colonies participent à la guerre." },
    { a: "déportation", b: "désert de Syrie", question: "Explique ce qu'est le génocide des Arméniens." },
    { a: "occupation", b: "pénurie", question: "Montre que les civils souffrent aussi de la guerre." },
    { a: "gueules cassées", b: "obus", question: "Montre que les soldats sont marqués à vie par la guerre." }
  ],
  poles: [
    /* ======================= LES MILITAIRES ======================= */
    { nom: "Combattre dans les tranchées", icone: "🪖", couleur: "#5b6b3a", angle: -140,
      mots: [ "*tranchée|guerre des tranchées", "*poilu", "soldat", "combattant", "militaire", "front", "*guerre de position",
        "assaut", "offensive", "offensive meurtrière", "barbelé|fil barbelé", "boyau", "+no man's land|no mans land|no man s land",
        "abri", "permission", "lettre|lettres de poilus|courrier", "expérience combattante", "+fraternisation",
        "+trêve de Noël|trêve de Noël 1914", "mutineries|mutinerie|mutineries de 1917|mutin", "+chanson de Craonne",
        "fusillé pour l'exemple|fusillé", "refus d'obéir", "désertion", "Chemin des Dames" ],
      personnes: [ "+Barbusse|Henri Barbusse", "+Genevoix|Maurice Genevoix", "+Otto Dix" ],
      sousThemes: [
        { nom: "Bataille de Verdun", essentiel: true, reveler: ["Verdun"],
          dates: [ "1916", "février 1916", "décembre 1916" ],
          lieux: [ "Douaumont", "fort de Douaumont", "Meuse" ], personnes: [ "Pétain" ],
          mots: [ "300 jours", "300 000 morts", "enfer de Verdun", "Voie sacrée", "60 millions d'obus" ] },
        { nom: "Conditions de vie au front", reveler: ["vie au front", "vie dans les tranchées", "vie des soldats",
            "quotidien des soldats", "conditions de vie des soldats", "vie des poilus", "quotidien des poilus", "conditions de vie"],
          mots: [ "boue", "froid", "pluie", "faim", "rat", "pou", "manque de sommeil", "manque d'hygiène", "fatigue", "peur",
            "angoisse", "souffrance", "souffrance psychologique", "maladie", "odeur", "cadavre", "pinard", "+rata", "+cagna" ] },
      ] },

    { nom: "Une violence de masse au front", icone: "💥", couleur: "#8a3324", angle: -40,
      mots: [ "*violences de masse|violence de masse", "mort de masse", "guerre industrielle", "brutalisation",
        "bombardement", "pilonnage" ],
      sousThemes: [
        { nom: "Armes industrielles", reveler: ["armes", "armement", "armes modernes", "armes nouvelles", "guerre moderne"],
          mots: [ "*mitrailleuse", "*gaz|gaz moutarde|ypérite|gaz de combat", "masque à gaz", "*obus", "canon", "artillerie",
            "+canon de 75|canon 75 mm|canon 75mm|canon de 75 mm|75 mm", "*char|tank", "+Renault FT-17|Renault FT17|FT17|FT-17|char Renault",
            "lance-flammes", "grenade", "avion|aviation", "sous-marin", "+Grosse Bertha|la Grosse Bertha" ] },
        { nom: "Bilan humain", essentiel: true, reveler: ["bilan", "pertes", "pertes humaines", "bilan de la guerre"],
          mots: [ "*9 millions de morts|10 millions de morts|millions de morts", "20 millions de blessés|blessés|blessé",
            "*gueules cassées|gueule cassée", "mutilés|mutilé", "traumatisme|obusite", "disparus|disparu",
            "monuments aux morts|monument aux morts", "+soldat inconnu|tombe du soldat inconnu", "+1 400 000 morts français|1,4 million de morts français" ] }
      ] },

    /* ======================= LES CIVILS ======================= */
    { nom: "La mobilisation des civils", icone: "🏭", couleur: "#2f6f8f", angle: 40,
      mots: [ "*guerre totale", "arrière", "civils|civil", "union sacrée", "effort de guerre", "infirmière", "marraine de guerre",
        "+petites Curies|petite Curie", "+Marie Curie|Curie" ],
      sousThemes: [
        { nom: "Mobilisation économique", essentiel: true, reveler: ["économie de guerre", "mobilisation de l'économie", "production de guerre", "économie"],
          mots: [ "*munitionnette", "femmes|femme|travail des femmes", "usine|usines d'armement", "production industrielle",
            "industrie de guerre", "enfants|enfant", "femmes aux champs|travail des champs", "Renault", "+Citroën" ] },
        { nom: "Effort financier", reveler: ["financement de la guerre", "finances", "payer la guerre", "argent"],
          mots: [ "*emprunt|emprunt national|emprunts", "impôts|impôt|hausse des impôts", "or", "+On les aura" ] },
        { nom: "Propagande et censure", essentiel: true, reveler: ["propagande", "censure", "contrôle de l'information"],
          mots: [ "bourrage de crâne", "affiches|affiche", "presse|journaux", "moral|moral des civils", "Anastasie",
            "+Canard enchaîné|Le Canard enchaîné" ] },
        { nom: "Mobilisation des colonies", reveler: ["colonies", "empires coloniaux", "empire colonial", "soldats des colonies"],
          mots: [ "*troupes coloniales|soldat colonial|soldats coloniaux|tirailleurs|tirailleur|tirailleurs sénégalais|tirailleur sénégalais",
            "travailleurs coloniaux|travailleur colonial", "+travailleurs chinois|travailleur chinois" ],
          lieux: [ "Afrique", "Algérie", "Sénégal", "Indochine" ] }
      ] },

    { nom: "Les civils victimes", icone: "⚰️", couleur: "#6b4a2e", angle: 140,
      mots: [ "*violences de masse|violence de masse", "victimes civiles|victimes", "massacres|massacre", "grippe espagnole" ],
      sousThemes: [
        { nom: "Génocide arménien", essentiel: true, reveler: ["génocide des Arméniens", "génocide", "extermination des Arméniens"],
          dates: [ "*1915|avril 1915|1915-1916" ],
          personnes: [ "+Talaat Pacha|Talaat" ], lieux: [ "*désert de Syrie|Syrie|désert", "Mésopotamie", "Empire ottoman" ],
          mots: [ "Arméniens|Arménien", "*déportation|déportations|déportés", "marches de la mort|marche de la mort",
            "1,2 million de morts|1 200 000 morts", "camps de concentration|camp de concentration", "exécutions|exécution", "famine" ] },
        { nom: "Conditions de vie à l'arrière", reveler: ["vie à l'arrière", "vie des civils", "quotidien des civils",
            "conditions de vie des civils", "vie quotidienne à l'arrière", "difficultés des civils", "souffrances des civils"],
          mots: [ "*pénurie|pénuries", "rationnement", "faim", "*occupation|régions occupées", "réquisitions|réquisition",
            "travail forcé", "otages|otage", "réfugiés|réfugié", "destructions|destruction", "villages en ruine|ruines",
            "Paris bombardé|bombardement de Paris|bombardements", "deuil", "veuves|veuve", "orphelins|orphelin",
            "+pupilles de la Nation|pupille de la Nation" ],
          lieux: [ "Nord de la France", "Belgique", "Lille", "+Belgique martyre", "+cathédrale de Reims|Reims" ] }
      ] }
  ]
};
