/* =====================================================================
   CARTE MENTALE — 3e, Histoire, chapitre 2b : La France des années 1930
   ---------------------------------------------------------------------
   Contenu du chapitre seulement ; le fonctionnement est dans moteur.js.
   Mode d'emploi complet : voir l'en-tête de chapitre-3e-H1.js.
     *mot = idée essentielle 🔑 (les étoiles ★ sont calculées dessus)
     +mot = pépite 💎      a|b = variantes d'une même idée
     essentiel: true dans un sous-thème = le nom de la bulle est une idée 🔑
   ===================================================================== */
const CONFIG = {
  id: "3e-H2b-france-annees-1930",
  exemplePhrase: "Les ouvriers obtiennent des congés payés grâce au Front populaire, qui gagne les élections de 1936.",
  objectifPhrases: 3,
  definitions: {
    "démocratie": "Régime où le peuple choisit ses dirigeants par des élections libres et où les libertés sont garanties.",
    "krach boursier de Wall Street": "Effondrement de la Bourse de New York en octobre 1929 : c'est le début de la crise.",
    "chômage et misère": "Conséquences de la crise : beaucoup d'ouvriers perdent leur travail et s'appauvrissent.",
    "6 février 1934": "Jour où des ligues d'extrême droite manifestent violemment à Paris contre la République.",
    "manifestations des ligues d'extrême droite": "Groupes violents, hostiles à la République, qui défilent dans la rue.",
    "antiparlementarisme": "Rejet des députés et du Parlement, accusés d'être incapables ou corrompus.",
    "Front populaire": "Alliance des partis de gauche qui gagne les élections de 1936.",
    "1936": "Année de la victoire du Front populaire et de ses grandes réformes.",
    "union de trois partis de gauche": "Le Front populaire réunit socialistes, communistes et radicaux.",
    "remporte les élections législatives": "Le Front populaire gagne les élections des députés en mai 1936.",
    "Léon Blum": "Chef de la SFIO, il devient président du Conseil en 1936.",
    "grèves joyeuses": "Grèves et occupations d'usines dans la bonne humeur en juin 1936.",
    "2 semaines de congés payés": "Pour la première fois, les ouvriers ont des vacances payées.",
    "semaine de 40 heures": "La durée du travail est limitée à 40 heures par semaine.",
    "démission de Blum": "Léon Blum quitte le gouvernement en 1937, face aux difficultés.",
    "avril 1938": "Date de la fin du Front populaire.",
    "Crise économique et sociale": "Ce que provoque la crise de 1929 : faillites, chômage, misère.",
    "Crise politique": "La République est contestée et instable dans les années 1930.",
    "Crise internationale": "La montée des dictatures en Europe menace la paix.",
    "SFIO": "Le parti socialiste, dirigé par Léon Blum.",
    "Parti radical": "Parti de gauche modérée, dirigé par Édouard Daladier.",
    "PCF": "Le parti communiste français, dirigé par Maurice Thorez.",
    "Accords de Matignon": "Accords de juin 1936 entre patrons et syndicats : hausse des salaires, droits syndicaux.",
    "Lois sociales": "Lois votées en 1936 pour améliorer la vie des ouvriers.",
    "Fin du Front populaire": "Le Front populaire s'arrête après la démission de Blum et des divisions de la gauche."
  },
  defis: [
    { a: "krach boursier de Wall Street", b: "chômage et misère", question: "Explique comment la crise de 1929 touche la France." },
    { a: "6 février 1934", b: "antiparlementarisme", question: "Montre que la démocratie est menacée en France." },
    { a: "ligues d'extrême droite", b: "Front populaire", question: "Explique pourquoi les partis de gauche s'unissent." },
    { a: "1936", b: "Léon Blum", question: "Explique comment le Front populaire arrive au pouvoir." },
    { a: "grèves joyeuses", b: "Accords de Matignon", question: "Montre que les ouvriers obtiennent de nouveaux droits." },
    { a: "congés payés", b: "40 heures", question: "Montre que le Front populaire améliore la vie des ouvriers." },
    { a: "démission de Blum", b: "avril 1938", question: "Explique comment le Front populaire prend fin." }
  ],
  titre: "La France des années 1930",
  sousTitre: "Une démocratie fragilisée",
  fichier: "H2b-France-annees-1930",
  exemple: "Ex. : krach de Wall Street, 1936, congés payés…",
  consigne: "Écris un mot ou une expression qui te fait penser à la France des années 1930, puis valide. Complète les 3 parties, gagne jusqu'à ★★★ dans chacune et trouve le nom des bulles « ? ». Les idées 🔑 sont essentielles, les 💎 sont des pépites !",
  legende: [
    { label: "1. Le contexte", couleur: "#1f4e9c" },
    { label: "2. L'arrivée du Front populaire", couleur: "#c62828" },
    { label: "3. Grandes mesures et fin", couleur: "#8e1b3a" }
  ],
  afficherPolesCaches: true,
  centreY: 0.42,
  // angle : position du pôle (en degrés : -90 = en haut, 0 = à droite, 90 = en bas, 180 = à gauche)
  poles: [
    /* ======================= 1. LE CONTEXTE ======================= */
    { nom: "1. Le contexte : une démocratie en crise", icone: "📉", couleur: "#1f4e9c", drapeau: true, angle: -150, paliers: [5, 10, 15],
      mots: [ "*démocratie|démocratie fragilisée", "IIIe République|Troisième République|République", "Parlement|députés",
        "années 1930", "crises|les crises" ],
      sousThemes: [
        { nom: "Crise économique et sociale", reveler: ["crise économique", "crise sociale", "crise de 1929", "grande dépression"],
          dates: [ "octobre 1929|1929" ],
          mots: [ "*krach boursier de Wall Street|krach de Wall Street|krach boursier|krach|Wall Street|jeudi noir",
            "*chômage et misère|chômage|misère|chômeurs", "faillites|faillite", "ralentissement industriel",
            "baisse du pouvoir d'achat|pouvoir d'achat", "États-Unis", "pauvreté", "soupes populaires|soupe populaire", "+déflation" ] },
        { nom: "Crise politique", reveler: ["instabilité politique", "crise de la démocratie"],
          dates: [ "*6 février 1934|février 1934" ],
          mots: [ "*manifestations des ligues d'extrême droite|ligues d'extrême droite|ligues|manifestation des ligues",
            "*antiparlementarisme", "émeute", "extrême droite", "instabilité gouvernementale", "Concorde|place de la Concorde",
            "+Croix-de-Feu", "+Action française", "+Stavisky|affaire Stavisky", "+colonel de La Rocque|La Rocque" ] },
        { nom: "Crise internationale", reveler: ["montée des dictatures", "montée des totalitarismes"],
          personnes: [ "Mussolini", "Hitler", "Staline" ],
          dates: [ "1922", "1933" ],
          mots: [ "dictatures", "fascisme|fasciste", "Italie fasciste|Italie", "Allemagne nazie|Allemagne", "nazisme", "URSS",
            "menace de guerre|risque de guerre" ] }
      ] },

    /* ======================= 2. L'ARRIVÉE DU FRONT POPULAIRE ======================= */
    { nom: "2. L'arrivée du Front populaire", icone: "🤝", couleur: "#c62828", angle: -30, paliers: [5, 9, 13],
      mots: [ "*Front populaire", "*1936|année 1936", "*union de trois partis de gauche|union de la gauche|trois partis de gauche|alliance de gauche|coalition de gauche",
        "*remporte les élections législatives|élections législatives|victoire aux élections|élections de 1936",
        "mai 1936", "président du Conseil", "lutte contre le fascisme|antifascisme",
        "*grèves joyeuses|grèves|grèves de juin 1936|occupation des usines", "juin 1936", "Pain, paix, liberté|pain paix liberté",
        "gauche", "partis de gauche" ],
      sousThemes: [
        { nom: "SFIO", essentiel: true, reveler: ["socialistes", "parti socialiste", "socialistes de la SFIO", "socialisme",
            "Section française de l'Internationale ouvrière"],
          personnes: [ "*Léon Blum|Blum" ],
          mots: [ "+premier président du Conseil socialiste" ] },
        { nom: "Parti radical", essentiel: true, reveler: ["radicaux", "radical", "parti radical-socialiste"],
          personnes: [ "Daladier|Édouard Daladier" ] },
        { nom: "PCF", essentiel: true, reveler: ["parti communiste français", "communistes", "parti communiste", "communistes français"],
          personnes: [ "Thorez|Maurice Thorez" ] }
      ] },

    /* ======================= 3. GRANDES MESURES ET FIN ======================= */
    { nom: "3. Grandes mesures et fin", icone: "📜", couleur: "#8e1b3a", angle: 90, paliers: [5, 9, 13],
      mots: [ "nationalisations|nationalisation", "SNCF", "culture et loisirs|loisirs|culture", "auberges de jeunesse",
        "sport|sport pour tous", "réformes|grandes mesures", "+Léo Lagrange", "+billets de train à prix réduit|billets congés payés",
        "+Office du blé", "+Banque de France" ],
      sousThemes: [
        { nom: "Accords de Matignon", essentiel: true, reveler: ["Matignon", "accords Matignon"],
          dates: [ "7 juin 1936" ],
          mots: [ "hausse des salaires|hausses salariales|augmentation des salaires",
            "reconnaissance des syndicats|syndicats|droit syndical", "conventions collectives", "patronat", "délégués du personnel" ] },
        { nom: "Lois sociales", reveler: ["réformes sociales", "avancées sociales", "mesures sociales"],
          mots: [ "*2 semaines de congés payés|congés payés|deux semaines de congés payés|15 jours de congés payés",
            "*semaine de 40 heures|40 heures|40h|semaine de 40h|semaine de 40 h|semaine de travail à 40h|40 heures par semaine",
            "vacances", "scolarité obligatoire jusqu'à 14 ans|scolarité jusqu'à 14 ans", "+premiers congés payés" ] },
        { nom: "Fin du Front populaire", reveler: ["fin", "échec du Front populaire", "échec"],
          dates: [ "1937", "*avril 1938|1938" ],
          mots: [ "*démission de Blum|démission de Léon Blum", "difficultés économiques", "hausse des prix|inflation",
            "divisions de la gauche|désaccords", "opposition du patronat|patronat hostile", "pause des réformes|pause",
            "Daladier président du Conseil", "+fuite des capitaux", "+dévaluation" ] }
      ] }
  ]
};
