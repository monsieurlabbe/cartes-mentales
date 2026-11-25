/* =====================================================================
   CARTE MENTALE — 3e, Géographie, chapitre 1 : Les dynamiques des aires urbaines
   ---------------------------------------------------------------------
   Contenu du chapitre seulement ; le fonctionnement est dans moteur.js.
   Mode d'emploi complet : voir l'en-tête de chapitre-3e-H1.js.
     *mot = idée essentielle 🔑 (les étoiles ★ sont calculées dessus)
     +mot = pépite 💎      a|b = variantes d'une même idée
     essentiel: true dans un sous-thème = le nom de la bulle est une idée 🔑
   ===================================================================== */
const CONFIG = {
  id: "3e-G1-aires-urbaines",
  exemplePhrase: "Les habitants s'installent dans des lotissements car les logements y sont moins chers, ce qui provoque l'étalement urbain.",
  objectifPhrases: 3,
  definitions: {
    "aire urbaine": "Ensemble formé par une ville-centre, sa banlieue et sa couronne périurbaine.",
    "trois espaces complémentaires": "L'aire urbaine se compose de la ville-centre, de la banlieue et de la couronne périurbaine.",
    "80 % de la population": "Part des Français qui vivent dans une aire urbaine.",
    "ville-centre": "Le cœur de l'aire urbaine, la ville la plus ancienne et la plus dense.",
    "forte concentration d'habitants, d'emplois, de services et d'équipements": "Ce qui caractérise la ville-centre : tout y est rassemblé.",
    "quartiers variés": "Dans la ville-centre on trouve des quartiers historiques, d'affaires, commerçants…",
    "banlieue": "Espaces urbanisés en continuité avec la ville-centre.",
    "grands ensembles": "Grands immeubles de logements construits en banlieue dans les années 1950-1970.",
    "mixité sociale": "Le fait que des habitants de milieux sociaux différents vivent dans le même quartier.",
    "couronne périurbaine": "Communes plus éloignées, où au moins 40 % des actifs travaillent dans l'agglomération.",
    "habitat pavillonnaire": "Habitat fait de maisons individuelles avec jardin.",
    "espaces agricoles et naturels": "Champs et forêts qu'on trouve encore dans la couronne périurbaine.",
    "dépendante de l'agglomération": "Les habitants de la couronne vont travailler et faire leurs courses dans l'agglomération.",
    "hausse des prix": "Les logements deviennent plus chers dans les quartiers rénovés.",
    "métropolisation": "Concentration des populations, des richesses et des pouvoirs dans les grandes villes.",
    "fonctions de commandement": "Sièges d'entreprises, administrations, centres de décision.",
    "attractivité": "Capacité d'une ville à attirer des habitants, des entreprises, des touristes.",
    "rayonnement": "Influence d'une ville à différentes échelles : régionale, nationale, mondiale.",
    "développement des mobilités": "Les habitants se déplacent de plus en plus et de plus en plus loin.",
    "transports en commun": "Bus, métro, tramway, train : des transports utilisés par beaucoup de personnes à la fois.",
    "pistes cyclables": "Voies réservées aux vélos.",
    "déplacements pendulaires": "Allers-retours quotidiens entre le domicile et le lieu de travail.",
    "périurbanisation": "Installation de citadins dans les communes situées autour des villes.",
    "installation de nouveaux habitants dans les périphéries": "Des citadins quittent la ville pour vivre plus loin.",
    "éloignement du lieu de travail": "Les habitants du périurbain vivent loin de leur travail.",
    "étalement urbain": "Extension de la ville vers les espaces ruraux autour d'elle.",
    "lotissements": "Ensembles de maisons individuelles construites en même temps.",
    "zones commerciales": "Espaces en périphérie avec de grands magasins et des parkings.",
    "recherche d'un logement moins cher": "Une raison de quitter la ville : les logements y coûtent trop cher.",
    "artificialisation des sols": "Des terres agricoles ou naturelles sont recouvertes de béton et de goudron.",
    "collectivités territoriales": "Communes, départements, régions : elles aménagent le territoire.",
    "Rénovation urbaine": "Transformation de quartiers anciens pour améliorer le cadre de vie.",
    "Gentrification": "Arrivée de populations aisées dans un quartier populaire, ce qui fait monter les prix.",
    "Densification": "Construire plus de logements sur un même espace pour accueillir plus d'habitants.",
    "Formes de l'étalement urbain": "Ce qu'on construit en périphérie quand la ville s'étale.",
    "Causes de l'étalement urbain": "Les raisons qui poussent la ville à s'étendre.",
    "Conséquences de l'étalement urbain": "Les effets de l'étalement sur les habitants et l'environnement.",
    "Pouvoirs publics": "L'État et les collectivités : ils aménagent le territoire.",
    "Entreprises et promoteurs immobiliers": "Ils implantent des activités et construisent des logements.",
    "Habitants": "Par le choix de leur lieu de vie, ils participent aux dynamiques urbaines."
  },
  defis: [
    { a: "ville-centre", b: "forte concentration", question: "Décris la ville-centre." },
    { a: "couronne périurbaine", b: "habitat pavillonnaire", question: "Décris la couronne périurbaine." },
    { a: "recherche d'un logement moins cher", b: "périurbanisation", question: "Explique pourquoi des habitants quittent la ville." },
    { a: "étalement urbain", b: "artificialisation des sols", question: "Montre que l'étalement urbain a des conséquences sur l'environnement." },
    { a: "déplacements pendulaires", b: "transports en commun", question: "Explique comment les habitants se déplacent dans l'aire urbaine." },
    { a: "métropolisation", b: "fonctions de commandement", question: "Explique ce qu'est la métropolisation." },
    { a: "gentrification", b: "hausse des prix", question: "Montre que la rénovation d'un quartier transforme sa population." },
    { a: "collectivités territoriales", b: "transports en commun", question: "Montre que les pouvoirs publics aménagent l'aire urbaine." }
  ],
  titre: "Les dynamiques des aires urbaines",
  sousTitre: "dans une France mondialisée",
  fichier: "G1-aires-urbaines",
  exemple: "Ex. : ville-centre, lotissements, tramway…",
  consigne: "Écris un mot ou une expression qui te fait penser aux aires urbaines, puis valide. Découvre les 10 pôles, gagne jusqu'à ★★★ dans chacun et trouve le nom des bulles « ? ». Les idées 🔑 sont essentielles, les 💎 sont des pépites !",
  legende: [
    { label: "Ville-centre", couleur: "#6a1b9a" },
    { label: "Banlieue", couleur: "#e65100" },
    { label: "Couronne périurbaine", couleur: "#2e7d32" },
    { label: "Dynamiques", couleur: "#1565c0" },
    { label: "Étalement urbain", couleur: "#8d6e63" },
    { label: "Acteurs", couleur: "#546e7a" }
  ],
  afficherPolesCaches: true,
  centreY: 0.44,   // position verticale du centre (0.5 = milieu ; plus petit = plus de place en bas de la carte)
  // angle : position du pôle (en degrés : -90 = en haut, 0 = à droite, 90 = en bas, 180 = à gauche)
  poles: [
    /* ======================= DÉFINITION ======================= */
    { nom: "L'aire urbaine", icone: "🎯", couleur: "#37474f", angle: -90, paliers: [3, 6, 9],
      mots: [ "*aire urbaine|aires urbaines|aire d'attraction des villes|aires d'attraction des villes",
        "*trois espaces complémentaires|trois espaces|organisation en trois espaces|3 espaces",
        "pôle urbain", "agglomération", "urbanisation", "urbains|citadins", "ville|villes",
        "*80 % de la population|80 % d'urbains|80%|80 %", "unité urbaine", "France mondialisée|mondialisation",
        "espace urbain|espaces urbains", "+INSEE" ] },

    /* ======================= LES 3 ESPACES ======================= */
    { nom: "La ville-centre", icone: "🏛️", couleur: "#6a1b9a", angle: -165, paliers: [4, 7, 10],
      mots: [ "*ville-centre|ville centre|centre-ville|centre ville", "cœur de l'aire urbaine|cœur|coeur",
        "*forte concentration d'habitants, d'emplois, de services et d'équipements|concentration d'habitants|concentration d'emplois|forte concentration",
        "*quartiers variés|quartiers d'affaires|quartier d'affaires", "patrimoine", "centre historique|vieille ville",
        "culture|musées|théâtre", "très bien desservie|desserte", "commune centrale", "équipements", "services", "emplois",
        "forte densité|densité", "mairie|hôtel de ville", "+CBD", "+Part-Dieu" ] },

    { nom: "La banlieue", icone: "🏢", couleur: "#e65100", angle: 168, paliers: [4, 7, 10],
      mots: [ "*banlieue|banlieues|proche banlieue", "espaces urbanisés autour de la ville-centre|autour de la ville-centre|ceinture urbaine",
        "*grands ensembles|grand ensemble", "immeubles", "logements", "maisons", "commerces", "zones d'activités|zone d'activités",
        "*mixité sociale", "inégalités|inégalités selon les quartiers", "logements sociaux|HLM", "cités",
        "bien connectée à la ville-centre|connectée", "+quartiers prioritaires", "+loi SRU" ] },

    { nom: "La couronne périurbaine", icone: "🏡", couleur: "#2e7d32", angle: 140, paliers: [4, 7, 10],
      mots: [ "*couronne périurbaine|périurbain|espace périurbain|communes périurbaines|couronne",
        "*habitat pavillonnaire|pavillons|pavillon", "lotissements|lotissement",
        "*espaces agricoles et naturels|espaces agricoles|espaces naturels|champs|forêts",
        "cadre de vie plus calme|calme|cadre de vie calme|tranquillité", "cadre de vie",
        "moins cher|logements moins chers|prix moins élevés",
        "*dépendante de l'agglomération|dépendance|dépendance à la ville|dépendante",
        "40 % des actifs|40% des actifs|au moins 40 % des actifs", "village|villages", "maisons individuelles",
        "+rurbains|rurbain|rurbanisation" ] },

    /* ======================= LES DYNAMIQUES ======================= */
    { nom: "Transformer la ville", icone: "🏗️", couleur: "#1565c0", angle: -50, paliers: [4, 7, 10],
      mots: [ "espaces déjà urbanisés|espace déjà urbanisé", "renouvellement urbain", "transformation" ],
      sousThemes: [
        { nom: "Rénovation urbaine", essentiel: true, reveler: ["rénovation", "réhabilitation", "rénover"],
          mots: [ "transformation de quartiers anciens|quartiers anciens", "amélioration du cadre de vie|cadre de vie amélioré",
            "logements rénovés|rénovation des logements", "équipements", "chantier|grues|travaux", "démolition", "+écoquartier|écoquartiers",
            "+Confluence" ] },
        { nom: "Gentrification", essentiel: true, reveler: ["embourgeoisement"],
          mots: [ "*hausse des prix|augmentation des prix|prix de l'immobilier|hausse des loyers",
            "départ des habitants modestes|habitants modestes|départ des plus pauvres",
            "arrivée de populations plus aisées|populations plus aisées|populations aisées|habitants aisés" ] },
        { nom: "Densification", essentiel: true, reveler: ["densifier", "ville dense"],
          mots: [ "construction d'immeubles|immeubles|tours", "augmentation du nombre d'habitants|plus d'habitants",
            "développement des commerces et des services", "construction d'équipements", "+verticalisation" ] }
      ] },

    { nom: "La métropolisation", icone: "🌐", couleur: "#283593", angle: -15, paliers: [4, 7, 10],
      mots: [ "*métropolisation|métropole|métropoles",
        "concentration des emplois, des services et des fonctions de commandement|concentration des richesses|concentration des services",
        "*fonctions de commandement|sièges sociaux|centres de décision", "*attractivité|attractive|attirer",
        "*rayonnement|rayonnement à différentes échelles", "échelle locale|échelle régionale|échelle nationale|échelle européenne|échelle mondiale",
        "grandes villes", "métropoles régionales", "Paris|ville mondiale", "Lyon", "aéroport|aéroports", "universités",
        "sièges d'entreprises|entreprises internationales", "+Grand Paris" ] },

    { nom: "Le développement des mobilités", icone: "🚆", couleur: "#00838f", angle: 18, paliers: [4, 7, 10],
      mots: [ "*développement des mobilités|mobilités|mobilité",
        "amélioration et diversification des moyens de transport|moyens de transport|diversification des transports",
        "*transports en commun|transport en commun", "transports", "métro", "tramway|tram", "bus", "TER", "RER",
        "*pistes cyclables|piste cyclable|vélo", "routes|autoroutes|rocade|périphérique", "voiture|automobile",
        "renforcement des liaisons|liaisons|liaisons entre les espaces",
        "*déplacements pendulaires|déplacement pendulaire|migrations pendulaires|navettes|trajets domicile-travail",
        "covoiturage", "LGV|TGV", "+parking relais|parc relais", "+Vélo'v|vélos en libre-service", "+ville du quart d'heure" ] },

    { nom: "La périurbanisation", icone: "↗️", couleur: "#0277bd", angle: 50, paliers: [4, 7, 10],
      mots: [ "*périurbanisation", "*installation de nouveaux habitants dans les périphéries|installation de nouveaux habitants|nouveaux habitants|installation en périphérie",
        "*éloignement du lieu de travail|éloignement domicile-travail|éloignement", "périphéries|périphérie",
        "lotissements|lotissement", "maisons individuelles", "développement d'activités urbaines", "+néo-ruraux|néoruraux",
        "+exode urbain" ] },

    /* ======================= L'ÉTALEMENT URBAIN ======================= */
    { nom: "L'étalement urbain", icone: "🧱", couleur: "#8d6e63", angle: 95, paliers: [5, 9, 13],
      mots: [ "*étalement urbain|étalement", "extension de la ville vers les périphéries|extension de la ville|extension de l'espace urbanisé|extension de l'espace bâti",
        "espaces ruraux|campagne", "manifestation de la périurbanisation" ],
      sousThemes: [
        { nom: "Formes de l'étalement urbain", reveler: ["formes", "formes de l'étalement"],
          mots: [ "*lotissements|lotissement", "maisons individuelles", "habitat pavillonnaire|pavillons|pavillon",
            "*zones commerciales|zone commerciale|centres commerciaux|centre commercial|hypermarchés",
            "zones d'activités en périphérie|zones d'activités|zone d'activités|zone industrielle" ] },
        { nom: "Causes de l'étalement urbain", reveler: ["causes", "causes de l'étalement", "pourquoi"],
          mots: [ "*recherche d'un logement moins cher|logement moins cher|logements moins chers",
            "maison avec jardin|jardin|recherche d'un cadre de vie meilleur|cadre de vie meilleur", "cadre de vie",
            "concentration des emplois et services dans les villes|concentration des emplois en ville|emplois en ville",
            "amélioration des moyens de transport|amélioration des transports|transports plus rapides" ] },
        { nom: "Conséquences de l'étalement urbain", reveler: ["conséquences", "conséquences de l'étalement", "effets"],
          mots: [ "augmentation de la distance domicile-travail|distance domicile-travail",
            "*déplacements pendulaires|déplacement pendulaire|migrations pendulaires|navettes",
            "embouteillages|bouchons|trafic", "temps de transport|temps de trajet",
            "*artificialisation des sols|artificialisation|bétonisation|sols artificialisés",
            "recul des espaces agricoles et naturels|recul des terres agricoles|disparition des terres agricoles",
            "impacts environnementaux|pollution|environnement", "développement des infrastructures|infrastructures",
            "coûts pour les collectivités|coûts importants", "+ZAN|zéro artificialisation nette" ] }
      ] },

    /* ======================= LES ACTEURS ======================= */
    { nom: "Les acteurs", icone: "👥", couleur: "#546e7a", angle: -125, paliers: [5, 9, 13],
      mots: [ "acteurs|acteurs de l'aire urbaine", "aménagement|aménager|aménagent", "transformer|transforment" ],
      sousThemes: [
        { nom: "Pouvoirs publics", essentiel: true, reveler: ["pouvoir public", "puissance publique"],
          mots: [ "*collectivités territoriales|collectivités|collectivité territoriale", "commune|communes|mairie|maire",
            "département|conseil départemental", "région|conseil régional", "État",
            "aménager le territoire|aménagement du territoire", "construire des équipements|équipements publics",
            "organiser les transports", "intercommunalité", "+PLU|plan local d'urbanisme" ] },
        { nom: "Entreprises et promoteurs immobiliers", essentiel: true, reveler: ["entreprises", "promoteurs immobiliers",
            "promoteurs", "promoteur immobilier", "entreprise"],
          mots: [ "implantent des activités|implantation d'activités", "construisent des logements|construction de logements",
            "bureaux", "investisseurs" ] },
        { nom: "Habitants", essentiel: true, reveler: ["ménages", "habitant", "population"],
          mots: [ "choix du lieu de vie|choisir son lieu de vie|choisissent leur lieu de vie", "prix",
            "participent aux dynamiques urbaines", "associations d'habitants|associations", "citoyens" ] }
      ] }
  ]
};
