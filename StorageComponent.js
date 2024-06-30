// import React, { useState } from 'react';
// import { Storage } from 'aws-amplify/storage';
// const StorageComponent = () => {
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [downloadUrl, setDownloadUrl] = useState('');
//     const handleChange = (event) => {
//         setFile(event.target.files[0]);
//     };
//     const handleUpload = async () => {
//         // try {
//         //     const result = await Storage.put(file.name, file);
//         //     console.log('File uploaded successfully:', result);
//         //     setFileName(file.name);
//         // } catch (error) {
//         //     console.error('Error uploading file:', error);
//         // }
//         if (event?.target?.files) {
//             const file = event.target.files[0];
//             uploadData({
//               path: file.name,
//               data: file
//             });


//     };
//     const handleDownload = async () => {
//         // try {
//         //     const result = await Storage.get(fileName, { download: true });
//         //     const url = URL.createObjectURL(result.Body);
//         //     setDownloadUrl(url);
//         // } catch (error) {
//         //     console.error('Error downloading file:', error);
//         // }
//     };
//     return (
//         <div>
//             <input type="file" onChange={handleChange} />
//             <button onClick={handleUpload}>Upload</button>
//             <button onClick={handleDownload}>Download</button>
//             {downloadUrl && <a href={downloadUrl} download={fileName}>Download File</a>}
//         </div>
//     );
// };
// export default StorageComponent;

import React, { useState } from 'react';
import { uploadData, getUrl } from 'aws-amplify/storage';
const StorageComponent = () => {
    const [fileName, setFileName] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const handleUpload = async (event) => {
        if (event?.target?.files) {
            const file = event.target.files[0];
            try {
                const result = await uploadData({
                    path: "public/"+file.name,
                    data: file
                });
                console.log('File uploaded successfully:', result);
                setFileName(file.name);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const handleDownload = async () => {
        try {
            const result = await getUrl({
                path: `public/${fileName}`,
                options: {
                    validateObjectExistence: false, // Check if object exists before creating a URL
                    expiresIn: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                    useAccelerateEndpoint: true // Whether to use accelerate endpoint
                }
            });
            console.log('signed URL: ', result.url);
            console.log('URL expires at: ', result.expiresAt);
            setDownloadUrl(result.url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleUpload} />
            <button onClick={handleDownload}>Download</button>
            {downloadUrl && <a href={downloadUrl} download={fileName}>Download File</a>}
        </div>
    );
};
export default StorageComponent;