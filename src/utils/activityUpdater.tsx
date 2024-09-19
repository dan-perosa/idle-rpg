import { useEffect, useState } from 'react';
import { CurrentActivity } from '@/entities/currentActivity';


export default function ActivityUpdater({ activity, startTime, updateInventory }) {
  const [elapsedTime, setElapsedTime] = useState(0);  // Tempo decorrido em segundos

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Pega o timestamp atual em segundos
      const timePassed = currentTime - startTime; // Calcula o tempo que passou desde que a pesca começou
      setElapsedTime(timePassed);

      // Calcula quantos peixes foram pescados baseado no tempo passado e no tempo necessário por peixe
      let fishCount = 0
      if (activity) {
          fishCount = Math.floor(timePassed / activity.secsToAc);
      }

      // Atualiza o inventário com a quantidade de peixes pescados
      updateInventory(fishCount);
    }, 1000); // Atualiza a cada 1 segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [activity, startTime, updateInventory]);

  return null; // Esse componente não precisa renderizar nada
}
