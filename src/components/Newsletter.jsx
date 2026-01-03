import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'success', 'error', ''
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('🎉 Successfully subscribed!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message || 'Subscription failed');
            }

            setTimeout(() => {
                setStatus('');
                setMessage('');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.icon}>
                <Mail size={32} />
            </div>
            <h3 style={styles.title}>Stay Updated!</h3>
            <p style={styles.subtitle}>
                Subscribe to get the latest blog posts, project updates, and coding tips delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} style={styles.form}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    Subscribe
                </button>
            </form>

            {status && (
                <div style={{
                    ...styles.message,
                    background: status === 'success' ? '#dcfce7' : '#fee2e2',
                    color: status === 'success' ? '#166534' : '#991b1b'
                }}>
                    {message}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
        margin: '40px 0'
    },
    icon: {
        display: 'inline-flex',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        marginBottom: '16px'
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        margin: '16px 0 8px'
    },
    subtitle: {
        fontSize: '16px',
        opacity: 0.9,
        marginBottom: '24px'
    },
    form: {
        display: 'flex',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto'
    },
    input: {
        flex: 1,
        padding: '14px 20px',
        borderRadius: '12px',
        border: 'none',
        fontSize: '16px',
        outline: 'none'
    },
    button: {
        padding: '14px 32px',
        background: 'white',
        color: '#667eea',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    message: {
        marginTop: '16px',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500'
    }
};

export default Newsletter;
