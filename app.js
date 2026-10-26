///////////////////////////////// CRUD ///////////////////////////////
const cardsWrapper = document.querySelector('.wrapper')

const API = 'http://localhost:3000/products'
let products = []

// 1. C - Create (Yangi mahsulot qo'shish)
const form = document.querySelector('#form')
const imgInp = document.querySelector('.imgInp')
const titleInp = document.querySelector('.titleInp')
const descInp = document.querySelector('.descInp')
const priceInp = document.querySelector('.priceInp')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        let Newproduct = {
            title: titleInp.value,
            price: priceInp.value,
            description: descInp.value,
            image: imgInp.value,
        }
        
        await axios.post(API, Newproduct)
        alert('Yangi tovar qo‘shildi')
        
        form.reset()       // Inputlarni tozalash
        getProducts()      // Ro'yxatni yangilab ekranga chiqarish
    } catch (error) {
        console.log(error)
    }
})

// 2. R - Read (Ma'lumotlarni o'qish va ekranga chiqarish)
const getProducts = async () => {
    try {
        console.log('Loading...')
        const request = await axios.get(API)
        const data = await request.data
        console.log(data)
        products = data

        cardsWrapper.innerHTML = ''

        products.forEach(tovar => {
            cardsWrapper.innerHTML += `
            <div class='card'>
                <img src='${tovar.image}' width='200px'/>
                <h2>${tovar.title ? tovar.title.slice(0, 20) : ''}...</h2>
                <p>${tovar.description ? tovar.description.slice(0, 60) : ''}...</p>
                <p>Price: <mark>${tovar.price}$</mark></p>

                <button onclick="updateProduct('${tovar.id}')">Update</button>
                <button onclick="deleteProduct('${tovar.id}')">Delete</button>
            </div>
            `
        })
    } catch (error) {
        console.log(error)
    } finally {
        console.log('Maqumotlar yuklandi')
    }
}

// 3. U - Update (Ma'lumotni tahrirlash)
const updateProduct = async (id) => {
    try {
        const newTitle = prompt('Yangi nom kiriting')
        const newdesc = prompt('Yangi tavsif kiriting')
        const newPrice = +prompt('Yangi tovar narxi')

        // Backtick (``) belgisi qo'shildi
        await axios.patch(`${API}/${id}`, {
            title: newTitle,
            description: newdesc,
            price: newPrice
        })
        
        alert('Tovar yangilandi')
        getProducts() // Yangilangan ma'lumotni ekranda ko'rsatish uchun
    } catch (error) {
        console.log(error)
    }
}

// 4. D - Delete (Ma'lumotni o'chirish)
const deleteProduct = async (id) => {
    try {
        // Backtick (``) belgisi qo'shildi
        await axios.delete(`${API}/${id}`)
        alert('Mahsulot o‘chirildi 🗑')
        
        getProducts() // O'chirilgandan keyin ro'yxatni yangilash
    } catch (error) {
        console.log(error)
    }
}

// Sahifa ochilganda ishga tushishi uchun
getProducts()