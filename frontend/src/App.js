import React, { useEffect, useRef, useState } from "react";
import SignupLogin from "./components/login-signup";
import CreatePost from "./components/create-post";
import Post from "./components/posts";
import Button from "./components/button";
import { apiUrl } from "./utils/util";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [userType, setUserType] = useState();
  const [postsData, setPostsData] = useState([]);
  const [userId, setUserId] = useState();

  const logoutHandler = () => {
    setIsUserValid(false);
    localStorage.removeItem("token");
  };

  const credentialsHandler = (...params) => {
    if (params[0] === "login") {
      const [, email, password] = params;
      if (email !== "" && email && password !== "" && password) {
        if (!email.includes("@") || !email.includes(".")) alert("Invalid email");
        else {
          axios.post(apiUrl + "auth/login", { email: email, password: password }).then(response => {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setUserType(response.data.accountType);
            setIsUserValid(true);
            setUserId(response.data.userId);
          }).catch(err => console.error(err));
        }
      } else {
        alert("Some fields are missing");
      }
    } else {
      const [, name, email, password, repassword, type] = params;
      if (name !== "" && name && email !== "" && email && password !== "" && password && repassword !== "" && repassword && type) {
        if (password === repassword) {
          if (!email.includes("@") || !email.includes(".")) alert("Invalid email");
          else {
            axios.put(apiUrl + "auth/signup", { name: name, email: email, password: password, accountType: type }).then(response => {
              alert(response.data.message)
              setIsLogin(true);
            }).catch(err => alert(err.response.data.message))
          }
        } else {
          alert("Passwords do not match");
        }
      } else {
        alert("Some fields are missing")
      }
    }
  };


  useEffect(() => {
    if (isUserValid) {
      const socket = io(apiUrl);
      socket.on("posts", data => {
        if (data.action === "Create") {
          setPostsData(posts => [{ title: data.post.title, description: data.post.description, image: data.post.imageUrl }, ...posts])
        }
      });
    }
  }, [isUserValid]);



  useEffect(() => {
    if (isUserValid) {
      axios.get(apiUrl + "feed/posts", { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }).then(response => {
        console.log(response);
        setPostsData(response.data.posts.map(value => ({ title: value.title, description: value.description, image: value.imageUrl })));
      }).catch(error => console.error(error));
    }
  }, [userId]);

  return (
    !isUserValid ?
      <div className="w-full h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <SignupLogin login={isLogin} handlerFn={credentialsHandler} />
          <div>{isLogin ? "Create an account?" : "Already have an account?"} <button className="underline text-blue-600" onClick={() => setIsLogin(!isLogin)}>Click here</button></div>
        </div>
      </div> :
      <>
        <div className="flex items-center justify-start w-full h-screen flex-col space-y-5 relative py-5">
          {userType === "creator" && <CreatePost />}
          <div className="w-3/4 overflow-y-auto space-y-4">
            {postsData.map((post, i) => <Post key={i} title={post.title} description={post.description} image={post.image} />)}
          </div>
        </div>
        <Button text="Logout" onClick={e => logoutHandler()} className="absolute top-5 right-5" />
      </>
  );
}

export default App;