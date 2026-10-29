import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import SystemLog from '../../../models/SystemLog';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { username, password } = await req.json();

    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    await SystemLog.create({
      admin_id: user._id,
      activity_type: 'USER_LOGIN',
      activity_description: `User ${user.username} logged in successfully`,
    });

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        full_name: user.full_name,
        username: user.username,
        user_role: user.user_role,
        email: user.email
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
