const bcrypt  = require("bcryptjs");
const prisma  = require("../config/prisma");

/*
|--------------------------------------------------------------------------
| REGISTER USER
|--------------------------------------------------------------------------
*/
const registerUser = async ({ firstName, lastName, email, password, role, department }) => {

  // Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw Object.assign(new Error("Email already registered"), { status: 409 })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password:   hashedPassword,
      role:       role       || "VIEWER",
      department: department || "general",
    },
    select: {
      id:         true,
      firstName:  true,
      lastName:   true,
      email:      true,
      role:       true,
      department: true,
      createdAt:  true,
    }
  })

  return user
}

/*
|--------------------------------------------------------------------------
| LOGIN USER
|--------------------------------------------------------------------------
*/
const loginUser = async ({ email, password }) => {

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw Object.assign(new Error("Invalid email or password"), { status: 401 })
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw Object.assign(new Error("Invalid email or password"), { status: 401 })
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/*
|--------------------------------------------------------------------------
| GET USER BY ID
|--------------------------------------------------------------------------
*/
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id:         true,
      firstName:  true,
      lastName:   true,
      email:      true,
      role:       true,
      department: true,
      createdAt:  true,
    }
  })
  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 404 })
  }
  return user
}
/*
|--------------------------------------------------------------------------
| CHECK USERNAME AVAILABILITY
|--------------------------------------------------------------------------
*/
const checkUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email:     { contains: username, mode: 'insensitive' } },
        { firstName: { contains: username, mode: 'insensitive' } },
      ]
    }
  })
  return { available: !user }
}

module.exports = { registerUser, loginUser, getUserById,checkUsername}