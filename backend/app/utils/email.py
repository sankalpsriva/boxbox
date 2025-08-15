import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def send_email(recipient, subject, content):
    """
    Send an email using SMTP
    """
    # Get email configuration from environment variables
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    sender_email = os.getenv("SENDER_EMAIL", smtp_username)
    
    # Create message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient
    message["Subject"] = subject
    
    # Add content
    message.attach(MIMEText(content, "html"))
    
    try:
        # Connect to server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        
        # Login
        if smtp_username and smtp_password:
            server.login(smtp_username, smtp_password)
        
        # Send email
        server.send_message(message)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_verification_email(email, username, token, base_url="http://localhost:3000"):
    """
    Send a verification email with a token link
    """
    verification_url = f"{base_url}/verify-email?token={token}"
    subject = "Verify your BoxBox account"
    
    # Create HTML content
    content = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #eee;
                border-radius: 5px;
            }}
            .header {{
                background-color: #e10600;
                color: white;
                padding: 10px 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }}
            .content {{
                padding: 20px;
            }}
            .button {{
                display: inline-block;
                background-color: #e10600;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>BoxBox</h1>
            </div>
            <div class="content">
                <h2>Hi {username},</h2>
                <p>Thank you for registering with BoxBox, the ultimate F1 race rating platform!</p>
                <p>Please verify your email address by clicking the button below:</p>
                <p style="text-align: center;">
                    <a href="{verification_url}" class="button">Verify Email</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p>{verification_url}</p>
                <p>This link will expire in 24 hours.</p>
                <p>If you did not create an account, you can safely ignore this email.</p>
                <p>Happy rating!</p>
                <p>The BoxBox Team</p>
            </div>
            <div class="footer">
                <p>© 2025 BoxBox - Not affiliated with Formula 1</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(email, subject, content)
