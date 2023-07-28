/////From exercise.js
/// note: idea is to refactor
// className="block rounded-lg bg-white dark:bg-neutral-700"
// class="m-6"
// class="p-6"
// class="mb-4 text-base text-neutral-600 dark:text-neutral-200"
// class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" 
// class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50"

// .header {
    display: {
    flex;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 10vh;
    width: 100%;
    background-color: orange;
  }
  .smallShadow {
    box-shadow: 2px 2px 5px black;
  }
  .logo {
    display: flex;
    width: auto;
    height: 90%;
    margin: auto;
    margin-left: 2%;
  
  }
  .title {
    display: flex;
    justify-content: center;
    width: 70%;
    margin: auto;
    font-size: 3rem;
    font-weight: 900;
  
  }
  nav {
    display: flex;
    width: auto;
    margin-right: 1%;
  }
  .body{
    display: flex;
    flex-direction: column;
    height: 80vh;  
    width: 100%;
    margin-top: 10vh;
     background-color: red;
  }
  .exerciseCardContainer{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 80%;
       background-color: yellow;
  }
  .addExerciseButtonContainer{
    display: flex;
    height: auto;
     width: 100%;
  
    padding: 1rem;
  }
  .submitButtonContainer{
    display: flex;
    height: auto;
     width: 100%;
  
    padding: 1rem;
  }
  .addExerciseButton{
    display: flex;
    height: 5rem;
    width: 5rem;
    font-size: 4rem;
    justify-content: center;
    margin: auto;
    box-shadow: 4px 4px 10px black;
    border-radius: 15px;  
    background-color: gray;
    transition: all 0.4s ease;
    color: white;
  
  }
  .addExerciseButton:hover{
    scale: 1.2;
   box-shadow: 4px 4px 10px gray;
   color: black;
  
        
  }
  
  .submitLogButton{
    display: flex;
    height: 5rem;
    width: auto;
    font-size: 4rem;
    justify-content: center;
    margin: auto;
    box-shadow: 4px 4px 10px black;
    border-radius: 15px;  
      transition: all 0.4s ease;
        background-color: gray;
        color: black;
  }
  .submitLogButton:hover{
    scale: 1.2;
   box-shadow: 4px 4px 10px black;
   background-color: black;
        color: white;
   
  }
  .exerciseCard{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    width: 90%;
    min-width: 400px;
    vertical-align: middle;
    background-color: gray;
    text-align: center;
    padding: 3px;
    margin: .5rem auto;
    box-shadow: 4px 4px 10px black;
    border-radius: 10px;
  }
  .exerciseInput {
    display: inline-block;
    height: 1rem;
    width: 3rem;
        transition: all 0.4s ease;
  }
  .exerciseInput:hover{
  background-color: rgba(13, 111, 180, 0.1);
   color: white;
  
  }
  
  .exerciseInputsStrengthContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    width: 50%;
    vertical-align: middle;
    margin: auto;
  }
  .exerciseName{
    display: flex;
    width: auto;
    min-width: 15rem;
    vertical-align: middle;
    height: auto;
    margin: auto;
  
    text-align: center;
    
    
  }
  .setsContainer{
     display: flex;
     flex-direction: column;
    width: auto;
    height: auto;
    vertical-align: middle;
    padding: 1px;
     margin: auto;
     vertical-align: middle;
  }
  .repsContainer{
       display: flex;
     flex-direction: column;
    width: auto;
    height: auto;
    vertical-align: middle;
    padding: 1px;
     margin: auto;
     vertical-align: middle;
  }
  
  .weightContainer{
      display: flex;
     flex-direction: column;
    width: auto;
    height: auto;
    vertical-align: middle;
  /*   background-color: rgba(13, 111, 180, 0.4); */
    padding: 1px;
     margin: auto;
   
  }
  
  .commentContainer{
       display: flex;
     flex-direction: column;
    width: 100%;
     height: 3rem;
    vertical-align: middle;
    
    padding: 1%;
     margin: auto;
     vertical-align: middle;
  }
  .exerciseComment {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
    height: 2rem;
    
  }
  .deleteButton {
    display: flex;
    height: 1.2rem;
    margin: auto;
  }
  @media (max-width: 820px) {
    .header {
      display: flex;
      justify-content: space-between;
      height: 7rem;
      width: 100%;
      min-width: 500px;
      margin: auto;
      background-color: orange;
    }
    .logo {
      display: flex;
      width: auto;
      height: 50%;
      margin: auto;
      margin-left: 2%;
    
    }
    .title {
      display: flex;
      justify-content: center;
      width: 70%;
      margin: auto;
      font-size: 2rem;
      font-weight: 900;
    }
    .body{
      display: flex;
      flex-direction: column;
      height: 100%;  
      width: 100%;
      margin-top: 10rem;
       background-color: red;
    }
    .exerciseCard {
      flex-direction: column;
    }
    .exerciseComment {
      display: flex;
      width: 80%;
      height: 5rem;
      margin: auto;
      
    }
  }
  