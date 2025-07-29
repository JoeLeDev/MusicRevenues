import React, { useState } from 'react';
import {
  Music,
  Wallet,
  Mic,
  Crown,
  Disc3,
  MicVocal,
  Rocket,
  Menu,
  X,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';

const contractOptions = [
  {
    label: 'Major (Universal, Sony...)',
    value: 'major',
    icon: <Crown className="w-4 h-4 text-yellow-500" />,
  },
  {
    label: 'Label Indépendant',
    value: 'indie',
    icon: <Disc3 className="w-4 h-4 text-blue-500" />,
  },
  {
    label: 'Auto-production',
    value: 'auto',
    icon: <Rocket className="w-4 h-4 text-green-500" />,
  },
];

export default function MusicRevenueSimulator() {
  const [streams, setStreams] = useState(0);
  const [contract, setContract] = useState('major');
  const [showContracts, setShowContracts] = useState(false);

  // Tournée personnalisée
  const [concerts, setConcerts] = useState(0);
  const [cachetBrut, setCachetBrut] = useState(0);

  const getSpotifyRevenue = () => {
    const revenue = 3500 * (streams / 1000000);
    switch (contract) {
      case 'major':
        return revenue * 0.12;
      case 'indie':
        return revenue * 0.5;
      case 'auto':
        return revenue * 0.9;
      default:
        return 0;
    }
  };

  const getTourRevenue = () => {
    const totalNet = concerts * cachetBrut;

    switch (contract) {
      case 'major':
        return totalNet * 0.12;
      case 'indie':
      case 'auto':
        return totalNet;
      default:
        return 0;
    }
  };

  const getOtherRevenues = () => {
    const tour = getTourRevenue();
    return tour;
  };

  const totalRevenue = getSpotifyRevenue() + getOtherRevenues();

  const getContractLabel = (contractValue) => {
    const option = contractOptions.find(opt => opt.value === contractValue);
    return option ? option.label : contractValue;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Simulateur de Revenus Musicaux', 20, 30);
    
    // Date
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 20, 45);
    
    // Informations de base
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Paramètres', 20, 65);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Streams Spotify: ${streams.toLocaleString('fr-FR')}`, 20, 80);
    doc.text(`Type de contrat: ${getContractLabel(contract)}`, 20, 95);
    doc.text(`Nombre de concerts: ${concerts}`, 20, 110);
    doc.text(`Cachet brut par concert: ${cachetBrut.toLocaleString('fr-FR')} €`, 20, 125);
    
    // Calculs
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Revenus estimés', 20, 150);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Revenus Spotify: ${getSpotifyRevenue().toFixed(2)} €`, 20, 165);
    doc.text(`Revenus tournée: ${getTourRevenue().toFixed(2)} €`, 20, 180);
    
    // Total
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total estimé: ${totalRevenue.toFixed(2)} €`, 20, 200);
    
    // Note de bas de page
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Ce simulateur est à titre indicatif et ne remplace pas un conseil juridique ou fiscal.', 20, 220);
    doc.text('Les taux de rémunération peuvent varier en fonction des contrats et des conditions commerciales.', 20, 230);
    
    // Sauvegarde du PDF
    doc.save('simulateur-revenus-musicaux.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col dark:bg-gray-900 ">
       <h1 className="text-2xl text-gray-900  font-bold sm:text-4xl dark:text-white">Simulateur de Revenus Musicaux</h1>
       <p className="text-sm text-gray-500 sm:text-lg sm:w-2/3 text-center dark:text-white">Simulez vos revenus musicaux en fonction de votre contrat, de vos streams Spotify, de vos concerts et de vos frais.</p>
    <div className="max-w-xl mx-auto mt-10 justify-center p-6 rounded-2xl shadow-xl  text-gray-900 border-5 border-gray-200 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-6 h-6 text-gray-900 dark:text-white" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Simulateur de Revenus Musicaux</h1>
      </div>

      <label className="block mb-2 font-semibold">Nombre de streams Spotify</label>
      <input
        type="number"
        className="w-full p-2 rounded-lg border dark:bg-gray-800"
        value={streams}
        placeholder="Veuillez entrer le nombre d'auditeurs sur Spotify de l'artiste"
        onChange={(e) => setStreams(parseInt(e.target.value))}
        min={0}
        />

      <label className="block mt-4 mb-2 font-semibold">Type de contrat</label>
      <button
        onClick={() => setShowContracts(!showContracts)}
        className="md:hidden flex items-center gap-2 mb-2 text-sm text-blue-600"
        >
        {showContracts ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        {showContracts ? 'Fermer les options' : 'Afficher les options'}
      </button>

      <div className={`w-full p-2 rounded-lg border dark:bg-gray-800 space-y-1 ${showContracts ? 'block' : 'hidden'} md:block`}>
        {contractOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contract"
              value={option.value}
              checked={contract === option.value}
              onChange={() => setContract(option.value)}
              className="accent-blue-500"
              />
            {option.icon}
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <label className="flex items-center gap-2 font-semibold"><MicVocal className="w-4 h-4 text-gray-900 dark:text-white" /> Tournée personnalisée</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Nombre de concerts</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border dark:bg-gray-800"
              value={concerts}
              placeholder="Nombre de concerts"
              onChange={(e) => setConcerts(parseInt(e.target.value))}
              min={0}
              />
          </div>
          <div>
            <label className="text-sm">Cachet brut par concert (€)</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border dark:bg-gray-800"
              value={cachetBrut}
              placeholder="Cachet brut par concert"
              onChange={(e) => setCachetBrut(parseInt(e.target.value))}
              min={0}
              />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="flex items-center gap-2"><Wallet className="w-5 h-5" /> Revenus Spotify : <strong>{getSpotifyRevenue().toFixed(2)} €</strong></p>
        <p className="flex items-center gap-2"><Mic className="w-5 h-5" /> Tournée : <strong>{getTourRevenue().toFixed(2)} €</strong></p>
        <hr className="my-4" />
        <p className="text-xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-green-500" />
          Total estimé : <span className="text-green-500">{totalRevenue.toFixed(2)} €</span>
        </p>
        </div>
        <div className="flex items-center gap-2 mt-5">

        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => window.location.reload()}>
          Reinitialiser les valeurs
        </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => {
                const data = {
                    streams,
                    contract,
                    concerts,
                    cachetBrut,
                    totalRevenue
                };
                const json = JSON.stringify(data);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.json';
                a.click();
                URL.revokeObjectURL(url);
            }}>
        Exporter les données</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={exportToPDF}>
          <FileText className="w-5 h-5 mr-2" /> Exporter en PDF
        </button>
        </div>
    </div>
    <p className="text-sm text-gray-500 sm:text-lg sm:w-2/3 text-center dark:text-white mt-10 2xl:w-1/2">
    Ce simulateur est à titre indicatif et ne remplace pas un conseil juridique ou fiscal. Les taux de rémunération peuvent varier en fonction des contrats, des régions et des conditions commerciales.
    Les revenus SACEM ne sont pas intégrés dans ce simulateur car ils dépendent :
    <ul className="list-disc list-inside">
      <li>du rôle de l’artiste (auteur/compositeur)</li>
      <li>de l’éditeur éventuel</li>
      <li>des titres réellement monétisés</li>
      <li>des déclarations aux organismes</li>
    </ul>
    <p>La SACEM reverse en moyenne 300–800 € par million de streams pour un auteur-compositeur.</p>
    </p>
</div>
  );
}
