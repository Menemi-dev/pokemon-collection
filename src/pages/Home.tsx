import { IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import { pokemonList } from '../ApiUtils';
import PokeCard from '../components/Card';

const Home: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [pokemons, _] = useState( pokemonList() );

  const generateCards = () => {
    let newCards = [];
    pokemons.slice( cards.length, cards.length + 20 ).map(( id )=> {
      newCards.push( <PokeCard pokemonId={ id }/> );
    });
    setCards([...cards, ...newCards]);
  };

  useEffect(() => {
    generateCards();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokemon Collection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed={ true }>
          <IonRow>
            {cards.map(( card, index ) => (
              <IonCol key={ 'card' + index } size="12" size-sm="6" size-md="4" size-lg="3">{ card }</IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={( ev ) => {
            generateCards();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
