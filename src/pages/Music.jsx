import React, { useState } from 'react';
import {
  Music,
  Wallet,
  Mic,
  ScrollText,
  Shirt,
  Crown,
  Disc3,
  Rocket,
  Menu,
  X
} from 'lucide-react';

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
  const [streams, setStreams] = useState(1000000);
  const [contract, setContract] = useState('auto');
  const [showContracts, setShowContracts] = useState(false);

  // Tournée personnalisée
  const [concerts, setConcerts] = useState(10);
  const [cachetBrut, setCachetBrut] = useState(1500);
  const [fraisPourcentage, setFraisPourcentage] = useState(30);

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
    const netPerConcert = cachetBrut * (1 - fraisPourcentage / 100);
    const totalNet = concerts * netPerConcert;

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

  const getSacemRevenue = () => {
    switch (contract) {
      case 'major':
        return 600 * 0.12;
      case 'indie':
      case 'auto':
        return 600;
      default:
        return 0;
    }
  };

  const getOtherRevenues = () => {
    const tour = getTourRevenue();
    const sacem = getSacemRevenue();
    const merch = contract === 'major' ? 500 : 1000;
    return tour + sacem + merch;
  };

  const totalRevenue = getSpotifyRevenue() + getOtherRevenues();

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Simulateur de Revenus Musicaux</h1>
      </div>

      <label className="block mb-2 font-semibold">Nombre de streams Spotify</label>
      <input
        type="number"
        className="w-full p-2 rounded-lg border dark:bg-gray-800"
        value={streams}
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
        <label className="block font-semibold">🎤 Tournée personnalisée</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Nombre de concerts</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border dark:bg-gray-800"
              value={concerts}
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
              onChange={(e) => setCachetBrut(parseInt(e.target.value))}
              min={0}
            />
          </div>
          <div>
            <label className="text-sm">% de frais (logistique, équipe…)</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border dark:bg-gray-800"
              value={fraisPourcentage}
              onChange={(e) => setFraisPourcentage(parseInt(e.target.value))}
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="flex items-center gap-2"><Wallet className="w-5 h-5" /> Revenus Spotify : <strong>{getSpotifyRevenue().toFixed(2)} €</strong></p>
        <p className="flex items-center gap-2"><Mic className="w-5 h-5" /> Tournée : <strong>{getTourRevenue().toFixed(2)} €</strong></p>
        <p className="flex items-center gap-2"><ScrollText className="w-5 h-5" /> SACEM : <strong>{getSacemRevenue().toFixed(2)} €</strong></p>
        <p className="flex items-center gap-2"><Shirt className="w-5 h-5" /> Merchandising : <strong>{contract === 'major' ? '500' : '1000'} €</strong></p>
        <hr className="my-4" />
        <p className="text-xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-green-500" />
          Total estimé : <span className="text-green-500">{totalRevenue.toFixed(2)} €</span>
        </p>
      </div>
    </div>
  );
}
