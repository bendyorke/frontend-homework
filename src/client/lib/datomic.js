/**
 * @param {String} entity - name to prefix attributes with
 * @param {Object} attrs  - attributes of the to-be entity
 * @return {Object}
 *
 * Take a standard object map and return an object with datomic readable
 * keys for a given entity.
 *
 * eg: toEntity('foo', {bar: 'baz'}) => {'foo/bar': 'baz'}
 */
export function toEntity(entity, attrs) {
  return Object.entries(attrs).reduce((memo, [key, value]) => (
    { ...memo, [entity + '/' + key]: value }
  ), {})
}

/**
 * @param {String} entity - name to look for parameters under
 * @param {Object} attrs  - attributes of the entity
 *
 * Take a datomic entity, and return a javascript object without
 * namespaced keys.
 *
 * eg: parseEntity('foo', {'foo/bar': 'baz'}) => {bar: 'baz'}
 */
export function parseEntity(entity, attrs) {
  const exp = new RegExp('^(?:db|' + entity + ')\/')
  return Object.entries(attrs).reduce((memo, [key, value]) => (
    exp.test(key) ? { ...memo, [key.replace(exp, '')]: value } : memo
  ), {})
}
