import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { Container } from '@material-ui/core'

import useStyles from './style'

const RouteHome = lazy(() => import('routes/Home'))
const RouteBoard = lazy(() => import('routes/Board'))

export default () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Suspense fallback={<p>...Loading</p>}>
        <Switch>
          <Route exact path="/" component={RouteHome} />
          <Route exact path="/boards/:boardId" component={RouteBoard} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  )
}
