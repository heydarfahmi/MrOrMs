
var last_searched;

function getCookie(cname) {
  // This function search whole cookie splited by ';' so it could can find
  // the saved submited result if there is any .
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "-";
}




async function predict(){
  //this function is the main functionality of submit button
  // at firts it gets text as name
  // then it use fetch function to send request .
  // change the json result to js object using .json()
  //at last its checked if count is 0 then let user understand that from ui
  // if count is more than 0 so there is anwer, changing inner text of prediction ui value
  // besides what api returns check if name is in cookie by calling getCookie function . and set saved Answer result .


  let name=document.getElementById('name_text').value
  last_searched=name;
  const response = await fetch('https://api.genderize.io/?name='+name);
  const myJson = await response.json(); //extract JSON from the http response
  if (myJson['count']===0){
    document.getElementById('gender-prediction').innerText="unfortunately result is null"
    document.getElementById('probability-prediction').innerText=":("
}
else{

    document.getElementById('gender-prediction').innerText=myJson['gender']
    document.getElementById('probability-prediction').innerText=myJson['probability']

}
  saved_res=getCookie(name);
  console.log(saved_res)
  document.getElementById('saved_result').innerText=saved_res;


}
//this function controls the abilty of user for clicking save button
//user can not click on save button while  name is equal to '' or no radio button checked
function radioHandler (){
  //checking name text input
  if (document.getElementById('name_text').value.trim()==='')
  {
//this is used so make user at first write a name then checking male or female .
      document.getElementById('male_radio').checked=false;
      document.getElementById('female_radio').checked=false;
  }
  //if user has been wrote the name then we should check wether user checked one of the possible
  //choices or not . if yes now user is allowed to click on save
  if
    (document.getElementById('male_radio').checked===true
   || document.getElementById('female_radio').checked===true)
   {
      document.getElementById("save-btn").disabled=false
  }
}
//if user clicked on save button , save name and answer to cookie
function saveC(){
  //get radio selected value
  male=document.getElementById('male_radio')
  female=document.getElementById('female_radio')
  let gender=''
  if (male.checked===true){
    gender='male'
  }
  else{
    gender="female"
  }
  //reset button to defualt
  document.getElementById('male_radio').checked=false;
  document.getElementById('female_radio').checked=false;
  document.getElementById("save-btn").disabled=true

  //check if name is not equal to ''
  let name=document.getElementById('name_text').value.trim()
  if (name==='')
  {
    return
  }
  else{
    // if inputes are validated then , js will set cookie for raido selected and name .
    let c=name+"="+gender;
    document.cookie=c+ ";path=/";
    console.log(name+"="+gender);
   }
}

//clear saved answer from cookie .
function clearC(){
  // check if there is any local answer
  res=document.getElementById('saved_result')
  if (res.innerText==='-'){
    return
  }
  // if its set ,then remove  cookie just by spcifying that cookie is expired.
  console.log(last_searched);
  delete_sub = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie=last_searched+delete_sub
  res.innerText="deleted successfully"
  }
