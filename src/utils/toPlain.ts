// Converts Mongoose query results (documents, ObjectIds, MongooseArrays) into plain JSON
// values before they are passed as props. React 19 rejects class instances / objects with
// toJSON at the Server → Client Component boundary ("Only plain objects can be passed to
// Client Components"); React 18 used to coerce them silently.
// Output shape matches what the components already received via toJSON: ObjectId → string.
export const toPlain = <T,>(value: T): any =>
    value == null ? value : JSON.parse(JSON.stringify(value));
