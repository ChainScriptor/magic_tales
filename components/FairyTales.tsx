import React, { useState } from 'react';
import FairyTaleReader from './FairyTaleReader';

interface FairyTale {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pages: FairyTalePage[];
}

interface FairyTalePage {
  pageNumber: number;
  text: string;
  illustration: string;
  protagonistPosition?: { x: number; y: number; width: number; height: number };
}

// Sample fairy tales data
const sampleFairyTales: FairyTale[] = [
  {
    id: '1',
    title: 'Η Μαγική Περιπέτεια',
    description: 'Μια μαγική ιστορία γεμάτη περιπέτειες και φαντασία',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    pages: [
      {
        pageNumber: 1,
        text: 'Σε μια μακρινή γη, ζούσε ένα μικρό παιδί που είχε ένα μεγάλο όνειρο...',
        illustration: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop',
        protagonistPosition: { x: 50, y: 40, width: 200, height: 250 }
      },
      {
        pageNumber: 2,
        text: 'Ένα πρωί, το παιδί βρήκε μια μαγική πόρτα που οδηγούσε σε έναν κόσμο φαντασίας...',
        illustration: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
        protagonistPosition: { x: 300, y: 50, width: 200, height: 250 }
      },
      {
        pageNumber: 3,
        text: 'Στον κόσμο αυτό, συνάντησε φίλους που τον βοήθησαν στην περιπέτειά του...',
        illustration: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop',
        protagonistPosition: { x: 100, y: 200, width: 200, height: 250 }
      },
      {
        pageNumber: 4,
        text: 'Και έτσι, με τη βοήθεια των φίλων του, το παιδί κατάφερε να κάνει το όνειρό του πραγματικότητα!',
        illustration: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
        protagonistPosition: { x: 250, y: 150, width: 200, height: 250 }
      }
    ]
  },
  {
    id: '2',
    title: 'Το Κρυμμένο Θησαυρό',
    description: 'Μια συναρπαστική αναζήτηση για έναν μαγικό θησαυρό',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    pages: [
      {
        pageNumber: 1,
        text: 'Σε ένα παλιό χάρτη, ένα παιδί ανακάλυψε το μυστικό ενός κρυμμένου θησαυρού...',
        illustration: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop',
        protagonistPosition: { x: 150, y: 100, width: 200, height: 250 }
      },
      {
        pageNumber: 2,
        text: 'Η αναζήτηση οδήγησε το παιδί σε μαγικά μέρη και απίθανες συναντήσεις...',
        illustration: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
        protagonistPosition: { x: 200, y: 180, width: 200, height: 250 }
      },
      {
        pageNumber: 3,
        text: 'Και τελικά, με σοφία και θάρρος, βρήκε τον θησαυρό που άλλαξε τη ζωή του για πάντα!',
        illustration: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop',
        protagonistPosition: { x: 300, y: 120, width: 200, height: 250 }
      }
    ]
  }
];

const FairyTales: React.FC = () => {
  const [selectedTale, setSelectedTale] = useState<FairyTale | null>(null);
  const [childPhoto, setChildPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChildPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (selectedTale) {
    return (
      <FairyTaleReader
        fairyTale={selectedTale}
        childPhoto={childPhoto}
        onBack={() => setSelectedTale(null)}
        onPhotoUpload={handlePhotoUpload}
      />
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Τα <span className="text-everyone">Παραμύθια</span> μας
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Επιλέξτε ένα παραμύθι και μετατρέψτε το παιδί σας στον πρωταγωνιστή!
        </p>
      </div>

      {/* Photo Upload Section */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Φωτογραφία Παιδιού</h3>
          <p className="text-gray-600 mb-6">
            Ανέβαστε μια φωτογραφία του παιδιού σας για να γίνει ο πρωταγωνιστής του παραμυθιού
          </p>
          <div className="flex items-center gap-6">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="px-6 py-3 bg-gradient-to-r from-[#1a47ff] to-[#0019ff] text-white rounded-xl font-semibold hover:opacity-90 transition-all">
                {childPhoto ? 'Αλλαγή Φωτογραφίας' : 'Ανέβασμα Φωτογραφίας'}
              </div>
            </label>
            {childPhoto && (
              <div className="relative">
                <img
                  src={childPhoto}
                  alt="Child photo"
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#1a47ff]"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fairy Tales Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleFairyTales.map((tale) => (
          <div
            key={tale.id}
            className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedTale(tale)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={tale.coverImage}
                alt={tale.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">{tale.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{tale.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {tale.pages.length} σελίδες
                </span>
                <button className="px-5 py-2 bg-gradient-to-r from-[#1a47ff] to-[#0019ff] text-white rounded-lg font-semibold hover:opacity-90 transition-all">
                  Διάβασε
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FairyTales;








