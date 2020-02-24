import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 6, 4),
    maxWidth: '90%',
    width: '600px',
  },
}))
