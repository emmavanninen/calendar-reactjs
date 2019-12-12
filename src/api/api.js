import { Axios } from "./Axios";

export const apiGetMonthEvents = (month, year) => {
    console.log(month);
    console.log(year);
    
  return new Promise((resolve, reject) => {
      

      Axios.get(`/events?yearmonth=${year}${month}`)
      .then(events => {
          events = events.data.map(event => {
              
              let day = event.event.date.slice(8, 10);
              day = day.replace(/0/g, "");
              return event={...event, dateID: day}
          });
        resolve(events)
      })
      .catch(err => reject(err));
  });
};

export const apiCreateNewEvent = (title, desc, date) => {


  return new Promise((resolve, reject) => {

    const newObj = {
        title,
        desc,
        date
    };

    Axios.post("/events/createevent", newObj)
      .then(event => resolve(event.data))
      .catch(err => reject(err));
  });
};



const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};