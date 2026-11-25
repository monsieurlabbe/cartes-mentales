/* =====================================================================
   CARTE MENTALE — 3e, Histoire, chapitre 1 : La Première Guerre mondiale
   ---------------------------------------------------------------------
   Ce fichier ne contient QUE le contenu du chapitre. Le fonctionnement
   (affichage, indices, correction, image…) est dans moteur.js, commun à
   toutes les cartes.

   Chaque pôle :
   - nom, icone, couleur ; angle (facultatif) : -90 = en haut, 0 = à droite…
   - mots / personnes / lieux / pays / dates / evenements : mots reconnus.
     Le type sert aux indices (« trouve une personne », « trouve un lieu »…).
   - sousThemes (facultatif) : bulles « ? ». Quand l'élève écrit un mot d'un
     groupe, la bulle apparaît ; il doit trouver son nom ("reveler" = autres
     formulations acceptées).

   Symboles devant un mot :
     *mot   = IDÉE ESSENTIELLE 🔑 (les étoiles ★ sont calculées sur ces idées)
     +mot   = PÉPITE 💎 (idée peu connue, valorisée mais non exigée)
     a|b|c  = variantes d'une même idée ("*char|tank")
   essentiel: true dans un sous-thème = le NOM de la bulle est une idée 🔑.
   Pas besoin des pluriels ni des accents : "tranchée" reconnaît "Tranchées".
   ===================================================================== */
