import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    height: '82vh',
    overflow: 'auto',
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: '1px',
    borderColor: theme.colors.gray,
  },
  inner: {
    display: 'inline-flex',
    padding: '10px 0',
    minHeight: '100%',
  },
  addButtonWrapper: {
    padding: '0 10px',
    minHeight: '100%',
    display: 'flex',
  },
}))
