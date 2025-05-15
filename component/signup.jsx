import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (password.length < 6) {
            setPasswordStrength("Weak (must be at least 6 characters)");
        } else if (!/[A-Z]/.test(password)) {
            setPasswordStrength("Medium (add an uppercase letter)");
        } else if (!/[0-9]/.test(password)) {
            setPasswordStrength("Medium (add a number)");
        } else if (!/[!@#$%^&*]/.test(password)) {
            setPasswordStrength("Strong (add a special character)");
        } else {
            setPasswordStrength("Very Strong");
        }
    };

    // Handle form submission
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state
        setError(""); // Reset error
        setSuccess(""); // Reset success message
        try {
            const data = new FormData();
            data.append('username', username);
            data.append('email', email);
            data.append('password', password);
            data.append('phone', phone);

            const response = await axios.post(
                "https://kangethevictor.pythonanywhere.com/api/signup",
                data
            );

            // Handle successful signup
            if (response.data.success) {
                setSuccess("Account created successfully! Please Sign In.");
                // Redirect to homepage after successful signup
                navigate("/");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to create an account. Please try again later.");
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2 className="text-center">Signup</h2>

                {/* Display success and error messages */}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {/* Form */}
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordStrength(e.target.value);
                            }}
                            required
                        />
                        <small className="text-muted">{passwordStrength}</small>
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Signup"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <p>Already have an account? <Link to="/signin">Signin</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
