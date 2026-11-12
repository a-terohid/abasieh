import { isValidObjectId } from "mongoose";

// Route params come straight from the URL. Passing a malformed id to `findOne({ _id })`
// makes Mongoose throw a CastError (HTTP 500) instead of returning "not found".
export const isValidId = (id: unknown): id is string =>
    typeof id === "string" && isValidObjectId(id);
