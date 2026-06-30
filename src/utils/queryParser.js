
const parsePagination = (query) => {
  const page  = Math.max(parseInt(query.page)  || 1, 1)
  const limit = Math.min(Math.max(parseInt(query.limit) || 10, 1), 100) // cap at 100
  const skip  = (page - 1) * limit
  return { page, limit, skip }
}


const buildSearchFilter = (search, searchableFields) => {
  if (!search || typeof search !== "string" || search.trim() === "") return null

  return {
    OR: searchableFields.map(field => ({
      [field]: { contains: search.trim(), mode: "insensitive" }
    }))
  }
}


const buildExactFilters = (query, filterableFields) => {
  const where = {}

  for (const field of filterableFields) {
    const value = query[field]
    if (value === undefined || value === "") continue

    // Boolean coercion
    if (value === "true")  { where[field] = true;  continue }
    if (value === "false") { where[field] = false; continue }

    // Number coercion (only if it looks numeric)
    if (!isNaN(value) && value.trim() !== "") {
      where[field] = Number(value)
      continue
    }

    // Default — string exact match
    where[field] = value
  }

  return where
}


const buildRangeFilter = (query, field, minKey, maxKey, isDate = false) => {
  const min = query[minKey]
  const max = query[maxKey]
  if (min === undefined && max === undefined) return null

  const range = {}
  if (min !== undefined) range.gte = isDate ? new Date(min) : Number(min)
  if (max !== undefined) range.lte = isDate ? new Date(max) : Number(max)

  return { [field]: range }
}


const buildSort = (query, sortableFields, defaultField = "createdAt") => {
  const sortBy = sortableFields.includes(query.sortBy) ? query.sortBy : defaultField
  const order  = query.order === "asc" ? "asc" : "desc"
  return { [sortBy]: order }
}


const buildMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit) || 1,
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1
})

module.exports = {
  parsePagination,
  buildSearchFilter,
  buildExactFilters,
  buildRangeFilter,
  buildSort,
  buildMeta
}