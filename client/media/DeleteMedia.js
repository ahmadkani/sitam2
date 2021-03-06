import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-media.js'
import {Redirect} from 'react-router-dom'

export default function DeleteMedia(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteMedia = () => {
    const jwt = auth.isAuthenticated()
    remove({
      mediaId: props.mediaId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setRedirect(true)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
  if (redirect) {
    return <Redirect to='/'/>
  }
  return (<span>
    <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
      <DeleteIcon/>
    </IconButton>

    <Dialog open={open} onClose={handleRequestClose}>
      <DialogTitle>{"حذف "+props.mediaTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.mediaTitle} حذف شود؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          لغو
        </Button>
        <Button onClick={deleteMedia} variant="contained" color="secondary" autoFocus="autoFocus">
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  </span>)
}

DeleteMedia.propTypes = {
  mediaId: PropTypes.string,
  mediaTitle: PropTypes.string
}