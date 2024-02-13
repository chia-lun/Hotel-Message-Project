# Hotel Message Application

This project is a web application that can automatically populate customizable message templates with information about a guest. 

## Run the project

1. Clone the project and open it locally
2. In your terminal, run
   ```
   npm -v // to check if you have npm install
   npm install // if not
   npm start // to run the app on your local host
   ```
3. You should see a tab open on your local host 

## Design decisions 
### Fetch data from local JSON files

In the local-json folder, you can see three JSON files, `Companies.json`, `Guests.json` and `MessageTemplates.json`. We will load in company, guest information and message templates with placeholders from them. In the message.js file, we import the data for later use.
```
import guestsData from "../local-json/Guests.json";
import companiesData from "../local-json/Companies.json";
import messageTemplates from "../local-json/MessageTemplates.json";
```
For example, we can get a specific guest data entry from the guest dataset.
```
const selectedGuest = guestsData.find(
  (guest) => guest.id === selectedGuestId
);
```

### Time-based greeting variable

Our application can get current time and send greetings based on the time of the day (e.g. "Good morning" / "Good afternoon" / "Good evening"). And we manage that by getting current time and using conditional statements for 3 different cases. 
```
const getGreeting = () => {
  const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
};
```

### Guest, company and message template specification 

We store message templates with placeholders in `MessageTemplates.json` and those placeholders can be replaced in the `generateMessage()` function. For example, we can replace greeting and checkout time. 
```
const message = selectedTemplate.template
  // use getGreeting() to get a greeting based on current time 
  .replace("{greeting}", getGreeting())
  // convert timestamp into date
  .replace("{checkoutTime}", new Date(selectedGuest.reservation.endTimestamp))
```
Users can also select a message template like welcome message or checkout reminder. Those templates have their own revalent placeholders. 

### Customizable message templates

We also allow users to customize their message by simply editing the text in the textbox. 

<img width="553" alt="Screenshot 2024-02-13 at 2 23 52 PM" src="https://github.com/chia-lun/Hotel-Message-Project/assets/54944966/7415ab07-a605-4a06-8c35-bdd651f077e3">

### Dynamic interaction 

We use `useState` in react to make sure our user interface is interactive. Thus, when users are changing guest, company or message template, the change will show on the interface. 
```
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  // selectGuestId is the value after users make ay change
  // setSelectedGuestId happens whenever users make a change 
```

## Language Consideration 

I chose React.js (JavaScript) because when I received the task, I envisioned a web application with an interface that users can naviagte. With JavaScript's nature of object-oriented programming with some functional programming, I could make objects and components that ensure reusability, scalability and efficiency. JavScript also has great error handling that could ensure the functionality of the project. 

## Testing and debugging 

I made sure to fix any bugs during the development process by running and using the application in whatever way I can. And this included runtime errors that prevented the program from running and bugs that did not meet the technical requirements. I think it is important to keep in mind the technical requirements from the tasks and test your program with different scenarios, inputs, and data sets, and compare the results with known solutions, benchmarks, or alternative methods. 

## Future improvements

1. In addition to edit the text inside the textbox, it would be useful if users can add the typed text into a new message template. And I still need to think about how can the program detect the names, hotel names and other information for it to store them as placeholders in `MessageTemplates.json`.
2. It would also be helpful if the application can allow users to add new guests and hotel companies. But like the (1) point, it would be more practical to add that from a backend.
3. For guest dropdown, I am also thinking maybe it would be helpful to filter out guests who checkin or checkout times are far away because it would be a lot of work to find a guest if you have hundreds.
4. From the (3) point, I think there is a way to more effiently sort the guests when there is a great number like searching. 






