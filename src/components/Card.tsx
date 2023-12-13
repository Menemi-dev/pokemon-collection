import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonItem, IonLabel, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import { capitalize } from '../ApiUtils';

const PokeCard = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState('');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then((response) => response.json())
    .then((data) => {
      setPokemonData(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);

  let abilities = [];
  if ( pokemonData.abilities != null ){
    Object.entries( pokemonData.abilities ).forEach(( ability ) => {
      const [_, value] = ability;
      const hidden = value.is_hidden ? '(H)' : '';
      abilities.push(
        <p key={pokemonData.id + value.ability.name + hidden}>
          { capitalize( value.ability.name )} { hidden }
        </p>
      );
    });
  }

  let image = '';
  if ( pokemonData.sprites != null ){
    if( pokemonData.sprites.other != null
      && pokemonData.sprites.other['official-artwork'] != null
      && pokemonData.sprites.other['official-artwork'].front_default != null ){
      image = pokemonData.sprites.other['official-artwork'].front_default;
    } else {
      image = pokemonData.sprites.front_default;
    }
  }

  return (
    <IonCard>
      <IonImg src={ image } alt={ pokemonData.name }></IonImg>
      <IonCardHeader color="light">
        <IonCardTitle>{ capitalize( pokemonData.name )}</IonCardTitle>
        <IonCardSubtitle>Exp. { pokemonData.base_experience || 0 }</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
      <IonList lines="full">
        <IonItem>
          <IonLabel>
            <h3>Height</h3>
            <p>{ pokemonData.height || 0 }</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Weight</h3>
            <p>{ pokemonData.weight || 0 }</p>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <h3>Abilities</h3>
            { abilities }
          </IonLabel>
        </IonItem>
      </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default PokeCard;
