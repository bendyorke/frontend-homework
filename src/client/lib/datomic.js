export function hyphenate(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function camelize(string) {
  return string.replace(/(-.)/g, x => x.slice(1).toUpperCase())
}

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
  return Object.keys(attrs).reduce((memo, key) => {
    const namespaced = ['id', 'db/id'].indexOf(key) > -1
      ? 'db/id'
      : entity + '/' + hyphenate(key)

    return { ...memo, [namespaced]: attrs[key] }
  }, {})
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
  return Object.keys(attrs).reduce((memo, key) => (
    exp.test(key) ? { ...memo, [camelize(key.replace(exp, ''))]: attrs[key] } : memo
  ), {})
}
