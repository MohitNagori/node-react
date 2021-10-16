import Mongoose from 'mongoose';

export async function dropCollections() {
  const collections = Object.keys(Mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = retrieveCollection(collectionName);
    await collection.drop();
  }
}

export async function removeCollectionsElements() {
  const collections = Object.keys(Mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = Mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

const retrieveCollection = (collectionName: string) => Mongoose.connection.collections[collectionName];

export async function removeCollectionByName(collectionName: string) {
  const collection = retrieveCollection(collectionName);
  await collection.deleteMany({});
}

export async function insertCollectionByName(collectionName: string, items: any[]) {
  const collection = retrieveCollection(collectionName);
  await collection.insertMany(items);
}
