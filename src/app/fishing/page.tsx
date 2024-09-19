'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActivityUpdater from '../../utils/activityUpdater';
import { UserInventory } from '../../entities/userInventory';
import { CurrentActivity } from '@/entities/currentActivity';
import { Item } from '@/entities/item'
 

const fishingSpots = [
  {
    name: 'Crystal Lake',
    fishes: ['Rainbow Trout', 'Salmon', 'Cod', 'Golden Fish'],
    secsToAc: 2
  },
  {
    name: 'Enchanted River',
    fishes: ['Arapaima', 'Peacock Bass', 'Surubim'],
    secsToAc: 4
  },
  {
    name: 'Deep Sea',
    fishes: ['Tuna', 'Swordfish', 'White Marlin', 'Shark'],
    secsToAc: 6
  },
];


export default function Fishing() {
  const [inventory, setInventory] = useState<UserInventory>({items: [], limit: 5});
  const [currentActivity, setCurrentActivity] = useState<CurrentActivity | null>(null);
  const router = useRouter();
  

  const handleFishingClick = (activity: CurrentActivity) => {
    if (currentActivity) {

      setCurrentActivity(null);
    } else {

      setCurrentActivity(activity);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Fishing Page</h1>
      
      {inventory && <p>Peixes pescados: {inventory.items.join(', ')}</p>}
      
      {/* Componente que atualiza o inventário */}
      <ActivityUpdater 
        activity={currentActivity} 
        startTime={Math.floor(Date.now() / 1000)} 
        updateInventory={setInventory}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {fishingSpots.map((spot) => (
          <div 
            key={spot.name} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            style={{ minHeight: '300px', maxHeight: '350px' }}
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{spot.name}</h2>
            <ul className="list-disc pl-5 mb-4 flex-grow">
              {spot.fishes.map((fish) => (
                <li key={fish}>{fish}</li>
              ))}
            </ul>
            <h6 className="text-lg font-bold text-white-400 mb-4 text-center">Time to fish: {spot.secsToAc} secs</h6>
            
            <div className="flex justify-center">
              <button 
                className={`${
                  currentActivity?.name === spot.name
                    ? 'bg-red-500 hover:bg-red-700'
                    : 'bg-green-500 hover:bg-green-700'
                } text-white font-bold py-2 px-4 rounded`} 
                onClick={() => handleFishingClick({ index: 'fishing', name: spot.name, secsToAc: spot.secsToAc, startTime: Math.floor(Date.now() / 1000), item: { index: spot.fishes[0], name: spot.fishes[0], type: 'fish', quantity: 5 }})}
              >
                {currentActivity?.name === spot.name ? 'Stop Fishing' : 'Fish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
