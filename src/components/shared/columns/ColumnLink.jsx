import PropTypes from 'prop-types'
import Link from 'next/link'

import { useHasPermissionStatus } from 'src/hooks/auth'

export { ColumnLink }

ColumnLink.propTypes = {
  /**
   * Codigo del permiso necesario para la dirección url
   */
  codenamePermission: PropTypes.string.isRequired,
  /**
   * Dirección url a referenciar. Si no lo indica el contenido no será referenciado.
   */
  href: PropTypes.string
}

function ColumnLink ({ children, href, codenamePermission, ...rest }) {
  const hasPermissionToLink = useHasPermissionStatus({
    codenamePermission
  })

  return (
    <span {...rest}>
      {!!hasPermissionToLink && !!href
        ? (
        <Link href={href}>{children}</Link>
          )
        : (
            children
          )}
    </span>
  )
}
