const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    
    // Sync models
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ alter: true });
        console.log('Database synced.');
    }

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();
