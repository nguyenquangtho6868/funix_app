import { storage } from "./firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

export const uploadFile = async (imageUpload) => {
    console.log(imageUpload);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload)
    const url = await getDownloadURL(snapshot.ref);
    return url;
};