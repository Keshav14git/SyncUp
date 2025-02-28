import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, uploadToCloudinary } from "./firebase"; // Adjusted import path

export const sendMessage = async (text, file) => {
    const user = auth.currentUser;
    if (!user) return;

    let imageUrl = null;

    if (file) {
        imageUrl = await uploadToCloudinary(file);
    }

    await addDoc(collection(db, "messages"), {
        text: imageUrl ? null : text, // Store text if no image is sent
        imageUrl: imageUrl,
        senderId: user.uid,
        timestamp: serverTimestamp()
    });
};
