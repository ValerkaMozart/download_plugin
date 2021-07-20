import React from "react"
import classes from './App.module.css'
import Input from "./components/Input"
function App() {
  return (
    <div className={classes.App}>
      <h1>Загрузка картинок</h1>
        <hr/>
        <Input
          accept={['.gif','.jpeg','.jpg','.png']}
          multi={true}
        />
    </div>
  );
}

export default App;
