import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { If } from 'react-if';

function Auth(props) {
  const contextType = useContext(AuthContext);
  //console.log('props.capability',props.capability);
  let okToRender =
    contextType.loggedIn && props.capability
      ? contextType.user.capabilities.includes(props.capability)
      : false;
      //console.log('okToRender',okToRender);
      //console.log('props.children',props.children)
  return (
      
    <>
      <If condition={okToRender}>{props.children}</If>
      <If condition={props.capability === 'guest' && !contextType.loggedIn}>
        {props.children}
      </If>
    </>
  )
}

export default Auth;