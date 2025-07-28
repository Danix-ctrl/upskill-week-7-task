const submitOrderButton = document.getElementById("submitOrder")
const printOrderButton = document.getElementById("printOrder")
const submitLoading = document.getElementById("submitLoading")
const printLoading = document.getElementById("printLoading")

// an array of food items  

const meals = [
    {
        name: "Jollof Rice",
        price: 2000,
        description: "A traditional Nigerian dish made with rice, tomatoes, and onions.",
        image: "./Jollof-Rice-2.jpg"
    },
    {
        name: "Egwusi Soup",
        price: 3500,
        description: "Egusi Soup is rich, thick, and savory with melon seeds, meat, palm oil, and leafy greens.",
        image: "./Egusi-Soup.jpg"
    },

    {
        name: "Akpu",
        price: 1200,
        description: "Egusi and Akpu is a hearty, traditional combo of thick melon seed soup and stretchy cassava swallow.",
        image: "./fufuimage.jpg"
    },

    {
        name: "Suya",
        price: 2000,
        description: "Suya is a popular Nigeria street food of spiced grilled meat with peanut sauce.",
        image: "./suyaimage.jpg"
    },

    {
        name: "Salad",
        price: 1800,
        description: "Egusi Fish is a rich, flavorful soup made with ground melon seeds and tender, spiced fish..",
        image: "./saladimage.jpg"
    },

    {
        name: "Fish",
        price: 5000,
        description: "Fresh, tender, and flaky fish, perfectly seasoned and cooked for a light, flavorful delight",
        image: "./fishimage.jpg"
    },
   
]





let submitCart = false
let printCart = false
const loading = document.getElementById("Loading")






// create virable to keep track of our dom 

let cart = [];
// this is the menu div 
const menuDiv = document.getElementById("menu");
//  this is the cart div 
const cartItmes = document.getElementById("cart-items");
// the total display div 
const totalDisplay = document.getElementById("total");

// get item from local storage aft reload

window.onload = function(){
  const savedCart = localStorage.getItem("cart")
  if(savedCart){
    cart = JSON.parse(savedCart)
    console.log(cart)
    updateCart()
  } else{
    cart = []
    updateCart()
  }
}



// function to display the menu in the screen 
meals.forEach((meal, index)=>{
   const card = document.createElement("div")
   card.className = "food-card"
   card.innerHTML = `
   <h5> ${meal.name} </h5>
   <p> ${meal.description} </p>
   <p> #${meal.price} </p>
    <div  class="food-image" style="background-image:url(${meal.image})">
    
    </div>
   <div class="Cardbutton button">
    <button onclick="addToCart(${index})">Add to list</button>
   </div>
  
   `
   menuDiv.appendChild(card)
 
})


// function to add meal to the plate

function addToCart(index){
   const meal = meals[index]

  cart.push(meal)

 updateCart()
 saveCart()
}

function updateCart(){
    cartItmes.innerHTML = ""
    let total = 0

    cart.forEach((item)=>{
        const li = document.createElement("li")
       li.textContent = `${item.name} - ${item.price}`
       cartItmes.appendChild(li)
       total += item.price
    })
    totalDisplay.textContent = total

}

// save the order to local storage 
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart))
}

// function to clear the cart
function clearCart(){
    localStorage.clear()
    cart = []
    updateCart()
}

// function to remove items from local storage

function removeItem(index){
    cart.splice(index, 1)
    updateCart()
    saveCart()
}

// function to submit the order
 function submitOrder(){
    submitLoading.style.display = "block"
if(cart.length === 0){
   setInterval(() => {
     submitLoading.style.display = "none"
   }, 2000);
   window.alert("please add some items to the cart")
    return
}else{
    window.alert(" cart submitted successfully")
   
    cart = []
    saveCart()
    updateCart()
    removeItem()
    setInterval(() => {
        submitLoading.style.display = "none"
      }, 2000);
}
  
}

// print or function 

function printOrder(){
    printLoading.style.display = "block"
    if(cart.length === 0){
        window.alert("please add some items to the cart  before printing")
        setInterval(() => {
            printLoading.style.display = "none"
          }, 2000);
        return
    }else{
        let printWindow = window.open("", "printWindow", "width=400,height=400");
        cart.forEach((item)=>{
            printWindow.document.write(`<li style="font-size: 20px; font-weight: bold; list-style-type: number;"> ${item.name}, <span style="font-weight: 300;"> ${item.price} </span> </li>`);
        })
        printWindow.document.write(`<li style="font-size: 20px; font-weight: bold; list-style-type: number;"> total: <span style="font-weight: 300;"> ${totalDisplay.textContent} </span> </li>`);
      
       printWindow.print();
       printWindow.document.close();
       setInterval(() => {
        printLoading.style.display = "none"
      }, 2000);
        
    }
}