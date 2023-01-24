import { getStorage, ref, getDownloadURL  } from "firebase/storage";

function getProfilePictureURL(reference, setter){

    const storage = getStorage();
    const storageRef = ref(storage, `images/${reference}-profilepic`);
    const defaultRef = ref(storage, `images/default.jpg`);


    getDownloadURL(storageRef)
    .then((res)=>{{
          setter(res);
          localStorage.setItem(`profilepic-url`, res)
        }
    })
    .catch(error => {
      if(error){
        getDownloadURL(defaultRef)
        .then((res)=>{
          if(res.error){
            console.log('chanfles')
          }else{
            setter(res);
            sessionStorage.setItem(`ProPic-${reference}`, res)
          }
      })}})

    }
    
  
        
       


export default getProfilePictureURL;
    

  