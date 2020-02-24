import React from 'react'
import PropTypes from 'prop-types'
import MaterialModal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import useStyles from './style'

const Modal = ({ open, onClose, children, ...other }) => {
  const classes = useStyles()

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...other}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </MaterialModal>
  )
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
}

export default Modal
