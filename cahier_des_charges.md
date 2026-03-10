# Cahier des Charges Détaillé - SyNdongo YANGO (v2.0)

## 1. Contexte et Objectifs
L'application **SyNdongo YANGO** est une plateforme CRM (Customer Relationship Management) et de gestion de flotte VTC. L'objectif principal est d'optimiser le suivi des chauffeurs, de réduire le taux d'attrition (churn), d'améliorer la qualité de service (suivi des notes) et de centraliser toutes les interactions avec les chauffeurs.

## 2. Architecture Technique
*   **Frontend :** React 18, Vite 5, Tailwind CSS pour le styling.
*   **Backend / Base de données :** Firebase Firestore (collection principale : `flotte_store`).
*   **Hébergement :** Render.com.
*   **Gestion d'état :** React Hooks (`useState`, `useEffect`, `useMemo`).

## 3. Fonctionnalités Principales (Existantes & Nouvelles)

### 3.1. Segmentation et Statuts des Chauffeurs (Amélioré)
Les chauffeurs sont classés dynamiquement selon leur activité et leur situation :
*   **Zone Rouge (🚨) :** Inactivité de 7 à 12 jours. Risque d'archivage. Action : Appel obligatoire.
*   **Zone Orange (⚠️) :** Inactivité de 3 à 6 jours. Action : Appel ou SMS.
*   **Nouveau (🎉) :** Récemment inscrits, nécessitent un accompagnement.
*   **Actif (✅) :** Chauffeurs réguliers (0-2 jours d'inactivité).
*   **NOUVEAU - Réactivés (🔄) :** Chauffeurs de retour après plus de 30 jours d'absence. Nécessitent un suivi particulier pour s'assurer de leur rétention.
*   **NOUVEAU - Départs / Autres Parcs (🚪) :** Chauffeurs ayant quitté pour la concurrence. Objectif : Tracer les raisons (panne, meilleure offre, etc.) et planifier des actions de reconquête (Tention de les faire revenir).

### 3.2. Suivi Financier et Blocages
*   **SoldeBar :** Affichage visuel du solde.
*   **Alerte Blocage :** Badge rouge "BLOQUÉ" si le solde est inférieur à la limite autorisée.

### 3.3. NOUVEAU - Suivi de la Qualité (Notes et Comportement)
*   **Alerte Note (⭐) :** Détection automatique des chauffeurs dont la note chute en dessous de **4.5**. Déclenchement d'une alerte de blocage imminent par la plateforme Yango.
*   **Algorithme d'Évolution :** Suivi de la tendance de la note (en hausse, stable, en baisse) sur les dernières semaines.
*   **Comportement Commandes :** Intégration d'un rapport spécifique sur le traitement des commandes (taux d'acceptation, annulations). Création d'une rubrique "Chauffeurs à risque" pour ceux qui se comportent mal avec les commandes.

### 3.4. CRM et Fiche Chauffeur Complète (Vue 360°)
Création d'une page/modale dédiée par chauffeur regroupant :
*   **Informations générales :** Nom, téléphone, véhicule, parc.
*   **Historique des appels (`_callLog`) :** Tous les contacts passés avec les agents.
*   **Évolution de la note :** Graphique ou historique des variations de la note.
*   **NOUVEAU - Suivi des Requêtes / Assistances :** Rubrique type "Ticketing" pour suivre les problèmes en cours (panne, problème de compte, accident) jusqu'à leur résolution.
*   **Commentaires centralisés :** Toutes les notes laissées par les agents.

### 3.5. Communication Multicanale
*   **WhatsApp :** Templates dynamiques selon le statut (Pro, Amical, Urgent).
*   **NOUVEAU - Appels et SMS via Mobile Connect :** Intégration ou facilitation des appels téléphoniques et SMS classiques directement depuis l'interface (via des liens `tel:` et `sms:` ou une API tierce si disponible).

### 3.6. Gestion des Flux de Données (Imports)
L'application doit gérer l'importation de deux types de fichiers (CSV/Excel) :
1.  **Fichier Quotidien (Activité & Soldes) :** Importé **tous les jours**. Met à jour les soldes, les dates de dernière commande, et les statuts d'inactivité.
2.  **Fichier Hebdomadaire (Qualité & Commandes) :** Importé **chaque semaine**. Contient les notes détaillées, le taux d'acceptation, et le taux d'annulation. Met à jour l'algorithme d'évolution des notes et le rapport de comportement.

## 4. Sécurité et Rôles
*   **Super Admin :** Accès total, vue sur tous les parcs, gestion des imports.
*   **Admin Parc (ex: Diagne) :** Vue restreinte à sa flotte.
*   **Agent :** Accès au suivi, passage d'appels, saisie de commentaires.

## 5. Plan d'Action pour le Développement (Prochaines étapes)
1.  **Modélisation des données :** Mettre à jour la structure Firestore pour inclure l'historique des notes, les requêtes d'assistance, et les statistiques de commandes.
2.  **Module d'Importation :** Créer une interface robuste pour importer et fusionner les fichiers quotidiens et hebdomadaires sans écraser l'historique CRM (`_callLog`, commentaires).
3.  **Vue 360° Chauffeur :** Développer le composant `DriverProfileModal` regroupant toutes les nouvelles rubriques.
4.  **Algorithme de Qualité :** Implémenter la logique de détection des baisses de notes (< 4.5) et des mauvais comportements.
5.  **Filtres et Vues :** Ajouter les onglets "Réactivés", "Départs (Concurrence)", et "Alertes Qualité".
