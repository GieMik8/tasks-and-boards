import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, TextField, Button } from '@material-ui/core'
import compToJS from 'with-immutable-props-to-js'

import { useFieldControl } from 'hooks'
import useStyle from './style'

const FormTask = ({ onSubmit, initial, buttonText }) => {
  const initialData = initial || { title: '', description: '' }
  const [title, titleError, setTitle, setTitleError] = useFieldControl(initialData.title)
  const [description, descriptionError, setDescription, setDescriptionError] = useFieldControl(
    initialData.description,
  )
  const classes = useStyle()

  useEffect(() => {
    setTitle(initialData.title)
    setDescription(initialData.description)
  }, [initialData.title, initialData.description, setTitle, setDescription])

  const validate = () => {
    if (!title) {
      return setTitleError('Title is not defined')
    }
    if (!description) {
      return setDescriptionError('Description is not defined')
    }
    return onSubmit({ title, description })
  }

  return (
    <div>
      <FormGroup className={classes.body}>
        <TextField
          error={!!titleError}
          helperText={titleError}
          value={title}
          onChange={setTitle}
          margin="normal"
          required
          label="Title"
          variant="outlined"
        />
        <TextField
          error={!!descriptionError}
          helperText={descriptionError}
          value={description}
          onChange={setDescription}
          margin="normal"
          required
          label="Description"
          variant="outlined"
        />
      </FormGroup>
      <Button size="large" onClick={validate} variant="outlined" color="secondary">
        {buttonText}
      </Button>
    </div>
  )
}

FormTask.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.any,
  buttonText: PropTypes.string,
}

FormTask.defaultProps = {
  initial: null,
  buttonText: 'Create',
}

export default compToJS(FormTask)
