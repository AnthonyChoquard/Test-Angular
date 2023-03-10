# Test-Angular

## Lancer l'application

Pour pouvoir lancer l'application en local:
- cloner le repo
- checkout la branche main
- lancer un npm install dans le dossier Test-Angular/reporting_app
- lancer un ng serve dans le dossier Test-Angular/reporting_app
- ouvrir un navigateur et se rendre sur l'url http://localhost:4200/ sauf si une url différente est spécifiée dans la console lors du ng serve

## Explications des choix technico-fonctionnels

- Utilisation de la librairie Angular Materials pour la plupart des composants utilisés dans le HTML de ce test, et ce afin de profiter des composants offert par l'api notamment pour les snackbar servant aux alertes qui log les résultats des différentes request à la base de données (réussite comme échec) et aux mat form field ainsi qu'à tout les composant d'input (mat-select mat-input et mat-datepicker) pour gérer facilement le form permettant de créer et de mettre à jour les signalements et profiter de toutes les fonctionnalités associées à ces composants

- Utilisation de bootstrap pour une majorité du style de l'application. J'ai préféré utiliser bootstrap pour la mise en page des composant, notamment le form pour la création des signalements, avec l'utilisation des row, des col et des autres classes misent à disposition par bootstrap pour rapidement organiser la page et obtenir un affichage cohérent.

- Utilisation de l'api HttpClientInMemoryWeb pour simuler une base de données qui s'occupe d'intercepter les requêtes http effectuées par le reporting services (put, post et get), et de stocker ou de renvoyer selon la requête, les éléments dans les bases de données du service.

- Création de deux bases de données, une pour les reportings (lire et stocker) ainsi qu'une pour les observations qui ne sert qu'à être lu pour garnir la liste des observations disponibles à associer à un reporting lors de sa création

- Le système de Filtre est un bonus, j'avais envie de continuer à améliorer l'application en y ajoutant des fonctionnalités qui avaient du sens à mes yeux pour simplifier l'utilisation de l'app par les utilisateurs. Le système de filtre peut être amélioré notamment au niveau du composant de filtre et du fonctionnement des méthodes permettant de filtrer, mais je n'ai pas eu beaucoup de temps pour travailler dessus...

- Pour ce qui est de la partie questionnaire, j'ai choisi d'utiliser un reactiv form qui, couplé au composant de la librairie Angular materials, permet de faire assez rapidement des formulaires, avec un lien simple entre l'html et le ts pour récupérer les infos des différents champs. Les réactiv forms permettent de plus d'ajouter de la form validations, avec des validators préconçus, ou customisé, afin de respecter les contraintes imposées pour chaque champ et d'accéder a toutes les informations de chaque form control (valeur, erreur, si celui-ci est valide ou non) constituant le formulaire. Enfin les form group offrent un certain nombre de fonctions permettant de gérer le formulaire comme notamment la possibilité de le réinitialiser et donc de vider instantanément tous les champs qui le composent quand le signalement a été créé. Pour améliorer encore l'app, il est possible de récupérer les erreurs et d'utiliser des mat error pour notifier l'utilisateur de la raison pour lequel l'input n'est pas valide ce qui améliore l'ux (c'est une des premières choses que j'ajouterais si je devais continuer ce dev).

- Pour les choix des inputs, la date de naissance utilise un date picker dont l'input a été désactivé afin que le seul moyen de le remplir soit de passer par le calendrier. Le calendrier a une date maximale et une date minimales possible afin que l'âge ne puisse pas être une date future, et ne puisse pas excéder les 100 ans.
J'ai d'ailleurs utiliser les moment pour ce qui est des dates, les moment offrant une sélection de méthode pratique pour la gestion des dates (notamment subtract pour calculer la limit maximale du calendrier pour les 100 ans). Pour la description, j'ai utilisé une text area pour permettre a l'utilisateur de pouvoir détailler précisément le problème a la source de son signalement. Enfin, pour les observations, j'ai trouvé qu'un mat select permettant de choisir plusieurs observations serait une solution adéquate. En effet passer par ce composant permet à l'utilisateur de choisir plusieurs de ces observations et de toutes les ajouter au signalement. (cette même multi selection permet à l'utilisateur de filtrer les signalements dans la liste pour ne faire apparaître que les signalements correspondant aux observations sélectionnées).

- Enfin, pour la modification d'un reporting, j'ai choisi de réutiliser le form qui sert à la création. En effet, pour créer un signalement, l'utilisateur a déjà pu interagir une première fois avec ce form et donc se familiariser avec, ainsi, il peut aisément modifier le signalement et enregistrer les différences avec une requête put. Afin de dialoguer facilement entre les composant et le service, j'ai choisis de passer par un behavior subject. De cette manière, je peux next l'id du reporting a modifier, changer le tab actuellement affiché pour revenir sur le form automatiquement et dans le composant s'occupant de gérer le form, et dans lequel j'ai subscribe au behavior subject, je récupère l'id du signalement a modifier, je récupère le signalement en question avec une requête http get by id, et je rempli les champs avec les infos du signalement. Quand l'utilisateur a fini de faire ces modifications, il peut les enregistrer avec le bouton update (qui remplace send dans un flow de modification)
