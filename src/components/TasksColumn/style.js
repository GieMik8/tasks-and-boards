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
    marginBottom: '6px',
    padding: '10px 20px',
  },
  title: {
    textDecoration: 'none',
    color: theme.colors.gray,
  },
  addButtonWrapper: {
    padding: '10px',
  },
}))
