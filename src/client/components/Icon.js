import React, { createElement as create, PropTypes } from 'react'
import { capitalize } from 'lib/util'
import styles from 'components/_styles.css'

const WrappedIcon = (icon, props) => (
  <span {...props}>{create(icon)}</span>
)

const Icon = ({ name, action, className, ...propsRecieved }) => {
  const props = {
    title: capitalize(name), ...propsRecieved,
    className: action ? styles.actionIcon : styles.staticIcon +' '+ className,
    ...propsRecieved,
  }

  switch(name) {
    case 'more':
      return WrappedIcon(require('react-icons/lib/md/more-horiz'), props)
    case 'deliver':
      return WrappedIcon(require('react-icons/lib/md/send'), props)
    case 'collect':
      return WrappedIcon(require('react-icons/lib/md/attach-money'), props)
    case 'preview':
      return WrappedIcon(require('react-icons/lib/md/remove-red-eye'), props)
    case 'close':
      return WrappedIcon(require('react-icons/lib/md/close'), props)
    default:
      setTimeout(() => {throw new Error(`No icon specified for name '${name}'`)}, 0)
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  action: PropTypes.bool,
  className: PropTypes.string,
}

Icon.defaultProps = {
  action: true,
}

export default Icon
