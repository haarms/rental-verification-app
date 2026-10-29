import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import SystemLog from '../../../models/SystemLog';
import { checkDuplicateNIN } from '../../../lib/fraudEngine';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { full_name, username, password, email, phone_number, residential_address, national_id, user_role, gender, date_of_birth } = body;

    if (!full_name || !username || !password || !email || !national_id || !user_role) {
      return NextResponse.json({ error: 'Missing required registration fields' }, { status: 400 });
    }

    // Check NIN duplicate
    const ninCheck = await checkDuplicateNIN(national_id);
    if (ninCheck.isDuplicate) {
      return NextResponse.json({
        error: 'NIN Registration Flagged: This National Identification Number is already registered in the system.',
        flagged: true
      }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      full_name,
      username,
      password_hash,
      email,
      phone_number,
      residential_address,
      national_id,
      user_role,
      gender,
      date_of_birth
    });

    await SystemLog.create({
      admin_id: newUser._id,
      activity_type: 'USER_REGISTERED',
      activity_description: `User ${username} registered with role ${user_role}`,
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        full_name: newUser.full_name,
        username: newUser.username,
        user_role: newUser.user_role
      }
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
