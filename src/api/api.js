import { Axios } from "./Axios";

export const apiGetMonthEvents = month => {
  return new Promise((resolve, reject) => {
      

    Axios.get(`/events?month=${month}`)
      .then(events => {
        console.log(`stuff from backend`, events);
        // resolve(events)
      })
      .catch(err => reject(err));
  });
};

export const apiCreateNewEvent = (title, desc, date) => {
    console.log(`from api getting from browser`, title, desc, date);
    
  return new Promise((resolve, reject) => {

    const newObj = {
        title,
        desc,
        date
    };

    Axios.post("/events/createevent", newObj)
      .then(newTodo => resolve(newTodo.data))
      .catch(err => reject(err));
  });
};



const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};