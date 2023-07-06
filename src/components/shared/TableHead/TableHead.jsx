import PropTypes from 'prop-types'

function TableHead ({ labels, hasActionButtons }) {
  return (
    <thead className="table-secondary">
      <tr>
        {labels.map((label, index) => (
          <th key={index}>{label}</th>
        ))}
        {!!hasActionButtons && <th></th>}
      </tr>
    </thead>
  )
}

TableHead.propTypes = {
  // Lista de etiquetas para las columnas
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Indicador para saber si lleva un campo especial para las acciones
  hasActionButtons: PropTypes.bool.isRequired
}

TableHead.defaultProps = {
  hasActionButtons: false
}

export { TableHead }
