import React from "react";
import { Link } from "react-router-dom";
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import moment from 'moment';

function PostCard({post:{body,createdAt,id,username,likeCount,commentCount,likes}}){

    function likePost(){
        console.log('Like Post!!');
    }
    function commentOnPost(){
        console.log('Post Commented');
    }
return(
    <Card>
         <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post"> */}
          <Button as="div" labelPosition="right" onClick={likePost}>
            <Button color="teal" basic>
              <Icon name="heart" />
            </Button>
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
        {/* </MyPopup> */}
        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
      </Card.Content>
    </Card>
)
}
export default PostCard;