import PropTypes from 'prop-types'

import { Search } from 'src/components/search'

export { ListForm }

ListForm.propTypes = {
  updatePermissionsCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired
}

function ListForm ({ updatePermissionsCallback, setUrlDownload }) {
  return (
    <Search
      loadDataCallback={updatePermissionsCallback}
      urlBaseDownload={'/accessibility/permissions/export'}
      setUrlDownload={setUrlDownload}
    />
  )
}
