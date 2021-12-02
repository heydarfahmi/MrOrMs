var last_searched;
function getCookie(cname) {
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

function delete_cookie(){

}
function get_cookie(){

}
function radioHandler (){
  if (document.getElementById('name_text').value.trim()==='')
  {

      document.getElementById('male_radio').checked=false;
      document.getElementById('female_radio').checked=false;
  }
  if
    (document.getElementById('male_radio').checked===true
   || document.getElementById('female_radio').checked===true)
   {
      document.getElementById("save-btn").disabled=false
  }
}

function saveC(){
  male=document.getElementById('male_radio')
  female=document.getElementById('female_radio')
  let gender=''
  if (male.checked===true){
    gender='male'
  }
  else{
    gender="female"
  }
  document.getElementById('male_radio').checked=false;
  document.getElementById('female_radio').checked=false;
  document.getElementById("save-btn").disabled=true
  let name=document.getElementById('name_text').value.trim()
  if (name==='')
  {
    return
  }
  else{
    let c=name+"="+gender;
    document.cookie=c+ ";path=/";
    console.log(name+"="+gender);
   }
}

function clearC(){
  res=document.getElementById('saved_result')
  if (res.innerText==='-'){
    return
  }

  console.log(last_searched);
  delete_sub = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie=last_searched+delete_sub
  res.innerText="deleted successfully"
  }
