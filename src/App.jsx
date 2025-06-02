import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import MealsContext from "./store/MealsContext";
import UserProgressContextProvider from "./store/UserProgressContext";
function App() {
  

  return (
    <UserProgressContextProvider>
       <MealsContext>
     <Header />
     <main>
        <Meals/>
      
     </main>
    </MealsContext>
    </UserProgressContextProvider>
   
  );
}

export default App;
