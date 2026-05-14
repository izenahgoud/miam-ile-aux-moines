// evenements.js — Événements de l'Île-aux-Moines
// Format attendu par index.html (BLOC 3 — initEvenements)
//
// Champs obligatoires :
//   nom          : titre de l'événement
//   date_debut   : "AAAA-MM-JJ"  ← affiché si dans les 30 prochains jours
//   date_fin     : "AAAA-MM-JJ"  ← optionnel (même valeur que date_debut si 1 seul jour)
//   lat / lng    : coordonnées GPS (marqueur violet sur la carte)
//   lieu         : nom du lieu
//   acces        : modalités d'accès (bac, parking, etc.)
//
// Champs optionnels :
//   emoji        : icône affichée sur le marqueur et le panneau (défaut : 📅)
//   heure        : ex. "10h00 – 13h00"
//   association  : nom de l'organisateur
//   description  : texte libre
//   image: "https://exemple.fr/photo-regates.jpg",
//   site         : URL (bouton "Site de l'événement")

const EVENEMENTS = [
  {
    nom: "Soirée exceptionnelle Passeurs de Films",
    emoji: "🎬",
    association: "Passeurs de Films, Fête de la mer",
    date_debut: "2026-05-30",
    date_fin:   "2026-05-30",
    heure: "19h30 – 24h00",
    lat: 47.597743,
    lng: -2.844763,
    lieu: "Place du Marché",
    acces: "Entrée libre.Inscription obligatoire pour le dîner 18 € ",
    description: "Inscriptions : Relais des Mousquetaires, Mary Boat Trip, Boulangerie",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Soir%C3%A9e_Passeurs_de_Films.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20260514095334",
    site: "https://www.passeursdefilms.fr/"
  },
  {
    nom: "chorale Harmonie de Plescop",
    emoji: "🎵",
    association: "LALVI",
    date_debut: "2026-06-06",
    date_fin:   "2026-06-06",
    heure: "15h00 – 16h30",
    lat: 47.59890,
    lng: -2.84264,
    lieu: "Eglise Saint Michel",
    acces: "Entrée libre.",
    description: "Programme varié composé de chants sacrés et profanes, classiques et plus contemporains, de France et d'ailleurs.",
    image : "https://www.lacordevocale.org/_bibli/agenda//17379/images/affiche-concert-ile-aux-moines-060626.png",
    site: "https://www.lacordevocale.org/agenda/chorale-harmonie-de-plescop-17379.html"
  },
  {
    nom: "Sortie découverte de l'estran",
    emoji: "🦀",
    association: "Office de tourisme",
    date_debut: "2026-07-04",
    date_fin:   "2026-07-04",
    heure: "9h30 – 12h00",
    lat: 47.5679,
    lng: -2.8598,
    lieu: "Pointe du Trec'h — côte sauvage",
    acces: "Inscription obligatoire à l'office de tourisme. Groupes de 12 max. 5 € adulte, gratuit -12 ans.",
    description: "Exploration des rochers et mares à marée basse avec un guide naturaliste. Bottes recommandées.",
    site: ""
  },
  {
    nom: "Régates de l'Île-aux-Moines",
    emoji: "⛵",
    association: "Club nautique IAM",
    date_debut: "2026-07-18",
    date_fin:   "2026-07-19",
    heure: "10h00 – 17h00",
    lat: 47.5975,
    lng: -2.8395,
    lieu: "Anse de Brouel — côte est",
    acces: "Accès à pied depuis le port (15 min) ou vélo. Entrée libre. Buvette sur place.",
    description: "Course de voiliers classiques dans le Golfe du Morbihan. Spectacle depuis le rivage.",
    image: "https://exemple.fr/photo-regates.jpg",  // ← URL d'une image
  site:  "https://clubnautique-iam.fr",            // ← bouton "Voir le site"
  },
  {
    nom: "Exposition — Peintres de l'île",
    emoji: "🎨",
    association: "Association des artistes IAM",
    date_debut: "2026-07-25",
    date_fin:   "2026-08-09",
    heure: "10h00 – 19h00",
    lat: 47.5958,
    lng: -2.8471,
    lieu: "Salle des fêtes — route de Penhap",
    acces: "Entrée libre. Œuvres en vente.",
    description: "Vernissage et exposition collective de 12 artistes résidents. Peintures, aquarelles et photographies.",
    site: ""
  },
  {
    nom: "Concours de pêche — Jeunes pêcheurs",
    emoji: "🎣",
    association: "Mairie de l'Île-aux-Moines",
    date_debut: "2026-08-01",
    date_fin:   "2026-08-01",
    heure: "8h00 – 12h00",
    lat: 47.5962,
    lng: -2.8471,
    lieu: "Cales du port",
    acces: "Inscription gratuite auprès du gardien du port avant 7h45. Ouvert aux 6-16 ans.",
    description: "Matériel prêté sur place. Remise des prix à 12h avec collation offerte par la mairie.",
    site: ""
  }
];
