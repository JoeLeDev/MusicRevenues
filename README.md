# 🎵 Simulateur de Revenus Musicaux

Un outil web moderne pour simuler les revenus musicaux en fonction des streams Spotify, des concerts et du type de contrat.

## ✨ Fonctionnalités

### 🎯 Calculs Automatiques
- **Revenus Spotify** : Calcul basé sur le nombre de streams et le type de contrat
- **Revenus Tournée** : Estimation selon le nombre de concerts et cachets
- **Graphique interactif** : Camembert en temps réel montrant la répartition des revenus

### 📊 Types de Contrats Supportés
- **Major** (Universal, Sony...) : 12% des revenus
- **Label Indépendant** : 50% des revenus  
- **Auto-production** : 90% des revenus

### 🎨 Interface Moderne
- **Design responsive** : Fonctionne sur mobile, tablette et desktop
- **Mode sombre** : Interface adaptée à tous les environnements
- **Calculs en temps réel** : Mise à jour instantanée des résultats

### 📄 Export Professionnel
- **Export PDF** avec branding personnalisé
- **Logo JoeLeDev** intégré
- **Signature professionnelle** avec liens portfolio

## 🚀 Installation

```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## 🛠️ Technologies Utilisées

- **React 19** - Interface utilisateur
- **Tailwind CSS** - Styling moderne
- **Recharts** - Graphiques interactifs
- **jsPDF** - Génération de PDF
- **Lucide React** - Icônes

## 📱 Utilisation

1. **Saisir les données** :
   - Nom de l'artiste
   - Nombre de streams Spotify
   - Type de contrat
   - Nombre de concerts
   - Cachet par concert

2. **Voir les résultats** :
   - Revenus Spotify calculés
   - Revenus tournée estimés
   - Total des revenus
   - Graphique de répartition

3. **Exporter** :
   - PDF professionnel avec branding
   - Toutes les données incluses

## 🎨 Personnalisation

### Modifier les Taux de Rémunération
```javascript
// Dans src/pages/Music.jsx
const getSpotifyRevenue = () => {
  const revenue = 3500 * (streams / 1000000);
  switch (contract) {
    case 'major': return revenue * 0.12;    // 12%
    case 'indie': return revenue * 0.5;     // 50%
    case 'auto': return revenue * 0.9;      // 90%
  }
};
```

### Changer le Logo
- Remplacer `public/joe.jpg` par votre logo
- Ajuster la taille dans `exportToPDF()`

## 📊 Formules de Calcul

### Revenus Spotify
```
Revenus = (Streams / 1 000 000) × 3500 × Taux_Contrat
```

### Revenus Tournée
```
Revenus = Nombre_Concerts × Cachet_Brut × Taux_Contrat
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Développement local
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Vérification du code
```

## 📄 Licence

Ce projet est développé par [JoeLeDev](https://portfolio-dev-2025.vercel.app/).

## ⚠️ Avertissement

Ce simulateur est à titre indicatif et ne remplace pas un conseil juridique ou fiscal. Les taux de rémunération peuvent varier selon les contrats et conditions commerciales.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

## 📞 Contact

- **Portfolio** : [portfolio-dev-2025.vercel.app](https://portfolio-dev-2025.vercel.app/)
- **GitHub** : [@JoeLeDev](https://github.com/JoeLeDev)

---

**Développé par JoeLeDev**
