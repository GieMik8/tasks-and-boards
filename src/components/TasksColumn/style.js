import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '200px',
    minWidth: '200px',
    backgroundColor: theme.colors.gray,
    margin: '0 10px',

    '&.hovered': {
      backgroundColor: theme.colors.lightGreen,
    },
  },
}))
