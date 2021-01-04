document.querySelector('#signUp').addEventListener('click',async(e)=>{
    const email=document.getElementById('emailSignup').value
    const newpassword=document.getElementById('newPassword').value
    const confirmpassword=document.getElementById('confirmPassword').value
    const name=document.getElementById('name').value
    const contactNo=document.getElementById('contactNo').value
    if(newpassword===confirmpassword){
        const auth=firebase.auth()
        auth.createUserWithEmailAndPassword(email,newpassword)
        .then((user)=>{
            const uid=user.user.uid
            console.log("After creation: ")
            console.log(uid)
            axios.post('http://localhost:3010/newUser',{
                userId:uid,
                name:name,
                email:email,
                contactNo:contactNo
            }).then(function(res){
                // console.log(res)
                window.location="./../src/homePage.html"
            }).catch(function(e){
                console.log(e)
                alert(e)
            })
            
        }).catch((e)=>{
            alert(e)
        })
    }else{
        alert('Passwords do not match')
    }
    
})

firebase.auth().onAuthStateChanged((firebaseUser)=>{
    if(firebaseUser){
        // console.log("from auth change function in signUp.js:   "+firebaseUser.uid)
    }else{
        console.log('not logged in')
    }
})
