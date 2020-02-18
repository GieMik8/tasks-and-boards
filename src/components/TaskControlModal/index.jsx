import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, TextField, Typography } from '@material-ui/core'

import { Modal } from 'components'
import { useFieldControl } from 'hooks'
import useStyles from './style'

const TaskControlModal = ({ onSubmit, initial, open, ...props }) => {
  const [title, titleError, onTitleChange, setTitleError] = useFieldControl(initial.title)
  const [description, descriptionError, onDescriptionChange, setDescriptionError] = useFieldControl(
    initial.description,
  )

  const classes = useStyles()

  useEffect(() => {
    onTitleChange(initial.title)
    onDescriptionChange(initial.description)
  }, [open, initial, open, onTitleChange, onDescriptionChange])

  const onValidate = () => {
    if (!title) {
      return setTitleError('Title is not defined')
    }
    if (!description) {
      return setDescriptionError('Description is not defined')
    }
    return onSubmit({ title, description })
  }

  return (
    <Modal open={open} {...props}>
      <Typography variant="h6">{initial.title ? 'Edit' : 'Create'} task</Typography>
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
          <TextField
            error={!!descriptionError}
            helperText={descriptionError}
            value={description}
            onChange={onDescriptionChange}
            margin="normal"
            required
            label="Description"
            variant="outlined"
          />
        </FormGroup>
      </div>
      <Button size="large" onClick={onValidate} variant="outlined" color="secondary">
        {initial.title ? 'Save' : 'Create'}
      </Button>
    </Modal>
  )
}

TaskControlModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.object,
}

TaskControlModal.defaultProps = {
  initial: {
    title: '',
    description: '',
  },
}

export default TaskControlModal
