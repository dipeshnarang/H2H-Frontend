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
        const uploadImageUrl=uploadImageUrl
        const imageUrl=await axios.post(uploadImageUrl,formData,{
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
        
        const currentUserUrl=currentUserUrl
        const user=await axios.get(currentUserUrl,{
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
            const urlAddBook=addBookUrl
            const book=await axios.post(urlAddBook,{
                userId:userId,
                title:title,
                description:description,
                image:image,
                price:price,
                address:address,
                name:name,
                contactNo:contactNo
            }).then((res)=>{
                alert("Book has been succesfully Listed")
                location.reload()
            }).catch((e)=>{
                alert(e)
            })
        }else{
            alert('Please fill in all the fields')
        }

    }catch(e){
        alert(e)
    }
})