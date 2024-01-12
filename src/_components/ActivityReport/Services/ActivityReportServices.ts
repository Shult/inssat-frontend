import { useState } from "react";

export function getButtonColor(impression : string){
    const [dropdownBackground, setDropdownBackground] = useState('#889795'); // Ajout de l'état pour la couleur de fond

    switch (impression) {
        case 'Excellent':
            setDropdownBackground('#4caf50');
            break;
        case 'Très bien':
            setDropdownBackground('#90ee90');
            break;
        case 'Bien':
            setDropdownBackground('#2196f3');
            break;
        case 'Assez bien':
            setDropdownBackground('#ffc107');
            break;
        case 'Passable':
            setDropdownBackground('#ff9800');
            break;
        case 'Insuffisant':
            setDropdownBackground('#f44336');
            break;
        case 'Non évaluable':
            setDropdownBackground('#889795');
            break;
        // Ajoutez des cas pour les autres valeurs
        default:
            setDropdownBackground('#BF9E4E');
    }

}