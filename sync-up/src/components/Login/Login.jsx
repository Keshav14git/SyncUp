import { useState } from "react";
import { toast } from "react-toastify";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    getAuth 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX5pmvzjbKexpt9Uxxh4qOFia-cYTqSR0",
    authDomain: "syncup-6c630.firebaseapp.com",
    projectId: "syncup-6c630",
    storageBucket: "syncup-6c630.appspot.com",
    messagingSenderId: "503927134325",
    appId: "1:503927134325:web:afc3e31dfb8b7464a1803c"
};

// Initialize Firebase - this ensures Firebase is initialized before we use it
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const uploadToCloudinary = async (file) => {
    // Rest of the uploadToCloudinary function remains the same
    const cloudName = "drf3bj2yp";
    const uploadPreset = "syncup_preset"; 
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "syncup/avatars");

    try {
        console.log("Attempting upload to:", uploadUrl);
        console.log("Using preset:", uploadPreset);
        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log("Cloudinary response status:", response.status);
        console.log("Cloudinary response data:", data);

        if (!response.ok) {
            throw new Error(data.error?.message || `Upload failed with status ${response.status}`);
        }
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};

const Login = () => {
    // Component state and handler code remains the same
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
                return;
            }
            if (file.size > 50 * 1024 * 1024) {
                toast.error('File size should be less than 50MB');
                return;
            }

            setAvatar({
                file: file,
                url: URL.createObjectURL(file)
            });
        }
    };

    const handleUpload = async (file) => {
        try {
            const imageUrl = await uploadToCloudinary(file);
            console.log("Uploaded File URL:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.error("Upload to Cloudinary failed:", error.message);
            toast.error(`Failed to upload avatar: ${error.message}`);
            throw error;
        }
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.get('email')?.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.get('email'))) {
            errors.email = 'Please enter a valid email';
        }
        if (!formData.get('password')?.trim()) {
            errors.password = 'Password is required';
        } else if (formData.get('password').length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formData = new FormData(e.target);
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        const { username, email, password } = Object.fromEntries(formData);
        let avatarUrl = null;

        try {
            if (avatar.file) {
                avatarUrl = await handleUpload(avatar.file);
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                avatarUrl: avatarUrl || null,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });
            
            toast.success('Account created successfully!');
            setAvatar({ file: null, url: "" });
        } catch (err) {
            console.error("Registration error:", err);
            toast.error(err.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formData = new FormData(e.target);
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        const { email, password } = Object.fromEntries(formData);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            await setDoc(doc(db, "users", userCredential.user.uid), {
                lastLogin: new Date().toISOString()
            }, { merge: true });
            
            toast.success('Logged in successfully!');
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="Login">
            <div className="items">
                <h2>Sign In To Continue!</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="email" 
                            className={errors.email ? 'error' : ''} 
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className={errors.password ? 'error' : ''} 
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <button id="login" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>

            <div className="logo">
                <img src="syncup.svg" alt="SyncUp Logo" />
            </div>

            <div className="items">
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file" className="avatar-upload">
                        <img 
                            src={avatar.url || "./defaultAvatar.png"} 
                            alt="Avatar preview" 
                        />
                        Upload Picture
                    </label>
                    <input 
                        type="file" 
                        id="file" 
                        accept="image/*"
                        style={{display: "none"}} 
                        onChange={handleAvatar} 
                    />
                    <input type="text" placeholder="Username" name="username" required />
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="email" 
                            className={errors.email ? 'error' : ''} 
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className={errors.password ? 'error' : ''} 
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <button id="login" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;