const CONFIG = {
  id: "3e-H1-premiere-guerre-mondiale",   // identifiant unique de la carte (sert à l'enregistrement automatique)
  exemplePhrase: "Les munitionnettes fabriquent des obus car la guerre totale mobilise aussi les civils.",
  objectifPhrases: 3,                     // nombre de phrases « Relier » visées
  exemple: "Ex. : tranchées, munitionnettes, Lénine…",
  titre: "La Première Guerre mondiale",
  sousTitre: "28 juillet 1914 – 11 novembre 1918",
  consigne: "Écris un mot ou une expression qui te fait penser à la Première Guerre mondiale, puis valide. Découvre les 8 pôles, gagne jusqu'à ★★★ dans chacun grâce aux idées 🔑 et trouve le nom des bulles « ? ». Les idées 🔑 sont essentielles, les 💎 sont des pépites !",
  afficherPolesCaches: true,
  // Indices : petite définition de chaque idée 🔑 et de chaque bulle (affichée quand l'élève demande un indice)
  definitions: {
    "guerre de mouvement": "Phase où les armées avancent et attaquent sur de grandes distances (en 1914 et en 1918).",
    "guerre de position": "Phase où le front est figé : chaque armée s'enterre dans ses tranchées (fin 1914 – mars 1918).",
    "28 juillet 1914": "Date où l'Autriche-Hongrie déclare la guerre à la Serbie : la guerre commence.",
    "11 novembre 1918": "Date de l'armistice : les combats s'arrêtent enfin.",
    "tranchée": "Fossé creusé dans la terre où les soldats vivent et se protègent sur le front.",
    "poilu": "Surnom donné aux soldats français de la Grande Guerre.",
    "violences de masse": "Violences qui touchent un très grand nombre de personnes, soldats comme civils.",
    "mitrailleuse": "Arme automatique qui tire des centaines de balles par minute et brise les assauts.",
    "gaz": "Arme chimique utilisée à partir de 1915 ; les soldats doivent porter un masque.",
    "char": "Véhicule blindé à chenilles qui apparaît en 1916 pour franchir les tranchées.",
    "obus": "Projectile qui explose, tiré par les canons : il cause la plupart des blessures.",
    "guerre totale": "Guerre qui mobilise toutes les forces d'un pays : soldats, civils, économie, opinion publique.",
    "munitionnette": "Surnom des ouvrières qui fabriquent les obus dans les usines d'armement.",
    "emprunt": "L'État demande à la population de lui prêter de l'argent pour payer la guerre.",
    "déportation": "Déplacement forcé d'une population loin de chez elle, souvent jusqu'à la mort.",
    "désert de Syrie": "Lieu où l'Empire ottoman envoie les Arméniens déportés, qui y meurent en masse.",
    "SDN": "Organisation internationale créée après la guerre pour maintenir la paix entre les pays.",
    "9 millions de morts": "Le bilan humain de la guerre chez les soldats.",
    "Clemenceau": "Chef du gouvernement français à la fin de la guerre, surnommé « le Tigre ».",
    "Nicolas II": "Dernier tsar de Russie : il doit abdiquer en 1917.",
    "Lénine": "Chef des bolcheviks, il prend le pouvoir en Russie en 1917.",
    "Déclenchement de la guerre": "Ce qui se passe à l'été 1914, quand la guerre commence.",
    "Armistice": "Accord qui arrête les combats, sans être encore la paix.",
    "Bataille de Verdun": "Bataille de 1916, devenue le symbole de l'enfer des tranchées pour les Français.",
    "Conditions de vie au front": "Ce que les soldats vivent et subissent chaque jour dans les tranchées.",
    "Artillerie": "Ensemble des canons et des projectiles qu'ils tirent.",
    "Triple Entente": "Alliance de la France, du Royaume-Uni et de la Russie.",
    "Empires centraux": "Camp de l'Allemagne et de l'Autriche-Hongrie, rejointes par l'Empire ottoman.",
    "Empires coloniaux": "Territoires d'outre-mer qui envoient des soldats et des travailleurs en Europe.",
    "Mobilisation économique": "Les usines et les travailleurs, dont les femmes, produisent pour la guerre.",
    "Effort financier": "Les moyens trouvés par l'État pour payer la guerre.",
    "Propagande et censure": "Le contrôle de l'information pour garder le moral de la population.",
    "Génocide arménien": "Extermination organisée des Arméniens par l'Empire ottoman en 1915-1916.",
    "Conditions de vie à l'arrière": "Les difficultés des civils loin du front : pénuries, occupation, destructions…",
    "Traité de Versailles": "Traité de paix imposé à l'Allemagne en juin 1919.",
    "Nouveaux États": "Pays qui apparaissent en Europe après la disparition des empires.",
    "Février 1917": "Première révolution russe : le tsar est renversé.",
    "Octobre 1917": "Deuxième révolution russe : les bolcheviks prennent le pouvoir."
  },
  // Défis « Relier » : deux idées à relier par une phrase, avec une question de type brevet
  defis: [
    { a: "tranchée", b: "guerre de position", question: "Explique pourquoi les soldats vivent dans des tranchées." },
    { a: "gaz", b: "violences de masse", question: "Montre que les soldats subissent une violence d'un nouveau genre." },
    { a: "munitionnette", b: "guerre totale", question: "Montre que les femmes participent à l'effort de guerre." },
    { a: "emprunt", b: "guerre totale", question: "Montre que toute la population aide à financer la guerre." },
    { a: "déportation", b: "violences de masse", question: "Montre que les Arméniens sont victimes d'un génocide." },
    { a: "9 millions de morts", b: "SDN", question: "Explique pourquoi on crée la SDN après la guerre." },
    { a: "Nicolas II", b: "Lénine", question: "Raconte les deux révolutions russes de 1917." },
    { a: "Clemenceau", b: "11 novembre 1918", question: "Explique comment la guerre se termine." }
  ],
  // Remarques affichées quand l'élève écrit certains mots
  notes: {
    "Italie": "L'Italie était alliée de l'Allemagne avant 1914, mais elle entre en guerre en 1915 aux côtés de la Triple Entente."
  },
  poles: [
    { nom: "Début et fin de la guerre", icone: "📅", couleur: "#8a6a12", paliers: [3, 6, 9],
      mots: [ "1914-1918", "quatre ans de guerre", "52 mois", "généralissime",
        "*guerre de mouvement", "*guerre de position", "trois phases|3 phases|phases de la guerre",
        "stabilisation du front|front stabilisé", "reprise de la guerre de mouvement" ],
      dates: [ "août 1914 - novembre 1914|août-novembre 1914|d'août à novembre 1914",
        "décembre 1914 - mars 1918|décembre 1914-mars 1918|de décembre 1914 à mars 1918",
        "mars 1918 - novembre 1918|mars-novembre 1918|de mars à novembre 1918", "décembre 1914", "mars 1918" ],
      evenements: [ "offensives du printemps 1918|offensive du printemps|offensive de 1918", "abdication de Guillaume II",
        "course à la mer" ],
      sousThemes: [
        { nom: "Déclenchement de la guerre", reveler: ["début de la guerre", "entrée en guerre", "déclenchement",
            "causes de la guerre", "origine de la guerre", "début du conflit", "comment la guerre commence"],
          evenements: [ "attentat de Sarajevo", "attentat", "déclaration de guerre", "crise de juillet", "+plan Schlieffen|Schlieffen" ],
          lieux: [ "Sarajevo" ], personnes: [ "François-Ferdinand", "Gavrilo Princip", "Princip", "+Jaurès|Jean Jaurès|assassinat de Jaurès" ],
          dates: [ "*28 juillet 1914|28 juillet|28/07/1914", "1914", "août 1914", "1er août 1914", "3 août 1914", "juillet 1914" ],
          mots: [ "ultimatum", "archiduc", "fleur au fusil", "affiche de mobilisation", "+tocsin" ] },
        { nom: "Armistice", reveler: ["armistice de 1918", "fin de la guerre", "fin des combats", "cessez-le-feu",
            "fin du conflit", "arrêt des combats"],
          dates: [ "*11 novembre 1918|11 novembre|novembre 1918|11/11/1918", "1918" ],
          lieux: [ "+Rethondes|clairière de Rethondes|wagon de Rethondes", "Compiègne", "forêt de Compiègne" ],
          personnes: [ "Foch", "maréchal Foch" ], mots: [ "wagon", "signature de l'armistice" ] }
      ] },

    { nom: "La guerre des tranchées", icone: "🪖", couleur: "#5b6b3a", paliers: [5, 9, 13],
      mots: [ "*tranchée", "guerre des tranchées", "*poilu", "soldat", "militaire", "combattant", "front",
        "militaires sur le front", "offensive", "offensive meurtrière", "assaut", "bataille", "+no man's land|no mans land|no man s land",
        "barbelé", "fil barbelé", "boyau", "permission", "lettre", "courrier", "blessé", "mort", "gueule cassée",
        "infanterie", "casque", "abri", "guerre de position", "*violences de masse|violence de masse",
        "pantalon rouge", "bleu horizon", "+casque Adrian", "plaque d'identité", "guetteur", "périscope", "brancardier",
        "lettres de poilus|lettre de poilu", "+fraternisation", "mutilé",
        "mutineries|mutinerie|mutineries de 1917|mutin", "+chanson de Craonne", "fusillé pour l'exemple|fusillé", "refus d'obéir",
        "désertion", "conseil de guerre" ],
      lieux: [ "Somme", "Marne", "Ypres", "Craonne", "Chemin des Dames" ],
      evenements: [ "bataille de la Somme", "bataille de la Marne", "+taxis de la Marne|taxi de la Marne|taxis",
        "+trêve de Noël|trêve de Noël 1914" ],
      personnes: [ "+Gallieni", "+Barbusse|Henri Barbusse", "+Genevoix|Maurice Genevoix", "+Apollinaire|Guillaume Apollinaire", "+Otto Dix" ],
      sousThemes: [
        { nom: "Bataille de Verdun", essentiel: true, reveler: ["Verdun"],
          dates: [ "1916", "février 1916", "décembre 1916" ],
          lieux: [ "Douaumont", "fort de Douaumont", "Nord-est de la France", "Meuse" ], personnes: [ "Pétain" ],
          mots: [ "300 jours", "300 000 morts", "400 000 blessés", "60 millions d'obus", "enfer de Verdun", "Voie sacrée" ] },
        { nom: "Conditions de vie au front", reveler: ["vie au front", "vie dans les tranchées", "vie des soldats",
            "quotidien des soldats", "conditions de vie des soldats", "vie des poilus", "quotidien des poilus",
            "conditions de vie des poilus", "conditions dans les tranchées"],
          mots: [ "boue", "froid", "pluie", "faim", "rat", "pou", "manque de sommeil", "sommeil", "manque d'hygiène",
            "hygiène", "fatigue", "angoisse", "peur", "lassitude", "souffrance", "souffrance psychologique", "maladie", "odeur", "cadavre",
            "pinard", "gnôle|gnole", "+rata", "+roulante", "+cagna" ] },
      ] },

    { nom: "Une guerre moderne et industrielle", icone: "💥", couleur: "#a23b2a", paliers: [4, 7, 10],
      mots: [ "arme", "armement", "*mitrailleuse", "fusil", "*gaz", "gaz moutarde", "ypérite", "gaz de combat",
        "masque à gaz", "*char|tank", "+Renault FT-17|Renault FT17|FT17|FT-17|char Renault", "avion", "aviation", "navire",
        "sous-marin", "torpille", "grenade", "baïonnette", "lance-flammes", "explosion", "guerre moderne",
        "guerre industrielle", "dirigeable", "zeppelin", "mitraillette", "armes produites en grande quantité",
        "mine", "guerre sous-marine|guerre sous-marine à outrance", "as de l'aviation" ],
      evenements: [ "+Lusitania" ],
      personnes: [ "+Guynemer", "+Baron rouge|Richthofen|Manfred von Richthofen" ],
      sousThemes: [
        { nom: "Artillerie", reveler: ["canons", "tirs d'artillerie", "pièces d'artillerie"],
          mots: [ "canon", "+canon de 75|canon 75 mm|canon 75mm|canon de 75 mm|75 mm", "*obus", "obusier", "bombardement", "pilonnage", "+Grosse Bertha|la Grosse Bertha",
            "+canon de Paris|Pariser Kanonen", "+marmite" ] }
      ] },

    { nom: "Les belligérants", icone: "🌍", couleur: "#6a3d8f", paliers: [4, 7, 10],
      mots: [ "belligérant", "mobilisation des belligérants", "mobilisation", "mobilisation générale", "alliance",
        "nationalisme", "guerre mondiale" ],
      personnes: [ "Joffre" ],
      sousThemes: [
        { nom: "Triple Entente", essentiel: true, reveler: ["Entente", "Alliés", "vainqueurs", "camp des vainqueurs", "les alliés"],
          pays: [ "France", "Royaume-Uni|Angleterre", "Russie", "Empire russe", "Empire de Russie", "Belgique",
            "Serbie", "Italie", "États-Unis", "Japon" ],
          evenements: [ "entrée en guerre des États-Unis" ], personnes: [ "+Pershing" ], mots: [ "+Sammies|Sammy" ] },
        { nom: "Empires centraux", essentiel: true, reveler: ["Puissances centrales", "vaincus", "camp des vaincus", "empires du centre"],
          pays: [ "Allemagne", "Empire allemand", "Autriche-Hongrie", "Empire d'Autriche-Hongrie", "Autriche",
            "Empire ottoman|Turquie", "Bulgarie" ], personnes: [ "Guillaume II", "Kaiser" ] },
        { nom: "Empires coloniaux", reveler: ["empire colonial", "colonies", "colonie", "troupes des colonies",
            "soldats des colonies", "soldats coloniaux"],
          mots: [ "troupes coloniales", "soldat colonial", "tirailleur", "tirailleur sénégalais" ],
          lieux: [ "Algérie", "Sénégal", "Indochine", "Inde", "Afrique" ] }
      ] },

    { nom: "Les civils mobilisés", icone: "🏭", couleur: "#2f6f8f", paliers: [5, 8, 12],
      mots: [ "civil", "arrière", "civils à l'arrière", "*guerre totale", "effort de guerre", "union sacrée", "État",
        "actions de l'État", "infirmière", "marraine de guerre", "cartes postales|carte postale", "+petites Curies|petite Curie" ],
      personnes: [ "Poincaré", "+Marie Curie|Curie" ],
      sousThemes: [
        { nom: "Mobilisation économique", reveler: ["économie de guerre", "mobilisation de l'économie", "effort industriel",
            "production de guerre", "travail à l'arrière", "économie"],
          mots: [ "femme", "*munitionnette", "travail des femmes", "enfant", "population des colonies", "travailleur colonial",
            "usine", "production industrielle", "industrie", "industrie de guerre", "Renault", "+Citroën",
            "femmes aux champs|femmes dans les champs|travail des champs", "+travailleurs chinois|travailleur chinois" ] },
        { nom: "Effort financier", reveler: ["financement de la guerre", "finances", "argent de la guerre", "payer la guerre"],
          mots: [ "impôt", "hausse des impôts", "*emprunt", "emprunt national", "or", "participation à l'effort de guerre",
            "argent", "bons de la défense nationale", "+On les aura" ] },
        { nom: "Propagande et censure", reveler: ["propagande", "censure", "contrôle de l'information", "manipulation de l'information"],
          mots: [ "bourrage de crâne", "fausse information", "affiche", "moral", "moral des civils", "journal", "presse", "Anastasie",
            "+Canard enchaîné|Le Canard enchaîné" ] }
      ] },

    { nom: "Les civils victimes", icone: "⚰️", couleur: "#7a4a2e", paliers: [4, 7, 10],
      mots: [ "victime", "victimes de la guerre", "*violences de masse|violence de masse", "massacre", "deuil",
        "veuve", "orphelin", "grippe espagnole", "pandémie", "bombardement de civils" ],
      lieux: [ "+Belgique martyre", "+cathédrale de Reims|Reims" ], evenements: [ "Paris bombardé|bombardement de Paris" ],
      sousThemes: [
        { nom: "Génocide arménien", essentiel: true, reveler: ["génocide des Arméniens", "génocide", "extermination des Arméniens", "massacre des Arméniens"],
          personnes: [ "+Talaat Pacha|Talaat" ], lieux: [ "Syrie", "désert", "*désert de Syrie", "Mésopotamie", "désert de Mésopotamie" ],
          dates: [ "1915", "avril 1915", "été 1916" ],
          mots: [ "Arménien", "*déportation", "marche de la mort", "camp de concentration", "famine", "exécution",
            "extermination", "1,2 million de morts", "arrestation", "expulsion" ] },
        { nom: "Conditions de vie à l'arrière", reveler: ["vie à l'arrière", "vie des civils", "quotidien des civils",
            "conditions de vie des civils", "vie quotidienne à l'arrière", "difficultés des civils"],
          mots: [ "pénurie", "rationnement", "réquisition", "travail forcé", "occupation", "destruction", "village en ruine",
            "ruine", "charbon", "difficultés d'information", "réfugié", "otage" ],
          lieux: [ "Nord de la France", "régions occupées", "Lille occupée|Lille" ] }
      ] },

    { nom: "Une Europe transformée", icone: "🕊️", couleur: "#3d7a5a", paliers: [4, 7, 10],
      mots: [ "*SDN|Société des Nations", "paix", "bilan", "bilan humain", "*9 millions de morts|10 millions de morts|millions de morts", "20 millions de blessés", "monument aux morts", "mémoire", "+soldat inconnu|tombe du soldat inconnu", "commémoration",
        "der des ders", "victoire", "défaite", "flamme|flamme du soldat inconnu", "+bleuet de France|bleuet",
        "+pupilles de la Nation|pupille de la Nation", "mutilés de guerre", "+République de Weimar|Weimar" ],
      lieux: [ "Arc de triomphe", "+Gentioux|monument de Gentioux|Maudite soit la guerre" ],
      sousThemes: [
        { nom: "Traité de Versailles", essentiel: true, reveler: ["Versailles", "traité de paix", "conférence de la paix", "traités de paix"],
          dates: [ "1919", "juin 1919", "28 juin 1919" ],
          personnes: [ "*Clemenceau|Georges Clemenceau", "Wilson", "+Lloyd George" ],
          lieux: [ "galerie des Glaces", "Alsace-Lorraine" ],
          mots: [ "réparations", "diktat", "+14 points de Wilson|14 points|quatorze points", "responsabilité de l'Allemagne" ] },
        { nom: "Nouveaux États", essentiel: true, reveler: ["nouvel État", "nouveaux pays", "création d'États", "création de nouveaux États",
            "nouvelle carte de l'Europe", "carte de l'Europe"],
          pays: [ "Pologne", "Tchécoslovaquie", "Yougoslavie", "Hongrie", "Finlande", "pays baltes" ],
          mots: [ "frontière", "nouvelles frontières", "fin des empires", "démantèlement des empires", "disparition des empires" ] }
      ] },

    { nom: "Les révolutions russes", icone: "✊", couleur: "#b5452f", paliers: [3, 6, 9],
      mots: [ "révolution", "révolution russe", "révolutions russes", "1917", "contagion révolutionnaire",
        "troubles sociaux", "troubles politiques", "ouvrier", "URSS", "Armée rouge", "guerre civile russe|guerre civile",
        "exécution des Romanov|Romanov|famille impériale", "+spartakistes|spartakiste|Spartakus" ],
      personnes: [ "+Raspoutine", "+Rosa Luxemburg" ], evenements: [ "+train plombé" ],
      sousThemes: [
        { nom: "Février 1917", essentiel: true, reveler: ["révolution de février", "première révolution", "chute du tsar", "fin du tsarisme"],
          personnes: [ "*Nicolas II|tsar" ], lieux: [ "Petrograd", "Saint-Pétersbourg" ],
          mots: [ "abdication", "abdique", "manifestation", "manifestation des femmes", "grève", "grève ouvrière",
            "mutinerie dans l'armée", "gouvernement provisoire" ] },
        { nom: "Octobre 1917", essentiel: true, reveler: ["révolution d'octobre", "révolution bolchevique", "prise du pouvoir par les bolcheviks"],
          personnes: [ "*Lénine", "Trotski" ], evenements: [ "traité de Brest-Litovsk" ], lieux: [ "Brest-Litovsk" ],
          mots: [ "bolchevik", "coup d'État", "communisme", "communiste", "soviet", "paix avec l'Allemagne" ] }
      ] }
  ]
};
