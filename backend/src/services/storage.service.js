const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_8YGFQZ3x6az3UP+SnV9t4vgl120=",
    privateKey : "private_7NbXgYqfZoCb1Suw0haPZGork8E=",
    urlEndpoint : "https://ik.imagekit.io/ulw9pujkz"
});
async function uploadFile(file, fileName) {
    const result = await imagekit.upload({
        file: file, // required
        fileName: fileName, // required
    })

    return result; // Return the URL of the uploaded file
}

module.exports = {
    uploadFile
}