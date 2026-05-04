/**
 * Turns MongoDB / Mongoose errors into safe, user-facing messages for admin APIs.
 */
function formatProductWriteError(error) {
  if (!error) return "Unable to save product";

  // Duplicate key (unique index), e.g. slug
  if (error.code === 11000) {
    const indexedFields = error.keyPattern ? Object.keys(error.keyPattern) : [];
    if (indexedFields.includes("slug")) {
      return "A product with this name or slug already exists. Use a different title or slug.";
    }
    return "This product conflicts with an existing record. Check for duplicate fields.";
  }

  if (error.name === "ValidationError" && error.errors) {
    const firstKey = Object.keys(error.errors)[0];
    const firstErr = firstKey ? error.errors[firstKey] : null;
    if (firstErr?.message) return firstErr.message;
  }

  const raw = error.message || "Unable to save product";
  if (typeof raw === "string" && raw.includes("E11000")) {
    return "A product with this name or slug already exists. Use a different title or slug.";
  }

  return raw;
}

function statusCodeForProductWriteError(error) {
  if (error?.code === 11000) return 409;
  return 400;
}

module.exports = { formatProductWriteError, statusCodeForProductWriteError };
