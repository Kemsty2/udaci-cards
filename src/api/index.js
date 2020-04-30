import { AsyncStorage } from "react-native";

export function createDeck(title) {
  return {
    title,
    questions: {},
    createdAt: Date.now(),
  };
}

const ASYNCSTORAGE_KEY = "UdaciCards:::AsyncStoreKey";

export const clear = () => {
  AsyncStorage.removeItem(ASYNCSTORAGE_KEY);
};

export const getDecks = async () => {
  try {
    return await AsyncStorage.getItem(ASYNCSTORAGE_KEY);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDeck = async (id) => {
  try {
    let decks = await getDecks();

    if (decks === null) return null;
    decks = JSON.parse(decks);

    return decks[id];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeDeck = async (title) => {
  try {
    let decks = await getDecks();
    decks = JSON.parse(decks);

    decks[title] = undefined;
    delete decks[title];

    return AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(decks));
  } catch (error) {
    console.log(error);
    throw error;
  }
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
  try {
    const decks = await getDecks();
    if (decks === null) return null;

    let decksJson = JSON.parse(decks);
    let deck = decksJson[title];

    deck.questions = { [card.id]: card, ...deck.questions };

    decksJson = Object.assign({}, decksJson, {
      [title]: deck,
      ...decksJson,
    });

    AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(decksJson));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCardToDeck = async (title, idCard) => {
  try {
    let decks = await getDecks();

    if (decks === null) return null;

    decks = JSON.parse(decks);
    let deck = decks[title];

    deck.questions[idCard] = undefined;
    delete deck.questions[idCard];

    decks = Object.assign({}, decks, {
      ...decks,
      [title]: deck,      
    });

    console.log(decks[title]);

    return AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(decks));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
