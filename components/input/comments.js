import { useEffect, useState, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments(props) {

  const notificationCtx = useContext(NotificationContext)

  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (showComments) { 
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: 'Sending the comment',
      message: 'Your comment being sent',
      status: 'pending'
    })
    fetch(`/api/comments/${props.eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Your Comment Was Saved',
          status: 'success'
        })
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Registering Success',
          status: 'success'
        })
      })
      .catch(
        error => {
          notificationCtx.showNotification({
            title: 'Error',
            message: error.message || 'Failded to send comment',
            status: 'error'
          })
        }
      )
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  )
}

export default Comments
