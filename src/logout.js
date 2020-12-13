firebase.auth().onAuthStateChanged((firebaseUser)=>{
    if(firebaseUser){
        // console.log(firebaseUser.uid)
    }else{
        window.location='./../index.html'
    }
})

document.querySelector('#logout').addEventListener('click',()=>{
    const auth=firebase.auth()
    auth.signOut().then(()=>{
        window.location="./../index.html"
    })
})


