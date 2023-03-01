const User = require('./User');
const Score = require('./Score');


// Define relationships between models

User.hasMany(Score, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Score.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  module.exports = { User, Score };