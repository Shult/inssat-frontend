import { useState } from "react";

export function getButtonColor(impression : string){
    switch (impression) {
        case 'Excellent':
            return '#4caf50';
        case 'Très bien':
            return '#90ee90';
        case 'Bien':
            return '#2196f3';
        case 'Assez bien':
            return '#ffc107';
        case 'Passable':
            return '#ff9800';
        case 'Insuffisant':
            return '#f44336';
        case 'Non évaluable':
            return '#889795';
        // Ajoutez des cas pour les autres valeurs
        default:
            return '#BF9E4E';
    }

}

export function getButtonColorById(levelId : number){
    switch (levelId) {
        case 1:
            return '#4caf50';
        case 2:
            return '#90ee90';
        case 3:
            return '#2196f3';
        case 4:
            return '#ffc107';
        case 5:
            return '#ff9800';
        case 6:
            return '#f44336';
        case 7:
            return '#889795';
        // Ajoutez des cas pour les autres valeurs
        default:
            return '#BF9E4E';
    }

}