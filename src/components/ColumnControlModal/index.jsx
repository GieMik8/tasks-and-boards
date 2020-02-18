import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, TextField, Typography } from '@material-ui/core'

import { Modal } from 'components'
import { useFieldControl } from 'hooks'

const ColumnControlModal = ({ onSubmit, initial, open, ...props }) => {
  const [title, titleError, onTitleChange, setTitleError] = useFieldControl(initial)

  useEffect(() => {
    onTitleChange(initial)
  }, [open, initial, open, onTitleChange])

  const onValidate = () => {
    if (!title) {
      return setTitleError('Title is not defined')
    }
    return onSubmit(title)
  }

  return (
    <Modal open={open} {...props}>
      <Typography variant="h6">{initial ? 'Edit' : 'Create'} column</Typography>
      <FormGroup>
        <TextField
          error={!!titleError}
          helperText={titleError}
          value={title}
          onChange={onTitleChange}
          margin="normal"
          required
          label="Column title"
          variant="outlined"
        />
      </FormGroup>
      <Button onClick={onValidate}>{initial ? 'Save' : 'Create'}</Button>
    </Modal>
  )
}

ColumnControlModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.string,
}

ColumnControlModal.defaultProps = {
  initial: '',
}

export default ColumnControlModal
