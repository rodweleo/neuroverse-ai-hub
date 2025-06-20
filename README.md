# Neuroverse AI Hub

A decentralized AI platform built on the Internet Computer Protocol (ICP) that allows users to manage and interact with AI models and files.

## Features

- File management system with chunked file uploads
- User authentication and authorization
- AI model interaction capabilities
- Decentralized storage using Internet Computer

## Project Structure

```
├── src/
│   ├── declarations/     # Auto-generated canister declarations
│   ├── neuroverse_backend/
│   │   ├── FileVault.mo  # File management system
│   │   └── main.mo       # Main backend canister
│   └── neuroverse_frontend/
├── .dfx/                 # DFX local state
├── .mops/                # Motoko package manager dependencies
└── dfx.json              # Project configuration
```

## Prerequisites

- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- Node.js and npm
- Internet Computer Wallet

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/neuroverse.git
cd neuroverse
```

2. Install dependencies:
```bash
npm install
```

## Local Development

1. Start the local Internet Computer replica:
```bash
dfx start --background
```

2. Deploy the canisters:
```bash
dfx deploy
```

3. Start the frontend development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:8080
- Canister Interface: http://localhost:4943?canisterId={asset_canister_id}

## Development Workflow

### Backend Development

- Make changes to Motoko files in `src/neuroverse_backend/`
- Regenerate candid interfaces:
```bash
npm run generate
```

### Frontend Development

The frontend development server proxies API requests to port 4943 where the local replica runs.

## Environment Variables

For production deployment, you'll need to handle the `DFX_NETWORK` environment variable:

- Set `DFX_NETWORK` to `ic` if using Webpack
- Configure environment override in `dfx.json`:
```json
{
  "canisters": {
    "asset_canister_id": {
      "declarations": {
        "env_override": "ic"
      }
    }
  }
}
```

## Documentation

For more information, see:
- [Internet Computer Development Documentation](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

## License
