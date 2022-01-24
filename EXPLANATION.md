# Explanation
## Code
### Development Features
- Auto prettier using `lint-staged` and `husky`
- Typescript :)
- Home made UI (yes i know it's a bit ugly 😢 )
- Using browser `fetch` instead of library
- State management using React's `useState` and `createContext` (combined with typescript i feel like it's the simplest and neatest state management you can get)
- `framer-motion` as animation library because their declarative animation component is cool.
- `react-toastify` because i don't have time to build my own toast 😢


## Feature
### Search (Filter)
The search box at the top of the page will filter data localy and will automatically filter all data displayed on table. It increases response time and reduce network usage

### Sort 
Sort feature can be accessed by clicking table header. Chevron icon will indicate the order of the sorting. Clicking sorted column header will switch the sorting mode (ex: ASCENDING to DESCENDING)

### Table
`Komoditas`, `Area`, `Size` and `Price`. The 4 column is 4 most important data in the table. The table will have first column sticky on mobile web, it will help the user to not lose context from the data on the left.  

### Form
I merged `area_province` and `area_kota` into one field (Area) and use group select to automatically select `area_province` based on `area_kota` that user select.
All fields are required, so when didn't fill some field an error notification will be displayed.   

## Personal Note
I think during the development of this project i spent too much time working on UI component instead of working on main feature (CRUD itself)

Lastly, Thanks for coming to my TED Talk :)
