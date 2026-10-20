import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8, 100], // Enforce strong passwords
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Active by default
    },
    roles: {
      type: DataTypes.ENUM("user", "admin"), 
      defaultValue: "user", // Default role
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,

    // Add a method to remove sensitive fields for public data
    instanceMethods: {
      toSafeJSON: function () {
        const values = { ...this.get() };
        delete values.password;
        delete values.refreshToken;
        return values;
      },
    },
  }
);

// user avatar model property : avatar_url



// 🔒 Password hashing hook
User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// 🔑 Password validation method
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🧼 Sanitize output
User.prototype.toSafeJSON = function () {
  const { password, refreshToken, ...safeData } = this.get();
  return safeData;
};