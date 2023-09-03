async function getData(){
    const url = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Error al recuperar data')
        }
        jsonData = await response.json();
        showItems(jsonData);
    } catch (error) {
        console.error('Error:',error)
    }
}

function showItems(items){
    let content = '';
    items.forEach(item=>{
        content += `
            <div class="item"> 
                <h1 class="title">${item.title}</h1>
                <img class="img" src="${item.image}">
                <p class="price">Price: ${item.price}</p>
                <p class="description">${item.description}</p>
            </div>
        `;
    });
    const itemContainer = document.getElementById('items-container');

    itemContainer.innerHTML= content;
}

getData();

const minFilter = document.getElementById('minFilter');
const maxFilter = document.getElementById('maxFilter');
const filterBtn = document.getElementById('filterBtn');
const clearBtn = document.getElementById('clearBtn');

filterBtn.addEventListener('click', function(){
    const minPrice = parseFloat(minFilter.value);
    const maxPrice = parseFloat(maxFilter.value);
    const filteredItems= jsonData.filter(item=>{    
        const productPrice = parseFloat(item.price);
        return(!isNaN(minPrice) ? productPrice >= minPrice : true) && (!isNaN(maxPrice) ? productPrice <= maxPrice : true);
    })

    showItems(filteredItems);
})

clearBtn.addEventListener('click',function(){
    minFilter.value = '';
    maxFilter.value = '';
    filterBtn.click();
})