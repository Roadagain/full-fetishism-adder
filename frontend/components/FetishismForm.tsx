import React from 'react'
import { Button, Grid, TextField } from '@material-ui/core'

const FesithismForm: React.FC = () => {
  const [fetishism, setFetishism] = React.useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetishism(e.target.value)
  }

  return (
    <form>
      <Grid container alignItems="center">
        <Grid item>
          <TextField id="fetishism" variant="outlined" placeholder="投稿する性癖" value={fetishism} onChange={onChange} />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" disabled={!fetishism}>投稿</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default FesithismForm
