const imageInput=document.getElementById('bookImage')
let curImage=undefined
imageInput.addEventListener('change',(e)=>{
    console.log(curImage)
    e.preventDefault()
    console.log(e.target.files[0])
    if(e.target.files[0]===undefined){
        console.log('please choose a file')
        curImage=undefined
    }else{
        curImage=e.target.files[0]

    }
    
})

let bookImageUrl=null
document.querySelector('#uploadImage').addEventListener('click',async(e)=>{
    e.preventDefault()
    console.log("curIMage from upload button    "+curImage)
    if(curImage!=undefined){
        const formData=new FormData()
        formData.append('image',curImage)
        const imageUrl=await axios.post('http://localhost:3010/h2h-image-upload',formData,{
            headers:{
                'Content-Type': `multipart/form-data`
            }
        })
        console.log(imageUrl)
        bookImageUrl=imageUrl.data.image_url
        const preview=document.querySelector('#previewImage')
        preview.src=imageUrl.data.image_url
    }
    curImage=undefined
})

document.querySelector('#addBookForm').addEventListener('submit',async(e)=>{
    e.preventDefault()
    const form=document.querySelector('#addBookForm')
    let userId=null
    try{
        await firebase.auth().onAuthStateChanged((firebaseUser)=>{
            if(firebaseUser){
                // console.log(firebaseUser.uid)
                userId=firebaseUser.uid
            }
        })
    
        const user=await axios.get('http://localhost:3010/currentUser',{
            params:{
                userId:userId
            }
        })
        console.log(user)
        
    
        const title=form.elements.title.value
        const description=form.elements.description.value
        const price=form.elements.price.value
        const address=form.elements.address.value
        const image=bookImageUrl
        const name=user.data[0].name
        const contactNo=user.data[0].contactNo
    
        if(userId!=null && title!=null && price!=null){
            const book=await axios.post('http://localhost:3010/addBook',{
                userId:userId,
                title:title,
                description:description,
                image:image,
                price:price,
                address:address,
                name:name,
                contactNo:contactNo
            })
        }else{
            alert('Please fill in all the fields')
        }

    }catch(e){
        alert(e)
    }
    
    
    


    // "userId":"YvFyOKPBs5UVvh2a9mS9BbxeIFA2",
    // "name":"Dipesh Narang",
    // "contactNo":"+918130361402",
    // "address":"South City-2, Gurgaon",
    // "title":"The Monk Who Sold His Ferrari",
    // "image":"https://firebasestorage.googleapis.com/v0/b/test-ee7a6.appspot.com/o/0THJ7uLZZOXVz4COFfEiBUeRm0F2%2Fgym_image%2Fimg6.jpg?alt=media",
    // "description":"This book about the big four companies namely Apple, Google, Facebook and Amazon. It tells hows these companies became so big and control the economy",
    // "price":400
})