import React, { useState, useEffect} from "react"
import './App.css';
import Friend from "./Friend";
import FriendForm from "./FriendForm";
import axios from "axios";


const initialFormValues = {

  username: "",
  email: "",

  role: "",
};

export default function App() {
  const [friends, setFriends] = useState([]); // careful what you initialize your state to

  
  const [formValues, setFormValues] = useState(initialFormValues);

  

  const updateForm = (inputName, inputValue) => {
   
    setFormValues({
      ...formValues,
      [inputName]: inputValue,
    });
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    };
   
    if (!newFriend.username || !newFriend.email || !newFriend.role) return;
    setFormValues(initialFormValues);
    axios
      .post("fakeapi.com", newFriend)
      .then((res) => {
        setFriends([newFriend, ...friends]);
        
      })
      .catch((err) => {
        
      });
    
  };

  useEffect(() => {
    axios.get("fakeapi.com").then((res) => setFriends(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Form App</h1>

      <FriendForm
       
        values={formValues}
        update={updateForm}
        submit={submitForm}
      />

      {friends.map((friend) => {
        return <Friend key={friend.id} details={friend} />;
      })}
    </div>
  );
}


