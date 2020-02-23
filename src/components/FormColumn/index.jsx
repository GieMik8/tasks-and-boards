import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, TextField, Button } from '@material-ui/core'
import compToJS from 'with-immutable-props-to-js'

import { useFieldControl } from 'hooks'
import useStyle from './style'

const FormColumn = ({ onSubmit, initial, buttonText }) => {
  const initialData = initial || { title: '' }
  const [title, titleError, setTitle, setTitleError] = useFieldControl(initialData.title)
  const classes = useStyle()

  useEffect(() => {
    setTitle(initialData.title)
  }, [initialData.title, setTitle])

  const validate = () => {
    if (!title) {
      return setTitleError('Title is not defined')
    }
    return onSubmit({ title })
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
      </FormGroup>
      <Button size="large" onClick={validate} variant="outlined" color="secondary">
        {buttonText}
      </Button>
    </div>
  )
}

FormColumn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.any,
  buttonText: PropTypes.string,
}

FormColumn.defaultProps = {
  initial: null,
  buttonText: 'Create',
}

export default compToJS(FormColumn)
