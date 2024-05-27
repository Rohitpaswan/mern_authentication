import { useEffect, useState } from "react";
import {registerUser, userDetails} from "../helper/helper"

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const ob = {
        username: "xz123",
        password: "jsjjs45",
        email: "paswanrohit0207@gmail.com",
        firstName: "gssc123",
        lastName: "nm1kskn"
      };
      const existingUser = await userDetails(ob.username);
      if (existingUser) {
        console.log(existingUser);
        return console.log("user already exists") 
      } else {
        const user = await registerUser(ob);
        console.log("User details:", user);
        setUser(user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      {user ? (
        <div>
          <h1>User Profile</h1>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      <button onClick={fetchData}> add user</button>
    </div>
  );
};
export default Profile