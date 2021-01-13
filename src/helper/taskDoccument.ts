export function TaskDocs(data: any): any {
  const doc = {
    TaskId: data.id,
    TaskTitle: data.title,
    TaskDescriptiion: data.description,
  };
  return doc;
}
