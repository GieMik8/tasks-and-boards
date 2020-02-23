import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { Container } from '@material-ui/core'

import { Home, Board } from 'routes'
import useStyles from './style'

export default () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/boards/:boardId" component={Board} />
        <Redirect to="/" />
      </Switch>
    </Container>
  )
}
