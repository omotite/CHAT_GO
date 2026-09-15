# CHAT GO - Premium Messaging Application

**Connect • Chat • Share**

A production-ready, premium messaging application built with React, TypeScript, Supabase, and Tailwind CSS.

## Features

### Authentication
- Email signup and login
- Email verification required
- Password reset functionality
- Secure session management

### Messaging
- Real-time private messaging
- Group chats with multiple members
- Photo and media sharing
- Emoji reactions on messages
- Message timestamps
- Unread message indicators
- Online/offline status

### User Profiles
- Customizable username and bio
- Profile pictures with avatar upload
- Privacy settings (public/private)
- Language preferences

### Search
- Search users by username
- Search users by email
- Advanced filtering

### Group Management
- Create and manage groups
- Public/private groups
- Group member management
- Real-time group notifications

### Safety & Security
- Report user functionality
- Block user feature
- Content moderation
- Privacy controls

### Admin Dashboard
- View all users and statistics
- View and manage reports
- Suspend/ban users
- Delete inappropriate content
- Platform analytics

### PWA Features
- Installable on Chrome and other modern browsers
- Offline support
- Push notifications
- Home screen installation

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage
- **State Management**: Zustand
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/omotite/CHAT_GO.git
cd CHAT_GO
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── store/           # Zustand stores
├── lib/             # Utilities and services
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Database Schema

### Tables
- `profiles` - User profiles and settings
- `messages` - Direct messages and group messages
- `groups` - Group information
- `group_members` - Group membership
- `reports` - User reports and moderation
- `notifications` - Real-time notifications
- `blocked_users` - Blocked user relationships
- `user_status` - Online/offline status

## Admin

Admin email: `Danielchatnet@gmail.com`

Admin features:
- View all users
- View reports and moderation queue
- Suspend/ban users
- Delete content
- View platform statistics

## Security

- Email verification required
- Secure authentication with Supabase Auth
- Row-level security policies
- Privacy controls per user
- Reporting and moderation system

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For support, email support@chatgo.net or open an issue on GitHub.

## Live Demo

https://chatgo.net
