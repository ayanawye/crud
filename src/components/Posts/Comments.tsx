import { useGetCommentsQuery } from '../../services/commentsApi';
import React, {FC} from 'react';

interface CommentsProps{
  id: number
}

const Comments: FC<CommentsProps> = ({id}) => {
  const {data: comments} = useGetCommentsQuery(id)
  return (
    <div className='comment_list mt-5'>
      {comments && comments.map(comment => (
        <div key={comment.id} className='comment p-2'>
          <p><span className='font-medium'>Name:</span> {comment.name} </p>
          <p><span className='font-medium'>Email:</span> {comment.email} </p>
          <p><span className='font-medium'>Comment:</span> {comment.body} </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;