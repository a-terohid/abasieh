"use client"
const page = () => {

    const uploadFile  = () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);
      
        fetch('/api/Ziartnameh', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log('Success:', result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    return (
        <div>
            <form id="uploadForm">
            <input type="text" name="title" />
  <input type="text" name="content" />
  <input type="file" name="image" />
  <button type="button" onClick={uploadFile} >Upload</button>
</form>
        <img src="/uploads/14-08-2024/ishot-2024-08-13-18-23-12001-1723635258571-359828337.png" />
        </div>
    );
};

export default page;