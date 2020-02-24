import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '200px',
    minWidth: '200px',
    backgroundColor: theme.colors.gray2,
    margin: '0 10px',

    '&.dragged-over': {
      backgroundColor: theme.colors.gray3,
    },
  },
  header: {
    padding: '10px 6px',
  },
  title: {
    textDecoration: 'none',
    color: theme.colors.gray,
    textTransform: 'none',
  },
  addButtonWrapper: {
    padding: '10px',
  },
}))
