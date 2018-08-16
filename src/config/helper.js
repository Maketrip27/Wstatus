import Share from 'react-native-share';

export const sendFile = (shareOptions) => {
    Share.open(shareOptions).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log("err",error)
    })
  }