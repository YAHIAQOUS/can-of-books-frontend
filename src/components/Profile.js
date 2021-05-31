import React, { Component } from 'react';
import { useAuth0, withAuth0 } from "@auth0/auth0-react";

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   // if (isLoading) {
//   //   return <div>Loading ...</div>;
//   // }

//   return (
//     isAuthenticated && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// };

class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        {
          isAuthenticated &&
          <>
            <img src={user.picture} alt={user.name} />
            <div>Hello {user.name}</div>
            <div>Email {user.email}</div>
          </>
        }
      </>
    )
  }
}



export default withAuth0(Profile);