const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Job Board Application...\n');

// Check if Node.js is installed
try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' });
    console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
    console.error('❌ Node.js is not installed. Please install Node.js first.');
    process.exit(1);
}

// Check if MongoDB is running
async function checkMongoDB() {
    try {
        execSync('mongod --version', { encoding: 'utf8' });
        console.log('✅ MongoDB is installed');

        // Try to connect to MongoDB
        try {
            execSync('mongosh --eval "db.runCommand(\'ping\')"', { encoding: 'utf8' });
            console.log('✅ MongoDB is running');
            return true;
        } catch (error) {
            console.log('⚠️  MongoDB is installed but not running. Please start MongoDB first.');
            console.log('   On Windows: Start MongoDB service');
            console.log('   On macOS: brew services start mongodb-community');
            console.log('   On Linux: sudo systemctl start mongod');
            return false;
        }
    } catch (error) {
        console.log('⚠️  MongoDB is not installed. You can:');
        console.log('   1. Install MongoDB locally');
        console.log('   2. Use MongoDB Atlas (cloud)');
        console.log('   3. Continue with static data (frontend will work)');
        return false;
    }
}

// Setup backend
async function setupBackend() {
    console.log('\n📦 Setting up Backend...');

    try {
        // Install backend dependencies
        console.log('Installing backend dependencies...');
        execSync('npm install', { cwd: './backend', stdio: 'inherit' });
        console.log('✅ Backend dependencies installed');

        // Create .env file if it doesn't exist
        const envPath = path.join('./backend', '.env');
        if (!fs.existsSync(envPath)) {
            const envContent = `MONGO_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000`;
            fs.writeFileSync(envPath, envContent);
            console.log('✅ Created .env file');
        }

        // Check MongoDB and seed if available
        const mongoRunning = await checkMongoDB();
        if (mongoRunning) {
            console.log('Seeding database...');
            execSync('npm run seed', { cwd: './backend', stdio: 'inherit' });
            console.log('✅ Database seeded');
        } else {
            console.log('⚠️  Skipping database seeding (MongoDB not available)');
        }

    } catch (error) {
        console.error('❌ Backend setup failed:', error.message);
    }
}

// Setup frontend
async function setupFrontend() {
    console.log('\n📦 Setting up Frontend...');

    try {
        // Install frontend dependencies
        console.log('Installing frontend dependencies...');
        execSync('npm install', { cwd: './Frontend', stdio: 'inherit' });
        console.log('✅ Frontend dependencies installed');

    } catch (error) {
        console.error('❌ Frontend setup failed:', error.message);
    }
}

// Main setup function
async function main() {
    try {
        await setupBackend();
        await setupFrontend();

        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Start MongoDB (if not already running)');
        console.log('2. Start the backend: cd backend && npm run dev');
        console.log('3. Start the frontend: cd Frontend && npm run dev');
        console.log('4. Open http://localhost:5173 in your browser');
        console.log('\n🔍 Test the search functionality:');
        console.log('   - Search for "React" jobs');
        console.log('   - Filter by "Remote" location');
        console.log('   - Use the filter buttons for job types');
        console.log('   - Try advanced filters');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

// Run setup
main();
