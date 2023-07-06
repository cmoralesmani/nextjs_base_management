import PropTypes from 'prop-types'

function ColumnData ({ dataRow, columnName, children }) {
  return children
    ? children({ value: dataRow[columnName] })
    : dataRow[columnName]
}

ColumnData.propTypes = {
  /**
   * Datos de la fila
   */
  dataRow: PropTypes.object.isRequired,
  /**
   * Nombre de la columna concerniente
   */
  columnName: PropTypes.string.isRequired
}

export { ColumnData }
