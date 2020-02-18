import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, TextField, Typography } from '@material-ui/core'

import { Modal } from 'components'
import { useFieldControl } from 'hooks'
import useStyles from './style'

const ColumnControlModal = ({ onSubmit, initial, open, ...props }) => {
  const [title, titleError, onTitleChange, setTitleError] = useFieldControl(initial)

  const classes = useStyles()

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
      <div className={classes.body}>
        <FormGroup>
          <TextField
            error={!!titleError}
            helperText={titleError}
            value={title}
            onChange={onTitleChange}
            margin="normal"
            required
            label="Title"
            variant="outlined"
          />
        </FormGroup>
      </div>
      <Button size="large" onClick={onValidate} variant="outlined" color="secondary">
        {initial ? 'Save' : 'Create'}
      </Button>
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
