document.querySelector('#signIn').addEventListener('click',(e)=>{
    const email=document.getElementById('emailLogin').value
    const password=document.getElementById('password').value

    const auth=firebase.auth()
    auth.signInWithEmailAndPassword(email,password)
    .then(()=>{
        window.location="./../src/homePage.html"
    }).catch((e)=>{
        console.log(e)
    })
})

firebase.auth().onAuthStateChanged((firebaseUser)=>{
    if(firebaseUser){
        console.log(firebaseUser)
    }else{
        console.log('not logged in')
    }
})