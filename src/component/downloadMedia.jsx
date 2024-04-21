
import FileSaver from 'file-saver'
import { app } from '../firebaseApp';

const cors = require('cors');
// app.use(cors({origin: 'http://localhost:3000'}));



// exports.myFunction = downloadMedia.https.onRequest((req, res) => {
//     cors(req, res, () => {
//       // your function code here
//     });
//   });

export const downloadMedia = (e, originalImage) => {
    e.preventDefault();
    let name = originalImage.split(RegExp('%2..*%2F(.*?)\?alt'))[1];
    const len = name.length;
    name = name.substring(0, len-1);
    // console.log(name);
    // console.log(originalImage);

    



    // axios({
    //     url : originalImage,
    //     method : 'GET',
    //     responseType : 'blob'
    // })
    // .then((response) =>{
    //     const url = window.URL.createObjectURL(new Blob([response.data]));

    //     const link = document.createElement('a');
    //     link.href = url;
        
    //     link.setAttribute('download', name);
    //     document.body.appendChild(link);
    //     link.click();
    // })
    
       try{
        // console.log(originalImage);
        // FileSaver.saveAs(originalImage, name );
            fetch(originalImage)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                a.remove();
        });
       }
       catch (error){
            console.log("Error while downloading the image")
        }
     
}

// import React, { useEffect, useState } from 'react';

// function downloadMedia(event, originalImage) {
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     fetch(originalImage)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = URL.createObjectURL(blob);
//         setImageUrl(url);
//       });
//   }, []);

//   return (
//     <div>
//       <img src={imageUrl} alt="My Image" crossorigin="anonymous" />
//     </div>
//   );
// }

// export default downloadMedia;