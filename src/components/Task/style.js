import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.colors.white,
    margin: '0 6px 6px',
    padding: '8px 12px',
    transition: '.2s ease',

    '&:hover': {
      backgroundColor: theme.colors.gray1,
    },
  },
  body: {
    marginBottom: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    paddingTop: '6px',
    borderTopColor: theme.colors.gray3,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}))
