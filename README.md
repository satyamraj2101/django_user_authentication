# Django User Authentication System

![Django Logo](https://img.shields.io/badge/Django-v4.0-green) ![Python Logo](https://img.shields.io/badge/Python-v3.10-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

A comprehensive user authentication system built with Django, offering a secure and scalable foundation for web applications.

---

## Features 🚀

- **User Registration:** 📝
  - Ensures unique usernames and emails.
  - Includes password confirmation and validation.

- **Authentication:** 🔑
  - Secure login via token-based authentication (DRF Token Authentication).
  - JWT support for advanced token handling.

- **User Management:** 👤
  - Profile view to fetch user details.
  - Password change functionality with robust validation.

- **Admin Features:** 🛠️
  - Enhanced Django admin for efficient user management.

- **Security:** 🔒
  - Follows OWASP best practices.
  - Includes CSRF protection, HTTPS-only cookies, and secure middleware.

- **Cross-Origin Resource Sharing (CORS):** 🌐
  - Configured for development with CORS headers.

---

## Tech Stack 🛠️

- **Backend:** 🖥️ Django, Django REST Framework (DRF), Python
- **Authentication:** 🔑 Django Auth, DRF Token Authentication, JWT
- **Database:** 🗄️ SQLite (development); supports PostgreSQL/MySQL for production
- **Deployment:** 🚢 Docker, Nginx (frontend integration)
- **Frontend Compatibility:** 📱 API ready for seamless integration

---

## Installation ⚙️

1. **Clone the repository:** 📂
   ```bash
   git clone https://github.com/satyamraj2101/django_user_authentication.git
   cd django_user_authentication
   ```

2. **Create and activate a virtual environment:** 🌟
   ```bash
   python -m venv env
   source env/bin/activate   # On Windows, use `env\Scripts\activate`
   ```

3. **Install dependencies:** 📦
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:** 🔄
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start the development server:** ▶️
   ```bash
   python manage.py runserver
   ```

6. **Access the application:** 🌐
   - API Endpoints: `http://127.0.0.1:8000/api/`
   - Django Admin: `http://127.0.0.1:8000/admin/`

---

## API Endpoints 🌐

### Authentication
- **Register:** 📝 `POST /api/users/register/`
- **Login:** 🔑 `POST /api/users/login/`
- **Logout:** 🚪 `POST /api/users/logout/`
- **Token Refresh:** 🔄 `POST /api/token/refresh/`

### User Management
- **Profile:** 👤 `GET /api/users/profile/`
- **Change Password:** 🔐 `PUT /api/users/change-password/`

---

## How to Contribute 🤝

We welcome contributions! To get started:

1. Fork the repository. 🍴
2. Create a new branch for your feature (`git checkout -b feature-name`). 🌿
3. Commit your changes (`git commit -m 'Add a feature'`). 💾
4. Push to your branch (`git push origin feature-name`). 🚀
5. Open a pull request. 🔖

---

## Contact 📬

**Developer:** Satyam Raj  
📍 Bhubaneswar, India  
📧 [satyamraj620@gmail.com](mailto:satyamraj620@gmail.com)  
📞 +91 8340489427  
🔗 [LinkedIn](https://www.linkedin.com/in/satyamraj2101/) | [GitHub](https://github.com/satyamraj2101)

---

## License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 🙌

- **Django Community:** 🤝 For their comprehensive documentation and support.
- **Contributors:** 👏 Everyone who helps improve this project. Thank you! ❤️

---

Feel free to contribute and make this project even better. Happy coding! ✨

