const wishlist=function(){
    let userId=null
    firebase.auth().onAuthStateChanged((firebaseUser)=>{
        if(firebaseUser){
            userId=firebaseUser.uid
            axios.get(currentUserUrl,{
                params:{
                    userId:userId
                }
            }).then((res)=>{
                console.log(res.data[0].wishlist)
                const wishlistArr=res.data[0].wishlist
                wishlistArr.forEach((book)=>{
                    const bookId=book.item
                    axios.get(getBookUrl,{
                        params:{
                            bookId:bookId
                        }
                    }).then((res)=>{
                        console.log(res)
                        const bookObject=res.data
                        if(res.data!=""){
                            generateDOM(bookObject)

                        }
                    }).catch((e)=>{
                        console.log(e)
                    })
                })
            }).catch((e)=>{
                console.log(e)
            })
        }
    })
}





const generateDOM=function(bookObject){

    const bookObjectId=bookObject._id

    const div=document.createElement('div')
    div.style.width = "95%";
    // div.style.height="500px"
    // div.style.maxHeight = "100%";
    div.style.background = "#f1f1f1";
    div.style.color = "black";
    div.style.padding="20px"
    // div.style.overflow="auto"
    div.style.borderRadius="30px"
    div.style.margin="10px"


    //Division for Image--------------
    const divImage=document.createElement('div')
    divImage.style.width="25%"
    divImage.style.height="210px"
    divImage.style.marginTop="30px"
    divImage.style.float="left"
    // divImage.style.border="thin dotted black"
    divImage.style.objectFit="fill"
    divImage.style.display="block"
    divImage.style.textAlign="center"


    //Contents of Image---------------
    const image=document.createElement('img')
    image.src=bookObject.image
    image.style.maxHeight="100%"
    image.style.maxWidth="100%"

    
    //Book Title
    const bookTitle=document.createElement('h1')
    bookTitle.textContent=bookObject.title
    bookTitle.style.textAlign="center"
    bookTitle.style.borderBottom="5px solid black"
    
    bookTitle.style.width="70%"
    bookTitle.style.float="left"
    bookTitle.style.marginLeft="1%"
    
    //Division for Description
    const divDesription=document.createElement('div')
    divDesription.style.width="50%"
    // divDesription.style.borderBottom="thin solid black"
    divDesription.style.float="left"
    divDesription.style.marginLeft="1%"
    divDesription.style.height="50px"

    //Book Description
    const description=document.createElement('P')
    description.textContent="Description: "+bookObject.description


    //Price Division
    const divPrice=document.createElement('div')
    divPrice.style.width="20%"
    // divPrice.style.border="thin dotted black"
    divPrice.style.float="left"
    divPrice.style.marginLeft="1%"
    divPrice.style.height="80px"
    
    //Price Element
    const price=document.createElement('h2')
    price.textContent="Price: "+bookObject.price+"/-"
    price.style.textAlign="center"

    //Contact Division
    const divContact=document.createElement('div')
    divContact.style.width="55%"
    // divContact.style.border="thin dotted black"
    divContact.style.height="80px"
    divContact.style.float="left"
    divContact.style.marginLeft="1%"
    divContact.style.marginTop="10px"

    //Conact Heading
    const contactHeading=document.createElement('h2')
    contactHeading.textContent="Conact Details"
    contactHeading.style.textAlign="center"
    contactHeading.style.verticalAlign="top"

    //Div Name and Phone Number
    const divPhAndName=document.createElement('div')
    divPhAndName.style.width="50%"
    // divPhAndName.style.border="thin dotted black"
    divPhAndName.style.float="left"
    
    //Conact Details
    const contactName=document.createElement('p')
    contactName.textContent="Seller: "+bookObject.name

    //const Phone Number
    const phoneNo=document.createElement('p')
    phoneNo.textContent="Contact No: "+bookObject.contactNo

    //Div Address
    const divAddress=document.createElement('div')
    // divAddress.style.border="thin dotted black"
    divAddress.style.width="45%"
    divAddress.style.float="left"
    divAddress.style.padding="10px"
    
    //Address
    const address=document.createElement('p')
    address.textContent="Address: "+bookObject.address
    address.style.textAlign="center"

    //Button for Adding to wishlist
    const addToListButton=document.createElement('button')
    addToListButton.textContent="REMOVE FROM WISHLIST"
    addToListButton.style.marginLeft="1%"
    addToListButton.style.marginTop="10px"
    addToListButton.style.padding="18px"
    addToListButton.style.borderRadius="10px"

    addToListButton.addEventListener('click',(e)=>{
        // console.log(bookObjectId)
        removeFromWishlist(bookObjectId)
    })

    divPrice.appendChild(price)
    divDesription.appendChild(description)
    divImage.appendChild(image)   
    divAddress.appendChild(address)
    divPhAndName.appendChild(contactName)
    divPhAndName.appendChild(phoneNo)
    divContact.appendChild(divPhAndName)
    divContact.appendChild(divAddress)

    div.appendChild(divImage)
    div.appendChild(bookTitle)
    div.appendChild(divDesription)
    div.appendChild(divPrice)
    div.appendChild(divContact)

    div.appendChild(addToListButton)

    document.getElementById('booksElem').appendChild(div)
}


const removeFromWishlist=function(objectId){
    console.log("object ID"+objectId)
    firebase.auth().onAuthStateChanged((firebaseUser)=>{
        if(firebaseUser){
            const uid=firebaseUser.uid
            axios.post(deleteItemWishlist,{
                userId:uid,
                objectId:objectId
            }).then((res)=>{
                console.log(res)
                alert(res.data)
                location.reload()
            }).catch((e)=>{
                console.log(e)
            })
        }
    })
}


wishlist()