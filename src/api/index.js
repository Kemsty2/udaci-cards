import { AsyncStorage } from "react-native";

export function createDeck(title) {
  return {
    title,
    questions: [],
    createdAt: Date.now()
  };
}

const ASYNCSTORAGE_KEY = "UdaciCards:::AsyncStoreKey";

export const clear = () => {
  AsyncStorage.removeItem(ASYNCSTORAGE_KEY);
}

export const getDecks = async () => {
  return await AsyncStorage.getItem(ASYNCSTORAGE_KEY);
};

export const getDeck = async (id) => {
  const decks = await getDecks();
  if (decks === null) return null;
  
  return JSON.parse(decks)[id];
};

export const saveDeckTitle = (title) => {
  const deck = createDeck(title);

  AsyncStorage.mergeItem(
    ASYNCSTORAGE_KEY,
    JSON.stringify({
      [title]: deck,
    })
  );
  return deck;
};

export const addCardToDeck = async (title, card) => {
  const decks = await getDecks();
  if (decks === null) return null;

  let decksJson = JSON.parse(decks);
  let deck = decksJson[title];

  deck.questions.push(card);
  decksJson = Object.assign({}, decksJson, {
    ...decksJson,
    [title]: deck,
  });

  AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(decksJson));
};
