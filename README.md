# INSSAT Frontend

Partie frontend de l'intranet pour l'École Nationale Supérieure des Sciences Appliquées et de Technologie (ENSSAT). Ce projet est construit avec React et Redux, assurant une interface utilisateur réactive et performante.

## Installation

Pour installer et exécuter ce projet localement, suivez les étapes ci-dessous.

### 1. Clonez le répertoire

```shell
git clone https://github.com/votreusername/inssat-frontend.git
```

### 2. Naviguez vers le dossier du projet

```shell
cd inssat-frontend
```

### 3. Installez les dépendances

Assurez-vous d'avoir Node.js et npm installés avant cette étape.

### `npm install`

### 4. Démarrez l'application

### `npm start`

L'application sera lancée et accessible via http://localhost:3000/ ou un autre port disponible.

## Structure du Projet

La structure du projet est organisée comme suit :

- **src/actions/** - Contient les créateurs d'actions Redux.
- **src/assets/** - Contient les images et autres ressources
- **src/components/** - Contient les composants React.
- **src/navigation/** - Contient les fichiers de routage.
- **src/reducers/** - Contient les réducteurs Redux.
- **src/store/** - Contient le store Redux.
- **src/tests/** - Contient les fichiers tests de l'application.
- **src/index.js** - Le point d'entrée principal de l'application.

## Conventions de Nommage

Pour assurer la cohérence et la lisibilité du code, nous suivons la convention de nommage 'camelCase'. Voici les détails spécifiques :

### Dossiers

Les noms des dossiers doivent commencer par une lettre minuscule et suivre la convention 'camelCase'.

- Exemple : `helloWorld`

### Fichiers

Les noms de fichiers (surtout les composants React et les modules TypeScript) doivent commencer par une lettre majuscule, également en respectant la convention 'camelCase'.

- Exemples :
    - `HelloWorld.tsx`
    - `HelloWorld.ts`

En suivant ces conventions, nous nous assurons que le code est facile à lire et à comprendre, et que tous les développeurs travaillant sur ce projet ont une expérience cohérente.


## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Committez vos modifications (`git commit -m 'Ajouter une incroyable fonctionnalité'`).
4. Poussez la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.