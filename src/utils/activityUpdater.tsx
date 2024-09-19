import { useEffect, useState } from 'react';
import { CurrentActivity } from '@/entities/currentActivity';
import { UserInventory } from '@/entities/userInventory';

interface ActivityUpdaterProps {
  activity: CurrentActivity | null; // ou use a interface correspondente
  startTime: number;
  updateInventory: (inventory: UserInventory) => void;
}

export default function ActivityUpdater({ activity, startTime, updateInventory }: ActivityUpdaterProps) {
  const [inventory, setInventory] = useState<UserInventory>({items: [], limit: 5});
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Pega o timestamp atual em segundos
      const timePassed = currentTime - startTime; // Calcula o tempo que passou desde que a pesca começou
      setElapsedTime(timePassed);
      
      if (activity) {
        if (timePassed >= activity.secsToAc) {
          const lastTimeUpdated = Math.floor(Date.now() / 1000);
          setInventory(prev => {
            return { ...prev, items: [...prev.items, activity.item] }
          })
        }
      }
    }, 500);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [activity, startTime, updateInventory]);

  return null; // Esse componente não precisa renderizar nada
}
