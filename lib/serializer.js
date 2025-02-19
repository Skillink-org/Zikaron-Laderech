/**
 * Serializes objects to ensure they can be safely passed from server to client components in React 19 and Next.js.
 * This is especially useful for Mongoose documents, converting complex types (like ObjectId and Date)
 * into serializable values (e.g., strings) to comply with Next.js's serialization rules.
 *
 * For more details, see: https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values
 *
 * @param {Object} object - The object to serialize.
 * @returns {Object} - A plain JavaScript object, ready for client-side use.
 */
export function serializer(object) {
  return JSON.parse(JSON.stringify(object));
}
