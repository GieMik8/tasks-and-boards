import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '200px',
    height: '200px',
    backgroundColor: theme.colors.gray,
    margin: '0 20px',

    '&.hovered': {
      backgroundColor: theme.colors.lightGreen,
    },
  },
}))
