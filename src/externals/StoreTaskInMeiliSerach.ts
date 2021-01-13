import { constants } from 'buffer';

export function StoreTaskInMeiliSerach(index: any, document: any) {
  setTimeout(async () => {
    try {
      const response = await index.addDocuments([document]);
      console.log(response);
    } catch (error) {
      console.log('Error To Create a task in meliesearch', error);
    }
  }, 600);
}
