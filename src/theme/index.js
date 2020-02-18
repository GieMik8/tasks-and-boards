import { createMuiTheme } from '@material-ui/core'

import colors from './colors'

export default createMuiTheme({
  colors,
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.gray1,
    },
  },
})
