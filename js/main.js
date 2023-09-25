document.querySelector('button').addEventListener('click', getDrinks)
const btnContinue = document.querySelector('.btn-continue')
const btnPause = document.querySelector('.btn')
let drinksArray;
let counter = 0;
let intervalId;

function getDrinks(){
    let drinks = document.querySelector('input').value.toLowerCase()
    if (drinks){
        clearInterval(intervalId)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinks}`)
            .then(res =>res.json())
            .then(data => {
                console.log(data.drinks)
                if (data.drinks){
                    drinksArray = data.drinks
                    showDrink()
                    intervalId = setInterval(showDrink, 3000);
                }else{
                    document.querySelector('h3').innerText =
                    "sorry something went wrong please try again"
                }
            })
            .catch(err =>{
                console.log(`error ${err}`)
                
            })
            document.querySelector('input').value = ''
        }else{
        document.querySelector('h3').innerText =
        "please enter the valid drink name"
    }

}

function showDrink(){
    if (counter < drinksArray.length){
        document.querySelector('h2').innerText = drinksArray[counter].strDrink
        document.querySelector('.main').src = drinksArray[counter].strDrinkThumb
        document.querySelector('h3').innerText = drinksArray[counter].strInstructions
        let ingredients = []
        for (let index = 1; index < 15; index++){
            let ing = drinksArray[counter]['strIngredient' + index]
            if (ing){
                ingredients.push(ing)
            }
        }
        document.querySelector('h4').innerHTML = 'INGREDIENTS:'
        ingredients.forEach(element =>{
            document.querySelector('h4').innerHTML += '<li>' + element + '<li>'
        })

        counter++;
    }else{
        counter = 0
    }
}

btnPause.addEventListener('click', function() {
    clearInterval(intervalId)
})
btnContinue.addEventListener('click',function(){
    showDrink()
    intervalId = setInterval(showDrink, 3000)
})








